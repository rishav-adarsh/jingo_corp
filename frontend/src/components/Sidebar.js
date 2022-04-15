import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import {
    HomeOutlined,
    GiftOutlined,
    CarOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

import {
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./Navbar/NavbarElements";
import { AdminContext, UserContext } from "../App";
import { useContext } from "react";

const Nav = styled.div`
    background: rgb(0, 0, 0, 0.85);
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media screen and (max-width: 768px) {
        margin-left: 1rem;
        font-size: 1rem;
    }
`;

const SidebarNav = styled.nav`
    background: rgb(0, 0, 0, 0.85);
    width: 200px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 50ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const SidebarDataForAdmin = [
    {
        title: "About Us",
        path: "/about-us",
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        // subNav: [
        // {
        // 	title: "Our Aim",
        // 	path: "/about-us/aim",
        // 	icon: <IoIcons.IoIosPaper />,
        // },
        // {
        // 	title: "Our Vision",
        // 	path: "/about-us/vision",
        // 	icon: <IoIcons.IoIosPaper />,
        // },
        // ],
    },
    {
        title: "Services",
        path: "/services",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "Assam",
                path: "/services/services1",
                icon: <IoIcons.IoIosPaper />,
                cName: "sub-nav",
            },
            {
                title: "Bihar",
                path: "/services/services2",
                icon: <IoIcons.IoIosPaper />,
                cName: "sub-nav",
            },
            {
                title: "Uttar Pradesh",
                path: "/services/services3",
                icon: <IoIcons.IoIosPaper />,
            },
        ],
    },
    {
        title: "Admin",
        path: "/admin",
        icon: <FaIcons.FaBroadcastTower />,
    },
    {
        title: "Contact Us",
        path: "/contact",
        icon: <FaIcons.FaPhone />,
    },

    {
        title: "Our Team",
        path: "/team",
        icon: <IoIcons.IoMdHelpCircle />,
    },
];

const Sidebar = () => {
    const { state, dispatch } = useContext(UserContext);
    const { stateForAdmin, dispatchForAdmin } = useContext(AdminContext);

    const [sidebar, setSidebar] = useState(false);
    const [activeUser, setActiveUser] = useState(null);

    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        fetchActiveUser();
        if (activeUser) {
            // setCartList(activeUser.cart) ;
            dispatch({ type: "USER", payload: true });
        } else {
            dispatch({ type: "USER", payload: false });
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

    if (state) {
        if (stateForAdmin) {
            return (
                <>
                    <IconContext.Provider value={{ color: "#fff" }}>
                        <Nav>
                            <NavIcon to="#">
                                <FaIcons.FaBars onClick={showSidebar} />
                            </NavIcon>
                            <Bars />

                            <h3
                                style={{
                                    textAlign: "center",
                                    //  marginLeft: "200px",
                                    color: "white",
                                }}
                            >
                                {/*Bike and Car Rentals*/}

                                {/* <RenderNavbarElements/> */}
                                <NavMenu className="navm">
                                    <NavLink to="/" activeStyle>
                                        <HomeOutlined
                                            style={{
                                                marginRight: "0.5em",
                                                fontSize: "1.5em",
                                            }}
                                        />{" "}
                                        Home
                                    </NavLink>
                                    <NavLink to="/offers" activeStyle>
                                        <GiftOutlined
                                            style={{
                                                marginRight: "0.5em",
                                                fontSize: "1.5em",
                                            }}
                                        />{" "}
                                        Offers
                                    </NavLink>
                                    <NavLink to="/rides" activeStyle>
                                        <CarOutlined
                                            style={{
                                                marginRight: "0.5em",
                                                fontSize: "1.5em",
                                            }}
                                        />{" "}
                                        Your Rides
                                    </NavLink>
                                </NavMenu>
                            </h3>

                            {/* <RenderNavbar/> */}

                            <NavBtn className="navbtn">
                                <NavBtnLink to="/logout">LogOut</NavBtnLink>
                                {/* <h3 color="white">Rishav</h3> */}
                            </NavBtn>
                            <NavMenu
                                style={{
                                    fontSize: "1.2em",
                                    fontWeight: "bold",
                                }}
                            >
                                <div className="navcart">
                                    <NavLink to="/cart" activeStyle>
                                        <ShoppingCartOutlined
                                            style={{
                                                marginRight: "0.5em",
                                                fontSize: "1.5em",
                                            }}
                                        />{" "}
                                        Cart
                                    </NavLink>
                                </div>
                            </NavMenu>
                        </Nav>

                        <SidebarNav sidebar={sidebar}>
                            <SidebarWrap>
                                <NavIcon to="#">
                                    <AiIcons.AiOutlineClose
                                        onClick={showSidebar}
                                    />
                                </NavIcon>
                                {SidebarDataForAdmin.map((item, index) => {
                                    return <SubMenu item={item} key={index} />;
                                })}
                            </SidebarWrap>
                        </SidebarNav>
                    </IconContext.Provider>
                </>
            );
        } else {
            return (
                <>
                    <IconContext.Provider value={{ color: "#fff" }}>
                        <Nav>
                            <NavIcon to="#">
                                <FaIcons.FaBars onClick={showSidebar} />
                            </NavIcon>
                            <Bars />

                            <h3
                                style={{
                                    textAlign: "center",
                                    //  marginLeft: "200px",
                                    color: "white",
                                }}
                            >
                                {/*Bike and Car Rentals*/}

                                {/* <RenderNavbarElements/> */}
                                <NavMenu className="navm">
                                    <NavLink to="/" activeStyle>
                                        <HomeOutlined
                                            style={{
                                                marginRight: "0.5em",
                                                fontSize: "1.5em",
                                            }}
                                        />{" "}
                                        Home
                                    </NavLink>
                                    <NavLink to="/offers" activeStyle>
                                        <GiftOutlined
                                            style={{
                                                marginRight: "0.5em",
                                                fontSize: "1.5em",
                                            }}
                                        />{" "}
                                        Offers
                                    </NavLink>
                                    <NavLink to="/rides" activeStyle>
                                        <CarOutlined
                                            style={{
                                                marginRight: "0.5em",
                                                fontSize: "1.5em",
                                            }}
                                        />{" "}
                                        Your Rides
                                    </NavLink>
                                </NavMenu>
                            </h3>

                            {/* <RenderNavbar/> */}

                            <NavBtn className="navbtn">
                                <NavBtnLink to="/logout">LogOut</NavBtnLink>
                                {/* <h3 color="white">Rishav</h3> */}
                            </NavBtn>
                            <NavMenu
                                style={{
                                    fontSize: "1.2em",
                                    fontWeight: "bold",
                                }}
                            >
                                <div className="navcart">
                                    <NavLink to="/cart" activeStyle>
                                        <ShoppingCartOutlined
                                            style={{
                                                marginRight: "0.5em",
                                                fontSize: "1.5em",
                                            }}
                                        />{" "}
                                        Cart
                                    </NavLink>
                                </div>
                            </NavMenu>
                        </Nav>

                        <SidebarNav sidebar={sidebar}>
                            <SidebarWrap>
                                <NavIcon to="#">
                                    <AiIcons.AiOutlineClose
                                        onClick={showSidebar}
                                    />
                                </NavIcon>
                                {SidebarData.map((item, index) => {
                                    return <SubMenu item={item} key={index} />;
                                })}
                            </SidebarWrap>
                        </SidebarNav>
                    </IconContext.Provider>
                </>
            );
        }
    } else {
        return (
            <>
                <IconContext.Provider value={{ color: "#fff" }}>
                    <Nav>
                        <NavIcon to="#">
                            <FaIcons.FaBars onClick={showSidebar} />
                        </NavIcon>
                        <Bars />

                        <h3
                            style={{
                                textAlign: "center",
                                // marginLeft: "200px",
                                color: "white",
                            }}
                        >
                            {/*Bike and Car Rentals*/}

                            {/* <RenderNavbarElements/> */}
                            <NavMenu className="navm">
                                <NavLink to="/" activeStyle>
                                    <HomeOutlined
                                        style={{
                                            marginRight: "0.5em",
                                            fontSize: "1.5em",
                                        }}
                                    />{" "}
                                    Home
                                </NavLink>
                                <NavLink to="/offers" activeStyle>
                                    <GiftOutlined
                                        style={{
                                            marginRight: "0.5em",
                                            fontSize: "1.5em",
                                        }}
                                    />{" "}
                                    Offers
                                </NavLink>
                                <NavLink to="/rides" activeStyle>
                                    <CarOutlined
                                        style={{
                                            marginRight: "0.5em",
                                            fontSize: "1.5em",
                                        }}
                                    />{" "}
                                    Your Rides
                                </NavLink>
                            </NavMenu>
                        </h3>

                        {/* <RenderNavbar/> */}

                        <NavBtn className="navbtn">
                            <NavBtnLink to="/sign-up">SignUp</NavBtnLink>
                            <div className="navlogin">
                                <NavBtnLink
                                    to="/login"
                                    style={{ width: "6em" }}
                                >
                                    LogIn
                                </NavBtnLink>
                            </div>
                        </NavBtn>
                        {/* <NavMenu style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                            <div className="navcrt">
                                <NavLink to="/cart" activeStyle>
                                    <ShoppingCartOutlined style={{marginRight: '0.5em', fontSize: '1.5em'}}/>    Cart
                                </NavLink>
                            </div>
                        </NavMenu> */}
                    </Nav>

                    <SidebarNav sidebar={sidebar}>
                        <SidebarWrap>
                            <NavIcon to="#">
                                <AiIcons.AiOutlineClose onClick={showSidebar} />
                            </NavIcon>
                            {SidebarData.map((item, index) => {
                                return <SubMenu item={item} key={index} />;
                            })}
                        </SidebarWrap>
                    </SidebarNav>
                </IconContext.Provider>
            </>
        );
    }

    // if (state) {
    //     return (
    //         <>
    //             <IconContext.Provider value={{ color: "#fff" }}>
    //                 <Nav>
    //                     <NavIcon to="#">
    //                         <FaIcons.FaBars onClick={showSidebar} />
    //                     </NavIcon>
    //                     <Bars />

    //                     <h3
    //                         style={{
    //                             textAlign: "center",
    //                             marginLeft: "200px",
    //                             color: "blue",
    //                         }}
    //                     >
    //                         {/*Bike and Car Rentals*/}

    //                         {/* <RenderNavbarElements/> */}
    //                         <NavMenu className="navm">
    //                             <NavLink to="/" activeStyle>
    //                                 Home
    //                             </NavLink>
    //                             <NavLink to="/offers" activeStyle>
    //                                 Offers
    //                             </NavLink>
    //                             <NavLink to="/rides" activeStyle>
    //                                 Your Rides
    //                             </NavLink>
    //                             <NavLink to="/cart" activeStyle>
    //                                 Cart
    //                             </NavLink>
    //                         </NavMenu>
    //                     </h3>

    //                     {/* <RenderNavbar/> */}

    //                     <NavBtn className="navbtn">
    //                         <NavBtnLink to="/logout">LogOut</NavBtnLink>
    //                     </NavBtn>
    //                     {/* <div className="username">
    //                         UserName : {activeUser ? activeUser.name : null}
    //                     </div> */}
    //                 </Nav>

    //                 <SidebarNav sidebar={sidebar}>
    //                     <SidebarWrap>
    //                         <NavIcon to="#">
    //                             <AiIcons.AiOutlineClose onClick={showSidebar} />
    //                         </NavIcon>
    //                         {SidebarData.map((item, index) => {
    //                             return <SubMenu item={item} key={index} />;
    //                         })}
    //                     </SidebarWrap>
    //                 </SidebarNav>
    //             </IconContext.Provider>
    //         </>
    //     );
    // } else {
    //     return (
    //         <>
    //             <IconContext.Provider value={{ color: "#fff" }}>
    //                 <Nav>
    //                     <NavIcon to="#">
    //                         <FaIcons.FaBars onClick={showSidebar} />
    //                     </NavIcon>
    //                     <Bars />

    //                     <h3
    //                         style={{
    //                             textAlign: "center",
    //                             marginLeft: "200px",
    //                             color: "blue",
    //                         }}
    //                     >
    //                         {/*Bike and Car Rentals*/}

    //                         {/* <RenderNavbarElements/> */}
    //                         <NavMenu className="navm">
    //                             <NavLink to="/" activeStyle>
    //                                 Home
    //                             </NavLink>
    //                             <NavLink to="/offers" activeStyle>
    //                                 Offers
    //                             </NavLink>
    //                             <NavLink to="/rides" activeStyle>
    //                                 Your Rides
    //                             </NavLink>
    //                             <NavLink to="/cart" activeStyle>
    //                                 Cart
    //                             </NavLink>
    //                         </NavMenu>
    //                     </h3>

    //                     {/* <RenderNavbar/> */}

    //                     <NavBtn className="navbtn">
    //                         <NavBtnLink to="/sign-up">SignUp</NavBtnLink>
    //                         <NavBtnLink to="/login">LogIn</NavBtnLink>
    //                     </NavBtn>
    //                 </Nav>

    //                 <SidebarNav sidebar={sidebar}>
    //                     <SidebarWrap>
    //                         <NavIcon to="#">
    //                             <AiIcons.AiOutlineClose onClick={showSidebar} />
    //                         </NavIcon>
    //                         {SidebarData.map((item, index) => {
    //                             return <SubMenu item={item} key={index} />;
    //                         })}
    //                     </SidebarWrap>
    //                 </SidebarNav>
    //             </IconContext.Provider>
    //         </>
    //     );
    // }
};

export default Sidebar;
