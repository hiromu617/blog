import { Article } from "@prisma/client";

async function getArticles() {
  const res = await fetch("http://localhost:3000/api/articles");

  // エラーハンドリングを行うことが推奨されている
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();

  console.log(data);

  return data as Article[];
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {articles.map((article) => (
        <li key={article.slug}>{article.title}</li>
      ))}
      <button className="btn">Button</button>
    </main>
  );
}
