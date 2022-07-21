import { Spinner } from "@blueprintjs/core";

export default function Loader({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <div className="z-10 fixed top-0 bottom-0 right-0 left-0 bg-black opacity-70 flex justify-center align items-center">
      <Spinner intent="success" />
    </div>
  );
}
