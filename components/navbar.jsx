import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";
import Popup from "./popup";
import { useRouter } from "next/router";
import { delete_cookie } from "../utils";

export default function Nav({ getProjects, previewBtn, editBtn }) {
  const router = useRouter();
  const { id } = router.query;

  const CreateProjectButton = ({ toggleModal }) => (
    <Button
      onClick={toggleModal}
      className={Classes.MINIMAL}
      icon="plus"
      text="New Project"
    />
  );
  return (
    <Navbar className="bg-blue-100">
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading className="text-2xl font-bold">CodeBox 👨‍💻</NavbarHeading>
        <NavbarDivider className="bg-blue-500" />
        <Button
          className={Classes.MINIMAL}
          icon="home"
          text="Home"
          onClick={() => router.push({ pathname: "/" })}
        />
        {getProjects ? (
          <Popup getProjects={getProjects} ToggleButton={CreateProjectButton} />
        ) : (
          <></>
        )}
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        {previewBtn ? (
          <Button
            onClick={() => {
              router.push({ pathname: `/preview/${id}` });
            }}
            icon="eye-open"
            intent="warning"
            text="Preview"
            className="mr-2"
          />
        ) : (
          <></>
        )}
        {editBtn ? (
          <Button
            onClick={() => {
              router.push({ pathname: `/project/${id}` });
            }}
            icon="edit"
            intent="warning"
            text="Edit Project"
            className="mr-2"
          />
        ) : (
          <></>
        )}
        <Button
          onClick={() => {
            delete_cookie("codebox-token");
            router.push({ pathname: "/login" });
          }}
          icon="chevron-left"
          text="Sign Out 👋🏻"
        />
      </NavbarGroup>
    </Navbar>
  );
}
