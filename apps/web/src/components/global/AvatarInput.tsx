import React, { ChangeEvent, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Avatar, AvatarBadge, Box } from "@chakra-ui/react";
import { FaFile } from "react-icons/fa";
import { uploadFile } from "../../api-file-server/upload-file";
import { UploadData, UploadedFile, UploadImageData } from "../../types/file";
import { getAvatar } from "../../api-file-server/get-avatar";
interface FileInputProps {
  onChange: (file: UploadImageData | null) => void;
  value?: UploadImageData | UploadedFile | null;
}

export const AvatarInput = ({ onChange, value }: FileInputProps) => {
  const handleFileUpload = async (file: File) => {
    try {
      const uploadResponse: UploadData = await uploadFile(file);

      return uploadResponse;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleFile = useCallback(async (files?: File[] | FileList | null) => {
    if (!files || files.length <= 0) {
      return null;
    }
    const file = files[0];
    const uploadedFile = await handleFileUpload(file);
    if (!uploadedFile || (uploadedFile && uploadedFile.type !== "image")) {
      return null;
    }
    return uploadedFile;
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const file = await handleFile(acceptedFiles);
      onChange(file);
    },
    [handleFile, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = await handleFile(event.target.files);
    onChange(file);
  };

  const getAvatarLink = (
    value: UploadImageData | UploadedFile | null | undefined
  ) => {
    if (!value) {
      return undefined;
    }
    if ("src" in value) {
      return getAvatar(value.src);
    }
    return getAvatar(value.original);
  };

  return (
    <Box>
      <div {...getRootProps()} style={{ cursor: "pointer" }}>
        <input {...getInputProps()} />
        <Avatar
          size={"2xl"}
          src={getAvatarLink(value)}
          borderWidth={"6px"}
          borderStyle={isDragActive ? "dashed" : "none"}
        >
          <AvatarBadge boxSize="1em" bg="gray.500" border={"none"}>
            <FaFile size={"28px"} />
          </AvatarBadge>
        </Avatar>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
    </Box>
  );
};
