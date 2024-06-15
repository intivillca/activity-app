import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { uploadFile } from "../../api-file-server/upload-file";
import { sendMessage } from "../../socket/socket-events";
import { UploadData } from "../../types/file";
import { FormMessage } from "../../types/message";
import { useActivityProvider } from "../activities/ActivityCtx";
import { Attachment } from "./Attachment";

export const ChatInput = () => {
  const { t } = useTranslation();
  const { handleSubmit, register, reset, control } = useForm<FormMessage>();
  const {
    activity,
    activityUser: { ID },
  } = useActivityProvider();

  const { fields, append } = useFieldArray({ control, name: "attachments" });
  const roomId = useMemo(() => activity.ID, [activity.ID]);
  const roomType: "activity" = useMemo(() => "activity", []);

  const handleFileUpload = async (file: File) => {
    try {
      const uploadResponse: UploadData = await uploadFile(file);

      return uploadResponse;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles || acceptedFiles.length <= 0) {
        return null;
      }

      const requests = acceptedFiles.map(handleFileUpload);
      const uploadedFiles = await Promise.all(requests);
      const succesfullyUploaded = uploadedFiles.filter(
        (file): file is UploadData => file !== undefined
      );
      append(succesfullyUploaded);
    },
    [append]
  );
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const onSubmit = (data: FormMessage) => {
    sendMessage({
      message: {
        attachments: [],
        content: data.content,
        sender: { ID, username: "test" },
      },
      roomId,
      roomType,
    });
    reset();
  };

  return (
    <VStack as={"form"} w="full" spacing={0}>
      {fields && (
        <HStack w="full" overflowX={"scroll"}>
          {fields.map((item) => (
            <Attachment {...item} key={item.original} />
          ))}
        </HStack>
      )}
      <HStack
        w="full"
        onSubmit={handleSubmit(onSubmit)}
        alignItems="center"
        h="full"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <InputGroup>
          <InputLeftAddon>
            <IconButton
              aria-label={t("attach")}
              icon={<FaPaperclip />}
              variant={"ghost"}
              onClick={open}
            />
          </InputLeftAddon>
          <Input
            placeholder="Type your message..."
            {...register("content", { required: true })}
            size="md"
            borderRadius="md"
            mr={2}
          />
          <InputRightAddon>
            <IconButton
              aria-label={t("send")}
              icon={<FaPaperPlane />}
              variant={"ghost"}
            />
          </InputRightAddon>
        </InputGroup>
      </HStack>
    </VStack>
  );
};
