/*
  Warnings:

  - Added the required column `start` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rent` ADD COLUMN `start` DATETIME(3) NOT NULL;
