/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_johnny_five__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_johnny_five___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_johnny_five__);

class LED {
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LED;

LED.board = new __WEBPACK_IMPORTED_MODULE_0_johnny_five___default.a.Board();
LED.accelToColor = (accel) => {
    LED.rgb.color({
        red: accel.x,
        green: accel.y,
        blue: accel.z
    });
    console.log(LED.rgb.color());
};
LED.init = () => {
    return new Promise((resolve, reject) => {
        LED.board.on('ready', () => {
            LED.boardReady();
            resolve();
        });
    });
};
LED.boardReady = () => {
    LED.rgb = new __WEBPACK_IMPORTED_MODULE_0_johnny_five___default.a.Led.RGB({
        pins: {
            red: 6,
            green: 5,
            blue: 3
        }
    });
    // LED.rgb.on()
};
LED.init().then(() => {
    console.log('run');
    LED.accelToColor({ x: 0, y: 255, z: 0 });
});
// const board = new five.Board()
// board.on('ready', () => {
//   const led = new five.Led.RGB({
//     pins: {
//       red: 6,
//       green: 5,
//       blue: 3
//     }
//   })
//   const ledpin = new five.Led(3)
//   ledpin.fadeIn()
//   // this.repl.inject({
//   //   led: led
//   // })
//   led.color({
//     red: 0,
//     green: 10,
//     blue: 255
//   })
//   led.on()
//   let index = 0
//   const rainbow = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8F00FF"]
//   board.loop(500, function() {
//     led.color(rainbow[index++])
//     console.log(led.color())
//     if (index === rainbow.length) {
//       index = 0
//     }
//   })
// })


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__server__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__led__ = __webpack_require__(0);




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__led__ = __webpack_require__(0);


const io = __WEBPACK_IMPORTED_MODULE_0_socket_io___default()(8080);
io
    .on('connect', (event) => {
    console.log('connect');
})
    .on('connection', (socket) => {
    console.log('connect!');
    socket.on('onAccel', (data) => {
        __WEBPACK_IMPORTED_MODULE_1__led__["a" /* default */].accelToColor(data);
    });
});


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("johnny-five");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map