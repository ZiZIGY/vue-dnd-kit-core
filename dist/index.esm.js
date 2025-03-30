/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Zn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(","))
    t[n] = 1;
  return (n) => n in t;
}
const z = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Xn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], me = () => {
}, Qn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), A = Object.assign, kn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, er = Object.prototype.hasOwnProperty, S = (e, t) => er.call(e, t), N = Array.isArray, Ee = (e) => Xe(e) === "[object Map]", tr = (e) => Xe(e) === "[object Set]", D = (e) => typeof e == "function", F = (e) => typeof e == "string", Te = (e) => typeof e == "symbol", T = (e) => e !== null && typeof e == "object", nr = (e) => (T(e) || D(e)) && D(e.then) && D(e.catch), rr = Object.prototype.toString, Xe = (e) => rr.call(e), dn = (e) => Xe(e).slice(8, -1), sr = (e) => Xe(e) === "[object Object]", bt = (e) => F(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, xt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, or = /-(\w)/g, Ke = xt(
  (e) => e.replace(or, (t, n) => n ? n.toUpperCase() : "")
), De = xt((e) => e.charAt(0).toUpperCase() + e.slice(1)), ir = xt(
  (e) => e ? `on${De(e)}` : ""
), oe = (e, t) => !Object.is(e, t), cr = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let Qt;
const Qe = () => Qt || (Qt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Pe(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = F(s) ? fr(s) : Pe(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (F(e) || T(e))
    return e;
}
const lr = /;(?![^(]*\))/g, ar = /:([^]+)/, ur = /\/\*[^]*?\*\//g;
function fr(e) {
  const t = {};
  return e.replace(ur, "").split(lr).forEach((n) => {
    if (n) {
      const s = n.split(ar);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ot(e) {
  let t = "";
  if (F(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ot(e[n]);
      s && (t += s + " ");
    }
  else if (T(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function G(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let L;
class dr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = L, !t && L && (this.index = (L.scopes || (L.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = L;
      try {
        return L = this, t();
      } finally {
        L = n;
      }
    } else
      process.env.NODE_ENV !== "production" && G("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    L = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    L = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function pr(e) {
  return new dr(e);
}
function hr() {
  return L;
}
let w;
const rt = /* @__PURE__ */ new WeakSet();
class gr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, L && L.active && L.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, rt.has(this) && (rt.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || hn(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, kt(this), gn(this);
    const t = w, n = J;
    w = this, J = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && w !== this && G(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), vn(this), w = t, J = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Pt(t);
      this.deps = this.depsTail = void 0, kt(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? rt.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    pt(this) && this.run();
  }
  get dirty() {
    return pt(this);
  }
}
let pn = 0, be, xe;
function hn(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = xe, xe = e;
    return;
  }
  e.next = be, be = e;
}
function St() {
  pn++;
}
function Dt() {
  if (--pn > 0)
    return;
  if (xe) {
    let t = xe;
    for (xe = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; be; ) {
    let t = be;
    for (be = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e)
    throw e;
}
function gn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function vn(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Pt(s), vr(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function pt(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (_n(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function _n(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ce))
    return;
  e.globalVersion = Ce;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !pt(e)) {
    e.flags &= -3;
    return;
  }
  const n = w, s = J;
  w = e, J = !0;
  try {
    gn(e);
    const r = e.fn(e._value);
    (t.version === 0 || oe(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    w = n, J = s, vn(e), e.flags &= -3;
  }
}
function Pt(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      Pt(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function vr(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let J = !0;
const mn = [];
function Me() {
  mn.push(J), J = !1;
}
function $e() {
  const e = mn.pop();
  J = e === void 0 ? !0 : e;
}
function kt(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = w;
    w = void 0;
    try {
      t();
    } finally {
      w = n;
    }
  }
}
let Ce = 0;
class _r {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ct {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!w || !J || w === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== w)
      n = this.activeLink = new _r(w, this), w.deps ? (n.prevDep = w.depsTail, w.depsTail.nextDep = n, w.depsTail = n) : w.deps = w.depsTail = n, En(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = w.depsTail, n.nextDep = void 0, w.depsTail.nextDep = n, w.depsTail = n, w.deps === n && (w.deps = s);
    }
    return process.env.NODE_ENV !== "production" && w.onTrack && w.onTrack(
      A(
        {
          effect: w
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Ce++, this.notify(t);
  }
  notify(t) {
    St();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            A(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Dt();
    }
  }
}
function En(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        En(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const ht = /* @__PURE__ */ new WeakMap(), fe = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), gt = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Re = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function P(e, t, n) {
  if (J && w) {
    let s = ht.get(e);
    s || ht.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Ct()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function ne(e, t, n, s, r, o) {
  const i = ht.get(e);
  if (!i) {
    Ce++;
    return;
  }
  const c = (a) => {
    a && (process.env.NODE_ENV !== "production" ? a.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: r,
      oldTarget: o
    }) : a.trigger());
  };
  if (St(), t === "clear")
    i.forEach(c);
  else {
    const a = N(e), d = a && bt(n);
    if (a && n === "length") {
      const u = Number(s);
      i.forEach((l, f) => {
        (f === "length" || f === Re || !Te(f) && f >= u) && c(l);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), d && c(i.get(Re)), t) {
        case "add":
          a ? d && c(i.get("length")) : (c(i.get(fe)), Ee(e) && c(i.get(gt)));
          break;
        case "delete":
          a || (c(i.get(fe)), Ee(e) && c(i.get(gt)));
          break;
        case "set":
          Ee(e) && c(i.get(fe));
          break;
      }
  }
  Dt();
}
function he(e) {
  const t = m(e);
  return t === e ? t : (P(t, "iterate", Re), M(e) ? t : t.map(R));
}
function ke(e) {
  return P(e = m(e), "iterate", Re), e;
}
const mr = {
  __proto__: null,
  [Symbol.iterator]() {
    return st(this, Symbol.iterator, R);
  },
  concat(...e) {
    return he(this).concat(
      ...e.map((t) => N(t) ? he(t) : t)
    );
  },
  entries() {
    return st(this, "entries", (e) => (e[1] = R(e[1]), e));
  },
  every(e, t) {
    return Q(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Q(this, "filter", e, t, (n) => n.map(R), arguments);
  },
  find(e, t) {
    return Q(this, "find", e, t, R, arguments);
  },
  findIndex(e, t) {
    return Q(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Q(this, "findLast", e, t, R, arguments);
  },
  findLastIndex(e, t) {
    return Q(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Q(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ot(this, "includes", e);
  },
  indexOf(...e) {
    return ot(this, "indexOf", e);
  },
  join(e) {
    return he(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return ot(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Q(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ye(this, "pop");
  },
  push(...e) {
    return ye(this, "push", e);
  },
  reduce(e, ...t) {
    return en(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return en(this, "reduceRight", e, t);
  },
  shift() {
    return ye(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Q(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ye(this, "splice", e);
  },
  toReversed() {
    return he(this).toReversed();
  },
  toSorted(e) {
    return he(this).toSorted(e);
  },
  toSpliced(...e) {
    return he(this).toSpliced(...e);
  },
  unshift(...e) {
    return ye(this, "unshift", e);
  },
  values() {
    return st(this, "values", R);
  }
};
function st(e, t, n) {
  const s = ke(e), r = s[t]();
  return s !== e && !M(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const Er = Array.prototype;
function Q(e, t, n, s, r, o) {
  const i = ke(e), c = i !== e && !M(e), a = i[t];
  if (a !== Er[t]) {
    const l = a.apply(e, o);
    return c ? R(l) : l;
  }
  let d = n;
  i !== e && (c ? d = function(l, f) {
    return n.call(this, R(l), f, e);
  } : n.length > 2 && (d = function(l, f) {
    return n.call(this, l, f, e);
  }));
  const u = a.call(i, d, s);
  return c && r ? r(u) : u;
}
function en(e, t, n, s) {
  const r = ke(e);
  let o = n;
  return r !== e && (M(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, R(c), a, e);
  }), r[t](o, ...s);
}
function ot(e, t, n) {
  const s = m(e);
  P(s, "iterate", Re);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Ue(n[0]) ? (n[0] = m(n[0]), s[t](...n)) : r;
}
function ye(e, t, n = []) {
  Me(), St();
  const s = m(e)[t].apply(e, n);
  return Dt(), $e(), s;
}
const wr = /* @__PURE__ */ Zn("__proto__,__v_isRef,__isVue"), wn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Te)
);
function yr(e) {
  Te(e) || (e = String(e));
  const t = m(this);
  return P(t, "has", e), t.hasOwnProperty(e);
}
class yn {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip")
      return t.__v_skip;
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? On : xn : o ? Vr : bn).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = N(t);
    if (!r) {
      let a;
      if (i && (a = mr[n]))
        return a;
      if (n === "hasOwnProperty")
        return yr;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      $(t) ? t : s
    );
    return (Te(n) ? wn.has(n) : wr(n)) || (r || P(t, "get", n), o) ? c : $(c) ? i && bt(n) ? c : c.value : T(c) ? r ? Dn(c) : Sn(c) : c;
  }
}
class Nr extends yn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = ee(o);
      if (!M(s) && !ee(s) && (o = m(o), s = m(s)), !N(t) && $(o) && !$(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = N(t) && bt(n) ? Number(n) < t.length : S(t, n), c = Reflect.set(
      t,
      n,
      s,
      $(t) ? t : r
    );
    return t === m(r) && (i ? oe(s, o) && ne(t, "set", n, s, o) : ne(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = S(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && ne(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Te(n) || !wn.has(n)) && P(t, "has", n), s;
  }
  ownKeys(t) {
    return P(
      t,
      "iterate",
      N(t) ? "length" : fe
    ), Reflect.ownKeys(t);
  }
}
class Nn extends yn {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && G(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && G(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const br = /* @__PURE__ */ new Nr(), xr = /* @__PURE__ */ new Nn(), Or = /* @__PURE__ */ new Nn(!0), vt = (e) => e, Ae = (e) => Reflect.getPrototypeOf(e);
function Sr(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = m(r), i = Ee(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, d = r[e](...s), u = n ? vt : t ? _t : R;
    return !t && P(
      o,
      "iterate",
      a ? gt : fe
    ), {
      // iterator protocol
      next() {
        const { value: l, done: f } = d.next();
        return f ? { value: l, done: f } : {
          value: c ? [u(l[0]), u(l[1])] : u(l),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function He(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      G(
        `${De(e)} operation ${n}failed: target is readonly.`,
        m(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Dr(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = m(o), c = m(r);
      e || (oe(r, c) && P(i, "get", r), P(i, "get", c));
      const { has: a } = Ae(i), d = t ? vt : e ? _t : R;
      if (a.call(i, r))
        return d(o.get(r));
      if (a.call(i, c))
        return d(o.get(c));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && P(m(r), "iterate", fe), Reflect.get(r, "size", r);
    },
    has(r) {
      const o = this.__v_raw, i = m(o), c = m(r);
      return e || (oe(r, c) && P(i, "has", r), P(i, "has", c)), r === c ? o.has(r) : o.has(r) || o.has(c);
    },
    forEach(r, o) {
      const i = this, c = i.__v_raw, a = m(c), d = t ? vt : e ? _t : R;
      return !e && P(a, "iterate", fe), c.forEach((u, l) => r.call(o, d(u), d(l), i));
    }
  };
  return A(
    n,
    e ? {
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear")
    } : {
      add(r) {
        !t && !M(r) && !ee(r) && (r = m(r));
        const o = m(this);
        return Ae(o).has.call(o, r) || (o.add(r), ne(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !M(o) && !ee(o) && (o = m(o));
        const i = m(this), { has: c, get: a } = Ae(i);
        let d = c.call(i, r);
        d ? process.env.NODE_ENV !== "production" && tn(i, c, r) : (r = m(r), d = c.call(i, r));
        const u = a.call(i, r);
        return i.set(r, o), d ? oe(o, u) && ne(i, "set", r, o, u) : ne(i, "add", r, o), this;
      },
      delete(r) {
        const o = m(this), { has: i, get: c } = Ae(o);
        let a = i.call(o, r);
        a ? process.env.NODE_ENV !== "production" && tn(o, i, r) : (r = m(r), a = i.call(o, r));
        const d = c ? c.call(o, r) : void 0, u = o.delete(r);
        return a && ne(o, "delete", r, void 0, d), u;
      },
      clear() {
        const r = m(this), o = r.size !== 0, i = process.env.NODE_ENV !== "production" ? Ee(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
        return o && ne(
          r,
          "clear",
          void 0,
          void 0,
          i
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Sr(r, e, t);
  }), n;
}
function Rt(e, t) {
  const n = Dr(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    S(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Pr = {
  get: /* @__PURE__ */ Rt(!1, !1)
}, Cr = {
  get: /* @__PURE__ */ Rt(!0, !1)
}, Rr = {
  get: /* @__PURE__ */ Rt(!0, !0)
};
function tn(e, t, n) {
  const s = m(n);
  if (s !== n && t.call(e, s)) {
    const r = dn(e);
    G(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const bn = /* @__PURE__ */ new WeakMap(), Vr = /* @__PURE__ */ new WeakMap(), xn = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ new WeakMap();
function Ir(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Tr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ir(dn(e));
}
function Sn(e) {
  return ee(e) ? e : Vt(
    e,
    !1,
    br,
    Pr,
    bn
  );
}
function Dn(e) {
  return Vt(
    e,
    !0,
    xr,
    Cr,
    xn
  );
}
function Le(e) {
  return Vt(
    e,
    !0,
    Or,
    Rr,
    On
  );
}
function Vt(e, t, n, s, r) {
  if (!T(e))
    return process.env.NODE_ENV !== "production" && G(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = Tr(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function de(e) {
  return ee(e) ? de(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ee(e) {
  return !!(e && e.__v_isReadonly);
}
function M(e) {
  return !!(e && e.__v_isShallow);
}
function Ue(e) {
  return e ? !!e.__v_raw : !1;
}
function m(e) {
  const t = e && e.__v_raw;
  return t ? m(t) : e;
}
function Pn(e) {
  return !S(e, "__v_skip") && Object.isExtensible(e) && cr(e, "__v_skip", !0), e;
}
const R = (e) => T(e) ? Sn(e) : e, _t = (e) => T(e) ? Dn(e) : e;
function $(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function I(e) {
  return Mr(e, !1);
}
function Mr(e, t) {
  return $(e) ? e : new $r(e, t);
}
class $r {
  constructor(t, n) {
    this.dep = new Ct(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : m(t), this._value = n ? t : R(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || M(t) || ee(t);
    t = s ? t : m(t), oe(t, n) && (this._rawValue = t, this._value = s ? t : R(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function mt(e) {
  return $(e) ? e.value : e;
}
const Ar = {
  get: (e, t, n) => t === "__v_raw" ? e : mt(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return $(r) && !$(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Hr(e) {
  return de(e) ? e : new Proxy(e, Ar);
}
class Lr {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ct(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ce - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    w !== this)
      return hn(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return _n(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && G("Write operation failed: computed value is readonly");
  }
}
function Fr(e, t, n = !1) {
  let s, r;
  D(e) ? s = e : (s = e.get, r = e.set);
  const o = new Lr(s, r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (o.onTrack = t.onTrack, o.onTrigger = t.onTrigger), o;
}
const Fe = {}, Ye = /* @__PURE__ */ new WeakMap();
let ue;
function jr(e, t = !1, n = ue) {
  if (n) {
    let s = Ye.get(n);
    s || Ye.set(n, s = []), s.push(e);
  } else
    process.env.NODE_ENV !== "production" && !t && G(
      "onWatcherCleanup() was called when there was no active watcher to associate with."
    );
}
function zr(e, t, n = z) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: c, call: a } = n, d = (v) => {
    (n.onWarn || G)(
      "Invalid watch source: ",
      v,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = (v) => r ? v : M(v) || r === !1 || r === 0 ? re(v, 1) : re(v);
  let l, f, h, p, E = !1, x = !1;
  if ($(e) ? (f = () => e.value, E = M(e)) : de(e) ? (f = () => u(e), E = !0) : N(e) ? (x = !0, E = e.some((v) => de(v) || M(v)), f = () => e.map((v) => {
    if ($(v))
      return v.value;
    if (de(v))
      return u(v);
    if (D(v))
      return a ? a(v, 2) : v();
    process.env.NODE_ENV !== "production" && d(v);
  })) : D(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
    if (h) {
      Me();
      try {
        h();
      } finally {
        $e();
      }
    }
    const v = ue;
    ue = l;
    try {
      return a ? a(e, 3, [p]) : e(p);
    } finally {
      ue = v;
    }
  } : (f = me, process.env.NODE_ENV !== "production" && d(e)), t && r) {
    const v = f, j = r === !0 ? 1 / 0 : r;
    f = () => re(v(), j);
  }
  const b = hr(), C = () => {
    l.stop(), b && b.active && kn(b.effects, l);
  };
  if (o && t) {
    const v = t;
    t = (...j) => {
      v(...j), C();
    };
  }
  let O = x ? new Array(e.length).fill(Fe) : Fe;
  const H = (v) => {
    if (!(!(l.flags & 1) || !l.dirty && !v))
      if (t) {
        const j = l.run();
        if (r || E || (x ? j.some((Z, B) => oe(Z, O[B])) : oe(j, O))) {
          h && h();
          const Z = ue;
          ue = l;
          try {
            const B = [
              j,
              // pass undefined as the old value when it's changed for the first time
              O === Fe ? void 0 : x && O[0] === Fe ? [] : O,
              p
            ];
            a ? a(t, 3, B) : (
              // @ts-expect-error
              t(...B)
            ), O = j;
          } finally {
            ue = Z;
          }
        }
      } else
        l.run();
  };
  return c && c(H), l = new gr(f), l.scheduler = i ? () => i(H, !1) : H, p = (v) => jr(v, !1, l), h = l.onStop = () => {
    const v = Ye.get(l);
    if (v) {
      if (a)
        a(v, 4);
      else
        for (const j of v)
          j();
      Ye.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? H(!0) : O = l.run() : i ? i(H.bind(null, !0), !0) : l.run(), C.pause = l.pause.bind(l), C.resume = l.resume.bind(l), C.stop = C, C;
}
function re(e, t = 1 / 0, n) {
  if (t <= 0 || !T(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, $(e))
    re(e.value, t, n);
  else if (N(e))
    for (let s = 0; s < e.length; s++)
      re(e[s], t, n);
  else if (tr(e) || Ee(e))
    e.forEach((s) => {
      re(s, t, n);
    });
  else if (sr(e)) {
    for (const s in e)
      re(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && re(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const pe = [];
function Wr(e) {
  pe.push(e);
}
function Kr() {
  pe.pop();
}
let it = !1;
function y(e, ...t) {
  if (it)
    return;
  it = !0, Me();
  const n = pe.length ? pe[pe.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Ur();
  if (s)
    et(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${qn(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...Yr(r)), console.warn(...o);
  }
  $e(), it = !1;
}
function Ur() {
  let e = pe[pe.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function Yr(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Jr(n));
  }), t;
}
function Jr({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${qn(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...Br(e.props), o] : [r + o];
}
function Br(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Cn(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Cn(e, t, n) {
  return F(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : $(t) ? (t = Cn(e, m(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : D(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = m(t), n ? t : [`${e}=`, t]);
}
const It = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function et(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Mt(r, t, n);
  }
}
function Tt(e, t, n, s) {
  if (D(e)) {
    const r = et(e, t, n, s);
    return r && nr(r) && r.catch((o) => {
      Mt(o, t, n);
    }), r;
  }
  if (N(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Tt(e[o], t, n, s));
    return r;
  } else
    process.env.NODE_ENV !== "production" && y(
      `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
    );
}
function Mt(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || z;
  if (t) {
    let c = t.parent;
    const a = t.proxy, d = process.env.NODE_ENV !== "production" ? It[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const u = c.ec;
      if (u) {
        for (let l = 0; l < u.length; l++)
          if (u[l](e, a, d) === !1)
            return;
      }
      c = c.parent;
    }
    if (o) {
      Me(), et(o, null, 10, [
        e,
        a,
        d
      ]), $e();
      return;
    }
  }
  qr(e, n, r, s, i);
}
function qr(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = It[t];
    if (n && Wr(n), y(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && Kr(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const W = [];
let k = -1;
const we = [];
let te = null, ge = 0;
const Rn = /* @__PURE__ */ Promise.resolve();
let Je = null;
const Gr = 100;
function Zr(e) {
  const t = Je || Rn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Xr(e) {
  let t = k + 1, n = W.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = W[s], o = Ve(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function $t(e) {
  if (!(e.flags & 1)) {
    const t = Ve(e), n = W[W.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Ve(n) ? W.push(e) : W.splice(Xr(t), 0, e), e.flags |= 1, Vn();
  }
}
function Vn() {
  Je || (Je = Rn.then(Tn));
}
function In(e) {
  N(e) ? we.push(...e) : te && e.id === -1 ? te.splice(ge + 1, 0, e) : e.flags & 1 || (we.push(e), e.flags |= 1), Vn();
}
function Qr(e) {
  if (we.length) {
    const t = [...new Set(we)].sort(
      (n, s) => Ve(n) - Ve(s)
    );
    if (we.length = 0, te) {
      te.push(...t);
      return;
    }
    for (te = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ge = 0; ge < te.length; ge++) {
      const n = te[ge];
      process.env.NODE_ENV !== "production" && Mn(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    te = null, ge = 0;
  }
}
const Ve = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Tn(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Mn(e, n) : me;
  try {
    for (k = 0; k < W.length; k++) {
      const n = W[k];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), et(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; k < W.length; k++) {
      const n = W[k];
      n && (n.flags &= -2);
    }
    k = -1, W.length = 0, Qr(e), Je = null, (W.length || we.length) && Tn(e);
  }
}
function Mn(e, t) {
  const n = e.get(t) || 0;
  if (n > Gr) {
    const s = t.i, r = s && zt(s.type);
    return Mt(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const ct = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Qe().__VUE_HMR_RUNTIME__ = {
  createRecord: lt(kr),
  rerender: lt(es),
  reload: lt(ts)
});
const Be = /* @__PURE__ */ new Map();
function kr(e, t) {
  return Be.has(e) ? !1 : (Be.set(e, {
    initialDef: qe(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function qe(e) {
  return Gn(e) ? e.__vccOpts : e;
}
function es(e, t) {
  const n = Be.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, qe(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function ts(e, t) {
  const n = Be.get(e);
  if (!n)
    return;
  t = qe(t), nn(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = qe(o.type);
    let c = ct.get(i);
    c || (i !== n.initialDef && nn(i, t), ct.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? $t(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  In(() => {
    ct.clear();
  });
}
function nn(e, t) {
  A(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function lt(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let ve, je = [];
function $n(e, t) {
  var n, s;
  ve = e, ve ? (ve.enabled = !0, je.forEach(({ event: r, args: o }) => ve.emit(r, ...o)), je = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    $n(o, t);
  }), setTimeout(() => {
    ve || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, je = []);
  }, 3e3)) : je = [];
}
let q = null, ns = null;
const rs = (e) => e.__isTeleport;
function An(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, An(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Hn(e, t) {
  return D(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => A({ name: e.name }, t, { setup: e }))()
  ) : e;
}
Qe().requestIdleCallback;
Qe().cancelIdleCallback;
function ss(e, t, n = ie, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      Me();
      const c = Bn(n), a = Tt(t, n, e, i);
      return c(), $e(), a;
    });
    return s ? r.unshift(o) : r.push(o), o;
  } else if (process.env.NODE_ENV !== "production") {
    const r = ir(It[e].replace(/ hook$/, ""));
    y(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Ln = (e) => (t, n = ie) => {
  (!Ie || e === "sp") && ss(e, (...s) => t(...s), n);
}, At = Ln("m"), Ht = Ln(
  "bum"
), Et = "components", Fn = Symbol.for("v-ndc");
function os(e) {
  return F(e) ? is(Et, e, !1) || e : e || Fn;
}
function is(e, t, n = !0, s = !1) {
  const r = ie;
  if (r) {
    const o = r.type;
    if (e === Et) {
      const c = zt(
        o,
        !1
      );
      if (c && (c === t || c === Ke(t) || c === De(Ke(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      rn(r[e] || o[e], t) || // global registration
      rn(r.appContext[e], t)
    );
    if (!i && s)
      return o;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const c = e === Et ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      y(`Failed to resolve ${e.slice(0, -1)}: ${t}${c}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && y(
      `resolve${De(e.slice(0, -1))} can only be used in render() or setup().`
    );
}
function rn(e, t) {
  return e && (e[t] || e[Ke(t)] || e[De(Ke(t))]);
}
function cs(e, t, n, s) {
  let r;
  const o = n && n[s], i = N(e);
  if (i || F(e)) {
    const c = i && de(e);
    let a = !1;
    c && (a = !M(e), e = ke(e)), r = new Array(e.length);
    for (let d = 0, u = e.length; d < u; d++)
      r[d] = t(
        a ? R(e[d]) : e[d],
        d,
        void 0,
        o && o[d]
      );
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && y(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let c = 0; c < e; c++)
      r[c] = t(c + 1, c, void 0, o && o[c]);
  } else if (T(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (c, a) => t(c, a, void 0, o && o[a])
      );
    else {
      const c = Object.keys(e);
      r = new Array(c.length);
      for (let a = 0, d = c.length; a < d; a++) {
        const u = c[a];
        r[a] = t(e[u], u, a, o && o[a]);
      }
    }
  else
    r = [];
  return n && (n[s] = r), r;
}
const wt = (e) => e ? Ms(e) ? $s(e) : wt(e.parent) : null, Oe = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ A(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Le(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Le(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Le(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Le(e.refs) : e.refs,
    $parent: (e) => wt(e.parent),
    $root: (e) => wt(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => us(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      $t(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Zr.bind(e.proxy)),
    $watch: (e) => ys.bind(e)
  })
), ls = (e) => e === "_" || e === "$", at = (e, t) => e !== z && !e.__isScriptSetup && S(e, t), as = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let d;
    if (t[0] !== "$") {
      const h = i[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (at(s, t))
          return i[t] = 1, s[t];
        if (r !== z && S(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && S(d, t)
        )
          return i[t] = 3, o[t];
        if (n !== z && S(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const u = Oe[t];
    let l, f;
    if (u)
      return t === "$attrs" ? (P(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && P(e, "get", t), u(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== z && S(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, S(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && q && (!F(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== z && ls(t[0]) && S(r, t) ? y(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === q && y(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return at(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && S(r, t) ? (y(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== z && S(s, t) ? (s[t] = n, !0) : S(e.props, t) ? (process.env.NODE_ENV !== "production" && y(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && y(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== z && S(e, i) || at(t, i) || (c = o[0]) && S(c, i) || S(s, i) || S(Oe, i) || S(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : S(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (as.ownKeys = (e) => (y(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function sn(e) {
  return N(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function us(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (d) => Ge(a, d, i, !0)
  ), Ge(a, t, i)), T(t) && o.set(t, a), a;
}
function Ge(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Ge(e, o, n, !0), r && r.forEach(
    (i) => Ge(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && y(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = fs[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const fs = {
  data: on,
  props: ln,
  emits: ln,
  // objects
  methods: Ne,
  computed: Ne,
  // lifecycle
  beforeCreate: V,
  created: V,
  beforeMount: V,
  mounted: V,
  beforeUpdate: V,
  updated: V,
  beforeDestroy: V,
  beforeUnmount: V,
  destroyed: V,
  unmounted: V,
  activated: V,
  deactivated: V,
  errorCaptured: V,
  serverPrefetch: V,
  // assets
  components: Ne,
  directives: Ne,
  // watch
  watch: ps,
  // provide / inject
  provide: on,
  inject: ds
};
function on(e, t) {
  return t ? e ? function() {
    return A(
      D(e) ? e.call(this, this) : e,
      D(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ds(e, t) {
  return Ne(cn(e), cn(t));
}
function cn(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function V(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ne(e, t) {
  return e ? A(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ln(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : A(
    /* @__PURE__ */ Object.create(null),
    sn(e),
    sn(t ?? {})
  ) : t;
}
function ps(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = A(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = V(e[s], t[s]);
  return n;
}
let hs = null;
function gs(e, t, n = !1) {
  const s = ie || q;
  if (s || hs) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && D(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && y(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && y("inject() can only be used inside setup() or functional components.");
}
const vs = {}, jn = (e) => Object.getPrototypeOf(e) === vs, _s = xs, ms = Symbol.for("v-scx"), Es = () => {
  {
    const e = gs(ms);
    return e || process.env.NODE_ENV !== "production" && y(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function ws(e, t, n = z) {
  const { immediate: s, deep: r, flush: o, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && y(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && y(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && y(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = A({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = y);
  const a = t && s || !t && o !== "post";
  let d;
  if (Ie) {
    if (o === "sync") {
      const h = Es();
      d = h.__watcherHandles || (h.__watcherHandles = []);
    } else if (!a) {
      const h = () => {
      };
      return h.stop = me, h.resume = me, h.pause = me, h;
    }
  }
  const u = ie;
  c.call = (h, p, E) => Tt(h, u, p, E);
  let l = !1;
  o === "post" ? c.scheduler = (h) => {
    _s(h, u && u.suspense);
  } : o !== "sync" && (l = !0, c.scheduler = (h, p) => {
    p ? h() : $t(h);
  }), c.augmentJob = (h) => {
    t && (h.flags |= 4), l && (h.flags |= 2, u && (h.id = u.uid, h.i = u));
  };
  const f = zr(e, t, c);
  return Ie && (d ? d.push(f) : a && f()), f;
}
function ys(e, t, n) {
  const s = this.proxy, r = F(e) ? e.includes(".") ? Ns(s, e) : () => s[e] : e.bind(s, s);
  let o;
  D(t) ? o = t : (o = t.handler, n = t);
  const i = Bn(this), c = ws(r, o.bind(s), n);
  return i(), c;
}
function Ns(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const bs = (e) => e.__isSuspense;
function xs(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : In(e);
}
const Lt = Symbol.for("v-fgt"), Os = Symbol.for("v-txt"), yt = Symbol.for("v-cmt"), ze = [];
let Y = null;
function Se(e = !1) {
  ze.push(Y = e ? null : []);
}
function Ss() {
  ze.pop(), Y = ze[ze.length - 1] || null;
}
function zn(e) {
  return e.dynamicChildren = Y || Xn, Ss(), Y && Y.push(e), e;
}
function ut(e, t, n, s, r, o) {
  return zn(
    Un(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Wn(e, t, n, s, r) {
  return zn(
    Ft(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Ds(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Ps = (...e) => Yn(
  ...e
), Kn = ({ key: e }) => e ?? null, We = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? F(e) || $(e) || D(e) ? { i: q, r: e, k: t, f: !!n } : e : null);
function Un(e, t = null, n = null, s = 0, r = null, o = e === Lt ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Kn(t),
    ref: t && We(t),
    scopeId: ns,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: q
  };
  return c ? (jt(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= F(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && y("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  Y && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Y.push(a), a;
}
const Ft = process.env.NODE_ENV !== "production" ? Ps : Yn;
function Yn(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Fn) && (process.env.NODE_ENV !== "production" && !e && y(`Invalid vnode type when creating vnode: ${e}.`), e = yt), Ds(e)) {
    const c = Ze(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && jt(c, n), !o && Y && (c.shapeFlag & 6 ? Y[Y.indexOf(e)] = c : Y.push(c)), c.patchFlag = -2, c;
  }
  if (Gn(e) && (e = e.__vccOpts), t) {
    t = Cs(t);
    let { class: c, style: a } = t;
    c && !F(c) && (t.class = Ot(c)), T(a) && (Ue(a) && !N(a) && (a = A({}, a)), t.style = Pe(a));
  }
  const i = F(e) ? 1 : bs(e) ? 128 : rs(e) ? 64 : T(e) ? 4 : D(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Ue(e) && (e = m(e), y(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Un(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function Cs(e) {
  return e ? Ue(e) || jn(e) ? A({}, e) : e : null;
}
function Ze(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, d = t ? Is(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Kn(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? N(o) ? o.concat(We(t)) : [o, We(t)] : We(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && N(c) ? c.map(Jn) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Lt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ze(e.ssContent),
    ssFallback: e.ssFallback && Ze(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && An(
    u,
    a.clone(u)
  ), u;
}
function Jn(e) {
  const t = Ze(e);
  return N(e.children) && (t.children = e.children.map(Jn)), t;
}
function Rs(e = " ", t = 0) {
  return Ft(Os, null, e, t);
}
function Vs(e = "", t = !1) {
  return t ? (Se(), Wn(yt, null, e)) : Ft(yt, null, e);
}
function jt(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (N(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), jt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !jn(t) ? t._ctx = q : r === 3 && q && (q.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    D(t) ? (t = { default: t, _ctx: q }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Rs(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Is(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Ot([t.class, s.class]));
      else if (r === "style")
        t.style = Pe([t.style, s.style]);
      else if (Qn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(N(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
let ie = null;
const Ts = () => ie || q;
let Nt;
{
  const e = Qe(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  Nt = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ie = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Ie = n
  );
}
const Bn = (e) => {
  const t = ie;
  return Nt(e), e.scope.on(), () => {
    e.scope.off(), Nt(t);
  };
};
function Ms(e) {
  return e.vnode.shapeFlag & 4;
}
let Ie = !1;
process.env.NODE_ENV;
function $s(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Hr(Pn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Oe)
        return Oe[n](e);
    },
    has(t, n) {
      return n in t || n in Oe;
    }
  })) : e.proxy;
}
const As = /(?:^|[-_])(\w)/g, Hs = (e) => e.replace(As, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function zt(e, t = !0) {
  return D(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function qn(e, t, n = !1) {
  let s = zt(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? Hs(s) : n ? "App" : "Anonymous";
}
function Gn(e) {
  return D(e) && "__vccOpts" in e;
}
const K = (e, t) => {
  const n = Fr(e, t, Ie);
  if (process.env.NODE_ENV !== "production") {
    const s = Ts();
    s && s.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Ls() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      return T(l) ? l.__isVue ? ["div", e, "VueInstance"] : $(l) ? [
        "div",
        {},
        ["span", e, u(l)],
        "<",
        // avoid debugger accessing value affecting behavior
        c("_value" in l ? l._value : l),
        ">"
      ] : de(l) ? [
        "div",
        {},
        ["span", e, M(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${ee(l) ? " (readonly)" : ""}`
      ] : ee(l) ? [
        "div",
        {},
        ["span", e, M(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i("props", m(l.props))), l.setupState !== z && f.push(i("setup", l.setupState)), l.data !== z && f.push(i("data", m(l.data)));
    const h = a(l, "computed");
    h && f.push(i("computed", h));
    const p = a(l, "inject");
    return p && f.push(i("injected", p)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function i(l, f) {
    return f = A({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((h) => [
          "div",
          {},
          ["span", s, h + ": "],
          c(f[h], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, f = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : T(l) ? ["object", { object: f ? m(l) : l }] : ["span", n, String(l)];
  }
  function a(l, f) {
    const h = l.type;
    if (D(h))
      return;
    const p = {};
    for (const E in l.ctx)
      d(h, E, f) && (p[E] = l.ctx[E]);
    return p;
  }
  function d(l, f, h) {
    const p = l[h];
    if (N(p) && p.includes(f) || T(p) && f in p || l.extends && d(l.extends, f, h) || l.mixins && l.mixins.some((E) => d(E, f, h)))
      return !0;
  }
  function u(l) {
    return M(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Fs() {
  Ls();
}
process.env.NODE_ENV !== "production" && Fs();
let an = !1, ft;
const ce = () => (an || (ft = pr(!0).run(() => ({
  /** Whether any drag operation is currently active */
  isDragging: K(
    () => ft.draggingElements.value.length > 0
  ),
  /** Active container where dragging occurs */
  activeContainer: {
    /** Component instance of active container */
    component: I(null),
    /** DOM reference of active container */
    ref: I(null)
  },
  /** All registered draggable elements */
  elements: I([]),
  /** Elements currently being dragged */
  draggingElements: I([]),
  /** Elements currently selected (for multi-drag) */
  selectedElements: I([]),
  /** All registered drop zones */
  zones: I([]),
  /** Current hover states */
  hovered: {
    /** Currently hovered drop zone */
    zone: I(null),
    /** Currently hovered draggable element */
    element: I(null)
  },
  /** Pointer position tracking */
  pointerPosition: {
    /** Current pointer coordinates */
    current: I(null),
    /** Initial coordinates when drag started */
    start: I(null),
    /** Offset from start position */
    offset: {
      /** Offset as percentage of container */
      percent: I(null),
      /** Offset in pixels */
      pixel: I(null)
    }
  }
})), an = !0), ft), js = () => {
  const e = I(null), { draggingElements: t, pointerPosition: n, isDragging: s, activeContainer: r } = ce();
  return At(() => {
    r.ref = e;
  }), Ht(() => {
    r.ref.value = null;
  }), {
    elementRef: e,
    draggingElements: t,
    pointerPosition: n,
    isDragging: s
  };
}, zs = ["innerHTML"], Ws = /* @__PURE__ */ Hn({
  __name: "DefaultOverlay",
  setup(e) {
    const { elementRef: t, pointerPosition: n, isDragging: s, draggingElements: r } = js(), o = K(() => {
      var i, c, a, d;
      return {
        transform: `translate3d(${(((i = n.current.value) == null ? void 0 : i.x) ?? 0) - (((c = n.offset.pixel.value) == null ? void 0 : c.x) ?? 0)}px, ${(((a = n.current.value) == null ? void 0 : a.y) ?? 0) - (((d = n.offset.pixel.value) == null ? void 0 : d.y) ?? 0)}px, 0)`,
        zIndex: 1e3,
        position: "fixed",
        top: 0,
        left: 0,
        transition: "0.3s cubic-bezier(0.165, 0.84, 0.44, 1)"
      };
    });
    return (i, c) => mt(s) ? (Se(), ut("div", {
      key: 0,
      ref_key: "elementRef",
      ref: t,
      style: Pe(o.value)
    }, [
      (Se(!0), ut(Lt, null, cs(mt(r), (a, d) => {
        var u, l;
        return Se(), ut("div", {
          key: d,
          innerHTML: a.initialHTML,
          style: Pe({
            width: `${(u = a.initialRect) == null ? void 0 : u.width}px`,
            height: `${(l = a.initialRect) == null ? void 0 : l.height}px`
          })
        }, null, 12, zs);
      }), 128))
    ], 4)) : Vs("", !0);
  }
}), Zs = /* @__PURE__ */ Hn({
  __name: "DragOverlay",
  setup(e) {
    const { activeContainer: t } = ce(), n = K(
      () => t.component.value ?? Ws
    );
    return (s, r) => (Se(), Wn(os(n.value)));
  }
}), Ks = "data-dnd-draggable", Us = (e) => {
  const {
    elements: t,
    draggingElements: n,
    hovered: s,
    selectedElements: r,
    isDragging: o
  } = ce(), i = I(null), c = K(
    () => {
      var f;
      return ((f = s.element.value) == null ? void 0 : f.node) === i.value;
    }
  ), a = K(
    () => n.value.some((f) => f.node === i.value)
  ), d = K(() => {
    if (!i.value || !o.value)
      return !1;
    const f = t.value.find(
      (h) => h.node === i.value
    );
    return f != null && f.groups.length ? !n.value.some((h) => h.groups.length ? !h.groups.some(
      (p) => f.groups.includes(p)
    ) : !1) : !0;
  });
  return {
    elementRef: i,
    registerElement: () => {
      if (!i.value)
        throw new Error("ElementRef is not set");
      t.value.push({
        node: i.value,
        groups: (e == null ? void 0 : e.groups) ?? [],
        layer: (e == null ? void 0 : e.layer) ?? null,
        defaultLayer: (e == null ? void 0 : e.layer) ?? null,
        events: (e == null ? void 0 : e.events) ?? {},
        data: (e == null ? void 0 : e.data) ?? void 0
      }), i.value.setAttribute(Ks, "true");
    },
    unregisterElement: () => {
      const f = t.value.findIndex(
        (p) => p.node === i.value
      );
      f !== -1 && t.value.splice(f, 1);
      const h = r.value.findIndex(
        (p) => p.node === i.value
      );
      h !== -1 && r.value.splice(h, 1);
    },
    isDragging: a,
    isOvered: c,
    isAllowed: d
  };
}, Ys = () => {
  let e = "", t = "", n = "";
  const s = () => {
    const i = document.body;
    e = i.style.userSelect, t = i.style.touchAction, n = i.style.overscrollBehavior, i.style.userSelect = "none", i.style.touchAction = "none", i.style.overscrollBehavior = "none", window.addEventListener("contextmenu", o), window.addEventListener("selectstart", o), window.addEventListener("touchstart", o), window.addEventListener("touchmove", o);
  }, r = () => {
    const i = document.body;
    i.style.userSelect = e, i.style.touchAction = t, i.style.overscrollBehavior = n, window.removeEventListener("contextmenu", o), window.removeEventListener("selectstart", o), window.removeEventListener("touchstart", o), window.removeEventListener("touchmove", o);
  }, o = (i) => i.preventDefault();
  return {
    disableInteractions: s,
    enableInteractions: r
  };
}, un = (e, t) => e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y, _e = (e) => {
  if (!e)
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0
    };
  const t = e.getBoundingClientRect();
  return {
    bottom: t.bottom,
    left: t.left,
    right: t.right,
    top: t.top,
    x: t.x,
    y: t.y,
    width: t.width,
    height: t.height
  };
}, dt = (e) => ({
  x: e.x + e.width / 2,
  y: e.y + e.height / 2
}), Js = (e, t) => {
  const n = _e(e);
  return {
    pixel: {
      x: t.x - n.x,
      y: t.y - n.y
    },
    percent: {
      x: (t.x - n.x) / n.width * 100,
      y: (t.y - n.y) / n.height * 100
    }
  };
}, fn = (e, t) => {
  const n = t.x - e.x, s = t.y - e.y;
  return Math.sqrt(n * n + s * s);
}, se = (e, t) => e ? t.contains(e) : !1, Bs = (e) => {
  const t = ce();
  return {
    onPointerStart: (o) => {
      t.pointerPosition.start.value = { x: o.clientX, y: o.clientY }, t.pointerPosition.current.value = {
        x: o.clientX,
        y: o.clientY
      };
      const { pixel: i, percent: c } = Js(e.value, {
        x: o.clientX,
        y: o.clientY
      });
      t.pointerPosition.offset.pixel.value = i, t.pointerPosition.offset.percent.value = c;
    },
    onPointerMove: (o) => {
      t.pointerPosition.current.value = {
        x: o.clientX,
        y: o.clientY
      };
    },
    onPointerEnd: () => {
      t.pointerPosition.current.value = null, t.pointerPosition.start.value = null, t.pointerPosition.offset.pixel.value = null, t.pointerPosition.offset.percent.value = null;
    }
  };
}, qs = (e) => {
  const t = ce(), { onPointerStart: n, onPointerMove: s, onPointerEnd: r } = Bs(e);
  let o = null;
  const i = (p) => {
    var b, C;
    const E = t.selectedElements.value.some(
      (O) => O.node === p
    );
    if (t.selectedElements.value.length && E)
      return t.selectedElements.value.map((O) => {
        var H, v;
        return {
          ...O,
          initialHTML: ((H = O.node) == null ? void 0 : H.outerHTML) ?? "",
          initialRect: (v = O.node) == null ? void 0 : v.getBoundingClientRect()
        };
      });
    t.selectedElements.value = [];
    const x = t.elements.value.find(
      (O) => O.node === p
    );
    return x ? [
      {
        ...x,
        initialHTML: ((b = x.node) == null ? void 0 : b.outerHTML) ?? "",
        initialRect: (C = x.node) == null ? void 0 : C.getBoundingClientRect()
      }
    ] : [];
  }, c = (p, E) => {
    const x = Math.max(
      0,
      Math.min(p.x + p.width, E.x + E.width) - Math.max(p.x, E.x)
    ), b = Math.max(
      0,
      Math.min(p.y + p.height, E.y + E.height) - Math.max(p.y, E.y)
    ), C = x * b, O = p.width * p.height, H = E.width * E.height;
    return (C / O * 100 + C / H * 100) / 2;
  }, a = () => {
    var Wt, Kt, Ut, Yt, Jt, Bt, qt, Gt, Zt, Xt;
    const p = _e(t.activeContainer.ref.value), E = dt(p), x = ((Wt = t.pointerPosition.current.value) == null ? void 0 : Wt.x) ?? 0, b = ((Kt = t.pointerPosition.current.value) == null ? void 0 : Kt.y) ?? 0, O = !(p && x >= p.x && x <= p.x + p.width && b >= p.y && b <= p.y + p.height), H = t.draggingElements.value.map((g) => g.node), v = t.elements.value.filter((g) => {
      if (!g.node || H.some(
        (U) => U && se(g.node, U)
      ) || g.groups.length && !!t.draggingElements.value.some(
        (X) => X.groups.length ? !X.groups.some(
          (le) => g.groups.includes(le)
        ) : !1
      ))
        return !1;
      const _ = _e(g.node);
      return _ && p && un(_, p);
    }).map((g) => {
      const _ = _e(g.node), U = dt(_), X = x >= _.x && x <= _.x + _.width && b >= _.y && b <= _.y + _.height, le = c(_, p), tt = fn(E, U), nt = t.elements.value.filter(
        (ae) => ae !== g && ae.node && g.node && se(
          g.node,
          ae.node
        )
      ).length;
      return {
        element: g,
        isPointerInElement: X,
        overlapPercent: le,
        depth: nt,
        centerDistance: tt
      };
    }).sort((g, _) => {
      if (!O) {
        if (g.isPointerInElement && _.isPointerInElement)
          return _.depth - g.depth;
        if (g.isPointerInElement !== _.isPointerInElement)
          return g.isPointerInElement ? -1 : 1;
      }
      return Math.abs(g.overlapPercent - _.overlapPercent) <= 1 ? g.centerDistance - _.centerDistance : _.overlapPercent - g.overlapPercent;
    }), j = t.zones.value.filter((g) => {
      if (!g.node || H.some(
        (U) => U && se(g.node, U)
      ) || g.groups.length && !!t.draggingElements.value.some((X) => X.groups.length ? !X.groups.some((le) => g.groups.includes(le)) : !1))
        return !1;
      const _ = _e(g.node);
      return _ && p && un(_, p);
    }).map((g) => {
      const _ = _e(g.node), U = dt(_), X = x >= _.x && x <= _.x + _.width && b >= _.y && b <= _.y + _.height, le = c(_, p), tt = fn(E, U), nt = t.zones.value.filter(
        (ae) => ae !== g && ae.node && g.node && se(g.node, ae.node)
      ).length;
      return {
        zone: g,
        isPointerInElement: X,
        overlapPercent: le,
        depth: nt,
        centerDistance: tt
      };
    }).sort((g, _) => {
      if (!O) {
        if (g.isPointerInElement && _.isPointerInElement)
          return _.depth - g.depth;
        if (g.isPointerInElement !== _.isPointerInElement)
          return g.isPointerInElement ? -1 : 1;
      }
      return Math.abs(g.overlapPercent - _.overlapPercent) <= 1 ? g.centerDistance - _.centerDistance : _.overlapPercent - g.overlapPercent;
    }), Z = t.hovered.element.value, B = t.hovered.zone.value;
    t.hovered.element.value = ((Ut = v[0]) == null ? void 0 : Ut.element) ?? null, t.hovered.zone.value = ((Yt = j[0]) == null ? void 0 : Yt.zone) ?? null, t.hovered.element.value !== Z && ((Jt = Z == null ? void 0 : Z.events) != null && Jt.onLeave && Z.events.onLeave(t), (qt = (Bt = t.hovered.element.value) == null ? void 0 : Bt.events) != null && qt.onHover && t.hovered.element.value.events.onHover(t)), t.hovered.zone.value !== B && ((Gt = B == null ? void 0 : B.events) != null && Gt.onLeave && B.events.onLeave(t), (Xt = (Zt = t.hovered.zone.value) == null ? void 0 : Zt.events) != null && Xt.onHover && t.hovered.zone.value.events.onHover(t)), o = requestAnimationFrame(a);
  }, d = () => {
    a();
  }, u = () => {
    o !== null && (cancelAnimationFrame(o), o = null);
  };
  return {
    activate: (p) => {
      t.draggingElements.value = i(e.value), n(p), d();
    },
    track: (p) => {
      s(p);
    },
    deactivate: () => {
      var p, E;
      r(), t.hovered.zone.value ? (E = (p = t.hovered.zone.value.events).onDrop) == null || E.call(p, t) : t.draggingElements.value.forEach(
        (x) => {
          var b, C;
          return (C = (b = x.events).onEnd) == null ? void 0 : C.call(b, t);
        }
      ), t.draggingElements.value = [], t.selectedElements.value = [], t.hovered.zone.value = null, t.hovered.element.value = null, u();
    }
  };
}, Xs = (e) => {
  const {
    elementRef: t,
    registerElement: n,
    unregisterElement: s,
    isDragging: r,
    isOvered: o,
    isAllowed: i
  } = Us(e), { disableInteractions: c, enableInteractions: a } = Ys(), d = ce(), { activate: u, track: l, deactivate: f } = qs(t), h = (b) => {
    e != null && e.container && (d.activeContainer.component.value = Pn(e.container)), c(), u(b), document.addEventListener("pointermove", p), document.addEventListener("pointerup", x), document.addEventListener("wheel", E);
  }, p = (b) => {
    l(b);
  }, E = (b) => {
    l(b);
  }, x = () => {
    d.activeContainer.component.value = null, a(), f(), document.removeEventListener("pointermove", p), document.removeEventListener("pointerup", x), document.removeEventListener("wheel", E);
  };
  return At(n), Ht(s), {
    pointerPosition: d.pointerPosition,
    elementRef: t,
    isDragging: r,
    isOvered: o,
    isAllowed: i,
    handleDragStart: h
  };
}, Gs = (e) => {
  const { zones: t, hovered: n, draggingElements: s, isDragging: r } = ce(), o = I(null), i = K(() => {
    var u;
    return ((u = n.zone.value) == null ? void 0 : u.node) === o.value;
  }), c = K(() => {
    if (!o.value || !r.value)
      return !1;
    const u = t.value.find(
      (l) => l.node === o.value
    );
    return u != null && u.groups.length ? !s.value.some((l) => l.groups.length ? !l.groups.some(
      (f) => u.groups.includes(f)
    ) : !1) : !0;
  });
  return { elementRef: o, registerZone: () => {
    if (!o.value)
      throw new Error("elementRef is not set");
    t.value.push({
      node: o.value,
      groups: (e == null ? void 0 : e.groups) ?? [],
      events: (e == null ? void 0 : e.events) ?? {},
      data: (e == null ? void 0 : e.data) ?? void 0
    }), o.value.setAttribute("data-dnd-droppable", "true");
  }, unregisterZone: () => {
    if (!o.value)
      throw new Error("elementRef is not set");
    const u = t.value.findIndex(
      (l) => l.node === o.value
    );
    u !== -1 && t.value.splice(u, 1);
  }, isOvered: i, isAllowed: c };
}, Qs = (e) => {
  const { elementRef: t, registerZone: n, unregisterZone: s, isOvered: r, isAllowed: o } = Gs(e);
  return At(n), Ht(s), { elementRef: t, isOvered: r, isAllowed: o };
}, ks = (e) => {
  const { selectedElements: t, elements: n } = ce(), s = K(
    () => n.value.find((u) => u.node === e.value)
  ), r = K(
    () => t.value.some((u) => u.node === e.value)
  ), o = K(() => e.value ? t.value.some(
    (u) => u.node && se(
      u.node,
      e.value
    )
  ) : !1), i = K(() => e.value ? t.value.some(
    (u) => u.node && se(
      e.value,
      u.node
    )
  ) : !1), c = () => {
    s.value && (t.value = t.value.filter(
      (u) => u.node !== e.value
    ));
  }, a = () => {
    s.value && (o.value && (t.value = t.value.filter(
      (u) => u.node && !se(
        u.node,
        e.value
      )
    )), i.value && (t.value = t.value.filter(
      (u) => u.node && !se(
        e.value,
        u.node
      )
    )), t.value.push(s.value));
  };
  return {
    handleUnselect: c,
    handleSelect: a,
    handleToggleSelect: () => {
      s.value && (t.value.some((u) => u.node === e.value) ? c() : a());
    },
    isSelected: r,
    isParentOfSelected: o
  };
};
export {
  Zs as DragOverlay,
  ce as useDnDStore,
  Xs as useDraggable,
  Qs as useDroppable,
  ks as useSelection
};
