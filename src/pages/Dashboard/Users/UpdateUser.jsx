import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../api/axios-client";
import iziToast from "izitoast";
import Swal from "sweetalert2";

function UpdateUser() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/api/users/${id}`);

        setName(response.data.name);
        setFirst_name(response.data.first_name);
        setLast_name(response.data.last_name);
        setEmail(response.data.email);

        // যদি user এর আগের image থাকে
        if (response.data.image) {
          setPreview(response.data.image_url); 
        }

      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axiosClient.post(`/api/users/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      iziToast.success({
        title: "Success",
        message: "User updated successfully!",
        position: "topRight",
        timeout: 3000,
      });

    } catch (err) {
      console.error("Failed to update user:", err);

      iziToast.error({
        title: "Error",
        message: err.response?.data?.message || "Update failed!",
        position: "topRight",
      });
    }
  };

  // Image Preview Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="main-content d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-6 col-lg-6">
        <form onSubmit={handleUpdate}>
          <div className="card">
            <div className="card-header">
              <h4>Update User</h4>
            </div>

            <div className="card-body">

              {/* User Name */}
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* First Name */}
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="form-group mt-2">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

            </div>

            <div className="card-footer text-right">
              <button disabled={loading} className="btn btn-primary mr-1" type="submit">
                {loading ? "Updating..." : "Update User"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
