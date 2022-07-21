import {
  Button,
  NonIdealState,
  NonIdealStateIconSize,
} from "@blueprintjs/core";

export default function EmptyState({ toggleModal }) {
  const action = (
    <Button
      onClick={toggleModal}
      outlined={true}
      text="Create New Project"
      icon="plus"
      intent="primary"
    />
  );

  const description = (
    <div className="text-base">
      You Don&apos;t have any projets in the list.
      <br />
      Click the button below to start a new project.
    </div>
  );

  const title = <h2 className="text-2xl font-bold">No Projects Found</h2>;

  return (
    <div className="mt-10">
      <NonIdealState
        icon={"box"}
        iconSize={NonIdealStateIconSize.STANDARD}
        title={title}
        description={description}
        action={action}
        layout={"vertical"}
      />
    </div>
  );
}
