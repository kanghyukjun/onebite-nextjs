"use server";

import { revalidateTag } from "next/cache";

export async function deleteReview(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  // const bookId = formData.get("bookId")?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: "삭제할 에러가 없습니다",
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
    {
      method: "DELETE",
    }
  );
  revalidateTag(`review-${reviewId}`);
}
