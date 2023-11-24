import { InteractiveModal } from "@design/feedback/InteractiveModal";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import { IAction, IEntry, ITitle } from "../types";

interface DisplayEntryProps {
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
}: DisplayEntryProps) => {
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
          onCloseModal={handleToggleModal}
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
export type { DisplayEntryProps };
