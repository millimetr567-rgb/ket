import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalBooks = await prisma.book.count();
    const totalUsers = await prisma.user.count();
    const totalReads = await prisma.readHistory.count();
    
    // Additional metrics
    const recentBooks = await prisma.book.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      totalBooks,
      totalUsers,
      totalReads,
      recentBooks,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
