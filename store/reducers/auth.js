import { AUTHENTICATE, LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  isLoading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        isLoading: false,
      };

    case LOGOUT:
      return {
        initialState,
      };
    // case LOGIN:
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    // case LOGIN:
    // return {
    //     token:action.token,
    //     userId:action.userId
    // }
    default:
      return state;
  }
};
