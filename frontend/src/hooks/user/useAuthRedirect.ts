import { useNavigate } from "react-router-dom"
import { useGetCurrentUser } from "./useGetCurrentUser"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../../store/store';
import { setAuthError, setAuthLoading, setCurrentUser } from "../../features/auth/authSlice";

export function useAuthRedirect() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentUser, isPending, error } = useGetCurrentUser()

  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing)

  useEffect(() => {
    if(isPending) {
      dispatch(setAuthLoading(isPending))
    }
    if(error) {
      dispatch(setAuthError(error.message))
    }
    if(currentUser?.user) {
      dispatch(setCurrentUser(currentUser))
    }
  }, [currentUser, isPending, error, dispatch])

  useEffect(() => {
    if(!isPending && !isRefreshing) {
      if(error?.message === "Authentication Invalid" || !currentUser?.user) {
        navigate("/login", { replace: true })
      }
    }
  }, [currentUser, isPending, isRefreshing, error, navigate])
}