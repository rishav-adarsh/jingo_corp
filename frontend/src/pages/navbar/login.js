import React from "react";
import { Form, Input } from "antd";
import "antd/dist/antd.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Login() {
    const { state, dispatch } = useContext(UserContext);

    const [form] = Form.useForm();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [allEntry, setAllEntry] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();

        const newEntry = { email: email, password: password };
        setAllEntry([...allEntry, newEntry]);
        console.log(allEntry);
    };

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the form submission
    // const handleSubmit = (e) => {
    // 	e.preventDefault();
    // 	if (email === '' || password === '') {
    // 	setError(true);
    // 	} else {
    // 	setSubmitted(true);
    // 	setError(false);
    // 	}
    // }

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Please enter your Email and Password !!</h1>
            </div>
        );
    };

    //----------------------  BackEnd thing below : -------------------------------

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = res.json();
        console.log("--> " + data);

        if (res.status === 400 || res.status === 422 || !data) {
            toast.error("Invalid credentials 😓", {
                className: "logintoasterror",
            });
        } else {
            dispatch({ type: "USER", payload: true });
            toast.success("Logged in successfully 😎");
            navigate("/");
        }
    };

    return (
        <div className="login">
            <Form
                layout="vertical"
                className="login-form"
                autoComplete="off"
                form={form}
                method="POST"
                onFinish={handleSubmit}
            >
                <h1>Login</h1>

                <br />
                <Form.Item
                    name="email"
                    label="Email"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your Username",
                        },
                    ]}
                >
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    style={{ fontSize: "small" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your Password",
                        },
                    ]}
                >
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <div className="bt">
                    <button
                        type="primary"
                        htmlType="submit"
                        className="btn1"
                        style={{
                            marginTop: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            height: "2.2em",
                            width: "5em",
                        }}
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                </div>
                <br />
                <div style={{ color: "red" }}>
                    Not Registered? <a href="sign-up">Click here to register</a>{" "}
                </div>
            </Form>
        </div>
    );

    // return (
    //     <div className="login">
    //         <Form
    //             layout="vertical"
    //             className="login-form"
    //             autoComplete="off"
    //             form={form}
    //             method="POST"
    //             onFinish={handleSubmit}
    //         >
    //             <h1>Login</h1>

    //             <br />
    //             <Form.Item
    //                 name="email"
    //                 label="Email"
    //                 style={{ fontSize: "small", marginBottom: "5px" }}
    //                 rules={[
    //                     {
    //                         required: true,
    //                         message: "Please enter your Username",
    //                     },
    //                 ]}
    //             >
    //                 <Input
    //                     type="email"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                 />
    //             </Form.Item>

    //             <Form.Item
    //                 name="password"
    //                 label="Password"
    //                 style={{ fontSize: "small" }}
    //                 rules={[
    //                     {
    //                         required: true,
    //                         message: "Please enter your Password",
    //                     },
    //                 ]}
    //             >
    //                 <Input
    //                     type="password"
    //                     value={password}
    //                     onChange={(e) => setPassword(e.target.value)}
    //                 />
    //             </Form.Item>
    //             <div className="bt">
    //                 <button
    //                     type="primary"
    //                     htmlType="submit"
    //                     className="btn1"
    //                     style={{ marginTop: "30px" }}
    //                     onClick={handleSubmit}
    //                 >
    //                     Login
    //                 </button>
    //             </div>
    //             <br />
    //             <div style={{ color: "red" }}>
    //                 Not Registered? <a href="sign-up">Click here to register</a>{" "}
    //             </div>
    //         </Form>
    //     </div>
    // );
}

export default Login;

/*
//import { render } from '@testing-library/react';
import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [allEntry, setAllEntry] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();

        const newEntry = { email: email, password: password };
        setAllEntry([ ...allEntry, newEntry]);
        console.log(allEntry);
    }

    // States for checking the errors
 const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
    
	if (email === '' || password === '') {
	setError(true);
	} else {
	setSubmitted(true);
	setError(false);
	}
    resetForm();
    
}

function resetForm() {
    document.getElementById("myForm").reset();

}

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h1>Please enter your Email and Password !!</h1>
	</div>
	);
};



    return (

        <div className='login'>
    
    <div className="messages">
		{errorMessage()}
	</div>

       <div className='form'>
        <form action='' onSubmit={submitForm} id='myform'>
             
            <div>
                <label htmlFor='email' className='label'>Email</label>
            </div>
            <div>
                <input type='text' name='email' id='email' className='input'
                autocomplete='off' 
                value={email} placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor='password' className='label'>Password</label>
            </div>
            <div>
                <input type='password' name='password' id='password' className='input'
                autocomplete='off' 
                value={password} placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button onClick={handleSubmit} type='submit' className='btn'>Login</button>

        </form>
        </div>
        </div>
       
    );
}
*/
