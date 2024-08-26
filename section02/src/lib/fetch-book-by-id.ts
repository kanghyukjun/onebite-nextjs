import { BookData } from "@/types";

export default async function fetchBookById(id: number): Promise<BookData | null> {
  const url = `http://127.0.0.1:12345/book/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
