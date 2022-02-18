-- CreateTable
CREATE TABLE `doctor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `crm` INTEGER NOT NULL,
    `landline` INTEGER NOT NULL,
    `cell_phone` INTEGER NOT NULL,
    `cep` INTEGER NOT NULL,
    `medical_specialty` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `doctor_crm_key`(`crm`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
