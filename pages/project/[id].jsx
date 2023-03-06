/* eslint-disable react-hooks/exhaustive-deps */
import Editor from "../../components/Editor";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Nav from "../../components/navbar";
import Loader from "../../components/loader";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const [html, setHTML] = useState("");
  const [css, setCSS] = useState("");
  const [js, setJS] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `);
      updateProject();
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    getProject();

    const elms = document.querySelectorAll(".react-codemirror2");
    if (!elms.length) return;

    elms.forEach((elm) => {
      if (elm && elm.childNodes.length === 2) {
        elm.childNodes[0].remove();
      }
    });
  }, []);

  const getProject = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/getProject?projectId=${id}`);
    const { isError, data } = await res.json();
    setIsLoading(false);

    if (isError) {
      router.push({ pathname: "/" });
    } else {
      document.title = `CodeSprite - ${data.name}`;
      setHTML(data.html);
      setCSS(data.css);
      setJS(data.js);
    }
  };

  const updateProject = async () => {
    if (!html && !css && !js) return;

    await fetch("/api/updateProject", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html, css, js, projectId: id }),
    });
  };

  return (
    <div>
      <Nav previewBtn={true} />
      <Loader isLoading={isLoading} />
      <div className="flex justify-evenly">
        <Editor title={"HTML"} language="xml" value={html} onChange={setHTML} />
        <Editor title={"CSS"} language="css" value={css} onChange={setCSS} />
        <Editor
          title={"JavaScript"}
          language="javascript"
          value={js}
          onChange={setJS}
        />
      </div>
      <div className="m-4 border border-blue-300 rounded-md">
        <div className="wht rounded-md m-4 border">
        <span className="font-bold underline m-0 p-2 text-slate-800 white">
          Preview 🔥
        </span>
        </div>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          className="h-[40vh] mt-4"
        />
      </div>
    </div>
  );
}
