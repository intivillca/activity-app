import { ModalContent } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { postActivity } from "../../../api/activities/postActivity";
import { FormActivity } from "../../../types/activity";
import lodash from "lodash";
import { createFile } from "../../../api/file/createFile";
export const ActivitiesFormWrapper = ({ children }: PropsWithChildren) => {
  const methods = useForm<FormActivity>();
  return (
    <FormProvider {...methods}>
      <ModalContent
        as="form"
        onSubmit={methods.handleSubmit(async (data) => {
          let avatarId = undefined;
          if (data.avatar) {
            if ("ID" in data.avatar) {
              avatarId = data.avatar.ID;
            } else {
              const img = await createFile(data.avatar);
              avatarId = img.fileId;
            }
          }
          const formattedData = lodash.omit(data, ["avatar"]);
          await postActivity({
            ...formattedData,
            avatarId,
          });
        })}
      >
        {children}
      </ModalContent>
    </FormProvider>
  );
};
