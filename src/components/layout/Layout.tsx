import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import BackButton from "./BackButton";

const Layout = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={className}>
    <ScrollToTop />
    <Header />
    <BackButton />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
