import { ModalContent } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormGroup } from "../../../types/group";
interface Props {
  onClose: () => void;
}
export const GroupModalFormWrapper = ({
  children,
  onClose,
}: PropsWithChildren<Props>) => {
  const methods = useForm<FormGroup>();
  return (
    <FormProvider {...methods}>
      <ModalContent
        as="form"
        onSubmit={methods.handleSubmit(async (data) => {
          // HANDLE NEW GROUP
          console.log(data);
          onClose();
        })}
      >
        {children}
      </ModalContent>
    </FormProvider>
  );
};
