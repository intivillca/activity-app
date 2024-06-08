import { ModalContent } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { uploadFile } from "../../../api-file-server/upload-file";
import { postActivity } from "../../../api/activities/postActivity";
import { createFile } from "../../../api/file/createFile";
import { FormActivity } from "../../../types/activity";
import lodash from "lodash";
export const ActivitiesFormWrapper = ({ children }: PropsWithChildren) => {
  const methods = useForm<FormActivity>();
  return (
    <FormProvider {...methods}>
      <ModalContent
        as="form"
        onSubmit={methods.handleSubmit(async (data) => {
          console.log(data);
          let fileId = undefined;
          if (data.avatar && typeof data !== "string") {
            const uploadedFile = await uploadFile(data.avatar as File);
            console.log("uploaded file to file server", uploadedFile);
            const dbfile = await createFile(uploadedFile);
            console.log("wrote file info in db", dbfile);
            fileId = dbfile.fileId;
          }
          const formattedData = lodash.omit(data, ["avatar"]);
          const newData = await postActivity({
            ...formattedData,
            fileId,
          });
          console.log(newData);
        })}
      >
        {children}
      </ModalContent>
    </FormProvider>
  );
};
