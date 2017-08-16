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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_johnny_five__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_johnny_five___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_johnny_five__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_raf__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_raf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_raf__);


class LED {
    static init() {
        return new Promise((resolve, reject) => {
            LED.board.on('ready', () => {
                LED.boardReady();
                resolve();
            });
        });
    }
    static accelToRGB(accel = { x: 0, y: 0, z: 0 }) {
        LED.R += Math.abs((accel.x) / 5);
        LED.G += Math.abs((accel.y) / 5);
        LED.B += Math.abs((accel.z) / 5);
        if (LED.R > 255) {
            LED.R = 255;
        }
        if (LED.G > 255) {
            LED.G = 255;
        }
        if (LED.B > 255) {
            LED.B = 255;
        }
        const r = `00${Math.floor(LED.R).toString(16)}`.slice(-2);
        const g = `00${Math.floor(LED.G).toString(16)}`.slice(-2);
        const b = `00${Math.floor(LED.B).toString(16)}`.slice(-2);
        return `#${r}${g}${b}`;
    }
    static boardReady() {
        LED.rgb = new __WEBPACK_IMPORTED_MODULE_0_johnny_five___default.a.Led.RGB({
            pins: [6, 3, 5]
        });
        LED.decleaseRGB();
        LED.board.loop(50, () => {
            LED.rgb.color(LED.accelToRGB());
        });
    }
    static decleaseRGB() {
        LED.R -= 1;
        LED.G -= 1;
        LED.B -= 1;
        if (LED.R < 0) {
            LED.R = 0;
        }
        if (LED.G < 0) {
            LED.G = 0;
        }
        if (LED.B < 0) {
            LED.B = 0;
        }
        console.log(LED.R, LED.G, LED.B);
        __WEBPACK_IMPORTED_MODULE_1_raf___default()(LED.decleaseRGB);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LED;

LED.R = 0;
LED.G = 0;
LED.B = 0;
LED.board = new __WEBPACK_IMPORTED_MODULE_0_johnny_five___default.a.Board();


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__led__ = __webpack_require__(0);


__WEBPACK_IMPORTED_MODULE_1__led__["a" /* default */].init().then(() => {
    listenStart();
});
function listenStart() {
    const io = __WEBPACK_IMPORTED_MODULE_0_socket_io___default()(8080);
    io
        .on('connect', (event) => {
        console.log('connect');
    })
        .on('connection', (socket) => {
        socket.on('onAccel', (data) => {
            // console.log(data)
            if (typeof data.x !== 'number' || typeof data.y !== 'number' || typeof data.x !== 'number') {
                return;
            }
            __WEBPACK_IMPORTED_MODULE_1__led__["a" /* default */].accelToRGB(data);
        });
    });
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("johnny-five");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("raf");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map