/*
  Warnings:

  - You are about to drop the column `weight` on the `Freight` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `fee` to the `Freight` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Caminhonete', 'Furgao', 'Caminhao');

-- AlterTable
ALTER TABLE "Freight" DROP COLUMN "weight",
ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "capacity",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Caminhonete';
