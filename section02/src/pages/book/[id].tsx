import { useRouter } from "next/router";
import style from "./[id].module.css";
import fetchBookById from "@/lib/fetch-book-by-id";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;

  const data = await fetchBookById(Number(id));

  return {
    props: {
      data,
    },
  };
};

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  if (!data) {
    return "에러 발생";
  }
  const { id, title, subTitle, author, coverImgUrl, description, publisher } = data;

  return (
    <div className={style.container}>
      <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
