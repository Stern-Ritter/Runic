import { createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { AppDispatch } from "../store/store";

export const CREATE_USER_FORM_SET_VALUE = "CREATE_USER_FORM_SET_VALUE";
export const CREATE_USER_FORM_CLEAR_STATE = "CREATE_USER_FORM_CLEAR_STATE";
export const CREATE_USER_FORM_SET_ERROR_MESSAGE =
  "CREATE_USER_FORM_SET_ERROR_MESSAGE";
export const CREATE_USER_FROM_SUCCESS = "CREATE_USER_FROM_SUCCESS";

export const setCreateUserFormValue = ({
  field,
  value,
}: {
  field: string;
  value: string | string[];
}) =>
  ({
    type: CREATE_USER_FORM_SET_VALUE,
    payload: { field, value },
  } as const);

export type ICREATE_USER_FORM_SET_VALUE = ReturnType<
  typeof setCreateUserFormValue
>;

export const setCreateUserFormErrorMessage = ({ text }: { text: string }) =>
  ({
    type: CREATE_USER_FORM_SET_ERROR_MESSAGE,
    payload: { text },
  } as const);

export type ICREATE_USER_FORM_SET_ERROR_MESSAGE = ReturnType<
  typeof setCreateUserFormErrorMessage
>;

export const createAccount = (auth: Auth, email: string, password: string) =>
  async function (dispatch: AppDispatch) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch({ type: CREATE_USER_FROM_SUCCESS });
      })
      .catch((err) => {
        dispatch(setCreateUserFormErrorMessage({ text: err.message }));
      });
  };
