import ButtonSpinner from "../components/ButtonSpinner"
import { useLogout } from "../hooks/authentication/useLogout";

function Dashboard() {
  const { logoutUser, isPending } = useLogout()

  return (
    <div>
      <button onClick={() => logoutUser()} type="button" className="text-white bg-black px-3 py-3 w-full rounded-md cursor-pointer font-semibold"
        disabled={isPending}
      >
        {isPending ? <ButtonSpinner/> : "Login"}
      </button>
    </div>
  )
}
export default Dashboard