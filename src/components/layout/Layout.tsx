import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <ScrollToTop />
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
