import { ChangeEvent, useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";

interface FileInputProps {
  onChange: (files: File) => void;
  value?: File | null;
}

export const SingleImageInput = ({ onChange, value }: FileInputProps) => {
  const [uploadedFile, setUploadedFile] = useState<{
    file: File;
    preview: string;
  } | null>(
    value ? { file: value, preview: URL.createObjectURL(value) } : null
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
        <Flex
          align="center"
          justify="center"
          borderWidth="2px"
          borderColor={isDragActive ? "teal.400" : "teal.500"}
          borderStyle="dashed"
          borderRadius="md"
          p={4}
          _hover={{ borderColor: isDragActive ? "teal.400" : "teal.400" }}
        >
          <FiUpload size={24} />
          <Text ml={2} textAlign="center">
            {isDragActive
              ? "Drop the file here"
              : "Drag & drop or click to upload a file"}
          </Text>
        </Flex>
      </div>
      <input
        type="file"
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
      {uploadedFile && (
        <Box mt={4}>
          <Text fontWeight="bold">Uploaded file:</Text>
          <Flex mt={2}>
            <Box>
              <Image
                src={uploadedFile.preview}
                alt="Preview"
                maxW="100px"
                maxH="100px"
              />
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
