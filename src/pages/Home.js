import { useGetBooksQuery } from "app/api/booksApiSlice"
import LoadingSpinner from "components/LoadingSpinner"
import Error from "components/Error"
import BooksMap from "components/BooksMap"
import { useTranslation, Trans } from "react-i18next"
import Layout from "components/Layout"
import Section from "components/Section"
import Button from "components/Button"
import BookSearch from "components/BookSearch"
import logged_out_image from 'images/sections/hero-image.png'
import logged_in_image from 'images/sections/logged-in-hero.png'
import useAuth from "hooks/useAuth"

const CTAHero = () => (
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
      <img src={logged_out_image} alt="hero"  width="100%" height="auto" title="hero" loading="eager"/>
    </div>
  </Section>
)

const GreetingsHero = ({ name }) => (
  <Section className="home-heading-loggedin">
    <div className="image-wrapper">
      <img src={logged_in_image} alt="hero" width="100%" height="auto" title="hero" loading="eager"/>
    </div>
    <div className="text-column">
      <h1>
        <Trans>Welcome back {{ name }}!</Trans>
      </h1>
    </div>
  </Section>
)

const Home = () => {
  const user = useAuth()
  const loggedIn = Boolean(user?.username)
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

  let booksList
  if (isError) booksList = <Error error={error} />
  if (isLoading) booksList = <LoadingSpinner />
  if (isSuccess) booksList = <BooksMap books={books} />

  return (
    <Layout title={title} description={description} className="Home">
      {loggedIn
        ? <GreetingsHero name={user.username} />
        : <CTAHero />
      }
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
        {booksList}
      </Section>
    </Layout>
  )
}

export default Home