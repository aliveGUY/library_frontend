import { Outlet } from 'react-router-dom'
import usePersist from '../hooks/usePersist'
import { useRefreshMutation } from "../app/api/authApiSlice"
import { selectCurrentToken } from '../app/api/authSlice'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
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
    if (effectRan.current === true) {

      const verufyRefreshTokeen = async () => {
        try {
          await refresh()
          setTrueSuccess(true)

        } catch (err) {
          console.log(err)
        }
      }

      if (!token && persist) verufyRefreshTokeen()
    }
    return () => effectRan.current = true
  }, [])

  return <Outlet />
}

export default PersistLogin
