/*
  Warnings:

  - Added the required column `clientDocument` to the `ingress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ingress` ADD COLUMN `clientDocument` VARCHAR(191) NOT NULL;
