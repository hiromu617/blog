import { PrismaClient } from "@prisma/client";
import { Article, PrismaPromise } from "@prisma/client";
import fs from "fs";
import { resolve } from "path";
export const prisma = new PrismaClient();

const articles = () => {
  const articles: PrismaPromise<Article>[] = [];
  const body = fs.readFileSync(resolve(__dirname, "article-mock.md"), "utf8");
  [...new Array(30)].forEach(async (_, i) => {
    await prisma.article.create({
      data: {
        title: `ブログのタイトル${i}`,
        body,
        slug: `slug${i}`,
      },
    });
  });
  return articles;
};

const main = async () => {
  console.log(`Start seeding ...`);
  // await prisma.article.deleteMany()
  await prisma.$transaction([...articles()]);
  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
