-- CreateTable
CREATE TABLE "magicLoginToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "magicLoginToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "magicLoginToken_token_key" ON "magicLoginToken"("token");

-- CreateIndex
CREATE INDEX "magicLoginToken_userId_idx" ON "magicLoginToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "magicLoginToken_userId_key" ON "magicLoginToken"("userId");

-- AddForeignKey
ALTER TABLE "magicLoginToken" ADD CONSTRAINT "magicLoginToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
