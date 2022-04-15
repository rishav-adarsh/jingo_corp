import React, { useContext, useReducer } from "react";
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { UserContext } from "../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
// import Texty from "rc-texty";
// import "rc-texty/assets/index.css";
// import TweenOne from "rc-tween-one";
// import Button from "antd/lib/button";

const override = css`
    background-color: #282c34;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

// Struggle : sending useState hooks from App.js => cart.js in the props
const Cart = ({ cartList, setCartList }) => {
    const { state, dispatch } = useContext(UserContext);

    // var activeUser = null ;
    const [loading, setLoading] = useState(false);
    const [activeUser, setActiveUser] = useState(null);

    const navigate = useNavigate();
    const callCartPage = async () => {
        try {
            const res = await fetch("/cartlist", {
                method: "GET", // 'GET' as now we wanna fetch the data from the database unlinke in the case of signin/signup
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();

            // console.log(data);

            if (res.status != 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    };

    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 0);
    // }, []);

    // using this useEffect to solve the one step lag of UseState hook by calling/updating the activeUser and cartList
    // on each render of the page by passing their updating functions as well in the same only ... As it is called
    // on each render it keeps itself updated for every iteration of the page and hence solve the lag issue of useState
    useEffect(() => {
        // callCartPage() ; // it is independent of updating funcs of cart and activeUser

        fetchActiveUser();
        if (activeUser) {
            dispatch({ type: "USER", payload: true });
            // Struggle :
            // setCartList(activeUser.cart); // this line will set the carList dataType as something without population
            // i.e. it won't store the vehile object inside  user.cart[0]._id != {vehicle object} and it will follow user.cart[0]._id == {vehicle object's id}
            // fetchCartList() ; // this we are using to solve the above issue by initializing it with something with population
            // i.e. user.cart[0]._id == {vehicle object} and that's what we require
        } else {
            dispatch({ type: "USER", payload: false });
        }
        // setCartList(activeUser.cart) ;
    }, [activeUser]);
    // ^ ^ ^ ^  ^     ^    ^    => empty = render for everyone for each change -> this can also work for the above case
    // []     = render for the very first time only !!
    // [x ,y] = render for each change only for x and y **

    const [duration, setDuration] = useState(1);
    // const [totalCost, setTotalCost] = useState(0) ;

    // useEffect(() => {
    //   var cost = item.quantity * item.rate * duration  ;
    //   cartList.map((item) => (
    //     cost += item.quantity * item.rate * duration
    //   )) ;
    //   setTotalCost(cost) ;
    // }, []) ;

    // Struggle :
    // reduce works very similarly as forEachLoop :
    // No need for useState / useEffect as it will update itself each time we bring
    // some changes  in the application
    var totalCost = !cartList
        ? 0
        : cartList.reduce(
              (cost, item) => cost + item.quantity * item.rate * duration,
              0
          );

    // This is not working somehow :(
    // var totalCost = 0 ;
    // const func = () => {
    //   var totalCost = 0;
    //   cartList.forEach(item => {
    //     totalCost += item.quantity * item.rate * duration;
    //     console.log(totalCost);
    //  });
    //  return ;
    // }
    // console.log(totalCost);

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
            navigate("/login");
        }
    };

    // const fetchCartList = async () => {
    //     // e.preventDefault();

    //     // console.log(activeUser);
    //     const res = await fetch("/fetchcart", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             activeUser,
    //         }),
    //     });

    //     const data = await res.json();
    //     // console.log("--> "+data.list);
    //     if (data.list) {
    //         var curCart = await JSON.parse(data.list); // we are receiving the populated Cart here
    //         // console.log("Populte testing : "+curCart[0]._id.modelName);
    //         // console.log("Curr Cart : "+curCart[3].quantity);
    //         await setCartList(curCart);
    //         // console.log("CartList : "+cartList[0]._id) ;
    //         // console.log("CurCart : "+curCart[0]._id._id) ;

    //         // console.log("Curr Cart* : "+curCart[3].quantity);
    //         // console.log("Fetched Cart : "+typeof(cartList)+" <"+cartList+"> "+curCart[3].quantity);
    //     }
    // };

    // const fetchAddedCartList = async (item) => {
    //     // e.preventDefault();
    //     // await fetchActiveUser() ;
    //     console.log("Verifying activeUser : " + activeUser);
    //     const res = await fetch("/addtocart", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             activeUser,
    //             item,
    //         }),
    //     });

    //     const data = await res.json();
    //     // console.log("--> "+data.list);
    //     if (data.list) {
    //         var curCart = await JSON.parse(data.list);
    //         console.log("Populte testing : " + curCart[0]._id.modelName);
    //         // console.log("Curr Cart : "+curCart[3].quantity);
    //         await setCartList(activeUser.cart);
    //         // console.log("CartList : "+cartList[0]._id.modelName) ;
    //         // console.log("CurCart : "+curCart[0]._id.substation) ;

    //         // console.log("Curr Cart* : "+curCart[3].quantity);
    //         // console.log("Fetched Cart : "+typeof(cartList)+" <"+cartList+"> "+curCart[3].quantity);
    //     }
    // };

    // const fetchRemovedCartList = async (item) => {
    //     // e.preventDefault();

    //     // console.log(activeUser);
    //     const res = await fetch("/removefromcart", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             activeUser,
    //             item,
    //         }),
    //     });

    //     const data = await res.json();
    //     console.log("--> " + data.list);
    //     if (data.list) {
    //         var curCart = await JSON.parse(data.list);
    //         // console.log("Curr Cart : "+curCart[3].quantity);
    //         await setCartList(activeUser.cart);
    //         // console.log("Curr Cart* : "+curCart[3].quantity);
    //         // console.log("Fetched Cart : "+typeof(cartList)+" <"+cartList+"> "+curCart[3].quantity);
    //     }
    // };

    // const handleAddToCart = async (item) => {
    //     console.log("xxxxxxxxxxxxxxxxxxx");
    //     // await fetchActiveUser() ;
    //     // console.log("Activer User : "+activeUser.name) ;

    //     // backend :
    //     try {
    //         await fetchAddedCartList(item);
    //         // await setCartList(activeUser.cart) ;
    //     } catch (err) {
    //         console.log(err);
    //     }
    //     console.log("yyyyyyyyyyyyyyyyyyyy");
    // };

    // const handleRemoveFromCart = async (item) => {
    //     // await fetchActiveUser() ;
    //     // console.log("Activer User : "+activeUser.name) ;

    //     // backend :
    //     await fetchRemovedCartList(item);
    //     // await setCartList(activeUser.cart) ;
    // };

    const handleAddToCart = async (item) => {
        const itemExists = await cartList.find(
            (currItem) => item._id === currItem._id
        );
        if (itemExists) {
            console.log("<======= if ====>");
            if (itemExists.quantity < itemExists.availableQty) {
                await setCartList(
                    cartList.map((currItem) =>
                        currItem._id === item._id
                            ? {
                                  ...itemExists,
                                  quantity: itemExists.quantity + 1,
                              }
                            : currItem
                    )
                );
                activeUser.cart = cartList;
                console.log(
                    "Curr Item : " +
                        itemExists.modelName +
                        "     ItemCount : " +
                        itemExists.quantity
                );
            } else {
                toast.warn(
                    "Your current item is exceeding the available quantity limit 😏"
                );
            }
        } else {
            console.log("<======= else ====>");
            console.log("Item added to cart : " + item.modelName);

            // only difference between searchResults objext and cartList object is that searchResults object holds an
            // extra property of quantity otherwise everything else is the same
            await setCartList([...cartList, { ...item, quantity: 1 }]);
            console.log(
                "Curr Item : " +
                    item.modelName +
                    "     ItemCount : " +
                    item.quantity
            );
        }
        // cartListItems = cartList ;
        console.log("CartList : " + cartList);
        // console.log("Curr Item : "+item.modelName+"     ItemCount : "+item.quantity);
    };

    const handleRemoveFromCart = async (item) => {
        const itemExists = await cartList.find(
            (currItem) => item._id === currItem._id
        );
        if (itemExists.quantity === 1) {
            console.log("<== if ==>");
            await setCartList(
                cartList.filter((currItem) => currItem._id !== item._id)
            );
        } else {
            await setCartList(
                cartList.map((currItem) =>
                    currItem._id === item._id
                        ? { ...itemExists, quantity: itemExists.quantity - 1 }
                        : currItem
                )
            );
        }
    };

    const handleClearCart = async () => {
        // only for the backend clearing :
        console.log("Handling Clear Cart : ");
        const res = await fetch("/clearcart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                activeUser,
            }),
        });

        const data = await res.json();
        // console.log("--> "+data.list);
        if (data.list) {
            var curCart = await JSON.parse(data.list); // we are receiving the populated Cart here
            // console.log("Populte testing : "+curCart[0]._id.modelName);
            // console.log("Curr Cart : "+curCart[3].quantity);
            //   await setCartList(curCart);
            // console.log("CartList : "+cartList[0]._id) ;
            // console.log("CurCart : "+curCart[0]._id._id) ;

            // console.log("Curr Cart* : "+curCart[3].quantity);
            // console.log("Fetched Cart : "+typeof(cartList)+" <"+cartList+"> "+curCart[3].quantity);
        }
    };

    const saveCartList = async () => {
        await handleClearCart();

        // save Cart :
        console.log(activeUser + " ?? " + cartList);
        console.log("Handling Save Cart : ");
        const res = await fetch("/savecart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                activeUser,
                cartList,
            }),
        });

        const data = await res.json();
        console.log("SAVE : " + data);
        if (data) {
            // const user = await JSON.parse(data.user) ;
            // await setCartList(user.cart) ;
            // flag = true ;
            // setActiveUser(null) ;
            // console.log(curCartList+" "+cartList);
        }
    };

    const loadCartList = async () => {
        //setLoading(true);
        await fetchActiveUser();
        if (activeUser) {
            setCartList(activeUser.cart);
            //setLoading(false);
        }
    };

    const handleBookNow = async () => {
        console.log("Handling final Booking : ");
        const res = await fetch("/booknow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                activeUser,
                totalCost,
                duration,
                cartList,
            }),
        });

        const data = await res.json();

        if (data) {
            // Stripe Payment :
            window.alert(
                "Payment has been done sucessfully !!\nPlease refer to our Services in the Sidebar to find substations for vehicle submission"
            );
            navigate("/rides");
        } else {
            toast("Payment failed :( Please try again");
        }

        handleClearCart();
        setCartList([]);
    };

    return (
        <div className="carttop">
            <div className="primary">
                {/* On defining onClick like {handleClearCart()} will make it call automatically without it being pressed
                    so it's preferred doing it like {() => handleClearCart()} */}
                <div className="cartbtn">
                    <button onClick={() => setCartList([])} className="clrcart">
                        Clear Cart
                    </button>
                    <button onClick={() => saveCartList()} className="savecart">
                        Save Cart
                    </button>
                    <button onClick={() => loadCartList()} className="loadcart">
                        Load Cart
                    </button>
                </div>

                <div className="cartcontent">
                    <div className="children">
                        <div className="cart">
                            <div>
                                <h2>My Cart</h2>
                                <hr />
                            </div>

                            {cartList &&
                                cartList.map((item) => (
                                    <div className="cartitem">
                                        <img src={item.image} alt={item.city} />

                                        <div className="cartmodelname">
                                            <h2>{item.modelName}</h2>
                                            <h5>{item.substation}</h5>
                                        </div>

                                        <div className="cartrate">
                                            <h4>₹{item.rate}/h</h4>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleRemoveFromCart(item)
                                            }
                                            // style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '25px'}}
                                            className="removebtn"
                                        >
                                            -
                                        </button>

                                        {item.quantity}

                                        <button
                                            onClick={() =>
                                                handleAddToCart(item)
                                            }
                                            // style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '25px'}}
                                            className="addbtn"
                                        >
                                            +
                                        </button>

                                        <div className="subtotal">
                                            <h4>
                                                Subtotal: ₹{item.rate}*
                                                {item.quantity}{" "}
                                            </h4>
                                        </div>

                                        {/* <button
                                    onClick={() => handleRemoveFromCart(item)}
                                    // style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '25px'}}
                                    className="removebtn"
                                >
                                    -
                                </button>

                                {item.quantity}

                                <button
                                    onClick={() => handleAddToCart(item)}
                                    // style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '25px'}}
                                    className="addbtn"
                                >
                                    +
                                </button> */}

                                        <hr />
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="finalize">
                        <div className="label">
                            <div>
                                <label>
                                    For how long do you want to ride :
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                </label>
                            </div>
                            <input
                                onChange={(e) => setDuration(e.target.value)}
                                className="input"
                                min={1}
                                value={duration}
                                type="number"
                                placeholder="Enter Duration"
                            />{" "}
                            hours
                        </div>
                        <hr />
                        <div className="label2">
                            <label>Your total cost is: Rs.{totalCost} </label>
                        </div>
                        <div>
                            <button
                                onClick={() => handleBookNow()}
                                className="bookbtn"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className="finalize">
                        <div className="label">
                            <div>
                                <label>
                                    For how long do you want to ride :
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                </label>
                            </div>
                            <input
                                onChange={(e) => setDuration(e.target.value)}
                                className="input"
                                min={0}
                                value={duration}
                                type="number"
                                placeholder="Enter Duration"
                            />{" "}
                            hours
                        </div>
                        <hr />
                        <div className="label2">
                            <label>Your total cost is: Rs.{totalCost} </label>
                        </div>
                        <div>
                            <button onClick={() => handleBookNow()} className="bookbtn">Book Now</button>
                        </div>
                    </div>
                    <div className="children">
                    <div className="cart">
                        <div>
                            <h2>My Cart</h2>
                            <hr />
                        </div>

                        {cartList  &&  cartList.map((item) => (
                            <div className="cartitem">
                                <img src={item.image} alt={item.city} />

                                <div className="cartmodelname">
                                    <h2>{item.modelName}</h2>
                                    <h5>{item.substation}</h5>
                                </div>

                                <div className="cartrate">
                                    <h4>₹{item.rate}/h</h4>
                                </div>

                                <div className="subtotal">
                                    <h4>
                                        Subtotal: ₹{item.rate}*{item.quantity}{" "}
                                    </h4>
                                </div>

                                <button
                                    onClick={() => handleRemoveFromCart(item)}
                                    className="removebtn"
                                >
                                    -
                                </button>

                                {item.quantity}

                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="addbtn"
                                >
                                    +
                                </button>

                                <hr />
                            </div>
                        ))}
                    </div>
                    </div> */}
            </div>
        </div>
    );
};

export default Cart;
