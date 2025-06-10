import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from '../../services/user'

export function useGetCurrentUser() {
  const { data: currentUser, isPending, error } =  useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  })
  
  return { currentUser, isPending, error }
}