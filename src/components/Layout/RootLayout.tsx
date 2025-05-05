import Navbar from "../Navbar";
import Footer from "../Footer";
import { IChildren } from "../../types/interfaces";

interface IRootLayoutProps extends IChildren {
  footer?: boolean;
}

const RootLayout = ({ children, footer = true }: IRootLayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      {footer && <Footer />}
    </>
  );
};

export default RootLayout;
