import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
    background-color: #282c34;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const Rides = () => {
    const [transactionList, setTransactionList] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // callCartPage() ; // it is independent of updating funcs of cart and activeUser

        fetchActiveUser();
        if (activeUser) {
            // Struggle :
            setTransactionList(activeUser.transaction); // this line will set the carList dataType as something without population
            // i.e. it won't store the vehile object inside  user.cart[0]._id != {vehicle object} and it will follow user.cart[0]._id == {vehicle object's id}
            // fetchCartList() ; // this we are using to solve the above issue by initializing it with something with population
            // i.e. user.cart[0]._id == {vehicle object} and that's what we require
            setLoading(false);
        }
        // setCartList(activeUser.cart) ;
    }, [activeUser]);

    const navigate = useNavigate();

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

    return (
        <div
            // style={{
            // 	display: 'flex',
            // 	justifyContent: 'left',
            // 	alignItems: 'left',
            // 	height: '100vh',
            // }}
            className="rides"
        >
            {/* <div className="username">
                <h2>UserName : {activeUser ? activeUser.name : null}</h2>
            </div>	 */}

            {/* <div className='ridetitle'>
            <h1><u>Your Rides</u></h1>
            </div>  */}

            {loading ? (
                <SyncLoader
                    css={override}
                    className="loader"
                    size={30}
                    color={"#F37A24"}
                    loading={loading}
                />
            ) : (
                <>
                    {transactionList &&
                        transactionList.map((item) => (
                            <div className="ridedetails">
                                <div className="rideitems">
                                    <h2>TransactionId :</h2>
                                    <h2> {item._id}</h2>
                                    <h2>Amount : ₹{item.amount}</h2>
                                    <h5>Duration : {item.duration} hour(s)</h5>
                                    <h5>Date : {item.date}</h5>
                                </div>
                            </div>
                        ))}

                    <h1 style={{ marginTop: "5%" }}>
                        &nbsp; &nbsp; &nbsp; Note: These are the
                        pseudo-transaction details implemented for testing
                        purposes of the website only!
                    </h1>
                </>
            )}
        </div>
    );

    // return (
    // 	<div
    // 	style={{
    // 		display: 'flex',
    // 		justifyContent: 'center',
    // 		alignItems: 'Right',
    // 		height: '100vh'
    // 	}}
    // 	>

    // 		<div className="cartmodelname">
    // 			<h2>UserName : {activeUser ? activeUser.name : null}</h2>
    // 		</div>
    // 		{transactionList  &&  transactionList.map((item) => (
    // 		<div className="cartitem">
    // 			<div className="cartmodelname">
    // 				<h2>TransactionId : {item._id}</h2>
    // 				<h2>Amount : ₹{item.amount}</h2>
    // 				<h5>Duration : {item.duration}</h5>
    // 				<h5>Date : {item.date}</h5>

    // 			</div>

    // 			<hr />
    // 		</div>
    // 	))}

    // 	</div>
    // );
};

export default Rides;
