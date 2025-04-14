import React from "react";
import { Link } from "react-router-dom";
import styles from "../../src/styles/Home.module.css"; // Adjust the path as necessary

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1> Full-stack Authentication App</h1>
        <p>I used the MERN stack </p>
        <div className={styles.buttons}>
          <Link to="/auth/login" className={styles.btn}>
            Login
          </Link>
          <Link to="/auth/register" className={styles.btn}>
            Register
          </Link>
          <Link to="/dashboard" className={styles.btn}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
