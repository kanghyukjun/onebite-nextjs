import style from "./index.module.css";

export default function Home() {
  const { h1, h2 } = style;
  return (
    <>
      <h1 className={h1}>hello world</h1>
      <h2 className={h2}>H2</h2>
    </>
  );
}
