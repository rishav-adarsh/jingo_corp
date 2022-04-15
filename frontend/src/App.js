import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, OurAim, OurVision } from "./pages/sidebar/AboutUs";
import {
    Services,
    ServicesOne,
    ServicesTwo,
    ServicesThree,
} from "./pages/sidebar/Services";
import Contact from "./pages/sidebar/ContactUs";
import Team from "./pages/sidebar/Team";
import { useState, useReducer } from "react";
import { useContext, createContext } from "react";
import { initialState, reducer } from "./reducer/UseReducer";
import {
    initialStateForAdmin,
    reducerForAdmin,
} from "./reducer/UseReducerForAdmin";

// import Navbar from "./components/Navbar";
import Home from "./pages/navbar/home";
import Gallery from "./pages/navbar/gallery";
import Rides from "./pages/navbar/rides";
import Offers from "./pages/navbar/offers";
import SignUp from "./pages/navbar/signup";
import Login from "./pages/navbar/login";
import Logout from "./pages/navbar/logout";
import Admin from "./pages/navbar/admin";
import Cart from "./pages/navbar/cart";
import PageNotFound from "./pages/navbar/pageNotFound";
import Footer from "./components/Footer/Footer";
/*
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import ModalDialog from './pages/navbar/ModalDialog';
*/

//import Footer from "./components/Footer/Footer";

export const UserContext = createContext();
export const AdminContext = createContext();

const App = () => {
    // this will be the list that is gonna get merged
    // with the cartList in the vehicleList.js file
    // var cartListItems = [{name:"alto" ,color:"black"}] ;
    const [cartList, setCartList] = useState([]);
    const [activeUser, setActiveUser] = useState(null);

    const [state, dispatch] = useReducer(reducer, initialState);
    const [stateForAdmin, dispatchForAdmin] = useReducer(
        reducerForAdmin,
        initialStateForAdmin
    );
    useEffect(() => {
        fetchActiveUser();
        if (activeUser) {
            // setCartList(activeUser.cart) ;
            dispatch({ type: "USER", payload: true });
            if (activeUser.email === "admin@rentech.com") {
                console.log("????????");
                dispatchForAdmin({ type: "ADMIN", payload: true });
            } else {
                dispatchForAdmin({ type: "ADMIN", payload: false });
            }
        } else {
            dispatch({ type: "USER", payload: false });
            dispatchForAdmin({ type: "ADMIN", payload: false });
        }
    }, [activeUser]);

    const fetchActiveUser = async () => {
        // e.preventDefault()
        try {
            const res = await fetch("/cartlist", {
                method: "GET", // 'GET' as now we wanna fetch the data from the database unlinke in the case of signin/signup
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const user = await res.json();
            // console.log("Activer User : "+user.name) ;

            if (user) {
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                } else {
                    // console.log("%%%%%%%%%");
                    // var user = await JSON.parse(data.user) ;
                    setActiveUser(user);
                    // if(activeUser)
                    //   await setCartList(activeUser.cart) ;
                    // console.log(user.cart+" || "+activeUser.cart);
                    // console.log(user.cart[0]._id.substation+" && "+cartList[0]._id.rate+" && "+activeUser.cart[0]._id.modelName);
                    // activeUser = user ;

                    // console.log("Active User at function__ : "+user.name+"  --  "+typeof(user)+" & "+typeof(activeUser)) ;
                    // console.log("Active User at function__ : "+user.name+"  --  "+(activeUser.name)) ;
                }
            }
        } catch (err) {
            console.log(err + " ---");
            // navigate("/login");
        }
    };

    return (
        <>
            <UserContext.Provider value={{ state, dispatch }}>
                <AdminContext.Provider
                    value={{ stateForAdmin, dispatchForAdmin }}
                >
                    <Router>
                        <Sidebar />

                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Home
                                        cartList={cartList}
                                        setCartList={setCartList}
                                    />
                                }
                            />
                            <Route path="/offers" element={<Offers />} />
                            <Route path="/rides" element={<Rides />} />
                            <Route
                                path="/cart"
                                element={
                                    <Cart
                                        cartList={cartList}
                                        setCartList={setCartList}
                                    />
                                }
                            />

                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/logout"
                                element={
                                    <Logout
                                        setCartList={setCartList}
                                        setActiveUser={setActiveUser}
                                    />
                                }
                            />

                            {/*	</Routes>*/}

                            {/*<Routes>*/}

                            <Route path="/about-us" exact element={<About />} />
                            <Route
                                path="/about-us/aim"
                                exact
                                element={<OurAim />}
                            />
                            <Route
                                path="/about-us/vision"
                                exact
                                element={<OurVision />}
                            />
                            <Route
                                path="/services"
                                exact
                                element={<Services />}
                            />
                            <Route
                                path="/services/services1"
                                exact
                                element={<ServicesOne />}
                            />
                            <Route
                                path="/services/services2"
                                exact
                                element={<ServicesTwo />}
                            />
                            <Route
                                path="/services/services3"
                                exact
                                element={<ServicesThree />}
                            />
                            <Route path="/admin" exact element={<Admin />} />
                            <Route
                                path="/contact"
                                exact
                                element={<Contact />}
                            />
                            <Route path="/team" exact element={<Team />} />

                            <Route path="*" exact element={<PageNotFound />} />
                        </Routes>
                    </Router>
                </AdminContext.Provider>
            </UserContext.Provider>

            {/* <div className="footer">
                <Footer />
            </div> */}
        </>
    );
};

export default App;
