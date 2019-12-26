"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importStar(require("./base"));
var events_1 = require("../lib/events");
var types_1 = require("../types");
var AnonymousAuthProvider = (function (_super) {
    __extends(AnonymousAuthProvider, _super);
    function AnonymousAuthProvider(config) {
        var _this = _super.call(this, __assign(__assign({}, config), { persistence: 'local' })) || this;
        _this._anonymousUuidKey = types_1.ANONYMOUS_UUID + "_" + _this.config.env;
        _this._loginTypeKey = types_1.LOGIN_TYPE_KEY + "_" + _this.config.env;
        return _this;
    }
    AnonymousAuthProvider.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    AnonymousAuthProvider.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var anonymous_uuid, refresh_token, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        anonymous_uuid = this.cache.getStore(this._anonymousUuidKey) || undefined;
                        refresh_token = this.cache.getStore(this.refreshTokenKey) || undefined;
                        return [4, this.httpRequest.send('auth.signInAnonymously', {
                                anonymous_uuid: anonymous_uuid,
                                refresh_token: refresh_token
                            })];
                    case 1:
                        res = _a.sent();
                        if (!(res.uuid && res.refresh_token)) return [3, 3];
                        this._setAnonymousUUID(res.uuid);
                        this.setRefreshToken(res.refresh_token);
                        return [4, this.httpRequest.refreshAccessToken()];
                    case 2:
                        _a.sent();
                        events_1.activateEvent(events_1.EVENTS.LOGIN_STATE_CHANGED);
                        events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGE, base_1.LOGINTYPE.ANONYMOUS);
                        return [2, {
                                credential: {
                                    refreshToken: res.refresh_token
                                }
                            }];
                    case 3: throw new Error('[tcb-js-sdk] 匿名登录失败');
                }
            });
        });
    };
    AnonymousAuthProvider.prototype.linkAndRetrieveDataWithTicket = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var uuid, refresh_token, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uuid = this.cache.getStore(this._anonymousUuidKey);
                        refresh_token = this.cache.getStore(this.refreshTokenKey);
                        return [4, this.httpRequest.send('auth.linkAndRetrieveDataWithTicket', {
                                anonymous_uuid: uuid,
                                refresh_token: refresh_token,
                                ticket: ticket
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res.refresh_token) return [3, 3];
                        this._clearAnonymousUUID();
                        this.setRefreshToken(res.refresh_token);
                        return [4, this.httpRequest.refreshAccessToken()];
                    case 2:
                        _a.sent();
                        events_1.activateEvent(events_1.EVENTS.ANONYMOUS_CONVERTED, { refresh_token: res.refresh_token });
                        events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGE, base_1.LOGINTYPE.CUSTOM);
                        return [2, {
                                credential: {
                                    refreshToken: res.refresh_token
                                }
                            }];
                    case 3: throw new Error('[tcb-js-sdk] 匿名转化失败');
                }
            });
        });
    };
    AnonymousAuthProvider.prototype._setAnonymousUUID = function (id) {
        this.cache.removeStore(this._anonymousUuidKey);
        this.cache.setStore(this._anonymousUuidKey, id);
        this.cache.setStore(this._loginTypeKey, base_1.LOGINTYPE.ANONYMOUS);
    };
    AnonymousAuthProvider.prototype._clearAnonymousUUID = function () {
        this.cache.removeStore(this._anonymousUuidKey);
    };
    return AnonymousAuthProvider;
}(base_1.default));
exports.AnonymousAuthProvider = AnonymousAuthProvider;
