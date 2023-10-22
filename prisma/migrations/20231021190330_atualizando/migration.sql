/*
  Warnings:

  - A unique constraint covering the columns `[bikeId]` on the table `Imagem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bikeId]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `bike` MODIFY `avaible` BOOLEAN NULL DEFAULT true;

-- AlterTable
ALTER TABLE `rent` MODIFY `end` DATETIME(3) NULL,
    MODIFY `start` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Imagem_bikeId_key` ON `Imagem`(`bikeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Rent_bikeId_key` ON `Rent`(`bikeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Rent_userId_key` ON `Rent`(`userId`);
