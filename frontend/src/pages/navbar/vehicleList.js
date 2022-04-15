import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

// for testing :
const list = [
    { name: "alto", color: "black" },
    { name: "wagonR", color: "silver" },
    { name: "auto", color: "green" },
    { name: "scooty", color: "pink" },
    { name: "ciaz", color: "blue" },
    { name: "verna", color: "white" },
];

// always to declare useState hook inside the function only !!
// const [cartList, setCartList] = useState([]) ;

// Struggle : sending useState hooks from App.js => home.js => vehicleList.js in the props
const VehicleList = ({ searchResults, cartList, setCartList }) => {
    // like this :)
    // const [cartList, setCartList] = useState([]) ;
    const [activeUser, setActiveUser] = useState(null);
    // var activeUser = null ;
    const { state, dispatch } = useContext(UserContext);

    // using this useEffect to solve the one step lag of UseState hook by calling/updating the activeUser
    // on each render of the page by passing their updating functions as well in the same only ... As it is called
    // on each render it keeps itself updated for every iteration of the page and hence solve the lag issue of useState
    useEffect(() => {
        fetchActiveUser();
        if (activeUser) {
            // setCartList(activeUser.cart) ;
            dispatch({ type: "USER", payload: true });
        } else {
            dispatch({ type: "USER", payload: false });
        }
    }, [activeUser]);

    const navigate = useNavigate();
    const fetchActiveUser = async () => {
        // e.preventDefault()
        // console.log("((((((((((((");
        try {
            const res = await fetch("/cartlist", {
                method: "GET", // 'GET' as now we wanna fetch the data from the database unlinke in the case of signin/signup
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            // console.log("}}}}}}}}}}");
            const user = await res.json();
            // console.log("Activer User : "+user.name) ;
            // console.log("vehlist : "+res.status+" "+user);

            if (user) {
                if (res.status != 200) {
                    const error = new Error(res.error);
                    throw error;
                } else {
                    // console.log("%%%%%%%%%");

                    setActiveUser(user);
                    // activeUser = user ;
                    // if(activeUser)
                    //   await setCartList(activeUser.cart) ;

                    // console.log("Activer User at function__ : "+user.name+"  --  "+typeof(user)+" & "+typeof(activeUser)) ;
                    // console.log("Activer User at function__ : "+user.name+"  --  "+(activeUser.name)) ;
                }
            }
            // console.log("\\\\\\");
        } catch (err) {
            console.log(err);
            //navigate('/login') ;
        }
    };

    const authenticateActiveUser = async () => {
        // e.preventDefault()
        // console.log("((((((((((((");
        try {
            const res = await fetch("/cartlist", {
                method: "GET", // 'GET' as now we wanna fetch the data from the database unlinke in the case of signin/signup
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            // console.log("}}}}}}}}}}");
            const user = await res.json();
            // console.log("Activer User : "+user.name) ;
            // console.log("vehlist : "+res.status+" "+user);

            if (user) {
                if (res.status != 200) {
                    const error = new Error(res.error);
                    throw error;
                } else {
                    // console.log("%%%%%%%%%");

                    setActiveUser(user);
                    // activeUser = user ;
                    // if(activeUser)
                    //   await setCartList(activeUser.cart) ;

                    // console.log("Activer User at function__ : "+user.name+"  --  "+typeof(user)+" & "+typeof(activeUser)) ;
                    // console.log("Activer User at function__ : "+user.name+"  --  "+(activeUser.name)) ;
                }
            }
            // console.log("\\\\\\");
        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    };

    //   const fetchAddedCartList = async (item) => {
    //     // e.preventDefault();

    //     // console.log("Item of vehicleList.js : "+item.rate ,item.modelName);
    //     const res = await fetch("/addtocartonvehiclelist" , {
    //         method : "POST" ,
    //         headers : {
    //           "Content-Type" : "application/json"
    //         } ,
    //         body : JSON.stringify({
    //           activeUser ,item
    //         })
    //       }) ;

    //     const data = await res.json() ;
    //     console.log("--> "+data.list);
    //     var curCart = await JSON.parse(data.list) ;
    //     // console.log("Populte testing : "+curCart);
    //     // console.log("Curr Cart : "+curCart[3].quantity);
    //     // await setCartList(curCart) ;
    //     // console.log("Curr Cart* : "+curCart[3].quantity);
    //     // console.log("Fetched Cart : "+typeof(cartList)+" <"+cartList+"> "+curCart[3].quantity);

    //   }

    // const handleAddToCart = async (item) => {

    //   // backend :
    //   // await fetchActiveUser() ;
    //   // console.log("Activer User : "+activeUser.name) ;

    //   // backend :
    //   await fetchAddedCartList(item) ;

    //   console.log("CartList : "+cartList);
    //   // console.log("Curr Item : "+item.modelName+"     ItemCount : "+item.quantity);

    // }

    const handleAddToCart = async (item) => {
        await authenticateActiveUser();

        // setCartList(activeUser.cart) ;
        if (activeUser) {
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
                    window.alert(
                        "Your current item is exceeding the available quantity limit !!"
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
        }
        // cartListItems = cartList ;
        // console.log("CartList : "+cartList);
        // console.log("Curr Item : "+item.modelName+"     ItemCount : "+item.quantity);
    };

    let newNavigate = useNavigate();
    const goToCart = () => {
        let path = "cart";
        newNavigate(path);
    };

    const RenderSearchItem = (item) => {
        if (item.availableQty > 0) {
            return (
                <div className="item">
                    <img src={item.image} alt={item.city} />

                    <div className="bcg">
                        {/*<div className='wrap'>*/}

                        <div className="modelname">{item.modelName}</div>

                        <div className="rate">₹ {item.rate}/h</div>

                        {/* </div> */}

                        <div className="addtocartbutton">
                            <button onClick={() => handleAddToCart(item)}>
                                Add to Cart
                            </button>
                        </div>

                        <div className="gotocartbutton">
                            <button onClick={goToCart}>Go to Cart</button>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="temp">
            <div className="productsList">
                {searchResults.map((item) => RenderSearchItem(item))}
            </div>
        </div>
    );

    // return (
    //   <div className='temp'>
    //   <div className='productsList'>
    //     {searchResults.map((item) => (

    //       RenderSearchItem(item)

    //     ))}
    //   </div>
    //   </div>
    // ) ;

    // return (
    //   <div className='productsList'>
    //     {searchResults.map((item) => (
    //       <div>
    //         <img src={item.image} alt={item.city} />
    //         <h2>{item.modelName}</h2>
    //         <h4>{item.rate}</h4>
    //         <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
    //       </div>

    //     ))}
    //   </div>
    // ) ;
};

export default VehicleList;
