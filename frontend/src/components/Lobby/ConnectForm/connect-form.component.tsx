import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Button, Input } from "rsuite";
import { ConnectFormProps } from "./connect-form.types";

export const ConnectForm: FunctionComponent<ConnectFormProps> = ({ onSubmit }: ConnectFormProps) => {
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      key: "",
    },
    onSubmit,
  });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Input name="key" onChange={(_, e) => handleChange(e)} value={values.key} placeholder="Ключ комнаты" />
      <Button appearance="primary" type="submit">
        Подключиться
      </Button>
    </form>
  );
};
