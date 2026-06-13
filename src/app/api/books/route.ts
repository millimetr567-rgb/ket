import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import QRCode from "qrcode";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const uploaderId = (session.user as any).id;

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const isbn = formData.get("isbn") as string;
    const publishYear = formData.get("publishYear") as string;
    const genre = formData.get("genre") as string;
    const annotation = formData.get("annotation") as string;
    const file = formData.get("file") as File;

    if (!title || !author || !file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload to Supabase Storage
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("books")
      .upload(fileName, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Supabase Upload Error:", uploadError);
      return NextResponse.json({ error: "Failed to upload to Supabase" }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from("books").getPublicUrl(fileName);
    const publicUrl = publicUrlData.publicUrl;

    // Create db record
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        publishYear: publishYear ? parseInt(publishYear) : null,
        genre,
        annotation,
        pdfUrl: publicUrl,
        uploaderId,
      },
    });

    // Generate QR Code containing the book URL
    const bookUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/book/${newBook.id}`;
    const qrCodeUrl = await QRCode.toDataURL(bookUrl);

    // Save QR code URL to DB
    const updatedBook = await prisma.book.update({
      where: { id: newBook.id },
      data: { qrCodeUrl },
    });

    return NextResponse.json({ success: true, book: updatedBook });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
