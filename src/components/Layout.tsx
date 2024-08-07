import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

type LayoutProps = {
  children?: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <Navbar />
      <section>
        <div className="py-8 px-4 lg:py-16 max-w-screen-xl mx-auto">
          <Outlet />
          {children}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
