// prisma/seed.ts
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Admin user
  // NOTE: DEV CREDENTIAL ONLY - admin@acropolismall.com / admin123 must be changed before production.
  const passwordHash = await bcrypt.hash('admin123', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@acropolismall.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@acropolismall.com',
      passwordHash,
      role: 'admin',
    },
  });

  // Project
  const project = await prisma.project.upsert({
    where: { id: 'project-1' },
    update: {},
    create: {
      id: 'project-1',
      name: 'ACROPOLIS THE MALL (COMMERCIAL)',
      description: 'A planned commercial development near Chatidih Road, Bilaspur, designed with multiple commercial spaces and supporting facilities.',
      address: 'P.H.N. 33, Village Chantidih, Tehsil Bilaspur, Chhattisgarh',
      promoter: 'YUVRAJ ENTERPRISES',
    },
  });

  // RERA
  await prisma.reraRegistration.upsert({
    where: { projectId: project.id },
    update: {},
    create: {
      projectId: project.id,
      registrationNumber: 'PCGRERA030826002133',
      registrationDate: new Date('2026-08-03'),
      validUntil: new Date('2031-07-06'),
      verificationUrl: 'https://rera.cgstate.gov.in',
    },
  });

  // Floor plans
  const floors = [
    { floorName: 'ground', title: 'Ground Floor Plan', description: 'Ground floor layout with commercial shops, entrance foyer, basement ramp access, open restaurant area and recreational/play area.' },
    { floorName: 'first', title: 'First Floor Plan', description: 'First floor layout with commercial shops, lifts, toilets and open terrace sitting area.' },
    { floorName: 'second', title: 'Second Floor Plan', description: 'Second floor layout with commercial shops, lifts, toilets and open terrace sitting area measuring 70\' × 18\'.' },
  ];
  for (const floor of floors) {
    await prisma.floorPlan.upsert({
      where: { id: `floor-${floor.floorName}` },
      update: {},
      create: {
        id: `floor-${floor.floorName}`,
        projectId: project.id,
        ...floor,
        image: `/images/floor-plans/${floor.floorName}-floor.png`,
      },
    });
  }

  // Portfolio items
  const portfolioItems = [
    { name: 'Waterbomb The Waterpark', category: 'Waterpark / Entertainment', location: 'Mopka Bypass, Bilaspur, Chhattisgarh', description: 'A waterpark and entertainment destination.' },
    { name: 'Belleza The Family Salon', category: 'Family Salon / Beauty', location: 'Narmada Nagar, Bilaspur, Chhattisgarh', description: 'Family salon and beauty services.' },
    { name: 'Baskin Robbins (Narmada Nagar)', category: 'Food & Beverage', location: 'Narmada Nagar, Bilaspur', description: 'Baskin Robbins ice cream outlet.' },
    { name: 'Baskin Robbins (Rajendra Nagar)', category: 'Food & Beverage', location: 'Rajendra Nagar, Bilaspur', description: 'Baskin Robbins ice cream outlet.' },
    { name: 'Kanha Shyam Commercial Complex', category: 'Commercial Complex', location: 'Rajendra Nagar, Bilaspur', description: 'Commercial complex with premises occupied by Axis Bank, Axis Finance, and Acharya Institute.' },
    { name: 'Devideen Commercial Complex', category: 'Commercial Complex', location: 'Madhya Nagri Chowk, Bilaspur', description: 'Commercial complex in central Bilaspur.' },
    { name: 'Marine Drive Bilaspur Adventure Park', category: 'Adventure / Recreation', location: 'New Riverview Road, Bilaspur', description: 'Adventure and recreation park.' },
  ];
  for (let i = 0; i < portfolioItems.length; i++) {
    await prisma.portfolioItem.upsert({
      where: { id: `portfolio-${i + 1}` },
      update: {},
      create: { id: `portfolio-${i + 1}`, ...portfolioItems[i] },
    });
  }

  // Gallery images
  const galleryItems = [
    { id: 'gallery-1', category: 'Project', title: 'Acropolis The Mall – Project View', imageUrl: '/images/hero_section.png', altText: 'View of the Acropolis The Mall project', sortOrder: 1 },
    { id: 'gallery-2', category: 'Floor Plans', title: 'Ground Floor Plan', imageUrl: '/images/floor-plans/ground-floor.png', altText: 'Architectural ground floor plan', sortOrder: 2 },
  ];
  for (const item of galleryItems) {
    await prisma.galleryImage.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }

  // Site settings
  const settings = [
    { key: 'phone', value: '' },
    { key: 'whatsapp', value: '' },
    { key: 'email', value: 'acropolismallg@gmail.com' },
    { key: 'address', value: 'P.H.N. 33, Village Chantidih, Tehsil Bilaspur, Chhattisgarh' },
    { key: 'promoter', value: 'YUVRAJ ENTERPRISES' },
    { key: 'registered_office', value: 'H-2/75, Ring Road, Narmada Nagar, Bilaspur, Chhattisgarh' },
    { key: 'map_url', value: 'https://maps.google.com/maps?q=22.0947208%2C82.1596756&t=m&z=17&output=embed&iwloc=near' },
    { key: 'logo', value: '' },
    { key: 'favicon', value: '' },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  console.log('Seed complete');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());