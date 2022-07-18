import { Button, Card, InputGroup, Intent, Tooltip } from "@blueprintjs/core";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const signup = async () => {
    if (!name || !email || !password || !retypePassword) return;
    if (password !== retypePassword) return;

    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

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
        <InputGroup
          onChange={({ target }) => setName(target.value)}
          value={name}
          large={true}
          placeholder="Name"
          className="my-4"
        />
        <InputGroup
          onChange={({ target }) => setEmail(target.value)}
          value={email}
          large={true}
          placeholder="Email"
          className="my-4"
        />
        <InputGroup
          disabled={disabled}
          large={true}
          placeholder="Password"
          rightElement={lockButton}
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
        />
        <InputGroup
          disabled={disabled}
          large={true}
          placeholder="Retype Password"
          rightElement={lockButton}
          onChange={({ target }) => setRetypePassword(target.value)}
          value={retypePassword}
          type={showPassword ? "text" : "password"}
          className="mt-4"
        />
        <Button
          intent="primary"
          icon="tick"
          text="Create Account"
          large={true}
          onClick={signup}
          className="my-4 w-full"
        />
        <p>
          Already have an account,{" "}
          <Link href="/login">
            <a className="text-blue-500">Login Here</a>
          </Link>
        </p>
      </Card>
    </div>
  );
}
