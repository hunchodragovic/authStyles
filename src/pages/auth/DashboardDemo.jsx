import { useGetUserQuery } from "../redux/features/users/userApiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/Dashboard.module.css"; // Assuming you have a CSS module for styles

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: user,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUserQuery();

  const handleLogout = () => {
    // Clear cookies/tokens and redirect to login
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/auth/login");
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className={styles.loadingState}>Loading user data...</div>;
    }

    if (isError) {
      return (
        <div className={styles.errorState}>
          Error loading data: {error?.message || "Please try again later"}
        </div>
      );
    }

    if (isSuccess && user) {
      switch (activeTab) {
        case "overview":
          return (
            <div className={styles.overviewContent}>
              <h2>Welcome, {user.name}!</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h3>Profile Views</h3>
                  <p className={styles.statNumber}>142</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Completed Tasks</h3>
                  <p className={styles.statNumber}>24</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Projects</h3>
                  <p className={styles.statNumber}>7</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Total Score</h3>
                  <p className={styles.statNumber}>850</p>
                </div>
              </div>
              <div className={styles.recentActivity}>
                <h3>Recent Activity</h3>
                <ul>
                  <li>You completed task "Update user profile"</li>
                  <li>New message from admin</li>
                  <li>Your project "Web Dashboard" was approved</li>
                </ul>
              </div>
            </div>
          );
        case "profile":
          return (
            <div className={styles.profileContent}>
              <h2>Profile Information</h2>
              <div className={styles.profileDetails}>
                <div className={styles.profileField}>
                  <label>Name</label>
                  <p>{user.name}</p>
                </div>
                <div className={styles.profileField}>
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className={styles.profileField}>
                  <label>Member Since</label>
                  <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button className={styles.editButton}>Edit Profile</button>
            </div>
          );
        case "settings":
          return (
            <div className={styles.settingsContent}>
              <h2>Account Settings</h2>
              <div className={styles.settingOption}>
                <h3>Notifications</h3>
                <label className={styles.toggle}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingOption}>
                <h3>Dark Mode</h3>
                <label className={styles.toggle}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.dangerZone}>
                <h3>Danger Zone</h3>
                <button className={styles.deleteButton}>Delete Account</button>
              </div>
            </div>
          );
        default:
          return <div>Select a tab</div>;
      }
    }

    return <div>No user data available</div>;
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.logo}>MyApp</div>
        <nav className={styles.navigation}>
          <button
            className={`${styles.navButton} ${
              activeTab === "overview" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.navButton} ${
              activeTab === "profile" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`${styles.navButton} ${
              activeTab === "settings" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </nav>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <div className={styles.userInfo}>
            {isSuccess && user && (
              <>
                <span className={styles.userName}>{user.name}</span>
                <div className={styles.avatar}>{user.name.charAt(0)}</div>
              </>
            )}
          </div>
        </header>
        <div className={styles.contentArea}>{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
