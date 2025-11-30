const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log("Start seeding...");

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@grandconvention.com" },
    update: {},
    create: {
      email: "admin@grandconvention.com",
      name: "Admin User",
      role: "ADMIN",
    },
  });

  console.log("Created admin user:", adminUser);

  // Create halls
  const halls = [
    {
      name: "Royal Ballroom",
      description:
        "Our most prestigious venue featuring crystal chandeliers and marble floors. Perfect for grand weddings and corporate galas.",
      capacity: 500,
      pricePerHour: 250,
      imageUrl:
        "https://images.unsplash.com/photo-1519161040466-0d2a13d9c585?w=800&h=600&fit=crop",
      amenities: [
        "Crystal Chandeliers",
        "Marble Floors",
        "Stage",
        "Dance Floor",
        "Premium Sound System",
        "Climate Control",
        "Valet Parking",
        "Security Staff",
        "Dressing Rooms",
        "Catering Kitchen",
      ],
    },
    {
      name: "Crystal Hall",
      description:
        "Elegant space with natural lighting and garden views. Ideal for intimate gatherings and sophisticated events.",
      capacity: 300,
      pricePerHour: 180,
      imageUrl:
        "https://images.unsplash.com/photo-1469371670807-013ccf25f92a?w=800&h=600&fit=crop",
      amenities: [
        "Natural Lighting",
        "Garden Views",
        "AV Equipment",
        "Dance Floor",
        "Climate Control",
        "Parking",
        "High-Speed WiFi",
        "Presentation Screens",
        "Sound System",
        "Catering Services",
      ],
    },
  ];

  // Clear existing halls
  await prisma.hall.deleteMany();

  // Insert halls
  for (const hall of halls) {
    await prisma.hall.create({
      data: hall,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
