import {
  ON_NEW_ISSUE,
  ON_NEW_ISSUE_RESPONSE,
  ON_GET_ALL_ISSUE,
  ON_GET_ALL_ISSUE_RESPONSE,
  RESET_ISSUE,
  ON_GET_ISSUE_BY_ID,
  GET_ISSUE_BY_ID_RESPONSE,
  ON_ISSUE_SEARCH,
  ON_ISSUE_SEARCH_RESPONSE,
  SET_ISSUE_HEADER_TITLE
} from "../types/issue.types"

const initialState = {
  onNewIssue: false,
  onNewIssueResponse: null,
  onGetAllIssue: false,
  allIssueResponse: null,
  onGetParticularIssueById: false,
  particularIssueById: null,
  onSearchIssue: false,
  searchedIssues: [],
  issueHeaderTitle: 'All Issues'
}

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_NEW_ISSUE:
      return {
        ...state,
        onNewIssue: true,
        newIssueResponse: null,
      }
    case ON_NEW_ISSUE_RESPONSE:
      return {
        ...state,
        onNewIssue: false,
        newIssueResponse: action.payload,
      }
    case ON_GET_ALL_ISSUE:
      return {
        ...state,
        onGetAllIssue: true,
        allIssueResponse: null,
      }
    case ON_GET_ALL_ISSUE_RESPONSE:
      return {
        ...state,
        onGetAllIssue: false,
        allIssueResponse: action.payload,
      }
    case ON_GET_ISSUE_BY_ID:
      return {
        ...state,
        onGetParticularIssueById: true,
        particularIssueById: action.payload,
      }
    case GET_ISSUE_BY_ID_RESPONSE:
      return {
        ...state,
        onGetParticularIssueById: false,
        particularIssueById: action.payload,
      }
    case ON_ISSUE_SEARCH:
      return {
        ...state,
        onSearchIssue: true,
        searchedIssues: [],
      }
    case ON_ISSUE_SEARCH_RESPONSE:
      return {
        ...state,
        onSearchIssue: false,
        searchedIssues: action.payload,
      }
      case SET_ISSUE_HEADER_TITLE:
        return {
          ...state,
          issueHeaderTitle: action.payload,
        }
    case RESET_ISSUE:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default issueReducer
