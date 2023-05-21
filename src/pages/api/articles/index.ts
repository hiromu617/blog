import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const articles = await prisma.article.findMany();

    if (articles.length === 0) {
      res.status(404).end();
      return;
    }

    res.status(200).json(articles);
  }
}
