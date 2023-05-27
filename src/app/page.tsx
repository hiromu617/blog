import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Pagination } from "./_components/Pagination";

const prisma = new PrismaClient();

const getArticles = async () => {
  const articles = await prisma.article.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return articles;
};

const getArticlesCount = async () => {
  const count = await prisma.article.count();
  return count;
};

export default async function Home() {
  const articlesData = getArticles();
  const countData = getArticlesCount();

  const [articles, count] = await Promise.all([articlesData, countData]);

  return (
    <>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={count} />
    </>
  );
}
