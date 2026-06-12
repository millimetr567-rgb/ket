import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const viloyatlar = [
    { name: "Toshkent shahri", tumanlar: ["Yunusobod", "Chilonzor", "Mirzo Ulug'bek"] },
    { name: "Samarqand", tumanlar: ["Urgut", "Paxtachi", "Ishtixon"] },
    { name: "Buxoro", tumanlar: ["G'ijduvon", "Shofirkon", "Vobkent"] }
  ];

  for (const v of viloyatlar) {
    let viloyat = await prisma.viloyat.findUnique({ where: { name: v.name } });
    if (!viloyat) {
      viloyat = await prisma.viloyat.create({ data: { name: v.name } });
    }
    
    for (const t of v.tumanlar) {
      const existing = await prisma.tuman.findUnique({
        where: { name_viloyatId: { name: t, viloyatId: viloyat.id } }
      });
      if (!existing) {
        await prisma.tuman.create({
          data: { name: t, viloyatId: viloyat.id }
        });
      }
    }
  }

  // Ensure Admin is APPROVED since we added status
  await prisma.user.updateMany({
    where: { role: 'SUPER_ADMIN' },
    data: { status: 'APPROVED' }
  });

  console.log('Regions seeded and Admin approved!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
