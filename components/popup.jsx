import {
  Button,
  Dialog,
  Classes,
  Tooltip,
  InputGroup,
  TextArea,
  Toaster,
  Position,
} from "@blueprintjs/core";
import { useState } from "react";
import { getUser } from "../utils";
import { useRouter } from "next/router";

export default function Popup({ ToggleButton, getProjects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const user = getUser();

  const handleClose = () => {
    setIsOpen(false);
  };

  const createProject = async () => {
    setIsLoading(true);

    const AppToaster = Toaster.create({
      className: "code-toaster",
      position: Position.TOP,
    });

    if (!name || !description || !user) {
      setIsLoading(false);
      AppToaster.show({
        message: "Name & Description is Required!",
        intent: "warning",
      });
      return;
    }

    const res = await fetch("/api/createProject", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({ name, description, userId: user._id }),
    });
    const { data, message } = await res.json();
    AppToaster.show({ message, intent: "success" });
    router.push({ pathname: `/project/${data.insertedId}` });
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
        <div className={Classes.DIALOG_BODY}>
          <InputGroup
            onChange={({ target }) => setName(target.value)}
            value={name}
            placeholder="Project Name"
            size={Classes.LARGE}
          />
          <TextArea
            onChange={({ target }) => setDescription(target.value)}
            value={description}
            placeholder="Project Description"
            className="w-full mt-4"
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip content="Close this popup.">
              <Button onClick={handleClose}>Close</Button>
            </Tooltip>
            <Tooltip content="Create Project">
              <Button
                loading={isLoading}
                onClick={createProject}
                intent="primary"
              >
                Create
              </Button>
            </Tooltip>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
