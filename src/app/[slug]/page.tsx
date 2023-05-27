import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

const getArticle = async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: { slug },
  });
  return article;
};

export default async function Detail({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <h1>{article.title}</h1>
      <article>{article.body}</article>
    </>
  );
}
