/*
  Warnings:

  - You are about to drop the `_doctortospeciality` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `speciality` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_doctortospeciality` DROP FOREIGN KEY `_doctortospeciality_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_doctortospeciality` DROP FOREIGN KEY `_doctortospeciality_ibfk_2`;

-- DropTable
DROP TABLE `_doctortospeciality`;

-- DropTable
DROP TABLE `speciality`;

-- CreateTable
CREATE TABLE `specialty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speciality` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DoctorToSpecialty` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DoctorToSpecialty_AB_unique`(`A`, `B`),
    INDEX `_DoctorToSpecialty_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DoctorToSpecialty` ADD FOREIGN KEY (`A`) REFERENCES `doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DoctorToSpecialty` ADD FOREIGN KEY (`B`) REFERENCES `specialty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
