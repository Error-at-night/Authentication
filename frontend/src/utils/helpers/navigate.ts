import type { NavigateFunction, To, NavigateOptions } from "react-router-dom";

let navigator: NavigateFunction

export const setNavigator = (navFn: NavigateFunction) => {
  navigator = navFn
}

export const navigate = (to: To, options?: NavigateOptions) => {
  if (!navigator) {
    console.log("Navigator not set yet")
    return
  }
  navigator(to, options)
}
