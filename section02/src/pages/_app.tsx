import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const handleClickButton = () => {
    router.push("/test");
  };

  useEffect(() => {
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={handleClickButton}>/test 페이지</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
