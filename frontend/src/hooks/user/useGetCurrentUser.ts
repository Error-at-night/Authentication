import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from '../../services/user'
export function useGetCurrentUser() {
  const { data: currentUser, isPending, error, isError } =  useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  })
  
  return { currentUser, isPending, error, isError }
}