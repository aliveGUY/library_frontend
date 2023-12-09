import { useGetBooksQuery } from "app/api/booksSlice"
import LoadingSpinner from "components/LoadingSpinner"
import Error from "components/Error"
import BooksMap from "components/BooksMap"
import { useTranslation, Trans } from "react-i18next"
import Layout from "components/Layout"
import Section from "components/Section"
import image from 'images/sections/hero-image.png'
import Button from "components/Button"
import BookSearch from "components/BookSearch"

const Home = () => {
  const { t } = useTranslation()
  const title = t("IMBook — Homepage")
  const description = t("IMBook gives writers the opportunity to monetize their stories, find a publisher, and more. Join our community to realize all your ideas.")
  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBooksQuery()

  let content

  if (isError) content = <Error error={error} />
  if (isLoading) content = <LoadingSpinner />

  if (isSuccess) {
    content = (
      <Layout title={title} description={description} className="Home">
        <Section className="home-heading">
          <div className="text-column">
            <div className="badge">
              <Trans>meet the imbook</Trans>
            </div>
            <h1>
              <Trans>Amplify Your Reach</Trans>
            </h1>
            <p>
              <Trans>IMBook is the perfect platform for talented writers looking to captivate a wide audience. We not only enable you to monetize your works by selling them in our store but also create opportunities to attract publishers interested in collaborating with you. Don't waste time – bring your literary dreams to life with us!</Trans>
            </p>
            <Button className="cta" theme="grullo" href="/registration">
              <Trans>Get Started</Trans>
            </Button>
          </div>
          <div className="image-wrapper">
            <img src={image} alt="hero image" />
          </div>
        </Section>
        <Section className="booksearch-section">
          <h2>
            <Trans>Explore, read! Find books using our search bar that ignite your imagination.</Trans>
          </h2>
          <BookSearch />
        </Section>
        <Section className="bookmap-section">
          <h2>
            <Trans>Reading Radar: Books on <span className="colored">the Rise</span></Trans>
          </h2>
          <BooksMap books={books} />
        </Section>
      </Layout>
    )
  }

  return content
}

export default Home