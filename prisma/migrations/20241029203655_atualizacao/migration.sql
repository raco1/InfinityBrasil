/*
  Warnings:

  - Made the column `company_id` on table `Freight` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deliverer_id` on table `Request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `freight_id` on table `Request` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Freight" DROP CONSTRAINT "Freight_company_id_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_deliverer_id_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_freight_id_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_user_id_fkey";

-- AlterTable
ALTER TABLE "Freight" ALTER COLUMN "company_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "deliverer_id" SET NOT NULL,
ALTER COLUMN "freight_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freight" ADD CONSTRAINT "Freight_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_deliverer_id_fkey" FOREIGN KEY ("deliverer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "Freight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
