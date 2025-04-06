import { useState } from "react";
import styles from "../../styles/RegisterForm.module.css";
import { useRegisterMutation } from "../../redux/features/auth/authApiSlice";

const RegisterForm = () => {
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
      await register(useInputs).unwrap(); // Use unwrap to handle success/error
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
