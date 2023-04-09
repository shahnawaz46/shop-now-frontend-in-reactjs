// import React, { useState, useEffect } from "react";
// import { Alert } from "@mui/material";
// import { useDispatch } from "react-redux";

// // components
// import '../css/ErrorHandle.css';


// const ErrorHandle = ({ message = null, error = null, removeAction }) => {
//     const [showMessageOrError, setShowMessageOrError] = useState(null)
//     const [alertSeverity, setAlertSeverity] = useState()
//     const dispatch = useDispatch()

//     useEffect(() => {
//         let unmounted = false

//         if (message) {
//             setShowMessageOrError(message)
//             setAlertSeverity("success")

//             setTimeout(() => {
//                 if (!unmounted) {
//                     setShowMessageOrError(null)
//                     dispatch(removeAction())
//                 }
//             }, 2000)
//         }
//         if (error) {
//             setShowMessageOrError(error)
//             setAlertSeverity("error")

//             setTimeout(() => {
//                 if (!unmounted) {
//                     setShowMessageOrError(null)
//                     dispatch(removeAction())
//                 }
//             }, 2000)
//         }
//         return () => {
//             unmounted = true
//         }
//     }, [message, error])

//     return (
//         <div className="errorhandle-main-box">
//             {
//                 showMessageOrError && <Alert severity={alertSeverity} style={{ marginRight: "15px" }}>{showMessageOrError}</Alert>
//             }
//         </div>
//     )
// }

// export default ErrorHandle;