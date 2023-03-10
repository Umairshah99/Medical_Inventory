require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const mongoose = require("mongoose");


// set up some JWT authentication options
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_SECRET; // an arbitrary string used during encryption
// console.log(jwtOptions) // debug to make sure the secret from the .env file is loaded correctly
// passport can work with many authentication systems... here we are setting some middleware code for using JWT that we'll pass to passport to use


const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  // console.log("JWT payload received", jwt_payload) // debugging

  // UserModel.findOne({ _id: jwt_payload.id }, (err, user) => {
  //   if (!user || err) {
  //     // we didn't find the user... fail!
  //     next(null, false);
  //   } else {
  //     // we found the user... keep going
  //     next(null, user);
  //   }
  // });

});

module.exports = {
  jwtOptions,
  jwtStrategy,
};
