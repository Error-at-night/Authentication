import { useAuthRedirect } from "../hooks/user/useAuthRedirect";
import type { ProtectedRouteProps } from "../utils/types";

function ProtectedRoute({ children }: ProtectedRouteProps ) {
  
  const { currentUser, isPending, isRefreshing } = useAuthRedirect()

  if(isPending || isRefreshing) {
    return (
      <main>isLoading</main>
    )
  }

  if(!currentUser?.user) {
    return (
      <main>Redirecting to login</main>
    )
  }

  return children
}

export default ProtectedRoute