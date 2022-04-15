import React, { useEffect } from "react";
import { Checkbox, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();
    const callAdminPage = async () => {
        try {
            const res = await fetch("/adminauth", {
                method: "GET", // 'GET' as now we wanna fetch the data from the database unlinke in the case of signin/signup
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();
            console.log(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate("/");
        }
    };

    useEffect(() => {
        callAdminPage();
    }, []);

    const [form] = Form.useForm();
    //     const submitForm = () => {
    //     form.resetFields();
    //   }

    // States for registration
    const [modelName, setModelName] = useState("");
    const [image, setImage] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [rate, setRate] = useState(0);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [substation, setSubstation] = useState("");

    //----------------------BackEnd thing below : -------------------------------

    // const navigate = useNavigate() ;
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                modelName,
                image,
                type,
                quantity,
                rate,
                state,
                city,
                substation,
            }),
        });

        const data = await res.json();
        console.log(data);

        if (!data || res.status === 400 || res.status === 422) {
            window.alert(
                "VehicleRegistration Unsuccessful :( \n Please fill the all the fields properly !!"
            );
            console.log("VehicleRegistration Unsuccessful");
        } else {
            window.alert(
                "VehicleRegistration submitted Successful from frontend :)"
            );
            console.log(
                "VehicleRegistration submitted Successful from frontend"
            );
            // navigate("/login") ;
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
                <h1>Vehicle Registration</h1>

                <br />
                <Form.Item
                    name="modelName"
                    label="Model Name"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the Model Name",
                        },

                        { whitespace: true },
                        { min: 3 },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="text"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image URL"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter imageURL",
                        },

                        { whitespace: true },
                        { min: 3 },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="VehicleType"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter VehicleType",
                        },

                        { whitespace: true },
                        { min: 3 },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="quantity"
                    label="Quantity"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please define its quantity",
                        },

                        { whitespace: true },
                        { min: 1 },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="rate"
                    label="Rates (per Hour)"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please define its rate",
                        },

                        { whitespace: true },
                        { min: 2 },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="state"
                    label="State"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the State",
                        },

                        { whitespace: true },
                        { min: 3 },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="city"
                    label="City"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the City",
                        },

                        { whitespace: true },
                        { min: 3 },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="substation"
                    label="Substation"
                    style={{ fontSize: "small", marginBottom: "5px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter Substation",
                        },

                        { whitespace: true },
                        { min: 3 },
                    ]}
                    hasFeedback
                >
                    <Input
                        type="text"
                        value={substation}
                        onChange={(e) => setSubstation(e.target.value)}
                    />
                </Form.Item>

                <div className="bt">
                    <button
                        type="primary"
                        htmlType="submit"
                        className="btn1"
                        onClick={handleSubmit}
                        style={{
                            marginTop: "15px",
                            marginLeft: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                            height: "2.2em",
                            width: "12em",
                        }}
                    >
                        Register
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default Admin;

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
