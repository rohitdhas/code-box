import Head from "next/head";
import Nav from "../components/navbar";
import Popup from "../components/popup";
import EmptyState from "../components/emptyState";
import { useState, useEffect } from "react";
import { getUser } from "../utils";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    const user = getUser();
    if (!user) return;

    const res = await fetch(`/api/projects?userId=${user._id}`);
    const { data, isError } = await res.json();
    if (!isError) {
      setProjects(data);
    }
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Create new codebox to get started!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      {!projects.length ? <Popup ToggleButton={EmptyState} /> : <></>}
    </div>
  );
}
