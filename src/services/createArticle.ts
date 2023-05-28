"use server";
import { prisma } from "@/libs/prismaClient";

export const createArticle = async ({
  slug,
  title,
  body,
}: {
  slug: string;
  title: string;
  body: string;
}) => {
  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
  });
  if (article) {
    return { ok: false, errorMessage: "slugがすでに使われています" } as const;
  }
  try {
    await prisma.article.create({ data: { slug, title, body } });
    // TODO: Webhookでビルドし直す
    return { ok: true } as const;
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      errorMessage: "記事の作成に失敗しました",
    } as const;
  }
};
