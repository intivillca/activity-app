import { ModalContent } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { postActivity } from "../../../api/activities/postActivity";
import { FormActivity } from "../../../types/activity";
import lodash from "lodash";
export const ActivitiesFormWrapper = ({ children }: PropsWithChildren) => {
  const methods = useForm<FormActivity>();
  return (
    <FormProvider {...methods}>
      <ModalContent
        as="form"
        onSubmit={methods.handleSubmit(async (data) => {
          let fileId = undefined;
          if (data.avatar && typeof data !== "string") {
            fileId = 1;
          }
          const formattedData = lodash.omit(data, ["avatar"]);
          await postActivity({
            ...formattedData,
            fileId,
          });
        })}
      >
        {children}
      </ModalContent>
    </FormProvider>
  );
};
