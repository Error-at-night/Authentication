import type { ProtectedRouteProps } from "../utils/types";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useGetCurrentUser } from "../hooks/user/useGetCurrentUser";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import toast from "react-hot-toast";

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, isPending } = useGetCurrentUser()

  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing)

  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isRefreshing && error?.message === "Authent") {
      toast.error("Session expired, please login againnnnnnnn")
      navigate("/login")
    }
  }, [currentUser, isPending, navigate])

  if(isPending) return <LoadingSpinner/>

  if(currentUser?.user && !isPending) return children;
}

export default ProtectedRoute;
