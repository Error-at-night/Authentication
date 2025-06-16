import type { ProtectedRouteProps } from "../utils/types";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useGetCurrentUser } from "../hooks/user/useGetCurrentUser";
import { useEffect, } from "react";
import toast from "react-hot-toast";

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, isLoading } = useGetCurrentUser()

  const navigate = useNavigate()
  
  useEffect(() => {
    if(!currentUser?.user) {
      toast.error("Session expired, please login again")
      navigate("/login")
    }
  }, [currentUser, isLoading, navigate])

  if(isLoading) {
    return (
      <>
        <LoadingSpinner/>
      </>
    ) 
  }

  if(currentUser?.user) {
    return (
      <>
      {children}
      </>
    )
  };
}

export default ProtectedRoute;
