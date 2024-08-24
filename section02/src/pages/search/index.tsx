import { useRouter } from "next/router"; // folder router

export default function Page() {
  const router = useRouter();

  // console.log(router.query); // 쿼리스트링을 읽을 때 컴포넌트를 한번 더 렌더링 시키기 때문에 로그가 두번 찍힘.
  const { q } = router.query;

  return <h1>Search : {q}</h1>;
}
