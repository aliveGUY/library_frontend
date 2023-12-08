import { Helmet } from "react-helmet"

const MetadataProvider = ({ title, description, className, children }) => (
  <div className={className}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <link ref="canonical" href={window.location.href} />
    </Helmet>
    {children}
  </div>
)


export default MetadataProvider