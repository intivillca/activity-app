import {
  Box,
  Card,
  CardBody,
  HStack,
  IconButton,
  Link,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { DefaultExtensionType, defaultStyles, FileIcon } from "react-file-icon";
import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";
import { getOriginalFile } from "../../api-file-server/get-original-file";
import { Attachment } from "../../types/attachment";
import { formatFileSize } from "../../utils/format-file-size";
import { splitFileName } from "../../utils/split-ext";

interface Props {
  files: Attachment[];
}
export const ChatAttachments = ({ files }: Props) => {
  return (
    <SimpleGrid columns={[2, 2, 4, 5]} gridGap={4}>
      {files.map((file) => (
        <ChatAttachment key={file.ID} {...file} />
      ))}
    </SimpleGrid>
  );
};

export const ChatAttachment = ({ fileName, size, src }: Attachment) => {
  const { t } = useTranslation("");
  const { extension, name } = useMemo(
    () => splitFileName(fileName),
    [fileName]
  );
  const fsize = useMemo(() => formatFileSize(size), [size]);
  return (
    <Card overflow="hidden" variant="outline" size={"sm"} rounded={"xl"}>
      <CardBody as={HStack} gridGap={2}>
        <Box flex={"0 0 36px"}>
          <FileIcon
            extension={extension}
            {...defaultStyles[extension as DefaultExtensionType]}
          />
        </Box>
        <VStack flex={"1 1 auto"} overflow={"hidden"}>
          <HStack
            as={Link}
            color={"blue.500"}
            w={"full"}
            spacing={0}
            fontSize={"sm"}
          >
            <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
              {name}
            </Box>
            {extension && (
              <Box flexShrink="0" whiteSpace="nowrap">
                .{extension}
              </Box>
            )}
          </HStack>
          <Box fontSize={"sm"} w="full">
            {fsize}
          </Box>
        </VStack>
        <IconButton
          flex={"0 1 auto"}
          as={Link}
          href={getOriginalFile(src)}
          aria-label={t("download")}
          icon={<FaDownload />}
          size="sm"
          variant={"ghost"}
        />
      </CardBody>
    </Card>
  );
};
