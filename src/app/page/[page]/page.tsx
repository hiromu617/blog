import { Pagination } from "@/app/_components/Pagination";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

const getArticlesCount = async () => {
  const count = await prisma.article.count();
  return count;
};

const getArticles = async (currentPage?: number) => {
  const articles = await prisma.article.findMany({
    skip: !currentPage ? 0 : (currentPage - 1) * 10,
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return articles;
};

export default async function Index({ params }: { params: { page: number } }) {
  const articlesData = getArticles(params.page);
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
