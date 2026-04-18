import { produce } from "./immer.js";
//#region node_modules/.pnpm/zustand@5.0.12_@types+react@19.2.14_immer@11.1.4_react@19.2.5/node_modules/zustand/esm/middleware/immer.mjs
var immerImpl = (initializer) => (set, get, store) => {
	store.setState = (updater, replace, ...args) => {
		return set(typeof updater === "function" ? produce(updater) : updater, replace, ...args);
	};
	return initializer(store.setState, get, store);
};
var immer = immerImpl;
//#endregion
export { immer };

//# sourceMappingURL=zustand_middleware_immer.js.map