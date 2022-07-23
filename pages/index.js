import Head from "next/head";
import Nav from "../components/navbar";
import Popup from "../components/popup";
import EmptyState from "../components/emptyState";
import { useState, useEffect } from "react";
import { Card, Button, Icon, Toaster, Position } from "@blueprintjs/core";
import { getUser } from "../utils";
import Loader from "../components/loader";
import { useRouter } from "next/router";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    const user = getUser();
    if (!user) return;

    setIsLoading(true);
    const res = await fetch(`/api/projects?userId=${user._id}`);
    const { data, isError } = await res.json();
    setIsLoading(false);
    if (!isError) {
      setProjects(data);
    }
  }

  async function deleteProject(id) {
    const AppToaster = Toaster.create({
      className: "code-toaster",
      position: Position.TOP,
    });

    setIsLoading(true);

    const res = await fetch(`/api/deleteProject?projectId=${id}`);
    const data = await res.json();

    AppToaster.show({ message: data.message, intent: "success" });
    const filtered = projects.filter((item) => item._id !== id);
    setProjects(filtered);

    setIsLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Create new codebox to get started!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav getProjects={getProjects} />
      <Loader isLoading={isLoading} />
      <div className="mt-10">
        {!projects.length ? (
          <Popup getProjects={getProjects} ToggleButton={EmptyState} />
        ) : (
          projects.map((project) => {
            return (
              <Card
                elevation={1}
                className="w-[40%] mx-auto my-4 flex align items-center"
                key={project._id}
                color="red"
                style={{ backgroundColor: "#cfe9ff" }}
              >
                <Card className="mr-6">
                  <Icon icon="code" size={30} intent="primary" />
                </Card>
                <div>
                  <h4 className="text-xl font-bold">{project.name}</h4>
                  <p>{project.description.split(" ").slice(0, 20).join(" ")}</p>
                  <div className="mt-2">
                    <Button
                      onClick={() =>
                        router.push({ pathname: `/preview/${project._id}` })
                      }
                      icon="eye-open"
                      intent="primary"
                      minimal
                    >
                      Preview
                    </Button>
                    <Button
                      onClick={() =>
                        router.push({ pathname: `/project/${project._id}` })
                      }
                      className="mx-2"
                      icon="edit"
                      intent="none"
                      minimal
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteProject(project._id)}
                      icon="delete"
                      intent="danger"
                      minimal
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
