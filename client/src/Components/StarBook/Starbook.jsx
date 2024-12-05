import Tap from "../Tap/Tap.jsx";
import Header from "../Header/Header.jsx";
import PageProvider from "../../provider/PageProvider.jsx";
import { Outlet } from "react-router";
export default function StarBook() {
  return (
    <>
      <PageProvider>
        <Header />
        <Outlet />
        <Tap />
      </PageProvider>
    </>
  );
}
