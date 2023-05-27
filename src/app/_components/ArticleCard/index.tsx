import Link from "next/link";
import { format } from "date-fns";
import { Article } from "@prisma/client";
import { FC } from "react";

type Props = {
  article: Article;
};

export const ArticleCard: FC<Props> = ({ article }) => {
  return (
    <li key={article.slug} className="card w-full bg-base-100 shadow-xl">
      <div className="card-body ">
        <Link href={`/${article.slug}`} className="card-title link">
          {article.title}
        </Link>
        <div className="truncate">{article.body}</div>
        <time className="text-right">
          {format(new Date(article.createdAt), "yyyy.MM.dd")}
        </time>
      </div>
    </li>
  );
};
