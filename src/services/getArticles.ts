import { prisma } from "@/libs/prismaClient";
export const getArticles = async (currentPage?: number) => {
  const articles = await prisma.article.findMany({
    skip: !currentPage ? 0 : (currentPage - 1) * 10,
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return articles;
};
