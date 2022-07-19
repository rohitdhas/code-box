import {
  Button,
  Card,
  InputGroup,
  Intent,
  Tooltip,
  Toaster,
  Position,
} from "@blueprintjs/core";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("guest@codebox.com");
  const [password, setPassword] = useState("guest-pass");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const login = async () => {
    setIsLoading(true);
    const AppToaster = Toaster.create({
      className: "code-toaster",
      position: Position.TOP,
    });

    if (!email || !password) return;
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        window.location.pathname = router.query.returnUrl;
        setCookie("codebox-token", res.token);
        AppToaster.show({ message: res.message, intent: "primary" });
      })
      .catch((err) => {
        setIsLoading(false);
        AppToaster.show({ message: err.message, intent: "danger" });
      });
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
          onClick={login}
          className="my-4 w-full font-bold"
          loading={isLoading}
        />
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <a className="text-blue-500">Create Here</a>
          </Link>
        </p>
      </Card>
    </div>
  );
}
