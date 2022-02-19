/*
  Warnings:

  - Added the required column `bairro` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complemento` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidade` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `bairro` VARCHAR(191) NOT NULL,
    ADD COLUMN `complemento` VARCHAR(191) NOT NULL,
    ADD COLUMN `localidade` VARCHAR(191) NOT NULL,
    ADD COLUMN `logradouro` VARCHAR(191) NOT NULL,
    ADD COLUMN `uf` VARCHAR(191) NOT NULL;
