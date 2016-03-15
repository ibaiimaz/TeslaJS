//
//
//
var tms = require('../TeslaJS');

//
//
//
function login_cb(result) {
    console.log("Login Successfull.");

    if (result.error)
        console.log(JSON.stringify(result.error));
    else
        soc(result.authToken);
}

//
//
//
function soc(token) {
    var options = { authToken: token, carIndex: 0 };

    tms.vehicles(options, function (vehicle) {
        console.log("Vehicle " + vehicle.vin + " ( '" + vehicle.display_name + "' ) is: " + vehicle.state);

        options.vehicleID = vehicle.id_s;
        tms.chargeState(options, function (charge_state) {
            console.log("Current SOC: " + charge_state.battery_level + '%');
            console.log("Target SOC: " + charge_state.charge_limit_soc + '%');
            console.log("Rated range: " + Math.round(charge_state.battery_range) + ' miles');
        });
    });
}

var options = { email: process.argv[2], password: process.argv[3] };
tms.login(options.email, options.password, login_cb);
