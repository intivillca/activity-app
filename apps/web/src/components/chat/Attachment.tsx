import { Box, Flex, IconButton, Link, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaEye, FaTimes } from "react-icons/fa";
import { UploadData } from "../../types/file";
import { FileIcon, defaultStyles, DefaultExtensionType } from "react-file-icon";
import { getOriginal } from "../../api-file-server/get-original";
import { splitFileName } from "../../utils/split-ext";

export const Attachment = ({
  fileName,
  remove,
  index,
  original,
}: UploadData & { remove: UseFieldArrayRemove; index: number }) => {
  const { t } = useTranslation("");
  const { extension, name } = useMemo(
    () => splitFileName(fileName),
    [fileName]
  );
  return (
    <VStack pos={"relative"} maxW={"80px"}>
      <IconButton
        as={Link}
        href={getOriginal(original)}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
        rounded={"xl"}
        pos={"absolute"}
        size={"xs"}
        colorScheme={"blue"}
        top={0}
        left={0}
        aria-label={t("view")}
        icon={<FaEye />}
      />
      <IconButton
        rounded={"xl"}
        pos={"absolute"}
        size={"xs"}
        colorScheme={"red"}
        top={0}
        right={0}
        aria-label={t("delete")}
        icon={<FaTimes />}
        onClick={() => {
          remove(index);
        }}
      />
      <FileIcon
        extension={extension}
        {...defaultStyles[extension as DefaultExtensionType]}
      />
      <Flex w="full" fontSize={"xs"}>
        <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {name}
        </Box>
        {extension && (
          <Box flexShrink="0" whiteSpace="nowrap">
            .{extension}
          </Box>
        )}
      </Flex>
    </VStack>
  );
};
