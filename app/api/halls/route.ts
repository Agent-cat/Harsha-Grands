import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export async function GET(request: NextRequest) {
  try {
    const halls = await prisma.hall.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(halls);
  } catch (error) {
    console.error("Error fetching halls:", error);
    return NextResponse.json(
      { error: "Failed to fetch halls" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const hall = await prisma.hall.create({
      data: body,
    });

    return NextResponse.json(hall, { status: 201 });
  } catch (error) {
    console.error("Error creating hall:", error);
    return NextResponse.json(
      { error: "Failed to create hall" },
      { status: 500 }
    );
  }
}
