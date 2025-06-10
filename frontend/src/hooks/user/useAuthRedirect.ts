import { useNavigate } from "react-router-dom"
import { useGetCurrentUser } from "./useGetCurrentUser"
import { useEffect } from "react"

export function useAuthRedirect() {
  const { currentUser, isPending, error } = useGetCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isPending && !currentUser?.user) {
      navigate('/login', { replace: true })
    }
  }, [currentUser, navigate, isPending])

  return { currentUser, isPending, error }
}