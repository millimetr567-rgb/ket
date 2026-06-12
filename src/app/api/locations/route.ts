import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const viloyatlar = await prisma.viloyat.findMany({
      include: { tumans: true },
    });
    return NextResponse.json(viloyatlar);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}
