import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from 'react-helmet';

const Layout = ({ title, description, className, children }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description}/>
        <link ref="canonical" href={window.location.href} />
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
