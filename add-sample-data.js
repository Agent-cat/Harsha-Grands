const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Adding sample data...");

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
    {
      name: "Diamond Suite",
      description:
        "Exclusive boutique venue with private terrace and VIP lounge. Perfect for high-end corporate events and private celebrations.",
      capacity: 150,
      pricePerHour: 120,
      imageUrl:
        "https://images.unsplash.com/photo-1519167758480-71f985e57e68?w=800&h=600&fit=crop",
      amenities: [
        "Private Terrace",
        "VIP Lounge",
        "Premium Bar",
        "Climate Control",
        "Valet Parking",
        "Butler Service",
        "High-Speed WiFi",
        "Presentation Equipment",
        "Private Restrooms",
        "Security",
      ],
    },
  ];

  // Clear existing halls
  await prisma.hall.deleteMany();
  console.log("Cleared existing halls");

  // Insert halls
  for (const hall of halls) {
    await prisma.hall.create({
      data: hall,
    });
    console.log(`Created hall: ${hall.name}`);
  }

  console.log("Sample data added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
