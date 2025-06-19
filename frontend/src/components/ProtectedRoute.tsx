import type { ProtectedRouteProps } from "../utils/types";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useGetCurrentUser } from "../hooks/user/useGetCurrentUser";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, isPending, error } = useGetCurrentUser();
  const navigate = useNavigate();
  const currentAuthUser = useSelector((state: RootState) => state.auth.currentUser);

  // Log state for debugging
  console.log("ProtectedRoute:", {
    currentUser: currentUser?.user,
    currentAuthUser: currentAuthUser?.user,
    isPending,
    error: error?.message,
  });

  useEffect(() => {
    if (!isPending && (!currentUser?.user || error)) {
      toast.error("Session expired, please login again");
      navigate("/login", { replace: true });
    }
  }, [currentUser, isPending, error, navigate]);

  if (isPending) {
    return (
      <main>
        <LoadingSpinner />
      </main>
    );
  }

  if (currentUser?.user || currentAuthUser?.user) {
    return <>{children}</>;
  }
}

export default ProtectedRoute;