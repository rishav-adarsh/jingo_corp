// import { set } from "mongoose";
import React, {
    Component,
    useState,
    useEffect,
    useContext,
    useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import VehicleList from "./vehicleList";
import { Carousel } from "antd";
import { UserContext } from "../../App";
// import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ cartList, setCartList }) {
    const [name, setName] = useState("UserName");
    const [subStation, setSubstation] = useState("CurrentSubStation");
    const [state, setState] = useState("CurrentState");
    const [city, setCity] = useState("CurrentCity");
    const [vtype, setVtype] = useState("VehicleType");

    const [searchResults, setSearchResults] = useState([]);

    const [curCities, setCurCities] = useState([]);
    const [curSubstations, setCurSubstations] = useState([]);
    const [activeUser, setActiveUser] = useState(null);

    const [searchBtnClicked, setSearchBtnClicked] = useState(false);

    const { stat, dispatch } = useContext(UserContext);

    //useRef
    const myRef = useRef(null);

    const executeScroll = () =>
        myRef.current.scrollIntoView({ behavior: "smooth" });

    useEffect(() => {
        fetchActiveUser();
        if (activeUser) {
            // setCartList(activeUser.cart) ;
            dispatch({ type: "USER", payload: true });
        } else {
            dispatch({ type: "USER", payload: false });
        }
    }, [activeUser]);

    var stateList = [
        {
            name: "Assam",
            cities: [
                {
                    name: "Guwahati",
                    substations: ["Bongora", "Mirza", "Aazara"],
                },
                { name: "Jorhat", substations: ["Majuli", "Nimati", "Gibbon"] },
            ],
        },
        {
            name: "Bihar",
            cities: [
                {
                    name: "Patna",
                    substations: ["Lohanipur", "Kankarbagh", "Danapur"],
                },
                {
                    name: "Rajgir",
                    substations: ["Bimbisara", "Cyclopean", "Venuvana"],
                },
            ],
        },
        {
            name: "Uttar Pradesh",
            cities: [
                {
                    name: "Prayagraj",
                    substations: [
                        "Shantipuram",
                        "Teliarganj",
                        "Beli",
                        "Daraganj",
                        "Bamrauli",
                    ],
                },
                {
                    name: "Lucknow",
                    substations: ["Hazaratganj", "Ashiyana", "Aliganj"],
                },
            ],
        },
    ];

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
            // navigate('/login') ;
        }
    };

    const changeState = (e) => {
        setState(e.target.value);
        setCurCities(
            stateList.find((stat) => stat.name === e.target.value).cities
        );
        console.log(curCities);
    };

    const changeCity = (e) => {
        setCity(e.target.value);
        const foundCities = stateList.find((stat) => stat.name === state)
            .cities;
        setCurSubstations(
            foundCities.find((stat) => stat.name === e.target.value).substations
        );
    };

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        // window.alert("Showing Search Results :") ;
        console.log("Showing Search Results for : " + subStation);

        // const { name } = this.state.selectedName ;

        //  **fectch will always lead you towards the backend :
        const res = await fetch("/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                state,
                city,
                subStation,
                vtype,
            }),
        });

        // this below .json() is for fetching the data sent fromm the backend in the format of an object file
        // i.e. {msg : JSON.stringify(searchResults)} present in res.status(201).send({msg : JSON.stringify(searchResults)}) ;
        const data = await res.json();

        console.log("Data : " + data.results);

        // And here(or below) while using JSON.parse(data.msg) ,we are just converting the json file into the object
        // file back and finally storing it into the results variable
        var rslts = JSON.parse(data.results);
        setSearchResults(rslts);
        console.log("For Now : " + searchResults);

        // this.setState({[this.results] : rslts}) ;
        // console.log("Res : "+this.results);
        console.log(rslts);
        // console.log("SearchData got from the backend : " + rslts[0]) ;

        if (!data) {
            window.alert("Results not found !!");
            console.log("Results not found !!");
        } else {
            // setSearchBtnClicked(true);
            // // if (activeUser) {
            // window.alert("Here are your results !!\n Please scroll down :)");
            // console.log("Here are your results :");
            // } else {
            //     window.alert("Please log-in to view the vehicle list :)");
            //     navigate("/login");
            // }
            setSearchBtnClicked(true);

            executeScroll();
        }
    };

    return (
        <div className="container">
            <div className="carousel">
                <Carousel autoplay dotPosition={"right"}>
                    <div>
                        <h3 className="c1"></h3>
                    </div>
                    <div>
                        <h3 className="c2"></h3>
                    </div>
                    <div>
                        <h3 className="c3"></h3>
                    </div>
                    <div>
                        <h3 className="c4"></h3>
                    </div>
                </Carousel>
            </div>

            <div className="form-group">
                <h1> Book Your Ride from Here </h1>
                <div className="fselect">
                    <div className="state">
                        <select
                            className="form-select"
                            placeholder="State"
                            value={state}
                            onChange={changeState}
                            required
                        >
                            <option>State</option>
                            {stateList.map((e, key) => {
                                return <option key={key}>{e.name}</option>;
                            })}
                        </select>

                        <select
                            className="form-select"
                            placeholder="City"
                            value={city}
                            onChange={changeCity}
                            required
                        >
                            <option>City</option>
                            {curCities.map((e, key) => {
                                return <option key={key}>{e.name}</option>;
                            })}
                        </select>
                    </div>

                    <div className="station">
                        <select
                            className="form-select"
                            placeholder="PickupStation"
                            value={subStation}
                            onChange={(e) => setSubstation(e.target.value)}
                            required
                        >
                            <option>Pickup Station</option>
                            {curSubstations.map((e, key) => {
                                return <option key={key}>{e}</option>;
                            })}
                        </select>

                        <select
                            className="form-select"
                            placeholder="VehicleType"
                            onChange={(e) => setVtype(e.target.value)}
                            value={vtype}
                            required
                        >
                            <option>VehicleType</option>
                            <option>two-wheeler</option>
                            <option>four-wheeler</option>
                        </select>
                    </div>
                </div>
                <div className="button">
                    <button
                        type="submit"
                        onClick={handleSearch}
                        className="btn"
                    >
                        Search
                    </button>
                </div>
            </div>
            {/* {searchBtnClicked && ( */}
            <div className="vehicleList" ref={myRef}>
                {/* {searchBtnClicked && (
                    <VehicleList
                        searchResults={searchResults}
                        cartList={cartList}
                        setCartList={setCartList}
                    />
                )} */}
                <VehicleList
                    searchResults={searchResults}
                    cartList={cartList}
                    setCartList={setCartList}
                />
            </div>
            {/* )} */}
        </div>
    );

    // 		return (
    //             <div className="container">
    //                 <div className="form-group">
    // 				<h1>Book Your Ride from Here !!</h1>
    //                    <div className="fselect">
    //                     <select className="form-select" placeholder="State" value={state} onChange={changeState} required>
    //
    // 					<option>State</option>
    //                         {stateList.map((e, key) => {
    //                             return <option key={key}>{e.name}</option>;
    //                         })}

    //                     </select>

    // 					<select className="form-select" placeholder="State" value={city} onChange={changeCity} required>
    //
    // 					<option>City</option>
    //                         {curCities.map((e, key) => {
    //                             return <option key={key}>{e.name}</option>;
    //                         })}

    //                     </select>

    //                    <select className="form-select" placeholder="City" value={subStation} onChange={(e) => setSubstation(e.target.value)}  required>
    //                         <option>Pickup Station</option>
    //                         {curSubstations.map((e, key) => {
    //                             return <option key={key}>{e}</option>;
    //                         })}
    //                     </select>

    //                    <select className="form-select" placeholder="VehicleType" onChange={(e) => setVtype(e.target.value)} value={vtype}	required>
    //                         <option>VehicleType</option>
    //                         <option>two-wheeler</option>
    //                         <option>four-wheeler</option>
    //                     </select>
    // 					</div>
    // 					<div className="button">
    //                    <button type="submit" onClick={handleSearch} className="btn" >Search</button>
    // 					</div>
    // 					</div>

    // 					<div className="vehicleList">
    // 						<VehicleList searchResults={searchResults} cartList={cartList} setCartList={setCartList} />
    // 					</div>

    //                 </div>
    // ) ;
}

export default Home;
