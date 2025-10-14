-- CreateTable
CREATE TABLE "Moliya" (
    "id" TEXT NOT NULL,
    "invoice" TEXT NOT NULL,
    "All_Kirim" BIGINT NOT NULL,
    "All_Chiqim" BIGINT NOT NULL,
    "foyda" BIGINT NOT NULL,
    "using_budjet" DOUBLE PRECISION NOT NULL,
    "supllier" TEXT NOT NULL,
    "summa" BIGINT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Moliya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hisobotlar" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,
    "summa" INTEGER NOT NULL,

    CONSTRAINT "Hisobotlar_pkey" PRIMARY KEY ("id")
);
