import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const About = () => {
    return (
        <div className="about">
            <div className="aboutcontent">
                <h1>About Us</h1>
            </div>
            <div className="acontent">
                <h2> Welcome to our stage!</h2>
                <p>
                    Jingo is India’s largest mobility platform and one of the
                    world’s largest ride-hailing companies, serving 20+ states
                    and 60+ cities across India. The Jingo platform offers
                    mobility solutions by connecting customers to a wide range
                    of vehicles across bikes and cars and enabling convenience
                    and transparency for millions of customers. Jingo provides
                    inter connection between intra and inter city rentech owned
                    substations which makes it a unique rental platform away
                    from the crowd. Whether you want to drive over the steep
                    highways of Assam or want to enjoy the jaw-dropping views of
                    ganga plains, Jingo is just a button click away. With our
                    branches rapidly expanding to more than 100 cities, you can
                    rest assured to not worry about your travel arrangements.
                    Our team is constantly striving to cater to ever increasing
                    variety of adventures. The vehicle portfolio ranges from
                    Solo trips to family tour ensuring the best riding
                    experiences, with our dedicated mechanics offering you your
                    favorite medium in top shape. Go ahead and explore, Jingo
                    wishes you a great journey.
                </p>
            </div>
            <div className="left"> image</div>
        </div>
    );
};

export const OurAim = () => {
    return (
        <div className="about">
            <h1>Our Aim</h1>
        </div>
    );
};

export const OurVision = () => {
    return (
        <div className="about">
            <h1>Our Vision</h1>
        </div>
    );
};
