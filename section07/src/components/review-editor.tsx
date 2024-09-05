"use client";

import { writeContent } from "@/action/write-content.action";
import style from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(writeContent, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form className={style.form_container} action={formAction}>
      <input hidden type="text" name="bookId" value={bookId} />
      <textarea disabled={isPending} required name="content" placeholder="댓글 내용" />
      <div className={style.submit_container}>
        <input disabled={isPending} required type="text" name="author" placeholder="작성자" />
        <button disabled={isPending} type="submit">
          {isPending ? "..." : "작성"}
        </button>
      </div>
    </form>
  );
}
