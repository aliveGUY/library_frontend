import { render as rtlRender, screen, waitFor } from "@testing-library/react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from "react-redux"
import i18n from "i18n"
import '@testing-library/jest-dom'
import { I18nextProvider } from "react-i18next"
import configureStore from 'redux-mock-store'

import Login from "pages/Login"
import Registration from "pages/Registration"
import AddNewBook from "pages/AddNewBook"

import { expect } from "@jest/globals"


const mockStore = configureStore([])
const store = mockStore({ auth: { user: { roles: "Guest" } } })

const render = component => rtlRender(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={component} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
)


describe('Test Auth Form', () => {
  test('Login Form', async () => {
    render(<Login />)

    await waitFor(() => {
      expect(screen.getByTestId('username')).toBeInTheDocument()
      expect(screen.getByTestId('password')).toBeInTheDocument()
      expect(screen.getByTestId('persist')).toBeInTheDocument()
    })
  })

  test('Register Form', async () => {
    render(<Registration />)

    await waitFor(() => {
      expect(screen.getByTestId('username')).toBeInTheDocument()
      expect(screen.getByTestId('password')).toBeInTheDocument()
    })
  })
})


describe('Test Book Form', () => {
  test('Add New Book Form', async () => {
    render(<AddNewBook />)

    await waitFor(() => {
      expect(screen.getByTestId('title')).toBeInTheDocument()
      expect(screen.getByTestId('description')).toBeInTheDocument()
      expect(screen.getByTestId('price')).toBeInTheDocument()
    })
  })

})


describe('Authentication', () => {
  test('Add New Book Form', async () => {
    expect(true).toBe(true)
  })
})