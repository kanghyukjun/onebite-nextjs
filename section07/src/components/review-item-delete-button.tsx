"use client";

import { deleteReview } from "@/action/delete-review.action";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

export default function ReviewItemDeleteButton({ reviewId, bookId }: { reviewId: number; bookId: number }) {
  const [status, action, isPending] = useFormState(deleteReview, null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status && !status.status) {
      alert(status.error);
    }
  }, [status]);

  return (
    <form ref={formRef} action={action}>
      <input hidden name="reviewId" value={reviewId} />
      <input hidden name="bookId" value={bookId} />
      {isPending ? <div>...</div> : <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>}
    </form>
  );
}
