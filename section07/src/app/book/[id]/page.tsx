import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import { writeContent } from "@/action/write-content.action";

// export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }

    return <div>오류야~</div>;
  }

  const {
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  }: BookData = await response.json();

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function Content({ bookId }: { bookId: string }) {
  return (
    <form action={writeContent}>
      <input required type="text" name="content" placeholder="댓글 내용" />
      <input required type="text" name="author" placeholder="작성자" />
      <input hidden type="text" name="bookId" value={bookId} />
      <button type="submit">등록</button>
    </form>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <Content bookId={params.id} />
    </div>
  );
}
