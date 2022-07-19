import "../styles/globals.css";
import { RouteGuard } from "../utils/secureRoute";

function MyApp({ Component, pageProps }) {
  return (
    <RouteGuard>
      <Component {...pageProps} />
    </RouteGuard>
  );
}

export default MyApp;
