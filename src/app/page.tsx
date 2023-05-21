import { Article } from "@prisma/client";

async function getArticles() {
  const res = await fetch("http://localhost:3000/api/articles");

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();

  return data as Article[];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.slug}>{article.title}</li>
      ))}
    </ul>
  );
}
