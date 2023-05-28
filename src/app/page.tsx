import { Pagination } from "./_components/Pagination";
import { getArticles } from "@/services/getArticles";
import { getArticlesCount } from "@/services/getArticleCount";
import { ArticleList } from "./_components/ArticleList";

export default async function Home() {
  const articlesData = getArticles();
  const countData = getArticlesCount();

  const [articles, count] = await Promise.all([articlesData, countData]);

  return (
    <div className="m-auto w-96 md:w-[768px] px-1">
      <ArticleList articles={articles} />
      <div className="pt-8 pb-12 text-center">
        <Pagination totalCount={count} />
      </div>
    </div>
  );
}
