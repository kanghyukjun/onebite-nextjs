import React from "react";
import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";

const BookItem: React.FC<BookData> = ({ id, title, author, coverImgUrl, description, publisher, subTitle }) => {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <img src={coverImgUrl} />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
