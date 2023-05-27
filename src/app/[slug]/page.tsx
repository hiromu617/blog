import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getArticle = async (slug: string) => {
  const article = await prisma.article.findUniqueOrThrow({
    where: { slug },
  });
  return article;
};

export default async function Detail({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <>
      <h1>{article.title}</h1>
      <article>{article.body}</article>
    </>
  );
}
