import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" },
    });

    if (existingAdmin) {
      // If we already have admin@ket.uz, update its password and status to be sure
      if (existingAdmin.email === "admin@ket.uz") {
        const hashedPassword = await bcrypt.hash("admin", 10);
        await prisma.user.update({
          where: { id: existingAdmin.id },
          data: { password: hashedPassword, status: "APPROVED" }
        });
        return NextResponse.json({ message: "Admin updated successfully! Email: admin@ket.uz, Password: admin" });
      }
      return NextResponse.json({ message: "Admin is already set up!" });
    }

    const hashedPassword = await bcrypt.hash("admin", 10);

    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@ket.uz",
        password: hashedPassword,
        role: "SUPER_ADMIN",
        status: "APPROVED",
      },
    });

    return NextResponse.json({ message: "Admin created successfully! Email: admin@ket.uz, Password: admin" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create admin: " + error.message }, { status: 500 });
  }
}
