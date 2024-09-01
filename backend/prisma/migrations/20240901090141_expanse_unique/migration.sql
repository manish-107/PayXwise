/*
  Warnings:

  - A unique constraint covering the columns `[expcat_name]` on the table `ExpanseCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExpanseCategory_expcat_name_key" ON "ExpanseCategory"("expcat_name");
