import { notFound } from "next/navigation";
import { getArticle } from "@/services/getArticle";
import { prisma } from "@/libs/prismaClient";
export const generateStaticParams = async () => {
  const articles = await prisma.article.findMany();

  return articles.map((article) => ({
    slug: article.slug,
  }));
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
