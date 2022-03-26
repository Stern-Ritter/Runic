import {
    CREATE_USER_FORM_SET_VALUE,
    CREATE_USER_FORM_CLEAR_STATE,
    CREATE_USER_FORM_SET_ERROR_MESSAGE,
  } from "../actions";
  
  import {
    ICREATE_USER_FORM_SET_VALUE,
    ICREATE_USER_FORM_SET_ERROR_MESSAGE,
  } from "../actions/create-user-form";
  
  type ICREATE_USER_FORM_CLEAR_STATE = {
    type: "CREATE_USER_FORM_CLEAR_STATE";
  };
  
  type CREATE_USER_FORM_ACTION =
    | ICREATE_USER_FORM_SET_VALUE
    | ICREATE_USER_FORM_CLEAR_STATE
    | ICREATE_USER_FORM_SET_ERROR_MESSAGE;
  
  const createUserFormInitialState = {
    data: {
      email: "",
      password: "",
      repeatPassword: "",
    },
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
      default: {
        return state;
      }
    }
  };
  
  export default createUserReducer;
  