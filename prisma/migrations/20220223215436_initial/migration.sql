-- CreateTable
CREATE TABLE `doctor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `crm` VARCHAR(7) NOT NULL,
    `landline` VARCHAR(10) NOT NULL,
    `cell_phone` VARCHAR(11) NOT NULL,
    `cep` VARCHAR(8) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `localidade` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NOT NULL,
    `createdAT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAT` DATETIME(3) NOT NULL,

    UNIQUE INDEX `doctor_crm_key`(`crm`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `specialty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `specialty` VARCHAR(191) NOT NULL,

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
