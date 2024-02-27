import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
    const loggedInUser = localStorage.getItem("authenticated");

    if (!loggedInUser) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default Protected