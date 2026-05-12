import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import { useForm } from "../hooks";

const PasswordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setValues({ name: "", password: "" });
        navigate("/");
      } else {
        const data = await res.json();
        setError(data.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page--login">
      <div className="page__content">
        <div className="login__content">
          <div className="login__info">
            <p className="login__tagline">Your fitness journey starts here</p>
            <h1 className="h1">Track every<br />rep. Every set.<br />Every win.</h1>
            <p className="text-body login__subtitle">
              Sign in to your account and pick up right where you left off.
              Your sessions, stats, and progress are all waiting for you.
            </p>
          </div>

          <form className="login__form" onSubmit={handleSubmit}>
            <h2 className="login__form-title">Welcome back</h2>

            <Input
              type="text"
              placeholder="Username"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              icon={<PasswordIcon />}
              required
            />

            {error && <p className="login__error">{error}</p>}

            <Button
              className="login__btn"
              type="submit"
              onClick={handleSubmit}
              loading={loading}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
