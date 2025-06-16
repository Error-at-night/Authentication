import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from '../../services/user'
export function useGetCurrentUser() {
  const { data: currentUser, isLoading, error, isError, isSuccess } =  useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  })
  
  return { currentUser, isLoading, error, isError, isSuccess }
}