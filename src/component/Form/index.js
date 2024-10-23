import { FormProvider } from "react-hook-form";

const Form = (props) => {
  const { children, form, onFinish, onError } = props;

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={onFinish ? form.handleSubmit(onFinish, onError) : void 0}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
