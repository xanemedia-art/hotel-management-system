var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { l as Subscribable, s as shallowEqualObjects, m as hashKey, n as getDefaultState, o as notifyManager, p as useQueryClient, r as reactExports, q as noop, t as shouldThrowError, c as createLucideIcon, u as useHotelStore, B as BookingStatus, j as jsxRuntimeExports, a as cn, b as LogOut, X, G as GuestTag, g as ChevronLeft, U as Users, f as ue, P as PaymentMethod, e as Building2, k as RoomType, R as RoomStatus, i as BookingSource, v as ChargeCategory } from "./index-CBcYPlz6.js";
import { S as StatusBadge } from "./StatusBadge-C7ZHomM8.js";
import { B as Button } from "./button-Db-hK2sn.js";
import { A as AnimatePresence } from "./index-CDAIX88k.js";
import { m as motion } from "./proxy-DDZWRdmp.js";
import { S as Search } from "./search-u_kKtxgz.js";
import { B as BedDouble } from "./bed-double-DFIXwpvs.js";
import { S as Star } from "./star-0cWHhGe9.js";
import { C as CircleCheck } from "./circle-check-BtbRRnsg.js";
import { u as useRoomStatusPolling } from "./useRoomStatusPolling-8ahMps0G.js";
import { M as Mail } from "./mail-C_Rs8ezD.js";
import { C as CreditCard } from "./credit-card-DIOLeYAl.js";
import { C as Clock } from "./clock-CchWJkw1.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$9);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$8);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
];
const Flag = createLucideIcon("flag", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M13 2a9 9 0 0 1 9 9", key: "1itnx2" }],
  ["path", { d: "M13 6a5 5 0 0 1 5 5", key: "11nki7" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const PhoneCall = createLucideIcon("phone-call", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function useCheckIn() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (id) => {
      const booking = store.bookings.find((b) => b.id === id);
      if (booking)
        store.updateBooking({
          ...booking,
          status: BookingStatus.CheckedIn,
          actualCheckIn: BigInt(Date.now())
        });
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] })
  });
}
function useCheckOut() {
  const qc = useQueryClient();
  const store = useHotelStore();
  return useMutation({
    mutationFn: async (id) => {
      const booking = store.bookings.find((b) => b.id === id);
      if (booking)
        store.updateBooking({
          ...booking,
          status: BookingStatus.CheckedOut,
          actualCheckOut: BigInt(Date.now())
        });
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] })
  });
}
function formatDate$1(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function nightsBetween$1(checkIn, checkOut) {
  return Math.max(
    1,
    Math.round((Number(checkOut) - Number(checkIn)) / 864e5)
  );
}
function StepDots({ step }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-6", children: [1, 2, 3].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      animate: {
        width: step === s ? 24 : 8,
        backgroundColor: step === s ? "var(--primary)" : "var(--muted)"
      },
      transition: { duration: 0.2 },
      className: "h-2 rounded-full"
    },
    s
  )) });
}
function Step1Search({
  mode,
  results,
  query,
  onQueryChange,
  onSelect
}) {
  const inputRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -24 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -24 },
      transition: { duration: 0.22 },
      className: "flex-1 flex flex-col",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground font-display mb-1", children: mode === "checkin" ? "Guest Check-In" : "Guest Check-Out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: mode === "checkin" ? "Search for a confirmed booking to check in" : "Search for a checked-in guest to check out" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              type: "search",
              value: query,
              onChange: (e) => onQueryChange(e.target.value),
              placeholder: "Guest name or booking ID...",
              className: "w-full pl-12 pr-4 py-4 text-base bg-input border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
              "data-ocid": "mobile-checkin.search_input",
              style: { minHeight: 56 }
            }
          ),
          query && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onQueryChange(""),
              className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: query.trim() === "" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "flex flex-col items-center justify-center py-16 text-center",
            "data-ocid": "mobile-checkin.search.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-4", children: mode === "checkin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-7 h-7 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-7 h-7 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "Start typing to search" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter guest name or booking ID above" })
            ]
          },
          "hint"
        ) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "flex flex-col items-center justify-center py-16 text-center",
            "data-ocid": "mobile-checkin.no_results.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No bookings found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Try a different search term" })
            ]
          },
          "no-results"
        ) : results.map(({ booking, room, guest }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.04 },
            onClick: () => onSelect(booking.id),
            className: "w-full flex items-center gap-4 p-4 bg-card border border-border rounded-2xl text-left active:bg-muted/60 transition-colors",
            style: { minHeight: 72 },
            "data-ocid": `mobile-checkin.search_result.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground truncate", children: booking.guestName }),
                  (guest == null ? void 0 : guest.tags.includes(GuestTag.VIP)) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5" }),
                    "VIP"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Room ",
                    (room == null ? void 0 : room.number) ?? "—"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate$1(booking.checkIn) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground mt-1" })
              ] })
            ]
          },
          String(booking.id)
        )) }) })
      ]
    },
    "step1"
  );
}
function Step2Detail({
  mode,
  booking,
  room,
  guest,
  earlyFlag,
  lateFlag,
  onEarlyFlagChange,
  onLateFlagChange,
  onConfirm,
  onBack,
  loading
}) {
  const nights = nightsBetween$1(booking.checkIn, booking.checkOut);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 24 },
      transition: { duration: 0.22 },
      className: "flex-1 flex flex-col",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onBack,
              className: "w-10 h-10 rounded-xl bg-muted/50 border border-border flex items-center justify-center active:bg-muted transition-colors",
              "aria-label": "Back",
              "data-ocid": "mobile-checkin.detail.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5 text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground font-display leading-tight", children: mode === "checkin" ? "Confirm Check-In" : "Confirm Check-Out" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Review booking details" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground text-lg font-display", children: booking.guestName }),
                (guest == null ? void 0 : guest.tags.includes(GuestTag.VIP)) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5" }),
                  "VIP"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Booking #",
                String(booking.id)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Room" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: (room == null ? void 0 : room.number) ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                (room == null ? void 0 : room.roomType) ?? "",
                " · Floor ",
                (room == null ? void 0 : room.floor) ?? ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Guests" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                String(booking.numGuests),
                " guest",
                booking.numGuests > 1n ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Check-In" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: formatDate$1(booking.checkIn) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Check-Out" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: formatDate$1(booking.checkOut) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                nights,
                " night",
                nights !== 1 ? "s" : ""
              ] })
            ] })
          ] })
        ] }),
        booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-4 h-4 text-amber-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-300", children: booking.notes })
        ] }),
        mode === "checkin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: "flex items-center gap-3 p-4 rounded-2xl bg-muted/40 border border-border active:bg-muted/60 transition-colors mb-4 cursor-pointer",
            style: { minHeight: 56 },
            "data-ocid": "mobile-checkin.early_checkin_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: earlyFlag,
                  onChange: (e) => onEarlyFlagChange(e.target.checked),
                  className: "w-5 h-5 rounded accent-primary"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground flex-1", children: "Early Check-in Request" }),
              earlyFlag && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-amber-400 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5" }),
                " Flagged"
              ] })
            ]
          }
        ),
        mode === "checkout" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: "flex items-center gap-3 p-4 rounded-2xl bg-muted/40 border border-border active:bg-muted/60 transition-colors mb-4 cursor-pointer",
            style: { minHeight: 56 },
            "data-ocid": "mobile-checkin.late_checkout_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: lateFlag,
                  onChange: (e) => onLateFlagChange(e.target.checked),
                  className: "w-5 h-5 rounded accent-primary"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground flex-1", children: "Late Check-out Request" }),
              lateFlag && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-orange-400 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5" }),
                " Flagged"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onConfirm,
            disabled: loading,
            className: cn(
              "w-full font-bold text-base py-4 rounded-2xl shadow-lg transition-all",
              mode === "checkin" ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30" : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/30"
            ),
            style: { minHeight: 56 },
            "data-ocid": "mobile-checkin.confirm_button",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" }),
              "Processing..."
            ] }) : mode === "checkin" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-5 h-5" }),
              "Confirm Check-In"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5" }),
              "Confirm Check-Out"
            ] })
          }
        )
      ]
    },
    "step2"
  );
}
function Step3Success({ mode, booking, room, onDone }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.25, type: "spring", bounce: 0.3 },
      className: "flex-1 flex flex-col items-center justify-center",
      "data-ocid": "mobile-checkin.success.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scale: 0, rotate: -20 },
            animate: { scale: 1, rotate: 0 },
            transition: { delay: 0.1, type: "spring", bounce: 0.5 },
            className: cn(
              "w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-lg",
              mode === "checkin" ? "bg-emerald-500/20 border-2 border-emerald-500/40 shadow-emerald-900/30" : "bg-violet-500/20 border-2 border-violet-500/40 shadow-violet-900/30"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleCheck,
              {
                className: cn(
                  "w-12 h-12",
                  mode === "checkin" ? "text-emerald-400" : "text-violet-400"
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.h2,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "text-2xl font-bold text-foreground font-display mb-2 text-center",
            children: mode === "checkin" ? "Checked In!" : "Checked Out!"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.p,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.25 },
            className: "text-muted-foreground text-sm text-center mb-8",
            children: [
              booking.guestName,
              " · Room ",
              (room == null ? void 0 : room.number) ?? "—"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "w-full bg-card border border-border rounded-2xl p-5 mb-6 space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Booking" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                  "#",
                  String(booking.id)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: "Room" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                  (room == null ? void 0 : room.number) ?? "—",
                  " · ",
                  (room == null ? void 0 : room.roomType) ?? ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: mode === "checkin" ? "Check-In" : "Check-Out" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                }) })
              ] }),
              mode === "checkin" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-3 border-t border-border flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border-amber-500/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 text-amber-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-300", children: "Room Key" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Issue key card for Room ",
                    (room == null ? void 0 : room.number) ?? "—"
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.4 },
            className: "w-full",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: onDone,
                className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-4 rounded-2xl",
                style: { minHeight: 56 },
                "data-ocid": "mobile-checkin.done_button",
                children: "Done"
              }
            )
          }
        )
      ]
    },
    "step3"
  );
}
function MobileCheckIn() {
  const [mode, setMode] = reactExports.useState("checkin");
  const [step, setStep] = reactExports.useState(1);
  const [query, setQuery] = reactExports.useState("");
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [earlyFlag, setEarlyFlag] = reactExports.useState(false);
  const [lateFlag, setLateFlag] = reactExports.useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = reactExports.useState(
    null
  );
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allBookings = useHotelStore((s) => s.bookings);
  const allRooms = useHotelStore((s) => s.rooms);
  const allGuests = useHotelStore((s) => s.guests);
  const updateBooking = useHotelStore((s) => s.updateBooking);
  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();
  const bookings = reactExports.useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId]
  );
  const rooms = reactExports.useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId]
  );
  const eligible = reactExports.useMemo(() => {
    if (mode === "checkin") {
      return bookings.filter(
        (b) => b.status === BookingStatus.Confirmed || b.status === BookingStatus.Pending
      );
    }
    return bookings.filter((b) => b.status === BookingStatus.CheckedIn);
  }, [bookings, mode]);
  const results = reactExports.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return eligible.filter(
      (b) => b.guestName.toLowerCase().includes(q) || String(b.id).includes(q) || b.guestEmail.toLowerCase().includes(q)
    ).slice(0, 8).map((b) => ({
      booking: b,
      room: rooms.find((r) => r.id === b.roomId),
      guest: allGuests.find((g) => g.id === b.guestId)
    }));
  }, [query, eligible, rooms, allGuests]);
  const selected = reactExports.useMemo(() => {
    if (!selectedId) return null;
    const booking = bookings.find((b) => b.id === selectedId);
    if (!booking) return null;
    return {
      booking,
      room: rooms.find((r) => r.id === booking.roomId),
      guest: allGuests.find((g) => g.id === booking.guestId)
    };
  }, [selectedId, bookings, rooms, allGuests]);
  const confirmed = reactExports.useMemo(() => {
    if (!confirmedBookingId) return null;
    const booking = bookings.find((b) => b.id === confirmedBookingId);
    if (!booking) return null;
    return {
      booking,
      room: rooms.find((r) => r.id === booking.roomId),
      guest: allGuests.find((g) => g.id === booking.guestId)
    };
  }, [confirmedBookingId, bookings, rooms, allGuests]);
  function handleSelect(id) {
    setSelectedId(id);
    setQuery("");
    setEarlyFlag(false);
    setLateFlag(false);
    setStep(2);
  }
  async function handleConfirm() {
    var _a2, _b;
    if (!selected) return;
    const id = selected.booking.id;
    if (mode === "checkin") {
      updateBooking({
        ...selected.booking,
        status: BookingStatus.CheckedIn,
        actualCheckIn: BigInt(Date.now()),
        earlyCheckIn: earlyFlag
      });
      ue.success(
        `${selected.booking.guestName} checked in to Room ${((_a2 = selected.room) == null ? void 0 : _a2.number) ?? "—"}`,
        {
          description: earlyFlag ? "Early check-in flagged" : void 0,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400" })
        }
      );
    } else {
      updateBooking({
        ...selected.booking,
        status: BookingStatus.CheckedOut,
        actualCheckOut: BigInt(Date.now()),
        lateCheckOut: lateFlag
      });
      ue.success(
        `${selected.booking.guestName} checked out from Room ${((_b = selected.room) == null ? void 0 : _b.number) ?? "—"}`,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 text-violet-400" })
        }
      );
    }
    setConfirmedBookingId(id);
    setStep(3);
    if (mode === "checkin") {
      checkInMutation.mutate(id);
    } else {
      checkOutMutation.mutate(id);
    }
  }
  function handleDone() {
    setStep(1);
    setQuery("");
    setSelectedId(null);
    setConfirmedBookingId(null);
    setEarlyFlag(false);
    setLateFlag(false);
  }
  function handleModeChange(m) {
    setMode(m);
    setStep(1);
    setQuery("");
    setSelectedId(null);
    setConfirmedBookingId(null);
  }
  const isLoading = checkInMutation.isPending || checkOutMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col h-full bg-background",
      "data-ocid": "mobile-checkin.page",
      children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-2 p-1 bg-muted/50 border border-border rounded-2xl mb-5",
            "data-ocid": "mobile-checkin.mode_tabs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleModeChange("checkin"),
                  className: cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                    mode === "checkin" ? "bg-card border border-border text-foreground shadow-sm" : "text-muted-foreground"
                  ),
                  style: { minHeight: 44 },
                  "data-ocid": "mobile-checkin.checkin_tab",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
                    "Check-In"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleModeChange("checkout"),
                  className: cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                    mode === "checkout" ? "bg-card border border-border text-foreground shadow-sm" : "text-muted-foreground"
                  ),
                  style: { minHeight: 44 },
                  "data-ocid": "mobile-checkin.checkout_tab",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                    "Check-Out"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepDots, { step }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step1Search,
            {
              mode,
              results,
              query,
              onQueryChange: setQuery,
              onSelect: handleSelect
            },
            "step1"
          ),
          step === 2 && selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step2Detail,
            {
              mode,
              booking: selected.booking,
              room: selected.room,
              guest: selected.guest,
              earlyFlag,
              lateFlag,
              onEarlyFlagChange: setEarlyFlag,
              onLateFlagChange: setLateFlag,
              onConfirm: handleConfirm,
              onBack: () => setStep(1),
              loading: isLoading
            },
            "step2"
          ),
          step === 3 && confirmed && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Step3Success,
            {
              mode,
              booking: confirmed.booking,
              room: confirmed.room,
              onDone: handleDone
            },
            "step3"
          )
        ] }) })
      ]
    }
  );
}
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = reactExports.useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );
  reactExports.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function formatTime(ts) {
  return new Date(Number(ts)).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
function nightsBetween(checkIn, checkOut) {
  return Math.max(
    1,
    Math.round((Number(checkOut) - Number(checkIn)) / 864e5)
  );
}
function formatCurrency(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}
function isToday(ts) {
  const d = new Date(Number(ts));
  const today = /* @__PURE__ */ new Date();
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
}
const SOURCE_LABELS = {
  [BookingSource.Direct]: "Direct",
  [BookingSource.OTA]: "OTA",
  [BookingSource.WalkIn]: "Walk-In"
};
const SOURCE_COLORS = {
  [BookingSource.Direct]: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  [BookingSource.OTA]: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  [BookingSource.WalkIn]: "bg-amber-500/15 text-amber-400 border-amber-500/25"
};
function InfoRow({ icon, label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mt-0.5 shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate", children: value })
    ] })
  ] });
}
function SearchDropdown({ results, onSelect, show }) {
  if (!show || results.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      className: "absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-xl shadow-xl overflow-hidden",
      children: results.map(({ booking, room }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSelect(booking.id),
          className: "w-full flex items-center gap-4 px-4 py-3 hover:bg-muted/60 transition-colors text-left border-b border-border/50 last:border-0",
          "data-ocid": `front-desk.search-result.${String(booking.id)}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground truncate", children: booking.guestName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: booking.status, className: "shrink-0" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "#",
                String(booking.id),
                " · Room ",
                (room == null ? void 0 : room.number) ?? "—",
                " ·",
                " ",
                booking.source
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(booking.checkIn) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                nightsBetween(booking.checkIn, booking.checkOut),
                "N"
              ] })
            ] })
          ]
        },
        String(booking.id)
      ))
    }
  );
}
function CheckInPanel({ bookings, rooms, guests }) {
  var _a2, _b, _c, _d;
  const [query, setQuery] = reactExports.useState("");
  const [showDrop, setShowDrop] = reactExports.useState(false);
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [earlyCheckIn, setEarlyCheckIn] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const { updateBooking } = useHotelStore();
  const eligible = reactExports.useMemo(
    () => bookings.filter(
      (b) => b.status === BookingStatus.Confirmed || b.status === BookingStatus.Pending
    ),
    [bookings]
  );
  const results = reactExports.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return eligible.filter(
      (b) => b.guestName.toLowerCase().includes(q) || String(b.id).includes(q) || b.guestEmail.toLowerCase().includes(q)
    ).slice(0, 6).map((b) => ({
      booking: b,
      room: rooms.find((r) => r.id === b.roomId),
      guest: guests.find((g) => g.id === b.guestId)
    }));
  }, [query, eligible, rooms, guests]);
  const selected = reactExports.useMemo(() => {
    if (!selectedId) return null;
    const booking = bookings.find((b) => b.id === selectedId);
    if (!booking) return null;
    return {
      booking,
      room: rooms.find((r) => r.id === booking.roomId),
      guest: guests.find((g) => g.id === booking.guestId)
    };
  }, [selectedId, bookings, rooms, guests]);
  function handleSelect(id) {
    setSelectedId(id);
    setQuery("");
    setShowDrop(false);
    setEarlyCheckIn(false);
  }
  function handleCheckIn() {
    var _a3;
    if (!selected) return;
    const now = BigInt(Date.now());
    updateBooking({
      ...selected.booking,
      status: BookingStatus.CheckedIn,
      actualCheckIn: now,
      earlyCheckIn
    });
    ue.success(
      `${selected.booking.guestName} checked in to Room ${((_a3 = selected.room) == null ? void 0 : _a3.number) ?? "—"}`,
      {
        description: earlyCheckIn ? "Early check-in flagged" : void 0,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400" })
      }
    );
    setSelectedId(null);
    setEarlyCheckIn(false);
  }
  const nights = selected ? nightsBetween(selected.booking.checkIn, selected.booking.checkOut) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-5 h-5 text-emerald-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground font-display", children: "Check-In" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          eligible.length,
          " booking",
          eligible.length !== 1 ? "s" : "",
          " awaiting"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          type: "text",
          value: query,
          onChange: (e) => {
            setQuery(e.target.value);
            setShowDrop(true);
            setSelectedId(null);
          },
          onFocus: () => setShowDrop(true),
          onBlur: () => setTimeout(() => setShowDrop(false), 180),
          placeholder: "Search guest name or booking ID...",
          className: "w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
          "data-ocid": "front-desk.checkin.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchDropdown,
        {
          query,
          results,
          onSelect: handleSelect,
          show: showDrop && results.length > 0
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.97 },
        className: "flex-1 flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-foreground font-display", children: selected.booking.guestName }),
                ((_a2 = selected.guest) == null ? void 0 : _a2.tags.includes(GuestTag.VIP)) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25 font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" }),
                  "VIP"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Booking #",
                String(selected.booking.id)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedId(null),
                className: "text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": "Clear selection",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                label: "Email",
                value: selected.booking.guestEmail
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-4 h-4" }),
                label: "Phone",
                value: selected.booking.guestPhone
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-4 h-4" }),
                label: "Room",
                value: `${((_b = selected.room) == null ? void 0 : _b.number) ?? "—"} · ${((_c = selected.room) == null ? void 0 : _c.roomType) ?? ""} · Floor ${((_d = selected.room) == null ? void 0 : _d.floor) ?? ""}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                label: "Guests",
                value: `${selected.booking.numGuests} guest${selected.booking.numGuests > 1n ? "s" : ""}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4" }),
                label: "Check-in",
                value: formatDate(selected.booking.checkIn)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4" }),
                label: "Check-out",
                value: `${formatDate(selected.booking.checkOut)} · ${nights} nights`
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium",
                  SOURCE_COLORS[selected.booking.source]
                ),
                children: SOURCE_LABELS[selected.booking.source]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: selected.booking.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border cursor-pointer hover:bg-muted/60 transition-colors mb-4",
              "data-ocid": "front-desk.checkin.early_checkin_checkbox",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: earlyCheckIn,
                    onChange: (e) => setEarlyCheckIn(e.target.checked),
                    className: "w-4 h-4 rounded accent-primary"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Early Check-in Request" }),
                earlyCheckIn && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-1 text-xs text-amber-400 font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5" }),
                  " Flagged"
                ] })
              ]
            }
          ),
          selected.booking.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-amber-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-300", children: selected.booking.notes })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleCheckIn,
              className: "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl shadow-md shadow-emerald-900/30 transition-all",
              "data-ocid": "front-desk.checkin.confirm_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4 mr-2" }),
                "Confirm Check-In"
              ]
            }
          )
        ]
      },
      String(selectedId)
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "flex-1 flex flex-col items-center justify-center py-12 text-center",
        "data-ocid": "front-desk.checkin.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "Search for a booking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-48", children: "Enter guest name or booking ID to begin check-in" })
        ]
      },
      "empty-checkin"
    ) })
  ] });
}
function BalanceSummary({ booking, room, folio }) {
  const nights = nightsBetween(booking.checkIn, booking.checkOut);
  const roomRate = ((room == null ? void 0 : room.pricePerNight) ?? 0) * nights;
  const gst = Math.round(roomRate * 0.18);
  const extras = folio ? folio.charges.filter((c) => c.category === ChargeCategory.Extra).reduce((sum, c) => sum + c.amount, 0) : 0;
  const total = roomRate + gst + extras;
  const paid = folio ? folio.payments.reduce((sum, p) => sum + p.amount, 0) : 0;
  const outstanding = total - paid;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border rounded-xl p-4 mb-4 space-y-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3", children: "Balance Summary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Room Rate" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
        formatCurrency((room == null ? void 0 : room.pricePerNight) ?? 0),
        "/night × ",
        nights,
        " =",
        " ",
        formatCurrency(roomRate)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18%)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatCurrency(gst) })
    ] }),
    extras > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Extras" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatCurrency(extras) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/60 pt-2.5 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total Due" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: formatCurrency(total) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Amount Paid" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: formatCurrency(paid) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Outstanding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: outstanding > 0 ? "text-red-400" : "text-emerald-400",
            children: outstanding > 0 ? formatCurrency(outstanding) : "Settled"
          }
        )
      ] })
    ] })
  ] });
}
function CheckOutPanel({
  bookings,
  rooms,
  guests,
  folios
}) {
  var _a2;
  const [query, setQuery] = reactExports.useState("");
  const [showDrop, setShowDrop] = reactExports.useState(false);
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [lateCheckOut, setLateCheckOut] = reactExports.useState(false);
  const [payMethod, setPayMethod] = reactExports.useState(PaymentMethod.Cash);
  const { updateBooking } = useHotelStore();
  const checkedIn = reactExports.useMemo(
    () => bookings.filter((b) => b.status === BookingStatus.CheckedIn),
    [bookings]
  );
  const results = reactExports.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return checkedIn.filter(
      (b) => b.guestName.toLowerCase().includes(q) || String(b.id).includes(q) || b.guestEmail.toLowerCase().includes(q)
    ).slice(0, 6).map((b) => ({
      booking: b,
      room: rooms.find((r) => r.id === b.roomId),
      guest: guests.find((g) => g.id === b.guestId)
    }));
  }, [query, checkedIn, rooms, guests]);
  const selected = reactExports.useMemo(() => {
    if (!selectedId) return null;
    const booking = bookings.find((b) => b.id === selectedId);
    if (!booking) return null;
    return {
      booking,
      room: rooms.find((r) => r.id === booking.roomId),
      guest: guests.find((g) => g.id === booking.guestId),
      folio: folios.find((f) => f.bookingId === booking.id)
    };
  }, [selectedId, bookings, rooms, guests, folios]);
  function handleSelect(id) {
    setSelectedId(id);
    setQuery("");
    setShowDrop(false);
    const b = bookings.find((bk) => bk.id === id);
    setLateCheckOut((b == null ? void 0 : b.lateCheckOut) ?? false);
  }
  function handleCheckOut() {
    var _a3;
    if (!selected) return;
    const now = BigInt(Date.now());
    updateBooking({
      ...selected.booking,
      status: BookingStatus.CheckedOut,
      actualCheckOut: now,
      lateCheckOut
    });
    ue.success(
      `${selected.booking.guestName} checked out from Room ${((_a3 = selected.room) == null ? void 0 : _a3.number) ?? "—"}`,
      {
        description: `Payment via ${payMethod}`,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 text-violet-400" })
      }
    );
    setSelectedId(null);
    setLateCheckOut(false);
    setPayMethod(PaymentMethod.Cash);
  }
  const PAY_OPTIONS = [
    {
      value: PaymentMethod.Cash,
      label: "Cash",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-4 h-4" })
    },
    {
      value: PaymentMethod.Card,
      label: "Card",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" })
    },
    {
      value: PaymentMethod.UPI,
      label: "UPI",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4" })
    },
    {
      value: PaymentMethod.BankTransfer,
      label: "Bank Transfer",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5 text-violet-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground font-display", children: "Check-Out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          checkedIn.length,
          " guest",
          checkedIn.length !== 1 ? "s" : "",
          " checked in"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: query,
          onChange: (e) => {
            setQuery(e.target.value);
            setShowDrop(true);
            setSelectedId(null);
          },
          onFocus: () => setShowDrop(true),
          onBlur: () => setTimeout(() => setShowDrop(false), 180),
          placeholder: "Search checked-in guests...",
          className: "w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
          "data-ocid": "front-desk.checkout.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SearchDropdown,
        {
          query,
          results,
          onSelect: handleSelect,
          show: showDrop && results.length > 0
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.97 },
        className: "flex-1 flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xl font-bold text-foreground font-display", children: selected.booking.guestName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Room ",
                (_a2 = selected.room) == null ? void 0 : _a2.number,
                " · #",
                String(selected.booking.id)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedId(null),
                className: "text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": "Clear selection",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4" }),
                label: "Checked In",
                value: selected.booking.actualCheckIn ? formatDate(selected.booking.actualCheckIn) : formatDate(selected.booking.checkIn)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InfoRow,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4" }),
                label: "Due Check-out",
                value: formatDate(selected.booking.checkOut)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BalanceSummary,
            {
              booking: selected.booking,
              room: selected.room,
              folio: selected.folio
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Payment Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: PAY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setPayMethod(opt.value),
                className: cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all",
                  payMethod === opt.value ? "border-primary bg-primary/15 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60"
                ),
                "data-ocid": `front-desk.checkout.payment_method.${opt.value.toLowerCase()}`,
                children: [
                  opt.icon,
                  opt.label
                ]
              },
              opt.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: "flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border cursor-pointer hover:bg-muted/60 transition-colors mb-4",
              "data-ocid": "front-desk.checkout.late_checkout_checkbox",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: lateCheckOut,
                    onChange: (e) => setLateCheckOut(e.target.checked),
                    className: "w-4 h-4 rounded accent-primary"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Late Check-out Request" }),
                lateCheckOut && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-1 text-xs text-orange-400 font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5" }),
                  " Flagged"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleCheckOut,
              className: "w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl shadow-md shadow-violet-900/30 transition-all",
              "data-ocid": "front-desk.checkout.confirm_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
                "Confirm Check-Out"
              ]
            }
          )
        ]
      },
      String(selectedId)
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "flex-1 flex flex-col items-center justify-center py-12 text-center",
        "data-ocid": "front-desk.checkout.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "Search for a guest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-48", children: "Find a checked-in guest to process check-out" })
        ]
      },
      "empty-checkout"
    ) })
  ] });
}
function WalkInModal({ onClose, rooms, hotelId }) {
  const { addBooking, addGuest, guests } = useHotelStore();
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [roomType, setRoomType] = reactExports.useState(RoomType.Standard);
  const [nights, setNights] = reactExports.useState(1);
  const [numGuests, setNumGuests] = reactExports.useState(1);
  const [loading, setLoading] = reactExports.useState(false);
  const availableRooms = reactExports.useMemo(
    () => rooms.filter(
      (r) => r.hotelId === hotelId && r.roomType === roomType && r.status === RoomStatus.Clean && r.isActive
    ),
    [rooms, hotelId, roomType]
  );
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    if (availableRooms.length === 0) {
      ue.error(`No available ${roomType} rooms`);
      return;
    }
    setLoading(true);
    const now = BigInt(Date.now());
    const checkOut = BigInt(Date.now() + nights * 864e5);
    const room = availableRooms[0];
    const newGuestId = BigInt(guests.length + 100 + Date.now() % 1e3);
    const newBookingId = BigInt(Date.now() % 1e5);
    const newGuest = {
      id: newGuestId,
      name: name.trim(),
      email: email.trim() || `walkin.${newGuestId}@hotel.in`,
      phone: phone.trim(),
      country: "India",
      address: "",
      tags: [GuestTag.New],
      loyaltyPoints: 0n,
      preferences: "",
      notes: "Walk-in guest",
      createdAt: now
    };
    const newBooking = {
      id: newBookingId,
      hotelId,
      guestId: newGuestId,
      roomId: room.id,
      guestName: name.trim(),
      guestEmail: newGuest.email,
      guestPhone: phone.trim(),
      checkIn: now,
      checkOut,
      numGuests: BigInt(numGuests),
      status: BookingStatus.CheckedIn,
      source: BookingSource.WalkIn,
      earlyCheckIn: false,
      lateCheckOut: false,
      notes: "Walk-in booking",
      actualCheckIn: now,
      actualCheckOut: void 0,
      createdAt: now
    };
    addGuest(newGuest);
    addBooking(newBooking);
    setTimeout(() => {
      setLoading(false);
      ue.success(`Walk-in check-in complete for ${name.trim()}`, {
        description: `Assigned to Room ${room.number}`,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400" })
      });
      onClose();
    }, 400);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "front-desk.walkin.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95, y: 12 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 12 },
            className: "relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md z-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 text-amber-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground font-display", children: "Walk-In Guest" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Quick check-in at the desk" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    "data-ocid": "front-desk.walkin.close_button",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "wi-name",
                        className: "block text-xs font-medium text-muted-foreground mb-1.5",
                        children: [
                          "Guest Name ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "wi-name",
                        type: "text",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        placeholder: "Full name",
                        required: true,
                        className: "w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                        "data-ocid": "front-desk.walkin.name_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "wi-phone",
                          className: "block text-xs font-medium text-muted-foreground mb-1.5",
                          children: [
                            "Phone ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "wi-phone",
                          type: "tel",
                          value: phone,
                          onChange: (e) => setPhone(e.target.value),
                          placeholder: "+91 98000 00000",
                          required: true,
                          className: "w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                          "data-ocid": "front-desk.walkin.phone_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "wi-email",
                          className: "block text-xs font-medium text-muted-foreground mb-1.5",
                          children: "Email"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "wi-email",
                          type: "email",
                          value: email,
                          onChange: (e) => setEmail(e.target.value),
                          placeholder: "optional",
                          className: "w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                          "data-ocid": "front-desk.walkin.email_input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "wi-room-type",
                          className: "block text-xs font-medium text-muted-foreground mb-1.5",
                          children: "Room Type"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "select",
                        {
                          id: "wi-room-type",
                          value: roomType,
                          onChange: (e) => setRoomType(e.target.value),
                          className: "w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                          "data-ocid": "front-desk.walkin.room_type_select",
                          children: Object.values(RoomType).map((rt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: rt, children: rt }, rt))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "wi-nights",
                          className: "block text-xs font-medium text-muted-foreground mb-1.5",
                          children: "Nights"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "wi-nights",
                          type: "number",
                          min: 1,
                          max: 30,
                          value: nights,
                          onChange: (e) => setNights(Math.max(1, Number.parseInt(e.target.value) || 1)),
                          className: "w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                          "data-ocid": "front-desk.walkin.nights_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "wi-guests",
                          className: "block text-xs font-medium text-muted-foreground mb-1.5",
                          children: "Guests"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "wi-guests",
                          type: "number",
                          min: 1,
                          max: 6,
                          value: numGuests,
                          onChange: (e) => setNumGuests(
                            Math.max(1, Number.parseInt(e.target.value) || 1)
                          ),
                          className: "w-full px-3.5 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                          "data-ocid": "front-desk.walkin.num_guests_input"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-xs border",
                      availableRooms.length > 0 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                    ),
                    children: availableRooms.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 shrink-0" }),
                      availableRooms.length,
                      " ",
                      roomType,
                      " room",
                      availableRooms.length !== 1 ? "s" : "",
                      " available"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
                      "No ",
                      roomType,
                      " rooms available"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: onClose,
                      className: "flex-1",
                      "data-ocid": "front-desk.walkin.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: loading || availableRooms.length === 0,
                      className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold",
                      "data-ocid": "front-desk.walkin.submit_button",
                      children: loading ? "Processing..." : "Check In Now"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function TodayActivity({ bookings, rooms }) {
  const todayCheckIns = reactExports.useMemo(
    () => bookings.filter(
      (b) => b.status === BookingStatus.CheckedIn && b.actualCheckIn && isToday(b.actualCheckIn)
    ),
    [bookings]
  );
  const todayCheckOuts = reactExports.useMemo(
    () => bookings.filter(
      (b) => b.status === BookingStatus.CheckedOut && b.actualCheckOut && isToday(b.actualCheckOut)
    ),
    [bookings]
  );
  const upcomingCheckOuts = reactExports.useMemo(
    () => bookings.filter(
      (b) => b.status === BookingStatus.CheckedIn && isToday(b.checkOut)
    ),
    [bookings]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid grid-cols-2 gap-6 mt-6",
      "data-ocid": "front-desk.activity.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4 text-emerald-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Today's Check-ins" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                todayCheckIns.length,
                " completed"
              ] })
            ] })
          ] }),
          todayCheckIns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "py-6 text-center",
              "data-ocid": "front-desk.checkins_today.empty_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No check-ins yet today" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: todayCheckIns.map((b, i) => {
            const room = rooms.find((r) => r.id === b.roomId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center justify-between py-2 border-b border-border/50 last:border-0",
                "data-ocid": `front-desk.checkin_item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: b.guestName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Room ",
                      (room == null ? void 0 : room.number) ?? "—"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 ml-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: b.actualCheckIn ? formatTime(b.actualCheckIn) : "—" }),
                    b.earlyCheckIn && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-400 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                      "Early"
                    ] })
                  ] })
                ]
              },
              String(b.id)
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 text-violet-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Today's Check-outs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                todayCheckOuts.length,
                " done · ",
                upcomingCheckOuts.length,
                " due"
              ] })
            ] })
          ] }),
          todayCheckOuts.length === 0 && upcomingCheckOuts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "py-6 text-center",
              "data-ocid": "front-desk.checkouts_today.empty_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No check-outs today" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [...todayCheckOuts, ...upcomingCheckOuts].map((b, i) => {
            const room = rooms.find((r) => r.id === b.roomId);
            const isDone = b.status === BookingStatus.CheckedOut;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center justify-between py-2 border-b border-border/50 last:border-0",
                "data-ocid": `front-desk.checkout_item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: b.guestName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Room ",
                      (room == null ? void 0 : room.number) ?? "—"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 ml-3 flex flex-col items-end gap-1", children: [
                    isDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-emerald-400 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                      "Done"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-400 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                      "Due"
                    ] }),
                    b.lateCheckOut && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-orange-400 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3 h-3" }),
                      "Late"
                    ] })
                  ] })
                ]
              },
              String(b.id)
            );
          }) })
        ] })
      ]
    }
  );
}
function FrontDeskPage() {
  const isMobile = useIsMobile();
  const [showWalkIn, setShowWalkIn] = reactExports.useState(false);
  const selectedHotelId = useHotelStore((s) => s.selectedHotelId);
  const allRooms = useHotelStore((s) => s.rooms);
  const allBookings = useHotelStore((s) => s.bookings);
  const allGuests = useHotelStore((s) => s.guests);
  const allFolios = useHotelStore((s) => s.folios);
  useRoomStatusPolling({ enabled: true, intervalMs: 7e3 });
  const bookings = reactExports.useMemo(
    () => allBookings.filter((b) => b.hotelId === selectedHotelId),
    [allBookings, selectedHotelId]
  );
  const rooms = reactExports.useMemo(
    () => allRooms.filter((r) => r.hotelId === selectedHotelId),
    [allRooms, selectedHotelId]
  );
  const guests = reactExports.useMemo(() => allGuests, [allGuests]);
  const folios = reactExports.useMemo(
    () => allFolios.filter((f) => f.hotelId === selectedHotelId),
    [allFolios, selectedHotelId]
  );
  const confirmedCount = bookings.filter(
    (b) => b.status === BookingStatus.Confirmed || b.status === BookingStatus.Pending
  ).length;
  const checkedInCount = bookings.filter(
    (b) => b.status === BookingStatus.CheckedIn
  ).length;
  const dueCheckouts = bookings.filter(
    (b) => b.status === BookingStatus.CheckedIn && isToday(b.checkOut)
  ).length;
  if (isMobile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "front-desk.page",
        className: "h-[calc(100vh-4rem)] flex flex-col px-4 pt-4 pb-safe overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MobileCheckIn, {})
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "front-desk.page", className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground font-display", children: "Front Desk" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Check-in, check-out, and guest operations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setShowWalkIn(true),
          className: "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-md shadow-amber-900/20",
          "data-ocid": "front-desk.walkin_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
            "Walk-In Guest"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
      {
        label: "Arrivals Today",
        value: confirmedCount,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4" }),
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20"
      },
      {
        label: "Checked In",
        value: checkedInCount,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-4 h-4" }),
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20"
      },
      {
        label: "Due Check-outs",
        value: dueCheckouts,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/20"
      }
    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex items-center gap-3 bg-card border rounded-xl px-4 py-3",
          stat.bg
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("shrink-0", stat.color), children: stat.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-xl font-bold font-display", stat.color), children: stat.value })
          ] })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          className: "bg-card border border-border rounded-2xl p-6 min-h-[460px]",
          "data-ocid": "front-desk.checkin.panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckInPanel, { bookings, rooms, guests })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.08 },
          className: "bg-card border border-border rounded-2xl p-6 min-h-[460px]",
          "data-ocid": "front-desk.checkout.panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckOutPanel,
            {
              bookings,
              rooms,
              guests,
              folios
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TodayActivity, { bookings, rooms }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showWalkIn && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WalkInModal,
      {
        onClose: () => setShowWalkIn(false),
        rooms,
        hotelId: selectedHotelId
      }
    ) })
  ] });
}
export {
  FrontDeskPage as default
};
