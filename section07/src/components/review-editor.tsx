import { writeContent } from "@/action/write-content.action";
import style from "./review-editor.module.css";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <form className={style.form_container} action={writeContent}>
      <input hidden type="text" name="bookId" value={bookId} />
      <textarea required name="content" placeholder="댓글 내용" />
      <div className={style.submit_container}>
        <input required type="text" name="author" placeholder="작성자" />
        <button type="submit">등록</button>
      </div>
    </form>
  );
}
