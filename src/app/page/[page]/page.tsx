import { Pagination } from "@/app/_components/Pagination";
import { getArticles } from "@/services/getArticles";
import { getArticlesCount } from "@/services/getArticleCount";
import { ArticleCard } from "@/app/_components/ArticleCard";
import { ArticleList } from "@/app/_components/ArticleList";

export const generateStaticParams = async () => {
  const count = await getArticlesCount();

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(2, Math.ceil(count / 10)).map((num) => ({
    page: `${num}`, //stringにしなければいけない
  }));
  return paths;
};

export default async function Index({ params }: { params: { page: number } }) {
  const articlesData = getArticles(params.page);
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
