"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing MongoClient from the mongodb package to interact with MongoDB.
var mongodb_1 = require("mongodb");
// Defining the URI for the MongoDB instance running locally on port 27017.
var uri = 'mongodb://localhost:27017';
// Creating a new MongoClient instance with the defined URI.
var client = new mongodb_1.MongoClient(uri);
// Function to connect to the MongoDB server.
function connectToMongo() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // Attempting to connect to the MongoDB server.
                    return [4 /*yield*/, client.connect()];
                case 1:
                    // Attempting to connect to the MongoDB server.
                    _a.sent();
                    console.log('Connected to MongoDB'); // Logging successful connection.
                    // Returning the default database named 'twiniris'.
                    return [2 /*return*/, client.db('twiniris')];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error connecting to MongoDB:', error_1); // Logging connection errors.
                    throw error_1; // Re-throwing the caught error to handle it further up the call stack.
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Function to find a soil type within a given geographical area.
function findSoilType(db, point) {
    return __awaiter(this, void 0, void 0, function () {
        var soilTypes, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    soilTypes = db.collection('soiltypes');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, soilTypes.findOne({
                            geometry: {
                                $geoIntersects: {
                                    $geometry: {
                                        type: 'Point', // Specifying the type of geometry.
                                        coordinates: point // Using the provided coordinates for the query.
                                    }
                                }
                            }
                        })];
                case 2:
                    result = _a.sent();
                    // Returning the soil type property if found, otherwise returning a message indicating not found.
                    return [2 /*return*/, result ? result.properties.soilType : 'Soil type not found for the given coordinates.'];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error finding soil type:', error_2); // Logging errors during the query.
                    throw error_2; // Re-throwing the caught error to handle it further up the call stack.
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Main asynchronous function that orchestrates the process.
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var db, pointCoordinates, soilType, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, connectToMongo()];
                case 1:
                    db = _a.sent();
                    pointCoordinates = [-122.49, 45.58];
                    return [4 /*yield*/, findSoilType(db, pointCoordinates)];
                case 2:
                    soilType = _a.sent();
                    console.log('Soil type:', soilType); // Logging the found soil type.
                    return [3 /*break*/, 6];
                case 3:
                    error_3 = _a.sent();
                    console.error('An error occurred:', error_3); // Logging any errors that occur during execution.
                    return [3 /*break*/, 6];
                case 4: 
                // Ensuring the MongoDB connection is closed after the operation.
                return [4 /*yield*/, client.close()];
                case 5:
                    // Ensuring the MongoDB connection is closed after the operation.
                    _a.sent();
                    console.log('MongoDB connection closed'); // Logging the closure of the connection.
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Calling the main function to execute the program.
main();
