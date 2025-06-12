import { useAuthRedirect } from "../hooks/user/useAuthRedirect"

export function AuthRedirectWrapper() {
  useAuthRedirect()
  return null
}
