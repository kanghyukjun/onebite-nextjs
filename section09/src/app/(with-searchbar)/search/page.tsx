import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}): Metadata {
  return {
    title: `${searchParams.q ?? ""} : 한입 북스 검색`,
    description: `${searchParams.q ?? ""}의 검색 결과입니다`,
    openGraph: {
      title: `${searchParams.q ?? ""} : 한입 북스 검색`,
      description: `${searchParams.q ?? ""}의 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

async function SearchResult({ q }: { q: string }) {
  // 이 fetch가 늦어지더라도 streaming이 되도록 설정
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books?.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <Suspense
      key={searchParams.q ?? ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={searchParams.q ?? ""} />
    </Suspense>
  );
}
