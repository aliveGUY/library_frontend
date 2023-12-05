import { Link, Outlet } from 'react-router-dom'
import usePersist from '../hooks/usePersist'
import { useRefreshMutation } from "../app/api/authApiSlice"
import { useEffect, useRef, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import Error from './Error'

const PersistLogin = () => {
  const [persist] = usePersist()
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

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
          await refresh()
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
    content = <Outlet />
  } else if (isSuccess && trueSuccess || isUninitialized) {
    content = <Outlet />
  }

  return content
}

export default PersistLogin
