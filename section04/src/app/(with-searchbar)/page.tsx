import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_SERVER_URL;

async function AllBooks() {
  const response = await fetch(`${baseURL}/book`);
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <>
      {allBooks?.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

async function RecommendedBooks() {
  const response = await fetch(`${baseURL}/book/random`);
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recommended: BookData[] = await response.json();
  return (
    <>
      {recommended?.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecommendedBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
