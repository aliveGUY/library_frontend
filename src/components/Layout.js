import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from 'react-helmet';

const Layout = ({ title, description, className, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className={`App ${className}`}>
        <Navbar key="navbar" />
        <div className="pages-wrapper" key="pages-wrapper">
          {children}
        </div>
        <Footer key="footer" />
      </div>
    </>
  );
};

export default Layout;
