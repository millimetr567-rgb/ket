import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@ket.uz';
  const password = 'admin';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Use upsert to guarantee the user is there with correct password and status
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      status: 'APPROVED',
      role: 'SUPER_ADMIN'
    },
    create: {
      name: 'Super Admin',
      email: email,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      status: 'APPROVED'
    }
  });

  console.log('Admin user guaranteed to exist!');
  console.log('Email:', user.email);
  console.log('Password set to: admin');
  console.log('Status:', user.status);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
