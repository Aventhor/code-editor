import { FormikConfig } from "formik";

export type ConnectFormSubmitHandler = FormikConfig<any>["onSubmit"];

export type ConnectFormProps = Pick<FormikConfig<any>, "onSubmit">;
