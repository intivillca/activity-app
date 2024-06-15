import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { uploadFile } from "../../api-file-server/upload-file";
import { postActivityMessage } from "../../api/activities/postMessage";
import { UploadData } from "../../types/file";
import { FormMessage } from "../../types/message";
import { useActivityProvider } from "../activities/ActivityCtx";
import { Attachment } from "./Attachment";

export const ChatInput = () => {
  const { t } = useTranslation();
  const { handleSubmit, register, reset, control } = useForm<FormMessage>({
    defaultValues: { attachments: [], content: "" },
  });
  const { activity } = useActivityProvider();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });

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
      console.log(succesfullyUploaded);
      append(succesfullyUploaded);
    },
    [append]
  );
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const onSubmit = useCallback(
    async (data: FormMessage) => {
      await postActivityMessage(activity.ID, data);
      reset({ attachments: [], content: "" });
    },
    [activity.ID, reset]
  );

  return (
    <VStack
      flex={"1 1 auto"}
      as={"form"}
      w="full"
      spacing={0}
      onSubmit={handleSubmit(onSubmit)}
      {...getRootProps()}
      border={isDragActive ? "1px dashed gray" : "none"}
    >
      {fields && (
        <HStack
          w="full"
          overflowX={"auto"}
          overflowY={"visible"}
          flex={"1 0 auto"}
        >
          {fields.map((item, index) => (
            <Attachment
              {...item}
              key={item.original}
              remove={remove}
              index={index}
            />
          ))}
        </HStack>
      )}
      <input {...getInputProps()} />
      <InputGroup h="full" flex={"1 1 auto"}>
        <InputLeftAddon h="full">
          <IconButton
            aria-label={t("attach")}
            icon={<FaPaperclip />}
            variant={"ghost"}
            onClick={open}
          />
        </InputLeftAddon>
        <Input
          h="full"
          placeholder="Type your message..."
          {...register("content", { required: true })}
          size="md"
          borderRadius="md"
          mr={2}
        />
        <InputRightAddon h="full">
          <IconButton
            aria-label={t("send")}
            icon={<FaPaperPlane />}
            variant={"ghost"}
          />
        </InputRightAddon>
      </InputGroup>
    </VStack>
  );
};
