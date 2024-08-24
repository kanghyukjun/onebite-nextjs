import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  // catch all segment
  // book 뒤에 아무것도 오지 않으면 오류 발생
  // 대괄호로 두번 감싸면 뒤에 id가 오지 않아도 오류가 발생하지 않는다. optional
  // [[...id]] -> optional catch all segment
  const { id } = router.query; // param, query string과 동일하게 router 객체에 저장이 된다

  return <h1>Book : {id}</h1>;
}
