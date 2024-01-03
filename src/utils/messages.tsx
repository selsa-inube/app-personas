import { IMessage } from "@ptypes/messages.types";

const initialMessageState: IMessage = {
  show: false,
  title: "",
  description: "",
  icon: <></>,
  appearance: "primary",
};

export { initialMessageState };
