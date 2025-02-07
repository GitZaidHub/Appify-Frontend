import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Postdetail from "./pages/Postdetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Delete from "./pages/Delete";
import Authors from "./pages/Authors";
import Authorpost from "./pages/Authorpost";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import CategoryPost from "./pages/CategoryPost";
import Userprofile from "./pages/Userprofile";
import Edit from "./pages/Edit";
import UserProvider from "./context/userContext";
import LandingPage from "./pages/LandingPage";

const router  = createBrowserRouter([
    {
        path:"/",
        element:<UserProvider><App/></UserProvider>,
        errorElement:<Error/>,
        children:[
            {index:true, element:<Home/>},
            {path:"post/:id", element:<Postdetail/>},
            {path:"register",element: <Register/>},
            {path:"login",element: <Login/>},
            {path:"logout",element: <Logout/>},
            {path:"posts/:id/delete",element: <Delete/>},
            {path:"authors",element: <Authors/>},
            {path: "posts/users/:id", element:<Authorpost/>},
            {path:"create",element: <Create/>},
            {path:"mypost/:id",element: <Dashboard/>},
            {path:"posts/category/:category",element: <CategoryPost/>},
            {path:"myprofile/:id",element: <Userprofile/>},
            {path:"posts/:id/edit",element: <Edit/>},
            {path:"landingPage",element: <LandingPage/>}

        ]
    }
])

export default router