import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { IAction, ITitle } from "../types";
import { InteractiveModal } from "@design/feedback/InteractiveModal";

export interface IEntry {
  id: string;
  [key: string]: any;
}

export interface IDisplayEntryProps {
  portalId: string;
  entry: IEntry;
  actions: IAction[];
  title: string;
  titleLabels: ITitle[];
  infoTitle?: string;
  actionsTitle?: string;
}

const DisplayEntry = ({
  portalId,
  entry,
  actions,
  title,
  titleLabels,
  infoTitle,
  actionsTitle,
}: IDisplayEntryProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <MdOpenInNew onClick={handleToggleModal} />
      {showModal && (
        <InteractiveModal
          portalId={portalId}
          title={title}
          closeModal={handleToggleModal}
          infoData={entry}
          actions={actions}
          labels={titleLabels}
          infoTitle={infoTitle}
          actionsTitle={actionsTitle}
        />
      )}
    </>
  );
};

export { DisplayEntry };
