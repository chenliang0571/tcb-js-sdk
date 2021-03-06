"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var cache_1 = require("./cache");
var events_1 = require("./events");
var util_1 = require("./util");
var adapters_1 = require("../adapters");
var base_1 = require("../auth/base");
var actionsWithoutAccessToken = [
    'auth.getJwt',
    'auth.logout',
    'auth.signInWithTicket',
    'auth.signInAnonymously'
];
var commonHeader = {
    'X-SDK-Version': types_1.SDK_VERISON
};
function bindHooks(instance, name, hooks) {
    var originMethod = instance[name];
    instance[name] = function (options) {
        var data = {};
        var headers = {};
        hooks.forEach(function (hook) {
            var _a = hook.call(instance, options), appendedData = _a.data, appendedHeaders = _a.headers;
            Object.assign(data, appendedData);
            Object.assign(headers, appendedHeaders);
        });
        var originData = options.data;
        originData && (function () {
            if (util_1.isFormData(originData)) {
                for (var key in data) {
                    originData.append(key, data[key]);
                }
                return;
            }
            options.data = __assign(__assign({}, originData), data);
        })();
        options.headers = __assign(__assign({}, (options.headers || {})), headers);
        return originMethod.call(instance, options);
    };
}
function beforeEach() {
    var seqId = util_1.genSeqId();
    return {
        data: {
            seqId: seqId
        },
        headers: __assign(__assign({}, commonHeader), { 'x-seqid': seqId })
    };
}
var Request = (function () {
    function Request(config) {
        if (config === void 0) { config = {}; }
        this.config = config;
        this.cache = new cache_1.Cache(config.persistence);
        this.accessTokenKey = types_1.ACCESS_TOKEN + "_" + config.env;
        this.accessTokenExpireKey = types_1.ACCESS_TOKEN_Expire + "_" + config.env;
        this.refreshTokenKey = types_1.REFRESH_TOKEN + "_" + config.env;
        this.anonymousUuidKey = types_1.ANONYMOUS_UUID + "_" + config.env;
        this.loginTypeKey = types_1.LOGIN_TYPE_KEY + "_" + config.env;
        this._reqClass = new adapters_1.Adapter.adapter.reqClass();
        bindHooks(this._reqClass, 'post', [beforeEach]);
        bindHooks(this._reqClass, 'upload', [beforeEach]);
        bindHooks(this._reqClass, 'download', [beforeEach]);
    }
    Request.prototype.post = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.post(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    Request.prototype.upload = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.upload(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    Request.prototype.download = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.download(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    Request.prototype.refreshAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, err, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._refreshAccessTokenPromise) {
                            this._refreshAccessTokenPromise = this._refreshAccessToken();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this._refreshAccessTokenPromise];
                    case 2:
                        result = _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        err = e_1;
                        return [3, 4];
                    case 4:
                        this._refreshAccessTokenPromise = null;
                        this._shouldRefreshAccessTokenHook = null;
                        if (err) {
                            throw err;
                        }
                        return [2, result];
                }
            });
        });
    };
    Request.prototype._refreshAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, params, isAnonymous, response, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cache.removeStore(this.accessTokenKey);
                        this.cache.removeStore(this.accessTokenExpireKey);
                        refreshToken = this.cache.getStore(this.refreshTokenKey);
                        if (!refreshToken) {
                            throw new Error('[tcb-js-sdk] 未登录CloudBase');
                        }
                        params = {
                            refresh_token: refreshToken,
                        };
                        isAnonymous = this.cache.getStore(this.loginTypeKey) === base_1.LOGINTYPE.ANONYMOUS;
                        if (isAnonymous) {
                            params.anonymous_uuid = this.cache.getStore(this.anonymousUuidKey);
                        }
                        return [4, this.request('auth.getJwt', params)];
                    case 1:
                        response = _a.sent();
                        if (response.data.code) {
                            code = response.data.code;
                            if (code === 'SIGN_PARAM_INVALID' || code === 'REFRESH_TOKEN_EXPIRED' || code === 'INVALID_REFRESH_TOKEN') {
                                events_1.activateEvent(events_1.EVENTS.LOGIN_STATE_EXPIRE);
                                this.cache.removeStore(this.refreshTokenKey);
                            }
                            throw new Error("[tcb-js-sdk] \u5237\u65B0access token\u5931\u8D25\uFF1A" + response.data.code);
                        }
                        if (response.data.access_token) {
                            events_1.activateEvent(events_1.EVENTS.REFRESH_ACCESS_TOKEN);
                            this.cache.setStore(this.accessTokenKey, response.data.access_token);
                            this.cache.setStore(this.accessTokenExpireKey, response.data.access_token_expire + Date.now());
                            events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGE, response.data.login_type);
                            return [2, {
                                    accessToken: response.data.access_token,
                                    accessTokenExpire: response.data.access_token_expire
                                }];
                        }
                        if (response.data.refresh_token) {
                            this.cache.removeStore(this.refreshTokenKey);
                            this.cache.setStore(this.refreshTokenKey, response.data.refresh_token);
                            this._refreshAccessToken();
                        }
                        return [2];
                }
            });
        });
    };
    Request.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, accessTokenExpire, shouldRefreshAccessToken, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accessToken = this.cache.getStore(this.accessTokenKey);
                        accessTokenExpire = this.cache.getStore(this.accessTokenExpireKey);
                        shouldRefreshAccessToken = true;
                        _a = this._shouldRefreshAccessTokenHook;
                        if (!_a) return [3, 2];
                        return [4, this._shouldRefreshAccessTokenHook(accessToken, accessTokenExpire)];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            shouldRefreshAccessToken = false;
                        }
                        if ((!accessToken || !accessTokenExpire || accessTokenExpire < Date.now()) && shouldRefreshAccessToken) {
                            return [2, this.refreshAccessToken()];
                        }
                        else {
                            return [2, {
                                    accessToken: accessToken,
                                    accessTokenExpire: accessTokenExpire
                                }];
                        }
                        return [2];
                }
            });
        });
    };
    Request.prototype.request = function (action, params, options) {
        return __awaiter(this, void 0, void 0, function () {
            var contentType, tmpObj, _a, payload, key, opts, parse, query, search, formatQuery, newUrl, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contentType = 'application/x-www-form-urlencoded';
                        tmpObj = __assign({ action: action, env: this.config.env, dataVersion: '2019-08-16' }, params);
                        if (!(actionsWithoutAccessToken.indexOf(action) === -1)) return [3, 2];
                        _a = tmpObj;
                        return [4, this.getAccessToken()];
                    case 1:
                        _a.access_token = (_b.sent()).accessToken;
                        _b.label = 2;
                    case 2:
                        if (action === 'storage.uploadFile') {
                            payload = new FormData();
                            for (key in payload) {
                                if (payload.hasOwnProperty(key) && payload[key] !== undefined) {
                                    payload.append(key, tmpObj[key]);
                                }
                            }
                            contentType = 'multipart/form-data';
                        }
                        else {
                            contentType = 'application/json;charset=UTF-8';
                            payload = tmpObj;
                        }
                        opts = {
                            headers: {
                                'content-type': contentType
                            }
                        };
                        if (options && options['onUploadProgress']) {
                            opts.onUploadProgress = options['onUploadProgress'];
                        }
                        parse = params.parse, query = params.query, search = params.search;
                        formatQuery = {
                            env: this.config.env
                        };
                        parse && (formatQuery.parse = true);
                        query && (formatQuery = __assign(__assign({}, query), formatQuery));
                        newUrl = util_1.formatUrl(types_1.protocol, types_1.BASE_URL, formatQuery);
                        if (search) {
                            newUrl += search;
                        }
                        return [4, this.post(__assign({ url: newUrl, data: payload }, opts))];
                    case 3:
                        res = _b.sent();
                        if ((Number(res.status) !== 200 && Number(res.statusCode) !== 200) || !res.data) {
                            throw new Error('network request error');
                        }
                        return [2, res];
                }
            });
        });
    };
    Request.prototype.send = function (action, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var slowQueryWarning, response, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        slowQueryWarning = setTimeout(function () {
                            console.warn('Database operation is longer than 3s. Please check query performance and your network environment.');
                        }, 3000);
                        return [4, this.request(action, data, { onUploadProgress: data.onUploadProgress })];
                    case 1:
                        response = _a.sent();
                        clearTimeout(slowQueryWarning);
                        if (!(response.data.code === 'ACCESS_TOKEN_EXPIRED' && actionsWithoutAccessToken.indexOf(action) === -1)) return [3, 4];
                        return [4, this.refreshAccessToken()];
                    case 2:
                        _a.sent();
                        return [4, this.request(action, data, { onUploadProgress: data.onUploadProgress })];
                    case 3:
                        response_1 = _a.sent();
                        if (response_1.data.code) {
                            throw new Error("[" + response_1.data.code + "] " + response_1.data.message);
                        }
                        return [2, response_1.data];
                    case 4:
                        if (response.data.code) {
                            throw new Error("[" + response.data.code + "] " + response.data.message);
                        }
                        return [2, response.data];
                }
            });
        });
    };
    return Request;
}());
exports.Request = Request;
