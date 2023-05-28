"use client";
import { FC, ChangeEventHandler } from "react";

type Props = {
  formData: { slug: string; title: string; body: string };
  errorMessage: {
    slug: string | null;
    title: string | null;
    body: string | null;
  };
  handleSubmit: () => void;
  onSlugInputChange: ChangeEventHandler<HTMLInputElement>;
  onTitleInputChange: ChangeEventHandler<HTMLInputElement>;
  onBodyTextAreaChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export const ArticlesNewForm: FC<Props> = ({
  formData,
  errorMessage,
  handleSubmit,
  onSlugInputChange,
  onTitleInputChange,
  onBodyTextAreaChange,
}) => {
  return (
    <form className="text-base-content" id="article-form" action={handleSubmit}>
      <label className="pb-5">
        <div className="font-bold mb-2 text-lg">slug</div>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={onSlugInputChange}
          className={`input input-bordered ${
            errorMessage.slug && "input-error"
          }`}
        />
        {errorMessage.slug && (
          <p className="text-error py-2">{errorMessage.slug}</p>
        )}
      </label>
      <label className="pb-5">
        <div className="font-bold mb-2 text-lg">タイトル</div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onTitleInputChange}
          placeholder="Title"
          className={`input w-full input-bordered ${
            errorMessage.title && "input-error"
          }`}
        />
        {errorMessage.title && (
          <p className="text-error py-2">{errorMessage.title}</p>
        )}
      </label>
      <label className="pb-5">
        <div className="font-bold mb-2 text-lg">本文</div>
        <textarea
          name="body"
          value={formData.body}
          onChange={onBodyTextAreaChange}
          className={`textarea w-full min-h-[1000px] textarea-bordered ${
            errorMessage.body && "textarea-error"
          }`}
        ></textarea>
        {errorMessage.body && (
          <p className="text-error py-2">{errorMessage.body}</p>
        )}
      </label>
    </form>
  );
};
