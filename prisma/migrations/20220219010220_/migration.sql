/*
  Warnings:

  - You are about to drop the column `complemento` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `complement` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` DROP COLUMN `complemento`,
    ADD COLUMN `complement` VARCHAR(191) NOT NULL;
