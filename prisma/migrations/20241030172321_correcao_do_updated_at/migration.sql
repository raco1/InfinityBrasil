/*
  Warnings:

  - You are about to drop the column `update_at` on the `Freight` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Freight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Freight" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
