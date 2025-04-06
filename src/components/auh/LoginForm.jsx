import { useState } from "react";
import styles from "../../styles/LoginForm.module.css";
import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Call the login mutation
    try {
      const { data } = await login({
        email: userInputs.email,
        password: userInputs.password,
      });
      const accessToken = data?.accessToken;
      if (accessToken) {
        Cookies.set("accessToken", accessToken, { expires: 1 });
        setUserInputs({
          email: "",
          password: "",
        });
        navigate("/dashboard"); // Redirect to the dashboard after successful login
      }
    } catch (err) {
      console.error("Login failed: ", err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2 className={styles.loginTitle}>Login</h2>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={userInputs.email}
            placeholder="Enter your email"
            onChange={(e) =>
              setUserInputs({ ...userInputs, email: e.target.value })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={userInputs.password}
            placeholder="Enter your password"
            minLength={5}
            onChange={(e) =>
              setUserInputs({ ...userInputs, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Show error message if login fails */}
      {isError && (
        <div className={styles.errorMessage}>
          {error?.message || "Login failed. Please try again."}
        </div>
      )}

      {/* Show success message if login is successful */}
      {isSuccess && (
        <div className={styles.successMessage}>Login successful!</div>
      )}
    </div>
  );
};

export default LoginForm;
