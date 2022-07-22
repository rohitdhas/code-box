import Editor from "../../components/Editor";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const [html, setHTML] = useState("");
  const [css, setCSS] = useState("");
  const [js, setJS] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `);
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
    const res = await fetch(`/api/getProject?projectId=${id}`);
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Editor title={"HTML"} language="xml" value={html} onChange={setHTML} />
        <Editor title={"CSS"} language="css" value={css} onChange={setCSS} />
        <Editor
          title={"JavaScript"}
          language="javascript"
          value={js}
          onChange={setJS}
        />
      </div>
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
        className="h-[55vh] mt-4"
      />
    </div>
  );
}
