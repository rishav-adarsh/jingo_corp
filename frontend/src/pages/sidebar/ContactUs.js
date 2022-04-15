import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { AimOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [query, setQuery] = useState("");

    const [form] = Form.useForm();

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("+++++++++++++++++++");

        const res = await fetch("/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                query,
            }),
        });

        const data = await res.json();
        console.log(data);

        if (!data || res.status === 400 || res.status === 422) {
            toast.error("Please fill the all the fields properly 😠");
            console.log("Feedback Registration Unsuccessful");
        } else {
            toast.success("Your Feedback has been submitted successfully 👍");
            console.log(
                "Feedback Registration submitted Successful from frontend"
            );
            navigate("/");
        }
    };

    return (
        <div className="contactus">
            <div className="null">null</div>
            <h1>Contact Us</h1>

            <div className="contact">
                <Form
                    name="nest-messages"
                    layout="vertical"
                    autoComplete="off"
                    method="POST"
                    form={form}
                    onFinish={handleSubmit}
                >
                    <h2>Please send us your valuable feedback</h2>
                    <Form.Item
                        placeholder
                        name={["name"]}
                        // label="Name"
                    >
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            style={{ border: "none" }}
                        />
                        <hr />
                    </Form.Item>
                    <Form.Item
                        name={["email"]}
                        // label="Email"
                    >
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            style={{ border: "none" }}
                        />
                        <hr />
                    </Form.Item>

                    <Form.Item name={["feedback"]}>
                        <Input.TextArea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Write your feedback here...."
                            style={{ border: "none" }}
                        />
                        <hr />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            onClick={handleSubmit}
                            type="primary"
                            htmlType="submit"
                            style={{ marginLeft: "35%" }}
                        >
                            Send message
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="adresscontainer">
                <div className="address">
                    <AimOutlined
                        style={{ fontSize: "50px", marginLeft: "-4%" }}
                    />{" "}
                    <p>Address</p>
                    <br />
                    222 Stainly Road,
                    <br />
                    Prayagraj
                </div>
                <div className="address">
                    <PhoneOutlined
                        style={{ fontSize: "50px", marginLeft: "-4%" }}
                    />{" "}
                    <p>Phone</p>
                    <br />
                    +91 9129234241
                </div>

                <div className="address">
                    <MailOutlined
                        style={{ fontSize: "50px", marginLeft: "-4%" }}
                    />{" "}
                    <p>Email</p>
                    <br />
                    jingo.corp@gmail.com
                </div>
            </div>
        </div>
    );
};

export default Contact;
