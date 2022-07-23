import { useRouter } from "next/router";
import Nav from "../../components/navbar";
import Loader from "../../components/loader";
import { useState, useEffect } from "react";

export default function Preview() {
  const router = useRouter();
  const { id } = router.query;
  const [srcDoc, setSrcDoc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProject = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/getProject?projectId=${id}`);
    const { isError, data } = await res.json();
    setIsLoading(false);

    if (isError) {
      router.push({ pathname: "/" });
    } else {
      const { name, html, css, js } = data;
      document.title = `Codebox Preview - ${name}`;
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `);
    }
  };

  return (
    <div>
      <Nav editBtn={true} />
      <Loader isLoading={isLoading} />
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
        className="h-[90vh]"
      />
    </div>
  );
}
