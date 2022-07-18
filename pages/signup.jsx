import { Button, Card, InputGroup, Intent, Tooltip } from "@blueprintjs/core";
import Head from "next/head";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const lockButton = (
    <Tooltip
      content={`${showPassword ? "Hide" : "Show"} Password`}
      disabled={disabled}
    >
      <Button
        disabled={disabled}
        icon={showPassword ? "unlock" : "lock"}
        intent={Intent.WARNING}
        minimal={true}
        onClick={() => setShowPassword(!showPassword)}
      />
    </Tooltip>
  );

  return (
    <div className="h-screen flex justify-center align items-center">
      <Head>
        <title>Sign Up</title>
      </Head>
      <Card>
        <h2 className="text-2xl font-bold text-center">
          Create New Account 🎈
        </h2>
        <InputGroup large={true} placeholder="Name" className="my-4" />
        <InputGroup large={true} placeholder="Email" className="my-4" />
        <InputGroup
          disabled={disabled}
          large={true}
          placeholder="Password"
          rightElement={lockButton}
          type={showPassword ? "text" : "password"}
        />
        <InputGroup
          disabled={disabled}
          large={true}
          placeholder="Retype Password"
          rightElement={lockButton}
          type={showPassword ? "text" : "password"}
          className="mt-4"
        />
        <Button
          intent="primary"
          icon="tick"
          text="Create Account"
          large={true}
          className="my-4 w-full"
        />
        <p>
          Already have an account,{" "}
          <a href="/login" className="text-blue-500">
            Login Here
          </a>
        </p>
      </Card>
    </div>
  );
}
