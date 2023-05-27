import { notFound } from "next/navigation";
import { getArticle } from "@/services/getArticle";
import { prisma } from "@/libs/prismaClient";
import { format } from "date-fns";
import { ArticleBody } from "../_components/ArticleBody";

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
    <div className="w-full px-2 md:max-w-2xl mx-auto mt-10 mb-20">
      <h1 className="text-3xl font-bold mb-5">{article.title}</h1>
      <time className="block mb-10">
        {format(new Date(article.createdAt), "yyyy.MM.dd")}
      </time>
      <ArticleBody body={article.body} />
    </div>
  );
}
