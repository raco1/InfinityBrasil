/*
  Warnings:

  - You are about to alter the column `distance` on the `Freight` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Freight" ALTER COLUMN "distance" SET DATA TYPE INTEGER,
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fee" SET DATA TYPE DOUBLE PRECISION;
