"use client";
import { createArticle } from "@/services/createArticle";
import { useRouter } from "next/navigation";

export default function ArticlesNew() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const slug = formData.get("slug") as string | null;
    const title = formData.get("title") as string | null;
    const body = formData.get("body") as string | null;
    if (!slug || !title || !body) return;

    const result = await createArticle({ slug, title, body });
    if (result.ok) {
      alert("記事を作成しました");
      router.push("/");
    } else {
      alert(result.errorMessage);
    }
  };

  return (
    <div className="m-auto w-full md:w-[768px] px-1 py-5">
      <div className="flex justify-between items-center mb-5">
        <div className="tabs tabs-boxed inline-block">
          <button className="tab" type="button">
            Markdown
          </button>
          <button className="tab tab-active" type="button">
            Preview
          </button>
        </div>
        <button type="submit" className="btn btn-primary" form="article-form">
          公開する
        </button>
      </div>
      <form
        className="text-base-content"
        id="article-form"
        action={handleSubmit}
      >
        <label>
          <div className="font-bold mb-2 text-lg">slug</div>
          <input
            type="text"
            name="slug"
            required
            className="input input-bordered mb-5 invalid:input-error"
          />
        </label>
        <label>
          <div className="font-bold mb-2 text-lg">タイトル</div>
          <input
            type="text"
            name="title"
            required
            placeholder="Title"
            className="input input-bordered w-full mb-5 invalid:input-error"
          />
        </label>
        <label>
          <div className="font-bold mb-2 text-lg">本文</div>
          <textarea
            name="body"
            required
            className="textarea textarea-bordered w-full min-h-[1000px] invalid:textarea-error"
          ></textarea>
        </label>
      </form>
    </div>
  );
}
