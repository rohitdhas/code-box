import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    const publicPaths = ["/login", "/signup"];
    const path = url.split("?")[0];
    const token = getCookie("codebox-token");

    if (!token && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else if (token && publicPaths.includes(path)) {
      setAuthorized(true);
      router.push({
        pathname: router.query.returnUrl || "/",
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
