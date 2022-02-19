-- AlterTable
ALTER TABLE `doctor` MODIFY `crm` VARCHAR(7) NOT NULL,
    MODIFY `landline` VARCHAR(10) NOT NULL,
    MODIFY `cell_phone` VARCHAR(11) NOT NULL,
    MODIFY `cep` VARCHAR(8) NOT NULL;
