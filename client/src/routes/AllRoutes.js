import React from 'react'
import HomeTodoPage from "./HomeTodoPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage"

import {
    Routes,
    Route
} from "react-router-dom";

const AllRoutes = () => {

    return (
        <Routes>
            {/* <Route path="*" element={<ErrorPage />} /> */}
            <Route path="/" element={<HomeTodoPage  />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    )
}

export default AllRoutes