/*
  Warnings:

  - You are about to alter the column `value` on the `Freight` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `fee` on the `Freight` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Freight" ALTER COLUMN "value" SET DATA TYPE INTEGER,
ALTER COLUMN "fee" SET DATA TYPE INTEGER;
