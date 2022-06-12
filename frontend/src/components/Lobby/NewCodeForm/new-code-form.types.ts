import { FormikConfig } from "formik";

export type NewCodeFormSubmitHandler = FormikConfig<any>["onSubmit"];

export type NewCodeFormProps = Pick<FormikConfig<any>, "onSubmit">;
