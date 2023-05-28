import { ArticleCard } from "@/app/_components/ArticleCard";
import { Article } from "@prisma/client";
import { FC } from "react";

type Props = {
  articles: Article[];
};

export const ArticleList: FC<Props> = ({ articles }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </ul>
  );
};
