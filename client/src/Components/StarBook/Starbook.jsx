import Tap from "../Tap/Tap.jsx";
import Header from "../Header/Header.jsx";
import PageProvider from "../../provider/PageProvider.jsx";

export default function StarBook({ children }) {
  return (
    <>
      <PageProvider>
        <Header />
        {children}
        <Tap />
      </PageProvider>
    </>
  );
}
