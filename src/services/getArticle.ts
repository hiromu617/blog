import { prisma } from "@/libs/prismaClient";

export const getArticle = async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: { slug },
  });
  return article;
};
