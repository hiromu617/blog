import Link from "next/link";
import { Pagination } from "./_components/Pagination";
import { getArticles } from "@/services/getArticles";
import { getArticlesCount } from "@/services/getArticleCount";

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
