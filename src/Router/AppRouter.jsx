import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Dashboard/Profile";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Protected from "./Protected";
import UserList from "../pages/Dashboard/Users/Userlist";
import AddUser from "../pages/Dashboard/Users/AddUser";
import UpdateUser from "../pages/Dashboard/Users/UpdateUser";

function AppRouter() {
  return (
    <div>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Protected />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/userlist" element={<UserList/>}/>
          <Route path="/user/add_user" element={<AddUser/>}/>
          <Route path="/user/update_user/:id" element={<UpdateUser/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default AppRouter;
