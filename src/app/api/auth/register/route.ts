import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, viloyatId, tumanId, isViloyatAdmin } = await req.json();

    if (!name || !email || !password || !viloyatId) {
      return NextResponse.json({ error: "Barcha maydonlarni to'ldiring" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Ushbu email band" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let role: "VILOYAT_ADMIN" | "TUMAN_ADMIN" | "USER" = "USER";

    if (isViloyatAdmin) {
      role = "VILOYAT_ADMIN";
    } else if (tumanId) {
      role = "TUMAN_ADMIN";
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        viloyatId,
        tumanId: tumanId || null,
        status: "PENDING", // Wait for approval
      },
    });

    return NextResponse.json({ success: true, message: "Arizangiz adminga yuborildi. Tasdiqlanganidan so'ng tizimga kira olasiz." });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
