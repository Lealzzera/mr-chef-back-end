/*
  Warnings:

  - You are about to drop the column `storeId` on the `item_menus` table. All the data in the column will be lost.
  - You are about to drop the column `itemMenuId` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `stores` table. All the data in the column will be lost.
  - Added the required column `store_id` to the `item_menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item_menus" DROP CONSTRAINT "item_menus_storeId_fkey";

-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_userId_fkey";

-- AlterTable
ALTER TABLE "item_menus" DROP COLUMN "storeId",
ADD COLUMN     "store_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "itemMenuId",
DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_menus" ADD CONSTRAINT "item_menus_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
