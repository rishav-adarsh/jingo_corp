const express = require("express");
const { reset } = require("nodemon");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const adminAuthenticate = require("../middleware/adminAuthenticate");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

require("../db/conn");
const User = require("../models/userSchema");
const Vehicle = require("../models/vehicleSchema");
const Feedback = require("../models/feedbackSchema");

router.get("/", (req, res) => {
    console.log("Visiting Home Page via router.js");

    res.send("Welcome to Home Page from router.js !!");
    // res.json({message : req.body}) ;
});

// using async-await :
router.post("/signup", async (req, res) => {
    const { name, email, mobile, password, cpassword } = req.body;
    console.log(req.body);

    if (!name || !email || !mobile || !password || !cpassword) {
        console.log("some fields are empty !!");
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            console.log("user already exists!!");
            window.alert("User already exists !!");
            return res.status(422).json({ error: "user already exists !!" });
        }

        // else if(password != cpassword) {
        //     return res.status(422).json({error : "Confirm password not matching"}) ;
        // }
        else {
            const user = new User({ name, email, mobile, password, cpassword });
            // bcrypt hashing will work here from userShema.js
            await user.save();

            res.status(201).json({
                message: `${name} : User registered successfully !!`,
            });
            console.log("userRegistered on the database :)");
        }
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);

    if (!email || !password) {
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        const userLogin = await User.findOne({ email: email });
        if (!userLogin) {
            res.status(400).json({ error: "User not exists !!" });
        } else {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if (!isMatch) {
                res.status(400).json({ error: "Invalid password !!" });
            } else {
                // console.log(userLogin);
                const token = await userLogin.generateAuthToken();
                console.log("Token : " + token);
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                });
                res.status(201).json({
                    message: "User Logged In successfully !!",
                });
            }
        }
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

// population mainly begins at /fetchcart and /cartlist only
router.post("/fetchcart", async (req, res) => {
    const { activeUser } = req.body;

    if (!activeUser) {
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        // populate :
        const curUser = await User.findOne({ _id: activeUser._id }).populate(
            "cart._id"
        );
        // console.log("Populte testing : "+curUser+"  &&  "+curUser.cart[0]._id.modelName);
        res.status(201).send({ list: JSON.stringify(curUser.cart) }); // toJSON
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

// --> convert vehicleId to _id for all of the above +/-
router.post("/addtocartonvehiclelist", async (req, res) => {
    const { activeUser, item } = req.body;
    // console.log(activeUser.cart+" %% "+item);

    if (!activeUser || !item) {
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        console.log(
            item.modelName + " " + item.substation + " **** " + activeUser
        );
        // Super Struggle :
        const user = await User.findOne({ _id: activeUser._id });
        // console.log("Curr Cart  : "+(user.cart));
        const vehicle = !user.cart
            ? null
            : await user.cart.find((element) => {
                  console.log(
                      "--> " +
                          JSON.stringify(element.vehicleId) +
                          " " +
                          JSON.stringify(item._id)
                  );
                  // to match the dataTypes we used here JSON.stringigy() --- prev it was like (obj ,str)
                  return (
                      JSON.stringify(element.vehicleId) ===
                      JSON.stringify(item._id)
                  );
              });

        var rslt;
        if (vehicle) {
            console.log("Adding existing item to list : ");
            //  Totally fucked us so bad :
            // khali cart._id likhne se kaam ni chlega we have to do it like this "cart._id" in double quotes
            rslt = await User.updateOne(
                { _id: activeUser._id, "cart.vehicleId": item._id }, // this line we were missing : we weren't able to fetch the  exact
                //  cartItem without this line and hence were too much of errors
                {
                    $inc: {
                        "cart.$.quantity": 1,
                    },
                }
            );
        } else {
            console.log("Adding new item to list");

            // dhayan dena agli baari : Missing some part of it like treating _id as vehicle object initially
            var cartItem = {
                vehicleId: item._id,
                modelName: item.modelName,
                image: item.image,
                rate: item.rate,
                substation: item.substation,
                quantity: 1,
            };
            rslt = await User.findOneAndUpdate(
                { _id: activeUser._id },
                { $addToSet: { cart: cartItem } }
            );
        }

        if (rslt) {
            // console.log(typeof([activeUser.cart]));
            // console.log("Fetched cart from backend : "+activeUser.cart[1]._id+" "+activeUser.cart[1].quantity);

            // populate :
            // const curUser = await User.findOne({_id : activeUser._id}).populate('cart._id') ;
            // console.log("Populte testing : "+curUser+"  &&  "+curUser.cart[0]._id.modelName);
            // res.status(201).send({list : JSON.stringify(curUser.cart)}) ;  // toJSON
            res.status(201).send({ list: JSON.stringify(activeUser.cart) });
        } else {
            res.status(401).send({ message: "AddToCart faced some issue !!" });
        }
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

router.post("/addtocartonvehiclelist", async (req, res) => {
    const { activeUser, item } = req.body;
    // console.log(activeUser.cart+" %% "+item);

    if (!activeUser || !item) {
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        console.log(
            item.modelName + " " + item.substation + " **** " + activeUser
        );
        // Super Struggle :
        const user = await User.findOne({ _id: activeUser._id });
        // console.log("Curr Cart  : "+(user.cart));
        const vehicle = !user.cart
            ? null
            : await user.cart.find((element) => {
                  console.log(
                      "--> " +
                          JSON.stringify(element.vehicleId) +
                          " " +
                          JSON.stringify(item._id)
                  );
                  // to match the dataTypes we used here JSON.stringigy() --- prev it was like (obj ,str)
                  return (
                      JSON.stringify(element.vehicleId) ===
                      JSON.stringify(item._id)
                  );
              });
        const curVehicle = await Vehicle.findOne({ _id: item._id }).select(
            "quantity"
        );
        // console.log("Vehicle : "+vehicle);
        console.log("Vehile Qty : " + curVehicle.quantity);

        if (curVehicle.quantity > 0) {
            var rslt1, rslt2;
            if (vehicle) {
                console.log("Adding existing item to list : ");
                //  Totally fucked us so bad :
                // khali cart._id likhne se kaam ni chlega we have to do it like this "cart._id" in double quotes
                rslt1 = await User.updateOne(
                    { _id: activeUser._id, "cart.vehicleId": item._id }, // this line we were missing : we weren't able to fetch the  exact
                    //  cartItem without this line and hence were too much of errors
                    {
                        $inc: {
                            "cart.$.quantity": 1,
                        },
                    }
                );
            } else {
                console.log("Adding new item to list");

                // dhayan dena agli baari : Missing some part of it like treating _id as vehicle object initially
                var cartItem = {
                    vehicleId: item._id,
                    modelName: item.modelName,
                    image: item.image,
                    rate: item.rate,
                    substation: item.substation,
                    quantity: 1,
                };
                rslt1 = await User.findOneAndUpdate(
                    { _id: activeUser._id },
                    { $addToSet: { cart: cartItem } }
                );
            }
            rslt2 = await Vehicle.updateOne(
                { _id: item._id }, // this line we were missing : we weren't able to fetch the  exact
                //  cartItem without this line and hence were too much of errors
                {
                    $inc: {
                        quantity: -1,
                    },
                }
            );
        } else {
            console.log("You are exceeding the selected item's quantity !!");
            // window.alert("You are exceeding the selected item's quantity !!")
        }

        if (rslt1 && rslt2) {
            // console.log(typeof([activeUser.cart]));
            // console.log("Fetched cart from backend : "+activeUser.cart[1]._id+" "+activeUser.cart[1].quantity);

            // populate :
            // const curUser = await User.findOne({_id : activeUser._id}).populate('cart._id') ;
            // console.log("Populte testing : "+curUser+"  &&  "+curUser.cart[0]._id.modelName);
            // res.status(201).send({list : JSON.stringify(curUser.cart)}) ;  // toJSON
            res.status(201).send({ list: JSON.stringify(activeUser.cart) });
        } else {
            res.status(401).send({ message: "AddToCart faced some issue !!" });
        }
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

router.post("/addtocart", async (req, res) => {
    const { activeUser, item } = req.body;
    console.log(activeUser + " %% " + item);

    if (!activeUser || !item) {
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        console.log(
            item.vehicleId + " " + item.quantity + " **** " + activeUser._id
        );
        // Super Struggle :
        const user = await User.findOne({ _id: activeUser._id });
        // console.log("Curr Cart  : "+([user.cart]));
        const vehicle = await user.cart.find((element) => {
            console.log(
                "--> " +
                    JSON.stringify(element.vehicleId) +
                    " " +
                    JSON.stringify(item.vehicleId)
            );
            // to match the dataTypes we used here JSON.stringigy() --- prev it was like (obj ,str)
            return (
                JSON.stringify(element.vehicleId) ===
                JSON.stringify(item.vehicleId)
            );
        });
        console.log("Vehicle : " + vehicle);

        var rslt;
        if (vehicle) {
            console.log("Adding existing item to list : " + vehicle);
            //  Totally fucked us so bad :
            // khali cart._id likhne se kaam ni chlega we have to do it like this "cart._id" in double quotes
            rslt = await User.updateOne(
                { _id: activeUser._id, "cart.vehicleId": item.vehicleId }, // this line we were missing : we weren't able to fetch the  exact
                //  cartItem without this line and hence were too much of errors
                {
                    $inc: {
                        "cart.$.quantity": 1,
                    },
                }
            );
        } else {
            console.log("Adding new item to list");

            // dhayan dena agli baari : Missing some part of it like treating _id as vehicle object initially
            var cartItem = {
                vehicleId: item.vehicleId,
                modelName: item.modelName,
                image: item.image,
                rate: item.rate,
                substation: item.substation,
                quantity: 1,
            };
            rslt = await User.findOneAndUpdate(
                { _id: activeUser._id },
                { $addToSet: { cart: cartItem } }
            );
        }
        if (rslt) {
            // console.log(typeof([activeUser.cart]));
            // console.log("Fetched cart from backend : "+activeUser.cart[1]._id+" "+activeUser.cart[1].quantity);

            // populate :
            // const curUser = await User.findOne({_id : activeUser._id}).populate('cart._id') ;
            // console.log("Populte testing : "+curUser+"  &&  "+curUser.cart[0]._id.modelName);
            // res.status(201).send({list : JSON.stringify(curUser.cart)}) ;  // toJSON
            res.status(201).send({ list: JSON.stringify(activeUser.cart) });
        }
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

router.post("/removefromcart", async (req, res) => {
    const { activeUser, item } = req.body;
    // console.log(req.body);

    if (!activeUser || !item) {
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        // Super Struggle :
        // const user = await User.findOne({_id : activeUser._id}) ;
        // console.log("Curr Cart  : "+([user.cart]));
        // const vehicle = user.cart.find((element) => {
        //     console.log("--> "+(JSON.stringify(element._id))+" "+JSON.stringify(item._id));
        //     // to match the dataTypes we used here JSON.stringigy() --- prev it was like (obj ,str)
        //     return (JSON.stringify(element._id) === JSON.stringify(item._id) &&
        //             element.quantity === 1) ;
        // }) ;
        // console.log("Vehicle : "+vehicle);

        var rslt;
        console.log("Qty : " + item.quantity);
        if (item.quantity > 1) {
            console.log("removing from cart when > 1");
            // console.log("Removing vehicle with qty > 1 : "+vehicle);
            //  Totally fucked us so bad :
            // khali cart._id likhne se kaam ni chlega we have to do it like this "cart._id" in double quotes
            rslt = await User.updateOne(
                { _id: activeUser._id, "cart.vehicleId": item.vehicleId }, // this line we were missing : we weren't able to fetch the  exact
                //  cartItem without this line and hence were too much of errors
                {
                    $inc: {
                        "cart.$.quantity": -1,
                    },
                }
            );
        } else {
            console.log("deleting from cart when = 1");
            // console.log("Removing vehicle with qty = 1 : "+vehicle);

            // dhayan dena agli baari : Missing some part of it like treating _id as vehicle object initially
            var cartItem = {
                vehicleId: item.vehicleId,
                modelName: item.modelName,
                image: item.image,
                rate: item.rate,
                substation: item.substation,
                quantity: 1,
            };
            rslt = await User.findOneAndUpdate(
                { _id: activeUser._id },
                { $pull: { cart: { vehicleId: item.vehicleId } } }
            );
        }
        if (rslt) {
            console.log(typeof [activeUser.cart]);
            // console.log("Fetched cart from backend : "+  activeUser.cart[1]._id+" "+activeUser.cart[1].quantity);

            // populate :
            // const curUser = await User.findOne({_id : activeUser._id}).populate('cart._id') ;
            // // // console.log("Populte testing : "+curUser+"  &&  "+curUser.cart[0]._id.modelName);
            // res.status(201).send({list : JSON.stringify(curUser.cart)}) ;  // toJSON
            res.status(201).send({ list: JSON.stringify(activeUser.cart) });
        }
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

router.post("/clearcart", async (req, res) => {
    const { activeUser } = req.body;
    // console.log(req.body);

    if (!activeUser) {
        return res.status(422).json({ error: "User is not logged in !!" });
    }

    try {
        rslt = await User.findOneAndUpdate(
            { _id: activeUser._id },
            { $pull: { cart: { rate: { $gt: 0 } } } }
        );
        if (rslt)
            res.status(201).send({ list: JSON.stringify(activeUser.cart) }); // toJSON
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

router.post("/savecart", async (req, res) => {
    // Here cartList and activeUser.cart are not the same .. former is the updated CartList stored in the frontend
    // while later one is storing the cartList which we have fetched from the activeUser from the backend only so it 
    // will be storing the outdated items in it which we are bound to update here !!
    const { activeUser, cartList } = req.body;
    console.log("**************");

    if (!activeUser || !cartList) {
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        // rslt = await User.findOneAndReplace(
        //     {_id : activeUser._id} ,
        //     {cart : cartList}
        // ) ;
        const rslt = cartList.map(async (item) => {
            const rs = await User.findOneAndUpdate(
                { _id: activeUser._id },
                { $push: { cart: item } }
            );
        });

        // const curUser = await User.findOne(
        //     {_id : activeUser._id}
        // ) ;

        if (rslt) {
            console.log("Cart Saved Sucessfully !! : ");
            // res.status(201).send({user : JSON.stringify(curUser)})
            res.status(201).send({ message: " Saved Sucessfully !!" });
        }
    } catch (err) {
        res.status(401).send({ error: "Not Saved Sucessfully !!" });
        console.log(err);
    }
});

router.post("/booknow", async (req, res) => {
    const { activeUser, totalCost, duration, cartList } = req.body;
    // console.log(activeUser+" %%%%%%%%%%%%%%%%%% "+totalCost);

    if (!activeUser || !totalCost || !duration || !cartList) {
        return res.status(422).json({ error: "Some fields are empty !!" });
    }

    try {
        // updating Vehicle Collection :
        const rslt1 = await cartList.map(async (cartItem) => {
            const rs = await Vehicle.findOneAndUpdate(
                { _id: cartItem._id },
                {
                    $inc: { availableQty: -cartItem.quantity },
                }
            );
        });

        // updating User.transaction of  User Collection :
        var transactionDetails = {
            amount: totalCost,
            duration: duration,
        };
        const rslt2 = await User.findOneAndUpdate(
            { _id: activeUser._id },
            { $push: { transaction: transactionDetails } }
        );
        if (rslt1 && rslt2) {
            res.status(201).send({
                message: "Transaction has been saved sucessfully !!",
            });
        } else {
            return res
                .status(422)
                .json({
                    error: "Transaction has not been saved sucessfully !!",
                });
        }
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

router.post("/search", async (req, res) => {
    console.log("-----------------------------------");
    const { state, city, subStation, vtype } = req.body;
    console.log("Searching for vehicle at : " + subStation);

    if (!state || !city || !subStation || !vtype) {
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        const searchResults = await Vehicle.find({
            state,
            city,
            substation: subStation,
            type: vtype,
        }); // object
        console.log("searchResults ==> " + searchResults);
        if (!searchResults) {
            // console.log("==> "+userLogin);
            res.status(400).json({
                error: "SearchResults not found successfully !!",
            });
        } else {
            // console.log(searchResults.modelName);
            // console.log("json.stringify : "+JSON.stringify(searchResults));
            res.status(201).send({ results: JSON.stringify(searchResults) }); // toJSON
        }
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

// using promises :
// router.post('/register' ,(req ,res) => {
//     const {name ,email ,phone ,work ,password ,cpassword} = req.body ;
//     console.log(req.body);

//     if(!name  ||  !email  ||  !phone  ||  !work  ||  !password   ||  !cpassword) {
//         return res.status(422).json({error : "Some fields are yet to be filled !!"}) ;
//     }

//     User.findOne({email : email}).then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({error : "user already exists !!"}) ;
//         }

//         const user = new User({name ,email ,phone ,work ,password ,cpassword}) ;
//         user.save().then(() => {
//             res.status(201).json({message : "User registered successfully !!"}) ;
//         }).catch((err) => {
//             res.status(500).json({error : "Registration Unsuccessful !!"}) ;
//         })
//     }).catch((err) => {
//         console.log(err) ;
//     })

//     // res.json({message : req.body}) ;
// })

router.post("/feedback", async (req, res) => {
    const { name, email, query } = req.body;
    // console.log(req.body);
    console.log("++++++++++++++++++++++");

    if (!name || !email || !query) {
        console.log("some fields are empty !!");
        // window.alert("Some fields are yet to be filled !!") ;
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        const feedback = new Feedback({ name, email, query });
        await feedback.save();

        res.status(201).json({
            message: `${name}'s Feedback registered successfully !!`,
        });
        console.log("vehicleRegistered on the database :)");
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

router.post("/admin", async (req, res) => {
    const { modelName, image, type, quantity, rate, state, city, substation } =
        req.body;
    console.log(req.body);

    if (
        !modelName ||
        !image ||
        !type ||
        !quantity ||
        !rate ||
        !state ||
        !city ||
        !substation
    ) {
        console.log("some fields are empty !!");
        // window.alert("Some fields are yet to be filled !!") ;
        return res
            .status(422)
            .json({ error: "Some fields are yet to be filled !!" });
    }

    try {
        const vehicle = new Vehicle({
            modelName,
            image,
            type,
            availableQty : quantity,
            rate,
            state,
            city,
            substation,
        });
        await vehicle.save();

        res.status(201).json({
            message: `${modelName} : Vehicle registered successfully !!`,
        });
        console.log("vehicleRegistered on the database :)");
    } catch (err) {
        console.log(err);
    }

    // res.json({message : req.body}) ;
});

router.get("/adminauth", adminAuthenticate, async (req, res) => {
    // res.send("<h1>Welcome to Our About Us ka Page !!</h1> ") ;
    res.send(req.rootUser);
    // console.log("Entered to about page") ;
});

// population mainly begins at /fetchcart and /cartlist only
router.get("/cartlist", authenticate, async (req, res) => {
    // const curUser = await User.findOne({_id : req.rootUser._id}).populate('cart._id') ;
    // console.log("Populte testing : "+curUser+"  &&  "+curUser.cart[0]._id.modelName);
    // res.status(201).send({user : JSON.stringify(curUser)}) ;  // toJSON
    res.status(200).send(req.rootUser);
    // console.log("At /cartlist : "+req.rootUser) ;
    // console.log("Entered to about page") ;
});

router.get("/logout", async (req, res) => {
    console.log("You are on my Logout ka page");
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User logged out !!");
});

module.exports = router;
