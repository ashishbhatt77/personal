import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "./partials/Head";
import Header from "./partials/Header";
import LeftSidebar from "./partials/LeftSidebar";

const UserManage = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from API using axios
  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then((response) => {
        setUsers(response.data); // Correctly accessing response data
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Toggle User Status
  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "Blocked" ? "Active" : "Blocked";

    axios.put(`http://localhost:5000/api/users/${id}`, { status: newStatus })
      .then(() => {
        setUsers(users.map(user => 
          user.id === id ? { ...user, status: newStatus } : user
        ));
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <>
      <Head />
      <Header />
      <section id="mid">
        <div className="container-fluid">
          <div className="row">
            <LeftSidebar />
            <div className="col-md-9">
              <h2 className="text-center">USER MANAGEMENT</h2>
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th> 
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button 
                          className={`btn ${user.status === "Blocked" ? "btn-success" : "btn-danger"}`} 
                          onClick={() => toggleStatus(user.id, user.status)}
                        >
                          {user.status === "Blocked" ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserManage;
