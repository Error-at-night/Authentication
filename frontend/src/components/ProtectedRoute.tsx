import { useSelector } from "react-redux";
import type { ProtectedRouteProps } from "../utils/types";
import type { RootState } from '../store/store';
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useGetCurrentUser } from "../hooks/user/useGetCurrentUser";

function ProtectedRoute({ children }: ProtectedRouteProps ) {

  const { currentUser, isPending } = useGetCurrentUser()
  
  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing)

  if(isPending || isRefreshing) {
    return (
      <LoadingSpinner/>
    )
  }

  if(!currentUser?.user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute