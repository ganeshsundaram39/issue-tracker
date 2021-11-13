import {
  ON_NEW_BOARD,
  ON_NEW_BOARD_RESPONSE,
  ON_EDIT_BOARD,
  ON_EDIT_BOARD_RESPONSE,
  RESET_BOARD,
  ON_GET_ALL_BOARD,
  ON_GET_ALL_BOARD_RESPONSE,
  ON_GET_BOARD_BY_ID,
  GET_BOARD_BY_ID_RESPONSE,
  ON_BOARD_SEARCH,
  ON_BOARD_SEARCH_RESPONSE,
  SET_BOARD_HEADER_TITLE,
  ON_DELETE_BOARD,
  ON_DELETE_BOARD_RESPONSE,
} from "../types/board.types"

const initialState = {
  onNewBoard: false,
  onNewBoardResponse: null,
  onEditBoard: false,
  editBoardResponse: null,
  onGetAllBoard: false,
  allBoardResponse: null,
  onGetParticularBoardById: false,
  particularBoardById: null,
  onSearchBoard: false,
  searchedBoards: [],
  boardHeaderTitle: "All Boards",
  onDeleteBoard: false,
  onDeleteBoardResponse: null,
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
    case ON_EDIT_BOARD:
      return {
        ...state,
        onEditBoard: true,
        editBoardResponse: null,
      }
    case ON_EDIT_BOARD_RESPONSE:
      return {
        ...state,
        onEditBoard: false,
        editBoardResponse: action.payload,
      }
    case ON_GET_ALL_BOARD:
      return {
        ...state,
        onGetAllBoard: true,
        allBoardResponse: null,
      }
    case ON_GET_ALL_BOARD_RESPONSE:
      return {
        ...state,
        onGetAllBoard: false,
        allBoardResponse: action.payload,
      }
    case ON_GET_BOARD_BY_ID:
      return {
        ...state,
        onGetParticularBoardById: true,
        particularBoardById: action.payload,
      }
    case GET_BOARD_BY_ID_RESPONSE:
      return {
        ...state,
        onGetParticularBoardById: false,
        particularBoardById: action.payload,
      }
    case ON_BOARD_SEARCH:
      return {
        ...state,
        onSearchBoard: true,
        searchedBoards: [],
      }
    case SET_BOARD_HEADER_TITLE:
      return {
        ...state,
        boardHeaderTitle: action.payload,
      }
    case ON_BOARD_SEARCH_RESPONSE:
      return {
        ...state,
        onSearchBoard: false,
        searchedBoards: action.payload,
      }
    case ON_DELETE_BOARD:
      return {
        ...state,
        onDeleteBoard: true,
        onDeleteBoardResponse: null,
      }
    case ON_DELETE_BOARD_RESPONSE:
      return {
        ...state,
        onDeleteBoard: false,
        onDeleteBoardResponse: action.payload,
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
