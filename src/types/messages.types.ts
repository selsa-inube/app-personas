import { IFlagAppearance } from "@inubekit/inubekit";

enum EMessageType {
  SUCCESS = "success",
  FAILED = "failed",
  DELETE = "delete",
  ERROR = "error",
  ACTIVATION = "activation",
  DEACTIVATION = "deactivation",
}

interface IMessage {
  show?: boolean;
  title: string;
  description: string;
  icon: React.JSX.Element;
  appearance: IFlagAppearance;
}

interface IMessageCase {
  id: number;
  icon?: React.JSX.Element;
  title: string;
  description: (value: string) => string;
  appearance: IFlagAppearance;
}

interface IMessageCases {
  success: IMessageCase;
  failed: IMessageCase;
}

export { EMessageType };
export type { IMessage, IMessageCases };
