/*
  Warnings:

  - You are about to alter the column `name` on the `doctor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(120)`.
  - You are about to alter the column `crm` on the `doctor` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `doctor` MODIFY `name` VARCHAR(120) NOT NULL,
    MODIFY `crm` TINYINT NOT NULL;
