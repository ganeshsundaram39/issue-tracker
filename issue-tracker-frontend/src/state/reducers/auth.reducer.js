import {
  ON_LOGIN,
  ON_LOGIN_RESPONSE,
  ON_REGISTER,
  ON_REGISTER_RESPONSE,
  RESET_AUTH,
  ON_GET_USER_INFO,
  ON_GET_USER_INFO_RESPONSE,
  ON_UPLOAD_PROFILE_PHOTO,
  ON_UPLOAD_PROFILE_PHOTO_RESPONSE,
  ON_UPDATE_PROFILE_BASIC,
  ON_UPDATE_PROFILE_BASIC_RESPONSE,
  RESET_UPDATE_PROFILE_DATA,
  ON_UPDATE_PROFILE_PASSWORD,
  ON_UPDATE_PROFILE_PASSWORD_RESPONSE,
   ON_CLOSE_ACCOUNT,
  ON_CLOSE_ACCOUNT_RESPONSE
} from "../types/auth.types"

const initialState = {
  onLogin: false,
  loginResponse: null,
  onRegister: false,
  registerResponse: null,
  onGetUser: false,
  onGetUserResponse: null,
  onUploadProfilePhoto: false,
  onUploadProfilePhotoResponse: null,
  onUpdateProfileBasic: false,
  onUpdateProfileBasicResponse: null,
  onUpdateProfilePassword: false,
  onUpdateProfilePasswordResponse: null,
  onCloseAccount:false,
  onCloseAccountResponse:null,

}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      return {
        ...state,
        onLogin: true,
        loginResponse: null,
      }
    case ON_LOGIN_RESPONSE:
      return {
        ...state,
        onLogin: false,
        loginResponse: action.payload,
      }

    case ON_REGISTER:
      return {
        ...state,
        onRegister: true,
        registerResponse: null,
      }
    case ON_REGISTER_RESPONSE:
      return {
        ...state,
        onRegister: false,
        registerResponse: action.payload,
      }
    case ON_GET_USER_INFO:
      return {
        ...state,
        onGetUser: true,
        onGetUserResponse: null,
      }
    case ON_GET_USER_INFO_RESPONSE:
      return {
        ...state,
        onGetUser: false,
        onGetUserResponse: action.payload,
      }
    case ON_UPLOAD_PROFILE_PHOTO:
      return {
        ...state,
        onUploadProfilePhoto: true,
        onUploadProfilePhotoResponse: null,
      }
    case ON_UPLOAD_PROFILE_PHOTO_RESPONSE:
      return {
        ...state,
        onUploadProfilePhoto: false,
        onUploadProfilePhotoResponse: action.payload,
      }
    case ON_UPDATE_PROFILE_BASIC:
      return {
        ...state,
        onUpdateProfileBasic: true,
        onUpdateProfileBasicResponse: null,
      }
    case ON_UPDATE_PROFILE_BASIC_RESPONSE:
      return {
        ...state,
        onUpdateProfileBasic: false,
        onUpdateProfileBasicResponse: action.payload,
      }
    case RESET_UPDATE_PROFILE_DATA:
      return {
        ...state,
        onUpdateProfileBasic: false,
        onUpdateProfileBasicResponse: null,
        onUpdateProfilePassword: false,
        onUpdateProfilePasswordResponse: null,
        onCloseAccount:false,
        onCloseAccountResponse:null,
      }
    case ON_UPDATE_PROFILE_PASSWORD:
      return {
        ...state,
        onUpdateProfilePassword: true,
        onUpdateProfilePasswordResponse: null,
      }
    case ON_UPDATE_PROFILE_PASSWORD_RESPONSE:
      return {
        ...state,
        onUpdateProfilePassword: false,
        onUpdateProfilePasswordResponse: action.payload,
      }
      case ON_CLOSE_ACCOUNT:
        return {
          ...state,
          onCloseAccount:true,
          onCloseAccountResponse:null,
        }
      case ON_CLOSE_ACCOUNT_RESPONSE:
        return {
          ...state,
          onCloseAccount:false,
          onCloseAccountResponse:action.payload,
        }
    case RESET_AUTH:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default authReducer
