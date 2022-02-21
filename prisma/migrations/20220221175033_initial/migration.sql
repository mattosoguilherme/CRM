-- CreateTable
CREATE TABLE "doctor" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "crm" VARCHAR(7) NOT NULL,
    "landline" VARCHAR(10) NOT NULL,
    "cell_phone" VARCHAR(11) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "logradouro" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialty" (
    "id" SERIAL NOT NULL,
    "specialty" TEXT NOT NULL,

    CONSTRAINT "specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DoctorToSpecialty" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_crm_key" ON "doctor"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "_DoctorToSpecialty_AB_unique" ON "_DoctorToSpecialty"("A", "B");

-- CreateIndex
CREATE INDEX "_DoctorToSpecialty_B_index" ON "_DoctorToSpecialty"("B");

-- AddForeignKey
ALTER TABLE "_DoctorToSpecialty" ADD FOREIGN KEY ("A") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToSpecialty" ADD FOREIGN KEY ("B") REFERENCES "specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
