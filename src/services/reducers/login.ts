import {
  AUTHENTICATION_FORM_SET_VALUE,
  AUTHENTICATION_FORM_CLEAR_STATE,
  AUTHENTICATION_FORM_SET_ERROR_MESSAGE,
} from "../actions";

import {
  IAUTHENTICATION_FORM_SET_VALUE,
  IAUTHENTICATION_FORM_SET_ERROR_MESSAGE,
} from "../actions/login";

type IAUTHENTICATION_FORM_CLEAR_STATE = {
  type: "AUTHENTICATION_FORM_CLEAR_STATE";
};

type AUTHENTICATION_FORM_ACTION =
  | IAUTHENTICATION_FORM_SET_VALUE
  | IAUTHENTICATION_FORM_CLEAR_STATE
  | IAUTHENTICATION_FORM_SET_ERROR_MESSAGE;

const authenticationFormInitialState = {
  data: {
    email: "",
    password: "",
  },
  error: "",
};

const authenticationReducer = (
  state = authenticationFormInitialState,
  action: AUTHENTICATION_FORM_ACTION
) => {
  switch (action.type) {
    case AUTHENTICATION_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case AUTHENTICATION_FORM_CLEAR_STATE: {
      return {
        ...authenticationFormInitialState,
      };
    }
    case AUTHENTICATION_FORM_SET_ERROR_MESSAGE: {
      return {
        ...state,
        error: action.payload.text,
      };
    }

    default: {
      return state;
    }
  }
};

export default authenticationReducer;
