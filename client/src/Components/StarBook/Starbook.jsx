import Tap from "../Tap/Tap.jsx";
import PageProvider from "../../provider/PageProvider.jsx";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
export default function StarBook() {
  const location = useLocation();
  const hideFooter = ["/write", "account", "modify", "/login", "/signup"].includes(location.pathname);
  return (
    <>
      <PageProvider>
        <Outlet />
        {!hideFooter && <Tap />}
      </PageProvider>
    </>
  );
}
