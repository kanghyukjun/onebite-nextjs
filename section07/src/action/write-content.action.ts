"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function writeContent(formData: FormData) {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!content || !author || !bookId) {
    return;
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
    method: "POST",
    body: JSON.stringify({
      content,
      author,
      bookId,
    }),
  });

  // revalidatePath(`/book/${bookId}`); // 이 경로에 해당하는 페이지를 다시 생성한다
  revalidateTag(`review-${bookId}`);
}
