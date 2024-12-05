import styles from "./Header.module.css"; // CSS 모듈 import
import { useContext } from "react";
import { PageData } from "../../provider/PageProvider";
import { headerComponents } from "./headerComponents";
export default function Header() {
  const { page } = useContext(PageData);

  return <header className={styles.header}>{headerComponents[page] || null}</header>;
}
