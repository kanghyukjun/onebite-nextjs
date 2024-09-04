"use server";

export async function writeContent(formData: FormData) {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!content || !author || !bookId) {
    return;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
    {
      method: "POST",
      body: JSON.stringify({
        content,
        author,
        bookId,
      }),
    }
  );
}
