import { r as __toESM, t as require_react } from "./react-C4Nfo9RE.js";
//#region node_modules/.pnpm/nuqs@2.8.9_react-router@7.14.0_react-dom@19.2.5_react@19.2.5__react@19.2.5__react@19.2.5/node_modules/nuqs/dist/context-C4spomkL.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var debugEnabled = isDebugEnabled();
function debug(message, ...args) {
	if (!debugEnabled) return;
	const msg = sprintf(message, ...args);
	performance.mark(msg);
	try {
		console.log(message, ...args);
	} catch {
		console.log(msg);
	}
}
function warn(message, ...args) {
	if (!debugEnabled) return;
	console.warn(message, ...args);
}
function sprintf(base, ...args) {
	return base.replace(/%[sfdO]/g, (match) => {
		const arg = args.shift();
		return match === "%O" && arg ? JSON.stringify(arg).replace(/"([^"]+)":/g, "$1:") : String(arg);
	});
}
function isDebugEnabled() {
	if (typeof window === "undefined") return (process.env.DEBUG || "").includes("nuqs");
	try {
		const test = "nuqs-localStorage-test";
		if (typeof localStorage === "undefined") return false;
		localStorage.setItem(test, test);
		const isStorageAvailable = localStorage.getItem(test) === test;
		localStorage.removeItem(test);
		return isStorageAvailable && (localStorage.getItem("debug") || "").includes("nuqs");
	} catch {
		return false;
	}
}
var errors = {
	303: "Multiple adapter contexts detected. This might happen in monorepos.",
	404: "nuqs requires an adapter to work with your framework.",
	409: "Multiple versions of the library are loaded. This may lead to unexpected behavior. Currently using `%s`, but `%s` (via the %s adapter) was about to load on top.",
	414: "Max safe URL length exceeded. Some browsers may not be able to accept this URL. Consider limiting the amount of state stored in the URL.",
	422: "Invalid options combination: `limitUrlUpdates: debounce` should be used in SSR scenarios, with `shallow: false`",
	429: "URL update rate-limited by the browser. Consider increasing `throttleMs` for key(s) `%s`. %O",
	500: "Empty search params cache. Search params can't be accessed in Layouts.",
	501: "Search params cache already populated. Have you called `parse` twice?"
};
function error(code) {
	return `[nuqs] ${errors[code]}
  See https://nuqs.dev/NUQS-${code}`;
}
function renderQueryString(search) {
	if (search.size === 0) return "";
	const query = [];
	for (const [key, value] of search.entries()) {
		const safeKey = key.replace(/#/g, "%23").replace(/&/g, "%26").replace(/\+/g, "%2B").replace(/=/g, "%3D").replace(/\?/g, "%3F");
		query.push(`${safeKey}=${encodeQueryValue(value)}`);
	}
	const queryString = "?" + query.join("&");
	warnIfURLIsTooLong(queryString);
	return queryString;
}
function encodeQueryValue(input) {
	return input.replace(/%/g, "%25").replace(/\+/g, "%2B").replace(/ /g, "+").replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "%22").replace(/'/g, "%27").replace(/`/g, "%60").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/[\x00-\x1F]/g, (char) => encodeURIComponent(char));
}
var URL_MAX_LENGTH = 2e3;
function warnIfURLIsTooLong(queryString) {
	if (typeof location === "undefined") return;
	const url = new URL(location.href);
	url.search = queryString;
	if (url.href.length > URL_MAX_LENGTH) console.warn(error(414));
}
var context = (0, import_react.createContext)({ useAdapter() {
	throw new Error(error(404));
} });
context.displayName = "NuqsAdapterContext";
if (debugEnabled && typeof window !== "undefined") {
	if (window.__NuqsAdapterContext && window.__NuqsAdapterContext !== context) console.error(error(303));
	window.__NuqsAdapterContext = context;
}
/**
* Create a custom adapter (context provider) for nuqs to work with your framework / router.
*
* Adapters are based on React Context,
*
* @param useAdapter
* @returns
*/
function createAdapterProvider(useAdapter) {
	return ({ children, defaultOptions, processUrlSearchParams, ...props }) => (0, import_react.createElement)(context.Provider, {
		...props,
		value: {
			useAdapter,
			defaultOptions,
			processUrlSearchParams
		}
	}, children);
}
function useAdapter(watchKeys) {
	const value = (0, import_react.useContext)(context);
	if (!("useAdapter" in value)) throw new Error(error(404));
	return value.useAdapter(watchKeys);
}
var useAdapterDefaultOptions = () => (0, import_react.useContext)(context).defaultOptions;
var useAdapterProcessUrlSearchParams = () => (0, import_react.useContext)(context).processUrlSearchParams;
//#endregion
//#region node_modules/.pnpm/nuqs@2.8.9_react-router@7.14.0_react-dom@19.2.5_react@19.2.5__react@19.2.5__react@19.2.5/node_modules/nuqs/dist/debounce-PSGthE_7.js
function getDefaultThrottle() {
	if (typeof window === "undefined") return 50;
	if (!Boolean(window.GestureEvent)) return 50;
	try {
		const match = navigator.userAgent?.match(/version\/([\d\.]+) safari/i);
		return parseFloat(match[1]) >= 17 ? 120 : 320;
	} catch {
		return 320;
	}
}
function throttle(timeMs) {
	return {
		method: "throttle",
		timeMs
	};
}
function debounce(timeMs) {
	return {
		method: "debounce",
		timeMs
	};
}
var defaultRateLimit = throttle(getDefaultThrottle());
function isAbsentFromUrl(query) {
	return query === null || Array.isArray(query) && query.length === 0;
}
function write(serialized, key, searchParams) {
	if (typeof serialized === "string") searchParams.set(key, serialized);
	else {
		searchParams.delete(key);
		for (const v of serialized) searchParams.append(key, v);
		if (!searchParams.has(key)) searchParams.set(key, "");
	}
	return searchParams;
}
function createEmitter() {
	const all = /* @__PURE__ */ new Map();
	return {
		on(type, handler) {
			const handlers = all.get(type) || [];
			handlers.push(handler);
			all.set(type, handlers);
			return () => this.off(type, handler);
		},
		off(type, handler) {
			const handlers = all.get(type);
			if (handlers) all.set(type, handlers.filter((h) => h !== handler));
		},
		emit(type, event) {
			all.get(type)?.forEach((handler) => handler(event));
		}
	};
}
function timeout(callback, ms, signal) {
	function onTick() {
		callback();
		signal.removeEventListener("abort", onAbort);
	}
	const id = setTimeout(onTick, ms);
	function onAbort() {
		clearTimeout(id);
		signal.removeEventListener("abort", onAbort);
	}
	signal.addEventListener("abort", onAbort);
}
function withResolvers() {
	const P = Promise;
	if (Promise.hasOwnProperty("withResolvers")) return Promise.withResolvers();
	let resolve = () => {};
	let reject = () => {};
	return {
		promise: new P((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}
function compose(fns, final) {
	let next = final;
	for (let i = fns.length - 1; i >= 0; i--) {
		const fn = fns[i];
		if (!fn) continue;
		const prev = next;
		next = () => fn(prev);
	}
	next();
}
function getSearchParamsSnapshotFromLocation() {
	return new URLSearchParams(location.search);
}
var ThrottledQueue = class {
	updateMap = /* @__PURE__ */ new Map();
	options = {
		history: "replace",
		scroll: false,
		shallow: true
	};
	timeMs = defaultRateLimit.timeMs;
	transitions = /* @__PURE__ */ new Set();
	resolvers = null;
	controller = null;
	lastFlushedAt = 0;
	resetQueueOnNextPush = false;
	push({ key, query, options }, timeMs = defaultRateLimit.timeMs) {
		if (this.resetQueueOnNextPush) {
			this.reset();
			this.resetQueueOnNextPush = false;
		}
		debug("[nuqs gtq] Enqueueing %s=%s %O", key, query, options);
		this.updateMap.set(key, query);
		if (options.history === "push") this.options.history = "push";
		if (options.scroll) this.options.scroll = true;
		if (options.shallow === false) this.options.shallow = false;
		if (options.startTransition) this.transitions.add(options.startTransition);
		if (!Number.isFinite(this.timeMs) || timeMs > this.timeMs) this.timeMs = timeMs;
	}
	getQueuedQuery(key) {
		return this.updateMap.get(key);
	}
	getPendingPromise({ getSearchParamsSnapshot = getSearchParamsSnapshotFromLocation }) {
		return this.resolvers?.promise ?? Promise.resolve(getSearchParamsSnapshot());
	}
	flush({ getSearchParamsSnapshot = getSearchParamsSnapshotFromLocation, rateLimitFactor = 1, ...adapter }, processUrlSearchParams) {
		this.controller ??= new AbortController();
		if (!Number.isFinite(this.timeMs)) {
			debug("[nuqs gtq] Skipping flush due to throttleMs=Infinity");
			return Promise.resolve(getSearchParamsSnapshot());
		}
		if (this.resolvers) return this.resolvers.promise;
		this.resolvers = withResolvers();
		const flushNow = () => {
			this.lastFlushedAt = performance.now();
			const [search, error] = this.applyPendingUpdates({
				...adapter,
				autoResetQueueOnUpdate: adapter.autoResetQueueOnUpdate ?? true,
				getSearchParamsSnapshot
			}, processUrlSearchParams);
			if (error === null) {
				this.resolvers.resolve(search);
				this.resetQueueOnNextPush = true;
			} else this.resolvers.reject(search);
			this.resolvers = null;
		};
		const runOnNextTick = () => {
			const timeSinceLastFlush = performance.now() - this.lastFlushedAt;
			const timeMs = this.timeMs;
			const flushInMs = rateLimitFactor * Math.max(0, timeMs - timeSinceLastFlush);
			debug(`[nuqs gtq] Scheduling flush in %f ms. Throttled at %f ms (x%f)`, flushInMs, timeMs, rateLimitFactor);
			if (flushInMs === 0) flushNow();
			else timeout(flushNow, flushInMs, this.controller.signal);
		};
		timeout(runOnNextTick, 0, this.controller.signal);
		return this.resolvers.promise;
	}
	abort() {
		this.controller?.abort();
		this.controller = new AbortController();
		this.resolvers?.resolve(new URLSearchParams());
		this.resolvers = null;
		return this.reset();
	}
	reset() {
		const queuedKeys = Array.from(this.updateMap.keys());
		debug("[nuqs gtq] Resetting queue %s", JSON.stringify(Object.fromEntries(this.updateMap)));
		this.updateMap.clear();
		this.transitions.clear();
		this.options = {
			history: "replace",
			scroll: false,
			shallow: true
		};
		this.timeMs = defaultRateLimit.timeMs;
		return queuedKeys;
	}
	applyPendingUpdates(adapter, processUrlSearchParams) {
		const { updateUrl, getSearchParamsSnapshot } = adapter;
		let search = getSearchParamsSnapshot();
		debug(`[nuqs gtq] Applying %d pending update(s) on top of %s`, this.updateMap.size, search.toString());
		if (this.updateMap.size === 0) return [search, null];
		const items = Array.from(this.updateMap.entries());
		const options = { ...this.options };
		const transitions = Array.from(this.transitions);
		if (adapter.autoResetQueueOnUpdate) this.reset();
		debug("[nuqs gtq] Flushing queue %O with options %O", items, options);
		for (const [key, value] of items) if (value === null) search.delete(key);
		else search = write(value, key, search);
		if (processUrlSearchParams) search = processUrlSearchParams(search);
		try {
			compose(transitions, () => {
				updateUrl(search, options);
			});
			return [search, null];
		} catch (err) {
			console.error(error(429), items.map(([key]) => key).join(), err);
			return [search, err];
		}
	}
};
var globalThrottleQueue = new ThrottledQueue();
/**
* Like `useSyncExternalStore`, but for subscribing to multiple keys.
*
* Each key becomes the key of the returned object,
* and the value is the result of calling `getKeySnapshot` with that key.
*
* @param keys - A list of keys to subscribe to.
* @param subscribeKey - A function that takes a key and a callback,
* subscribes to an external store using that key (calling the callback when
* state changes occur), and returns a function to unsubscribe from that key.
* @param getKeySnapshot - A function that takes a key and returns the snapshot for that key.
* It will be called on the server and on the client, so it needs to handle both
* environments.
*/
function useSyncExternalStores(keys, subscribeKey, getKeySnapshot) {
	const snapshot = (0, import_react.useCallback)(() => {
		const record = Object.fromEntries(keys.map((key) => [key, getKeySnapshot(key)]));
		return [JSON.stringify(record), record];
	}, [keys.join(","), getKeySnapshot]);
	const cacheRef = (0, import_react.useRef)(null);
	if (cacheRef.current === null) cacheRef.current = snapshot();
	return (0, import_react.useSyncExternalStore)((0, import_react.useCallback)((callback) => {
		const off = keys.map((key) => subscribeKey(key, callback));
		return () => off.forEach((unsubscribe) => unsubscribe());
	}, [keys.join(","), subscribeKey]), () => {
		const [cacheKey, record] = snapshot();
		if (cacheRef.current[0] === cacheKey) return cacheRef.current[1];
		cacheRef.current = [cacheKey, record];
		return record;
	}, () => cacheRef.current[1]);
}
var DebouncedPromiseQueue = class {
	callback;
	resolvers = withResolvers();
	controller = new AbortController();
	queuedValue = void 0;
	constructor(callback) {
		this.callback = callback;
	}
	abort() {
		this.controller.abort();
		this.queuedValue = void 0;
	}
	push(value, timeMs) {
		this.queuedValue = value;
		this.controller.abort();
		this.controller = new AbortController();
		timeout(() => {
			const outputResolvers = this.resolvers;
			try {
				debug("[nuqs dq] Flushing debounce queue", value);
				const callbackPromise = this.callback(value);
				debug("[nuqs dq] Reset debounce queue %O", this.queuedValue);
				this.queuedValue = void 0;
				this.resolvers = withResolvers();
				callbackPromise.then((output) => outputResolvers.resolve(output)).catch((error) => outputResolvers.reject(error));
			} catch (error) {
				this.queuedValue = void 0;
				outputResolvers.reject(error);
			}
		}, timeMs, this.controller.signal);
		return this.resolvers.promise;
	}
};
var DebounceController = class {
	throttleQueue;
	queues = /* @__PURE__ */ new Map();
	queuedQuerySync = createEmitter();
	constructor(throttleQueue = new ThrottledQueue()) {
		this.throttleQueue = throttleQueue;
	}
	useQueuedQueries(keys) {
		return useSyncExternalStores(keys, (key, callback) => this.queuedQuerySync.on(key, callback), (key) => this.getQueuedQuery(key));
	}
	push(update, timeMs, adapter, processUrlSearchParams) {
		if (!Number.isFinite(timeMs)) {
			const getSnapshot = adapter.getSearchParamsSnapshot ?? getSearchParamsSnapshotFromLocation;
			return Promise.resolve(getSnapshot());
		}
		const key = update.key;
		if (!this.queues.has(key)) {
			debug("[nuqs dqc] Creating debounce queue for `%s`", key);
			const queue = new DebouncedPromiseQueue((update) => {
				this.throttleQueue.push(update);
				return this.throttleQueue.flush(adapter, processUrlSearchParams).finally(() => {
					if (this.queues.get(update.key)?.queuedValue === void 0) {
						debug("[nuqs dqc] Cleaning up empty queue for `%s`", update.key);
						this.queues.delete(update.key);
					}
					this.queuedQuerySync.emit(update.key);
				});
			});
			this.queues.set(key, queue);
		}
		debug("[nuqs dqc] Enqueueing debounce update %O", update);
		const promise = this.queues.get(key).push(update, timeMs);
		this.queuedQuerySync.emit(key);
		return promise;
	}
	abort(key) {
		const queue = this.queues.get(key);
		if (!queue) return (passThrough) => passThrough;
		debug("[nuqs dqc] Aborting debounce queue %s=%s", key, queue.queuedValue?.query);
		this.queues.delete(key);
		queue.abort();
		this.queuedQuerySync.emit(key);
		return (promise) => {
			promise.then(queue.resolvers.resolve, queue.resolvers.reject);
			return promise;
		};
	}
	abortAll() {
		for (const [key, queue] of this.queues.entries()) {
			debug("[nuqs dqc] Aborting debounce queue %s=%s", key, queue.queuedValue?.query);
			queue.abort();
			queue.resolvers.resolve(new URLSearchParams());
			this.queuedQuerySync.emit(key);
		}
		this.queues.clear();
	}
	getQueuedQuery(key) {
		const debouncedQueued = this.queues.get(key)?.queuedValue?.query;
		if (debouncedQueued !== void 0) return debouncedQueued;
		return this.throttleQueue.getQueuedQuery(key);
	}
};
var debounceController = new DebounceController(globalThrottleQueue);
//#endregion
//#region node_modules/.pnpm/nuqs@2.8.9_react-router@7.14.0_react-dom@19.2.5_react@19.2.5__react@19.2.5__react@19.2.5/node_modules/nuqs/dist/compare-Br3z3FUS.js
function compareQuery(a, b) {
	if (a === b) return true;
	if (a === null || b === null) return false;
	if (typeof a === "string" || typeof b === "string") return false;
	if (a.length !== b.length) return false;
	return a.every((value, index) => value === b[index]);
}
//#endregion
export { warn as _, defaultRateLimit as a, throttle as c, debug as d, error as f, useAdapterProcessUrlSearchParams as g, useAdapterDefaultOptions as h, debounceController as i, write as l, useAdapter as m, createEmitter as n, globalThrottleQueue as o, renderQueryString as p, debounce as r, isAbsentFromUrl as s, compareQuery as t, createAdapterProvider as u };

//# sourceMappingURL=compare-Br3z3FUS-Cgvti3tZ.js.map