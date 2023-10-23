/*
  Warnings:

  - You are about to drop the column `avaible` on the `bike` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bike` DROP COLUMN `avaible`,
    ADD COLUMN `available` BOOLEAN NULL DEFAULT true;
