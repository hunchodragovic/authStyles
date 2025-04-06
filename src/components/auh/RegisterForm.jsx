import { useState } from "react";
import styles from "../../styles/RegisterForm.module.css";
import { useRegisterMutation } from "../../redux/features/auth/authApiSlice";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [useInputs, setUseInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Call the register mutation
    try {
      const { data } = await register({
        name: useInputs.name,
        email: useInputs.email,
        password: useInputs.password,
      });
      const accessToken = data?.accessToken;
      if (accessToken) {
        Cookies.set("accessToken", accessToken, { expires: 1 });
        setUseInputs({
          name: "",
          email: "",
          password: "",
        });
        navigate("/dashboard"); // Redirect to the login page after successful registration
      }
    } catch (err) {
      console.error("Registration failed: ", err);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2 className={styles.registerTitle}>Create an Account</h2>

        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
            value={useInputs.name}
            placeholder="Enter your name"
            minLength={5}
            onChange={(e) =>
              setUseInputs({ ...useInputs, name: e.target.value })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={useInputs.email}
            placeholder="Enter your email"
            minLength={5}
            onChange={(e) =>
              setUseInputs({ ...useInputs, email: e.target.value })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={useInputs.password}
            placeholder="Enter your password"
            minLength={5}
            onChange={(e) =>
              setUseInputs({ ...useInputs, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className={styles.registerButton}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Show error message if registration fails */}
      {isError && (
        <div className={styles.errorMessage}>
          {error?.message || "Registration failed. Please try again."}
        </div>
      )}

      {/* Show success message if registration is successful */}
      {isSuccess && (
        <div className={styles.successMessage}>Registration successful!</div>
      )}
    </div>
  );
};

export default RegisterForm;
