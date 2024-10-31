/*
  Warnings:

  - Made the column `distance` on table `Freight` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Freight" ALTER COLUMN "distance" SET NOT NULL;
