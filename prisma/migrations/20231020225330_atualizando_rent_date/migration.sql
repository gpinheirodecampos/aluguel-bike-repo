/*
  Warnings:

  - Added the required column `end` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rent` ADD COLUMN `end` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);
