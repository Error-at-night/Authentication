import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from '../../services/user'
export function useGetCurrentUser() {
  const { data: currentUser, isPending, isLoading, error, isError, isSuccess } =  useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  })
  
  return { currentUser, isPending, isLoading, error, isError, isSuccess }
}