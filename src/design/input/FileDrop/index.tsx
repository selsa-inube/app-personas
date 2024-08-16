import { Icon } from "@inubekit/icon";
import { useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Button } from "../Button";
import { StyledFileDrop } from "./styles";
import { Text } from "@inubekit/text";

interface FileDropProps {
  multiple?: boolean;
  onSelectFiles: (file: FileList) => void;
}

function FileDrop(props: FileDropProps) {
  const { multiple, onSelectFiles } = props;

  const [isDragOver, setIsDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onSelectFiles(files);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    onSelectFiles(event.dataTransfer.files);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleTriggerInputFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <StyledFileDrop
      $isDragOver={isDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Icon icon={<MdOutlineCloudUpload />} appearance="gray" size="32px" />
      <Text type="body" size="large" textAlign="center">
        Arrastra o suelta el archivo para subir <br /> o
      </Text>

      <input
        type="file"
        ref={fileRef}
        accept="image/*,application/pdf"
        onChange={handleSelectFiles}
        hidden
        multiple={multiple}
      />
      <Button onClick={handleTriggerInputFile} spacing="compact">
        Elegir archivo
      </Button>
    </StyledFileDrop>
  );
}

export { FileDrop };
export type { FileDropProps };
