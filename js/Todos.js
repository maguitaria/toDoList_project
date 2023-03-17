var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Todos_instances, _Todos_backend_url, _Todos_readJson;
import { Task } from "./Task.js";
class Todos {
    constructor(url) {
        _Todos_instances.add(this);
        this.task = [];
        _Todos_backend_url.set(this, '');
        // async function to store items in an array
        this.getTasks = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fetch(__classPrivateFieldGet(this, _Todos_backend_url, "f"))
                    .then(response => response.json())
                    .then((response) => {
                    __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_readJson).call(this, response);
                    resolve(this.tasks);
                }, (error) => {
                    reject(error);
                });
            });
        });
        __classPrivateFieldSet(this, _Todos_backend_url, url, "f");
    }
}
_Todos_backend_url = new WeakMap(), _Todos_instances = new WeakSet(), _Todos_readJson = function _Todos_readJson(taskAsJson) {
    taskAsJson.forEach(node => {
        const task = new Task(node.id, node.description);
        this.tasks.push(task);
    });
};
export { Todos };
