import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={className}>
    <ScrollToTop />
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
