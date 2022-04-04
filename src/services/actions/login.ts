import { AppDispatch } from "../store/store";
import { signInWithEmailAndPassword, Auth } from "firebase/auth";

export const AUTHENTICATION_FORM_SET_VALUE = "AUTHENTICATION_FORM_SET_VALUE";
export const AUTHENTICATION_FORM_CLEAR_STATE =
  "AUTHENTICATION_FORM_CLEAR_STATE";
export const AUTHENTICATION_FORM_SET_ERROR_MESSAGE =
  "AUTHENTICATION_FORM_SET_ERROR_MESSAGE";

export const setAuthenticationFormValue = ({
  field,
  value,
}: {
  field: string;
  value: string | string[];
}) =>
  ({
    type: AUTHENTICATION_FORM_SET_VALUE,
    payload: { field, value },
  } as const);

export type IAUTHENTICATION_FORM_SET_VALUE = ReturnType<
  typeof setAuthenticationFormValue
>;

export const setAuthenticationFormErrorMessage = ({ text }: { text: string }) =>
  ({
    type: AUTHENTICATION_FORM_SET_ERROR_MESSAGE,
    payload: { text },
  } as const);

export type IAUTHENTICATION_FORM_SET_ERROR_MESSAGE = ReturnType<
  typeof setAuthenticationFormErrorMessage
>;

export const login = (auth: Auth, email: string, password: string) => {
  return async function (dispatch: AppDispatch) {
    signInWithEmailAndPassword(auth, email, password)
    .catch((err) => {
      dispatch(setAuthenticationFormErrorMessage({ text: err.message }));
    });
  };
}