import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

const getArticles = async () => {
  const articles = await prisma.article.findMany();
  return articles;
};

export default async function Home() {
  const articles = await getArticles();

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={`/${article.slug}`}>{article.title}</Link>
        </li>
      ))}
    </ul>
  );
}
