import {
  CREATE_COMPONENT,
  CREATE_ROW,
  DELETE_COMPONENT,
  DELETE_ROW,
  SET_COMPONENT,
  SET_CONFIG,
  UPDATE_ROW,
} from "./actionTypes"

export const initialState = {
  pageConfig: {
    content: [],
    title: "",
    parameters: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROW:
      return {
        ...state,
        pageConfig: action.payload,
      }
    case UPDATE_ROW:
      return {
        ...state,
        pageConfig: action.payload,
      }
    case DELETE_ROW:
      return {
        ...state,
        pageConfig: action.payload,
      }
    case CREATE_COMPONENT:
      return {
        ...state,
        pageConfig: action.payload,
      }
    case SET_COMPONENT:
      return {
        ...state,
        pageConfig: action.payload,
      }
    case DELETE_COMPONENT:
      return {
        ...state,
        pageConfig: action.payload,
      }
    case SET_CONFIG:
      return {
        ...state,
        pageConfig: action.payload,
      }
    default:
      return state
  }
}

export default reducer
