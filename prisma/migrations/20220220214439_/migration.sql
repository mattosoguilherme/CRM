/*
  Warnings:

  - You are about to drop the column `speciality` on the `specialty` table. All the data in the column will be lost.
  - Added the required column `specialty` to the `specialty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `specialty` DROP COLUMN `speciality`,
    ADD COLUMN `specialty` VARCHAR(191) NOT NULL;
