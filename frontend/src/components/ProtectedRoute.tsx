import { useSelector } from "react-redux";
import type { ProtectedRouteProps } from "../utils/types";
import type { RootState } from '../store/store';
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function ProtectedRoute({ children }: ProtectedRouteProps ) {
  
  const isRefreshing = useSelector((state: RootState) => state.auth.isRefreshing)
  const currentAuthUser = useSelector((state: RootState) => state.auth.currentUser)
  const isAuthLoading = useSelector((state: RootState) => state.auth.authLoading)

  if(isAuthLoading || isRefreshing) {
    return (
      <LoadingSpinner/>
    )
  }

  if(!currentAuthUser?.user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute