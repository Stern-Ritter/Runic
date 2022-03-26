export const CREATE_USER_FORM_SET_VALUE = "CREATE_USER_FORM_SET_VALUE";
export const CREATE_USER_FORM_CLEAR_STATE = "CREATE_USER_FORM_CLEAR_STATE";
export const CREATE_USER_FORM_SET_ERROR_MESSAGE =
  "CREATE_USER_FORM_SET_ERROR_MESSAGE";

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
