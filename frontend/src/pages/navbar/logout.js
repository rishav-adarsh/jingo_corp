import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const override = css`
    background-color: #282c34;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

export default function Logout({ setCartList, setActiveUser }) {
    const { state, dispatch } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("/logout", {
            method: "GET", // 'GET' as now we wanna fetch the data from the database unlinke in the case of signin/signup
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => {
                dispatch({ type: "USER", payload: false });
                toast.info("Logged out successfully 👋");
                // window.alert("User Logged Out !!")
                setActiveUser(null);
                setCartList([]);
                setLoading(false);
                navigate("/login", { replace: true });
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return <></>;
}
