import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        hall: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      hallId,
      customerName,
      customerPhone,
      bookingDate,
      startTime,
      endTime,
      totalPrice,
    } = body;

    const booking = await prisma.booking.create({
      data: {
        userId,
        hallId,
        customerName,
        customerPhone,
        bookingDate: new Date(bookingDate),
        startTime,
        endTime,
        totalPrice,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        hall: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
