import {
  CREATE_USER_FORM_SET_VALUE,
  CREATE_USER_FORM_CLEAR_STATE,
  CREATE_USER_FORM_SET_ERROR_MESSAGE,
  CREATE_USER_FROM_SUCCESS,
} from "../actions";

import {
  ICREATE_USER_FORM_SET_VALUE,
  ICREATE_USER_FORM_SET_ERROR_MESSAGE,
} from "../actions/create-account";

type ICREATE_USER_FORM_CLEAR_STATE = {
  type: "CREATE_USER_FORM_CLEAR_STATE";
};

type ICREATE_USER_FROM_SUCCESS = {
  type: "CREATE_USER_FROM_SUCCESS";
};

type CREATE_USER_FORM_ACTION =
  | ICREATE_USER_FORM_SET_VALUE
  | ICREATE_USER_FORM_CLEAR_STATE
  | ICREATE_USER_FORM_SET_ERROR_MESSAGE
  | ICREATE_USER_FROM_SUCCESS;

const createUserFormInitialState = {
  data: {
    email: "",
    password: "",
    repeatPassword: "",
  },
  success: false,
  error: "",
};

const createUserReducer = (
  state = createUserFormInitialState,
  action: CREATE_USER_FORM_ACTION
) => {
  switch (action.type) {
    case CREATE_USER_FORM_SET_VALUE: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
      };
    }
    case CREATE_USER_FORM_CLEAR_STATE: {
      return {
        ...createUserFormInitialState,
      };
    }
    case CREATE_USER_FORM_SET_ERROR_MESSAGE: {
      return {
        ...state,
        error: action.payload.text,
      };
    }
    case CREATE_USER_FROM_SUCCESS: {
      return {
        ...state,
        error: createUserFormInitialState.error,
        success: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default createUserReducer;
