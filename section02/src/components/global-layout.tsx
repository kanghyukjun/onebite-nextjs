import Link from "next/link";
import React, { ReactNode } from "react";
import style from "./global-layout.module.css";

type GlobalLayoutProps = {
  children: ReactNode;
};

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>📚 ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @deadbird00</footer>
    </div>
  );
};

export default GlobalLayout;
