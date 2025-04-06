import styles from "../../styles/LoginForm.module.css"; // Adjust the path if needed

const LoginForm = () => {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Login</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
