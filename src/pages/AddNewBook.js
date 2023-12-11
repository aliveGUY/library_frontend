import { useEffect } from "react"
import { useAddNewBookMutation } from "app/api/booksSlice"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "components/LoadingSpinner"
import { useTranslation } from "react-i18next"
import Layout from '../components/Layout'
import Section from "components/Section"
import BookForm from 'components/BookForm'

const AddNewBook = () => {
  const { t } = useTranslation()
  const page_title = t("IMBook — Add New Book")
  const page_description = t("IMBook gives writers the opportunity to monetize their stories, find a publisher, and more. Join our community to realize all your ideas.")

  const navigate = useNavigate()

  const [addNewBook, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewBookMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  if (isError) {
    console.log(error)
  }

  return isLoading ? <LoadingSpinner /> : (
    <Layout title={page_title} description={page_description}>
      <Section>
        <BookForm callback={addNewBook}/>
      </Section>
    </Layout>
  )
}

export default AddNewBook