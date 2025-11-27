import { useState } from "react";
import axiosClient from "./../../../api/axios-client";

function AddUser() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Handle Input Change
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");

    try {
      await axiosClient.post("/api/users", form);

      setSuccessMsg("User added successfully!");
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
      }
    }
  }

  return (
    <div className="main-content d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-6 col-lg-6">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h4>Add New User</h4>
            </div>

            <div className="card-body">

              {/* Success Message */}
              {successMsg && (
                <div className="alert alert-success">{successMsg}</div>
              )}

              {/* First Name */}
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  value={form.first_name}
                  onChange={handleChange}
                />
                {errors.first_name && (
                  <p className="text-danger">{errors.first_name[0]}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  value={form.last_name}
                  onChange={handleChange}
                />
                {errors.last_name && (
                  <p className="text-danger">{errors.last_name[0]}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email[0]}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password[0]}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  className="form-control"
                  value={form.password_confirmation}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="card-footer text-right">
              <button className="btn btn-primary mr-1" type="submit">
                Submit
              </button>
              <button
                className="btn btn-secondary"
                type="reset"
                onClick={() =>
                  setForm({
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                  })
                }
              >
                Reset
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;