import { useRouter } from "next/router";
import style from "./[id].module.css";
import fetchBookById from "@/lib/fetch-book-by-id";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const data = await fetchBookById(Number(id));

  return {
    props: {
      data,
    },
  };
};

export default function Page({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
        </Head>
        <div>로딩중입니다.</div>
      </>
    );
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  const { id, title, subTitle, author, coverImgUrl, description, publisher } = data;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
