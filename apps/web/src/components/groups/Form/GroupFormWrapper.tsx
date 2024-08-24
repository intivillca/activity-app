import { FormProvider, useForm } from "react-hook-form";
import { FormActivity } from "../../../types/activity";
import { PropsWithChildren } from "react";

export const GroupFormWrapper = ({ children }: PropsWithChildren) => {
  const methods = useForm<FormActivity>();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log(data);
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
};
