import Navbar from "./Navbar"
import Footer from "./Footer"
import { Helmet } from 'react-helmet'

const Layout = ({ title, description, className, children }) => {
  return [
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <link ref="canonical" href={window.location.href} />
    </Helmet>,
    <div className={`App ${className}`}>
      <Navbar />
      <div className="pages-wrapper">
        {children}
      </div>
      <Footer />
    </div>
  ]
}

export default Layout
