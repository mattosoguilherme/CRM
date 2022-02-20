/*
  Warnings:

  - You are about to drop the column `medical_specialty` on the `doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `doctor` DROP COLUMN `medical_specialty`;

-- CreateTable
CREATE TABLE `Speciality` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speciality` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DoctorToSpeciality` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DoctorToSpeciality_AB_unique`(`A`, `B`),
    INDEX `_DoctorToSpeciality_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DoctorToSpeciality` ADD FOREIGN KEY (`A`) REFERENCES `doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DoctorToSpeciality` ADD FOREIGN KEY (`B`) REFERENCES `Speciality`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
