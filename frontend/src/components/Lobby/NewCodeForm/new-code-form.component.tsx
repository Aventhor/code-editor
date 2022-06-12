import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Button, Input } from "rsuite";
import { NewCodeFormProps } from "./new-code-form.types";

export const NewCodeForm: FunctionComponent<NewCodeFormProps> = ({ onSubmit }: NewCodeFormProps) => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      maxMemberCount: 3,
    },
    onSubmit,
  });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Input
        name="maxMemberCount"
        type="number"
        value={values.maxMemberCount}
        onChange={(_, e) => handleChange(e)}
        placeholder="Макс. кол-во участников"
      />
      <Button appearance="primary" type="submit">
        Создать
      </Button>
    </form>
  );
};
