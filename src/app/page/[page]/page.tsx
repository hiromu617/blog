import { Pagination } from "@/app/_components/Pagination";
import Link from "next/link";
import { getArticles } from "@/services/getArticles";
import { getArticlesCount } from "@/services/getArticleCount";

export const generateStaticParams = async () => {
  const count = await getArticlesCount();

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(2, Math.ceil(count / 10)).map(
    (repo) => `/blogs/page/${repo}`
  );

  return paths;
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
