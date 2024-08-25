-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "securityQ" TEXT NOT NULL,
    "securityA" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "acc_no" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("acc_no")
);

-- CreateTable
CREATE TABLE "ExpanseCategory" (
    "expcat_no" SERIAL NOT NULL,
    "expcat_name" TEXT NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpanseCategory_pkey" PRIMARY KEY ("expcat_no")
);

-- CreateTable
CREATE TABLE "Expanses" (
    "exp_id" SERIAL NOT NULL,
    "expcat_no" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "expanseType" TEXT NOT NULL,
    "expanse_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expanses_pkey" PRIMARY KEY ("exp_id")
);

-- CreateTable
CREATE TABLE "TransactionDetails" (
    "trans_id" TEXT NOT NULL,
    "from_id" TEXT NOT NULL,
    "to_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "trans_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trans_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "TransactionDetails_pkey" PRIMARY KEY ("trans_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expanses" ADD CONSTRAINT "Expanses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expanses" ADD CONSTRAINT "Expanses_expcat_no_fkey" FOREIGN KEY ("expcat_no") REFERENCES "ExpanseCategory"("expcat_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetails" ADD CONSTRAINT "TransactionDetails_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionDetails" ADD CONSTRAINT "TransactionDetails_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
