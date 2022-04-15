import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    InstagramOutlined,
    FacebookFilled,
    LinkedinFilled,
} from "@ant-design/icons";

const Team = () => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div className="team">
            <div className="teamheader">
                <h1>Our Team</h1>
                <h2>Rejuvenating for better tomorrow..</h2>
            </div>

            <div id="mem1" className="member1">
                <div className="img1"></div>

                <h1>
                    {" "}
                    Shivendra <br />
                    <a
                        href="https://www.linkedin.com/in/shivendra-giri-789216191/"
                        target="_blank"
                    >
                        <LinkedinFilled className="linkedin" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        <InstagramOutlined className="instagram" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank">
                        <FacebookFilled className="facebook" />
                    </a>
                </h1>
            </div>

            <div id="mem2" className="member2">
                <div className="img2"></div>

                <h1>
                    {" "}
                    Rishav <br />
                    <a
                        href="https://www.linkedin.com/in/rishavadarsh/"
                        target="_blank"
                    >
                        <LinkedinFilled className="linkedin" />
                    </a>
                    <a
                        href="https://www.instagram.com/ris_adrsh/"
                        target="_blank"
                    >
                        <InstagramOutlined className="instagram" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank">
                        <FacebookFilled className="facebook" />
                    </a>
                </h1>
            </div>

            <div id="mem2" className="member3">
                <div className="img3"></div>

                <h1>
                    {" "}
                    Priyam <br />
                    <a href="https://www.linkedin.com" target="_blank">
                        <LinkedinFilled className="linkedin" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank">
                        <InstagramOutlined className="instagram" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank">
                        <FacebookFilled className="facebook" />
                    </a>
                </h1>
            </div>

            <div className="shivendra">
                <div data-aos="fade-up-right" className="team1"></div>
                <div className="shiv">
                    <h1>
                        Shivendra <h4>(Front-End Lead)</h4>{" "}
                    </h1>
                    <p>
                        <ul>
                            <li>ReactJs</li>
                            <li>JSX</li>
                            <li>Antd</li>
                            <li>AOS</li>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>Bootstrap</li>
                            <li>React-Bootstrap</li>
                        </ul>
                    </p>
                </div>
            </div>
            <div className="rishav">
                <div data-aos="fade-up-left" className="team2"></div>
                <div className="ris">
                    <h1>
                        Rishav <h4>(Back-End Lead)</h4>{" "}
                    </h1>
                    <p>
                        <ul>
                            <li>ReactJs</li>
                            <li>ExpressJs</li>
                            <li>NodeJs</li>
                            <li>MongoDB</li>
                        </ul>
                    </p>
                </div>
            </div>

            <div className="priyam">
                <div data-aos="fade-up-right" className="team3"></div>
                <div className="pri">
                    <h1>
                        Priyam <h4>(Back-End Lead)</h4>{" "}
                    </h1>
                    <p>
                        <ul>
                            <li>ReactJs</li>
                            <li>ExpressJs</li>
                            <li>NodeJs</li>
                            <li>MongoDB</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Team;
