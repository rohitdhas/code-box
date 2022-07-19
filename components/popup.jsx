import {
  Button,
  Dialog,
  Classes,
  Tooltip,
  InputGroup,
  TextArea,
} from "@blueprintjs/core";
import { useState } from "react";

export default function Popup({ ToggleButton }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <ToggleButton toggleModal={() => setIsOpen(true)} />
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        title="Creating new Project!"
        icon="plus"
      >
        <DialogBody />
        <DialogFooter handleClose={handleClose} />
      </Dialog>
    </div>
  );
}

function DialogBody() {
  return (
    <div className={Classes.DIALOG_BODY}>
      <InputGroup placeholder="Project Name" size={Classes.LARGE} />
      <TextArea placeholder="Project Description" className="w-full mt-4" />
    </div>
  );
}

function DialogFooter({ handleClose }) {
  return (
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Tooltip content="Close this popup.">
          <Button onClick={handleClose}>Close</Button>
        </Tooltip>
        <Tooltip content="Create Project">
          <Button onClick={handleClose} intent="primary">
            Create
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
