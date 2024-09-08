import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

const baseURL = process.env.NEXT_PUBLIC_API_SERVER_URL;

// 특정 페이지의 유형을 강제로 Static 혹은 Dynamic으로 설정
// 1. auto : 기본값, 아무것도 강제하지 않는다.
// 2. force-dynamic
// 3. force-static
// 4. error

export const metadata: Metadata = {
  title: "한입 북스",
  description: "한입 북스에 등록된 도서를 만나보세요",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요",
    images: [`/thumbnail.png`],
  },
};

async function AllBooks() {
  const response = await fetch(`${baseURL}/book`, { cache: "force-cache" });
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
  const response = await fetch(`${baseURL}/book/random`, {
    next: { revalidate: 3 },
  });
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
