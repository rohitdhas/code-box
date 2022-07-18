import { Button, Card, InputGroup, Intent, Tooltip } from "@blueprintjs/core";
import Head from "next/head";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("guest@codebox.com");
  const [password, setPassword] = useState("guest-pass");

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
        <title>Login</title>
      </Head>
      <Card>
        <h2 className="text-2xl font-bold text-center">Log In 🔒</h2>
        <InputGroup
          large={true}
          placeholder="Email"
          className="my-4"
          required
          onChange={({ target }) => setEmail(target.value)}
          value={email}
        />
        <InputGroup
          disabled={disabled}
          large={true}
          placeholder="Password"
          rightElement={lockButton}
          type={showPassword ? "text" : "password"}
          required
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        <Button
          intent="primary"
          icon="log-in"
          text="Log In"
          large={true}
          className="my-4 w-full"
        />
        <p>
          Don&apos;t have an account,{" "}
          <a href="/signup" className="text-blue-500">
            Create Here
          </a>
        </p>
      </Card>
    </div>
  );
}
