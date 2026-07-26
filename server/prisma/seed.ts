// ============================================================
// PROJECT BUNIYAD – DATABASE SEED SCRIPT
// Populates default admin user, initial material categories,
// brand catalogue, and sample project data.
// ============================================================

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  console.log('[Seed] Starting Buniyad database seed...');

  // 1. Create Default Admin User
  const adminPasswordHash = await bcrypt.hash('Admin@123456', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@buniyad.app' },
    update: {},
    create: {
      email: 'admin@buniyad.app',
      name: 'System Admin',
      phone: '+91 9876543210',
      role: 'ADMIN',
      password: adminPasswordHash,
    },
  });
  console.log(`[Seed] Admin user created: ${admin.email}`);

  // 2. Create Sample Client User
  const userPasswordHash = await bcrypt.hash('Client@123456', 10);
  const user = await prisma.user.upsert({
    where: { email: 'client@rightcon.in' },
    update: {},
    create: {
      email: 'client@rightcon.in',
      name: 'Rajesh Sharma',
      phone: '+91 9845012345',
      role: 'USER',
      password: userPasswordHash,
    },
  });
  console.log(`[Seed] Client user created: ${user.email}`);

  // 3. Create Material Categories & Brands
  const categories = [
    { name: 'Steel', unit: 'tonne' },
    { name: 'Cement', unit: 'bag' },
    { name: 'Doors', unit: 'set' },
    { name: 'Windows', unit: 'sq ft' },
    { name: 'Flooring', unit: 'sq ft' },
    { name: 'Paint', unit: 'litre' },
    { name: 'Electrical', unit: 'metre' },
    { name: 'Plumbing', unit: 'set' },
  ];

  for (const cat of categories) {
    await prisma.materialCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        unit: cat.unit,
      },
    });
  }
  console.log('[Seed] Material categories seeded.');

  // 4. Create Initial Audit Log
  await prisma.auditLog.create({
    data: {
      action: 'SYSTEM_SEED',
      userId: admin.id,
      details: { message: 'Database seeded with default admin & material categories' },
    },
  });

  console.log('[Seed] Database seed completed successfully!');
}

seed()
  .catch((e) => {
    console.error('[Seed Error]', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
