import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Chats from "../Pages/Chats";
import CSV from "../Pages/CSV";
import NotFound from "../Pages/NotFound";
import Upload from "../Pages/Upload";
import URI from "../Pages/URI";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
const Routing = () => {
  return (
    <Routes>
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="/" element={<Chats />} />
      <Route path="upload/csv" element={<CSV />} />
      <Route path="404" element={<NotFound />} />
      <Route path="upload" element={<Upload />} />
      <Route path="upload/database" element={<URI />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
export default Routing;
