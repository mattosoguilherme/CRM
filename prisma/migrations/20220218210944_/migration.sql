/*
  Warnings:

  - Added the required column `updatedAT` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `createdAT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAT` DATETIME(3) NOT NULL,
    MODIFY `crm` INTEGER NOT NULL;
