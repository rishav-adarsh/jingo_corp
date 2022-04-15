import React from "react";
import { Checkbox, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function SignUp() {
    const [form] = Form.useForm();
    //     const submitForm = () => {
    //     form.resetFields();
    //   }

    // States for registration
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the mobile number change
    const handleMobile = (e) => {
        setMobile(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the confirm password change
    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        setSubmitted(false);
    };

    //----------------------  BackEnd thing below : -------------------------------

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            name === "" ||
            email === "" ||
            mobile === "" ||
            password === "" ||
            cpassword === ""
        ) {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }

        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email,
                mobile,
                password,
                cpassword,
            }),
        });

        const data = await res.json();
        console.log(data);
        console.log("--> " + error);

        if (!data || res.status === 400 || res.status === 422) {
            toast.error("Please fill all the fields properly 😠");
            console.log("Registration Unsuccessful");
        } else {
            toast.success("Registration successful 🥳");
            console.log("Registration submitted Successful from frontend");
            navigate("/login");
        }
    };

    // ---------------------------------------------------------------------------------------------

    return (
        <div className="signup">
            <Form
                layout="vertical"
                className="login-form"
                autoComplete="off"
                method="POST"
                form={form}
                onFinish={handleSubmit}
            >
                <h1>User Registration</h1>

                <br />
                <Form.Item
                    name="username"
                    label="Username"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your Username",
                        },

                        { whitespace: true },
                        { min: 3 },
                    ]}
                    hasFeedback
                >
                    <Input type="text" value={name} onChange={handleName} />
                </Form.Item>

                <Form.Item
                    name="mobile number"
                    label="Mobile Number"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                        },
                        {
                            min: 10,
                            max: 10,
                            message: "Please enter a valid mobile number",
                        },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="number"
                        value={mobile}
                        onChange={handleMobile}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your email",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email",
                        },
                    ]}
                    hasFeedback
                >
                    <Input type="email" value={email} onChange={handleEmail} />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                        },
                        { min: 6 },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </Form.Item>

                <Form.Item
                    name="confirm password"
                    label="Confirm Password"
                    style={{ fontSize: "small", marginBottom: "0px" }}
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    "Password does not match"
                                );
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input
                        type="password"
                        value={cpassword}
                        onChange={handleCPassword}
                    />
                </Form.Item>
                <div className="agreement">
                    <Form.Item name="agreement">
                        <Checkbox>
                            {" "}
                            Agree to our <a href="#">Terms and Conditions </a>
                        </Checkbox>
                    </Form.Item>
                </div>

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
                            width: "12em",
                        }}
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </div>
                <br />
                <div style={{ color: "green" }}>
                    {" "}
                    Already Registered? <a href="login">
                        Click here to login
                    </a>{" "}
                </div>
            </Form>
        </div>
    );

    // return (
    // 	<div className="signup">
    // 		<Form
    // 			layout="vertical"
    // 			className="login-form"
    // 			autoComplete="off"
    // 			method="POST"
    // 			form={form}
    // 			onFinish={handleSubmit}
    // 		>
    // 			<h1>User Registration</h1>

    // 			<br />
    // 			<Form.Item
    // 				name="username"
    // 				label="Username"
    // 				style={{ fontSize: "small", marginBottom: "5px" }}
    // 				rules={[
    // 					{
    // 						required: true,
    // 						message: "Please enter your Username",
    // 					},

    // 					{ whitespace: true },
    // 					{ min: 3 },
    // 				]}
    // 				hasFeedback
    // 			>
    // 				<Input type="text" value={name} onChange={handleName} />
    // 			</Form.Item>

    // 			<Form.Item
    // 				name="mobile number"
    // 				label="Mobile Number"
    // 				style={{ fontSize: "small", marginBottom: "5px" }}
    // 				rules={[
    // 					{
    // 						required: true,
    // 					},
    // 					{
    // 						min: 10,
    // 						message: "Please enter a valid mobile number",
    // 					},
    // 				]}
    // 				hasFeedback
    // 			>
    // 				<Input
    // 					type="number"
    // 					value={mobile}
    // 					onChange={handleMobile}
    // 				/>
    // 			</Form.Item>

    // 			<Form.Item
    // 				name="email"
    // 				label="Email"
    // 				style={{ fontSize: "small", marginBottom: "5px" }}
    // 				rules={[
    // 					{
    // 						required: true,
    // 						message: "Please enter your email",
    // 					},
    // 					{
    // 						type: "email",
    // 						message: "Please enter a valid email",
    // 					},
    // 				]}
    // 				hasFeedback
    // 			>
    // 				<Input type="email" value={email} onChange={handleEmail} />
    // 			</Form.Item>

    // 			<Form.Item
    // 				name="password"
    // 				label="Password"
    // 				style={{ fontSize: "small", marginBottom: "5px" }}
    // 				rules={[
    // 					{
    // 						required: true,
    // 					},
    // 					{ min: 6 },
    // 				]}
    // 				hasFeedback
    // 			>
    // 				<Input
    // 					type="password"
    // 					value={password}
    // 					onChange={handlePassword}
    // 				/>
    // 			</Form.Item>

    // 			<Form.Item
    // 				name="confirm password"
    // 				label="Confirm Password"
    // 				style={{ fontSize: "small", marginBottom: "0px" }}
    // 				dependencies={["password"]}
    // 				rules={[
    // 					{
    // 						required: true,
    // 					},
    // 					({ getFieldValue }) => ({
    // 						validator(_, value) {
    // 							if (
    // 								!value ||
    // 								getFieldValue("password") === value
    // 							) {
    // 								return Promise.resolve();
    // 							}
    // 							return Promise.reject(
    // 								"Password does not match"
    // 							);
    // 						},
    // 					}),
    // 				]}
    // 				hasFeedback
    // 			>
    // 				<Input
    // 					type="password"
    // 					value={cpassword}
    // 					onChange={handleCPassword}
    // 				/>
    // 			</Form.Item>
    // 			<div className="agreement">
    // 				<Form.Item name="agreement">
    // 					<Checkbox>
    // 						{" "}
    // 						Agree to our <a href="#">Terms and Conditions </a>
    // 					</Checkbox>
    // 				</Form.Item>
    // 			</div>

    // 			<div className="bt">
    // 				<button
    // 					type="primary"
    // 					htmlType="submit"
    // 					className="btn1"
    // 					onClick={handleSubmit}
    // 				>
    // 					Register
    // 				</button>
    // 			</div>
    // 			<br />
    // 			<div style={{ color: "green" }}>
    // 				{" "}
    // 				Already Registered? <a href="login">
    // 					Click here to login
    // 				</a>{" "}
    // 			</div>
    // 		</Form>
    // 	</div>
    // );
}

export default SignUp;

/*
import React, { useState } from 'react';

export default function SignUp() {

// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [mobile, setMobile] = useState('');
const [password, setPassword] = useState('');
const [cpassword, setCPassword] = useState('');


// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);
const [sub,setSub] = useState('');

// Handling the name change
const handleName = (e) => {
	setName(e.target.value);
	setSubmitted(false);
};

// Handling the email change
const handleEmail = (e) => {
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the mobile number change
const handleMobile = (e) => {
	setMobile(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};

// Handling the confirm password change
const handleCPassword = (e) => {
	setCPassword(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	
	if (name === '' || email === '' || mobile === '' || password === '' || cpassword === '') {
	setError(true);
	} else {
	setSubmitted(true);
	setError(false);
	}
};

const handleSubmitted = (e) => {
	setSub({name: '', email: '',  mobile: '',  password: '',  cpassword: ''});

};


// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1>User {name} successfully registered!!</h1>
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h1>Please enter all the fields !!</h1>
	</div>
	);
};

return (
	<div className='signup'>
	<div className='title'>
		<h1>User Registration</h1>
	</div>

	
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>
<div className='form'>
	<form id="myform" onSubmit={handleSubmitted}
        <div>
		<label className="label">Name</label>
        <div>
		<input onChange={handleName} className="input"
		value={name} type="text" placeholder='name' />
        </div>
        </div>
        
        <div>
		<label className="label">Email</label>
        <div>
		<input onChange={handleEmail} className="input"
		value={email} type="email"  placeholder='email' />
        </div>
        </div>

        <div>
		<label className="label">Mobile No.</label>
        <div>
		<input onChange={handleMobile} className="input"
		value={mobile} type="number" placeholder='mobile number' />
        </div>
        </div>

       <div>
		<label className="label">Password</label>
        <div>
		<input onChange={handlePassword} className="input"
		value={password} type="password"  placeholder='password'/>
        </div>
        </div>

        <div>
		<label className="label">Confirm Password</label>
        <div>
		<input onChange={handleCPassword} className="input"
		value={cpassword} type="password"  placeholder='confirm password'/>
        </div>
        </div>
        
        <div>
		<button onClick={handleSubmit} className="btn" type="submit" >
		SUBMIT
		</button>
        </div>
	</form>
    </div>
	</div>
);
}

*/
