import Header from "../Header/Header";

import styles from "./Comment.module.css";

export default function Comment() {
  return (
    <>
      <Header />
      <section className={styles.comment}>
        <div>
          <figure></figure>
          <div>
            <div>타이틀</div>
            <div>내용</div>
          </div>
          <div>2일전</div>
        </div>
        <form action=""></form>
      </section>
    </>
  );
}
