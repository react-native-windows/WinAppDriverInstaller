"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var taskLib = __importStar(require("azure-pipelines-task-lib/task"));
var toolLib = __importStar(require("azure-pipelines-tool-lib/tool"));
var util = __importStar(require("util"));
var exec = util.promisify(require('child_process').exec);
function execCommand(command) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, stdout, stderr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('command: ' + command);
                    return [4 /*yield*/, exec(command)];
                case 1:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    if (stdout) {
                        console.log('stdout: ' + stdout);
                    }
                    if (stderr) {
                        console.log('stderr: ' + stderr);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var version, downloadUrl, msiPath, uninstallCommand, installCommand, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    version = taskLib.getInput('WinAppDriverVersion', false);
                    if (!version) {
                        version = 'v1.1';
                    }
                    downloadUrl = "https://github.com/microsoft/WinAppDriver/releases/download/" + version + "/WindowsApplicationDriver.msi";
                    console.log('Download WinAppDriver from ' + downloadUrl);
                    return [4 /*yield*/, toolLib.downloadTool(downloadUrl)];
                case 1:
                    msiPath = _a.sent();
                    console.log('Downloaded File: ' + msiPath);
                    uninstallCommand = 'msiexec /uninstall {C4903086-429C-4455-86DD-044914BBA07B} /qn';
                    return [4 /*yield*/, execCommand(uninstallCommand).catch(function () { })];
                case 2:
                    _a.sent();
                    installCommand = "msiexec /i " + msiPath + " /qn";
                    return [4 /*yield*/, execCommand(installCommand)];
                case 3:
                    _a.sent();
                    taskLib.setResult(taskLib.TaskResult.Succeeded, 'Install Complete');
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    taskLib.warning(err_1);
                    taskLib.setResult(taskLib.TaskResult.Failed, err_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
run();
