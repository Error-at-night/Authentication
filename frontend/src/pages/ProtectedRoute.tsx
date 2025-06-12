import { useAuthRedirect } from "../hooks/user/useAuthRedirect";
import type { ProtectedRouteProps } from "../utils/types";

function ProtectedRoute({ children }: ProtectedRouteProps ) {
  
  const { currentUser, isPending } = useAuthRedirect()

  if(isPending) {
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