"use client";
import { r as __toESM, t as require_react } from "./react-C4Nfo9RE.js";
import { d as debug, f as error, i as debounceController, n as createEmitter, o as globalThrottleQueue, p as renderQueryString, t as compareQuery, u as createAdapterProvider } from "./compare-Br3z3FUS-Cgvti3tZ.js";
import { gn as useSearchParams, nn as useNavigate } from "./development-BiGSy6zv.js";
//#region node_modules/.pnpm/nuqs@2.8.9_react-router@7.14.0_react-dom@19.2.5_react@19.2.5__react@19.2.5__react@19.2.5/node_modules/nuqs/dist/key-isolation-Y_bk4Yva.js
function applyChange(newValue, keys, copy) {
	return (oldValue) => {
		if (!(keys.length === 0 ? true : keys.some((key) => !compareQuery(oldValue.getAll(key), newValue.getAll(key))))) {
			debug("[nuqs `%s`] no change, returning previous", keys.join(","), oldValue);
			return oldValue;
		}
		const filtered = filterSearchParams(newValue, keys, copy);
		debug(`[nuqs \`%s\`] subbed search params change
  from %O
  to   %O`, keys.join(","), oldValue, filtered);
		return filtered;
	};
}
function filterSearchParams(search, keys, copy) {
	if (keys.length === 0) return search;
	const filtered = copy ? new URLSearchParams(search) : search;
	for (const key of search.keys()) if (!keys.includes(key)) filtered.delete(key);
	return filtered;
}
//#endregion
//#region node_modules/.pnpm/nuqs@2.8.9_react-router@7.14.0_react-dom@19.2.5_react@19.2.5__react@19.2.5__react@19.2.5/node_modules/nuqs/dist/reset-p1J0pPAX.js
var mutex = 0;
function setQueueResetMutex(value = 1) {
	mutex = value;
}
function spinQueueResetMutex(onReset = resetQueues) {
	mutex = Math.max(0, mutex - 1);
	if (mutex > 0) return;
	onReset();
}
function resetQueues() {
	debug("[nuqs] Aborting queues");
	debounceController.abortAll();
	globalThrottleQueue.abort().forEach((key) => debounceController.queuedQuerySync.emit(key));
}
//#endregion
//#region node_modules/.pnpm/nuqs@2.8.9_react-router@7.14.0_react-dom@19.2.5_react@19.2.5__react@19.2.5__react@19.2.5/node_modules/nuqs/dist/patch-history-CLy38Aj7.js
var historyUpdateMarker = "__nuqs__";
function getSearchParams(url) {
	if (url instanceof URL) return url.searchParams;
	if (url.startsWith("?")) return new URLSearchParams(url);
	try {
		return new URL(url, location.origin).searchParams;
	} catch {
		return new URLSearchParams(url);
	}
}
function shouldPatchHistory(adapter) {
	if (typeof history === "undefined") return false;
	if (history.nuqs?.version && history.nuqs.version !== "2.8.9") {
		console.error(error(409), history.nuqs.version, `2.8.9`, adapter);
		return false;
	}
	if (history.nuqs?.adapters?.includes(adapter)) return false;
	return true;
}
function markHistoryAsPatched(adapter) {
	history.nuqs = history.nuqs ?? {
		version: "2.8.9",
		adapters: []
	};
	history.nuqs.adapters.push(adapter);
}
function patchHistory(emitter, adapter) {
	if (!shouldPatchHistory(adapter)) return;
	let lastSearchSeen = typeof location === "object" ? location.search : "";
	emitter.on("update", (search) => {
		const searchString = search.toString();
		lastSearchSeen = searchString.length ? "?" + searchString : "";
	});
	window.addEventListener("popstate", () => {
		lastSearchSeen = location.search;
		resetQueues();
	});
	debug("[nuqs %s] Patching history (%s adapter)", "2.8.9", adapter);
	function sync(url) {
		spinQueueResetMutex();
		try {
			if (new URL(url, location.origin).search === lastSearchSeen) return;
		} catch {}
		try {
			emitter.emit("update", getSearchParams(url));
		} catch (e) {
			console.error(e);
		}
	}
	const originalPushState = history.pushState;
	const originalReplaceState = history.replaceState;
	history.pushState = function nuqs_pushState(state, marker, url) {
		originalPushState.call(history, state, "", url);
		if (url && marker !== "__nuqs__") sync(url);
	};
	history.replaceState = function nuqs_replaceState(state, marker, url) {
		originalReplaceState.call(history, state, "", url);
		if (url && marker !== "__nuqs__") sync(url);
	};
	markHistoryAsPatched(adapter);
}
//#endregion
//#region node_modules/.pnpm/nuqs@2.8.9_react-router@7.14.0_react-dom@19.2.5_react@19.2.5__react@19.2.5__react@19.2.5/node_modules/nuqs/dist/react-router-Ed4tAlvc.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function createReactRouterBasedAdapter({ adapter, useNavigate, useSearchParams }) {
	const emitter = createEmitter();
	function useNuqsReactRouterBasedAdapter(watchKeys) {
		const navigate = useNavigate();
		return {
			searchParams: useOptimisticSearchParams(watchKeys),
			updateUrl: (0, import_react.useCallback)((search, options) => {
				(0, import_react.startTransition)(() => {
					emitter.emit("update", search);
				});
				const url = new URL(location.href);
				url.search = renderQueryString(search);
				debug(`[nuqs ${adapter}] Updating url: %s`, url);
				const updateMethod = options.history === "push" ? history.pushState : history.replaceState;
				setQueueResetMutex(options.shallow ? 1 : 2);
				updateMethod.call(history, history.state, historyUpdateMarker, url);
				if (options.shallow === false) navigate({
					hash: url.hash,
					search: url.search
				}, {
					replace: true,
					preventScrollReset: true,
					state: history.state?.usr
				});
				if (options.scroll) window.scrollTo(0, 0);
			}, [navigate]),
			autoResetQueueOnUpdate: false
		};
	}
	function useOptimisticSearchParams(watchKeys = []) {
		const [serverSearchParams] = useSearchParams(typeof location === "undefined" ? new URLSearchParams() : new URLSearchParams(location.search));
		const [searchParams, setSearchParams] = (0, import_react.useState)(() => {
			return typeof location === "undefined" ? filterSearchParams(serverSearchParams, watchKeys, true) : filterSearchParams(new URLSearchParams(location.search), watchKeys, false);
		});
		(0, import_react.useEffect)(() => {
			function onPopState() {
				(0, import_react.startTransition)(() => {
					setSearchParams(applyChange(new URLSearchParams(location.search), watchKeys, false));
				});
			}
			function onEmitterUpdate(search) {
				(0, import_react.startTransition)(() => {
					setSearchParams(applyChange(search, watchKeys, true));
				});
			}
			emitter.on("update", onEmitterUpdate);
			window.addEventListener("popstate", onPopState);
			return () => {
				emitter.off("update", onEmitterUpdate);
				window.removeEventListener("popstate", onPopState);
			};
		}, [watchKeys.join("&")]);
		return searchParams;
	}
	/**
	* Sync shallow updates of the URL with the useOptimisticSearchParams hook.
	*
	* By default, the useOptimisticSearchParams hook will only react to internal nuqs updates.
	* If third party code updates the History API directly, use this function to
	* enable useOptimisticSearchParams to react to those changes.
	*
	* Note: this is actually required in React Router frameworks to follow Link navigations.
	*/
	patchHistory(emitter, adapter);
	return {
		NuqsAdapter: createAdapterProvider(useNuqsReactRouterBasedAdapter),
		useOptimisticSearchParams
	};
}
//#endregion
//#region node_modules/.pnpm/nuqs@2.8.9_react-router@7.14.0_react-dom@19.2.5_react@19.2.5__react@19.2.5__react@19.2.5/node_modules/nuqs/dist/adapters/react-router/v7.js
var adapter = createReactRouterBasedAdapter({
	adapter: "react-router-v7",
	useNavigate,
	useSearchParams
});
var NuqsAdapter = adapter.NuqsAdapter;
var useOptimisticSearchParams = adapter.useOptimisticSearchParams;
//#endregion
export { NuqsAdapter, useOptimisticSearchParams };

//# sourceMappingURL=nuqs_adapters_react-router_v7.js.map