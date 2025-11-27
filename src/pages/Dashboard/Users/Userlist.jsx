import { useEffect, useState } from "react";
import axiosClient from "./../../../api/axios-client";
import moment from "moment";
import { Link } from "react-router-dom";
import iziToast from "izitoast";
import { ClipLoader } from "react-spinners";
import Loading from "../../../components/Loading";

function UserList() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch users function (async-safe)
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await axiosClient.get(`/api/users?page=${currentPage}`);
      setUsers(result.data.data);
      setPagination(result.data);
    } catch (err) {
      console.error("Error fetching users:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  // Load users on page change
  useEffect(() => {
    let cancelled = false;

    const loadUsers = async () => {
      try {
        const result = await axiosClient.get(`/api/users?page=${currentPage}`);
        if (!cancelled) {
          setUsers(result.data.data);
          setPagination(result.data);
        }
      } catch (err) {
        if (!cancelled) console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  // Delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/api/users/${id}`);
      iziToast.success({
        title: "Deleted",
        message: "User deleted successfully",
        position: "topRight",
      });

      // Immediate UI update without reloading
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
    } catch (err) {
      iziToast.error({
        title: "Error!",
        message: "Failed to delete user",
        position: "topRight",
      });
      console.error(err);
    }
  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4>User list</h4>
                </div>

                {loading ? (
                  <Loading loading={loading} />
                ) : (
                  <div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-md">
                          <tbody>
                            <tr>
                              <th>ID</th>
                              <th>User Image</th>
                              <th>User Name</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Created AT</th>
                              <th>Updated AT</th>
                              <th>Action</th>
                            </tr>

                            {users
                              ? users.map((user) => (
                                  <tr key={user.id}>
                                    <td>{user.id}</td>

                                    <td>
                                      <li className="team-member team-member-sm">
                                         <img
                                        src={
                                          user.profile_image
                                            ? `http://localhost:8000/uploads/${user.profile_image}`
                                            : "/src/assets/img/users/user-1.png"
                                        }
                                        className="user-img mr-2"
                                        alt={user.name}
                                      />
                                      </li>
                                     
                                      
                                    </td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                      {moment(user.created_at).format(
                                        "DD-MM-YYYY hh:mm A"
                                      )}
                                    </td>
                                    <td>
                                      {moment(user.updated_at).format(
                                        "DD-MM-YYYY hh:mm A"
                                      )}
                                    </td>
                                    {/* <td>
                                  <div className="badge badge-success">
                                    Active
                                  </div>
                                </td> */}
                                    <td>
                                      <div className="dropdown d-inline">
                                        <button
                                          className="btn btn-primary dropdown-toggle"
                                          type="button"
                                          id="dropdownMenuButton2"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          With Icon
                                        </button>
                                        <div className="dropdown-menu">
                                          <Link
                                            className="dropdown-item has-icon"
                                            to={`/user/update_user/${user.id}`}
                                          >
                                            <i className="far fa-heart"></i> Update
                                          </Link>
                                          {/* Delete */}
                                          <button
                                            className="dropdown-item has-icon"
                                            onClick={() =>
                                              handleDelete(user.id)
                                            }
                                          >
                                            <i className="far fa-trash"></i>{" "}
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              : null}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card-footer text-right">
                      <nav className="d-inline-block">
                        <ul className="pagination mb-0">
                          {/* Previous Button */}
                          <li
                            className={`page-item ${
                              pagination.current_page === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage - 1)}
                            >
                              <i className="fas fa-chevron-left" />
                            </button>
                          </li>

                          {/* Page Numbers */}
                          {[...Array(pagination.last_page).keys()].map(
                            (num) => (
                              <li
                                key={num}
                                className={`page-item ${
                                  pagination.current_page === num + 1
                                    ? "active"
                                    : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => setCurrentPage(num + 1)}
                                >
                                  {num + 1}
                                </button>
                              </li>
                            )
                          )}

                          {/* Next Button */}
                          <li
                            className={`page-item ${
                              pagination.current_page === pagination.last_page
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(currentPage + 1)}
                            >
                              <i className="fas fa-chevron-right" />
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserList;

// async function fetchUsers(page = 1) {
//     try {
//       const result = await axiosClient.get(`/api/users?page=${page}`);
//       console.log(result.data);

//       setUsers(result.data.data);
//       setPagination(result.data);
//       setCurrentPage(result.data.current_page);
//     } catch (err) {
//       console.error("Error fetching users:", err.response || err);
//     }
//   }

//   useEffect(() => {
//     fetchUsers(currentPage);
//   }, [currentPage]);
