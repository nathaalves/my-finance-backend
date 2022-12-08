-- CreateTable
CREATE TABLE "icons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "icons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "icons" ADD CONSTRAINT "icons_iconGroupId_fkey" FOREIGN KEY ("iconGroupId") REFERENCES "icon_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
