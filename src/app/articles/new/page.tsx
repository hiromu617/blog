"use client";
import { createArticle } from "@/services/createArticle";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { ArticleBody } from "@/app/_components/ArticleBody";
import { ArticlesNewForm } from "./_components/NewArticleForm";

export default function ArticlesNew() {
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [formData, setFormData] = useState({ slug: "", title: "", body: "" });
  const [errorMessage, setErrorMessage] = useState<{
    slug: string | null;
    title: string | null;
    body: string | null;
  }>({
    slug: null,
    title: null,
    body: null,
  });
  const router = useRouter();

  const validateFormData = () => {
    setErrorMessage({
      slug: formData.slug.length !== 0 ? null : "slugを入力してください",
      title: formData.title.length !== 0 ? null : "タイトルを入力してください",
      body: formData.body.length !== 0 ? null : "本文を入力してください",
    });
    if (
      formData.slug.length !== 0 &&
      formData.title.length !== 0 &&
      formData.body.length !== 0
    )
      return true;
    return false;
  };

  const handleSubmit = async () => {
    const ok = validateFormData();
    if (!ok) return;
    const result = await createArticle({ ...formData });
    if (result.ok) {
      alert("記事を作成しました");
      router.push("/");
    } else {
      alert(result.errorMessage);
    }
  };

  const onSlugInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, slug: e.target.value });
    setErrorMessage({
      ...errorMessage,
      slug: e.target.value.length === 0 ? "slugを入力してください" : null,
    });
  };

  const onTitleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
    setErrorMessage({
      ...errorMessage,
      title: e.target.value.length === 0 ? "タイトルを入力してください" : null,
    });
  };

  const onBodyTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, body: e.target.value });
    setErrorMessage({
      ...errorMessage,
      body: e.target.value.length === 0 ? "本文を入力してください" : null,
    });

    return (
      <div className="m-auto w-full md:w-[768px] px-1 py-5">
        <div className="flex justify-between items-center mb-5">
          <div className="tabs tabs-boxed inline-block">
            <button
              className={`tab ${!isShowPreview && "tab-active"}`}
              onClick={() => setIsShowPreview(false)}
              type="button"
            >
              Markdown
            </button>
            <button
              className={`tab ${isShowPreview && "tab-active"}`}
              onClick={() => setIsShowPreview(true)}
              type="button"
            >
              Preview
            </button>
          </div>
          <button type="submit" className="btn btn-primary" form="article-form">
            公開する
          </button>
        </div>
        {isShowPreview ? (
          <ArticleBody body={formData.body} />
        ) : (
          <ArticlesNewForm
            formData={formData}
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            onBodyTextAreaChange={onBodyTextAreaChange}
            onSlugInputChange={onSlugInputChange}
            onTitleInputChange={onTitleInputChange}
          />
        )}
      </div>
    );
  };
}
