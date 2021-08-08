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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const auth_router_1 = __importDefault(require("./api/auth/auth.router"));
const app_config_1 = __importDefault(require("./config/app.config"));
const app = express_1.default();
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(morgan_1.default('common'));
    app.use(cors_1.default());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    // routes
    app.use('/auth', auth_router_1.default);
    // run server
    app.listen(app_config_1.default.port, app_config_1.default.host, () => {
        console.log(`App run on port: ${app_config_1.default.port} and host: ${app_config_1.default.host}`);
    });
});
bootstrap().catch(error => console.log(error));
//# sourceMappingURL=app.js.map