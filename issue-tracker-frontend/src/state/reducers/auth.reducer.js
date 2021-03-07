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
    case RESET_AUTH:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default authReducer
