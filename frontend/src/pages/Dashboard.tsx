import { useDispatch } from "react-redux";
import ButtonSpinner from "../components/ButtonSpinner"
import { clearUser } from "../features/auth/authSlice";
import { useLogout } from "../hooks/authentication/useLogout";

function Dashboard() {
  const { logoutUser, isPending } = useLogout()
  const dispatch = useDispatch()

  const handleLogout = () => {
    logoutUser()
    dispatch(clearUser())
  }

  return (
    <>
      <h1 className="text-center text-[2rem] mt-[100px] text-blue-800">Welcome</h1>
      <div className="mx-auto w-[500px] mt-[100px]">
        <button onClick={handleLogout} type="button" className="text-white bg-black px-3 py-3 w-[500px] rounded-md cursor-pointer font-semibold"
          disabled={isPending}
        >
          {isPending ? <ButtonSpinner/> : "Logout"}
        </button>
      </div>
    </>
  )
}

export default Dashboard