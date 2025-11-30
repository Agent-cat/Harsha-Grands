/*
  Warnings:

  - Added the required column `bookingDate` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "bookingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPhone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
