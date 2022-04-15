const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Vehicle = require("../models/vehicleSchema");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        // required : true
    },
    gender: {
        type: String,
        // required : true
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    cart: [
        {
            _id: {
                // this id is VehicleId not cartItemId
                type: mongoose.Schema.Types.ObjectId,
                ref: "VEHICLE",
            },
            // vehicleId : {
            //     type : String ,
            //     required : true
            // } ,
            modelName: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            rate: {
                // pricing
                type: Number, // "55"
                required: true,
            },
            availableQty: {
                type: Number,
                required: true,
            },
            substation: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    transaction: [
        {
            amount: {
                type: Number,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
            date: {
                type: Date,
                default: () => Date.now(),
            },
        },
    ],
});

// hashing password :
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// generating authToken :
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

const User = mongoose.model("USER", userSchema);
module.exports = User;
