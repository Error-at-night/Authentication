import { useAuthRedirect } from "../hooks/user/useAuthRedirect";
import { useNavigate } from "react-router-dom"

function ProtectedRoute({ children } ) {

  const navigate = useNavigate()
  
  const { currentUser, isPending, error } = useAuthRedirect()

  if(isPending) {
    return (
      <main>isLoading</main>
    )
  }

  if(!currentUser?.user) return null

  if(error?.message === "Authentication Invalid") navigate("/login")

  return children
}
export default ProtectedRoute