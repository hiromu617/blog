import { prisma } from "@/libs/prismaClient";
export const getArticlesCount = async () => {
  const count = await prisma.article.count();
  return count;
};
