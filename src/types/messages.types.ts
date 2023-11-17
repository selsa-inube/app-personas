import { MessageAppearanceType } from "@design/feedback/SectionMessage/types";

enum EMessageType {
  SUCCESS = "success",
  FAILED = "failed",
  DELETE = "delete",
  ACTIVATION = "activation",
  DEACTIVATION = "deactivation",
}

interface IMessage {
  show?: boolean;
  title: string;
  description: string;
  icon: JSX.Element;
  appearance: MessageAppearanceType;
}

export { EMessageType };
export type { IMessage };
