import { useState } from "react";
import axiosClient from "../../api/axios-client";
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from "../../context/ContextProvider";

function Login() {
    const navigate = useNavigate();

    const{setUser} =useStateContext();

    const [email,setEmail] = useState("");
    const [password,setPassword] =useState("");
    const [errors,setErrors] =useState(null);

    const handleLogin = async (e) => {
  e.preventDefault();
  setErrors(null);

  try {
  
    await axiosClient.get("/sanctum/csrf-cookie");

    // 2️⃣ Login API call (with credentials)
    await axiosClient.post("/api/login", {
      email,
      password
    }, { withCredentials: true }); // <-- credentials ঠিকভাবে যাবে

    // 3️⃣ User data fetch
    const userResponse = await axiosClient.get("/api/user", { withCredentials: true });
    setUser(userResponse.data);

    // 4️⃣ Redirect
    navigate('/');

  } catch (error) {
    if (error.response && error.response.status === 422) {
      setErrors(error.response.data.errors || { general: [error.response.data.message] });
    } else {
      setErrors({ general: ["Login failed due to an unexpected error. Please try again."] });
      console.log("Error Occurred:", error);
    }
  }
};
   
    


  return (
    <div>
      <div className="main-content" id="app">
        <section className="section">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Login</h4>
                  </div>
                  <div className="card-body">
                    {errors && 
        <div style={{ border: '1px solid red', padding: '10px', marginBottom: '10px', color: 'red' }}>
            {Object.keys(errors).map((key) => (
             
                Array.isArray(errors[key]) ? errors[key].map((msg, i) => <p key={key + i}>{msg}</p>) : 
            
                <p key={key}>{errors[key]}</p>
            ))}
        </div>
      }
                    <form
                        onSubmit={handleLogin}
                      
                      
                      className="needs-validation"
                      noValidate
                    >
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          onChange={(e)=>setEmail(e.target.value)}
                          className="form-control"
                          name="email"
                          tabIndex={1}
                          required
                          autofocus
                          
                        />
                        <div className="invalid-feedback">
                          Please fill in your email
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="d-block">
                          <label htmlFor="password" className="control-label">
                            Password
                          </label>
                          <div className="float-right">
                            <a
                              href="auth-forgot-password.html"
                              className="text-small"
                            >
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <input
                          id="password"
                          type="password"
                          onChange={(e)=>setPassword(e.target.value)}
                          className="form-control"
                          name="password"
                          tabIndex={2}
                          required
                        />
                        <div className="invalid-feedback">
                          please fill in your password
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="remember"
                            className="custom-control-input"
                            tabIndex={3}
                            id="remember-me"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="remember-me"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          tabIndex={4}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-4 mb-3">
                      <div className="text-job text-muted">
                        Login With Social
                      </div>
                    </div>
                    <div className="row sm-gutters">
                      <div className="col-6">
                        <a className="btn btn-block btn-social btn-facebook">
                          <span className="fab fa-facebook" /> Facebook
                        </a>
                      </div>
                      <div className="col-6">
                        <a className="btn btn-block btn-social btn-twitter">
                          <span className="fab fa-twitter" /> Twitter
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-muted text-center">
                  Don't have an account?{" "}
                  <Link to={"/signup"}>Create One</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
