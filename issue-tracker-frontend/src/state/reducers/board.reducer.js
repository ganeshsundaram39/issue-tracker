import {
  ON_NEW_BOARD,
  ON_NEW_BOARD_RESPONSE,
  RESET_BOARD,
} from "../types/board.types"

const initialState = {
  onNewBoard: false,
  onNewBoardResponse: null,
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_NEW_BOARD:
      return {
        ...state,
        onNewBoard: true,
        newBoardResponse: null,
      }
    case ON_NEW_BOARD_RESPONSE:
      return {
        ...state,
        onNewBoard: false,
        newBoardResponse: action.payload,
      }

    case RESET_BOARD:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default boardReducer
