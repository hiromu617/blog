import { Pagination } from "./_components/Pagination";
import { getArticles } from "@/services/getArticles";
import { getArticlesCount } from "@/services/getArticleCount";
import { ArticleCard } from "./_components/ArticleCard";

export default async function Home() {
  const articlesData = getArticles();
  const countData = getArticlesCount();

  const [articles, count] = await Promise.all([articlesData, countData]);

  return (
    <div className="m-auto w-96">
      <ul className="flex flex-col gap-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </ul>
      <div className="pt-8 pb-12 text-center">
        <Pagination totalCount={count} />
      </div>
    </div>
  );
}
