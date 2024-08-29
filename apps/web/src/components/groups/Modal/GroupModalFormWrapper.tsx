import { ModalContent } from "@chakra-ui/react";
import lodash from "lodash";
import { PropsWithChildren } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { createFile } from "../../../api/file/createFile";
import { postGroup } from "../../../api/groups/postGroup";
import { handleNewGroup } from "../../../events/group-events";
import { FormGroup } from "../../../types/group";
import { useActivityProvider } from "../../activities/ActivityCtx";
interface Props {
  onClose: () => void;
}
export const GroupModalFormWrapper = ({
  children,
  onClose,
}: PropsWithChildren<Props>) => {
  const {
    activity: { ID },
  } = useActivityProvider();
  const methods = useForm<FormGroup>({
    defaultValues: { maxSize: 20, type: "PUBLIC" },
  });
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
          const newData = await postGroup({
            ...formattedData,
            activityId: ID,
            avatarId,
          });
          handleNewGroup(newData);
          onClose();
        })}
      >
        {children}
      </ModalContent>
    </FormProvider>
  );
};
