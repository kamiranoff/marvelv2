"use strict";
var Rx_1 = require("rxjs/Rx");
var ServicesHelpers = (function () {
    function ServicesHelpers() {
    }
    ServicesHelpers.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = res.json();
        return body || {};
    };
    ServicesHelpers.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.log('error.message', error.message);
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    return ServicesHelpers;
}());
exports.ServicesHelpers = ServicesHelpers;
