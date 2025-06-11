import { useNavigate } from "react-router-dom"
import { useGetCurrentUser } from "./useGetCurrentUser"
import { useEffect } from "react"

export function useAuthRedirect() {
  const { currentUser, isPending, error } = useGetCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPending) {
      if (error?.message === "Authentication Invalid") {
        navigate("/login", { replace: true })
      } else if (!currentUser?.user) {
        navigate("/login", { replace: true })
      }
    }
  }, [currentUser, isPending, error, navigate])


  return { currentUser, isPending, error }
}