import { ON_LOGIN_RESPONSE } from "../types/auth.types"

export function popupListener(dispatch) {
  window.addEventListener("message", (message) => {
    if (message?.data?.apiResponse) {
      if (!message?.data?.apiResponse?.error) {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      } else {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      }
    }
  })
}
