import { Link, Outlet } from 'react-router-dom'
import usePersist from '../hooks/usePersist'
import { useRefreshMutation } from "app/api/authApiSlice"
import { useEffect, useRef, useState } from 'react'
import Error from '../components/Error'
import LoadingSpinner from '../components/LoadingSpinner'
import { useGetCartMutation } from 'app/api/cartApiSlice'
import { useDispatch } from 'react-redux'
import { setCart } from 'app/api/cartSlice'

const PersistLogin = () => {
  const [persist] = usePersist()
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)
  const [getCart] = useGetCartMutation()
  const dispatch = useDispatch()

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

      const verufyRefreshTokeen = async () => {
        try {
          const { data: { user } } = await refresh()
          const { cart } = await getCart({ user: user.id }).unwrap()
          dispatch(setCart({ cart }))
          setTrueSuccess(true)
        } catch (err) {
          console.log(err)
        }
      }
      if (persist) verufyRefreshTokeen()
    }
    return () => effectRan.current = true
  }, [])

  let content
  if (!persist) {
    content = <Outlet />
  } else if (isLoading) {
    content = <LoadingSpinner />
  } else if (isError) {
    content = <Error error={error} />
  } else if (isSuccess && trueSuccess || isUninitialized) {
    content = <Outlet />
  }

  return content
}

export default PersistLogin
