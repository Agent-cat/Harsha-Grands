import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Hall ID is required" },
        { status: 400 }
      );
    }

    const hall = await prisma.hall.findUnique({
      where: {
        id: id,
      },
    });

    if (!hall) {
      return NextResponse.json({ error: "Hall not found" }, { status: 404 });
    }

    return NextResponse.json(hall);
  } catch (error) {
    console.error("Error fetching hall:", error);
    return NextResponse.json(
      { error: "Failed to fetch hall" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await request.json();
    const hall = await prisma.hall.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(hall);
  } catch (error) {
    console.error("Error updating hall:", error);
    return NextResponse.json(
      { error: "Failed to update hall" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    await prisma.hall.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Hall deleted successfully" });
  } catch (error) {
    console.error("Error deleting hall:", error);
    return NextResponse.json(
      { error: "Failed to delete hall" },
      { status: 500 }
    );
  }
}
