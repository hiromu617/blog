"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
type Props = {
  totalCount: number;
};

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

const PER_PAGE = 10;

export const Pagination: React.FC<Props> = ({ totalCount }) => {
  const params = useParams();
  const currentPage = params?.page ? Number(params.page) : 1;

  return (
    <div className="btn-group">
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <Link
          href={number === 1 ? "/" : `/page/${number}`}
          key={index}
          className={`btn ${currentPage !== number ? "btn-outline" : ""}`}
          aria-current={currentPage === number ? "page" : undefined}
        >
          {number}
        </Link>
      ))}
    </div>
  );
};
