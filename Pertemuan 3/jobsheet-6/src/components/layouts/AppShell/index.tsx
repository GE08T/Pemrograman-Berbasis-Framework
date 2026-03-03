import Footer from "../footer";
import { useRouter } from "next/router";
import Navbar from "../navbar";

const disableNavbar = ["/auth/login", "/auth/register"];
const disableFooter = ["/auth/login", "/auth/register"];

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props:AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();
  return (
    <main>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
      {!disableFooter.includes(pathname) && <Footer />}
    </main>
  )
};

export default AppShell;