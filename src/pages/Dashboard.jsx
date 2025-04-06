import { useGetUserQuery } from "../redux/features/users/userApiSlice";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const { data: users, isLoading, isError, error } = useGetUserQuery();

  if (isLoading) return <p className={styles.message}>Loading...</p>;
  if (isError)
    return (
      <p className={styles.message}>
        Error: {error?.data?.message || "Something went wrong"}
      </p>
    );

  // Assuming the last user is the authenticated one (customize as needed)
  const authUser = users?.[users.length - 1];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <h2 className={styles.dashboardTitle}>Welcome, {authUser?.name}!</h2>
        <p className={styles.userEmail}>{authUser?.email}</p>

        <h3 className={styles.tableTitle}>All Registered Users</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
