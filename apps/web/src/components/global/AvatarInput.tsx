import React, { ChangeEvent, useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Avatar, AvatarBadge, Box } from "@chakra-ui/react";
import { FaFile } from "react-icons/fa";

interface FileInputProps {
  onChange: (file: File | string | null) => void;
  value?: File | string | null;
}

export const AvatarInput = ({ onChange, value }: FileInputProps) => {
  const [uploadedFile, setUploadedFile] = useState<{
    file: File | null;
    preview: string;
  } | null>(
    value && typeof value === "object"
      ? { file: value, preview: URL.createObjectURL(value) }
      : value && typeof value === "string"
        ? { file: null, preview: value }
        : null
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Only handle the first accepted file
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onChange(file);
        // Update uploaded file state with file preview
        setUploadedFile({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      onChange(file);
      // Update uploaded file state with file preview
      setUploadedFile({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <Box>
      <div {...getRootProps()} style={{ cursor: "pointer" }}>
        <input {...getInputProps()} />
        <Avatar
          size={"2xl"}
          src={uploadedFile?.preview}
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
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
    </Box>
  );
};
