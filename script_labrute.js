// ==UserScript==
// @name         brute-odds
// @namespace    https://github.com/Kirsan98/brute-odds
// @version      1.0.0
// @description  Probabilite de victoire en arene sur LaBrute
// @match        https://brute.eternaltwin.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key2 of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key2) && key2 !== except)
          __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // vendor/labrute/prisma/runtime/index-browser.js
  var require_index_browser = __commonJS({
    "vendor/labrute/prisma/runtime/index-browser.js"(exports, module) {
      "use strict";
      var pe = Object.defineProperty;
      var Xe = Object.getOwnPropertyDescriptor;
      var Ke = Object.getOwnPropertyNames;
      var Qe = Object.prototype.hasOwnProperty;
      var Ye = (e) => {
        throw TypeError(e);
      };
      var Oe = (e, n) => {
        for (var i in n) pe(e, i, { get: n[i], enumerable: true });
      };
      var xe = (e, n, i, t) => {
        if (n && typeof n == "object" || typeof n == "function") for (let r of Ke(n)) !Qe.call(e, r) && r !== i && pe(e, r, { get: () => n[r], enumerable: !(t = Xe(n, r)) || t.enumerable });
        return e;
      };
      var ze = (e) => xe(pe({}, "__esModule", { value: true }), e);
      var ne = (e, n, i) => n.has(e) ? Ye("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i);
      var ii = {};
      Oe(ii, { Decimal: () => Je, Public: () => ge, getRuntime: () => _e, makeStrictEnum: () => qe, objectEnumValues: () => Ae });
      module.exports = ze(ii);
      var ge = {};
      Oe(ge, { validator: () => Re });
      function Re(...e) {
        return (n) => n;
      }
      var ie = /* @__PURE__ */ Symbol();
      var me = /* @__PURE__ */ new WeakMap();
      var we = class {
        constructor(n) {
          n === ie ? me.set(this, "Prisma.".concat(this._getName())) : me.set(this, "new Prisma.".concat(this._getNamespace(), ".").concat(this._getName(), "()"));
        }
        _getName() {
          return this.constructor.name;
        }
        toString() {
          return me.get(this);
        }
      };
      var G = class extends we {
        _getNamespace() {
          return "NullTypes";
        }
      };
      var Ne;
      var J = class extends G {
        constructor() {
          super(...arguments);
          ne(this, Ne);
        }
      };
      Ne = /* @__PURE__ */ new WeakMap();
      ke(J, "DbNull");
      var ve;
      var X = class extends G {
        constructor() {
          super(...arguments);
          ne(this, ve);
        }
      };
      ve = /* @__PURE__ */ new WeakMap();
      ke(X, "JsonNull");
      var Ee;
      var K = class extends G {
        constructor() {
          super(...arguments);
          ne(this, Ee);
        }
      };
      Ee = /* @__PURE__ */ new WeakMap();
      ke(K, "AnyNull");
      var Ae = { classes: { DbNull: J, JsonNull: X, AnyNull: K }, instances: { DbNull: new J(ie), JsonNull: new X(ie), AnyNull: new K(ie) } };
      function ke(e, n) {
        Object.defineProperty(e, "name", { value: n, configurable: true });
      }
      var ye = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
      function qe(e) {
        return new Proxy(e, { get(n, i) {
          if (i in n) return n[i];
          if (!ye.has(i)) throw new TypeError("Invalid enum value: ".concat(String(i)));
        } });
      }
      var en = () => {
        var e, n;
        return ((n = (e = globalThis.process) == null ? void 0 : e.release) == null ? void 0 : n.name) === "node";
      };
      var nn = () => {
        var e, n;
        return !!globalThis.Bun || !!((n = (e = globalThis.process) == null ? void 0 : e.versions) != null && n.bun);
      };
      var tn = () => !!globalThis.Deno;
      var rn = () => typeof globalThis.Netlify == "object";
      var sn = () => typeof globalThis.EdgeRuntime == "object";
      var on = () => {
        var e;
        return ((e = globalThis.navigator) == null ? void 0 : e.userAgent) === "Cloudflare-Workers";
      };
      function un() {
        var i;
        return (i = [[rn, "netlify"], [sn, "edge-light"], [on, "workerd"], [tn, "deno"], [nn, "bun"], [en, "node"]].flatMap((t) => t[0]() ? [t[1]] : []).at(0)) != null ? i : "";
      }
      var fn = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
      function _e() {
        let e = un();
        return { id: e, prettyName: fn[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
      }
      var V = 9e15;
      var H = 1e9;
      var Se = "0123456789abcdef";
      var se = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
      var oe = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
      var Me = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -V, maxE: V, crypto: false };
      var Le;
      var Z2;
      var w = true;
      var fe = "[DecimalError] ";
      var $ = fe + "Invalid argument: ";
      var Ie = fe + "Precision limit exceeded";
      var Ze = fe + "crypto unavailable";
      var Ue = "[object Decimal]";
      var R = Math.floor;
      var C = Math.pow;
      var cn = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
      var ln = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
      var an = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
      var Be = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
      var D = 1e7;
      var m = 7;
      var dn = 9007199254740991;
      var hn = se.length - 1;
      var Ce = oe.length - 1;
      var h = { toStringTag: Ue };
      h.absoluteValue = h.abs = function() {
        var e = new this.constructor(this);
        return e.s < 0 && (e.s = 1), p(e);
      };
      h.ceil = function() {
        return p(new this.constructor(this), this.e + 1, 2);
      };
      h.clampedTo = h.clamp = function(e, n) {
        var i, t = this, r = t.constructor;
        if (e = new r(e), n = new r(n), !e.s || !n.s) return new r(NaN);
        if (e.gt(n)) throw Error($ + n);
        return i = t.cmp(e), i < 0 ? e : t.cmp(n) > 0 ? n : new r(t);
      };
      h.comparedTo = h.cmp = function(e) {
        var n, i, t, r, s = this, o = s.d, u = (e = new s.constructor(e)).d, c = s.s, f = e.s;
        if (!o || !u) return !c || !f ? NaN : c !== f ? c : o === u ? 0 : !o ^ c < 0 ? 1 : -1;
        if (!o[0] || !u[0]) return o[0] ? c : u[0] ? -f : 0;
        if (c !== f) return c;
        if (s.e !== e.e) return s.e > e.e ^ c < 0 ? 1 : -1;
        for (t = o.length, r = u.length, n = 0, i = t < r ? t : r; n < i; ++n) if (o[n] !== u[n]) return o[n] > u[n] ^ c < 0 ? 1 : -1;
        return t === r ? 0 : t > r ^ c < 0 ? 1 : -1;
      };
      h.cosine = h.cos = function() {
        var e, n, i = this, t = i.constructor;
        return i.d ? i.d[0] ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = pn(t, We(t, i)), t.precision = e, t.rounding = n, p(Z2 == 2 || Z2 == 3 ? i.neg() : i, e, n, true)) : new t(1) : new t(NaN);
      };
      h.cubeRoot = h.cbrt = function() {
        var e, n, i, t, r, s, o, u, c, f, l = this, a = l.constructor;
        if (!l.isFinite() || l.isZero()) return new a(l);
        for (w = false, s = l.s * C(l.s * l, 1 / 3), !s || Math.abs(s) == 1 / 0 ? (i = b(l.d), e = l.e, (s = (e - i.length + 1) % 3) && (i += s == 1 || s == -2 ? "0" : "00"), s = C(i, 1 / 3), e = R((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), s == 1 / 0 ? i = "5e" + e : (i = s.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + e), t = new a(i), t.s = l.s) : t = new a(s.toString()), o = (e = a.precision) + 3; ; ) if (u = t, c = u.times(u).times(u), f = c.plus(l), t = k(f.plus(l).times(u), f.plus(c), o + 2, 1), b(u.d).slice(0, o) === (i = b(t.d)).slice(0, o)) if (i = i.slice(o - 3, o + 1), i == "9999" || !r && i == "4999") {
          if (!r && (p(u, e + 1, 0), u.times(u).times(u).eq(l))) {
            t = u;
            break;
          }
          o += 4, r = 1;
        } else {
          (!+i || !+i.slice(1) && i.charAt(0) == "5") && (p(t, e + 1, 1), n = !t.times(t).times(t).eq(l));
          break;
        }
        return w = true, p(t, e, a.rounding, n);
      };
      h.decimalPlaces = h.dp = function() {
        var e, n = this.d, i = NaN;
        if (n) {
          if (e = n.length - 1, i = (e - R(this.e / m)) * m, e = n[e], e) for (; e % 10 == 0; e /= 10) i--;
          i < 0 && (i = 0);
        }
        return i;
      };
      h.dividedBy = h.div = function(e) {
        return k(this, new this.constructor(e));
      };
      h.dividedToIntegerBy = h.divToInt = function(e) {
        var n = this, i = n.constructor;
        return p(k(n, new i(e), 0, 1, 1), i.precision, i.rounding);
      };
      h.equals = h.eq = function(e) {
        return this.cmp(e) === 0;
      };
      h.floor = function() {
        return p(new this.constructor(this), this.e + 1, 3);
      };
      h.greaterThan = h.gt = function(e) {
        return this.cmp(e) > 0;
      };
      h.greaterThanOrEqualTo = h.gte = function(e) {
        var n = this.cmp(e);
        return n == 1 || n === 0;
      };
      h.hyperbolicCosine = h.cosh = function() {
        var e, n, i, t, r, s = this, o = s.constructor, u = new o(1);
        if (!s.isFinite()) return new o(s.s ? 1 / 0 : NaN);
        if (s.isZero()) return u;
        i = o.precision, t = o.rounding, o.precision = i + Math.max(s.e, s.sd()) + 4, o.rounding = 1, r = s.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / le(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), s = j(o, 1, s.times(n), new o(1), true);
        for (var c, f = e, l = new o(8); f--; ) c = s.times(s), s = u.minus(c.times(l.minus(c.times(l))));
        return p(s, o.precision = i, o.rounding = t, true);
      };
      h.hyperbolicSine = h.sinh = function() {
        var e, n, i, t, r = this, s = r.constructor;
        if (!r.isFinite() || r.isZero()) return new s(r);
        if (n = s.precision, i = s.rounding, s.precision = n + Math.max(r.e, r.sd()) + 4, s.rounding = 1, t = r.d.length, t < 3) r = j(s, 2, r, r, true);
        else {
          e = 1.4 * Math.sqrt(t), e = e > 16 ? 16 : e | 0, r = r.times(1 / le(5, e)), r = j(s, 2, r, r, true);
          for (var o, u = new s(5), c = new s(16), f = new s(20); e--; ) o = r.times(r), r = r.times(u.plus(o.times(c.times(o).plus(f))));
        }
        return s.precision = n, s.rounding = i, p(r, n, i, true);
      };
      h.hyperbolicTangent = h.tanh = function() {
        var e, n, i = this, t = i.constructor;
        return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 7, t.rounding = 1, k(i.sinh(), i.cosh(), t.precision = e, t.rounding = n)) : new t(i.s);
      };
      h.inverseCosine = h.acos = function() {
        var e = this, n = e.constructor, i = e.abs().cmp(1), t = n.precision, r = n.rounding;
        return i !== -1 ? i === 0 ? e.isNeg() ? F(n, t, r) : new n(0) : new n(NaN) : e.isZero() ? F(n, t + 4, r).times(0.5) : (n.precision = t + 6, n.rounding = 1, e = new n(1).minus(e).div(e.plus(1)).sqrt().atan(), n.precision = t, n.rounding = r, e.times(2));
      };
      h.inverseHyperbolicCosine = h.acosh = function() {
        var e, n, i = this, t = i.constructor;
        return i.lte(1) ? new t(i.eq(1) ? 0 : NaN) : i.isFinite() ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(Math.abs(i.e), i.sd()) + 4, t.rounding = 1, w = false, i = i.times(i).minus(1).sqrt().plus(i), w = true, t.precision = e, t.rounding = n, i.ln()) : new t(i);
      };
      h.inverseHyperbolicSine = h.asinh = function() {
        var e, n, i = this, t = i.constructor;
        return !i.isFinite() || i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 2 * Math.max(Math.abs(i.e), i.sd()) + 6, t.rounding = 1, w = false, i = i.times(i).plus(1).sqrt().plus(i), w = true, t.precision = e, t.rounding = n, i.ln());
      };
      h.inverseHyperbolicTangent = h.atanh = function() {
        var e, n, i, t, r = this, s = r.constructor;
        return r.isFinite() ? r.e >= 0 ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = s.precision, n = s.rounding, t = r.sd(), Math.max(t, e) < 2 * -r.e - 1 ? p(new s(r), e, n, true) : (s.precision = i = t - r.e, r = k(r.plus(1), new s(1).minus(r), i + e, 1), s.precision = e + 4, s.rounding = 1, r = r.ln(), s.precision = e, s.rounding = n, r.times(0.5))) : new s(NaN);
      };
      h.inverseSine = h.asin = function() {
        var e, n, i, t, r = this, s = r.constructor;
        return r.isZero() ? new s(r) : (n = r.abs().cmp(1), i = s.precision, t = s.rounding, n !== -1 ? n === 0 ? (e = F(s, i + 4, t).times(0.5), e.s = r.s, e) : new s(NaN) : (s.precision = i + 6, s.rounding = 1, r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(), s.precision = i, s.rounding = t, r.times(2)));
      };
      h.inverseTangent = h.atan = function() {
        var e, n, i, t, r, s, o, u, c, f = this, l = f.constructor, a = l.precision, d = l.rounding;
        if (f.isFinite()) {
          if (f.isZero()) return new l(f);
          if (f.abs().eq(1) && a + 4 <= Ce) return o = F(l, a + 4, d).times(0.25), o.s = f.s, o;
        } else {
          if (!f.s) return new l(NaN);
          if (a + 4 <= Ce) return o = F(l, a + 4, d).times(0.5), o.s = f.s, o;
        }
        for (l.precision = u = a + 10, l.rounding = 1, i = Math.min(28, u / m + 2 | 0), e = i; e; --e) f = f.div(f.times(f).plus(1).sqrt().plus(1));
        for (w = false, n = Math.ceil(u / m), t = 1, c = f.times(f), o = new l(f), r = f; e !== -1; ) if (r = r.times(c), s = o.minus(r.div(t += 2)), r = r.times(c), o = s.plus(r.div(t += 2)), o.d[n] !== void 0) for (e = n; o.d[e] === s.d[e] && e--; ) ;
        return i && (o = o.times(2 << i - 1)), w = true, p(o, l.precision = a, l.rounding = d, true);
      };
      h.isFinite = function() {
        return !!this.d;
      };
      h.isInteger = h.isInt = function() {
        return !!this.d && R(this.e / m) > this.d.length - 2;
      };
      h.isNaN = function() {
        return !this.s;
      };
      h.isNegative = h.isNeg = function() {
        return this.s < 0;
      };
      h.isPositive = h.isPos = function() {
        return this.s > 0;
      };
      h.isZero = function() {
        return !!this.d && this.d[0] === 0;
      };
      h.lessThan = h.lt = function(e) {
        return this.cmp(e) < 0;
      };
      h.lessThanOrEqualTo = h.lte = function(e) {
        return this.cmp(e) < 1;
      };
      h.logarithm = h.log = function(e) {
        var n, i, t, r, s, o, u, c, f = this, l = f.constructor, a = l.precision, d = l.rounding, g = 5;
        if (e == null) e = new l(10), n = true;
        else {
          if (e = new l(e), i = e.d, e.s < 0 || !i || !i[0] || e.eq(1)) return new l(NaN);
          n = e.eq(10);
        }
        if (i = f.d, f.s < 0 || !i || !i[0] || f.eq(1)) return new l(i && !i[0] ? -1 / 0 : f.s != 1 ? NaN : i ? 0 : 1 / 0);
        if (n) if (i.length > 1) s = true;
        else {
          for (r = i[0]; r % 10 === 0; ) r /= 10;
          s = r !== 1;
        }
        if (w = false, u = a + g, o = B(f, u), t = n ? ue(l, u + 10) : B(e, u), c = k(o, t, u, 1), Q(c.d, r = a, d)) do
          if (u += 10, o = B(f, u), t = n ? ue(l, u + 10) : B(e, u), c = k(o, t, u, 1), !s) {
            +b(c.d).slice(r + 1, r + 15) + 1 == 1e14 && (c = p(c, a + 1, 0));
            break;
          }
        while (Q(c.d, r += 10, d));
        return w = true, p(c, a, d);
      };
      h.minus = h.sub = function(e) {
        var n, i, t, r, s, o, u, c, f, l, a, d, g = this, v = g.constructor;
        if (e = new v(e), !g.d || !e.d) return !g.s || !e.s ? e = new v(NaN) : g.d ? e.s = -e.s : e = new v(e.d || g.s !== e.s ? g : NaN), e;
        if (g.s != e.s) return e.s = -e.s, g.plus(e);
        if (f = g.d, d = e.d, u = v.precision, c = v.rounding, !f[0] || !d[0]) {
          if (d[0]) e.s = -e.s;
          else if (f[0]) e = new v(g);
          else return new v(c === 3 ? -0 : 0);
          return w ? p(e, u, c) : e;
        }
        if (i = R(e.e / m), l = R(g.e / m), f = f.slice(), s = l - i, s) {
          for (a = s < 0, a ? (n = f, s = -s, o = d.length) : (n = d, i = l, o = f.length), t = Math.max(Math.ceil(u / m), o) + 2, s > t && (s = t, n.length = 1), n.reverse(), t = s; t--; ) n.push(0);
          n.reverse();
        } else {
          for (t = f.length, o = d.length, a = t < o, a && (o = t), t = 0; t < o; t++) if (f[t] != d[t]) {
            a = f[t] < d[t];
            break;
          }
          s = 0;
        }
        for (a && (n = f, f = d, d = n, e.s = -e.s), o = f.length, t = d.length - o; t > 0; --t) f[o++] = 0;
        for (t = d.length; t > s; ) {
          if (f[--t] < d[t]) {
            for (r = t; r && f[--r] === 0; ) f[r] = D - 1;
            --f[r], f[t] += D;
          }
          f[t] -= d[t];
        }
        for (; f[--o] === 0; ) f.pop();
        for (; f[0] === 0; f.shift()) --i;
        return f[0] ? (e.d = f, e.e = ce(f, i), w ? p(e, u, c) : e) : new v(c === 3 ? -0 : 0);
      };
      h.modulo = h.mod = function(e) {
        var n, i = this, t = i.constructor;
        return e = new t(e), !i.d || !e.s || e.d && !e.d[0] ? new t(NaN) : !e.d || i.d && !i.d[0] ? p(new t(i), t.precision, t.rounding) : (w = false, t.modulo == 9 ? (n = k(i, e.abs(), 0, 3, 1), n.s *= e.s) : n = k(i, e, 0, t.modulo, 1), n = n.times(e), w = true, i.minus(n));
      };
      h.naturalExponential = h.exp = function() {
        return be(this);
      };
      h.naturalLogarithm = h.ln = function() {
        return B(this);
      };
      h.negated = h.neg = function() {
        var e = new this.constructor(this);
        return e.s = -e.s, p(e);
      };
      h.plus = h.add = function(e) {
        var n, i, t, r, s, o, u, c, f, l, a = this, d = a.constructor;
        if (e = new d(e), !a.d || !e.d) return !a.s || !e.s ? e = new d(NaN) : a.d || (e = new d(e.d || a.s === e.s ? a : NaN)), e;
        if (a.s != e.s) return e.s = -e.s, a.minus(e);
        if (f = a.d, l = e.d, u = d.precision, c = d.rounding, !f[0] || !l[0]) return l[0] || (e = new d(a)), w ? p(e, u, c) : e;
        if (s = R(a.e / m), t = R(e.e / m), f = f.slice(), r = s - t, r) {
          for (r < 0 ? (i = f, r = -r, o = l.length) : (i = l, t = s, o = f.length), s = Math.ceil(u / m), o = s > o ? s + 1 : o + 1, r > o && (r = o, i.length = 1), i.reverse(); r--; ) i.push(0);
          i.reverse();
        }
        for (o = f.length, r = l.length, o - r < 0 && (r = o, i = l, l = f, f = i), n = 0; r; ) n = (f[--r] = f[r] + l[r] + n) / D | 0, f[r] %= D;
        for (n && (f.unshift(n), ++t), o = f.length; f[--o] == 0; ) f.pop();
        return e.d = f, e.e = ce(f, t), w ? p(e, u, c) : e;
      };
      h.precision = h.sd = function(e) {
        var n, i = this;
        if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error($ + e);
        return i.d ? (n = $e(i.d), e && i.e + 1 > n && (n = i.e + 1)) : n = NaN, n;
      };
      h.round = function() {
        var e = this, n = e.constructor;
        return p(new n(e), e.e + 1, n.rounding);
      };
      h.sine = h.sin = function() {
        var e, n, i = this, t = i.constructor;
        return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = mn(t, We(t, i)), t.precision = e, t.rounding = n, p(Z2 > 2 ? i.neg() : i, e, n, true)) : new t(NaN);
      };
      h.squareRoot = h.sqrt = function() {
        var e, n, i, t, r, s, o = this, u = o.d, c = o.e, f = o.s, l = o.constructor;
        if (f !== 1 || !u || !u[0]) return new l(!f || f < 0 && (!u || u[0]) ? NaN : u ? o : 1 / 0);
        for (w = false, f = Math.sqrt(+o), f == 0 || f == 1 / 0 ? (n = b(u), (n.length + c) % 2 == 0 && (n += "0"), f = Math.sqrt(n), c = R((c + 1) / 2) - (c < 0 || c % 2), f == 1 / 0 ? n = "5e" + c : (n = f.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + c), t = new l(n)) : t = new l(f.toString()), i = (c = l.precision) + 3; ; ) if (s = t, t = s.plus(k(o, s, i + 2, 1)).times(0.5), b(s.d).slice(0, i) === (n = b(t.d)).slice(0, i)) if (n = n.slice(i - 3, i + 1), n == "9999" || !r && n == "4999") {
          if (!r && (p(s, c + 1, 0), s.times(s).eq(o))) {
            t = s;
            break;
          }
          i += 4, r = 1;
        } else {
          (!+n || !+n.slice(1) && n.charAt(0) == "5") && (p(t, c + 1, 1), e = !t.times(t).eq(o));
          break;
        }
        return w = true, p(t, c, l.rounding, e);
      };
      h.tangent = h.tan = function() {
        var e, n, i = this, t = i.constructor;
        return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 10, t.rounding = 1, i = i.sin(), i.s = 1, i = k(i, new t(1).minus(i.times(i)).sqrt(), e + 10, 0), t.precision = e, t.rounding = n, p(Z2 == 2 || Z2 == 4 ? i.neg() : i, e, n, true)) : new t(NaN);
      };
      h.times = h.mul = function(e) {
        var n, i, t, r, s, o, u, c, f, l = this, a = l.constructor, d = l.d, g = (e = new a(e)).d;
        if (e.s *= l.s, !d || !d[0] || !g || !g[0]) return new a(!e.s || d && !d[0] && !g || g && !g[0] && !d ? NaN : !d || !g ? e.s / 0 : e.s * 0);
        for (i = R(l.e / m) + R(e.e / m), c = d.length, f = g.length, c < f && (s = d, d = g, g = s, o = c, c = f, f = o), s = [], o = c + f, t = o; t--; ) s.push(0);
        for (t = f; --t >= 0; ) {
          for (n = 0, r = c + t; r > t; ) u = s[r] + g[t] * d[r - t - 1] + n, s[r--] = u % D | 0, n = u / D | 0;
          s[r] = (s[r] + n) % D | 0;
        }
        for (; !s[--o]; ) s.pop();
        return n ? ++i : s.shift(), e.d = s, e.e = ce(s, i), w ? p(e, a.precision, a.rounding) : e;
      };
      h.toBinary = function(e, n) {
        return Pe(this, 2, e, n);
      };
      h.toDecimalPlaces = h.toDP = function(e, n) {
        var i = this, t = i.constructor;
        return i = new t(i), e === void 0 ? i : (q(e, 0, H), n === void 0 ? n = t.rounding : q(n, 0, 8), p(i, e + i.e + 1, n));
      };
      h.toExponential = function(e, n) {
        var i, t = this, r = t.constructor;
        return e === void 0 ? i = L(t, true) : (q(e, 0, H), n === void 0 ? n = r.rounding : q(n, 0, 8), t = p(new r(t), e + 1, n), i = L(t, true, e + 1)), t.isNeg() && !t.isZero() ? "-" + i : i;
      };
      h.toFixed = function(e, n) {
        var i, t, r = this, s = r.constructor;
        return e === void 0 ? i = L(r) : (q(e, 0, H), n === void 0 ? n = s.rounding : q(n, 0, 8), t = p(new s(r), e + r.e + 1, n), i = L(t, false, e + t.e + 1)), r.isNeg() && !r.isZero() ? "-" + i : i;
      };
      h.toFraction = function(e) {
        var n, i, t, r, s, o, u, c, f, l, a, d, g = this, v = g.d, N = g.constructor;
        if (!v) return new N(g);
        if (f = i = new N(1), t = c = new N(0), n = new N(t), s = n.e = $e(v) - g.e - 1, o = s % m, n.d[0] = C(10, o < 0 ? m + o : o), e == null) e = s > 0 ? n : f;
        else {
          if (u = new N(e), !u.isInt() || u.lt(f)) throw Error($ + u);
          e = u.gt(n) ? s > 0 ? n : f : u;
        }
        for (w = false, u = new N(b(v)), l = N.precision, N.precision = s = v.length * m * 2; a = k(u, n, 0, 1, 1), r = i.plus(a.times(t)), r.cmp(e) != 1; ) i = t, t = r, r = f, f = c.plus(a.times(r)), c = r, r = n, n = u.minus(a.times(r)), u = r;
        return r = k(e.minus(i), t, 0, 1, 1), c = c.plus(r.times(f)), i = i.plus(r.times(t)), c.s = f.s = g.s, d = k(f, t, s, 1).minus(g).abs().cmp(k(c, i, s, 1).minus(g).abs()) < 1 ? [f, t] : [c, i], N.precision = l, w = true, d;
      };
      h.toHexadecimal = h.toHex = function(e, n) {
        return Pe(this, 16, e, n);
      };
      h.toNearest = function(e, n) {
        var i = this, t = i.constructor;
        if (i = new t(i), e == null) {
          if (!i.d) return i;
          e = new t(1), n = t.rounding;
        } else {
          if (e = new t(e), n === void 0 ? n = t.rounding : q(n, 0, 8), !i.d) return e.s ? i : e;
          if (!e.d) return e.s && (e.s = i.s), e;
        }
        return e.d[0] ? (w = false, i = k(i, e, 0, n, 1).times(e), w = true, p(i)) : (e.s = i.s, i = e), i;
      };
      h.toNumber = function() {
        return +this;
      };
      h.toOctal = function(e, n) {
        return Pe(this, 8, e, n);
      };
      h.toPower = h.pow = function(e) {
        var n, i, t, r, s, o, u = this, c = u.constructor, f = +(e = new c(e));
        if (!u.d || !e.d || !u.d[0] || !e.d[0]) return new c(C(+u, f));
        if (u = new c(u), u.eq(1)) return u;
        if (t = c.precision, s = c.rounding, e.eq(1)) return p(u, t, s);
        if (n = R(e.e / m), n >= e.d.length - 1 && (i = f < 0 ? -f : f) <= dn) return r = He(c, u, i, t), e.s < 0 ? new c(1).div(r) : p(r, t, s);
        if (o = u.s, o < 0) {
          if (n < e.d.length - 1) return new c(NaN);
          if ((e.d[n] & 1) == 0 && (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1) return u.s = o, u;
        }
        return i = C(+u, f), n = i == 0 || !isFinite(i) ? R(f * (Math.log("0." + b(u.d)) / Math.LN10 + u.e + 1)) : new c(i + "").e, n > c.maxE + 1 || n < c.minE - 1 ? new c(n > 0 ? o / 0 : 0) : (w = false, c.rounding = u.s = 1, i = Math.min(12, (n + "").length), r = be(e.times(B(u, t + i)), t), r.d && (r = p(r, t + 5, 1), Q(r.d, t, s) && (n = t + 10, r = p(be(e.times(B(u, n + i)), n), n + 5, 1), +b(r.d).slice(t + 1, t + 15) + 1 == 1e14 && (r = p(r, t + 1, 0)))), r.s = o, w = true, c.rounding = s, p(r, t, s));
      };
      h.toPrecision = function(e, n) {
        var i, t = this, r = t.constructor;
        return e === void 0 ? i = L(t, t.e <= r.toExpNeg || t.e >= r.toExpPos) : (q(e, 1, H), n === void 0 ? n = r.rounding : q(n, 0, 8), t = p(new r(t), e, n), i = L(t, e <= t.e || t.e <= r.toExpNeg, e)), t.isNeg() && !t.isZero() ? "-" + i : i;
      };
      h.toSignificantDigits = h.toSD = function(e, n) {
        var i = this, t = i.constructor;
        return e === void 0 ? (e = t.precision, n = t.rounding) : (q(e, 1, H), n === void 0 ? n = t.rounding : q(n, 0, 8)), p(new t(i), e, n);
      };
      h.toString = function() {
        var e = this, n = e.constructor, i = L(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
        return e.isNeg() && !e.isZero() ? "-" + i : i;
      };
      h.truncated = h.trunc = function() {
        return p(new this.constructor(this), this.e + 1, 1);
      };
      h.valueOf = h.toJSON = function() {
        var e = this, n = e.constructor, i = L(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
        return e.isNeg() ? "-" + i : i;
      };
      function b(e) {
        var n, i, t, r = e.length - 1, s = "", o = e[0];
        if (r > 0) {
          for (s += o, n = 1; n < r; n++) t = e[n] + "", i = m - t.length, i && (s += U(i)), s += t;
          o = e[n], t = o + "", i = m - t.length, i && (s += U(i));
        } else if (o === 0) return "0";
        for (; o % 10 === 0; ) o /= 10;
        return s + o;
      }
      function q(e, n, i) {
        if (e !== ~~e || e < n || e > i) throw Error($ + e);
      }
      function Q(e, n, i, t) {
        var r, s, o, u;
        for (s = e[0]; s >= 10; s /= 10) --n;
        return --n < 0 ? (n += m, r = 0) : (r = Math.ceil((n + 1) / m), n %= m), s = C(10, m - n), u = e[r] % s | 0, t == null ? n < 3 ? (n == 0 ? u = u / 100 | 0 : n == 1 && (u = u / 10 | 0), o = i < 4 && u == 99999 || i > 3 && u == 49999 || u == 5e4 || u == 0) : o = (i < 4 && u + 1 == s || i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 100 | 0) == C(10, n - 2) - 1 || (u == s / 2 || u == 0) && (e[r + 1] / s / 100 | 0) == 0 : n < 4 ? (n == 0 ? u = u / 1e3 | 0 : n == 1 ? u = u / 100 | 0 : n == 2 && (u = u / 10 | 0), o = (t || i < 4) && u == 9999 || !t && i > 3 && u == 4999) : o = ((t || i < 4) && u + 1 == s || !t && i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 1e3 | 0) == C(10, n - 3) - 1, o;
      }
      function te(e, n, i) {
        for (var t, r = [0], s, o = 0, u = e.length; o < u; ) {
          for (s = r.length; s--; ) r[s] *= n;
          for (r[0] += Se.indexOf(e.charAt(o++)), t = 0; t < r.length; t++) r[t] > i - 1 && (r[t + 1] === void 0 && (r[t + 1] = 0), r[t + 1] += r[t] / i | 0, r[t] %= i);
        }
        return r.reverse();
      }
      function pn(e, n) {
        var i, t, r;
        if (n.isZero()) return n;
        t = n.d.length, t < 32 ? (i = Math.ceil(t / 3), r = (1 / le(4, i)).toString()) : (i = 16, r = "2.3283064365386962890625e-10"), e.precision += i, n = j(e, 1, n.times(r), new e(1));
        for (var s = i; s--; ) {
          var o = n.times(n);
          n = o.times(o).minus(o).times(8).plus(1);
        }
        return e.precision -= i, n;
      }
      var k = /* @__PURE__ */ (function() {
        function e(t, r, s) {
          var o, u = 0, c = t.length;
          for (t = t.slice(); c--; ) o = t[c] * r + u, t[c] = o % s | 0, u = o / s | 0;
          return u && t.unshift(u), t;
        }
        function n(t, r, s, o) {
          var u, c;
          if (s != o) c = s > o ? 1 : -1;
          else for (u = c = 0; u < s; u++) if (t[u] != r[u]) {
            c = t[u] > r[u] ? 1 : -1;
            break;
          }
          return c;
        }
        function i(t, r, s, o) {
          for (var u = 0; s--; ) t[s] -= u, u = t[s] < r[s] ? 1 : 0, t[s] = u * o + t[s] - r[s];
          for (; !t[0] && t.length > 1; ) t.shift();
        }
        return function(t, r, s, o, u, c) {
          var f, l, a, d, g, v, N, A, M, _, E, P, x, I, ae, z, W, de, T, y, ee = t.constructor, he = t.s == r.s ? 1 : -1, O = t.d, S = r.d;
          if (!O || !O[0] || !S || !S[0]) return new ee(!t.s || !r.s || (O ? S && O[0] == S[0] : !S) ? NaN : O && O[0] == 0 || !S ? he * 0 : he / 0);
          for (c ? (g = 1, l = t.e - r.e) : (c = D, g = m, l = R(t.e / g) - R(r.e / g)), T = S.length, W = O.length, M = new ee(he), _ = M.d = [], a = 0; S[a] == (O[a] || 0); a++) ;
          if (S[a] > (O[a] || 0) && l--, s == null ? (I = s = ee.precision, o = ee.rounding) : u ? I = s + (t.e - r.e) + 1 : I = s, I < 0) _.push(1), v = true;
          else {
            if (I = I / g + 2 | 0, a = 0, T == 1) {
              for (d = 0, S = S[0], I++; (a < W || d) && I--; a++) ae = d * c + (O[a] || 0), _[a] = ae / S | 0, d = ae % S | 0;
              v = d || a < W;
            } else {
              for (d = c / (S[0] + 1) | 0, d > 1 && (S = e(S, d, c), O = e(O, d, c), T = S.length, W = O.length), z = T, E = O.slice(0, T), P = E.length; P < T; ) E[P++] = 0;
              y = S.slice(), y.unshift(0), de = S[0], S[1] >= c / 2 && ++de;
              do
                d = 0, f = n(S, E, T, P), f < 0 ? (x = E[0], T != P && (x = x * c + (E[1] || 0)), d = x / de | 0, d > 1 ? (d >= c && (d = c - 1), N = e(S, d, c), A = N.length, P = E.length, f = n(N, E, A, P), f == 1 && (d--, i(N, T < A ? y : S, A, c))) : (d == 0 && (f = d = 1), N = S.slice()), A = N.length, A < P && N.unshift(0), i(E, N, P, c), f == -1 && (P = E.length, f = n(S, E, T, P), f < 1 && (d++, i(E, T < P ? y : S, P, c))), P = E.length) : f === 0 && (d++, E = [0]), _[a++] = d, f && E[0] ? E[P++] = O[z] || 0 : (E = [O[z]], P = 1);
              while ((z++ < W || E[0] !== void 0) && I--);
              v = E[0] !== void 0;
            }
            _[0] || _.shift();
          }
          if (g == 1) M.e = l, Le = v;
          else {
            for (a = 1, d = _[0]; d >= 10; d /= 10) a++;
            M.e = a + l * g - 1, p(M, u ? s + M.e + 1 : s, o, v);
          }
          return M;
        };
      })();
      function p(e, n, i, t) {
        var r, s, o, u, c, f, l, a, d, g = e.constructor;
        e: if (n != null) {
          if (a = e.d, !a) return e;
          for (r = 1, u = a[0]; u >= 10; u /= 10) r++;
          if (s = n - r, s < 0) s += m, o = n, l = a[d = 0], c = l / C(10, r - o - 1) % 10 | 0;
          else if (d = Math.ceil((s + 1) / m), u = a.length, d >= u) if (t) {
            for (; u++ <= d; ) a.push(0);
            l = c = 0, r = 1, s %= m, o = s - m + 1;
          } else break e;
          else {
            for (l = u = a[d], r = 1; u >= 10; u /= 10) r++;
            s %= m, o = s - m + r, c = o < 0 ? 0 : l / C(10, r - o - 1) % 10 | 0;
          }
          if (t = t || n < 0 || a[d + 1] !== void 0 || (o < 0 ? l : l % C(10, r - o - 1)), f = i < 4 ? (c || t) && (i == 0 || i == (e.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (i == 4 || t || i == 6 && (s > 0 ? o > 0 ? l / C(10, r - o) : 0 : a[d - 1]) % 10 & 1 || i == (e.s < 0 ? 8 : 7)), n < 1 || !a[0]) return a.length = 0, f ? (n -= e.e + 1, a[0] = C(10, (m - n % m) % m), e.e = -n || 0) : a[0] = e.e = 0, e;
          if (s == 0 ? (a.length = d, u = 1, d--) : (a.length = d + 1, u = C(10, m - s), a[d] = o > 0 ? (l / C(10, r - o) % C(10, o) | 0) * u : 0), f) for (; ; ) if (d == 0) {
            for (s = 1, o = a[0]; o >= 10; o /= 10) s++;
            for (o = a[0] += u, u = 1; o >= 10; o /= 10) u++;
            s != u && (e.e++, a[0] == D && (a[0] = 1));
            break;
          } else {
            if (a[d] += u, a[d] != D) break;
            a[d--] = 0, u = 1;
          }
          for (s = a.length; a[--s] === 0; ) a.pop();
        }
        return w && (e.e > g.maxE ? (e.d = null, e.e = NaN) : e.e < g.minE && (e.e = 0, e.d = [0])), e;
      }
      function L(e, n, i) {
        if (!e.isFinite()) return je(e);
        var t, r = e.e, s = b(e.d), o = s.length;
        return n ? (i && (t = i - o) > 0 ? s = s.charAt(0) + "." + s.slice(1) + U(t) : o > 1 && (s = s.charAt(0) + "." + s.slice(1)), s = s + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (s = "0." + U(-r - 1) + s, i && (t = i - o) > 0 && (s += U(t))) : r >= o ? (s += U(r + 1 - o), i && (t = i - r - 1) > 0 && (s = s + "." + U(t))) : ((t = r + 1) < o && (s = s.slice(0, t) + "." + s.slice(t)), i && (t = i - o) > 0 && (r + 1 === o && (s += "."), s += U(t))), s;
      }
      function ce(e, n) {
        var i = e[0];
        for (n *= m; i >= 10; i /= 10) n++;
        return n;
      }
      function ue(e, n, i) {
        if (n > hn) throw w = true, i && (e.precision = i), Error(Ie);
        return p(new e(se), n, 1, true);
      }
      function F(e, n, i) {
        if (n > Ce) throw Error(Ie);
        return p(new e(oe), n, i, true);
      }
      function $e(e) {
        var n = e.length - 1, i = n * m + 1;
        if (n = e[n], n) {
          for (; n % 10 == 0; n /= 10) i--;
          for (n = e[0]; n >= 10; n /= 10) i++;
        }
        return i;
      }
      function U(e) {
        for (var n = ""; e--; ) n += "0";
        return n;
      }
      function He(e, n, i, t) {
        var r, s = new e(1), o = Math.ceil(t / m + 4);
        for (w = false; ; ) {
          if (i % 2 && (s = s.times(n), De(s.d, o) && (r = true)), i = R(i / 2), i === 0) {
            i = s.d.length - 1, r && s.d[i] === 0 && ++s.d[i];
            break;
          }
          n = n.times(n), De(n.d, o);
        }
        return w = true, s;
      }
      function Te(e) {
        return e.d[e.d.length - 1] & 1;
      }
      function Ve(e, n, i) {
        for (var t, r, s = new e(n[0]), o = 0; ++o < n.length; ) {
          if (r = new e(n[o]), !r.s) {
            s = r;
            break;
          }
          t = s.cmp(r), (t === i || t === 0 && s.s === i) && (s = r);
        }
        return s;
      }
      function be(e, n) {
        var i, t, r, s, o, u, c, f = 0, l = 0, a = 0, d = e.constructor, g = d.rounding, v = d.precision;
        if (!e.d || !e.d[0] || e.e > 17) return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
        for (n == null ? (w = false, c = v) : c = n, u = new d(0.03125); e.e > -2; ) e = e.times(u), a += 5;
        for (t = Math.log(C(2, a)) / Math.LN10 * 2 + 5 | 0, c += t, i = s = o = new d(1), d.precision = c; ; ) {
          if (s = p(s.times(e), c, 1), i = i.times(++l), u = o.plus(k(s, i, c, 1)), b(u.d).slice(0, c) === b(o.d).slice(0, c)) {
            for (r = a; r--; ) o = p(o.times(o), c, 1);
            if (n == null) if (f < 3 && Q(o.d, c - t, g, f)) d.precision = c += 10, i = s = u = new d(1), l = 0, f++;
            else return p(o, d.precision = v, g, w = true);
            else return d.precision = v, o;
          }
          o = u;
        }
      }
      function B(e, n) {
        var i, t, r, s, o, u, c, f, l, a, d, g = 1, v = 10, N = e, A = N.d, M = N.constructor, _ = M.rounding, E = M.precision;
        if (N.s < 0 || !A || !A[0] || !N.e && A[0] == 1 && A.length == 1) return new M(A && !A[0] ? -1 / 0 : N.s != 1 ? NaN : A ? 0 : N);
        if (n == null ? (w = false, l = E) : l = n, M.precision = l += v, i = b(A), t = i.charAt(0), Math.abs(s = N.e) < 15e14) {
          for (; t < 7 && t != 1 || t == 1 && i.charAt(1) > 3; ) N = N.times(e), i = b(N.d), t = i.charAt(0), g++;
          s = N.e, t > 1 ? (N = new M("0." + i), s++) : N = new M(t + "." + i.slice(1));
        } else return f = ue(M, l + 2, E).times(s + ""), N = B(new M(t + "." + i.slice(1)), l - v).plus(f), M.precision = E, n == null ? p(N, E, _, w = true) : N;
        for (a = N, c = o = N = k(N.minus(1), N.plus(1), l, 1), d = p(N.times(N), l, 1), r = 3; ; ) {
          if (o = p(o.times(d), l, 1), f = c.plus(k(o, new M(r), l, 1)), b(f.d).slice(0, l) === b(c.d).slice(0, l)) if (c = c.times(2), s !== 0 && (c = c.plus(ue(M, l + 2, E).times(s + ""))), c = k(c, new M(g), l, 1), n == null) if (Q(c.d, l - v, _, u)) M.precision = l += v, f = o = N = k(a.minus(1), a.plus(1), l, 1), d = p(N.times(N), l, 1), r = u = 1;
          else return p(c, M.precision = E, _, w = true);
          else return M.precision = E, c;
          c = f, r += 2;
        }
      }
      function je(e) {
        return String(e.s * e.s / 0);
      }
      function re(e, n) {
        var i, t, r;
        for ((i = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (t = n.search(/e/i)) > 0 ? (i < 0 && (i = t), i += +n.slice(t + 1), n = n.substring(0, t)) : i < 0 && (i = n.length), t = 0; n.charCodeAt(t) === 48; t++) ;
        for (r = n.length; n.charCodeAt(r - 1) === 48; --r) ;
        if (n = n.slice(t, r), n) {
          if (r -= t, e.e = i = i - t - 1, e.d = [], t = (i + 1) % m, i < 0 && (t += m), t < r) {
            for (t && e.d.push(+n.slice(0, t)), r -= m; t < r; ) e.d.push(+n.slice(t, t += m));
            n = n.slice(t), t = m - n.length;
          } else t -= r;
          for (; t--; ) n += "0";
          e.d.push(+n), w && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
        } else e.e = 0, e.d = [0];
        return e;
      }
      function gn(e, n) {
        var i, t, r, s, o, u, c, f, l;
        if (n.indexOf("_") > -1) {
          if (n = n.replace(/(\d)_(?=\d)/g, "$1"), Be.test(n)) return re(e, n);
        } else if (n === "Infinity" || n === "NaN") return +n || (e.s = NaN), e.e = NaN, e.d = null, e;
        if (ln.test(n)) i = 16, n = n.toLowerCase();
        else if (cn.test(n)) i = 2;
        else if (an.test(n)) i = 8;
        else throw Error($ + n);
        for (s = n.search(/p/i), s > 0 ? (c = +n.slice(s + 1), n = n.substring(2, s)) : n = n.slice(2), s = n.indexOf("."), o = s >= 0, t = e.constructor, o && (n = n.replace(".", ""), u = n.length, s = u - s, r = He(t, new t(i), s, s * 2)), f = te(n, i, D), l = f.length - 1, s = l; f[s] === 0; --s) f.pop();
        return s < 0 ? new t(e.s * 0) : (e.e = ce(f, l), e.d = f, w = false, o && (e = k(e, r, u * 4)), c && (e = e.times(Math.abs(c) < 54 ? C(2, c) : Y.pow(2, c))), w = true, e);
      }
      function mn(e, n) {
        var i, t = n.d.length;
        if (t < 3) return n.isZero() ? n : j(e, 2, n, n);
        i = 1.4 * Math.sqrt(t), i = i > 16 ? 16 : i | 0, n = n.times(1 / le(5, i)), n = j(e, 2, n, n);
        for (var r, s = new e(5), o = new e(16), u = new e(20); i--; ) r = n.times(n), n = n.times(s.plus(r.times(o.times(r).minus(u))));
        return n;
      }
      function j(e, n, i, t, r) {
        var s, o, u, c, f = 1, l = e.precision, a = Math.ceil(l / m);
        for (w = false, c = i.times(i), u = new e(t); ; ) {
          if (o = k(u.times(c), new e(n++ * n++), l, 1), u = r ? t.plus(o) : t.minus(o), t = k(o.times(c), new e(n++ * n++), l, 1), o = u.plus(t), o.d[a] !== void 0) {
            for (s = a; o.d[s] === u.d[s] && s--; ) ;
            if (s == -1) break;
          }
          s = u, u = t, t = o, o = s, f++;
        }
        return w = true, o.d.length = a + 1, o;
      }
      function le(e, n) {
        for (var i = e; --n; ) i *= e;
        return i;
      }
      function We(e, n) {
        var i, t = n.s < 0, r = F(e, e.precision, 1), s = r.times(0.5);
        if (n = n.abs(), n.lte(s)) return Z2 = t ? 4 : 1, n;
        if (i = n.divToInt(r), i.isZero()) Z2 = t ? 3 : 2;
        else {
          if (n = n.minus(i.times(r)), n.lte(s)) return Z2 = Te(i) ? t ? 2 : 3 : t ? 4 : 1, n;
          Z2 = Te(i) ? t ? 1 : 4 : t ? 3 : 2;
        }
        return n.minus(r).abs();
      }
      function Pe(e, n, i, t) {
        var r, s, o, u, c, f, l, a, d, g = e.constructor, v = i !== void 0;
        if (v ? (q(i, 1, H), t === void 0 ? t = g.rounding : q(t, 0, 8)) : (i = g.precision, t = g.rounding), !e.isFinite()) l = je(e);
        else {
          for (l = L(e), o = l.indexOf("."), v ? (r = 2, n == 16 ? i = i * 4 - 3 : n == 8 && (i = i * 3 - 2)) : r = n, o >= 0 && (l = l.replace(".", ""), d = new g(1), d.e = l.length - o, d.d = te(L(d), 10, r), d.e = d.d.length), a = te(l, 10, r), s = c = a.length; a[--c] == 0; ) a.pop();
          if (!a[0]) l = v ? "0p+0" : "0";
          else {
            if (o < 0 ? s-- : (e = new g(e), e.d = a, e.e = s, e = k(e, d, i, t, 0, r), a = e.d, s = e.e, f = Le), o = a[i], u = r / 2, f = f || a[i + 1] !== void 0, f = t < 4 ? (o !== void 0 || f) && (t === 0 || t === (e.s < 0 ? 3 : 2)) : o > u || o === u && (t === 4 || f || t === 6 && a[i - 1] & 1 || t === (e.s < 0 ? 8 : 7)), a.length = i, f) for (; ++a[--i] > r - 1; ) a[i] = 0, i || (++s, a.unshift(1));
            for (c = a.length; !a[c - 1]; --c) ;
            for (o = 0, l = ""; o < c; o++) l += Se.charAt(a[o]);
            if (v) {
              if (c > 1) if (n == 16 || n == 8) {
                for (o = n == 16 ? 4 : 3, --c; c % o; c++) l += "0";
                for (a = te(l, r, n), c = a.length; !a[c - 1]; --c) ;
                for (o = 1, l = "1."; o < c; o++) l += Se.charAt(a[o]);
              } else l = l.charAt(0) + "." + l.slice(1);
              l = l + (s < 0 ? "p" : "p+") + s;
            } else if (s < 0) {
              for (; ++s; ) l = "0" + l;
              l = "0." + l;
            } else if (++s > c) for (s -= c; s--; ) l += "0";
            else s < c && (l = l.slice(0, s) + "." + l.slice(s));
          }
          l = (n == 16 ? "0x" : n == 2 ? "0b" : n == 8 ? "0o" : "") + l;
        }
        return e.s < 0 ? "-" + l : l;
      }
      function De(e, n) {
        if (e.length > n) return e.length = n, true;
      }
      function wn(e) {
        return new this(e).abs();
      }
      function Nn(e) {
        return new this(e).acos();
      }
      function vn(e) {
        return new this(e).acosh();
      }
      function En(e, n) {
        return new this(e).plus(n);
      }
      function kn(e) {
        return new this(e).asin();
      }
      function Sn(e) {
        return new this(e).asinh();
      }
      function Mn(e) {
        return new this(e).atan();
      }
      function Cn(e) {
        return new this(e).atanh();
      }
      function bn(e, n) {
        e = new this(e), n = new this(n);
        var i, t = this.precision, r = this.rounding, s = t + 4;
        return !e.s || !n.s ? i = new this(NaN) : !e.d && !n.d ? (i = F(this, s, 1).times(n.s > 0 ? 0.25 : 0.75), i.s = e.s) : !n.d || e.isZero() ? (i = n.s < 0 ? F(this, t, r) : new this(0), i.s = e.s) : !e.d || n.isZero() ? (i = F(this, s, 1).times(0.5), i.s = e.s) : n.s < 0 ? (this.precision = s, this.rounding = 1, i = this.atan(k(e, n, s, 1)), n = F(this, s, 1), this.precision = t, this.rounding = r, i = e.s < 0 ? i.minus(n) : i.plus(n)) : i = this.atan(k(e, n, s, 1)), i;
      }
      function Pn(e) {
        return new this(e).cbrt();
      }
      function On(e) {
        return p(e = new this(e), e.e + 1, 2);
      }
      function Rn(e, n, i) {
        return new this(e).clamp(n, i);
      }
      function An(e) {
        if (!e || typeof e != "object") throw Error(fe + "Object expected");
        var n, i, t, r = e.defaults === true, s = ["precision", 1, H, "rounding", 0, 8, "toExpNeg", -V, 0, "toExpPos", 0, V, "maxE", 0, V, "minE", -V, 0, "modulo", 0, 9];
        for (n = 0; n < s.length; n += 3) if (i = s[n], r && (this[i] = Me[i]), (t = e[i]) !== void 0) if (R(t) === t && t >= s[n + 1] && t <= s[n + 2]) this[i] = t;
        else throw Error($ + i + ": " + t);
        if (i = "crypto", r && (this[i] = Me[i]), (t = e[i]) !== void 0) if (t === true || t === false || t === 0 || t === 1) if (t) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[i] = true;
        else throw Error(Ze);
        else this[i] = false;
        else throw Error($ + i + ": " + t);
        return this;
      }
      function qn(e) {
        return new this(e).cos();
      }
      function _n(e) {
        return new this(e).cosh();
      }
      function Ge(e) {
        var n, i, t;
        function r(s) {
          var o, u, c, f = this;
          if (!(f instanceof r)) return new r(s);
          if (f.constructor = r, Fe(s)) {
            f.s = s.s, w ? !s.d || s.e > r.maxE ? (f.e = NaN, f.d = null) : s.e < r.minE ? (f.e = 0, f.d = [0]) : (f.e = s.e, f.d = s.d.slice()) : (f.e = s.e, f.d = s.d ? s.d.slice() : s.d);
            return;
          }
          if (c = typeof s, c === "number") {
            if (s === 0) {
              f.s = 1 / s < 0 ? -1 : 1, f.e = 0, f.d = [0];
              return;
            }
            if (s < 0 ? (s = -s, f.s = -1) : f.s = 1, s === ~~s && s < 1e7) {
              for (o = 0, u = s; u >= 10; u /= 10) o++;
              w ? o > r.maxE ? (f.e = NaN, f.d = null) : o < r.minE ? (f.e = 0, f.d = [0]) : (f.e = o, f.d = [s]) : (f.e = o, f.d = [s]);
              return;
            }
            if (s * 0 !== 0) {
              s || (f.s = NaN), f.e = NaN, f.d = null;
              return;
            }
            return re(f, s.toString());
          }
          if (c === "string") return (u = s.charCodeAt(0)) === 45 ? (s = s.slice(1), f.s = -1) : (u === 43 && (s = s.slice(1)), f.s = 1), Be.test(s) ? re(f, s) : gn(f, s);
          if (c === "bigint") return s < 0 ? (s = -s, f.s = -1) : f.s = 1, re(f, s.toString());
          throw Error($ + s);
        }
        if (r.prototype = h, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = An, r.clone = Ge, r.isDecimal = Fe, r.abs = wn, r.acos = Nn, r.acosh = vn, r.add = En, r.asin = kn, r.asinh = Sn, r.atan = Mn, r.atanh = Cn, r.atan2 = bn, r.cbrt = Pn, r.ceil = On, r.clamp = Rn, r.cos = qn, r.cosh = _n, r.div = Tn, r.exp = Dn, r.floor = Fn, r.hypot = Ln, r.ln = In, r.log = Zn, r.log10 = Bn, r.log2 = Un, r.max = $n, r.min = Hn, r.mod = Vn, r.mul = jn, r.pow = Wn, r.random = Gn, r.round = Jn, r.sign = Xn, r.sin = Kn, r.sinh = Qn, r.sqrt = Yn, r.sub = xn, r.sum = zn, r.tan = yn, r.tanh = ei, r.trunc = ni, e === void 0 && (e = {}), e && e.defaults !== true) for (t = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], n = 0; n < t.length; ) e.hasOwnProperty(i = t[n++]) || (e[i] = this[i]);
        return r.config(e), r;
      }
      function Tn(e, n) {
        return new this(e).div(n);
      }
      function Dn(e) {
        return new this(e).exp();
      }
      function Fn(e) {
        return p(e = new this(e), e.e + 1, 3);
      }
      function Ln() {
        var e, n, i = new this(0);
        for (w = false, e = 0; e < arguments.length; ) if (n = new this(arguments[e++]), n.d) i.d && (i = i.plus(n.times(n)));
        else {
          if (n.s) return w = true, new this(1 / 0);
          i = n;
        }
        return w = true, i.sqrt();
      }
      function Fe(e) {
        return e instanceof Y || e && e.toStringTag === Ue || false;
      }
      function In(e) {
        return new this(e).ln();
      }
      function Zn(e, n) {
        return new this(e).log(n);
      }
      function Un(e) {
        return new this(e).log(2);
      }
      function Bn(e) {
        return new this(e).log(10);
      }
      function $n() {
        return Ve(this, arguments, -1);
      }
      function Hn() {
        return Ve(this, arguments, 1);
      }
      function Vn(e, n) {
        return new this(e).mod(n);
      }
      function jn(e, n) {
        return new this(e).mul(n);
      }
      function Wn(e, n) {
        return new this(e).pow(n);
      }
      function Gn(e) {
        var n, i, t, r, s = 0, o = new this(1), u = [];
        if (e === void 0 ? e = this.precision : q(e, 1, H), t = Math.ceil(e / m), this.crypto) if (crypto.getRandomValues) for (n = crypto.getRandomValues(new Uint32Array(t)); s < t; ) r = n[s], r >= 429e7 ? n[s] = crypto.getRandomValues(new Uint32Array(1))[0] : u[s++] = r % 1e7;
        else if (crypto.randomBytes) {
          for (n = crypto.randomBytes(t *= 4); s < t; ) r = n[s] + (n[s + 1] << 8) + (n[s + 2] << 16) + ((n[s + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(n, s) : (u.push(r % 1e7), s += 4);
          s = t / 4;
        } else throw Error(Ze);
        else for (; s < t; ) u[s++] = Math.random() * 1e7 | 0;
        for (t = u[--s], e %= m, t && e && (r = C(10, m - e), u[s] = (t / r | 0) * r); u[s] === 0; s--) u.pop();
        if (s < 0) i = 0, u = [0];
        else {
          for (i = -1; u[0] === 0; i -= m) u.shift();
          for (t = 1, r = u[0]; r >= 10; r /= 10) t++;
          t < m && (i -= m - t);
        }
        return o.e = i, o.d = u, o;
      }
      function Jn(e) {
        return p(e = new this(e), e.e + 1, this.rounding);
      }
      function Xn(e) {
        return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
      }
      function Kn(e) {
        return new this(e).sin();
      }
      function Qn(e) {
        return new this(e).sinh();
      }
      function Yn(e) {
        return new this(e).sqrt();
      }
      function xn(e, n) {
        return new this(e).sub(n);
      }
      function zn() {
        var e = 0, n = arguments, i = new this(n[e]);
        for (w = false; i.s && ++e < n.length; ) i = i.plus(n[e]);
        return w = true, p(i, this.precision, this.rounding);
      }
      function yn(e) {
        return new this(e).tan();
      }
      function ei(e) {
        return new this(e).tanh();
      }
      function ni(e) {
        return p(e = new this(e), e.e + 1, 1);
      }
      h[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = h.toString;
      h[Symbol.toStringTag] = "Decimal";
      var Y = h.constructor = Ge(Me);
      se = new Y(se);
      oe = new Y(oe);
      var Je = Y;
    }
  });

  // vendor/labrute/prisma/index-browser.js
  var require_index_browser2 = __commonJS({
    "vendor/labrute/prisma/index-browser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var {
        Decimal: Decimal2,
        objectEnumValues: objectEnumValues2,
        makeStrictEnum: makeStrictEnum2,
        Public: Public2,
        getRuntime: getRuntime2,
        skip
      } = require_index_browser();
      var Prisma2 = {};
      exports.Prisma = Prisma2;
      exports.$Enums = {};
      Prisma2.prismaVersion = {
        client: "6.19.3",
        engine: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7"
      };
      Prisma2.PrismaClientKnownRequestError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.PrismaClientUnknownRequestError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.PrismaClientRustPanicError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.PrismaClientInitializationError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.PrismaClientValidationError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.Decimal = Decimal2;
      Prisma2.sql = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.empty = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.join = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.raw = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.validator = Public2.validator;
      Prisma2.getExtensionContext = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.defineExtension = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.DbNull = objectEnumValues2.instances.DbNull;
      Prisma2.JsonNull = objectEnumValues2.instances.JsonNull;
      Prisma2.AnyNull = objectEnumValues2.instances.AnyNull;
      Prisma2.NullTypes = {
        DbNull: objectEnumValues2.classes.DbNull,
        JsonNull: objectEnumValues2.classes.JsonNull,
        AnyNull: objectEnumValues2.classes.AnyNull
      };
      exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
        ReadUncommitted: "ReadUncommitted",
        ReadCommitted: "ReadCommitted",
        RepeatableRead: "RepeatableRead",
        Serializable: "Serializable"
      });
      exports.Prisma.UserScalarFieldEnum = {
        id: "id",
        lang: "lang",
        name: "name",
        admin: "admin",
        moderator: "moderator",
        connexionToken: "connexionToken",
        bruteLimit: "bruteLimit",
        gold: "gold",
        fightSpeed: "fightSpeed",
        backgroundMusic: "backgroundMusic",
        dinorpgDone: "dinorpgDone",
        ips: "ips",
        fingerprints: "fingerprints",
        browserIds: "browserIds",
        createdAt: "createdAt",
        bannedAt: "bannedAt",
        banReason: "banReason",
        displayVersusPage: "displayVersusPage",
        displayOpponentDetails: "displayOpponentDetails",
        transferedBrutesCount: "transferedBrutesCount",
        termsAccepted: "termsAccepted",
        lastSeen: "lastSeen",
        sharedBrowserId: "sharedBrowserId"
      };
      exports.Prisma.RelationLoadStrategy = {
        query: "query",
        join: "join"
      };
      exports.Prisma.UserLogScalarFieldEnum = {
        id: "id",
        date: "date",
        userId: "userId",
        type: "type",
        bruteId: "bruteId",
        gold: "gold",
        oldName: "oldName",
        targetUserId: "targetUserId"
      };
      exports.Prisma.BruteScalarFieldEnum = {
        id: "id",
        name: "name",
        deletedAt: "deletedAt",
        createdAt: "createdAt",
        willBeDeletedAt: "willBeDeletedAt",
        deletionReason: "deletionReason",
        destinyPath: "destinyPath",
        previousDestinyPath: "previousDestinyPath",
        level: "level",
        xp: "xp",
        hpStat: "hpStat",
        hpModifier: "hpModifier",
        hpValue: "hpValue",
        strengthStat: "strengthStat",
        strengthModifier: "strengthModifier",
        strengthValue: "strengthValue",
        agilityStat: "agilityStat",
        agilityModifier: "agilityModifier",
        agilityValue: "agilityValue",
        speedStat: "speedStat",
        speedModifier: "speedModifier",
        speedValue: "speedValue",
        ranking: "ranking",
        gender: "gender",
        userId: "userId",
        body: "body",
        colors: "colors",
        weapons: "weapons",
        skills: "skills",
        pets: "pets",
        ascensions: "ascensions",
        ascendedWeapons: "ascendedWeapons",
        ascendedSkills: "ascendedSkills",
        ascendedPets: "ascendedPets",
        masterId: "masterId",
        pupilsCount: "pupilsCount",
        clanId: "clanId",
        registeredForTournament: "registeredForTournament",
        nextTournamentDate: "nextTournamentDate",
        currentTournamentDate: "currentTournamentDate",
        currentTournamentStepWatched: "currentTournamentStepWatched",
        globalTournamentWatchedDate: "globalTournamentWatchedDate",
        globalTournamentRoundWatched: "globalTournamentRoundWatched",
        eventTournamentWatchedDate: "eventTournamentWatchedDate",
        eventTournamentRoundWatched: "eventTournamentRoundWatched",
        lastFight: "lastFight",
        fightsLeft: "fightsLeft",
        victories: "victories",
        losses: "losses",
        opponentsGeneratedAt: "opponentsGeneratedAt",
        canRankUpSince: "canRankUpSince",
        favorite: "favorite",
        wantToJoinClanId: "wantToJoinClanId",
        tournamentWins: "tournamentWins",
        eventId: "eventId",
        resets: "resets",
        clanRoleId: "clanRoleId"
      };
      exports.Prisma.BruteStartingStatsScalarFieldEnum = {
        id: "id",
        hp: "hp",
        strength: "strength",
        agility: "agility",
        speed: "speed",
        bruteId: "bruteId"
      };
      exports.Prisma.UnlockedColorsScalarFieldEnum = {
        bruteId: "bruteId",
        bodyPart: "bodyPart",
        colors: "colors"
      };
      exports.Prisma.FightScalarFieldEnum = {
        id: "id",
        date: "date",
        brute1Id: "brute1Id",
        brute2Id: "brute2Id",
        winnerId: "winnerId",
        loserId: "loserId",
        winner: "winner",
        loser: "loser",
        steps: "steps",
        fighters: "fighters",
        tournamentId: "tournamentId",
        tournamentStep: "tournamentStep",
        modifiers: "modifiers",
        background: "background",
        clanWarId: "clanWarId",
        favoriteCount: "favoriteCount"
      };
      exports.Prisma.LogScalarFieldEnum = {
        id: "id",
        date: "date",
        currentBruteId: "currentBruteId",
        type: "type",
        level: "level",
        brute: "brute",
        fightId: "fightId",
        xp: "xp",
        gold: "gold",
        template: "template",
        destinyChoiceId: "destinyChoiceId"
      };
      exports.Prisma.DestinyChoiceScalarFieldEnum = {
        id: "id",
        bruteId: "bruteId",
        path: "path",
        type: "type",
        skill: "skill",
        weapon: "weapon",
        pet: "pet",
        originalSkill: "originalSkill",
        originalWeapon: "originalWeapon",
        originalPet: "originalPet",
        stat1: "stat1",
        stat1Value: "stat1Value",
        stat2: "stat2",
        stat2Value: "stat2Value"
      };
      exports.Prisma.TournamentScalarFieldEnum = {
        id: "id",
        date: "date",
        type: "type",
        rounds: "rounds",
        eventId: "eventId"
      };
      exports.Prisma.TournamentAchievementScalarFieldEnum = {
        id: "id",
        bruteId: "bruteId",
        date: "date",
        achievement: "achievement",
        achievementCount: "achievementCount"
      };
      exports.Prisma.TournamentGoldScalarFieldEnum = {
        id: "id",
        date: "date",
        userId: "userId",
        gold: "gold"
      };
      exports.Prisma.TournamentXpScalarFieldEnum = {
        id: "id",
        date: "date",
        bruteId: "bruteId",
        xp: "xp"
      };
      exports.Prisma.BruteRankingScalarFieldEnum = {
        bruteId: "bruteId",
        ranking: "ranking",
        position: "position"
      };
      exports.Prisma.AchievementScalarFieldEnum = {
        id: "id",
        name: "name",
        count: "count",
        bruteId: "bruteId",
        userId: "userId"
      };
      exports.Prisma.BruteReportScalarFieldEnum = {
        id: "id",
        bruteId: "bruteId",
        bruteName: "bruteName",
        reason: "reason",
        count: "count",
        date: "date",
        status: "status",
        handlerId: "handlerId",
        handledAt: "handledAt"
      };
      exports.Prisma.ServerStateScalarFieldEnum = {
        id: "id",
        globalTournamentValid: "globalTournamentValid",
        activeModifiers: "activeModifiers",
        modifiersEndAt: "modifiersEndAt",
        nextModifiers: "nextModifiers",
        bruteRankingsUpdatedAt: "bruteRankingsUpdatedAt"
      };
      exports.Prisma.BannedWordScalarFieldEnum = {
        id: "id",
        word: "word"
      };
      exports.Prisma.BannedIpScalarFieldEnum = {
        id: "id"
      };
      exports.Prisma.BannedFingerprintScalarFieldEnum = {
        id: "id"
      };
      exports.Prisma.KnownFingerprintScalarFieldEnum = {
        id: "id",
        description: "description",
        createdAt: "createdAt"
      };
      exports.Prisma.SharedBrowserScalarFieldEnum = {
        id: "id",
        description: "description",
        createdAt: "createdAt"
      };
      exports.Prisma.BannedBrowserScalarFieldEnum = {
        id: "id"
      };
      exports.Prisma.ClanScalarFieldEnum = {
        id: "id",
        name: "name",
        deletedAt: "deletedAt",
        limit: "limit",
        points: "points",
        elo: "elo",
        boss: "boss",
        damageOnBoss: "damageOnBoss",
        masterId: "masterId",
        participateInClanWar: "participateInClanWar"
      };
      exports.Prisma.ClanThreadScalarFieldEnum = {
        id: "id",
        clanId: "clanId",
        creatorId: "creatorId",
        title: "title",
        locked: "locked",
        pinned: "pinned",
        postCount: "postCount",
        createdAt: "createdAt",
        updatedAt: "updatedAt"
      };
      exports.Prisma.ClanPostScalarFieldEnum = {
        id: "id",
        threadId: "threadId",
        authorId: "authorId",
        date: "date",
        message: "message"
      };
      exports.Prisma.BossDamageScalarFieldEnum = {
        id: "id",
        bruteId: "bruteId",
        clanId: "clanId",
        damage: "damage"
      };
      exports.Prisma.ClanWarScalarFieldEnum = {
        id: "id",
        duration: "duration",
        type: "type",
        date: "date",
        status: "status",
        attackerId: "attackerId",
        attackerEloChange: "attackerEloChange",
        attackerWins: "attackerWins",
        defenderId: "defenderId",
        defenderEloChange: "defenderEloChange",
        defenderWins: "defenderWins",
        winnerId: "winnerId"
      };
      exports.Prisma.ClanWarFightersScalarFieldEnum = {
        id: "id",
        clanWarId: "clanWarId",
        day: "day"
      };
      exports.Prisma.InventoryItemScalarFieldEnum = {
        id: "id",
        type: "type",
        count: "count",
        bruteId: "bruteId",
        userId: "userId"
      };
      exports.Prisma.ReleaseScalarFieldEnum = {
        version: "version",
        date: "date"
      };
      exports.Prisma.EventScalarFieldEnum = {
        id: "id",
        date: "date",
        type: "type",
        maxLevel: "maxLevel",
        maxRound: "maxRound",
        status: "status",
        winnerId: "winnerId",
        finishedAt: "finishedAt",
        sortedBrutes: "sortedBrutes"
      };
      exports.Prisma.NotificationScalarFieldEnum = {
        id: "id",
        userId: "userId",
        message: "message",
        severity: "severity",
        link: "link",
        read: "read",
        date: "date"
      };
      exports.Prisma.ConfigScalarFieldEnum = {
        key: "key",
        value: "value",
        updatedAt: "updatedAt"
      };
      exports.Prisma.ClanRoleScalarFieldEnum = {
        id: "id",
        clanId: "clanId",
        name: "name",
        permissions: "permissions",
        createdAt: "createdAt"
      };
      exports.Prisma.SortOrder = {
        asc: "asc",
        desc: "desc"
      };
      exports.Prisma.QueryMode = {
        default: "default",
        insensitive: "insensitive"
      };
      exports.Prisma.NullsOrder = {
        first: "first",
        last: "last"
      };
      exports.Lang = exports.$Enums.Lang = {
        en: "en",
        fr: "fr",
        de: "de",
        es: "es",
        ru: "ru",
        pt: "pt"
      };
      exports.UserLogType = exports.$Enums.UserLogType = {
        CONNECT: "CONNECT",
        DISCONNECT: "DISCONNECT",
        GOLD_WIN: "GOLD_WIN",
        GOLD_LOSS: "GOLD_LOSS",
        CREATE_BRUTE: "CREATE_BRUTE",
        RENAME_BRUTE: "RENAME_BRUTE",
        SACRIFICE_BRUTE: "SACRIFICE_BRUTE",
        TRANSFER_BRUTE: "TRANSFER_BRUTE",
        RECEIVE_BRUTE: "RECEIVE_BRUTE",
        BANNED: "BANNED",
        DELETED: "DELETED"
      };
      exports.Gender = exports.$Enums.Gender = {
        male: "male",
        female: "female"
      };
      exports.DestinyChoiceSide = exports.$Enums.DestinyChoiceSide = {
        LEFT: "LEFT",
        RIGHT: "RIGHT"
      };
      exports.WeaponName = exports.$Enums.WeaponName = {
        fan: "fan",
        keyboard: "keyboard",
        knife: "knife",
        leek: "leek",
        mug: "mug",
        sai: "sai",
        racquet: "racquet",
        axe: "axe",
        bumps: "bumps",
        flail: "flail",
        fryingPan: "fryingPan",
        hatchet: "hatchet",
        mammothBone: "mammothBone",
        morningStar: "morningStar",
        trombone: "trombone",
        baton: "baton",
        halbard: "halbard",
        lance: "lance",
        trident: "trident",
        whip: "whip",
        noodleBowl: "noodleBowl",
        piopio: "piopio",
        shuriken: "shuriken",
        broadsword: "broadsword",
        scimitar: "scimitar",
        sword: "sword"
      };
      exports.SkillName = exports.$Enums.SkillName = {
        herculeanStrength: "herculeanStrength",
        felineAgility: "felineAgility",
        lightningBolt: "lightningBolt",
        vitality: "vitality",
        immortality: "immortality",
        reconnaissance: "reconnaissance",
        weaponsMaster: "weaponsMaster",
        martialArts: "martialArts",
        sixthSense: "sixthSense",
        hostility: "hostility",
        fistsOfFury: "fistsOfFury",
        shield: "shield",
        armor: "armor",
        toughenedSkin: "toughenedSkin",
        untouchable: "untouchable",
        sabotage: "sabotage",
        shock: "shock",
        bodybuilder: "bodybuilder",
        relentless: "relentless",
        survival: "survival",
        leadSkeleton: "leadSkeleton",
        balletShoes: "balletShoes",
        determination: "determination",
        firstStrike: "firstStrike",
        resistant: "resistant",
        counterAttack: "counterAttack",
        ironHead: "ironHead",
        thief: "thief",
        fierceBrute: "fierceBrute",
        tragicPotion: "tragicPotion",
        net: "net",
        bomb: "bomb",
        hammer: "hammer",
        cryOfTheDamned: "cryOfTheDamned",
        hypnosis: "hypnosis",
        flashFlood: "flashFlood",
        tamer: "tamer",
        regeneration: "regeneration",
        chef: "chef",
        spy: "spy",
        saboteur: "saboteur",
        backup: "backup",
        hideaway: "hideaway",
        monk: "monk",
        vampirism: "vampirism",
        chaining: "chaining",
        haste: "haste",
        treat: "treat",
        repulse: "repulse",
        fastMetabolism: "fastMetabolism",
        mimic: "mimic",
        stickyHands: "stickyHands",
        deity: "deity"
      };
      exports.PetName = exports.$Enums.PetName = {
        dog1: "dog1",
        dog2: "dog2",
        dog3: "dog3",
        panther: "panther",
        bear: "bear"
      };
      exports.FightModifier = exports.$Enums.FightModifier = {
        noThrows: "noThrows",
        focusOpponent: "focusOpponent",
        alwaysUseSupers: "alwaysUseSupers",
        drawEveryWeapon: "drawEveryWeapon",
        doubleAgility: "doubleAgility",
        randomSkill: "randomSkill",
        randomWeapon: "randomWeapon",
        bareHandsFirstHit: "bareHandsFirstHit",
        startWithWeapon: "startWithWeapon",
        chaos: "chaos"
      };
      exports.LogType = exports.$Enums.LogType = {
        win: "win",
        lose: "lose",
        child: "child",
        childup: "childup",
        up: "up",
        lvl: "lvl",
        ascend: "ascend",
        tournament: "tournament",
        tournamentXp: "tournamentXp",
        bossFight: "bossFight",
        bossDefeat: "bossDefeat"
      };
      exports.DestinyChoiceType = exports.$Enums.DestinyChoiceType = {
        skill: "skill",
        weapon: "weapon",
        pet: "pet",
        stats: "stats"
      };
      exports.BruteStat = exports.$Enums.BruteStat = {
        hp: "hp",
        strength: "strength",
        agility: "agility",
        speed: "speed"
      };
      exports.TournamentType = exports.$Enums.TournamentType = {
        DAILY: "DAILY",
        GLOBAL: "GLOBAL",
        UNLIMITED_GLOBAL: "UNLIMITED_GLOBAL",
        CUSTOM: "CUSTOM",
        BATTLE_ROYALE: "BATTLE_ROYALE"
      };
      exports.AchievementName = exports.$Enums.AchievementName = {
        wins: "wins",
        defeats: "defeats",
        flawless: "flawless",
        winWith1HP: "winWith1HP",
        steal2Weapons: "steal2Weapons",
        singleHitWin: "singleHitWin",
        combo3: "combo3",
        combo4: "combo4",
        combo5: "combo5",
        counter5: "counter5",
        evade10: "evade10",
        block25: "block25",
        counter4b2b: "counter4b2b",
        reversal4b2b: "reversal4b2b",
        block4b2b: "block4b2b",
        evade4b2b: "evade4b2b",
        throw10b2b: "throw10b2b",
        disarm4: "disarm4",
        disarm8: "disarm8",
        damage50once: "damage50once",
        damage100once: "damage100once",
        hit20times: "hit20times",
        use10skills: "use10skills",
        kill3pets: "kill3pets",
        maxDamage: "maxDamage",
        hpHealed: "hpHealed",
        saboteur: "saboteur",
        dog: "dog",
        panther: "panther",
        bear: "bear",
        panther_bear: "panther_bear",
        felAg_fistsOfF: "felAg_fistsOfF",
        felAg_fistsOfF_untouch_relentless: "felAg_fistsOfF_untouch_relentless",
        vita_armor_toughened: "vita_armor_toughened",
        herculStr_hammer_fierceBrute: "herculStr_hammer_fierceBrute",
        shock: "shock",
        balletShoes_survival: "balletShoes_survival",
        cryOfTheDamned_hypnosis: "cryOfTheDamned_hypnosis",
        shield_counterAttack: "shield_counterAttack",
        reconnaissance_monk: "reconnaissance_monk",
        immortality: "immortality",
        doubleBoost: "doubleBoost",
        tripleBoost: "tripleBoost",
        quadrupleBoost: "quadrupleBoost",
        regeneration_potion: "regeneration_potion",
        bear_tamer: "bear_tamer",
        tripleDogs: "tripleDogs",
        fiveWeapons: "fiveWeapons",
        tenWeapons: "tenWeapons",
        fifteenWeapons: "fifteenWeapons",
        twentyWeapons: "twentyWeapons",
        twentyThreeWeapons: "twentyThreeWeapons",
        monk_sixthSense_whip: "monk_sixthSense_whip",
        weaponsMaster_sharp_bodybuilder_heavy: "weaponsMaster_sharp_bodybuilder_heavy",
        hostility_counterWeapon: "hostility_counterWeapon",
        flashFlood_twelveWeapons: "flashFlood_twelveWeapons",
        lightningBolt_firstStrike: "lightningBolt_firstStrike",
        herculeanStrength: "herculeanStrength",
        felineAgility: "felineAgility",
        lightningBolt: "lightningBolt",
        vitality: "vitality",
        potion_chef: "potion_chef",
        tamer_net: "tamer_net",
        untouchable_balletShoes: "untouchable_balletShoes",
        survival_resistant: "survival_resistant",
        hideaway_spy: "hideaway_spy",
        weaponsFast3: "weaponsFast3",
        weaponsSharp3: "weaponsSharp3",
        weaponsHeavy3: "weaponsHeavy3",
        weaponsLong3: "weaponsLong3",
        weaponsThrown3: "weaponsThrown3",
        weaponsBlunt3: "weaponsBlunt3",
        thor: "thor",
        deflector: "deflector",
        allFastWeapons: "allFastWeapons",
        allSharpWeapons: "allSharpWeapons",
        allHeavyWeapons: "allHeavyWeapons",
        allLongWeapons: "allLongWeapons",
        allThrownWeapons: "allThrownWeapons",
        allBluntWeapons: "allBluntWeapons",
        agility50: "agility50",
        agility100: "agility100",
        speed50: "speed50",
        speed100: "speed100",
        strength50: "strength50",
        strength100: "strength100",
        hp300: "hp300",
        hp600: "hp600",
        maxLevel: "maxLevel",
        allAchievements: "allAchievements",
        winTournamentAs20: "winTournamentAs20",
        winTournamentAs15: "winTournamentAs15",
        looseAgainst2: "looseAgainst2",
        looseAgainst3: "looseAgainst3",
        looseAgainst4: "looseAgainst4",
        winAgainst2: "winAgainst2",
        winAgainst3: "winAgainst3",
        winAgainst4: "winAgainst4",
        winAsLower: "winAsLower",
        win: "win",
        battleRoyaleWin: "battleRoyaleWin",
        rankUp10: "rankUp10",
        rankUp9: "rankUp9",
        rankUp8: "rankUp8",
        rankUp7: "rankUp7",
        rankUp6: "rankUp6",
        rankUp5: "rankUp5",
        rankUp4: "rankUp4",
        rankUp3: "rankUp3",
        rankUp2: "rankUp2",
        rankUp1: "rankUp1",
        rankUp0: "rankUp0",
        ascend: "ascend",
        sacrifice: "sacrifice",
        beta: "beta",
        bug: "bug"
      };
      exports.BruteReportReason = exports.$Enums.BruteReportReason = {
        name: "name"
      };
      exports.BruteReportStatus = exports.$Enums.BruteReportStatus = {
        pending: "pending",
        accepted: "accepted",
        rejected: "rejected"
      };
      exports.BossName = exports.$Enums.BossName = {
        GoldClaw: "GoldClaw",
        EmberFang: "EmberFang",
        Cerberus: "Cerberus"
      };
      exports.ClanWarType = exports.$Enums.ClanWarType = {
        friendly: "friendly",
        official: "official"
      };
      exports.ClanWarStatus = exports.$Enums.ClanWarStatus = {
        pending: "pending",
        ongoing: "ongoing",
        waitingForRewards: "waitingForRewards",
        finished: "finished"
      };
      exports.InventoryItemType = exports.$Enums.InventoryItemType = {
        visualReset: "visualReset",
        bossTicket: "bossTicket",
        nameChange: "nameChange",
        favoriteFight: "favoriteFight",
        customizationToken: "customizationToken"
      };
      exports.EventType = exports.$Enums.EventType = {
        battleRoyale: "battleRoyale"
      };
      exports.EventStatus = exports.$Enums.EventStatus = {
        starting: "starting",
        ongoing: "ongoing",
        finished: "finished"
      };
      exports.NotificationSeverity = exports.$Enums.NotificationSeverity = {
        info: "info",
        success: "success",
        warning: "warning",
        error: "error"
      };
      exports.ClanPermission = exports.$Enums.ClanPermission = {
        canAcceptJoinRequests: "canAcceptJoinRequests",
        canRejectJoinRequests: "canRejectJoinRequests",
        canRemoveMembers: "canRemoveMembers",
        canSelectWarFighters: "canSelectWarFighters",
        canPinThreads: "canPinThreads",
        canUnpinThreads: "canUnpinThreads",
        canDeletePosts: "canDeletePosts",
        canDeleteThreads: "canDeleteThreads",
        canCreateRoles: "canCreateRoles",
        canChangeRoles: "canChangeRoles"
      };
      exports.Prisma.ModelName = {
        User: "User",
        UserLog: "UserLog",
        Brute: "Brute",
        BruteStartingStats: "BruteStartingStats",
        UnlockedColors: "UnlockedColors",
        Fight: "Fight",
        Log: "Log",
        DestinyChoice: "DestinyChoice",
        Tournament: "Tournament",
        TournamentAchievement: "TournamentAchievement",
        TournamentGold: "TournamentGold",
        TournamentXp: "TournamentXp",
        BruteRanking: "BruteRanking",
        Achievement: "Achievement",
        BruteReport: "BruteReport",
        ServerState: "ServerState",
        BannedWord: "BannedWord",
        BannedIp: "BannedIp",
        BannedFingerprint: "BannedFingerprint",
        KnownFingerprint: "KnownFingerprint",
        SharedBrowser: "SharedBrowser",
        BannedBrowser: "BannedBrowser",
        Clan: "Clan",
        ClanThread: "ClanThread",
        ClanPost: "ClanPost",
        BossDamage: "BossDamage",
        ClanWar: "ClanWar",
        ClanWarFighters: "ClanWarFighters",
        InventoryItem: "InventoryItem",
        Release: "Release",
        Event: "Event",
        Notification: "Notification",
        Config: "Config",
        ClanRole: "ClanRole"
      };
      var PrismaClient = class {
        constructor() {
          return new Proxy(this, {
            get(target, prop) {
              let message;
              const runtime = getRuntime2();
              if (runtime.isEdge) {
                message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
              } else {
                message = "PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `" + runtime.prettyName + "`).";
              }
              message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`;
              throw new Error(message);
            }
          });
        }
      };
      exports.PrismaClient = PrismaClient;
      Object.assign(exports, Prisma2);
    }
  });

  // node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "node_modules/dayjs/dayjs.min.js"(exports, module) {
      !(function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
      })(exports, (function() {
        "use strict";
        var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
          var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
          return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
        } }, m = function(t2, e2, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
        }, v = { s: m, z: function(t2) {
          var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
          return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
        }, m: function t2(e2, n2) {
          if (e2.date() < n2.date()) return -t2(n2, e2);
          var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
          return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
        }, a: function(t2) {
          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
        }, p: function(t2) {
          return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t2) {
          return void 0 === t2;
        } }, g = "en", D = {};
        D[g] = M;
        var p = "$isDayjsObject", S = function(t2) {
          return t2 instanceof _ || !(!t2 || !t2[p]);
        }, w = function t2(e2, n2, r2) {
          var i2;
          if (!e2) return g;
          if ("string" == typeof e2) {
            var s2 = e2.toLowerCase();
            D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
            var u2 = e2.split("-");
            if (!i2 && u2.length > 1) return t2(u2[0]);
          } else {
            var a2 = e2.name;
            D[a2] = e2, i2 = a2;
          }
          return !r2 && i2 && (g = i2), i2 || !r2 && g;
        }, O = function(t2, e2) {
          if (S(t2)) return t2.clone();
          var n2 = "object" == typeof e2 ? e2 : {};
          return n2.date = t2, n2.args = arguments, new _(n2);
        }, b = v;
        b.l = w, b.i = S, b.w = function(t2, e2) {
          return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        };
        var _ = (function() {
          function M2(t2) {
            this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
          }
          var m2 = M2.prototype;
          return m2.parse = function(t2) {
            this.$d = (function(t3) {
              var e2 = t3.date, n2 = t3.utc;
              if (null === e2) return /* @__PURE__ */ new Date(NaN);
              if (b.u(e2)) return /* @__PURE__ */ new Date();
              if (e2 instanceof Date) return new Date(e2);
              if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                var r2 = e2.match($);
                if (r2) {
                  var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e2);
            })(t2), this.init();
          }, m2.init = function() {
            var t2 = this.$d;
            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
          }, m2.$utils = function() {
            return b;
          }, m2.isValid = function() {
            return !(this.$d.toString() === l);
          }, m2.isSame = function(t2, e2) {
            var n2 = O(t2);
            return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
          }, m2.isAfter = function(t2, e2) {
            return O(t2) < this.startOf(e2);
          }, m2.isBefore = function(t2, e2) {
            return this.endOf(e2) < O(t2);
          }, m2.$g = function(t2, e2, n2) {
            return b.u(t2) ? this[e2] : this.set(n2, t2);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t2, e2) {
            var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
              var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
              return r2 ? i2 : i2.endOf(a);
            }, $2 = function(t3, e3) {
              return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
            switch (f2) {
              case h:
                return r2 ? l2(1, 0) : l2(31, 11);
              case c:
                return r2 ? l2(1, M3) : l2(0, M3 + 1);
              case o:
                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a:
              case d:
                return $2(v2 + "Hours", 0);
              case u:
                return $2(v2 + "Minutes", 1);
              case s:
                return $2(v2 + "Seconds", 2);
              case i:
                return $2(v2 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t2) {
            return this.startOf(t2, false);
          }, m2.$set = function(t2, e2) {
            var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
            if (o2 === c || o2 === h) {
              var y2 = this.clone().set(d, 1);
              y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
            } else l2 && this.$d[l2]($2);
            return this.init(), this;
          }, m2.set = function(t2, e2) {
            return this.clone().$set(t2, e2);
          }, m2.get = function(t2) {
            return this[b.p(t2)]();
          }, m2.add = function(r2, f2) {
            var d2, l2 = this;
            r2 = Number(r2);
            var $2 = b.p(f2), y2 = function(t2) {
              var e2 = O(l2);
              return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
            };
            if ($2 === c) return this.set(c, this.$M + r2);
            if ($2 === h) return this.set(h, this.$y + r2);
            if ($2 === a) return y2(1);
            if ($2 === o) return y2(7);
            var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
            return b.w(m3, this);
          }, m2.subtract = function(t2, e2) {
            return this.add(-1 * t2, e2);
          }, m2.format = function(t2) {
            var e2 = this, n2 = this.$locale();
            if (!this.isValid()) return n2.invalidDate || l;
            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
              return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
            }, d2 = function(t3) {
              return b.s(s2 % 12 || 12, t3, "0");
            }, $2 = f2 || function(t3, e3, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            };
            return r2.replace(y, (function(t3, r3) {
              return r3 || (function(t4) {
                switch (t4) {
                  case "YY":
                    return String(e2.$y).slice(-2);
                  case "YYYY":
                    return b.s(e2.$y, 4, "0");
                  case "M":
                    return a2 + 1;
                  case "MM":
                    return b.s(a2 + 1, 2, "0");
                  case "MMM":
                    return h2(n2.monthsShort, a2, c2, 3);
                  case "MMMM":
                    return h2(c2, a2);
                  case "D":
                    return e2.$D;
                  case "DD":
                    return b.s(e2.$D, 2, "0");
                  case "d":
                    return String(e2.$W);
                  case "dd":
                    return h2(n2.weekdaysMin, e2.$W, o2, 2);
                  case "ddd":
                    return h2(n2.weekdaysShort, e2.$W, o2, 3);
                  case "dddd":
                    return o2[e2.$W];
                  case "H":
                    return String(s2);
                  case "HH":
                    return b.s(s2, 2, "0");
                  case "h":
                    return d2(1);
                  case "hh":
                    return d2(2);
                  case "a":
                    return $2(s2, u2, true);
                  case "A":
                    return $2(s2, u2, false);
                  case "m":
                    return String(u2);
                  case "mm":
                    return b.s(u2, 2, "0");
                  case "s":
                    return String(e2.$s);
                  case "ss":
                    return b.s(e2.$s, 2, "0");
                  case "SSS":
                    return b.s(e2.$ms, 3, "0");
                  case "Z":
                    return i2;
                }
                return null;
              })(t3) || i2.replace(":", "");
            }));
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d2, l2) {
            var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
              return b.m(y2, m3);
            };
            switch (M3) {
              case h:
                $2 = D2() / 12;
                break;
              case c:
                $2 = D2();
                break;
              case f:
                $2 = D2() / 3;
                break;
              case o:
                $2 = (g2 - v2) / 6048e5;
                break;
              case a:
                $2 = (g2 - v2) / 864e5;
                break;
              case u:
                $2 = g2 / n;
                break;
              case s:
                $2 = g2 / e;
                break;
              case i:
                $2 = g2 / t;
                break;
              default:
                $2 = g2;
            }
            return l2 ? $2 : b.a($2);
          }, m2.daysInMonth = function() {
            return this.endOf(c).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t2, e2) {
            if (!t2) return this.$L;
            var n2 = this.clone(), r2 = w(t2, e2, true);
            return r2 && (n2.$L = r2), n2;
          }, m2.clone = function() {
            return b.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        })(), Y = _.prototype;
        return O.prototype = Y, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach((function(t2) {
          Y[t2[1]] = function(e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        })), O.extend = function(t2, e2) {
          return t2.$i || (t2(e2, _, O), t2.$i = true), O;
        }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
          return O(1e3 * t2);
        }, O.en = D[g], O.Ls = D, O.p = {}, O;
      }));
    }
  });

  // node_modules/dayjs/plugin/utc.js
  var require_utc = __commonJS({
    "node_modules/dayjs/plugin/utc.js"(exports, module) {
      !(function(t, i) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_utc = i();
      })(exports, (function() {
        "use strict";
        var t = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
        return function(s, f, n) {
          var u = f.prototype;
          n.utc = function(t2) {
            var i2 = { date: t2, utc: true, args: arguments };
            return new f(i2);
          }, u.utc = function(i2) {
            var e2 = n(this.toDate(), { locale: this.$L, utc: true });
            return i2 ? e2.add(this.utcOffset(), t) : e2;
          }, u.local = function() {
            return n(this.toDate(), { locale: this.$L, utc: false });
          };
          var r = u.parse;
          u.parse = function(t2) {
            t2.utc && (this.$u = true), this.$utils().u(t2.$offset) || (this.$offset = t2.$offset), r.call(this, t2);
          };
          var o = u.init;
          u.init = function() {
            if (this.$u) {
              var t2 = this.$d;
              this.$y = t2.getUTCFullYear(), this.$M = t2.getUTCMonth(), this.$D = t2.getUTCDate(), this.$W = t2.getUTCDay(), this.$H = t2.getUTCHours(), this.$m = t2.getUTCMinutes(), this.$s = t2.getUTCSeconds(), this.$ms = t2.getUTCMilliseconds();
            } else o.call(this);
          };
          var a = u.utcOffset;
          u.utcOffset = function(s2, f2) {
            var n2 = this.$utils().u;
            if (n2(s2)) return this.$u ? 0 : n2(this.$offset) ? a.call(this) : this.$offset;
            if ("string" == typeof s2 && (s2 = (function(t2) {
              void 0 === t2 && (t2 = "");
              var s3 = t2.match(i);
              if (!s3) return null;
              var f3 = ("" + s3[0]).match(e) || ["-", 0, 0], n3 = f3[0], u3 = 60 * +f3[1] + +f3[2];
              return 0 === u3 ? 0 : "+" === n3 ? u3 : -u3;
            })(s2), null === s2)) return this;
            var u2 = Math.abs(s2) <= 16 ? 60 * s2 : s2;
            if (0 === u2) return this.utc(f2);
            var r2 = this.clone();
            if (f2) return r2.$offset = u2, r2.$u = false, r2;
            var o2 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
            return (r2 = this.local().add(u2 + o2, t)).$offset = u2, r2.$x.$localOffset = o2, r2;
          };
          var h = u.format;
          u.format = function(t2) {
            var i2 = t2 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
            return h.call(this, i2);
          }, u.valueOf = function() {
            var t2 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
            return this.$d.valueOf() - 6e4 * t2;
          }, u.isUTC = function() {
            return !!this.$u;
          }, u.toISOString = function() {
            return this.toDate().toISOString();
          }, u.toString = function() {
            return this.toDate().toUTCString();
          };
          var l = u.toDate;
          u.toDate = function(t2) {
            return "s" === t2 && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
          };
          var c = u.diff;
          u.diff = function(t2, i2, e2) {
            if (t2 && this.$u === t2.$u) return c.call(this, t2, i2, e2);
            var s2 = this.local(), f2 = n(t2).local();
            return c.call(s2, f2, i2, e2);
          };
        };
      }));
    }
  });

  // src/userscript/fightResult.ts
  var isString = (value) => typeof value === "string";
  var asFightResult = (payload) => {
    const data = payload;
    const fight = data?.fight ?? data;
    if (!fight || typeof fight !== "object") return null;
    const { id, winner, loser, brute1Id, brute2Id, tournamentId } = fight;
    if (!isString(id) || !isString(winner) || !isString(loser)) return null;
    if (!isString(brute1Id) || !isString(brute2Id)) return null;
    if (tournamentId) return null;
    return { id, winner, loser };
  };

  // src/userscript/levelUpChoices.ts
  var TYPES = /* @__PURE__ */ new Set(["skill", "weapon", "pet", "stats"]);
  var estUnChoix = (value) => {
    const choice = value;
    if (!choice || typeof choice !== "object") return false;
    if (typeof choice.type !== "string" || !TYPES.has(choice.type)) return false;
    if (choice.type === "skill") return typeof choice.skill === "string";
    if (choice.type === "weapon") return typeof choice.weapon === "string";
    if (choice.type === "pet") return typeof choice.pet === "string";
    return typeof choice.stat1 === "string";
  };
  var asLevelUpChoices = (payload) => {
    const data = payload;
    const list = Array.isArray(data) ? data : data?.choices ?? data?.destinyChoices;
    if (!Array.isArray(list) || list.length !== 2) return null;
    return list.every(estUnChoix) ? list : null;
  };
  var BRUTE_IN_URL = /\/api\/brute\/([^/]+)\//;
  var bruteNameIn = (url) => {
    const match = BRUTE_IN_URL.exec(url);
    return match?.[1] ? decodeURIComponent(match[1]) : void 0;
  };

  // src/userscript/store.ts
  var brutes = /* @__PURE__ */ new Map();
  var opponents = /* @__PURE__ */ new Map();
  var ownNames = /* @__PURE__ */ new Set();
  var modifiers = {};
  var headers = {};
  var store = {
    putBrutes: (list) => list.forEach((b) => brutes.set(b.name, b)),
    getBrute: (name) => brutes.get(name),
    // Seule l'authentification garantit qu'une brute est bien la nôtre.
    putOwnBrutes: (list) => {
      list.forEach((b) => {
        brutes.set(b.name, b);
        ownNames.add(b.name);
      });
    },
    getOwnBrutes: () => Array.from(ownNames).map((n) => brutes.get(n)).filter((b) => !!b),
    putOpponents: (bruteName, list) => opponents.set(bruteName, list),
    getOpponents: (bruteName) => opponents.get(bruteName),
    putModifiers: (m) => {
      modifiers = m;
    },
    getModifiers: () => modifiers,
    putHeaders: (h) => {
      headers = h;
    },
    getHeaders: () => headers,
    reset: () => {
      brutes.clear();
      opponents.clear();
      ownNames.clear();
      modifiers = {};
      headers = {};
    }
  };

  // src/userscript/intercept.ts
  var OPPONENTS = /\/api\/brute\/([^/]+)\/get-opponents\//;
  var HOOK = /\/api\/brute\/([^/]+)\/for-hook/;
  var LEVEL_UP = /\/api\/brute\/[^/]+\/level-up(?:$|\?)/;
  var installInterceptor = (hooks) => {
    const original = window.fetch;
    window.fetch = async (...args) => {
      const response = await original(...args);
      const url = typeof args[0] === "string" ? args[0] : args[0].url;
      const init = args[1];
      if (url.includes("/api/") && init?.headers) {
        store.putHeaders(Object.fromEntries(new Headers(init.headers).entries()));
      }
      try {
        if (url.includes("/api/user/authenticate")) {
          const data = await response.clone().json();
          store.putOwnBrutes(data.user.brutes);
          store.putModifiers(data.modifiers);
        } else if (HOOK.test(url)) {
          store.putBrutes([await response.clone().json()]);
        } else if (LEVEL_UP.test(url)) {
          store.putBrutes([await response.clone().json()]);
        } else {
          const match = OPPONENTS.exec(url);
          if (match?.[1]) {
            const bruteName = decodeURIComponent(match[1]);
            store.putOpponents(bruteName, await response.clone().json());
            hooks.onArena(bruteName);
          } else if (url.includes("/api/") && response.headers.get("content-type")?.includes("json")) {
            const data = await response.clone().json();
            const fight = asFightResult(data);
            if (fight) hooks.onFight?.(fight);
            const choices = asLevelUpChoices(data);
            const bruteName = bruteNameIn(url);
            if (choices && bruteName) hooks.onLevelUpChoices?.(bruteName, choices);
          }
        }
      } catch {
      }
      return response;
    };
  };
  var fetchProfileBrutes = async (bruteName) => {
    const headers2 = store.getHeaders();
    const hook = await fetch(`/api/brute/${encodeURIComponent(bruteName)}/for-hook`, { headers: headers2 });
    if (!hook.ok) throw new Error(`for-hook ${hook.status}`);
    const { userId } = await hook.json();
    if (!userId) throw new Error("userId absent");
    const profile = await fetch(`/api/user/${userId}/profile`, { headers: headers2 });
    if (!profile.ok) throw new Error(`profile ${profile.status}`);
    return (await profile.json()).brutes;
  };

  // src/userscript/inject.ts
  var isEstimation = (d) => d !== "pending" && !("error" in d);
  var formatOdds = (e) => {
    const pct2 = Math.round(e.winRate * 100);
    const ci = Math.max(1, Math.round(e.ci * 100));
    return e.approximate ? `~${pct2} % \xB1 ${ci} (renfort inconnu)` : `${pct2} % \xB1 ${ci}`;
  };
  var percent = (fraction) => `${Math.round(fraction * 100)} %`;
  var formatDetail = (e) => [
    `${percent(e.winRate)} de victoires sur ${e.samples} combats simul\xE9s`,
    `intervalle de confiance \xE0 95 % : ${percent(e.lo)} \xE0 ${percent(e.hi)}`,
    `dur\xE9e moyenne : ${Math.round(e.meanTurns)} actions`,
    `PV restants moyens en cas de victoire : ${percent(e.hpLeftOnWin)}`,
    ...e.approximate ? ["renfort de l'adversaire non r\xE9solu : estimation approximative"] : []
  ].join("\n");
  var nameNodeIn = (root, name) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (node.textContent?.trim() === name) return node;
      node = walker.nextNode();
    }
    return null;
  };
  var findCard = (name, names) => {
    const others = [...names].filter((other) => other !== name);
    let card = nameNodeIn(document.body, name)?.parentElement ?? null;
    while (card?.parentElement && card.parentElement !== document.body) {
      const parent = card.parentElement;
      if (others.some((other) => nameNodeIn(parent, other))) break;
      card = parent;
    }
    return card;
  };
  var label = (displayed, best) => {
    if (displayed === "pending") return "\u2026";
    if (!isEstimation(displayed)) return "\xD7 \xE9chec";
    return best ? `${formatOdds(displayed)} \xB7 meilleur` : formatOdds(displayed);
  };
  var detail = (displayed) => {
    if (displayed === "pending") return "brute-odds : calcul en cours";
    return isEstimation(displayed) ? formatDetail(displayed) : `brute-odds : calcul impossible (${displayed.error})`;
  };
  var BADGE_STYLE = "position:absolute;left:50%;transform:translateX(-50%);bottom:4px;z-index:20;white-space:nowrap;padding:1px 6px;font-weight:700;font-size:13px;background:rgba(255,255,255,.82);border-radius:3px;pointer-events:none;";
  var colorOf = (displayed) => {
    if (displayed === "pending") return "#000";
    if (!isEstimation(displayed)) return "#666";
    return `hsl(${Math.round(displayed.winRate * 120)},75%,28%)`;
  };
  var badgesFor = (name) => [...document.querySelectorAll(".brute-odds")].filter((badge) => badge.getAttribute("data-brute") === name);
  var paint = (name, displayed) => {
    const card = findCard(name, shown.keys());
    if (!card) {
      badgesFor(name).forEach((badge2) => badge2.remove());
      return;
    }
    const best = name === bestName;
    const text = label(displayed, best);
    const color = colorOf(displayed);
    const tip = detail(displayed);
    const previous = titled.get(name);
    if (previous && previous !== card) previous.removeAttribute("title");
    titled.set(name, card);
    if (card.getAttribute("title") !== tip) card.setAttribute("title", tip);
    const strays = badgesFor(name);
    const placed = strays.find((badge2) => badge2.parentElement === card);
    if (strays.length === 1 && placed?.getAttribute("data-odds") === `${text}|${color}`) return;
    strays.forEach((badge2) => badge2.remove());
    if (getComputedStyle(card).position === "static") {
      card.style.position = "relative";
    }
    const badge = document.createElement("div");
    badge.className = "brute-odds";
    badge.setAttribute("data-brute", name);
    badge.setAttribute("data-odds", `${text}|${color}`);
    badge.style.cssText = `${BADGE_STYLE}color:${color};` + (best ? "outline:2px solid currentColor;outline-offset:1px;" : "");
    badge.textContent = text;
    card.appendChild(badge);
  };
  var shown = /* @__PURE__ */ new Map();
  var titled = /* @__PURE__ */ new Map();
  var bestName;
  var paintedPath = "";
  var observer;
  var repaintAll = () => {
    if (location.pathname !== paintedPath) {
      resetOdds();
      return;
    }
    shown.forEach((displayed, name) => paint(name, displayed));
  };
  var renderOdds = (name, displayed) => {
    paintedPath = location.pathname;
    shown.set(name, displayed);
    repaintAll();
    if (!observer) {
      observer = new MutationObserver(repaintAll);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };
  var renderBest = (name) => {
    if (bestName === name) return;
    bestName = name;
    repaintAll();
  };
  var resetOdds = () => {
    shown.clear();
    titled.forEach((card) => card.removeAttribute("title"));
    titled.clear();
    document.querySelectorAll(".brute-odds").forEach((badge) => badge.remove());
    bestName = void 0;
    paintedPath = "";
    observer?.disconnect();
    observer = void 0;
  };

  // src/userscript/pool.ts
  var poolSize = (cores, jobs) => Math.max(
    1,
    Math.min(jobs, cores && cores > 1 ? cores - 1 : 1)
  );
  var createPool = (size, spawn2) => {
    const slots = [];
    const queue = [];
    const running = /* @__PURE__ */ new Map();
    const settle = (slot, response) => {
      const job = running.get(slot.worker);
      running.delete(slot.worker);
      slot.busy = false;
      job?.resolve(response);
      pump();
    };
    const attach = (slot) => {
      slot.worker.onmessage = (event) => settle(slot, event.data);
      slot.worker.onerror = (event) => {
        const job = running.get(slot.worker);
        const message = event?.message ?? "worker en \xE9chec";
        slot.worker.terminate();
        running.delete(slot.worker);
        slot.worker = spawn2();
        attach(slot);
        slot.busy = false;
        job?.resolve({ id: job.request.id, error: message });
        pump();
      };
    };
    function pump() {
      for (const slot of slots) {
        if (slot.busy) continue;
        const job = queue.shift();
        if (!job) return;
        slot.busy = true;
        running.set(slot.worker, job);
        slot.worker.postMessage(job.request);
      }
    }
    for (let i = 0; i < size; i += 1) {
      const slot = { worker: spawn2(), busy: false };
      attach(slot);
      slots.push(slot);
    }
    return {
      size,
      run: (request) => new Promise((resolve) => {
        queue.push({ request, resolve });
        pump();
      })
    };
  };

  // vendor/labrute/core/src/Achievements.ts
  var AchievementRarety = {
    common: "common",
    uncommon: "uncommon",
    rare: "rare",
    epic: "epic",
    legendary: "legendary"
  };
  var RaretyOrder = [
    AchievementRarety.common,
    AchievementRarety.uncommon,
    AchievementRarety.rare,
    AchievementRarety.epic,
    AchievementRarety.legendary
  ];
  var AchievementData = {
    wins: {
      rarety: AchievementRarety.common,
      illustration: "wins.svg",
      onePerFight: true
    },
    defeats: {
      rarety: AchievementRarety.common,
      illustration: "defeats.svg",
      onePerFight: true
    },
    flawless: {
      rarety: AchievementRarety.rare,
      illustration: "flawless.svg",
      onePerFight: true
    },
    winWith1HP: {
      rarety: AchievementRarety.epic,
      illustration: "winWith1HP.svg",
      onePerFight: true
    },
    steal2Weapons: {
      rarety: AchievementRarety.uncommon,
      illustration: "steal2Weapons.svg",
      onePerFight: true
    },
    singleHitWin: {
      rarety: AchievementRarety.epic,
      illustration: "singleHitWin.svg",
      onePerFight: true
    },
    combo3: {
      rarety: AchievementRarety.common,
      illustration: "combo3.svg",
      onePerFight: true
    },
    combo4: {
      rarety: AchievementRarety.uncommon,
      illustration: "combo4.svg",
      onePerFight: true
    },
    combo5: {
      rarety: AchievementRarety.rare,
      illustration: "combo5.svg",
      onePerFight: true
    },
    counter5: {
      rarety: AchievementRarety.uncommon,
      illustration: "counter5.svg",
      onePerFight: true
    },
    evade10: {
      rarety: AchievementRarety.uncommon,
      onePerFight: true
    },
    block25: {
      rarety: AchievementRarety.uncommon,
      onePerFight: true
    },
    counter4b2b: {
      rarety: AchievementRarety.uncommon,
      illustration: "counter4b2b.svg",
      onePerFight: true
    },
    reversal4b2b: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_paques.gif",
      onePerFight: true
    },
    block4b2b: {
      rarety: AchievementRarety.uncommon,
      illustration: "block4b2b.svg",
      onePerFight: true
    },
    evade4b2b: {
      rarety: AchievementRarety.uncommon,
      illustration: "evade4b2b.svg",
      onePerFight: true
    },
    throw10b2b: {
      rarety: AchievementRarety.uncommon,
      illustration: "throw10b2b.svg",
      onePerFight: true
    },
    disarm4: {
      rarety: AchievementRarety.uncommon,
      illustration: "disarm4.svg",
      onePerFight: true
    },
    disarm8: {
      rarety: AchievementRarety.uncommon,
      illustration: "disarm8.svg",
      onePerFight: true
    },
    damage50once: {
      rarety: AchievementRarety.common,
      illustration: "r_armag.gif",
      onePerFight: true
    },
    damage100once: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_armag.gif",
      onePerFight: true
    },
    hit20times: {
      rarety: AchievementRarety.common,
      illustration: "hit20times.svg",
      onePerFight: true
    },
    kill3pets: {
      rarety: AchievementRarety.uncommon,
      onePerFight: true
    },
    maxDamage: {
      rarety: AchievementRarety.common,
      max: true
    },
    hpHealed: {
      rarety: AchievementRarety.common
    },
    use10skills: {
      rarety: AchievementRarety.rare,
      illustration: "r_jtech.gif",
      onePerFight: true
    },
    saboteur: {
      rarety: AchievementRarety.common,
      illustration: "saboteur.svg"
    },
    dog: {
      rarety: AchievementRarety.common,
      illustration: "dog.svg",
      perBrute: 3
    },
    panther: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_animal.gif",
      perBrute: 1
    },
    bear: {
      rarety: AchievementRarety.uncommon,
      illustration: "bear.svg",
      perBrute: 1
    },
    panther_bear: {
      rarety: AchievementRarety.legendary,
      illustration: "r_share.gif",
      perBrute: 1
    },
    felAg_fistsOfF: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_heroac.gif",
      perBrute: 1
    },
    felAg_fistsOfF_untouch_relentless: {
      rarety: AchievementRarety.rare,
      illustration: "r_surlst.gif",
      perBrute: 1
    },
    vita_armor_toughened: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_brep.gif",
      perBrute: 1
    },
    herculStr_hammer_fierceBrute: {
      rarety: AchievementRarety.uncommon,
      illustration: "herculStr_hammer_fierceBrute.svg",
      perBrute: 1
    },
    shock: {
      rarety: AchievementRarety.common,
      illustration: "shock.svg",
      perBrute: 1
    },
    balletShoes_survival: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_doutsd.gif",
      perBrute: 1
    },
    cryOfTheDamned_hypnosis: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_forum.gif",
      perBrute: 1
    },
    shield_counterAttack: {
      rarety: AchievementRarety.uncommon,
      illustration: "shield_counterAttack.svg",
      perBrute: 1
    },
    reconnaissance_monk: {
      rarety: AchievementRarety.uncommon,
      illustration: "reconnaissance_monk.svg",
      perBrute: 1
    },
    immortality: {
      rarety: AchievementRarety.epic,
      illustration: "immortality.svg",
      perBrute: 1
    },
    doubleBoost: {
      rarety: AchievementRarety.rare,
      illustration: "doubleBoost.svg",
      perBrute: 1
    },
    tripleBoost: {
      rarety: AchievementRarety.epic,
      illustration: "tripleBoost.svg",
      perBrute: 1
    },
    quadrupleBoost: {
      rarety: AchievementRarety.legendary,
      illustration: "r_drug.gif",
      perBrute: 1
    },
    regeneration_potion: {
      rarety: AchievementRarety.uncommon,
      illustration: "bandage_potion.svg",
      perBrute: 1
    },
    bear_tamer: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_cannib.gif",
      perBrute: 1
    },
    tripleDogs: {
      rarety: AchievementRarety.uncommon,
      illustration: "tripleDogs.svg",
      perBrute: 1
    },
    fiveWeapons: {
      rarety: AchievementRarety.common,
      illustration: "fiveWeapons.svg",
      perBrute: 1
    },
    tenWeapons: {
      rarety: AchievementRarety.uncommon,
      illustration: "tenWeapons.svg",
      perBrute: 1
    },
    fifteenWeapons: {
      rarety: AchievementRarety.rare,
      illustration: "fifteenWeapons.svg",
      perBrute: 1
    },
    twentyWeapons: {
      rarety: AchievementRarety.epic,
      illustration: "r_watgun.gif",
      perBrute: 1
    },
    twentyThreeWeapons: {
      rarety: AchievementRarety.legendary,
      illustration: "r_watgun.gif",
      perBrute: 1
    },
    monk_sixthSense_whip: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_collec2.gif",
      perBrute: 1
    },
    weaponsMaster_sharp_bodybuilder_heavy: {
      rarety: AchievementRarety.uncommon,
      illustration: "weaponsMaster_sharp_bodybuilder_heavy.svg",
      perBrute: 1
    },
    hostility_counterWeapon: {
      rarety: AchievementRarety.uncommon,
      illustration: "hostility_counterWeapon.svg",
      perBrute: 1
    },
    flashFlood_twelveWeapons: {
      rarety: AchievementRarety.rare,
      illustration: "r_batgun.gif",
      perBrute: 1
    },
    lightningBolt_firstStrike: {
      rarety: AchievementRarety.uncommon,
      illustration: "lightningBolt_firstStrike.svg",
      perBrute: 1
    },
    herculeanStrength: {
      rarety: AchievementRarety.common,
      illustration: "herculeanStrength.svg",
      perBrute: 1
    },
    felineAgility: {
      rarety: AchievementRarety.common,
      illustration: "felineAgility.svg",
      perBrute: 1
    },
    lightningBolt: {
      rarety: AchievementRarety.common,
      illustration: "lightningBolt.svg",
      perBrute: 1
    },
    vitality: {
      rarety: AchievementRarety.common,
      illustration: "vitality.svg",
      perBrute: 1
    },
    potion_chef: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_cobaye.gif",
      perBrute: 1
    },
    tamer_net: {
      rarety: AchievementRarety.uncommon,
      perBrute: 1
    },
    untouchable_balletShoes: {
      rarety: AchievementRarety.uncommon,
      perBrute: 1
    },
    survival_resistant: {
      rarety: AchievementRarety.uncommon,
      perBrute: 1
    },
    hideaway_spy: {
      rarety: AchievementRarety.uncommon,
      perBrute: 1
    },
    weaponsFast3: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_tronco.gif",
      perBrute: 1
    },
    weaponsSharp3: {
      rarety: AchievementRarety.uncommon,
      illustration: "weaponsSharp3.svg",
      perBrute: 1
    },
    weaponsHeavy3: {
      rarety: AchievementRarety.uncommon,
      illustration: "weaponsHeavy3.svg",
      perBrute: 1
    },
    weaponsLong3: {
      rarety: AchievementRarety.uncommon,
      illustration: "weaponsLong3.svg",
      perBrute: 1
    },
    weaponsThrown3: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_sandb.gif",
      perBrute: 1
    },
    weaponsBlunt3: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_refine.gif",
      perBrute: 1
    },
    thor: {
      rarety: AchievementRarety.rare,
      perBrute: 1
    },
    deflector: {
      rarety: AchievementRarety.rare,
      perBrute: 1
    },
    allFastWeapons: {
      rarety: AchievementRarety.epic,
      perBrute: 1
    },
    allSharpWeapons: {
      rarety: AchievementRarety.epic,
      perBrute: 1
    },
    allHeavyWeapons: {
      rarety: AchievementRarety.epic,
      perBrute: 1
    },
    allLongWeapons: {
      rarety: AchievementRarety.epic,
      perBrute: 1
    },
    allThrownWeapons: {
      rarety: AchievementRarety.epic,
      perBrute: 1
    },
    allBluntWeapons: {
      rarety: AchievementRarety.epic,
      perBrute: 1
    },
    agility50: {
      rarety: AchievementRarety.uncommon,
      illustration: "agility50.svg",
      perBrute: 1
    },
    agility100: {
      rarety: AchievementRarety.rare,
      illustration: "agility100.svg",
      perBrute: 1
    },
    speed50: {
      rarety: AchievementRarety.uncommon,
      illustration: "speed50.svg",
      perBrute: 1
    },
    speed100: {
      rarety: AchievementRarety.rare,
      illustration: "speed100.svg",
      perBrute: 1
    },
    strength50: {
      rarety: AchievementRarety.uncommon,
      illustration: "strength50.svg",
      perBrute: 1
    },
    strength100: {
      rarety: AchievementRarety.rare,
      illustration: "strength100.svg",
      perBrute: 1
    },
    hp300: {
      rarety: AchievementRarety.uncommon,
      illustration: "hp300.svg",
      perBrute: 1
    },
    hp600: {
      rarety: AchievementRarety.rare,
      illustration: "hp600.svg",
      perBrute: 1
    },
    maxLevel: {
      rarety: AchievementRarety.common,
      illustration: "maxLevel.svg",
      max: true
    },
    allAchievements: {
      rarety: AchievementRarety.legendary,
      perBrute: 1
    },
    winTournamentAs20: {
      rarety: AchievementRarety.uncommon,
      illustration: "r_winthi.gif"
    },
    winTournamentAs15: {
      rarety: AchievementRarety.rare,
      illustration: "r_winthi.gif"
    },
    looseAgainst2: {
      rarety: AchievementRarety.uncommon,
      illustration: "looseAgainst2.svg"
    },
    looseAgainst3: {
      rarety: AchievementRarety.rare,
      illustration: "looseAgainst3.svg"
    },
    looseAgainst4: {
      rarety: AchievementRarety.epic,
      illustration: "looseAgainst4.svg"
    },
    winAgainst2: {
      rarety: AchievementRarety.uncommon,
      illustration: "winAgainst2.svg"
    },
    winAgainst3: {
      rarety: AchievementRarety.rare,
      illustration: "winAgainst3.svg"
    },
    winAgainst4: {
      rarety: AchievementRarety.epic,
      illustration: "winAgainst4.svg"
    },
    winAsLower: {
      rarety: AchievementRarety.rare,
      illustration: "r_winbas.gif"
    },
    win: {
      rarety: AchievementRarety.uncommon,
      illustration: "win.svg"
    },
    battleRoyaleWin: {
      rarety: AchievementRarety.legendary
    },
    rankUp10: {
      rarety: AchievementRarety.uncommon
    },
    rankUp9: {
      rarety: AchievementRarety.uncommon,
      illustration: "rankUp9.svg"
    },
    rankUp8: {
      rarety: AchievementRarety.uncommon,
      illustration: "rankUp8.svg"
    },
    rankUp7: {
      rarety: AchievementRarety.uncommon,
      illustration: "rankUp7.svg"
    },
    rankUp6: {
      rarety: AchievementRarety.uncommon,
      illustration: "rankUp6.svg"
    },
    rankUp5: {
      rarety: AchievementRarety.uncommon
    },
    rankUp4: {
      rarety: AchievementRarety.uncommon
    },
    rankUp3: {
      rarety: AchievementRarety.uncommon
    },
    rankUp2: {
      rarety: AchievementRarety.rare
    },
    rankUp1: {
      rarety: AchievementRarety.epic
    },
    rankUp0: {
      rarety: AchievementRarety.legendary
    },
    ascend: {
      rarety: AchievementRarety.legendary
    },
    sacrifice: {
      rarety: AchievementRarety.common,
      illustration: "sacrifice.svg"
    },
    beta: {
      rarety: AchievementRarety.legendary,
      illustration: "beta.svg"
    },
    bug: {
      rarety: AchievementRarety.legendary,
      illustration: "bug.svg"
    }
  };

  // vendor/labrute/core/src/constants.ts
  var import_prisma4 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/core/src/brute/pets.ts
  var import_prisma = __toESM(require_index_browser2(), 1);
  var pets = {
    [import_prisma.PetName.bear]: {
      name: import_prisma.PetName.bear,
      odds: 1,
      hpMalus: [0.4, 0.4, 0.4],
      initiative: [3.6, 3.6, 3.6],
      strength: [40, 45, 50],
      agility: [2, 4, 6],
      speed: [1, 3, 5],
      hp: [110, 120, 130],
      counter: [0, 0, 0],
      combo: [-0.2, -0.2, -0.2],
      block: [-0.25, -0.25, -0.25],
      evasion: [0.1, 0.15, 0.2],
      accuracy: [0.2, 0.3, 0.4],
      disarm: [0.05, 0.1, 0.15],
      damage: [5, 10, 15]
    },
    [import_prisma.PetName.panther]: {
      name: import_prisma.PetName.panther,
      odds: 1,
      hpMalus: [0.25, 0.25, 0.25],
      initiative: [0.6, 0.6, 0.6],
      strength: [23, 28, 33],
      agility: [16, 20, 24],
      speed: [24, 28, 32],
      hp: [26, 30, 34],
      counter: [0, 0, 0],
      combo: [0.7, 0.75, 0.8],
      block: [0, 0, 0],
      evasion: [0.2, 0.25, 0.3],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      damage: [3, 6, 9]
    },
    [import_prisma.PetName.dog3]: {
      name: import_prisma.PetName.dog3,
      odds: 2,
      hpMalus: [0.1, 0.1, 0.1],
      initiative: [0.1, 0.1, 0.1],
      strength: [8, 10, 12],
      agility: [7, 9, 11],
      speed: [5, 7, 9],
      hp: [16, 18, 20],
      counter: [0, 0, 0],
      combo: [0.3, 0.4, 0.5],
      block: [0, 0, 0],
      evasion: [0, 0, 0],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      damage: [5, 8, 11]
    },
    [import_prisma.PetName.dog2]: {
      name: import_prisma.PetName.dog2,
      odds: 8,
      hpMalus: [0.1, 0.1, 0.1],
      initiative: [0.1, 0.1, 0.1],
      strength: [7, 9, 11],
      agility: [6, 8, 10],
      speed: [4, 6, 8],
      hp: [15, 17, 19],
      counter: [0, 0, 0],
      combo: [0.25, 0.35, 0.45],
      block: [0, 0, 0],
      evasion: [0, 0, 0],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      damage: [4, 7, 10]
    },
    [import_prisma.PetName.dog1]: {
      name: import_prisma.PetName.dog1,
      odds: 20,
      hpMalus: [0.1, 0.1, 0.1],
      initiative: [0.1, 0.1, 0.1],
      strength: [6, 8, 10],
      agility: [5, 7, 9],
      speed: [3, 5, 7],
      hp: [14, 16, 18],
      counter: [0, 0, 0],
      combo: [0.2, 0.3, 0.4],
      block: [0, 0, 0],
      evasion: [0, 0, 0],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      damage: [3, 6, 9]
    }
  };
  var petList = Object.values(pets);
  var PETS_TOTAL_ODDS = petList.reduce((acc, pet) => acc + pet.odds, 0);

  // vendor/labrute/core/src/brute/skills.ts
  var import_prisma3 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/core/src/brute/weapons.ts
  var import_prisma2 = __toESM(require_index_browser2(), 1);
  var WeaponByName = {
    [import_prisma2.WeaponName.fan]: 0 /* fan */,
    [import_prisma2.WeaponName.keyboard]: 1 /* keyboard */,
    [import_prisma2.WeaponName.knife]: 2 /* knife */,
    [import_prisma2.WeaponName.leek]: 3 /* leek */,
    [import_prisma2.WeaponName.mug]: 4 /* mug */,
    [import_prisma2.WeaponName.sai]: 5 /* sai */,
    [import_prisma2.WeaponName.racquet]: 6 /* racquet */,
    [import_prisma2.WeaponName.axe]: 7 /* axe */,
    [import_prisma2.WeaponName.bumps]: 8 /* bumps */,
    [import_prisma2.WeaponName.flail]: 9 /* flail */,
    [import_prisma2.WeaponName.fryingPan]: 10 /* fryingPan */,
    [import_prisma2.WeaponName.hatchet]: 11 /* hatchet */,
    [import_prisma2.WeaponName.mammothBone]: 12 /* mammothBone */,
    [import_prisma2.WeaponName.morningStar]: 13 /* morningStar */,
    [import_prisma2.WeaponName.trombone]: 14 /* trombone */,
    [import_prisma2.WeaponName.baton]: 15 /* baton */,
    [import_prisma2.WeaponName.halbard]: 16 /* halbard */,
    [import_prisma2.WeaponName.lance]: 17 /* lance */,
    [import_prisma2.WeaponName.trident]: 18 /* trident */,
    [import_prisma2.WeaponName.whip]: 19 /* whip */,
    [import_prisma2.WeaponName.noodleBowl]: 20 /* noodleBowl */,
    [import_prisma2.WeaponName.piopio]: 21 /* piopio */,
    [import_prisma2.WeaponName.shuriken]: 22 /* shuriken */,
    [import_prisma2.WeaponName.broadsword]: 23 /* broadsword */,
    [import_prisma2.WeaponName.scimitar]: 24 /* scimitar */,
    [import_prisma2.WeaponName.sword]: 25 /* sword */
  };
  var WeaponById = {
    [0 /* fan */]: import_prisma2.WeaponName.fan,
    [1 /* keyboard */]: import_prisma2.WeaponName.keyboard,
    [2 /* knife */]: import_prisma2.WeaponName.knife,
    [3 /* leek */]: import_prisma2.WeaponName.leek,
    [4 /* mug */]: import_prisma2.WeaponName.mug,
    [5 /* sai */]: import_prisma2.WeaponName.sai,
    [6 /* racquet */]: import_prisma2.WeaponName.racquet,
    [7 /* axe */]: import_prisma2.WeaponName.axe,
    [8 /* bumps */]: import_prisma2.WeaponName.bumps,
    [9 /* flail */]: import_prisma2.WeaponName.flail,
    [10 /* fryingPan */]: import_prisma2.WeaponName.fryingPan,
    [11 /* hatchet */]: import_prisma2.WeaponName.hatchet,
    [12 /* mammothBone */]: import_prisma2.WeaponName.mammothBone,
    [13 /* morningStar */]: import_prisma2.WeaponName.morningStar,
    [14 /* trombone */]: import_prisma2.WeaponName.trombone,
    [15 /* baton */]: import_prisma2.WeaponName.baton,
    [16 /* halbard */]: import_prisma2.WeaponName.halbard,
    [17 /* lance */]: import_prisma2.WeaponName.lance,
    [18 /* trident */]: import_prisma2.WeaponName.trident,
    [19 /* whip */]: import_prisma2.WeaponName.whip,
    [20 /* noodleBowl */]: import_prisma2.WeaponName.noodleBowl,
    [21 /* piopio */]: import_prisma2.WeaponName.piopio,
    [22 /* shuriken */]: import_prisma2.WeaponName.shuriken,
    [23 /* broadsword */]: import_prisma2.WeaponName.broadsword,
    [24 /* scimitar */]: import_prisma2.WeaponName.scimitar,
    [25 /* sword */]: import_prisma2.WeaponName.sword
  };
  var WeaponType = {
    FAST: "fast",
    SHARP: "sharp",
    HEAVY: "heavy",
    LONG: "long",
    THROWN: "thrown",
    BLUNT: "blunt"
  };
  var WeaponAnimations = ["fist", "slash", "estoc", "whip"];
  var limitedWeapons = [
    "knife",
    "broadsword",
    "lance",
    "baton",
    "trident",
    "hatchet",
    "scimitar",
    "axe",
    "sword",
    "fan",
    "shuriken",
    "bumps",
    "morningStar",
    "mammothBone",
    "flail",
    "whip"
  ];
  var MAX_LIMITED_WEAPONS = limitedWeapons.length - 3;
  var weapons = {
    [import_prisma2.WeaponName.axe]: {
      name: "axe",
      odds: 3,
      types: ["heavy", "blunt"],
      tempo: [2.3, 2.3, 2.3],
      reversal: [-0.2, -0.2, -0.2],
      evasion: [-0.4, -0.4, -0.4],
      dexterity: [-0.8, -0.8, -0.8],
      block: [-0.5, -0.5, -0.5],
      accuracy: [0.5, 0.6, 0.7],
      disarm: [0.1, 0.15, 0.2],
      combo: [-0.4, -0.4, -0.4],
      deflect: [0, 0, 0],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [55, 75, 95],
      toss: [5, 7, 9],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.baton]: {
      name: "baton",
      odds: 70,
      types: ["long"],
      tempo: [1, 1, 1],
      reversal: [0.3, 0.35, 0.4],
      evasion: [0.05, 0.1, 0.15],
      dexterity: [0, 0, 0],
      block: [0.25, 0.3, 0.35],
      accuracy: [0, 0, 0],
      disarm: [0.25, 0.3, 0.35],
      combo: [0.1, 0.15, 0.2],
      deflect: [0, 0, 0],
      criticalChance: [0.2, 0.25, 0.3],
      criticalDamage: [0, 0, 0],
      damage: [6, 8, 10],
      toss: [3, 5, 7],
      reach: 3,
      animation: "estoc"
    },
    [import_prisma2.WeaponName.broadsword]: {
      name: "broadsword",
      odds: 100,
      types: ["sharp"],
      tempo: [1.2, 1.2, 1.2],
      reversal: [0.1, 0.15, 0.2],
      evasion: [0, 0, 0],
      dexterity: [0, 0, 0],
      block: [0.15, 0.25, 0.35],
      accuracy: [0, 0, 0],
      disarm: [0.15, 0.2, 0.25],
      combo: [0, 0, 0],
      deflect: [0, 0, 0],
      criticalChance: [0.3, 0.35, 0.4],
      criticalDamage: [0, 0, 0],
      damage: [10, 13, 16],
      toss: [5, 7, 9],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.bumps]: {
      name: "bumps",
      odds: 50,
      types: ["heavy", "blunt"],
      tempo: [2, 2, 2],
      reversal: [-0.3, -0.3, -0.3],
      evasion: [-0.3, -0.3, -0.3],
      dexterity: [-0.65, -0.6, -0.55],
      block: [-0.3, -0.3, -0.3],
      accuracy: [0.3, 0.4, 0.5],
      disarm: [0.1, 0.15, 0.2],
      combo: [-0.6, -0.55, -0.5],
      deflect: [0, 0, 0],
      criticalChance: [0.2, 0.3, 0.4],
      criticalDamage: [0, 0, 0],
      damage: [30, 40, 50],
      toss: [5, 7, 9],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.fan]: {
      name: "fan",
      odds: 2,
      types: ["fast"],
      tempo: [0.28, 0.28, 0.28],
      reversal: [0.5, 0.55, 0.6],
      evasion: [0.6, 0.65, 0.7],
      dexterity: [0.5, 0.55, 0.6],
      block: [-0.5, -0.5, -0.5],
      accuracy: [0, 0, 0],
      disarm: [-0.5, -0.5, -0.5],
      combo: [0.45, 0.5, 0.55],
      deflect: [0.25, 0.3, 0.35],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [4, 6, 8],
      toss: [5, 7, 9],
      reach: 0,
      animation: "slash"
    },
    [import_prisma2.WeaponName.flail]: {
      name: "flail",
      odds: 4,
      types: ["heavy", "blunt"],
      tempo: [2.2, 2.2, 2.2],
      reversal: [0, 0, 0],
      evasion: [-0.3, -0.3, -0.3],
      dexterity: [-1.6, -1.6, -1.6],
      block: [-0.5, -0.5, -0.5],
      accuracy: [1.5, 2, 2.5],
      disarm: [-0.2, -0.2, -0.2],
      combo: [0.3, 0.35, 0.4],
      deflect: [0, 0, 0],
      criticalChance: [-0.2, -0.2, -0.2],
      criticalDamage: [0, 0, 0],
      damage: [36, 42, 48],
      toss: [5, 7, 9],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.fryingPan]: {
      name: "fryingPan",
      odds: 0.4,
      types: ["heavy", "blunt"],
      tempo: [1.2, 1.2, 1.2],
      reversal: [0, 0, 0],
      evasion: [0, 0, 0],
      dexterity: [0, 0, 0],
      block: [0.4, 0.45, 0.5],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      combo: [-0.4, -0.4, -0.4],
      deflect: [0.4, 0.5, 0.6],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [17, 22, 27],
      toss: [2, 4, 6],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.halbard]: {
      name: "halbard",
      odds: 2,
      types: ["long", "heavy", "sharp"],
      tempo: [1.8, 1.8, 1.8],
      reversal: [0, 0, 0],
      evasion: [0, 0, 0],
      dexterity: [-0.4, -0.4, -0.4],
      block: [0, 0, 0],
      accuracy: [0, 0, 0],
      disarm: [0.1, 0.15, 0.2],
      combo: [0.1, 0.15, 0.2],
      deflect: [0, 0, 0],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [24, 30, 36],
      toss: [2, 4, 6],
      reach: 4,
      animation: "slash"
    },
    [import_prisma2.WeaponName.hatchet]: {
      name: "hatchet",
      odds: 40,
      types: ["heavy", "sharp"],
      tempo: [1.5, 1.5, 1.5],
      reversal: [0, 0, 0],
      evasion: [0, 0, 0],
      dexterity: [0, 0, 0],
      block: [-0.1, -0.1, -0.1],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      combo: [0, 0, 0],
      deflect: [0, 0, 0],
      criticalChance: [0.15, 0.25, 0.35],
      criticalDamage: [0, 0, 0],
      damage: [17, 22, 27],
      toss: [3, 5, 7],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.keyboard]: {
      name: "keyboard",
      odds: 0.4,
      types: ["fast", "blunt"],
      tempo: [1, 1, 1],
      reversal: [0, 0, 0],
      evasion: [0.1, 0.15, 0.2],
      dexterity: [0.2, 0.3, 0.4],
      block: [0, 0, 0],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      combo: [0.5, 0.55, 0.6],
      deflect: [0.3, 0.35, 0.4],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [7, 10, 13],
      toss: [2, 4, 6],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.knife]: {
      name: "knife",
      odds: 80,
      types: ["fast", "sharp"],
      tempo: [0.6, 0.6, 0.6],
      reversal: [0, 0, 0],
      evasion: [0.1, 0.15, 0.2],
      dexterity: [0.5, 0.55, 0.6],
      block: [0, 0, 0],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      combo: [0.3, 0.4, 0.5],
      deflect: [0, 0, 0],
      criticalChance: [0.25, 0.25, 0.25],
      criticalDamage: [0, 0, 0],
      damage: [7, 10, 13],
      toss: [5, 7, 9],
      reach: 0,
      animation: "estoc"
    },
    [import_prisma2.WeaponName.lance]: {
      name: "lance",
      odds: 40,
      types: ["long"],
      tempo: [1.2, 1.2, 1.2],
      reversal: [-0.1, -0.1, -0.1],
      evasion: [0, 0, 0],
      dexterity: [0, 0, 0],
      block: [0, 0, 0],
      accuracy: [0, 0, 0],
      disarm: [0.1, 0.15, 0.2],
      combo: [0, 0, 0],
      deflect: [0, 0, 0],
      criticalChance: [0.15, 0.25, 0.35],
      criticalDamage: [0, 0, 0],
      damage: [12, 16, 20],
      toss: [2, 4, 6],
      reach: 3,
      animation: "estoc"
    },
    [import_prisma2.WeaponName.leek]: {
      name: "leek",
      odds: 0.4,
      types: ["fast", "blunt"],
      tempo: [1.1, 1.1, 1.1],
      reversal: [1, 1, 1],
      evasion: [0, 0, 0],
      dexterity: [-1, -1, -1],
      block: [-0.5, -0.5, -0.5],
      accuracy: [2, 3, 4],
      disarm: [0, 0, 0],
      combo: [2, 3, 4],
      deflect: [0, 0, 0],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [5, 8, 11],
      toss: [2, 4, 6],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.mammothBone]: {
      name: "mammothBone",
      odds: 20,
      types: ["heavy", "blunt"],
      tempo: [1.6, 1.6, 1.6],
      reversal: [0, 0, 0],
      evasion: [0, 0, 0],
      dexterity: [-0.5, -0.5, -0.5],
      block: [0, 0, 0],
      accuracy: [0.5, 0.55, 0.6],
      disarm: [0.1, 0.15, 0.2],
      combo: [-0.1, -0.1, -0.1],
      deflect: [0, 0, 0],
      criticalChance: [0.15, 0.25, 0.35],
      criticalDamage: [0, 0, 0],
      damage: [14, 18, 22],
      toss: [5, 7, 9],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.morningStar]: {
      name: "morningStar",
      odds: 6,
      types: ["heavy", "blunt"],
      tempo: [1.5, 1.5, 1.5],
      reversal: [0, 0, 0],
      evasion: [-0.1, -0.1, -0.1],
      block: [0, 0, 0],
      accuracy: [0.3, 0.4, 0.5],
      dexterity: [-0.35, -0.35, -0.35],
      disarm: [0.1, 0.15, 0.2],
      combo: [0, 0, 0],
      deflect: [0, 0, 0],
      criticalChance: [0.05, 0.1, 0.15],
      criticalDamage: [0, 0, 0],
      damage: [20, 30, 40],
      toss: [5, 7, 9],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.mug]: {
      name: "mug",
      odds: 0.4,
      types: ["fast"],
      tempo: [0.9, 0.9, 0.9],
      reversal: [0, 0, 0],
      evasion: [0.15, 0.2, 0.25],
      dexterity: [0.3, 0.4, 0.5],
      block: [-0.1, -0.1, -0.1],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      combo: [0.4, 0.5, 0.6],
      deflect: [0, 0, 0],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [8, 12, 16],
      toss: [2, 4, 6],
      reach: 0,
      animation: "estoc"
    },
    [import_prisma2.WeaponName.noodleBowl]: {
      name: "noodleBowl",
      odds: 0.4,
      types: ["thrown"],
      tempo: [0.45, 0.45, 0.45],
      reversal: [0, 0, 0],
      evasion: [0.1, 0.15, 0.2],
      dexterity: [0, 0, 0],
      block: [-0.1, -0.1, -0.1],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      combo: [0.3, 0.4, 0.5],
      deflect: [0, 0, 0],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [10, 15, 20],
      toss: [2, 4, 6],
      reach: 0,
      animation: "fist"
    },
    [import_prisma2.WeaponName.piopio]: {
      name: "piopio",
      odds: 0.4,
      types: ["thrown"],
      tempo: [0.32, 0.32, 0.32],
      reversal: [0, 0, 0],
      evasion: [0.5, 0.55, 0.6],
      dexterity: [0, 0, 0],
      block: [-0.1, -0.1, -0.1],
      accuracy: [0, 0, 0],
      disarm: [0.5, 0.55, 0.6],
      combo: [0, 0, 0],
      deflect: [0, 0, 0],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [5, 8, 11],
      toss: [2, 4, 6],
      reach: 0,
      animation: "fist"
    },
    [import_prisma2.WeaponName.racquet]: {
      name: "racquet",
      odds: 0.4,
      types: ["fast", "blunt"],
      tempo: [0.8, 0.8, 0.8],
      reversal: [1, 1.5, 2],
      evasion: [0.1, 0.15, 0.2],
      dexterity: [0, 0, 0],
      block: [0.2, 0.25, 0.3],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      combo: [0, 0, 0],
      deflect: [0.5, 0.55, 0.6],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [6, 9, 12],
      toss: [2, 4, 6],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.sai]: {
      name: "sai",
      odds: 6,
      types: ["fast"],
      tempo: [0.6, 0.6, 0.6],
      reversal: [0, 0, 0],
      evasion: [0.1, 0.15, 0.2],
      dexterity: [0.25, 0.35, 0.45],
      block: [0.3, 0.35, 0.4],
      accuracy: [0, 0, 0],
      disarm: [0.75, 0.8, 0.85],
      combo: [0.3, 0.35, 0.4],
      deflect: [0.25, 0.35, 0.45],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [8, 12, 16],
      toss: [5, 7, 9],
      reach: 0,
      animation: "estoc"
    },
    [import_prisma2.WeaponName.scimitar]: {
      name: "scimitar",
      odds: 6,
      types: ["sharp"],
      tempo: [0.8, 0.8, 0.8],
      reversal: [0, 0, 0],
      evasion: [0, 0, 0],
      dexterity: [0.2, 0.3, 0.4],
      block: [0.1, 0.15, 0.2],
      accuracy: [0, 0, 0],
      disarm: [0, 0, 0],
      combo: [0.15, 0.25, 0.35],
      deflect: [0, 0, 0],
      criticalChance: [0.05, 0.1, 0.15],
      criticalDamage: [0, 0, 0],
      damage: [10, 15, 20],
      toss: [3, 5, 7],
      reach: 1,
      animation: "slash"
    },
    [import_prisma2.WeaponName.shuriken]: {
      name: "shuriken",
      odds: 8,
      types: ["thrown"],
      tempo: [0.12, 0.12, 0.12],
      reversal: [0, 0, 0],
      evasion: [0.15, 0.2, 0.25],
      dexterity: [0, 0, 0],
      block: [-0.1, -0.1, -0.1],
      accuracy: [0, 0, 0],
      disarm: [-0.5, -0.5, -0.5],
      combo: [0.3, 0.4, 0.5],
      deflect: [0, 0, 0],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [3, 5, 7],
      toss: [5, 7, 9],
      reach: 0,
      animation: "fist"
    },
    [import_prisma2.WeaponName.sword]: {
      name: "sword",
      odds: 4,
      types: ["sharp"],
      tempo: [1.8, 1.8, 1.8],
      reversal: [0, 0, 0],
      evasion: [-0.2, -0.2, -0.2],
      dexterity: [0.1, 0.15, 0.2],
      block: [0, 0, 0],
      accuracy: [-0.2, -0.2, -0.2],
      disarm: [0.1, 0.15, 0.2],
      combo: [0, 0, 0],
      deflect: [0, 0, 0],
      criticalChance: [0.05, 0.1, 0.15],
      criticalDamage: [0, 0, 0],
      damage: [28, 36, 44],
      toss: [5, 7, 9],
      reach: 2,
      animation: "slash"
    },
    [import_prisma2.WeaponName.trident]: {
      name: "trident",
      odds: 10,
      types: ["long"],
      tempo: [1.4, 1.4, 1.4],
      reversal: [0.05, 0.1, 0.15],
      evasion: [0, 0, 0],
      dexterity: [0, 0, 0],
      block: [0, 0, 0],
      accuracy: [0, 0, 0],
      disarm: [0.2, 0.3, 0.4],
      combo: [0, 0, 0],
      deflect: [0, 0, 0],
      criticalChance: [0.05, 0.1, 0.15],
      criticalDamage: [0, 0, 0],
      damage: [14, 18, 22],
      toss: [3, 5, 7],
      reach: 3,
      animation: "estoc"
    },
    [import_prisma2.WeaponName.trombone]: {
      name: "trombone",
      odds: 0.4,
      types: ["heavy", "blunt"],
      tempo: [2.5, 2.5, 2.5],
      reversal: [0, 0, 0],
      evasion: [0, 0, 0],
      dexterity: [-0.3, -0.3, -0.3],
      block: [0.2, 0.25, 0.3],
      accuracy: [0.2, 0.25, 0.3],
      disarm: [0.5, 0.55, 0.6],
      combo: [0.3, 0.35, 0.4],
      deflect: [0, 0, 0],
      criticalChance: [-0.1, -0.1, -0.1],
      criticalDamage: [0, 0, 0],
      damage: [20, 25, 30],
      toss: [2, 4, 6],
      reach: 2,
      animation: "slash"
    },
    [import_prisma2.WeaponName.whip]: {
      name: "whip",
      odds: 3,
      types: ["long"],
      tempo: [1.5, 1.5, 1.5],
      reversal: [-0.1, -0.1, -0.1],
      evasion: [0.3, 0.35, 0.4],
      dexterity: [0.5, 0.55, 0.6],
      block: [-0.2, -0.2, -0.2],
      accuracy: [-0.2, -0.2, -0.2],
      disarm: [0.3, 0.35, 0.4],
      combo: [0.35, 0.4, 0.45],
      deflect: [0, 0, 0],
      criticalChance: [0, 0, 0],
      criticalDamage: [0, 0, 0],
      damage: [10, 15, 20],
      toss: [5, 7, 9],
      reach: 5,
      animation: "whip"
    }
  };
  var weaponList = Object.values(weapons);
  var WEAPONS_TOTAL_ODDS = weaponList.reduce((acc, weapon) => acc + weapon.odds, 0);
  var WEAPONS_SFX = {
    ...weaponList.reduce((acc, weapon) => {
      acc[weapon.name] = [];
      if (weapon.name === "fryingPan") {
        acc[weapon.name] = ["fryingPan1", "fryingPan2"];
        return acc;
      }
      if (weapon.name === "baton") {
        acc[weapon.name] = ["baton1", "baton2", "baton3"];
        return acc;
      }
      if (weapon.name === "lance") {
        acc[weapon.name] = ["lance1", "lance2"];
        return acc;
      }
      if (weapon.name === "axe") {
        acc[weapon.name] = ["axe1", "axe2"];
        return acc;
      }
      if (weapon.name === "keyboard") {
        acc[weapon.name] = ["keyboard1", "keyboard2"];
        return acc;
      }
      if (weapon.name === "broadsword") {
        acc[weapon.name] = ["broadsword1", "broadsword2"];
        return acc;
      }
      if (weapon.name === "hatchet") {
        acc[weapon.name] = ["hatchet1", "hatchet2"];
        return acc;
      }
      if (weapon.name === "knife") {
        acc[weapon.name] = ["knife1", "knife2"];
        return acc;
      }
      if (weapon.name === "noodleBowl") {
        acc[weapon.name] = ["noodleBowl1", "noodleBowl2"];
        return acc;
      }
      if (weapon.name === "fan") {
        acc[weapon.name] = ["fan1", "fan2"];
        return acc;
      }
      if (weapon.name === "piopio") {
        acc[weapon.name] = ["piopio"];
        return acc;
      }
      if (weapon.name === "shuriken") {
        acc[weapon.name] = ["shuriken"];
        return acc;
      }
      if (weapon.name === "racquet") {
        acc[weapon.name] = ["racquet"];
        return acc;
      }
      if (weapon.name === "scimitar") {
        acc[weapon.name] = ["scimitar1", "scimitar2"];
        return acc;
      }
      if (weapon.name === "mammothBone") {
        acc[weapon.name] = ["mammothBone"];
        return acc;
      }
      if (weapon.name === "sword") {
        acc[weapon.name] = ["sword"];
        return acc;
      }
      if (weapon.name === "trombone") {
        acc[weapon.name] = ["trombone1", "trombone2"];
        return acc;
      }
      if (weapon.name === "whip") {
        acc[weapon.name] = ["whip"];
        return acc;
      }
      if (weapon.name === "leek") {
        acc[weapon.name] = ["leek"];
        return acc;
      }
      if (weapon.types.includes("sharp")) {
        acc[weapon.name].push("sharp1", "sharp2", "sharp3", "sharp4", "sharp5", "sharp6", "sharp7", "sharp8");
      } else {
        acc[weapon.name].push("blunt1", "blunt2", "blunt3", "blunt4", "blunt5", "blunt6", "blunt7", "blunt8");
      }
      return acc;
    }, {})
  };

  // vendor/labrute/core/src/brute/skills.ts
  var SkillByName = {
    [import_prisma3.SkillName.herculeanStrength]: 0 /* herculeanStrength */,
    [import_prisma3.SkillName.felineAgility]: 1 /* felineAgility */,
    [import_prisma3.SkillName.lightningBolt]: 2 /* lightningBolt */,
    [import_prisma3.SkillName.vitality]: 3 /* vitality */,
    [import_prisma3.SkillName.immortality]: 4 /* immortality */,
    [import_prisma3.SkillName.reconnaissance]: 5 /* reconnaissance */,
    [import_prisma3.SkillName.weaponsMaster]: 6 /* weaponsMaster */,
    [import_prisma3.SkillName.martialArts]: 7 /* martialArts */,
    [import_prisma3.SkillName.sixthSense]: 8 /* sixthSense */,
    [import_prisma3.SkillName.hostility]: 9 /* hostility */,
    [import_prisma3.SkillName.fistsOfFury]: 10 /* fistsOfFury */,
    [import_prisma3.SkillName.shield]: 11 /* shield */,
    [import_prisma3.SkillName.armor]: 12 /* armor */,
    [import_prisma3.SkillName.toughenedSkin]: 13 /* toughenedSkin */,
    [import_prisma3.SkillName.untouchable]: 14 /* untouchable */,
    [import_prisma3.SkillName.sabotage]: 15 /* sabotage */,
    [import_prisma3.SkillName.shock]: 16 /* shock */,
    [import_prisma3.SkillName.bodybuilder]: 17 /* bodybuilder */,
    [import_prisma3.SkillName.relentless]: 18 /* relentless */,
    [import_prisma3.SkillName.survival]: 19 /* survival */,
    [import_prisma3.SkillName.leadSkeleton]: 20 /* leadSkeleton */,
    [import_prisma3.SkillName.balletShoes]: 21 /* balletShoes */,
    [import_prisma3.SkillName.determination]: 22 /* determination */,
    [import_prisma3.SkillName.firstStrike]: 23 /* firstStrike */,
    [import_prisma3.SkillName.resistant]: 24 /* resistant */,
    [import_prisma3.SkillName.counterAttack]: 25 /* counterAttack */,
    [import_prisma3.SkillName.ironHead]: 26 /* ironHead */,
    [import_prisma3.SkillName.thief]: 27 /* thief */,
    [import_prisma3.SkillName.fierceBrute]: 28 /* fierceBrute */,
    [import_prisma3.SkillName.tragicPotion]: 29 /* tragicPotion */,
    [import_prisma3.SkillName.net]: 30 /* net */,
    [import_prisma3.SkillName.bomb]: 31 /* bomb */,
    [import_prisma3.SkillName.hammer]: 32 /* hammer */,
    [import_prisma3.SkillName.cryOfTheDamned]: 33 /* cryOfTheDamned */,
    [import_prisma3.SkillName.hypnosis]: 34 /* hypnosis */,
    [import_prisma3.SkillName.flashFlood]: 35 /* flashFlood */,
    [import_prisma3.SkillName.tamer]: 36 /* tamer */,
    [import_prisma3.SkillName.regeneration]: 37 /* regeneration */,
    [import_prisma3.SkillName.chef]: 38 /* chef */,
    [import_prisma3.SkillName.spy]: 39 /* spy */,
    [import_prisma3.SkillName.saboteur]: 40 /* saboteur */,
    [import_prisma3.SkillName.backup]: 41 /* backup */,
    [import_prisma3.SkillName.hideaway]: 42 /* hideaway */,
    [import_prisma3.SkillName.monk]: 43 /* monk */,
    [import_prisma3.SkillName.vampirism]: 44 /* vampirism */,
    [import_prisma3.SkillName.chaining]: 45 /* chaining */,
    [import_prisma3.SkillName.haste]: 46 /* haste */,
    [import_prisma3.SkillName.treat]: 47 /* treat */,
    [import_prisma3.SkillName.repulse]: 48 /* repulse */,
    [import_prisma3.SkillName.fastMetabolism]: 49 /* fastMetabolism */,
    [import_prisma3.SkillName.mimic]: 50 /* mimic */,
    [import_prisma3.SkillName.stickyHands]: 51 /* stickyHands */,
    [import_prisma3.SkillName.deity]: 52 /* deity */
  };
  var SkillById = {
    [0 /* herculeanStrength */]: import_prisma3.SkillName.herculeanStrength,
    [1 /* felineAgility */]: import_prisma3.SkillName.felineAgility,
    [2 /* lightningBolt */]: import_prisma3.SkillName.lightningBolt,
    [3 /* vitality */]: import_prisma3.SkillName.vitality,
    [4 /* immortality */]: import_prisma3.SkillName.immortality,
    [5 /* reconnaissance */]: import_prisma3.SkillName.reconnaissance,
    [6 /* weaponsMaster */]: import_prisma3.SkillName.weaponsMaster,
    [7 /* martialArts */]: import_prisma3.SkillName.martialArts,
    [8 /* sixthSense */]: import_prisma3.SkillName.sixthSense,
    [9 /* hostility */]: import_prisma3.SkillName.hostility,
    [10 /* fistsOfFury */]: import_prisma3.SkillName.fistsOfFury,
    [11 /* shield */]: import_prisma3.SkillName.shield,
    [12 /* armor */]: import_prisma3.SkillName.armor,
    [13 /* toughenedSkin */]: import_prisma3.SkillName.toughenedSkin,
    [14 /* untouchable */]: import_prisma3.SkillName.untouchable,
    [15 /* sabotage */]: import_prisma3.SkillName.sabotage,
    [16 /* shock */]: import_prisma3.SkillName.shock,
    [17 /* bodybuilder */]: import_prisma3.SkillName.bodybuilder,
    [18 /* relentless */]: import_prisma3.SkillName.relentless,
    [19 /* survival */]: import_prisma3.SkillName.survival,
    [20 /* leadSkeleton */]: import_prisma3.SkillName.leadSkeleton,
    [21 /* balletShoes */]: import_prisma3.SkillName.balletShoes,
    [22 /* determination */]: import_prisma3.SkillName.determination,
    [23 /* firstStrike */]: import_prisma3.SkillName.firstStrike,
    [24 /* resistant */]: import_prisma3.SkillName.resistant,
    [25 /* counterAttack */]: import_prisma3.SkillName.counterAttack,
    [26 /* ironHead */]: import_prisma3.SkillName.ironHead,
    [27 /* thief */]: import_prisma3.SkillName.thief,
    [28 /* fierceBrute */]: import_prisma3.SkillName.fierceBrute,
    [29 /* tragicPotion */]: import_prisma3.SkillName.tragicPotion,
    [30 /* net */]: import_prisma3.SkillName.net,
    [31 /* bomb */]: import_prisma3.SkillName.bomb,
    [32 /* hammer */]: import_prisma3.SkillName.hammer,
    [33 /* cryOfTheDamned */]: import_prisma3.SkillName.cryOfTheDamned,
    [34 /* hypnosis */]: import_prisma3.SkillName.hypnosis,
    [35 /* flashFlood */]: import_prisma3.SkillName.flashFlood,
    [36 /* tamer */]: import_prisma3.SkillName.tamer,
    [37 /* regeneration */]: import_prisma3.SkillName.regeneration,
    [38 /* chef */]: import_prisma3.SkillName.chef,
    [39 /* spy */]: import_prisma3.SkillName.spy,
    [40 /* saboteur */]: import_prisma3.SkillName.saboteur,
    [41 /* backup */]: import_prisma3.SkillName.backup,
    [42 /* hideaway */]: import_prisma3.SkillName.hideaway,
    [43 /* monk */]: import_prisma3.SkillName.monk,
    [44 /* vampirism */]: import_prisma3.SkillName.vampirism,
    [45 /* chaining */]: import_prisma3.SkillName.chaining,
    [46 /* haste */]: import_prisma3.SkillName.haste,
    [47 /* treat */]: import_prisma3.SkillName.treat,
    [48 /* repulse */]: import_prisma3.SkillName.repulse,
    [49 /* fastMetabolism */]: import_prisma3.SkillName.fastMetabolism,
    [50 /* mimic */]: import_prisma3.SkillName.mimic,
    [51 /* stickyHands */]: import_prisma3.SkillName.stickyHands,
    [52 /* deity */]: import_prisma3.SkillName.deity
  };
  var FightStat = {
    REVERSAL: "reversal",
    COUNTER: "counter",
    EVASION: "evasion",
    DEXTERITY: "dexterity",
    BLOCK: "block",
    ACCURACY: "accuracy",
    DISARM: "disarm",
    SABOTAGE: "sabotage",
    COMBO: "combo",
    DEFLECT: "deflect",
    ARMOR: "armor",
    DAMAGE: "damage",
    CRITICAL_CHANCE: "criticalChance",
    CRITICAL_DAMAGE: "criticalDamage",
    HIT_SPEED: "hitSpeed",
    INITIATIVE: "initiative",
    STRENGTH: "strength",
    AGILITY: "agility",
    SPEED: "speed",
    HP: "hp",
    REGENERATION: "regeneration",
    WEAPON_GRIP: "weaponGrip",
    SIZE: "size"
  };
  var skills = {
    [import_prisma3.SkillName.herculeanStrength]: {
      name: "herculeanStrength",
      odds: 60,
      type: "booster"
    },
    [import_prisma3.SkillName.felineAgility]: {
      name: "felineAgility",
      odds: 60,
      type: "booster"
    },
    [import_prisma3.SkillName.lightningBolt]: {
      name: "lightningBolt",
      odds: 60,
      type: "booster"
    },
    [import_prisma3.SkillName.vitality]: {
      name: "vitality",
      odds: 60,
      type: "booster"
    },
    [import_prisma3.SkillName.immortality]: {
      name: "immortality",
      odds: 0.14,
      type: "booster"
    },
    [import_prisma3.SkillName.reconnaissance]: {
      name: "reconnaissance",
      odds: 1,
      type: "booster"
    },
    [import_prisma3.SkillName.deity]: {
      name: "deity",
      odds: 2,
      type: "booster"
    },
    [import_prisma3.SkillName.weaponsMaster]: {
      name: "weaponsMaster",
      odds: 10,
      type: "passive"
    },
    [import_prisma3.SkillName.martialArts]: {
      name: "martialArts",
      odds: 10,
      type: "passive"
    },
    [import_prisma3.SkillName.sixthSense]: {
      name: "sixthSense",
      odds: 20,
      type: "passive"
    },
    [import_prisma3.SkillName.hostility]: {
      name: "hostility",
      odds: 4,
      type: "passive"
    },
    [import_prisma3.SkillName.fistsOfFury]: {
      name: "fistsOfFury",
      odds: 10,
      type: "passive"
    },
    [import_prisma3.SkillName.shield]: {
      name: "shield",
      odds: 10,
      type: "passive"
    },
    [import_prisma3.SkillName.armor]: {
      name: "armor",
      odds: 4,
      type: "passive"
    },
    [import_prisma3.SkillName.toughenedSkin]: {
      name: "toughenedSkin",
      odds: 30,
      type: "passive"
    },
    [import_prisma3.SkillName.untouchable]: {
      name: "untouchable",
      odds: 1,
      type: "passive"
    },
    [import_prisma3.SkillName.sabotage]: {
      name: "sabotage",
      odds: 3,
      type: "passive"
    },
    [import_prisma3.SkillName.shock]: {
      name: "shock",
      odds: 4,
      type: "passive"
    },
    [import_prisma3.SkillName.bodybuilder]: {
      name: "bodybuilder",
      odds: 5,
      type: "passive"
    },
    [import_prisma3.SkillName.relentless]: {
      name: "relentless",
      odds: 4,
      type: "passive"
    },
    [import_prisma3.SkillName.survival]: {
      name: "survival",
      odds: 4,
      type: "passive"
    },
    [import_prisma3.SkillName.leadSkeleton]: {
      name: "leadSkeleton",
      odds: 4,
      type: "passive"
    },
    [import_prisma3.SkillName.balletShoes]: {
      name: "balletShoes",
      odds: 4,
      type: "passive"
    },
    [import_prisma3.SkillName.determination]: {
      name: "determination",
      odds: 4,
      type: "passive"
    },
    [import_prisma3.SkillName.firstStrike]: {
      name: "firstStrike",
      odds: 8,
      type: "passive"
    },
    [import_prisma3.SkillName.resistant]: {
      name: "resistant",
      odds: 3,
      type: "passive"
    },
    [import_prisma3.SkillName.counterAttack]: {
      name: "counterAttack",
      odds: 10,
      type: "passive"
    },
    [import_prisma3.SkillName.ironHead]: {
      name: "ironHead",
      odds: 4,
      type: "passive"
    },
    [import_prisma3.SkillName.thief]: {
      name: "thief",
      odds: 2.5,
      type: "super",
      toss: [8, 10, 12],
      uses: [2, 3, 4]
    },
    [import_prisma3.SkillName.fierceBrute]: {
      name: "fierceBrute",
      odds: 20,
      type: "super",
      toss: [5, 8, 11],
      uses: [1, 2, 3]
    },
    [import_prisma3.SkillName.tragicPotion]: {
      name: "tragicPotion",
      odds: 8,
      type: "super",
      toss: [10, 12, 14],
      uses: [1, 2, 3]
    },
    [import_prisma3.SkillName.net]: {
      name: "net",
      odds: 16,
      type: "super",
      toss: [10, 12, 14],
      uses: [1, 2, 3]
    },
    [import_prisma3.SkillName.bomb]: {
      name: "bomb",
      odds: 6,
      type: "super",
      toss: [2, 4, 6],
      uses: [2, 3, 4]
    },
    [import_prisma3.SkillName.hammer]: {
      name: "hammer",
      odds: 1,
      type: "super",
      toss: [2, 4, 6],
      uses: [1, 2, 3]
    },
    [import_prisma3.SkillName.cryOfTheDamned]: {
      name: "cryOfTheDamned",
      odds: 4,
      type: "super",
      toss: [8, 10, 12],
      uses: [2, 3, 4]
    },
    [import_prisma3.SkillName.hypnosis]: {
      name: "hypnosis",
      odds: 0.5,
      type: "super",
      toss: [6, 8, 10],
      uses: [1, 2, 3]
    },
    [import_prisma3.SkillName.flashFlood]: {
      name: "flashFlood",
      odds: 0.5,
      type: "super",
      toss: [2, 4, 6],
      uses: [3, 4, 5]
    },
    [import_prisma3.SkillName.tamer]: {
      name: "tamer",
      odds: 4,
      type: "super",
      toss: [20, 22, 24],
      uses: [4, 5, 6]
    },
    [import_prisma3.SkillName.regeneration]: {
      name: "regeneration",
      odds: 3,
      type: "talent"
    },
    [import_prisma3.SkillName.chef]: {
      name: "chef",
      odds: 1,
      type: "talent"
    },
    [import_prisma3.SkillName.spy]: {
      name: "spy",
      odds: 3,
      type: "talent"
    },
    [import_prisma3.SkillName.saboteur]: {
      name: "saboteur",
      odds: 3,
      type: "talent"
    },
    [import_prisma3.SkillName.backup]: {
      name: "backup",
      odds: 5,
      type: "talent"
    },
    [import_prisma3.SkillName.hideaway]: {
      name: "hideaway",
      odds: 5,
      type: "talent"
    },
    [import_prisma3.SkillName.monk]: {
      name: "monk",
      odds: 5,
      type: "talent"
    },
    [import_prisma3.SkillName.vampirism]: {
      name: "vampirism",
      odds: 10,
      type: "super",
      toss: [5, 8, 11],
      uses: [1, 2, 3]
    },
    [import_prisma3.SkillName.chaining]: {
      name: "chaining",
      odds: 5,
      type: "passive"
    },
    [import_prisma3.SkillName.haste]: {
      name: "haste",
      odds: 5,
      type: "super",
      toss: [3, 5, 7],
      uses: [1, 2, 3]
    },
    [import_prisma3.SkillName.treat]: {
      name: "treat",
      odds: 20,
      type: "super",
      toss: [5, 8, 11],
      uses: [4, 5, 6]
    },
    [import_prisma3.SkillName.repulse]: {
      name: "repulse",
      odds: 10,
      type: "passive"
    },
    [import_prisma3.SkillName.fastMetabolism]: {
      name: "fastMetabolism",
      odds: 5,
      type: "passive"
    },
    [import_prisma3.SkillName.mimic]: {
      name: "mimic",
      odds: 5,
      type: "super",
      uses: [1, 2, 3]
    },
    [import_prisma3.SkillName.stickyHands]: {
      name: "stickyHands",
      odds: 5,
      type: "passive"
    }
  };
  var skillList = Object.values(skills);
  var SKILLS_TOTAL_ODDS = skillList.reduce((acc, skill) => acc + skill.odds, 0);
  var SkillModifiers = {
    [import_prisma3.SkillName.herculeanStrength]: {
      [FightStat.STRENGTH]: { flat: [3, 5, 7], percent: [0.5, 0.6, 0.7] }
    },
    [import_prisma3.SkillName.felineAgility]: {
      [FightStat.AGILITY]: { flat: [3, 5, 7], percent: [0.5, 0.6, 0.7] }
    },
    [import_prisma3.SkillName.lightningBolt]: {
      [FightStat.SPEED]: { flat: [3, 5, 7], percent: [0.5, 0.6, 0.7] }
    },
    [import_prisma3.SkillName.vitality]: {
      [FightStat.HP]: { flat: [18, 30, 42], percent: [0.5, 0.6, 0.7] }
    },
    [import_prisma3.SkillName.immortality]: {
      [FightStat.HP]: { percent: [2.5, 3, 3.5] },
      [FightStat.STRENGTH]: { percent: [-0.25, -0.25, -0.25] },
      [FightStat.AGILITY]: { percent: [-0.25, -0.25, -0.25] },
      [FightStat.SPEED]: { percent: [-0.25, -0.25, -0.25] }
    },
    [import_prisma3.SkillName.reconnaissance]: {
      [FightStat.INITIATIVE]: { flat: [-200, -200, -200] },
      [FightStat.SPEED]: { flat: [5, 10, 15], percent: [1.5, 2, 2.5] },
      [FightStat.CRITICAL_DAMAGE]: { percent: [0.5, 0.6, 0.7] }
    },
    [import_prisma3.SkillName.deity]: {
      [FightStat.SIZE]: { percent: [0.5, 0.5, 0.5] },
      [FightStat.HP]: { percent: [1, 1.25, 1.5] },
      [FightStat.STRENGTH]: { percent: [1, 1.25, 1.5] },
      [FightStat.REVERSAL]: { percent: [0.4, 0.5, 0.6] },
      [FightStat.AGILITY]: { percent: [-1, -1, -1] },
      [FightStat.SPEED]: { percent: [-1, -1, -1] },
      [FightStat.DEXTERITY]: { percent: [-1, -1, -1] },
      [FightStat.EVASION]: { percent: [-1, -1, -1] },
      [FightStat.INITIATIVE]: { flat: [-200, -200, -200] }
    },
    [import_prisma3.SkillName.weaponsMaster]: {
      [FightStat.DAMAGE]: { percent: [0.5, 0.75, 1], weaponType: WeaponType.SHARP }
    },
    [import_prisma3.SkillName.martialArts]: {
      [FightStat.DAMAGE]: { percent: [1, 1.5, 2], weaponType: null }
    },
    [import_prisma3.SkillName.sixthSense]: {
      [FightStat.COUNTER]: { percent: [0.1, 0.15, 0.2] }
    },
    [import_prisma3.SkillName.hostility]: {
      [FightStat.REVERSAL]: { percent: [0.3, 0.35, 0.4] }
    },
    [import_prisma3.SkillName.fistsOfFury]: {
      [FightStat.COMBO]: { percent: [0.2, 0.3, 0.4] }
    },
    [import_prisma3.SkillName.shield]: {
      [FightStat.BLOCK]: { percent: [0.45, 0.5, 0.55] },
      [FightStat.DAMAGE]: { percent: [-0.25, -0.25, -0.25] }
    },
    [import_prisma3.SkillName.armor]: {
      [FightStat.ARMOR]: { percent: [0.25, 0.3, 0.35] },
      [FightStat.SPEED]: { percent: [-0.15, -0.15, -0.15] }
    },
    [import_prisma3.SkillName.toughenedSkin]: {
      [FightStat.ARMOR]: { percent: [0.1, 0.15, 0.2] }
    },
    [import_prisma3.SkillName.untouchable]: {
      [FightStat.EVASION]: { percent: [0.3, 0.4, 0.5] }
    },
    [import_prisma3.SkillName.sabotage]: {
      [FightStat.SABOTAGE]: { percent: [0.5, 0.75, 0.9] }
    },
    [import_prisma3.SkillName.shock]: {
      [FightStat.DISARM]: { percent: [0.5, 0.6, 0.7] }
    },
    [import_prisma3.SkillName.bodybuilder]: {
      [FightStat.HIT_SPEED]: { percent: [0.4, 0.5, 0.6], weaponType: WeaponType.HEAVY },
      [FightStat.DEXTERITY]: { percent: [0.1, 0.15, 0.2], weaponType: WeaponType.HEAVY }
    },
    [import_prisma3.SkillName.relentless]: {
      [FightStat.ACCURACY]: { percent: [0.3, 0.4, 0.5] }
    },
    [import_prisma3.SkillName.survival]: {
      [FightStat.BLOCK]: { percent: [0.2, 0.3, 0.4], details: "atOneHp" },
      [FightStat.EVASION]: { percent: [0.2, 0.3, 0.4], details: "atOneHp" }
    },
    [import_prisma3.SkillName.leadSkeleton]: {
      [FightStat.ARMOR]: { percent: [0.15, 0.25, 0.35] },
      [FightStat.DAMAGE]: {
        percent: [-0.15, -0.2, -0.25],
        weaponType: WeaponType.BLUNT,
        opponent: true
      },
      [FightStat.EVASION]: { percent: [-0.15, -0.15, -0.15] }
    },
    [import_prisma3.SkillName.balletShoes]: {
      [FightStat.EVASION]: { percent: [0.1, 0.15, 0.2] }
    },
    [import_prisma3.SkillName.determination]: {},
    [import_prisma3.SkillName.firstStrike]: {
      [FightStat.INITIATIVE]: { flat: [200, 300, 400] }
    },
    [import_prisma3.SkillName.resistant]: {},
    [import_prisma3.SkillName.counterAttack]: {
      [FightStat.BLOCK]: { percent: [0.1, 0.15, 0.2] },
      [FightStat.REVERSAL]: { percent: [0.9, 0.95, 0.99], details: "afterBlock" }
    },
    [import_prisma3.SkillName.ironHead]: {},
    [import_prisma3.SkillName.thief]: {},
    [import_prisma3.SkillName.fierceBrute]: {
      [FightStat.CRITICAL_CHANCE]: { percent: [0.1, 0.2, 0.3] }
    },
    [import_prisma3.SkillName.tragicPotion]: {},
    [import_prisma3.SkillName.net]: {},
    [import_prisma3.SkillName.bomb]: {},
    [import_prisma3.SkillName.hammer]: {},
    [import_prisma3.SkillName.cryOfTheDamned]: {},
    [import_prisma3.SkillName.hypnosis]: {},
    [import_prisma3.SkillName.flashFlood]: {},
    [import_prisma3.SkillName.tamer]: {},
    [import_prisma3.SkillName.regeneration]: {
      [FightStat.ARMOR]: { percent: [0, 0.02, 0.05] }
    },
    [import_prisma3.SkillName.chef]: {},
    [import_prisma3.SkillName.spy]: {},
    [import_prisma3.SkillName.saboteur]: {},
    [import_prisma3.SkillName.backup]: {},
    [import_prisma3.SkillName.hideaway]: {
      [FightStat.BLOCK]: { percent: [0.25, 0.3, 0.35], details: "againstThrows" }
    },
    [import_prisma3.SkillName.monk]: {
      [FightStat.COUNTER]: { percent: [0.4, 0.45, 0.5] },
      [FightStat.INITIATIVE]: { flat: [-200, -200, -200] },
      [FightStat.HIT_SPEED]: { percent: [-1, -1, -1] }
    },
    [import_prisma3.SkillName.vampirism]: {},
    [import_prisma3.SkillName.chaining]: {
      [FightStat.COMBO]: { percent: [0, 0.1, 0.2] }
    },
    [import_prisma3.SkillName.haste]: {
      [FightStat.CRITICAL_CHANCE]: { percent: [0.05, 0.1, 0.15] }
    },
    [import_prisma3.SkillName.treat]: {},
    [import_prisma3.SkillName.repulse]: {
      [FightStat.DEFLECT]: { percent: [0.3, 0.35, 0.4] },
      [FightStat.CRITICAL_CHANCE]: { percent: [0.05, 0.1, 0.15] }
    },
    [import_prisma3.SkillName.fastMetabolism]: {
      [FightStat.REGENERATION]: { percent: [0.01, 0.02, 0.03] },
      [FightStat.HIT_SPEED]: { percent: [-0.5, -0.65, -0.8] },
      [FightStat.CRITICAL_CHANCE]: { percent: [-0.05, -0.1, -0.15] }
    },
    [import_prisma3.SkillName.mimic]: {},
    [import_prisma3.SkillName.stickyHands]: {
      [FightStat.WEAPON_GRIP]: { percent: [0.5, 0.6, 0.7] }
    }
  };
  var ExtraTieredSkillData = {
    [import_prisma3.SkillName.determination]: [0.6, 0.7, 0.8],
    [import_prisma3.SkillName.resistant]: [0.25, 0.2, 0.17],
    [import_prisma3.SkillName.ironHead]: [0.4, 0.5, 0.6],
    [import_prisma3.SkillName.chef]: [1.5, 2, 2.5],
    [import_prisma3.SkillName.spy]: [0.2, 0.25, 0.3],
    [import_prisma3.SkillName.saboteur]: [100, 150, 200],
    [import_prisma3.SkillName.backup]: [2.8, 3.3, 3.8]
  };
  var SkillDamageModifiers = Object.entries(SkillModifiers).filter(([_, modifiers2]) => modifiers2[FightStat.DAMAGE]).map(([skill, modifiers2]) => ({
    skill,
    ...modifiers2[FightStat.DAMAGE]
  }));

  // vendor/labrute/core/src/constants.ts
  var FIGHTS_PER_DAY = 6;
  var ARENA_OPPONENTS_MAX_GAP = 2;
  var PERKS_TOTAL_ODDS = WEAPONS_TOTAL_ODDS + PETS_TOTAL_ODDS + SKILLS_TOTAL_ODDS;
  var Animations = [
    "arrive",
    "attack",
    "block",
    "death",
    "drink",
    "eat",
    "equip",
    "evade",
    "grab",
    "grabbed",
    "hit",
    "hit-0",
    "hit-1",
    "hit-2",
    "idle",
    "launch",
    "monk",
    "prepare-throw",
    "run",
    "stolen",
    "steal",
    "strengthen",
    "throw",
    "train",
    "train2",
    "trapped",
    "trash",
    "win",
    ...WeaponAnimations
  ];
  var FIGHTER_HEIGHT = {
    brute: 80,
    [import_prisma4.PetName.bear]: 100,
    [import_prisma4.PetName.panther]: 60,
    dog: 40
  };
  var FIGHTER_WIDTH = {
    brute: 50,
    [import_prisma4.PetName.bear]: 100,
    [import_prisma4.PetName.panther]: 87,
    dog: 58
  };
  var FIGHTER_HIT_ANCHOR = {
    brute: { x: 5, y: 40 },
    [import_prisma4.PetName.bear]: { x: 60, y: 100 },
    [import_prisma4.PetName.panther]: { x: 45, y: 45 },
    dog: { x: 30, y: 30 }
  };
  var DailyModifierOdds = [
    { modifier: import_prisma4.FightModifier.noThrows, odds: 1 },
    { modifier: import_prisma4.FightModifier.focusOpponent, odds: 1 },
    { modifier: import_prisma4.FightModifier.alwaysUseSupers, odds: 1 },
    { modifier: import_prisma4.FightModifier.drawEveryWeapon, odds: 1 },
    { modifier: import_prisma4.FightModifier.doubleAgility, odds: 1 },
    { modifier: import_prisma4.FightModifier.randomSkill, odds: 1 },
    { modifier: import_prisma4.FightModifier.randomWeapon, odds: 1 },
    { modifier: import_prisma4.FightModifier.bareHandsFirstHit, odds: 1 },
    { modifier: import_prisma4.FightModifier.startWithWeapon, odds: 1 },
    { modifier: import_prisma4.FightModifier.chaos, odds: 0 }
  ];
  var DailyModifierSpawnChance = 4 / 30;
  var EventFightsPerDay = 10;
  var DEFAULT_LANGUAGE = import_prisma4.Lang.en;
  var CSRF_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1e3;

  // vendor/labrute/core/src/Titles.ts
  var BaseTitleRequirements = {
    massive: [5e3, 1e4, 25e3, 5e4, 1e5],
    [AchievementRarety.common]: [250, 500, 1e3, 2500, 5e3],
    [AchievementRarety.uncommon]: [50, 100, 250, 500, 1e3],
    [AchievementRarety.rare]: [10, 25, 50, 100, 250],
    [AchievementRarety.epic]: [5, 10, 25, 50, 100],
    [AchievementRarety.legendary]: [1, 5, 10, 25, 50]
  };
  var BruteUniqueTitleRequirements = [1, 2, 3, 4, 5];
  var TitleRequirements = {
    wins: BaseTitleRequirements[AchievementData.wins.rarety],
    defeats: BaseTitleRequirements[AchievementData.defeats.rarety],
    flawless: BaseTitleRequirements[AchievementData.flawless.rarety],
    winWith1HP: BaseTitleRequirements[AchievementData.winWith1HP.rarety],
    steal2Weapons: BaseTitleRequirements[AchievementData.steal2Weapons.rarety],
    singleHitWin: BaseTitleRequirements[AchievementData.singleHitWin.rarety],
    combo3: BaseTitleRequirements[AchievementData.combo3.rarety],
    combo4: BaseTitleRequirements[AchievementData.combo4.rarety],
    combo5: BaseTitleRequirements[AchievementData.combo5.rarety],
    counter5: BaseTitleRequirements[AchievementData.counter5.rarety],
    evade10: BaseTitleRequirements[AchievementData.evade10.rarety],
    block25: BaseTitleRequirements[AchievementData.block25.rarety],
    counter4b2b: BaseTitleRequirements[AchievementData.counter4b2b.rarety],
    reversal4b2b: BaseTitleRequirements[AchievementData.reversal4b2b.rarety],
    block4b2b: BaseTitleRequirements[AchievementData.block4b2b.rarety],
    evade4b2b: BaseTitleRequirements[AchievementData.evade4b2b.rarety],
    throw10b2b: BaseTitleRequirements[AchievementData.throw10b2b.rarety],
    disarm4: BaseTitleRequirements[AchievementData.disarm4.rarety],
    disarm8: BaseTitleRequirements[AchievementData.disarm8.rarety],
    damage50once: BaseTitleRequirements[AchievementData.damage50once.rarety],
    damage100once: BaseTitleRequirements[AchievementData.damage100once.rarety],
    hit20times: BaseTitleRequirements[AchievementData.hit20times.rarety],
    kill3pets: BaseTitleRequirements[AchievementData.kill3pets.rarety],
    maxDamage: BaseTitleRequirements[AchievementData.maxDamage.rarety],
    hpHealed: BaseTitleRequirements.massive,
    use10skills: BaseTitleRequirements[AchievementData.use10skills.rarety],
    saboteur: BaseTitleRequirements[AchievementData.saboteur.rarety],
    dog: [3, 6, 9, 12, 15],
    panther: BruteUniqueTitleRequirements,
    bear: BruteUniqueTitleRequirements,
    panther_bear: BruteUniqueTitleRequirements,
    felAg_fistsOfF: BruteUniqueTitleRequirements,
    felAg_fistsOfF_untouch_relentless: BruteUniqueTitleRequirements,
    vita_armor_toughened: BruteUniqueTitleRequirements,
    herculStr_hammer_fierceBrute: BruteUniqueTitleRequirements,
    shock: BaseTitleRequirements[AchievementData.shock.rarety],
    balletShoes_survival: BruteUniqueTitleRequirements,
    cryOfTheDamned_hypnosis: BruteUniqueTitleRequirements,
    shield_counterAttack: BruteUniqueTitleRequirements,
    reconnaissance_monk: BruteUniqueTitleRequirements,
    immortality: BruteUniqueTitleRequirements,
    doubleBoost: BruteUniqueTitleRequirements,
    tripleBoost: BruteUniqueTitleRequirements,
    quadrupleBoost: BruteUniqueTitleRequirements,
    regeneration_potion: BruteUniqueTitleRequirements,
    bear_tamer: BruteUniqueTitleRequirements,
    tripleDogs: BruteUniqueTitleRequirements,
    fiveWeapons: BruteUniqueTitleRequirements,
    tenWeapons: BruteUniqueTitleRequirements,
    fifteenWeapons: BruteUniqueTitleRequirements,
    twentyWeapons: BruteUniqueTitleRequirements,
    twentyThreeWeapons: BruteUniqueTitleRequirements,
    monk_sixthSense_whip: BruteUniqueTitleRequirements,
    weaponsMaster_sharp_bodybuilder_heavy: BruteUniqueTitleRequirements,
    hostility_counterWeapon: BruteUniqueTitleRequirements,
    flashFlood_twelveWeapons: BruteUniqueTitleRequirements,
    lightningBolt_firstStrike: BruteUniqueTitleRequirements,
    herculeanStrength: BruteUniqueTitleRequirements,
    felineAgility: BruteUniqueTitleRequirements,
    lightningBolt: BruteUniqueTitleRequirements,
    vitality: BruteUniqueTitleRequirements,
    potion_chef: BruteUniqueTitleRequirements,
    tamer_net: BruteUniqueTitleRequirements,
    untouchable_balletShoes: BruteUniqueTitleRequirements,
    survival_resistant: BruteUniqueTitleRequirements,
    hideaway_spy: BruteUniqueTitleRequirements,
    weaponsFast3: BruteUniqueTitleRequirements,
    weaponsSharp3: BruteUniqueTitleRequirements,
    weaponsHeavy3: BruteUniqueTitleRequirements,
    weaponsLong3: BruteUniqueTitleRequirements,
    weaponsThrown3: BruteUniqueTitleRequirements,
    weaponsBlunt3: BruteUniqueTitleRequirements,
    thor: BruteUniqueTitleRequirements,
    deflector: BruteUniqueTitleRequirements,
    allFastWeapons: BruteUniqueTitleRequirements,
    allSharpWeapons: BruteUniqueTitleRequirements,
    allHeavyWeapons: BruteUniqueTitleRequirements,
    allLongWeapons: BruteUniqueTitleRequirements,
    allThrownWeapons: BruteUniqueTitleRequirements,
    allBluntWeapons: BruteUniqueTitleRequirements,
    agility50: BruteUniqueTitleRequirements,
    agility100: BruteUniqueTitleRequirements,
    speed50: BruteUniqueTitleRequirements,
    speed100: BruteUniqueTitleRequirements,
    strength50: BruteUniqueTitleRequirements,
    strength100: BruteUniqueTitleRequirements,
    hp300: BruteUniqueTitleRequirements,
    hp600: BruteUniqueTitleRequirements,
    maxLevel: [50, 75, 100, 125, 150],
    allAchievements: BruteUniqueTitleRequirements,
    winTournamentAs20: BaseTitleRequirements[AchievementData.winTournamentAs20.rarety],
    winTournamentAs15: BaseTitleRequirements[AchievementData.winTournamentAs15.rarety],
    looseAgainst2: BaseTitleRequirements[AchievementData.looseAgainst2.rarety],
    looseAgainst3: BaseTitleRequirements[AchievementData.looseAgainst3.rarety],
    looseAgainst4: BaseTitleRequirements[AchievementData.looseAgainst4.rarety],
    winAgainst2: BaseTitleRequirements[AchievementData.winAgainst2.rarety],
    winAgainst3: BaseTitleRequirements[AchievementData.winAgainst3.rarety],
    winAgainst4: BaseTitleRequirements[AchievementData.winAgainst4.rarety],
    winAsLower: BaseTitleRequirements[AchievementData.winAsLower.rarety],
    win: BaseTitleRequirements[AchievementData.win.rarety],
    battleRoyaleWin: BruteUniqueTitleRequirements,
    rankUp10: BaseTitleRequirements[AchievementData.rankUp10.rarety],
    rankUp9: BaseTitleRequirements[AchievementData.rankUp9.rarety],
    rankUp8: BaseTitleRequirements[AchievementData.rankUp8.rarety],
    rankUp7: BaseTitleRequirements[AchievementData.rankUp7.rarety],
    rankUp6: BaseTitleRequirements[AchievementData.rankUp6.rarety],
    rankUp5: BaseTitleRequirements[AchievementData.rankUp5.rarety],
    rankUp4: BaseTitleRequirements[AchievementData.rankUp4.rarety],
    rankUp3: BaseTitleRequirements[AchievementData.rankUp3.rarety],
    rankUp2: BaseTitleRequirements[AchievementData.rankUp2.rarety],
    rankUp1: BaseTitleRequirements[AchievementData.rankUp1.rarety],
    rankUp0: BaseTitleRequirements[AchievementData.rankUp0.rarety],
    ascend: BaseTitleRequirements[AchievementData.ascend.rarety],
    sacrifice: BaseTitleRequirements[AchievementData.sacrifice.rarety],
    beta: BaseTitleRequirements[AchievementData.beta.rarety],
    bug: BaseTitleRequirements[AchievementData.bug.rarety]
  };

  // vendor/labrute/core/src/types.ts
  var import_prisma5 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/core/src/brute/getHP.ts
  var getBruteHP = (brute) => Math.floor(
    50 + brute.hpStat * brute.hpModifier + brute.level * 2
  );

  // vendor/labrute/core/src/brute/applySkillModifiers.ts
  var applySkillModifiers = (brute, skillName, skillTier = 1, removePreviousTier = true) => {
    Object.entries(SkillModifiers[skillName]).forEach(([unsafeStat, modifier]) => {
      const stat = unsafeStat;
      if (stat !== FightStat.HP && stat !== FightStat.STRENGTH && stat !== FightStat.AGILITY && stat !== FightStat.SPEED) {
        return;
      }
      if (modifier.flat) {
        if (skillTier > 1 && removePreviousTier) {
          brute[`${stat}Stat`] -= modifier.flat[skillTier - 2] ?? 0;
        }
        brute[`${stat}Stat`] += modifier.flat[skillTier - 1] ?? 0;
      }
      if (modifier.percent) {
        if (skillTier > 1 && removePreviousTier) {
          brute[`${stat}Modifier`] -= modifier.percent[skillTier - 2] ?? 0;
        }
        brute[`${stat}Modifier`] += modifier.percent[skillTier - 1] ?? 0;
      }
      if (stat === FightStat.HP) {
        brute[`${stat}Value`] = getBruteHP(brute);
      } else {
        brute[`${stat}Value`] = Math.floor(brute[`${stat}Stat`] * brute[`${stat}Modifier`]);
      }
    });
  };

  // vendor/labrute/core/src/brute/bosses.ts
  var import_prisma6 = __toESM(require_index_browser2(), 1);
  var bear = pets[import_prisma6.PetName.bear];
  var panther = pets[import_prisma6.PetName.panther];
  var dog1 = pets[import_prisma6.PetName.dog1];
  var bosses = [
    {
      name: import_prisma6.BossName.GoldClaw,
      base: import_prisma6.PetName.bear,
      scale: 2,
      initiative: -0.5,
      strength: bear.strength[0] * 10,
      agility: bear.agility[0],
      speed: bear.speed[0],
      hp: 1e5,
      counter: bear.counter[0],
      combo: bear.combo[0],
      block: bear.block[0],
      evasion: bear.evasion[0],
      accuracy: 0.75,
      disarm: bear.disarm[0],
      damage: bear.damage[0],
      reach: 3,
      count: 1,
      reward: 1,
      odds: 10
    },
    {
      name: import_prisma6.BossName.EmberFang,
      base: import_prisma6.PetName.panther,
      scale: 3,
      initiative: -0.5,
      strength: panther.strength[0] * 2,
      agility: panther.agility[0],
      speed: panther.speed[0] * 10,
      hp: 5e4,
      counter: panther.counter[0],
      combo: panther.combo[0],
      block: panther.block[0],
      evasion: panther.evasion[0],
      accuracy: 0.75,
      disarm: panther.disarm[0],
      damage: panther.damage[0],
      reach: 3,
      count: 1,
      reward: 1,
      odds: 10
    },
    {
      name: import_prisma6.BossName.Cerberus,
      base: import_prisma6.PetName.dog1,
      scale: 2.15,
      initiative: 1.3,
      strength: dog1.strength[0] * 7.5,
      agility: dog1.agility[0],
      speed: dog1.speed[0] * 1.2,
      hp: 1e4,
      counter: dog1.counter[0],
      combo: 0,
      block: dog1.block[0],
      evasion: -0.2,
      accuracy: 0.75,
      disarm: dog1.disarm[0],
      damage: dog1.damage[0],
      reach: 1,
      count: 3,
      reward: 0.2,
      odds: 1
    }
  ];

  // vendor/labrute/core/src/brute/calculatedBrute.ts
  var import_prisma11 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/core/src/brute/getTempWeapon.ts
  var import_prisma7 = __toESM(require_index_browser2(), 1);
  var import_dayjs2 = __toESM(require_dayjs_min(), 1);

  // vendor/labrute/core/src/utils/date.ts
  var import_dayjs = __toESM(require_dayjs_min(), 1);
  var import_utc = __toESM(require_utc(), 1);
  import_dayjs.default.extend(import_utc.default);

  // vendor/labrute/core/src/utils/random.ts
  var seedCache = /* @__PURE__ */ new Map();
  var MAX_CACHE_SIZE = 1e3;
  var seedToRandom = (seed, cache = true) => {
    if (cache) {
      const cached = seedCache.get(seed);
      if (cached !== void 0) {
        return cached;
      }
    }
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash;
    }
    const random = Math.abs(hash) / 2147483647;
    if (cache) {
      seedCache.set(seed, random);
      if (seedCache.size > MAX_CACHE_SIZE) {
        const firstKey = seedCache.keys().next().value;
        if (firstKey) {
          seedCache.delete(firstKey);
        }
      }
    }
    return random;
  };
  var randomBetween = (min, max, seed, cache = true) => {
    if (min > max) return 0;
    if (min === max) return min;
    const random = seed ? seedToRandom(seed, cache) : Math.random();
    return Math.floor(random * (max - min + 1) + min);
  };

  // vendor/labrute/core/src/utils/object.ts
  var entries = (obj) => {
    const keys2 = Object.keys(obj);
    const result = [];
    for (const key2 of keys2) {
      const value = obj[key2];
      if (value !== void 0) {
        result.push([key2, value]);
      }
    }
    return result;
  };

  // vendor/labrute/core/src/brute/getTempWeapon.ts
  var getTempWeapon = (brute, modifiers2) => {
    if (!modifiers2[import_prisma7.FightModifier.randomWeapon]) {
      return null;
    }
    const weaponIndex = randomBetween(0, 200, `${brute.id}-randomWeapon-${import_dayjs2.default.utc().format("YYYY-MM-DD")}`);
    const unownedWeapons = weaponList.filter((weapon) => !brute.weapons.includes(weapon.name));
    if (unownedWeapons.length === 0) {
      return null;
    }
    const tempWeapon = unownedWeapons[weaponIndex % unownedWeapons.length];
    if (!tempWeapon) {
      throw new Error("No temp weapon found");
    }
    return tempWeapon.name;
  };

  // vendor/labrute/core/src/brute/getTempSkill.ts
  var import_prisma8 = __toESM(require_index_browser2(), 1);
  var import_dayjs3 = __toESM(require_dayjs_min(), 1);
  var unavailableTemporarySkills = [import_prisma8.SkillName.backup];
  var getTempSkill = (brute, modifiers2, useCache = true) => {
    if (!modifiers2[import_prisma8.FightModifier.randomSkill]) {
      return null;
    }
    const skillIndex = randomBetween(0, 200, `${brute.id}-randomSkill-${import_dayjs3.default.utc().format("YYYY-MM-DD")}`, useCache);
    const unownedSkills = skillList.filter((skill) => !brute.skills.includes(skill.name) && !unavailableTemporarySkills.includes(skill.name));
    if (unownedSkills.length === 0) {
      return null;
    }
    const tempSkill = unownedSkills[skillIndex % unownedSkills.length];
    if (!tempSkill) {
      throw new Error("No temp skill found");
    }
    return tempSkill.name;
  };

  // vendor/labrute/core/src/brute/scaledStat.ts
  var import_prisma10 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/core/src/brute/chaos.ts
  var import_prisma9 = __toESM(require_index_browser2(), 1);
  var import_dayjs4 = __toESM(require_dayjs_min(), 1);
  var CHAOS_SEEDS = /* @__PURE__ */ new Map();
  var getSkillStatSeed = (skill, stat, type = "flat") => `skill:${skill}:${stat}:${type}`;
  var getPetStatSeed = (pet, stat) => `pet:${pet.name}:${stat}`;
  var getWeaponStatSeed = (weapon, stat) => `weapon:${weapon.name}:${stat}`;

  // vendor/labrute/core/src/brute/scaledStat.ts
  var scalingByPet = {
    [import_prisma10.PetName.bear]: {
      strength: 0.4,
      agility: 0.1,
      speed: 0.1,
      hp: 0.4
    },
    [import_prisma10.PetName.panther]: {
      strength: 0.25,
      agility: 0.3,
      speed: 0.3,
      hp: 0.15
    },
    [import_prisma10.PetName.dog3]: {
      strength: 0.1,
      agility: 0.2,
      speed: 0.4,
      hp: 0.1
    },
    [import_prisma10.PetName.dog2]: {
      strength: 0.1,
      agility: 0.2,
      speed: 0.4,
      hp: 0.1
    },
    [import_prisma10.PetName.dog1]: {
      strength: 0.1,
      agility: 0.2,
      speed: 0.4,
      hp: 0.1
    }
  };
  var CHAOS_SCALE = 3;
  var getScaledStat = ({
    chaos,
    skill,
    type = "flat",
    pet,
    weapon,
    stat,
    value,
    precision = 0
  }) => {
    if (!chaos) {
      return value;
    }
    if (value === 0) {
      return 0;
    }
    let min = value < 0 ? value * CHAOS_SCALE : value / CHAOS_SCALE;
    const max = value < 0 ? value / CHAOS_SCALE : value * CHAOS_SCALE;
    if (stat === FightStat.DAMAGE) {
      min = value;
    }
    let seed = "";
    if (skill) {
      seed = getSkillStatSeed(skill, stat, type);
    } else if (pet) {
      seed = getPetStatSeed(pet, stat);
    } else if (weapon) {
      seed = getWeaponStatSeed(weapon, stat);
    } else {
      throw new Error("Either skill, pet or weapon must be provided for scaled stat");
    }
    const randomNumber = min + (CHAOS_SEEDS.get(seed) ?? 0) * (max - min);
    if (precision === 0) {
      return Math.ceil(randomNumber);
    }
    return parseFloat(randomNumber.toFixed(precision));
  };

  // vendor/labrute/core/src/brute/calculatedBrute.ts
  var getCalculatedBrute = (brute, modifiers2) => {
    const calculatedBrute = {
      ...brute,
      weapons: {},
      skills: {},
      pets: {}
    };
    for (const weapon of brute.weapons) {
      calculatedBrute.weapons[weapon] = (calculatedBrute.weapons[weapon] ?? 0) + 1;
    }
    const randomWeapon = getTempWeapon(brute, modifiers2);
    if (randomWeapon) {
      calculatedBrute.weapons[randomWeapon] = (calculatedBrute.weapons[randomWeapon] ?? 0) + 1;
      calculatedBrute.randomWeapon = randomWeapon;
    }
    for (const skill of brute.skills) {
      calculatedBrute.skills[skill] = (calculatedBrute.skills[skill] ?? 0) + 1;
    }
    const randomSkill = getTempSkill(brute, modifiers2);
    if (randomSkill) {
      calculatedBrute.skills[randomSkill] = (calculatedBrute.skills[randomSkill] ?? 0) + 1;
      calculatedBrute.randomSkill = randomSkill;
      applySkillModifiers(calculatedBrute, randomSkill);
    }
    for (const pet of brute.pets) {
      calculatedBrute.pets[pet] = (calculatedBrute.pets[pet] ?? 0) + 1;
    }
    const skillsList = modifiers2[import_prisma11.FightModifier.chaos] ? entries(calculatedBrute.skills) : [];
    for (const stat of [
      FightStat.HP,
      FightStat.STRENGTH,
      FightStat.AGILITY,
      FightStat.SPEED
    ]) {
      if (modifiers2[import_prisma11.FightModifier.chaos]) {
        for (const [skillName, tier] of skillsList) {
          const modifier = SkillModifiers[skillName][stat];
          if (!modifier) {
            continue;
          }
          if (modifier?.flat) {
            calculatedBrute[`${stat}Stat`] -= modifier.flat[tier - 1] ?? 0;
            calculatedBrute[`${stat}Stat`] += getScaledStat({
              chaos: true,
              skill: skillName,
              type: "flat",
              stat,
              value: modifier.flat[tier - 1] ?? 0
            });
          }
          if (modifier?.percent) {
            calculatedBrute[`${stat}Modifier`] -= modifier.percent[tier - 1] ?? 0;
            calculatedBrute[`${stat}Modifier`] += getScaledStat({
              chaos: true,
              skill: skillName,
              type: "percent",
              stat,
              value: modifier.percent[tier - 1] ?? 0,
              precision: 2
            });
          }
        }
        if (stat === FightStat.HP) {
          calculatedBrute[`${stat}Value`] = getBruteHP(calculatedBrute);
        } else {
          calculatedBrute[`${stat}Value`] = Math.floor(calculatedBrute[`${stat}Stat`] * calculatedBrute[`${stat}Modifier`]);
        }
      }
      if (stat === FightStat.AGILITY && modifiers2[import_prisma11.FightModifier.doubleAgility]) {
        calculatedBrute[`${stat}Value`] *= 2;
      }
    }
    return calculatedBrute;
  };
  var getWeaponsList = (brute) => {
    const weapons2 = [];
    for (const [weaponName, tier] of entries(brute.weapons)) {
      for (let i = 0; i < tier; i++) {
        weapons2.push(weaponName);
      }
    }
    return weapons2;
  };
  var getSkillsList = (brute) => {
    const skills2 = [];
    for (const [skillName, tier] of entries(brute.skills)) {
      for (let i = 0; i < tier; i++) {
        skills2.push(skillName);
      }
    }
    return skills2;
  };
  var getPetsList = (brute) => {
    const pets2 = [];
    for (const [petName, tier] of entries(brute.pets)) {
      for (let i = 0; i < tier; i++) {
        pets2.push(petName);
      }
    }
    return pets2;
  };
  var getBruteToSave = (brute) => {
    const bruteToSave = {
      ...brute,
      weapons: getWeaponsList(brute),
      skills: getSkillsList(brute),
      pets: getPetsList(brute)
    };
    return bruteToSave;
  };

  // vendor/labrute/core/src/brute/createRandomBruteStats.ts
  var import_prisma13 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/core/src/brute/getRandomBonus.ts
  var import_prisma12 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/core/src/brute/getFightsLeft.ts
  var import_dayjs5 = __toESM(require_dayjs_min(), 1);

  // vendor/labrute/core/src/brute/getMaxFightsPerDay.ts
  var import_prisma14 = __toESM(require_index_browser2(), 1);
  var getMaxFightsPerDay = (brute) => {
    const base = brute.eventId ? EventFightsPerDay : FIGHTS_PER_DAY;
    return brute.skills[import_prisma14.SkillName.regeneration] ? base + 2 : base;
  };

  // vendor/labrute/core/src/brute/getFightsLeft.ts
  var getFightsLeft = (brute) => import_dayjs5.default.utc(brute.lastFight).isSame(import_dayjs5.default.utc(), "day") ? brute.fightsLeft : getMaxFightsPerDay(brute);

  // vendor/labrute/core/src/brute/getLevelUpChoices.ts
  var import_prisma15 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/server/src/utils/fight/getFighters.ts
  var import_prisma16 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/server/src/utils/fight/fightMethods.ts
  var import_prisma19 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/server/src/utils/fight/getDamage.ts
  var import_prisma18 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/server/src/utils/fight/getFighterStat.ts
  var import_prisma17 = __toESM(require_index_browser2(), 1);

  // vendor/labrute/server/src/utils/fight/applySpy.ts
  var import_prisma20 = __toESM(require_index_browser2(), 1);

  // src/odds/interval.ts
  var Z = 1.96;
  var wilson = (wins, n) => {
    if (n <= 0) return { lo: 0, hi: 1, half: 0.5 };
    const p = wins / n;
    const z2 = Z * Z;
    const denominator = 1 + z2 / n;
    const center = (p + z2 / (2 * n)) / denominator;
    const spread = Z / denominator * Math.sqrt(p * (1 - p) / n + z2 / (4 * n * n));
    const lo = Math.min(p, Math.max(0, center - spread));
    const hi = Math.max(p, Math.min(1, center + spread));
    return { lo, hi, half: Math.max(hi - p, p - lo) };
  };

  // src/odds/estimate.ts
  var summarize = (tally) => {
    const winRate = tally.samples > 0 ? tally.wins / tally.samples : 0;
    const { lo, hi, half } = wilson(tally.wins, tally.samples);
    return {
      ...tally,
      winRate,
      ci: half,
      lo,
      hi,
      meanTurns: tally.samples > 0 ? tally.turnsTotal / tally.samples : 0,
      hpLeftOnWin: tally.wins > 0 ? tally.hpLeftTotalOnWin / tally.wins : 0
    };
  };
  var combine = (a, b) => summarize({
    wins: a.wins + b.wins,
    samples: a.samples + b.samples,
    turnsTotal: a.turnsTotal + b.turnsTotal,
    hpLeftTotalOnWin: a.hpLeftTotalOnWin + b.hpLeftTotalOnWin,
    approximate: a.approximate || b.approximate
  });

  // src/odds/config.ts
  var FIRST_PASS = 1500;
  var SECOND_PASS = 6e3;
  var ADVICE_PASS = 1200;
  var REFERENCE_COUNT = 12;
  var CAREER_LEVELS = 10;
  var CAREER_TRAJECTORIES = 150;
  var CAREER_FIGHTS = 80;
  var CAREER_CHUNKS = 3;
  var CAREER_SECOND_CHUNKS = 9;

  // src/userscript/resolveBackups.ts
  var import_prisma21 = __toESM(require_index_browser2(), 1);
  var hasBackup = (b) => b.skills.includes(import_prisma21.SkillName.backup);
  var eligible = (candidates, self2) => candidates.filter((candidate) => candidate.id !== self2.id && candidate.level < self2.level);
  var resolveBackups = async (brute, opponent, deps) => {
    const own = hasBackup(brute) ? eligible(deps.ownBrutes(), brute) : [];
    if (!hasBackup(opponent)) return { own, opponent: [], approximate: false };
    try {
      const theirs = eligible(await deps.fetchProfileBrutes(opponent.name), opponent);
      return { own, opponent: theirs, approximate: false };
    } catch {
      return { own, opponent: [], approximate: true };
    }
  };

  // src/userscript/orchestrate.ts
  var counter = 0;
  var contenders = (results) => {
    const best = [...results.values()].reduce(
      (top, e) => !top || e.winRate > top.winRate ? e : top,
      void 0
    );
    if (!best) return [];
    return [...results.entries()].filter(([, e]) => e.hi >= best.lo).map(([name]) => name);
  };
  var bestOf = (results) => [...results.entries()].sort(
    ([, a], [, b]) => b.winRate - a.winRate || b.lo - a.lo
  )[0]?.[0];
  var createArenaHandler = (deps) => async (bruteName) => {
    const brute = deps.getBrute(bruteName);
    const opponents3 = deps.getOpponents(bruteName);
    if (!brute || !opponents3) return;
    opponents3.forEach((opponent) => deps.render(opponent.name, "pending"));
    deps.renderBest(void 0);
    const modifiers2 = deps.getModifiers();
    const inputs = /* @__PURE__ */ new Map();
    const results = /* @__PURE__ */ new Map();
    const salve = async (opponent, input, samples) => {
      counter += 1;
      const response = await deps.run({
        id: `${bruteName}:${opponent.name}:${counter}`,
        input,
        samples
      });
      if ("error" in response) {
        deps.render(opponent.name, { error: response.error });
        return;
      }
      const previous = results.get(opponent.name);
      const estimation = previous ? combine(previous, response.estimation) : response.estimation;
      results.set(opponent.name, estimation);
      deps.render(opponent.name, estimation);
      deps.onPrediction?.(bruteName, opponent.name, estimation.winRate);
    };
    await Promise.all(opponents3.map(async (opponent) => {
      const backups = await resolveBackups(brute, opponent, {
        ownBrutes: deps.getOwnBrutes,
        fetchProfileBrutes: deps.fetchProfileBrutes
      });
      const input = {
        brute,
        opponent,
        modifiers: modifiers2,
        backups: { own: backups.own, opponent: backups.opponent },
        approximate: backups.approximate
      };
      inputs.set(opponent.name, input);
      await salve(opponent, input, FIRST_PASS);
    }));
    deps.renderBest(bestOf(results));
    const \u00E0D\u00E9partager = contenders(results);
    if (\u00E0D\u00E9partager.length < 2) return;
    await Promise.all(\u00E0D\u00E9partager.map(async (name) => {
      const opponent = opponents3.find((o) => o.name === name);
      const input = inputs.get(name);
      if (!opponent || !input) return;
      await salve(opponent, { ...input, round: 1 }, SECOND_PASS);
    }));
    deps.renderBest(bestOf(results));
  };

  // src/odds/calibration.ts
  var brier = (records) => {
    if (!records.length) return 0;
    const total = records.reduce(
      (sum, r) => sum + (r.predicted - (r.won ? 1 : 0)) ** 2,
      0
    );
    return total / records.length;
  };
  var reliability = (records, bucketCount = 5) => {
    const buckets = Array.from({ length: bucketCount }, () => []);
    records.forEach((record) => {
      const index = Math.min(bucketCount - 1, Math.floor(record.predicted * bucketCount));
      buckets[index].push(record);
    });
    return buckets.map((group, index) => ({
      from: index / bucketCount,
      to: (index + 1) / bucketCount,
      count: group.length,
      predicted: group.length ? group.reduce((s, r) => s + r.predicted, 0) / group.length : 0,
      observed: group.length ? group.filter((r) => r.won).length / group.length : 0
    })).filter((bucket) => bucket.count > 0);
  };
  var pct = (fraction) => `${Math.round(fraction * 100)} %`.padStart(5);
  var formatReport = (records) => {
    if (!records.length) {
      return "brute-odds : aucun combat enregistr\xE9. Lancez des combats depuis l'ar\xE8ne, la mesure se remplit toute seule.";
    }
    const wins = records.filter((r) => r.won).length;
    const lines = [
      `${records.length} combats mesur\xE9s, ${wins} gagn\xE9s`,
      `score de Brier : ${brier(records).toFixed(3)} (0 = parfait, 0,25 = pile ou face)`,
      "",
      "annonc\xE9   observ\xE9   combats"
    ];
    reliability(records).forEach((bucket) => {
      lines.push(`${pct(bucket.predicted)}     ${pct(bucket.observed)}   ${String(bucket.count).padStart(7)}`);
    });
    return lines.join("\n");
  };

  // src/userscript/calibrationLog.ts
  var KEY = "brute-odds:calibration";
  var MAX_RECORDS = 500;
  var key = (brute, opponent) => `${brute} vs ${opponent}`;
  var createCalibrationLog = (storage) => {
    const announced = /* @__PURE__ */ new Map();
    const read = () => {
      try {
        const raw = storage.getItem(KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };
    const write = (records) => {
      try {
        storage.setItem(KEY, JSON.stringify(records.slice(-MAX_RECORDS)));
      } catch {
      }
    };
    return {
      remember: (brute, opponent, predicted) => {
        announced.set(key(brute, opponent), predicted);
      },
      record: (fight) => {
        const asWinner = announced.get(key(fight.winner, fight.loser));
        const asLoser = announced.get(key(fight.loser, fight.winner));
        if (asWinner === void 0 && asLoser === void 0) return null;
        const won = asWinner !== void 0;
        const entry = {
          fightId: fight.id,
          brute: won ? fight.winner : fight.loser,
          opponent: won ? fight.loser : fight.winner,
          predicted: won ? asWinner : asLoser,
          won
        };
        const records = read();
        if (records.some((r) => r.fightId === entry.fightId)) return null;
        records.push(entry);
        write(records);
        return entry;
      },
      records: read,
      report: () => formatReport(read()),
      reset: () => {
        announced.clear();
        try {
          storage.removeItem(KEY);
        } catch {
        }
      }
    };
  };

  // src/userscript/opponentPool.ts
  var KEY2 = "brute-odds:opponents";
  var MAX_POOL = 400;
  var FIELDS = [
    "id",
    "userId",
    "name",
    "gender",
    "level",
    "xp",
    "ranking",
    "pupilsCount",
    "hpStat",
    "hpModifier",
    "hpValue",
    "strengthStat",
    "strengthModifier",
    "strengthValue",
    "speedStat",
    "speedModifier",
    "speedValue",
    "agilityStat",
    "agilityModifier",
    "agilityValue",
    "body",
    "colors",
    "skills",
    "weapons",
    "pets",
    "eventId"
  ];
  var trim = (brute) => Object.fromEntries(
    FIELDS.filter((field) => brute[field] !== void 0).map((field) => [field, brute[field]])
  );
  var createOpponentPool = (storage) => {
    const read = () => {
      try {
        const raw = storage.getItem(KEY2);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };
    const write = (pool2) => {
      try {
        storage.setItem(KEY2, JSON.stringify(pool2.slice(-MAX_POOL)));
      } catch {
      }
    };
    return {
      remember: (opponents3) => {
        if (!opponents3.length) return;
        const pool2 = read().filter((known) => !opponents3.some((o) => o.id === known.id));
        write([...pool2, ...opponents3.map(trim)]);
      },
      sample: (level, count) => {
        const \u00E9ligibles = read().filter(
          (b) => b.level <= level && b.level >= level - ARENA_OPPONENTS_MAX_GAP
        );
        if (\u00E9ligibles.length <= count) return \u00E9ligibles;
        const pas = \u00E9ligibles.length / count;
        return Array.from(
          { length: count },
          (_, i) => \u00E9ligibles[Math.floor(i * pas)]
        );
      },
      size: () => read().length,
      reset: () => {
        try {
          storage.removeItem(KEY2);
        } catch {
        }
      }
    };
  };

  // vendor/labrute/server/src/utils/brute/updateBruteData.ts
  var import_prisma22 = __toESM(require_index_browser2(), 1);
  var updateStat = (brute, stat, value) => {
    switch (stat) {
      case "hp":
        return {
          ...brute,
          hpStat: brute.hpStat + value
        };
      case "strength":
        return {
          ...brute,
          strengthStat: brute.strengthStat + value
        };
      case "agility":
        return {
          ...brute,
          agilityStat: brute.agilityStat + value
        };
      case "speed":
        return {
          ...brute,
          speedStat: brute.speedStat + value
        };
      default:
        throw new Error("Invalid stat");
    }
  };
  var updateBruteData = (brute, destinyChoice) => {
    let updatedBrute = {
      ...brute,
      pets: [...brute.pets],
      skills: [...brute.skills],
      weapons: [...brute.weapons],
      xp: 0,
      level: brute.level + 1
    };
    if (destinyChoice.type === "skill") {
      const skillName = destinyChoice.skill;
      if (!skillName) {
        throw new Error("No skill provided");
      }
      const calculatedBrute = getCalculatedBrute(updatedBrute, {});
      if (skillName === import_prisma22.SkillName.regeneration && !brute.eventId) {
        updatedBrute.fightsLeft = getFightsLeft(calculatedBrute) + 2;
      }
      calculatedBrute.skills[skillName] = calculatedBrute.skills[skillName] ? calculatedBrute.skills[skillName] + 1 : 1;
      applySkillModifiers(calculatedBrute, skillName, calculatedBrute.skills[skillName]);
      updatedBrute = getBruteToSave(calculatedBrute);
    } else if (destinyChoice.type === "weapon") {
      updatedBrute.weapons.push(destinyChoice.weapon);
    } else if (destinyChoice.type === "pet") {
      const pet = destinyChoice.pet && pets[destinyChoice.pet];
      if (!pet) {
        throw new Error("Pet not found");
      }
      updatedBrute.pets.push(pet.name);
      const petTier = updatedBrute.pets.filter((p) => p === pet.name).length;
      if (petTier > 1) {
        updatedBrute.hpModifier += pet.hpMalus[petTier - 2] ?? 0;
      }
      updatedBrute.hpModifier -= pet.hpMalus[petTier - 1] ?? 0;
    } else if (destinyChoice.stat1 && !destinyChoice.stat2) {
      const stat = destinyChoice.stat1;
      updatedBrute = updateStat(updatedBrute, stat, destinyChoice.stat1Value);
    } else {
      if (!destinyChoice.stat1 || !destinyChoice.stat2 || !destinyChoice.stat1Value || !destinyChoice.stat2Value) {
        throw new Error("No stats provided");
      }
      updatedBrute = updateStat(
        updatedBrute,
        destinyChoice.stat1,
        destinyChoice.stat1Value
      );
      updatedBrute = updateStat(
        updatedBrute,
        destinyChoice.stat2,
        destinyChoice.stat2Value
      );
    }
    updatedBrute.hpValue = getBruteHP(updatedBrute);
    updatedBrute.strengthValue = Math.floor(
      updatedBrute.strengthStat * updatedBrute.strengthModifier
    );
    updatedBrute.agilityValue = Math.floor(
      updatedBrute.agilityStat * updatedBrute.agilityModifier
    );
    updatedBrute.speedValue = Math.floor(
      updatedBrute.speedStat * updatedBrute.speedModifier
    );
    return updatedBrute;
  };

  // src/engine/levelUp.ts
  var applyChoice = (brute, choice) => updateBruteData(
    // `updateBruteData` lit deux champs que l'API d'arène ne renvoie pas, et ne s'en
    // sert que pour le compte de combats quotidiens, sans effet sur un combat simulé.
    { fightsLeft: 0, lastFight: null, ...brute },
    choice
  );
  var describeChoice = (choice) => {
    if (choice.type === "skill") return `comp\xE9tence ${choice.skill}`;
    if (choice.type === "weapon") return `arme ${choice.weapon}`;
    if (choice.type === "pet") return `familier ${choice.pet}`;
    const parts = [
      choice.stat1 ? `+${choice.stat1Value ?? 0} ${choice.stat1}` : "",
      choice.stat2 ? `+${choice.stat2Value ?? 0} ${choice.stat2}` : ""
    ].filter(Boolean);
    return parts.join(" / ") || "choix inconnu";
  };

  // src/userscript/advise.ts
  var VIDE = {
    wins: 0,
    samples: 0,
    turnsTotal: 0,
    hpLeftTotalOnWin: 0,
    approximate: false
  };
  var counter2 = 0;
  var cumule = (tallies) => tallies.reduce(
    (total, tally) => combine(total, tally),
    summarize(VIDE)
  );
  var meilleur = (options, cl\u00E9) => options.reduce((best, option, index) => {
    const candidat = cl\u00E9(option)?.winRate ?? -1;
    return candidat > (cl\u00E9(options[best])?.winRate ?? -1) ? index : best;
  }, 0);
  var tranch\u00E9 = (options, cl\u00E9) => {
    const estimations = options.map(cl\u00E9).filter((e) => !!e && e.samples > 0);
    if (estimations.length < 2) return false;
    const [premier, second] = [...estimations].sort((a, b) => b.winRate - a.winRate);
    return premier.lo > second.hi;
  };
  var decide = (options) => {
    if (tranch\u00E9(options, (o) => o.later)) {
      return { best: meilleur(options, (o) => o.later), reason: "long terme", decisive: true };
    }
    if (tranch\u00E9(options, (o) => o.now)) {
      return { best: meilleur(options, (o) => o.now), reason: "court terme", decisive: true };
    }
    const cl\u00E9 = options.some((o) => o.later) ? (o) => o.later : (o) => o.now;
    return { best: meilleur(options, cl\u00E9), reason: "\xE9cart faible", decisive: false };
  };
  var createAdvisor = (deps) => async (bruteName, choices) => {
    const brute = deps.getBrute(bruteName);
    if (!brute || choices.length < 2) return;
    deps.render("pending");
    const upgraded = choices.map((choice) => ({
      label: describeChoice(choice),
      brute: applyChoice(brute, choice)
    }));
    const niveau = upgraded[0]?.brute.level ?? brute.level;
    const duVivier = deps.sampleOpponents(niveau, REFERENCE_COUNT);
    const arena = deps.getOpponents(bruteName) ?? [];
    const references = duVivier.length >= 2 ? duVivier : arena.length ? arena : [brute];
    const basis = duVivier.length >= 2 ? "pool" : arena.length ? "arena" : "mirror";
    const modifiers2 = deps.getModifiers();
    let \u00E9chec = false;
    const demande = async (request) => {
      const response = await deps.run(request);
      if ("error" in response) {
        \u00E9chec = true;
        return VIDE;
      }
      return response.estimation;
    };
    const maintenant = async () => Promise.all(
      upgraded.map(async ({ brute: candidat }) => cumule(await Promise.all(
        references.map((opponent) => {
          counter2 += 1;
          return demande({
            id: `levelup:${bruteName}:${counter2}`,
            input: { brute: candidat, opponent, modifiers: modifiers2 },
            samples: ADVICE_PASS
          });
        })
      )))
    );
    const carri\u00E8re = async (chunks, offset) => Promise.all(
      upgraded.map(async ({ brute: candidat }) => cumule(await Promise.all(
        Array.from({ length: chunks }, (_, chunk) => {
          counter2 += 1;
          return demande({
            kind: "career",
            id: `carri\xE8re:${bruteName}:${counter2}`,
            input: {
              brute: candidat,
              references,
              modifiers: modifiers2,
              levels: CAREER_LEVELS,
              trajectories: Math.ceil(CAREER_TRAJECTORIES / chunks),
              fightsPerTrajectory: CAREER_FIGHTS,
              // Chaque lot doit tirer d'autres avenirs que ses voisins.
              round: offset + chunk
            }
          });
        })
      )))
    );
    const conseil = (options2) => ({
      brute: bruteName,
      basis,
      references: references.length,
      horizon: CAREER_LEVELS,
      options: options2,
      ...decide(options2)
    });
    const now = await maintenant();
    if (\u00E9chec) {
      deps.render({ error: "le calcul d'un des destins a \xE9chou\xE9" });
      return;
    }
    let options = upgraded.map(({ label: label2 }, index) => ({ label: label2, now: now[index] }));
    deps.render(conseil(options));
    const later = await carri\u00E8re(CAREER_CHUNKS, 0);
    if (\u00E9chec) return;
    options = options.map((option, index) => ({ ...option, later: later[index] }));
    deps.render(conseil(options));
    if (tranch\u00E9(options, (o) => o.later)) return;
    const encore = await carri\u00E8re(CAREER_SECOND_CHUNKS, CAREER_CHUNKS);
    if (\u00E9chec) return;
    deps.render(conseil(options.map((option, index) => ({
      ...option,
      later: combine(option.later, encore[index])
    }))));
  };

  // src/userscript/panel.ts
  var ID = "brute-odds-panel";
  var PANEL_STYLE = "position:fixed;right:12px;bottom:12px;z-index:2147483000;max-width:340px;padding:10px 12px;border-radius:6px;background:rgba(20,18,16,.93);color:#f2ece0;font:13px/1.45 system-ui,sans-serif;box-shadow:0 2px 12px rgba(0,0,0,.45);";
  var ligne = (texte, style = "") => {
    const div = document.createElement("div");
    div.style.cssText = style;
    div.textContent = texte;
    return div;
  };
  var pourcent = (fraction) => Math.round(fraction * 100);
  var removePanel = () => document.getElementById(ID)?.remove();
  var renderAdvice = (advice) => {
    removePanel();
    const panel = document.createElement("div");
    panel.id = ID;
    panel.style.cssText = PANEL_STYLE;
    if (advice === "pending") {
      panel.appendChild(ligne("brute-odds : mont\xE9e de niveau, calcul en cours\u2026"));
      document.body.appendChild(panel);
      return;
    }
    if ("error" in advice) {
      panel.appendChild(ligne(`brute-odds : ${advice.error}`));
      document.body.appendChild(panel);
      return;
    }
    const contre = {
      pool: `compar\xE9 sur ${advice.references} adversaires r\xE9els du vivier`,
      arena: "compar\xE9 sur les adversaires du jour",
      mirror: "compar\xE9 contre elle-m\xEAme (aucun adversaire connu)"
    }[advice.basis];
    panel.appendChild(ligne(`Mont\xE9e de niveau de ${advice.brute}`, "font-weight:700;"));
    panel.appendChild(ligne(contre, "opacity:.7;margin-bottom:6px;"));
    const chiffre = (e) => `${pourcent(e.winRate)} % \xB1 ${Math.max(1, Math.round(e.ci * 100))}`;
    advice.options.forEach((option, index) => {
      const gagnant = index === advice.best;
      const parts = [`${option.label} : ${chiffre(option.now)} demain`];
      if (option.later) {
        parts.push(`${chiffre(option.later)} dans ${advice.horizon} niveaux`);
      }
      panel.appendChild(ligne(
        gagnant ? `${parts.join(", ")}  <- \xE0 prendre` : parts.join(", "),
        gagnant ? "font-weight:700;color:#8bd17c;" : "opacity:.85;"
      ));
    });
    panel.appendChild(ligne(
      advice.decisive ? `\xE9cart net sur le ${advice.reason}` : "\xE9cart faible : les deux destins se valent presque, le conseil est fragile",
      "opacity:.7;margin-top:6px;"
    ));
    panel.style.cursor = "pointer";
    panel.title = "cliquer pour fermer";
    panel.addEventListener("click", removePanel);
    document.body.appendChild(panel);
  };

  // src/userscript/main.ts
  var OPPONENTS_PER_ARENA = 6;
  var spawn = () => new Worker(URL.createObjectURL(
    new Blob(['"use strict";\n(() => {\n  var __create = Object.create;\n  var __defProp = Object.defineProperty;\n  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;\n  var __getOwnPropNames = Object.getOwnPropertyNames;\n  var __getProtoOf = Object.getPrototypeOf;\n  var __hasOwnProp = Object.prototype.hasOwnProperty;\n  var __commonJS = (cb, mod) => function __require() {\n    try {\n      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;\n    } catch (e) {\n      throw mod = 0, e;\n    }\n  };\n  var __copyProps = (to, from, except, desc) => {\n    if (from && typeof from === "object" || typeof from === "function") {\n      for (let key of __getOwnPropNames(from))\n        if (!__hasOwnProp.call(to, key) && key !== except)\n          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });\n    }\n    return to;\n  };\n  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(\n    // If the importer is in node compatibility mode or this is not an ESM\n    // file that has been converted to a CommonJS file using a Babel-\n    // compatible transform (i.e. "__esModule" has not been set), then set\n    // "default" to the CommonJS "module.exports" for node compatibility.\n    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,\n    mod\n  ));\n\n  // vendor/labrute/prisma/runtime/index-browser.js\n  var require_index_browser = __commonJS({\n    "vendor/labrute/prisma/runtime/index-browser.js"(exports, module) {\n      "use strict";\n      var pe = Object.defineProperty;\n      var Xe = Object.getOwnPropertyDescriptor;\n      var Ke = Object.getOwnPropertyNames;\n      var Qe = Object.prototype.hasOwnProperty;\n      var Ye = (e) => {\n        throw TypeError(e);\n      };\n      var Oe = (e, n) => {\n        for (var i in n) pe(e, i, { get: n[i], enumerable: true });\n      };\n      var xe = (e, n, i, t) => {\n        if (n && typeof n == "object" || typeof n == "function") for (let r of Ke(n)) !Qe.call(e, r) && r !== i && pe(e, r, { get: () => n[r], enumerable: !(t = Xe(n, r)) || t.enumerable });\n        return e;\n      };\n      var ze = (e) => xe(pe({}, "__esModule", { value: true }), e);\n      var ne = (e, n, i) => n.has(e) ? Ye("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i);\n      var ii = {};\n      Oe(ii, { Decimal: () => Je, Public: () => ge, getRuntime: () => _e, makeStrictEnum: () => qe, objectEnumValues: () => Ae });\n      module.exports = ze(ii);\n      var ge = {};\n      Oe(ge, { validator: () => Re });\n      function Re(...e) {\n        return (n) => n;\n      }\n      var ie = /* @__PURE__ */ Symbol();\n      var me = /* @__PURE__ */ new WeakMap();\n      var we = class {\n        constructor(n) {\n          n === ie ? me.set(this, "Prisma.".concat(this._getName())) : me.set(this, "new Prisma.".concat(this._getNamespace(), ".").concat(this._getName(), "()"));\n        }\n        _getName() {\n          return this.constructor.name;\n        }\n        toString() {\n          return me.get(this);\n        }\n      };\n      var G = class extends we {\n        _getNamespace() {\n          return "NullTypes";\n        }\n      };\n      var Ne;\n      var J = class extends G {\n        constructor() {\n          super(...arguments);\n          ne(this, Ne);\n        }\n      };\n      Ne = /* @__PURE__ */ new WeakMap();\n      ke(J, "DbNull");\n      var ve;\n      var X = class extends G {\n        constructor() {\n          super(...arguments);\n          ne(this, ve);\n        }\n      };\n      ve = /* @__PURE__ */ new WeakMap();\n      ke(X, "JsonNull");\n      var Ee;\n      var K = class extends G {\n        constructor() {\n          super(...arguments);\n          ne(this, Ee);\n        }\n      };\n      Ee = /* @__PURE__ */ new WeakMap();\n      ke(K, "AnyNull");\n      var Ae = { classes: { DbNull: J, JsonNull: X, AnyNull: K }, instances: { DbNull: new J(ie), JsonNull: new X(ie), AnyNull: new K(ie) } };\n      function ke(e, n) {\n        Object.defineProperty(e, "name", { value: n, configurable: true });\n      }\n      var ye = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);\n      function qe(e) {\n        return new Proxy(e, { get(n, i) {\n          if (i in n) return n[i];\n          if (!ye.has(i)) throw new TypeError("Invalid enum value: ".concat(String(i)));\n        } });\n      }\n      var en = () => {\n        var e, n;\n        return ((n = (e = globalThis.process) == null ? void 0 : e.release) == null ? void 0 : n.name) === "node";\n      };\n      var nn = () => {\n        var e, n;\n        return !!globalThis.Bun || !!((n = (e = globalThis.process) == null ? void 0 : e.versions) != null && n.bun);\n      };\n      var tn = () => !!globalThis.Deno;\n      var rn = () => typeof globalThis.Netlify == "object";\n      var sn = () => typeof globalThis.EdgeRuntime == "object";\n      var on = () => {\n        var e;\n        return ((e = globalThis.navigator) == null ? void 0 : e.userAgent) === "Cloudflare-Workers";\n      };\n      function un() {\n        var i;\n        return (i = [[rn, "netlify"], [sn, "edge-light"], [on, "workerd"], [tn, "deno"], [nn, "bun"], [en, "node"]].flatMap((t) => t[0]() ? [t[1]] : []).at(0)) != null ? i : "";\n      }\n      var fn = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };\n      function _e() {\n        let e = un();\n        return { id: e, prettyName: fn[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };\n      }\n      var V = 9e15;\n      var H = 1e9;\n      var Se = "0123456789abcdef";\n      var se = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";\n      var oe = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";\n      var Me = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -V, maxE: V, crypto: false };\n      var Le;\n      var Z2;\n      var w = true;\n      var fe = "[DecimalError] ";\n      var $ = fe + "Invalid argument: ";\n      var Ie = fe + "Precision limit exceeded";\n      var Ze = fe + "crypto unavailable";\n      var Ue = "[object Decimal]";\n      var R = Math.floor;\n      var C = Math.pow;\n      var cn = /^0b([01]+(\\.[01]*)?|\\.[01]+)(p[+-]?\\d+)?$/i;\n      var ln = /^0x([0-9a-f]+(\\.[0-9a-f]*)?|\\.[0-9a-f]+)(p[+-]?\\d+)?$/i;\n      var an = /^0o([0-7]+(\\.[0-7]*)?|\\.[0-7]+)(p[+-]?\\d+)?$/i;\n      var Be = /^(\\d+(\\.\\d*)?|\\.\\d+)(e[+-]?\\d+)?$/i;\n      var D = 1e7;\n      var m = 7;\n      var dn = 9007199254740991;\n      var hn = se.length - 1;\n      var Ce = oe.length - 1;\n      var h = { toStringTag: Ue };\n      h.absoluteValue = h.abs = function() {\n        var e = new this.constructor(this);\n        return e.s < 0 && (e.s = 1), p(e);\n      };\n      h.ceil = function() {\n        return p(new this.constructor(this), this.e + 1, 2);\n      };\n      h.clampedTo = h.clamp = function(e, n) {\n        var i, t = this, r = t.constructor;\n        if (e = new r(e), n = new r(n), !e.s || !n.s) return new r(NaN);\n        if (e.gt(n)) throw Error($ + n);\n        return i = t.cmp(e), i < 0 ? e : t.cmp(n) > 0 ? n : new r(t);\n      };\n      h.comparedTo = h.cmp = function(e) {\n        var n, i, t, r, s = this, o = s.d, u = (e = new s.constructor(e)).d, c = s.s, f = e.s;\n        if (!o || !u) return !c || !f ? NaN : c !== f ? c : o === u ? 0 : !o ^ c < 0 ? 1 : -1;\n        if (!o[0] || !u[0]) return o[0] ? c : u[0] ? -f : 0;\n        if (c !== f) return c;\n        if (s.e !== e.e) return s.e > e.e ^ c < 0 ? 1 : -1;\n        for (t = o.length, r = u.length, n = 0, i = t < r ? t : r; n < i; ++n) if (o[n] !== u[n]) return o[n] > u[n] ^ c < 0 ? 1 : -1;\n        return t === r ? 0 : t > r ^ c < 0 ? 1 : -1;\n      };\n      h.cosine = h.cos = function() {\n        var e, n, i = this, t = i.constructor;\n        return i.d ? i.d[0] ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = pn(t, We(t, i)), t.precision = e, t.rounding = n, p(Z2 == 2 || Z2 == 3 ? i.neg() : i, e, n, true)) : new t(1) : new t(NaN);\n      };\n      h.cubeRoot = h.cbrt = function() {\n        var e, n, i, t, r, s, o, u, c, f, l = this, a = l.constructor;\n        if (!l.isFinite() || l.isZero()) return new a(l);\n        for (w = false, s = l.s * C(l.s * l, 1 / 3), !s || Math.abs(s) == 1 / 0 ? (i = b(l.d), e = l.e, (s = (e - i.length + 1) % 3) && (i += s == 1 || s == -2 ? "0" : "00"), s = C(i, 1 / 3), e = R((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), s == 1 / 0 ? i = "5e" + e : (i = s.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + e), t = new a(i), t.s = l.s) : t = new a(s.toString()), o = (e = a.precision) + 3; ; ) if (u = t, c = u.times(u).times(u), f = c.plus(l), t = k(f.plus(l).times(u), f.plus(c), o + 2, 1), b(u.d).slice(0, o) === (i = b(t.d)).slice(0, o)) if (i = i.slice(o - 3, o + 1), i == "9999" || !r && i == "4999") {\n          if (!r && (p(u, e + 1, 0), u.times(u).times(u).eq(l))) {\n            t = u;\n            break;\n          }\n          o += 4, r = 1;\n        } else {\n          (!+i || !+i.slice(1) && i.charAt(0) == "5") && (p(t, e + 1, 1), n = !t.times(t).times(t).eq(l));\n          break;\n        }\n        return w = true, p(t, e, a.rounding, n);\n      };\n      h.decimalPlaces = h.dp = function() {\n        var e, n = this.d, i = NaN;\n        if (n) {\n          if (e = n.length - 1, i = (e - R(this.e / m)) * m, e = n[e], e) for (; e % 10 == 0; e /= 10) i--;\n          i < 0 && (i = 0);\n        }\n        return i;\n      };\n      h.dividedBy = h.div = function(e) {\n        return k(this, new this.constructor(e));\n      };\n      h.dividedToIntegerBy = h.divToInt = function(e) {\n        var n = this, i = n.constructor;\n        return p(k(n, new i(e), 0, 1, 1), i.precision, i.rounding);\n      };\n      h.equals = h.eq = function(e) {\n        return this.cmp(e) === 0;\n      };\n      h.floor = function() {\n        return p(new this.constructor(this), this.e + 1, 3);\n      };\n      h.greaterThan = h.gt = function(e) {\n        return this.cmp(e) > 0;\n      };\n      h.greaterThanOrEqualTo = h.gte = function(e) {\n        var n = this.cmp(e);\n        return n == 1 || n === 0;\n      };\n      h.hyperbolicCosine = h.cosh = function() {\n        var e, n, i, t, r, s = this, o = s.constructor, u = new o(1);\n        if (!s.isFinite()) return new o(s.s ? 1 / 0 : NaN);\n        if (s.isZero()) return u;\n        i = o.precision, t = o.rounding, o.precision = i + Math.max(s.e, s.sd()) + 4, o.rounding = 1, r = s.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / le(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), s = j(o, 1, s.times(n), new o(1), true);\n        for (var c, f = e, l = new o(8); f--; ) c = s.times(s), s = u.minus(c.times(l.minus(c.times(l))));\n        return p(s, o.precision = i, o.rounding = t, true);\n      };\n      h.hyperbolicSine = h.sinh = function() {\n        var e, n, i, t, r = this, s = r.constructor;\n        if (!r.isFinite() || r.isZero()) return new s(r);\n        if (n = s.precision, i = s.rounding, s.precision = n + Math.max(r.e, r.sd()) + 4, s.rounding = 1, t = r.d.length, t < 3) r = j(s, 2, r, r, true);\n        else {\n          e = 1.4 * Math.sqrt(t), e = e > 16 ? 16 : e | 0, r = r.times(1 / le(5, e)), r = j(s, 2, r, r, true);\n          for (var o, u = new s(5), c = new s(16), f = new s(20); e--; ) o = r.times(r), r = r.times(u.plus(o.times(c.times(o).plus(f))));\n        }\n        return s.precision = n, s.rounding = i, p(r, n, i, true);\n      };\n      h.hyperbolicTangent = h.tanh = function() {\n        var e, n, i = this, t = i.constructor;\n        return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 7, t.rounding = 1, k(i.sinh(), i.cosh(), t.precision = e, t.rounding = n)) : new t(i.s);\n      };\n      h.inverseCosine = h.acos = function() {\n        var e = this, n = e.constructor, i = e.abs().cmp(1), t = n.precision, r = n.rounding;\n        return i !== -1 ? i === 0 ? e.isNeg() ? F(n, t, r) : new n(0) : new n(NaN) : e.isZero() ? F(n, t + 4, r).times(0.5) : (n.precision = t + 6, n.rounding = 1, e = new n(1).minus(e).div(e.plus(1)).sqrt().atan(), n.precision = t, n.rounding = r, e.times(2));\n      };\n      h.inverseHyperbolicCosine = h.acosh = function() {\n        var e, n, i = this, t = i.constructor;\n        return i.lte(1) ? new t(i.eq(1) ? 0 : NaN) : i.isFinite() ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(Math.abs(i.e), i.sd()) + 4, t.rounding = 1, w = false, i = i.times(i).minus(1).sqrt().plus(i), w = true, t.precision = e, t.rounding = n, i.ln()) : new t(i);\n      };\n      h.inverseHyperbolicSine = h.asinh = function() {\n        var e, n, i = this, t = i.constructor;\n        return !i.isFinite() || i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 2 * Math.max(Math.abs(i.e), i.sd()) + 6, t.rounding = 1, w = false, i = i.times(i).plus(1).sqrt().plus(i), w = true, t.precision = e, t.rounding = n, i.ln());\n      };\n      h.inverseHyperbolicTangent = h.atanh = function() {\n        var e, n, i, t, r = this, s = r.constructor;\n        return r.isFinite() ? r.e >= 0 ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = s.precision, n = s.rounding, t = r.sd(), Math.max(t, e) < 2 * -r.e - 1 ? p(new s(r), e, n, true) : (s.precision = i = t - r.e, r = k(r.plus(1), new s(1).minus(r), i + e, 1), s.precision = e + 4, s.rounding = 1, r = r.ln(), s.precision = e, s.rounding = n, r.times(0.5))) : new s(NaN);\n      };\n      h.inverseSine = h.asin = function() {\n        var e, n, i, t, r = this, s = r.constructor;\n        return r.isZero() ? new s(r) : (n = r.abs().cmp(1), i = s.precision, t = s.rounding, n !== -1 ? n === 0 ? (e = F(s, i + 4, t).times(0.5), e.s = r.s, e) : new s(NaN) : (s.precision = i + 6, s.rounding = 1, r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(), s.precision = i, s.rounding = t, r.times(2)));\n      };\n      h.inverseTangent = h.atan = function() {\n        var e, n, i, t, r, s, o, u, c, f = this, l = f.constructor, a = l.precision, d = l.rounding;\n        if (f.isFinite()) {\n          if (f.isZero()) return new l(f);\n          if (f.abs().eq(1) && a + 4 <= Ce) return o = F(l, a + 4, d).times(0.25), o.s = f.s, o;\n        } else {\n          if (!f.s) return new l(NaN);\n          if (a + 4 <= Ce) return o = F(l, a + 4, d).times(0.5), o.s = f.s, o;\n        }\n        for (l.precision = u = a + 10, l.rounding = 1, i = Math.min(28, u / m + 2 | 0), e = i; e; --e) f = f.div(f.times(f).plus(1).sqrt().plus(1));\n        for (w = false, n = Math.ceil(u / m), t = 1, c = f.times(f), o = new l(f), r = f; e !== -1; ) if (r = r.times(c), s = o.minus(r.div(t += 2)), r = r.times(c), o = s.plus(r.div(t += 2)), o.d[n] !== void 0) for (e = n; o.d[e] === s.d[e] && e--; ) ;\n        return i && (o = o.times(2 << i - 1)), w = true, p(o, l.precision = a, l.rounding = d, true);\n      };\n      h.isFinite = function() {\n        return !!this.d;\n      };\n      h.isInteger = h.isInt = function() {\n        return !!this.d && R(this.e / m) > this.d.length - 2;\n      };\n      h.isNaN = function() {\n        return !this.s;\n      };\n      h.isNegative = h.isNeg = function() {\n        return this.s < 0;\n      };\n      h.isPositive = h.isPos = function() {\n        return this.s > 0;\n      };\n      h.isZero = function() {\n        return !!this.d && this.d[0] === 0;\n      };\n      h.lessThan = h.lt = function(e) {\n        return this.cmp(e) < 0;\n      };\n      h.lessThanOrEqualTo = h.lte = function(e) {\n        return this.cmp(e) < 1;\n      };\n      h.logarithm = h.log = function(e) {\n        var n, i, t, r, s, o, u, c, f = this, l = f.constructor, a = l.precision, d = l.rounding, g = 5;\n        if (e == null) e = new l(10), n = true;\n        else {\n          if (e = new l(e), i = e.d, e.s < 0 || !i || !i[0] || e.eq(1)) return new l(NaN);\n          n = e.eq(10);\n        }\n        if (i = f.d, f.s < 0 || !i || !i[0] || f.eq(1)) return new l(i && !i[0] ? -1 / 0 : f.s != 1 ? NaN : i ? 0 : 1 / 0);\n        if (n) if (i.length > 1) s = true;\n        else {\n          for (r = i[0]; r % 10 === 0; ) r /= 10;\n          s = r !== 1;\n        }\n        if (w = false, u = a + g, o = B(f, u), t = n ? ue(l, u + 10) : B(e, u), c = k(o, t, u, 1), Q(c.d, r = a, d)) do\n          if (u += 10, o = B(f, u), t = n ? ue(l, u + 10) : B(e, u), c = k(o, t, u, 1), !s) {\n            +b(c.d).slice(r + 1, r + 15) + 1 == 1e14 && (c = p(c, a + 1, 0));\n            break;\n          }\n        while (Q(c.d, r += 10, d));\n        return w = true, p(c, a, d);\n      };\n      h.minus = h.sub = function(e) {\n        var n, i, t, r, s, o, u, c, f, l, a, d, g = this, v = g.constructor;\n        if (e = new v(e), !g.d || !e.d) return !g.s || !e.s ? e = new v(NaN) : g.d ? e.s = -e.s : e = new v(e.d || g.s !== e.s ? g : NaN), e;\n        if (g.s != e.s) return e.s = -e.s, g.plus(e);\n        if (f = g.d, d = e.d, u = v.precision, c = v.rounding, !f[0] || !d[0]) {\n          if (d[0]) e.s = -e.s;\n          else if (f[0]) e = new v(g);\n          else return new v(c === 3 ? -0 : 0);\n          return w ? p(e, u, c) : e;\n        }\n        if (i = R(e.e / m), l = R(g.e / m), f = f.slice(), s = l - i, s) {\n          for (a = s < 0, a ? (n = f, s = -s, o = d.length) : (n = d, i = l, o = f.length), t = Math.max(Math.ceil(u / m), o) + 2, s > t && (s = t, n.length = 1), n.reverse(), t = s; t--; ) n.push(0);\n          n.reverse();\n        } else {\n          for (t = f.length, o = d.length, a = t < o, a && (o = t), t = 0; t < o; t++) if (f[t] != d[t]) {\n            a = f[t] < d[t];\n            break;\n          }\n          s = 0;\n        }\n        for (a && (n = f, f = d, d = n, e.s = -e.s), o = f.length, t = d.length - o; t > 0; --t) f[o++] = 0;\n        for (t = d.length; t > s; ) {\n          if (f[--t] < d[t]) {\n            for (r = t; r && f[--r] === 0; ) f[r] = D - 1;\n            --f[r], f[t] += D;\n          }\n          f[t] -= d[t];\n        }\n        for (; f[--o] === 0; ) f.pop();\n        for (; f[0] === 0; f.shift()) --i;\n        return f[0] ? (e.d = f, e.e = ce(f, i), w ? p(e, u, c) : e) : new v(c === 3 ? -0 : 0);\n      };\n      h.modulo = h.mod = function(e) {\n        var n, i = this, t = i.constructor;\n        return e = new t(e), !i.d || !e.s || e.d && !e.d[0] ? new t(NaN) : !e.d || i.d && !i.d[0] ? p(new t(i), t.precision, t.rounding) : (w = false, t.modulo == 9 ? (n = k(i, e.abs(), 0, 3, 1), n.s *= e.s) : n = k(i, e, 0, t.modulo, 1), n = n.times(e), w = true, i.minus(n));\n      };\n      h.naturalExponential = h.exp = function() {\n        return be(this);\n      };\n      h.naturalLogarithm = h.ln = function() {\n        return B(this);\n      };\n      h.negated = h.neg = function() {\n        var e = new this.constructor(this);\n        return e.s = -e.s, p(e);\n      };\n      h.plus = h.add = function(e) {\n        var n, i, t, r, s, o, u, c, f, l, a = this, d = a.constructor;\n        if (e = new d(e), !a.d || !e.d) return !a.s || !e.s ? e = new d(NaN) : a.d || (e = new d(e.d || a.s === e.s ? a : NaN)), e;\n        if (a.s != e.s) return e.s = -e.s, a.minus(e);\n        if (f = a.d, l = e.d, u = d.precision, c = d.rounding, !f[0] || !l[0]) return l[0] || (e = new d(a)), w ? p(e, u, c) : e;\n        if (s = R(a.e / m), t = R(e.e / m), f = f.slice(), r = s - t, r) {\n          for (r < 0 ? (i = f, r = -r, o = l.length) : (i = l, t = s, o = f.length), s = Math.ceil(u / m), o = s > o ? s + 1 : o + 1, r > o && (r = o, i.length = 1), i.reverse(); r--; ) i.push(0);\n          i.reverse();\n        }\n        for (o = f.length, r = l.length, o - r < 0 && (r = o, i = l, l = f, f = i), n = 0; r; ) n = (f[--r] = f[r] + l[r] + n) / D | 0, f[r] %= D;\n        for (n && (f.unshift(n), ++t), o = f.length; f[--o] == 0; ) f.pop();\n        return e.d = f, e.e = ce(f, t), w ? p(e, u, c) : e;\n      };\n      h.precision = h.sd = function(e) {\n        var n, i = this;\n        if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error($ + e);\n        return i.d ? (n = $e(i.d), e && i.e + 1 > n && (n = i.e + 1)) : n = NaN, n;\n      };\n      h.round = function() {\n        var e = this, n = e.constructor;\n        return p(new n(e), e.e + 1, n.rounding);\n      };\n      h.sine = h.sin = function() {\n        var e, n, i = this, t = i.constructor;\n        return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = mn(t, We(t, i)), t.precision = e, t.rounding = n, p(Z2 > 2 ? i.neg() : i, e, n, true)) : new t(NaN);\n      };\n      h.squareRoot = h.sqrt = function() {\n        var e, n, i, t, r, s, o = this, u = o.d, c = o.e, f = o.s, l = o.constructor;\n        if (f !== 1 || !u || !u[0]) return new l(!f || f < 0 && (!u || u[0]) ? NaN : u ? o : 1 / 0);\n        for (w = false, f = Math.sqrt(+o), f == 0 || f == 1 / 0 ? (n = b(u), (n.length + c) % 2 == 0 && (n += "0"), f = Math.sqrt(n), c = R((c + 1) / 2) - (c < 0 || c % 2), f == 1 / 0 ? n = "5e" + c : (n = f.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + c), t = new l(n)) : t = new l(f.toString()), i = (c = l.precision) + 3; ; ) if (s = t, t = s.plus(k(o, s, i + 2, 1)).times(0.5), b(s.d).slice(0, i) === (n = b(t.d)).slice(0, i)) if (n = n.slice(i - 3, i + 1), n == "9999" || !r && n == "4999") {\n          if (!r && (p(s, c + 1, 0), s.times(s).eq(o))) {\n            t = s;\n            break;\n          }\n          i += 4, r = 1;\n        } else {\n          (!+n || !+n.slice(1) && n.charAt(0) == "5") && (p(t, c + 1, 1), e = !t.times(t).eq(o));\n          break;\n        }\n        return w = true, p(t, c, l.rounding, e);\n      };\n      h.tangent = h.tan = function() {\n        var e, n, i = this, t = i.constructor;\n        return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 10, t.rounding = 1, i = i.sin(), i.s = 1, i = k(i, new t(1).minus(i.times(i)).sqrt(), e + 10, 0), t.precision = e, t.rounding = n, p(Z2 == 2 || Z2 == 4 ? i.neg() : i, e, n, true)) : new t(NaN);\n      };\n      h.times = h.mul = function(e) {\n        var n, i, t, r, s, o, u, c, f, l = this, a = l.constructor, d = l.d, g = (e = new a(e)).d;\n        if (e.s *= l.s, !d || !d[0] || !g || !g[0]) return new a(!e.s || d && !d[0] && !g || g && !g[0] && !d ? NaN : !d || !g ? e.s / 0 : e.s * 0);\n        for (i = R(l.e / m) + R(e.e / m), c = d.length, f = g.length, c < f && (s = d, d = g, g = s, o = c, c = f, f = o), s = [], o = c + f, t = o; t--; ) s.push(0);\n        for (t = f; --t >= 0; ) {\n          for (n = 0, r = c + t; r > t; ) u = s[r] + g[t] * d[r - t - 1] + n, s[r--] = u % D | 0, n = u / D | 0;\n          s[r] = (s[r] + n) % D | 0;\n        }\n        for (; !s[--o]; ) s.pop();\n        return n ? ++i : s.shift(), e.d = s, e.e = ce(s, i), w ? p(e, a.precision, a.rounding) : e;\n      };\n      h.toBinary = function(e, n) {\n        return Pe(this, 2, e, n);\n      };\n      h.toDecimalPlaces = h.toDP = function(e, n) {\n        var i = this, t = i.constructor;\n        return i = new t(i), e === void 0 ? i : (q(e, 0, H), n === void 0 ? n = t.rounding : q(n, 0, 8), p(i, e + i.e + 1, n));\n      };\n      h.toExponential = function(e, n) {\n        var i, t = this, r = t.constructor;\n        return e === void 0 ? i = L(t, true) : (q(e, 0, H), n === void 0 ? n = r.rounding : q(n, 0, 8), t = p(new r(t), e + 1, n), i = L(t, true, e + 1)), t.isNeg() && !t.isZero() ? "-" + i : i;\n      };\n      h.toFixed = function(e, n) {\n        var i, t, r = this, s = r.constructor;\n        return e === void 0 ? i = L(r) : (q(e, 0, H), n === void 0 ? n = s.rounding : q(n, 0, 8), t = p(new s(r), e + r.e + 1, n), i = L(t, false, e + t.e + 1)), r.isNeg() && !r.isZero() ? "-" + i : i;\n      };\n      h.toFraction = function(e) {\n        var n, i, t, r, s, o, u, c, f, l, a, d, g = this, v = g.d, N = g.constructor;\n        if (!v) return new N(g);\n        if (f = i = new N(1), t = c = new N(0), n = new N(t), s = n.e = $e(v) - g.e - 1, o = s % m, n.d[0] = C(10, o < 0 ? m + o : o), e == null) e = s > 0 ? n : f;\n        else {\n          if (u = new N(e), !u.isInt() || u.lt(f)) throw Error($ + u);\n          e = u.gt(n) ? s > 0 ? n : f : u;\n        }\n        for (w = false, u = new N(b(v)), l = N.precision, N.precision = s = v.length * m * 2; a = k(u, n, 0, 1, 1), r = i.plus(a.times(t)), r.cmp(e) != 1; ) i = t, t = r, r = f, f = c.plus(a.times(r)), c = r, r = n, n = u.minus(a.times(r)), u = r;\n        return r = k(e.minus(i), t, 0, 1, 1), c = c.plus(r.times(f)), i = i.plus(r.times(t)), c.s = f.s = g.s, d = k(f, t, s, 1).minus(g).abs().cmp(k(c, i, s, 1).minus(g).abs()) < 1 ? [f, t] : [c, i], N.precision = l, w = true, d;\n      };\n      h.toHexadecimal = h.toHex = function(e, n) {\n        return Pe(this, 16, e, n);\n      };\n      h.toNearest = function(e, n) {\n        var i = this, t = i.constructor;\n        if (i = new t(i), e == null) {\n          if (!i.d) return i;\n          e = new t(1), n = t.rounding;\n        } else {\n          if (e = new t(e), n === void 0 ? n = t.rounding : q(n, 0, 8), !i.d) return e.s ? i : e;\n          if (!e.d) return e.s && (e.s = i.s), e;\n        }\n        return e.d[0] ? (w = false, i = k(i, e, 0, n, 1).times(e), w = true, p(i)) : (e.s = i.s, i = e), i;\n      };\n      h.toNumber = function() {\n        return +this;\n      };\n      h.toOctal = function(e, n) {\n        return Pe(this, 8, e, n);\n      };\n      h.toPower = h.pow = function(e) {\n        var n, i, t, r, s, o, u = this, c = u.constructor, f = +(e = new c(e));\n        if (!u.d || !e.d || !u.d[0] || !e.d[0]) return new c(C(+u, f));\n        if (u = new c(u), u.eq(1)) return u;\n        if (t = c.precision, s = c.rounding, e.eq(1)) return p(u, t, s);\n        if (n = R(e.e / m), n >= e.d.length - 1 && (i = f < 0 ? -f : f) <= dn) return r = He(c, u, i, t), e.s < 0 ? new c(1).div(r) : p(r, t, s);\n        if (o = u.s, o < 0) {\n          if (n < e.d.length - 1) return new c(NaN);\n          if ((e.d[n] & 1) == 0 && (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1) return u.s = o, u;\n        }\n        return i = C(+u, f), n = i == 0 || !isFinite(i) ? R(f * (Math.log("0." + b(u.d)) / Math.LN10 + u.e + 1)) : new c(i + "").e, n > c.maxE + 1 || n < c.minE - 1 ? new c(n > 0 ? o / 0 : 0) : (w = false, c.rounding = u.s = 1, i = Math.min(12, (n + "").length), r = be(e.times(B(u, t + i)), t), r.d && (r = p(r, t + 5, 1), Q(r.d, t, s) && (n = t + 10, r = p(be(e.times(B(u, n + i)), n), n + 5, 1), +b(r.d).slice(t + 1, t + 15) + 1 == 1e14 && (r = p(r, t + 1, 0)))), r.s = o, w = true, c.rounding = s, p(r, t, s));\n      };\n      h.toPrecision = function(e, n) {\n        var i, t = this, r = t.constructor;\n        return e === void 0 ? i = L(t, t.e <= r.toExpNeg || t.e >= r.toExpPos) : (q(e, 1, H), n === void 0 ? n = r.rounding : q(n, 0, 8), t = p(new r(t), e, n), i = L(t, e <= t.e || t.e <= r.toExpNeg, e)), t.isNeg() && !t.isZero() ? "-" + i : i;\n      };\n      h.toSignificantDigits = h.toSD = function(e, n) {\n        var i = this, t = i.constructor;\n        return e === void 0 ? (e = t.precision, n = t.rounding) : (q(e, 1, H), n === void 0 ? n = t.rounding : q(n, 0, 8)), p(new t(i), e, n);\n      };\n      h.toString = function() {\n        var e = this, n = e.constructor, i = L(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);\n        return e.isNeg() && !e.isZero() ? "-" + i : i;\n      };\n      h.truncated = h.trunc = function() {\n        return p(new this.constructor(this), this.e + 1, 1);\n      };\n      h.valueOf = h.toJSON = function() {\n        var e = this, n = e.constructor, i = L(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);\n        return e.isNeg() ? "-" + i : i;\n      };\n      function b(e) {\n        var n, i, t, r = e.length - 1, s = "", o = e[0];\n        if (r > 0) {\n          for (s += o, n = 1; n < r; n++) t = e[n] + "", i = m - t.length, i && (s += U(i)), s += t;\n          o = e[n], t = o + "", i = m - t.length, i && (s += U(i));\n        } else if (o === 0) return "0";\n        for (; o % 10 === 0; ) o /= 10;\n        return s + o;\n      }\n      function q(e, n, i) {\n        if (e !== ~~e || e < n || e > i) throw Error($ + e);\n      }\n      function Q(e, n, i, t) {\n        var r, s, o, u;\n        for (s = e[0]; s >= 10; s /= 10) --n;\n        return --n < 0 ? (n += m, r = 0) : (r = Math.ceil((n + 1) / m), n %= m), s = C(10, m - n), u = e[r] % s | 0, t == null ? n < 3 ? (n == 0 ? u = u / 100 | 0 : n == 1 && (u = u / 10 | 0), o = i < 4 && u == 99999 || i > 3 && u == 49999 || u == 5e4 || u == 0) : o = (i < 4 && u + 1 == s || i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 100 | 0) == C(10, n - 2) - 1 || (u == s / 2 || u == 0) && (e[r + 1] / s / 100 | 0) == 0 : n < 4 ? (n == 0 ? u = u / 1e3 | 0 : n == 1 ? u = u / 100 | 0 : n == 2 && (u = u / 10 | 0), o = (t || i < 4) && u == 9999 || !t && i > 3 && u == 4999) : o = ((t || i < 4) && u + 1 == s || !t && i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 1e3 | 0) == C(10, n - 3) - 1, o;\n      }\n      function te(e, n, i) {\n        for (var t, r = [0], s, o = 0, u = e.length; o < u; ) {\n          for (s = r.length; s--; ) r[s] *= n;\n          for (r[0] += Se.indexOf(e.charAt(o++)), t = 0; t < r.length; t++) r[t] > i - 1 && (r[t + 1] === void 0 && (r[t + 1] = 0), r[t + 1] += r[t] / i | 0, r[t] %= i);\n        }\n        return r.reverse();\n      }\n      function pn(e, n) {\n        var i, t, r;\n        if (n.isZero()) return n;\n        t = n.d.length, t < 32 ? (i = Math.ceil(t / 3), r = (1 / le(4, i)).toString()) : (i = 16, r = "2.3283064365386962890625e-10"), e.precision += i, n = j(e, 1, n.times(r), new e(1));\n        for (var s = i; s--; ) {\n          var o = n.times(n);\n          n = o.times(o).minus(o).times(8).plus(1);\n        }\n        return e.precision -= i, n;\n      }\n      var k = /* @__PURE__ */ (function() {\n        function e(t, r, s) {\n          var o, u = 0, c = t.length;\n          for (t = t.slice(); c--; ) o = t[c] * r + u, t[c] = o % s | 0, u = o / s | 0;\n          return u && t.unshift(u), t;\n        }\n        function n(t, r, s, o) {\n          var u, c;\n          if (s != o) c = s > o ? 1 : -1;\n          else for (u = c = 0; u < s; u++) if (t[u] != r[u]) {\n            c = t[u] > r[u] ? 1 : -1;\n            break;\n          }\n          return c;\n        }\n        function i(t, r, s, o) {\n          for (var u = 0; s--; ) t[s] -= u, u = t[s] < r[s] ? 1 : 0, t[s] = u * o + t[s] - r[s];\n          for (; !t[0] && t.length > 1; ) t.shift();\n        }\n        return function(t, r, s, o, u, c) {\n          var f, l, a, d, g, v, N, A, M, _, E, P, x, I, ae, z, W, de, T, y, ee = t.constructor, he = t.s == r.s ? 1 : -1, O = t.d, S = r.d;\n          if (!O || !O[0] || !S || !S[0]) return new ee(!t.s || !r.s || (O ? S && O[0] == S[0] : !S) ? NaN : O && O[0] == 0 || !S ? he * 0 : he / 0);\n          for (c ? (g = 1, l = t.e - r.e) : (c = D, g = m, l = R(t.e / g) - R(r.e / g)), T = S.length, W = O.length, M = new ee(he), _ = M.d = [], a = 0; S[a] == (O[a] || 0); a++) ;\n          if (S[a] > (O[a] || 0) && l--, s == null ? (I = s = ee.precision, o = ee.rounding) : u ? I = s + (t.e - r.e) + 1 : I = s, I < 0) _.push(1), v = true;\n          else {\n            if (I = I / g + 2 | 0, a = 0, T == 1) {\n              for (d = 0, S = S[0], I++; (a < W || d) && I--; a++) ae = d * c + (O[a] || 0), _[a] = ae / S | 0, d = ae % S | 0;\n              v = d || a < W;\n            } else {\n              for (d = c / (S[0] + 1) | 0, d > 1 && (S = e(S, d, c), O = e(O, d, c), T = S.length, W = O.length), z = T, E = O.slice(0, T), P = E.length; P < T; ) E[P++] = 0;\n              y = S.slice(), y.unshift(0), de = S[0], S[1] >= c / 2 && ++de;\n              do\n                d = 0, f = n(S, E, T, P), f < 0 ? (x = E[0], T != P && (x = x * c + (E[1] || 0)), d = x / de | 0, d > 1 ? (d >= c && (d = c - 1), N = e(S, d, c), A = N.length, P = E.length, f = n(N, E, A, P), f == 1 && (d--, i(N, T < A ? y : S, A, c))) : (d == 0 && (f = d = 1), N = S.slice()), A = N.length, A < P && N.unshift(0), i(E, N, P, c), f == -1 && (P = E.length, f = n(S, E, T, P), f < 1 && (d++, i(E, T < P ? y : S, P, c))), P = E.length) : f === 0 && (d++, E = [0]), _[a++] = d, f && E[0] ? E[P++] = O[z] || 0 : (E = [O[z]], P = 1);\n              while ((z++ < W || E[0] !== void 0) && I--);\n              v = E[0] !== void 0;\n            }\n            _[0] || _.shift();\n          }\n          if (g == 1) M.e = l, Le = v;\n          else {\n            for (a = 1, d = _[0]; d >= 10; d /= 10) a++;\n            M.e = a + l * g - 1, p(M, u ? s + M.e + 1 : s, o, v);\n          }\n          return M;\n        };\n      })();\n      function p(e, n, i, t) {\n        var r, s, o, u, c, f, l, a, d, g = e.constructor;\n        e: if (n != null) {\n          if (a = e.d, !a) return e;\n          for (r = 1, u = a[0]; u >= 10; u /= 10) r++;\n          if (s = n - r, s < 0) s += m, o = n, l = a[d = 0], c = l / C(10, r - o - 1) % 10 | 0;\n          else if (d = Math.ceil((s + 1) / m), u = a.length, d >= u) if (t) {\n            for (; u++ <= d; ) a.push(0);\n            l = c = 0, r = 1, s %= m, o = s - m + 1;\n          } else break e;\n          else {\n            for (l = u = a[d], r = 1; u >= 10; u /= 10) r++;\n            s %= m, o = s - m + r, c = o < 0 ? 0 : l / C(10, r - o - 1) % 10 | 0;\n          }\n          if (t = t || n < 0 || a[d + 1] !== void 0 || (o < 0 ? l : l % C(10, r - o - 1)), f = i < 4 ? (c || t) && (i == 0 || i == (e.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (i == 4 || t || i == 6 && (s > 0 ? o > 0 ? l / C(10, r - o) : 0 : a[d - 1]) % 10 & 1 || i == (e.s < 0 ? 8 : 7)), n < 1 || !a[0]) return a.length = 0, f ? (n -= e.e + 1, a[0] = C(10, (m - n % m) % m), e.e = -n || 0) : a[0] = e.e = 0, e;\n          if (s == 0 ? (a.length = d, u = 1, d--) : (a.length = d + 1, u = C(10, m - s), a[d] = o > 0 ? (l / C(10, r - o) % C(10, o) | 0) * u : 0), f) for (; ; ) if (d == 0) {\n            for (s = 1, o = a[0]; o >= 10; o /= 10) s++;\n            for (o = a[0] += u, u = 1; o >= 10; o /= 10) u++;\n            s != u && (e.e++, a[0] == D && (a[0] = 1));\n            break;\n          } else {\n            if (a[d] += u, a[d] != D) break;\n            a[d--] = 0, u = 1;\n          }\n          for (s = a.length; a[--s] === 0; ) a.pop();\n        }\n        return w && (e.e > g.maxE ? (e.d = null, e.e = NaN) : e.e < g.minE && (e.e = 0, e.d = [0])), e;\n      }\n      function L(e, n, i) {\n        if (!e.isFinite()) return je(e);\n        var t, r = e.e, s = b(e.d), o = s.length;\n        return n ? (i && (t = i - o) > 0 ? s = s.charAt(0) + "." + s.slice(1) + U(t) : o > 1 && (s = s.charAt(0) + "." + s.slice(1)), s = s + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (s = "0." + U(-r - 1) + s, i && (t = i - o) > 0 && (s += U(t))) : r >= o ? (s += U(r + 1 - o), i && (t = i - r - 1) > 0 && (s = s + "." + U(t))) : ((t = r + 1) < o && (s = s.slice(0, t) + "." + s.slice(t)), i && (t = i - o) > 0 && (r + 1 === o && (s += "."), s += U(t))), s;\n      }\n      function ce(e, n) {\n        var i = e[0];\n        for (n *= m; i >= 10; i /= 10) n++;\n        return n;\n      }\n      function ue(e, n, i) {\n        if (n > hn) throw w = true, i && (e.precision = i), Error(Ie);\n        return p(new e(se), n, 1, true);\n      }\n      function F(e, n, i) {\n        if (n > Ce) throw Error(Ie);\n        return p(new e(oe), n, i, true);\n      }\n      function $e(e) {\n        var n = e.length - 1, i = n * m + 1;\n        if (n = e[n], n) {\n          for (; n % 10 == 0; n /= 10) i--;\n          for (n = e[0]; n >= 10; n /= 10) i++;\n        }\n        return i;\n      }\n      function U(e) {\n        for (var n = ""; e--; ) n += "0";\n        return n;\n      }\n      function He(e, n, i, t) {\n        var r, s = new e(1), o = Math.ceil(t / m + 4);\n        for (w = false; ; ) {\n          if (i % 2 && (s = s.times(n), De(s.d, o) && (r = true)), i = R(i / 2), i === 0) {\n            i = s.d.length - 1, r && s.d[i] === 0 && ++s.d[i];\n            break;\n          }\n          n = n.times(n), De(n.d, o);\n        }\n        return w = true, s;\n      }\n      function Te(e) {\n        return e.d[e.d.length - 1] & 1;\n      }\n      function Ve(e, n, i) {\n        for (var t, r, s = new e(n[0]), o = 0; ++o < n.length; ) {\n          if (r = new e(n[o]), !r.s) {\n            s = r;\n            break;\n          }\n          t = s.cmp(r), (t === i || t === 0 && s.s === i) && (s = r);\n        }\n        return s;\n      }\n      function be(e, n) {\n        var i, t, r, s, o, u, c, f = 0, l = 0, a = 0, d = e.constructor, g = d.rounding, v = d.precision;\n        if (!e.d || !e.d[0] || e.e > 17) return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);\n        for (n == null ? (w = false, c = v) : c = n, u = new d(0.03125); e.e > -2; ) e = e.times(u), a += 5;\n        for (t = Math.log(C(2, a)) / Math.LN10 * 2 + 5 | 0, c += t, i = s = o = new d(1), d.precision = c; ; ) {\n          if (s = p(s.times(e), c, 1), i = i.times(++l), u = o.plus(k(s, i, c, 1)), b(u.d).slice(0, c) === b(o.d).slice(0, c)) {\n            for (r = a; r--; ) o = p(o.times(o), c, 1);\n            if (n == null) if (f < 3 && Q(o.d, c - t, g, f)) d.precision = c += 10, i = s = u = new d(1), l = 0, f++;\n            else return p(o, d.precision = v, g, w = true);\n            else return d.precision = v, o;\n          }\n          o = u;\n        }\n      }\n      function B(e, n) {\n        var i, t, r, s, o, u, c, f, l, a, d, g = 1, v = 10, N = e, A = N.d, M = N.constructor, _ = M.rounding, E = M.precision;\n        if (N.s < 0 || !A || !A[0] || !N.e && A[0] == 1 && A.length == 1) return new M(A && !A[0] ? -1 / 0 : N.s != 1 ? NaN : A ? 0 : N);\n        if (n == null ? (w = false, l = E) : l = n, M.precision = l += v, i = b(A), t = i.charAt(0), Math.abs(s = N.e) < 15e14) {\n          for (; t < 7 && t != 1 || t == 1 && i.charAt(1) > 3; ) N = N.times(e), i = b(N.d), t = i.charAt(0), g++;\n          s = N.e, t > 1 ? (N = new M("0." + i), s++) : N = new M(t + "." + i.slice(1));\n        } else return f = ue(M, l + 2, E).times(s + ""), N = B(new M(t + "." + i.slice(1)), l - v).plus(f), M.precision = E, n == null ? p(N, E, _, w = true) : N;\n        for (a = N, c = o = N = k(N.minus(1), N.plus(1), l, 1), d = p(N.times(N), l, 1), r = 3; ; ) {\n          if (o = p(o.times(d), l, 1), f = c.plus(k(o, new M(r), l, 1)), b(f.d).slice(0, l) === b(c.d).slice(0, l)) if (c = c.times(2), s !== 0 && (c = c.plus(ue(M, l + 2, E).times(s + ""))), c = k(c, new M(g), l, 1), n == null) if (Q(c.d, l - v, _, u)) M.precision = l += v, f = o = N = k(a.minus(1), a.plus(1), l, 1), d = p(N.times(N), l, 1), r = u = 1;\n          else return p(c, M.precision = E, _, w = true);\n          else return M.precision = E, c;\n          c = f, r += 2;\n        }\n      }\n      function je(e) {\n        return String(e.s * e.s / 0);\n      }\n      function re(e, n) {\n        var i, t, r;\n        for ((i = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (t = n.search(/e/i)) > 0 ? (i < 0 && (i = t), i += +n.slice(t + 1), n = n.substring(0, t)) : i < 0 && (i = n.length), t = 0; n.charCodeAt(t) === 48; t++) ;\n        for (r = n.length; n.charCodeAt(r - 1) === 48; --r) ;\n        if (n = n.slice(t, r), n) {\n          if (r -= t, e.e = i = i - t - 1, e.d = [], t = (i + 1) % m, i < 0 && (t += m), t < r) {\n            for (t && e.d.push(+n.slice(0, t)), r -= m; t < r; ) e.d.push(+n.slice(t, t += m));\n            n = n.slice(t), t = m - n.length;\n          } else t -= r;\n          for (; t--; ) n += "0";\n          e.d.push(+n), w && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));\n        } else e.e = 0, e.d = [0];\n        return e;\n      }\n      function gn(e, n) {\n        var i, t, r, s, o, u, c, f, l;\n        if (n.indexOf("_") > -1) {\n          if (n = n.replace(/(\\d)_(?=\\d)/g, "$1"), Be.test(n)) return re(e, n);\n        } else if (n === "Infinity" || n === "NaN") return +n || (e.s = NaN), e.e = NaN, e.d = null, e;\n        if (ln.test(n)) i = 16, n = n.toLowerCase();\n        else if (cn.test(n)) i = 2;\n        else if (an.test(n)) i = 8;\n        else throw Error($ + n);\n        for (s = n.search(/p/i), s > 0 ? (c = +n.slice(s + 1), n = n.substring(2, s)) : n = n.slice(2), s = n.indexOf("."), o = s >= 0, t = e.constructor, o && (n = n.replace(".", ""), u = n.length, s = u - s, r = He(t, new t(i), s, s * 2)), f = te(n, i, D), l = f.length - 1, s = l; f[s] === 0; --s) f.pop();\n        return s < 0 ? new t(e.s * 0) : (e.e = ce(f, l), e.d = f, w = false, o && (e = k(e, r, u * 4)), c && (e = e.times(Math.abs(c) < 54 ? C(2, c) : Y.pow(2, c))), w = true, e);\n      }\n      function mn(e, n) {\n        var i, t = n.d.length;\n        if (t < 3) return n.isZero() ? n : j(e, 2, n, n);\n        i = 1.4 * Math.sqrt(t), i = i > 16 ? 16 : i | 0, n = n.times(1 / le(5, i)), n = j(e, 2, n, n);\n        for (var r, s = new e(5), o = new e(16), u = new e(20); i--; ) r = n.times(n), n = n.times(s.plus(r.times(o.times(r).minus(u))));\n        return n;\n      }\n      function j(e, n, i, t, r) {\n        var s, o, u, c, f = 1, l = e.precision, a = Math.ceil(l / m);\n        for (w = false, c = i.times(i), u = new e(t); ; ) {\n          if (o = k(u.times(c), new e(n++ * n++), l, 1), u = r ? t.plus(o) : t.minus(o), t = k(o.times(c), new e(n++ * n++), l, 1), o = u.plus(t), o.d[a] !== void 0) {\n            for (s = a; o.d[s] === u.d[s] && s--; ) ;\n            if (s == -1) break;\n          }\n          s = u, u = t, t = o, o = s, f++;\n        }\n        return w = true, o.d.length = a + 1, o;\n      }\n      function le(e, n) {\n        for (var i = e; --n; ) i *= e;\n        return i;\n      }\n      function We(e, n) {\n        var i, t = n.s < 0, r = F(e, e.precision, 1), s = r.times(0.5);\n        if (n = n.abs(), n.lte(s)) return Z2 = t ? 4 : 1, n;\n        if (i = n.divToInt(r), i.isZero()) Z2 = t ? 3 : 2;\n        else {\n          if (n = n.minus(i.times(r)), n.lte(s)) return Z2 = Te(i) ? t ? 2 : 3 : t ? 4 : 1, n;\n          Z2 = Te(i) ? t ? 1 : 4 : t ? 3 : 2;\n        }\n        return n.minus(r).abs();\n      }\n      function Pe(e, n, i, t) {\n        var r, s, o, u, c, f, l, a, d, g = e.constructor, v = i !== void 0;\n        if (v ? (q(i, 1, H), t === void 0 ? t = g.rounding : q(t, 0, 8)) : (i = g.precision, t = g.rounding), !e.isFinite()) l = je(e);\n        else {\n          for (l = L(e), o = l.indexOf("."), v ? (r = 2, n == 16 ? i = i * 4 - 3 : n == 8 && (i = i * 3 - 2)) : r = n, o >= 0 && (l = l.replace(".", ""), d = new g(1), d.e = l.length - o, d.d = te(L(d), 10, r), d.e = d.d.length), a = te(l, 10, r), s = c = a.length; a[--c] == 0; ) a.pop();\n          if (!a[0]) l = v ? "0p+0" : "0";\n          else {\n            if (o < 0 ? s-- : (e = new g(e), e.d = a, e.e = s, e = k(e, d, i, t, 0, r), a = e.d, s = e.e, f = Le), o = a[i], u = r / 2, f = f || a[i + 1] !== void 0, f = t < 4 ? (o !== void 0 || f) && (t === 0 || t === (e.s < 0 ? 3 : 2)) : o > u || o === u && (t === 4 || f || t === 6 && a[i - 1] & 1 || t === (e.s < 0 ? 8 : 7)), a.length = i, f) for (; ++a[--i] > r - 1; ) a[i] = 0, i || (++s, a.unshift(1));\n            for (c = a.length; !a[c - 1]; --c) ;\n            for (o = 0, l = ""; o < c; o++) l += Se.charAt(a[o]);\n            if (v) {\n              if (c > 1) if (n == 16 || n == 8) {\n                for (o = n == 16 ? 4 : 3, --c; c % o; c++) l += "0";\n                for (a = te(l, r, n), c = a.length; !a[c - 1]; --c) ;\n                for (o = 1, l = "1."; o < c; o++) l += Se.charAt(a[o]);\n              } else l = l.charAt(0) + "." + l.slice(1);\n              l = l + (s < 0 ? "p" : "p+") + s;\n            } else if (s < 0) {\n              for (; ++s; ) l = "0" + l;\n              l = "0." + l;\n            } else if (++s > c) for (s -= c; s--; ) l += "0";\n            else s < c && (l = l.slice(0, s) + "." + l.slice(s));\n          }\n          l = (n == 16 ? "0x" : n == 2 ? "0b" : n == 8 ? "0o" : "") + l;\n        }\n        return e.s < 0 ? "-" + l : l;\n      }\n      function De(e, n) {\n        if (e.length > n) return e.length = n, true;\n      }\n      function wn(e) {\n        return new this(e).abs();\n      }\n      function Nn(e) {\n        return new this(e).acos();\n      }\n      function vn(e) {\n        return new this(e).acosh();\n      }\n      function En(e, n) {\n        return new this(e).plus(n);\n      }\n      function kn(e) {\n        return new this(e).asin();\n      }\n      function Sn(e) {\n        return new this(e).asinh();\n      }\n      function Mn(e) {\n        return new this(e).atan();\n      }\n      function Cn(e) {\n        return new this(e).atanh();\n      }\n      function bn(e, n) {\n        e = new this(e), n = new this(n);\n        var i, t = this.precision, r = this.rounding, s = t + 4;\n        return !e.s || !n.s ? i = new this(NaN) : !e.d && !n.d ? (i = F(this, s, 1).times(n.s > 0 ? 0.25 : 0.75), i.s = e.s) : !n.d || e.isZero() ? (i = n.s < 0 ? F(this, t, r) : new this(0), i.s = e.s) : !e.d || n.isZero() ? (i = F(this, s, 1).times(0.5), i.s = e.s) : n.s < 0 ? (this.precision = s, this.rounding = 1, i = this.atan(k(e, n, s, 1)), n = F(this, s, 1), this.precision = t, this.rounding = r, i = e.s < 0 ? i.minus(n) : i.plus(n)) : i = this.atan(k(e, n, s, 1)), i;\n      }\n      function Pn(e) {\n        return new this(e).cbrt();\n      }\n      function On(e) {\n        return p(e = new this(e), e.e + 1, 2);\n      }\n      function Rn(e, n, i) {\n        return new this(e).clamp(n, i);\n      }\n      function An(e) {\n        if (!e || typeof e != "object") throw Error(fe + "Object expected");\n        var n, i, t, r = e.defaults === true, s = ["precision", 1, H, "rounding", 0, 8, "toExpNeg", -V, 0, "toExpPos", 0, V, "maxE", 0, V, "minE", -V, 0, "modulo", 0, 9];\n        for (n = 0; n < s.length; n += 3) if (i = s[n], r && (this[i] = Me[i]), (t = e[i]) !== void 0) if (R(t) === t && t >= s[n + 1] && t <= s[n + 2]) this[i] = t;\n        else throw Error($ + i + ": " + t);\n        if (i = "crypto", r && (this[i] = Me[i]), (t = e[i]) !== void 0) if (t === true || t === false || t === 0 || t === 1) if (t) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[i] = true;\n        else throw Error(Ze);\n        else this[i] = false;\n        else throw Error($ + i + ": " + t);\n        return this;\n      }\n      function qn(e) {\n        return new this(e).cos();\n      }\n      function _n(e) {\n        return new this(e).cosh();\n      }\n      function Ge(e) {\n        var n, i, t;\n        function r(s) {\n          var o, u, c, f = this;\n          if (!(f instanceof r)) return new r(s);\n          if (f.constructor = r, Fe(s)) {\n            f.s = s.s, w ? !s.d || s.e > r.maxE ? (f.e = NaN, f.d = null) : s.e < r.minE ? (f.e = 0, f.d = [0]) : (f.e = s.e, f.d = s.d.slice()) : (f.e = s.e, f.d = s.d ? s.d.slice() : s.d);\n            return;\n          }\n          if (c = typeof s, c === "number") {\n            if (s === 0) {\n              f.s = 1 / s < 0 ? -1 : 1, f.e = 0, f.d = [0];\n              return;\n            }\n            if (s < 0 ? (s = -s, f.s = -1) : f.s = 1, s === ~~s && s < 1e7) {\n              for (o = 0, u = s; u >= 10; u /= 10) o++;\n              w ? o > r.maxE ? (f.e = NaN, f.d = null) : o < r.minE ? (f.e = 0, f.d = [0]) : (f.e = o, f.d = [s]) : (f.e = o, f.d = [s]);\n              return;\n            }\n            if (s * 0 !== 0) {\n              s || (f.s = NaN), f.e = NaN, f.d = null;\n              return;\n            }\n            return re(f, s.toString());\n          }\n          if (c === "string") return (u = s.charCodeAt(0)) === 45 ? (s = s.slice(1), f.s = -1) : (u === 43 && (s = s.slice(1)), f.s = 1), Be.test(s) ? re(f, s) : gn(f, s);\n          if (c === "bigint") return s < 0 ? (s = -s, f.s = -1) : f.s = 1, re(f, s.toString());\n          throw Error($ + s);\n        }\n        if (r.prototype = h, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = An, r.clone = Ge, r.isDecimal = Fe, r.abs = wn, r.acos = Nn, r.acosh = vn, r.add = En, r.asin = kn, r.asinh = Sn, r.atan = Mn, r.atanh = Cn, r.atan2 = bn, r.cbrt = Pn, r.ceil = On, r.clamp = Rn, r.cos = qn, r.cosh = _n, r.div = Tn, r.exp = Dn, r.floor = Fn, r.hypot = Ln, r.ln = In, r.log = Zn, r.log10 = Bn, r.log2 = Un, r.max = $n, r.min = Hn, r.mod = Vn, r.mul = jn, r.pow = Wn, r.random = Gn, r.round = Jn, r.sign = Xn, r.sin = Kn, r.sinh = Qn, r.sqrt = Yn, r.sub = xn, r.sum = zn, r.tan = yn, r.tanh = ei, r.trunc = ni, e === void 0 && (e = {}), e && e.defaults !== true) for (t = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], n = 0; n < t.length; ) e.hasOwnProperty(i = t[n++]) || (e[i] = this[i]);\n        return r.config(e), r;\n      }\n      function Tn(e, n) {\n        return new this(e).div(n);\n      }\n      function Dn(e) {\n        return new this(e).exp();\n      }\n      function Fn(e) {\n        return p(e = new this(e), e.e + 1, 3);\n      }\n      function Ln() {\n        var e, n, i = new this(0);\n        for (w = false, e = 0; e < arguments.length; ) if (n = new this(arguments[e++]), n.d) i.d && (i = i.plus(n.times(n)));\n        else {\n          if (n.s) return w = true, new this(1 / 0);\n          i = n;\n        }\n        return w = true, i.sqrt();\n      }\n      function Fe(e) {\n        return e instanceof Y || e && e.toStringTag === Ue || false;\n      }\n      function In(e) {\n        return new this(e).ln();\n      }\n      function Zn(e, n) {\n        return new this(e).log(n);\n      }\n      function Un(e) {\n        return new this(e).log(2);\n      }\n      function Bn(e) {\n        return new this(e).log(10);\n      }\n      function $n() {\n        return Ve(this, arguments, -1);\n      }\n      function Hn() {\n        return Ve(this, arguments, 1);\n      }\n      function Vn(e, n) {\n        return new this(e).mod(n);\n      }\n      function jn(e, n) {\n        return new this(e).mul(n);\n      }\n      function Wn(e, n) {\n        return new this(e).pow(n);\n      }\n      function Gn(e) {\n        var n, i, t, r, s = 0, o = new this(1), u = [];\n        if (e === void 0 ? e = this.precision : q(e, 1, H), t = Math.ceil(e / m), this.crypto) if (crypto.getRandomValues) for (n = crypto.getRandomValues(new Uint32Array(t)); s < t; ) r = n[s], r >= 429e7 ? n[s] = crypto.getRandomValues(new Uint32Array(1))[0] : u[s++] = r % 1e7;\n        else if (crypto.randomBytes) {\n          for (n = crypto.randomBytes(t *= 4); s < t; ) r = n[s] + (n[s + 1] << 8) + (n[s + 2] << 16) + ((n[s + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(n, s) : (u.push(r % 1e7), s += 4);\n          s = t / 4;\n        } else throw Error(Ze);\n        else for (; s < t; ) u[s++] = Math.random() * 1e7 | 0;\n        for (t = u[--s], e %= m, t && e && (r = C(10, m - e), u[s] = (t / r | 0) * r); u[s] === 0; s--) u.pop();\n        if (s < 0) i = 0, u = [0];\n        else {\n          for (i = -1; u[0] === 0; i -= m) u.shift();\n          for (t = 1, r = u[0]; r >= 10; r /= 10) t++;\n          t < m && (i -= m - t);\n        }\n        return o.e = i, o.d = u, o;\n      }\n      function Jn(e) {\n        return p(e = new this(e), e.e + 1, this.rounding);\n      }\n      function Xn(e) {\n        return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;\n      }\n      function Kn(e) {\n        return new this(e).sin();\n      }\n      function Qn(e) {\n        return new this(e).sinh();\n      }\n      function Yn(e) {\n        return new this(e).sqrt();\n      }\n      function xn(e, n) {\n        return new this(e).sub(n);\n      }\n      function zn() {\n        var e = 0, n = arguments, i = new this(n[e]);\n        for (w = false; i.s && ++e < n.length; ) i = i.plus(n[e]);\n        return w = true, p(i, this.precision, this.rounding);\n      }\n      function yn(e) {\n        return new this(e).tan();\n      }\n      function ei(e) {\n        return new this(e).tanh();\n      }\n      function ni(e) {\n        return p(e = new this(e), e.e + 1, 1);\n      }\n      h[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = h.toString;\n      h[Symbol.toStringTag] = "Decimal";\n      var Y = h.constructor = Ge(Me);\n      se = new Y(se);\n      oe = new Y(oe);\n      var Je = Y;\n    }\n  });\n\n  // vendor/labrute/prisma/index-browser.js\n  var require_index_browser2 = __commonJS({\n    "vendor/labrute/prisma/index-browser.js"(exports) {\n      "use strict";\n      Object.defineProperty(exports, "__esModule", { value: true });\n      var {\n        Decimal: Decimal2,\n        objectEnumValues: objectEnumValues2,\n        makeStrictEnum: makeStrictEnum2,\n        Public: Public2,\n        getRuntime: getRuntime2,\n        skip\n      } = require_index_browser();\n      var Prisma2 = {};\n      exports.Prisma = Prisma2;\n      exports.$Enums = {};\n      Prisma2.prismaVersion = {\n        client: "6.19.3",\n        engine: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7"\n      };\n      Prisma2.PrismaClientKnownRequestError = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.PrismaClientUnknownRequestError = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.PrismaClientRustPanicError = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.PrismaClientInitializationError = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.PrismaClientValidationError = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.Decimal = Decimal2;\n      Prisma2.sql = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.empty = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.join = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.raw = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.validator = Public2.validator;\n      Prisma2.getExtensionContext = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.defineExtension = () => {\n        const runtimeName = getRuntime2().prettyName;\n        throw new Error(\n          `Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).\nIn case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`\n        );\n      };\n      Prisma2.DbNull = objectEnumValues2.instances.DbNull;\n      Prisma2.JsonNull = objectEnumValues2.instances.JsonNull;\n      Prisma2.AnyNull = objectEnumValues2.instances.AnyNull;\n      Prisma2.NullTypes = {\n        DbNull: objectEnumValues2.classes.DbNull,\n        JsonNull: objectEnumValues2.classes.JsonNull,\n        AnyNull: objectEnumValues2.classes.AnyNull\n      };\n      exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({\n        ReadUncommitted: "ReadUncommitted",\n        ReadCommitted: "ReadCommitted",\n        RepeatableRead: "RepeatableRead",\n        Serializable: "Serializable"\n      });\n      exports.Prisma.UserScalarFieldEnum = {\n        id: "id",\n        lang: "lang",\n        name: "name",\n        admin: "admin",\n        moderator: "moderator",\n        connexionToken: "connexionToken",\n        bruteLimit: "bruteLimit",\n        gold: "gold",\n        fightSpeed: "fightSpeed",\n        backgroundMusic: "backgroundMusic",\n        dinorpgDone: "dinorpgDone",\n        ips: "ips",\n        fingerprints: "fingerprints",\n        browserIds: "browserIds",\n        createdAt: "createdAt",\n        bannedAt: "bannedAt",\n        banReason: "banReason",\n        displayVersusPage: "displayVersusPage",\n        displayOpponentDetails: "displayOpponentDetails",\n        transferedBrutesCount: "transferedBrutesCount",\n        termsAccepted: "termsAccepted",\n        lastSeen: "lastSeen",\n        sharedBrowserId: "sharedBrowserId"\n      };\n      exports.Prisma.RelationLoadStrategy = {\n        query: "query",\n        join: "join"\n      };\n      exports.Prisma.UserLogScalarFieldEnum = {\n        id: "id",\n        date: "date",\n        userId: "userId",\n        type: "type",\n        bruteId: "bruteId",\n        gold: "gold",\n        oldName: "oldName",\n        targetUserId: "targetUserId"\n      };\n      exports.Prisma.BruteScalarFieldEnum = {\n        id: "id",\n        name: "name",\n        deletedAt: "deletedAt",\n        createdAt: "createdAt",\n        willBeDeletedAt: "willBeDeletedAt",\n        deletionReason: "deletionReason",\n        destinyPath: "destinyPath",\n        previousDestinyPath: "previousDestinyPath",\n        level: "level",\n        xp: "xp",\n        hpStat: "hpStat",\n        hpModifier: "hpModifier",\n        hpValue: "hpValue",\n        strengthStat: "strengthStat",\n        strengthModifier: "strengthModifier",\n        strengthValue: "strengthValue",\n        agilityStat: "agilityStat",\n        agilityModifier: "agilityModifier",\n        agilityValue: "agilityValue",\n        speedStat: "speedStat",\n        speedModifier: "speedModifier",\n        speedValue: "speedValue",\n        ranking: "ranking",\n        gender: "gender",\n        userId: "userId",\n        body: "body",\n        colors: "colors",\n        weapons: "weapons",\n        skills: "skills",\n        pets: "pets",\n        ascensions: "ascensions",\n        ascendedWeapons: "ascendedWeapons",\n        ascendedSkills: "ascendedSkills",\n        ascendedPets: "ascendedPets",\n        masterId: "masterId",\n        pupilsCount: "pupilsCount",\n        clanId: "clanId",\n        registeredForTournament: "registeredForTournament",\n        nextTournamentDate: "nextTournamentDate",\n        currentTournamentDate: "currentTournamentDate",\n        currentTournamentStepWatched: "currentTournamentStepWatched",\n        globalTournamentWatchedDate: "globalTournamentWatchedDate",\n        globalTournamentRoundWatched: "globalTournamentRoundWatched",\n        eventTournamentWatchedDate: "eventTournamentWatchedDate",\n        eventTournamentRoundWatched: "eventTournamentRoundWatched",\n        lastFight: "lastFight",\n        fightsLeft: "fightsLeft",\n        victories: "victories",\n        losses: "losses",\n        opponentsGeneratedAt: "opponentsGeneratedAt",\n        canRankUpSince: "canRankUpSince",\n        favorite: "favorite",\n        wantToJoinClanId: "wantToJoinClanId",\n        tournamentWins: "tournamentWins",\n        eventId: "eventId",\n        resets: "resets",\n        clanRoleId: "clanRoleId"\n      };\n      exports.Prisma.BruteStartingStatsScalarFieldEnum = {\n        id: "id",\n        hp: "hp",\n        strength: "strength",\n        agility: "agility",\n        speed: "speed",\n        bruteId: "bruteId"\n      };\n      exports.Prisma.UnlockedColorsScalarFieldEnum = {\n        bruteId: "bruteId",\n        bodyPart: "bodyPart",\n        colors: "colors"\n      };\n      exports.Prisma.FightScalarFieldEnum = {\n        id: "id",\n        date: "date",\n        brute1Id: "brute1Id",\n        brute2Id: "brute2Id",\n        winnerId: "winnerId",\n        loserId: "loserId",\n        winner: "winner",\n        loser: "loser",\n        steps: "steps",\n        fighters: "fighters",\n        tournamentId: "tournamentId",\n        tournamentStep: "tournamentStep",\n        modifiers: "modifiers",\n        background: "background",\n        clanWarId: "clanWarId",\n        favoriteCount: "favoriteCount"\n      };\n      exports.Prisma.LogScalarFieldEnum = {\n        id: "id",\n        date: "date",\n        currentBruteId: "currentBruteId",\n        type: "type",\n        level: "level",\n        brute: "brute",\n        fightId: "fightId",\n        xp: "xp",\n        gold: "gold",\n        template: "template",\n        destinyChoiceId: "destinyChoiceId"\n      };\n      exports.Prisma.DestinyChoiceScalarFieldEnum = {\n        id: "id",\n        bruteId: "bruteId",\n        path: "path",\n        type: "type",\n        skill: "skill",\n        weapon: "weapon",\n        pet: "pet",\n        originalSkill: "originalSkill",\n        originalWeapon: "originalWeapon",\n        originalPet: "originalPet",\n        stat1: "stat1",\n        stat1Value: "stat1Value",\n        stat2: "stat2",\n        stat2Value: "stat2Value"\n      };\n      exports.Prisma.TournamentScalarFieldEnum = {\n        id: "id",\n        date: "date",\n        type: "type",\n        rounds: "rounds",\n        eventId: "eventId"\n      };\n      exports.Prisma.TournamentAchievementScalarFieldEnum = {\n        id: "id",\n        bruteId: "bruteId",\n        date: "date",\n        achievement: "achievement",\n        achievementCount: "achievementCount"\n      };\n      exports.Prisma.TournamentGoldScalarFieldEnum = {\n        id: "id",\n        date: "date",\n        userId: "userId",\n        gold: "gold"\n      };\n      exports.Prisma.TournamentXpScalarFieldEnum = {\n        id: "id",\n        date: "date",\n        bruteId: "bruteId",\n        xp: "xp"\n      };\n      exports.Prisma.BruteRankingScalarFieldEnum = {\n        bruteId: "bruteId",\n        ranking: "ranking",\n        position: "position"\n      };\n      exports.Prisma.AchievementScalarFieldEnum = {\n        id: "id",\n        name: "name",\n        count: "count",\n        bruteId: "bruteId",\n        userId: "userId"\n      };\n      exports.Prisma.BruteReportScalarFieldEnum = {\n        id: "id",\n        bruteId: "bruteId",\n        bruteName: "bruteName",\n        reason: "reason",\n        count: "count",\n        date: "date",\n        status: "status",\n        handlerId: "handlerId",\n        handledAt: "handledAt"\n      };\n      exports.Prisma.ServerStateScalarFieldEnum = {\n        id: "id",\n        globalTournamentValid: "globalTournamentValid",\n        activeModifiers: "activeModifiers",\n        modifiersEndAt: "modifiersEndAt",\n        nextModifiers: "nextModifiers",\n        bruteRankingsUpdatedAt: "bruteRankingsUpdatedAt"\n      };\n      exports.Prisma.BannedWordScalarFieldEnum = {\n        id: "id",\n        word: "word"\n      };\n      exports.Prisma.BannedIpScalarFieldEnum = {\n        id: "id"\n      };\n      exports.Prisma.BannedFingerprintScalarFieldEnum = {\n        id: "id"\n      };\n      exports.Prisma.KnownFingerprintScalarFieldEnum = {\n        id: "id",\n        description: "description",\n        createdAt: "createdAt"\n      };\n      exports.Prisma.SharedBrowserScalarFieldEnum = {\n        id: "id",\n        description: "description",\n        createdAt: "createdAt"\n      };\n      exports.Prisma.BannedBrowserScalarFieldEnum = {\n        id: "id"\n      };\n      exports.Prisma.ClanScalarFieldEnum = {\n        id: "id",\n        name: "name",\n        deletedAt: "deletedAt",\n        limit: "limit",\n        points: "points",\n        elo: "elo",\n        boss: "boss",\n        damageOnBoss: "damageOnBoss",\n        masterId: "masterId",\n        participateInClanWar: "participateInClanWar"\n      };\n      exports.Prisma.ClanThreadScalarFieldEnum = {\n        id: "id",\n        clanId: "clanId",\n        creatorId: "creatorId",\n        title: "title",\n        locked: "locked",\n        pinned: "pinned",\n        postCount: "postCount",\n        createdAt: "createdAt",\n        updatedAt: "updatedAt"\n      };\n      exports.Prisma.ClanPostScalarFieldEnum = {\n        id: "id",\n        threadId: "threadId",\n        authorId: "authorId",\n        date: "date",\n        message: "message"\n      };\n      exports.Prisma.BossDamageScalarFieldEnum = {\n        id: "id",\n        bruteId: "bruteId",\n        clanId: "clanId",\n        damage: "damage"\n      };\n      exports.Prisma.ClanWarScalarFieldEnum = {\n        id: "id",\n        duration: "duration",\n        type: "type",\n        date: "date",\n        status: "status",\n        attackerId: "attackerId",\n        attackerEloChange: "attackerEloChange",\n        attackerWins: "attackerWins",\n        defenderId: "defenderId",\n        defenderEloChange: "defenderEloChange",\n        defenderWins: "defenderWins",\n        winnerId: "winnerId"\n      };\n      exports.Prisma.ClanWarFightersScalarFieldEnum = {\n        id: "id",\n        clanWarId: "clanWarId",\n        day: "day"\n      };\n      exports.Prisma.InventoryItemScalarFieldEnum = {\n        id: "id",\n        type: "type",\n        count: "count",\n        bruteId: "bruteId",\n        userId: "userId"\n      };\n      exports.Prisma.ReleaseScalarFieldEnum = {\n        version: "version",\n        date: "date"\n      };\n      exports.Prisma.EventScalarFieldEnum = {\n        id: "id",\n        date: "date",\n        type: "type",\n        maxLevel: "maxLevel",\n        maxRound: "maxRound",\n        status: "status",\n        winnerId: "winnerId",\n        finishedAt: "finishedAt",\n        sortedBrutes: "sortedBrutes"\n      };\n      exports.Prisma.NotificationScalarFieldEnum = {\n        id: "id",\n        userId: "userId",\n        message: "message",\n        severity: "severity",\n        link: "link",\n        read: "read",\n        date: "date"\n      };\n      exports.Prisma.ConfigScalarFieldEnum = {\n        key: "key",\n        value: "value",\n        updatedAt: "updatedAt"\n      };\n      exports.Prisma.ClanRoleScalarFieldEnum = {\n        id: "id",\n        clanId: "clanId",\n        name: "name",\n        permissions: "permissions",\n        createdAt: "createdAt"\n      };\n      exports.Prisma.SortOrder = {\n        asc: "asc",\n        desc: "desc"\n      };\n      exports.Prisma.QueryMode = {\n        default: "default",\n        insensitive: "insensitive"\n      };\n      exports.Prisma.NullsOrder = {\n        first: "first",\n        last: "last"\n      };\n      exports.Lang = exports.$Enums.Lang = {\n        en: "en",\n        fr: "fr",\n        de: "de",\n        es: "es",\n        ru: "ru",\n        pt: "pt"\n      };\n      exports.UserLogType = exports.$Enums.UserLogType = {\n        CONNECT: "CONNECT",\n        DISCONNECT: "DISCONNECT",\n        GOLD_WIN: "GOLD_WIN",\n        GOLD_LOSS: "GOLD_LOSS",\n        CREATE_BRUTE: "CREATE_BRUTE",\n        RENAME_BRUTE: "RENAME_BRUTE",\n        SACRIFICE_BRUTE: "SACRIFICE_BRUTE",\n        TRANSFER_BRUTE: "TRANSFER_BRUTE",\n        RECEIVE_BRUTE: "RECEIVE_BRUTE",\n        BANNED: "BANNED",\n        DELETED: "DELETED"\n      };\n      exports.Gender = exports.$Enums.Gender = {\n        male: "male",\n        female: "female"\n      };\n      exports.DestinyChoiceSide = exports.$Enums.DestinyChoiceSide = {\n        LEFT: "LEFT",\n        RIGHT: "RIGHT"\n      };\n      exports.WeaponName = exports.$Enums.WeaponName = {\n        fan: "fan",\n        keyboard: "keyboard",\n        knife: "knife",\n        leek: "leek",\n        mug: "mug",\n        sai: "sai",\n        racquet: "racquet",\n        axe: "axe",\n        bumps: "bumps",\n        flail: "flail",\n        fryingPan: "fryingPan",\n        hatchet: "hatchet",\n        mammothBone: "mammothBone",\n        morningStar: "morningStar",\n        trombone: "trombone",\n        baton: "baton",\n        halbard: "halbard",\n        lance: "lance",\n        trident: "trident",\n        whip: "whip",\n        noodleBowl: "noodleBowl",\n        piopio: "piopio",\n        shuriken: "shuriken",\n        broadsword: "broadsword",\n        scimitar: "scimitar",\n        sword: "sword"\n      };\n      exports.SkillName = exports.$Enums.SkillName = {\n        herculeanStrength: "herculeanStrength",\n        felineAgility: "felineAgility",\n        lightningBolt: "lightningBolt",\n        vitality: "vitality",\n        immortality: "immortality",\n        reconnaissance: "reconnaissance",\n        weaponsMaster: "weaponsMaster",\n        martialArts: "martialArts",\n        sixthSense: "sixthSense",\n        hostility: "hostility",\n        fistsOfFury: "fistsOfFury",\n        shield: "shield",\n        armor: "armor",\n        toughenedSkin: "toughenedSkin",\n        untouchable: "untouchable",\n        sabotage: "sabotage",\n        shock: "shock",\n        bodybuilder: "bodybuilder",\n        relentless: "relentless",\n        survival: "survival",\n        leadSkeleton: "leadSkeleton",\n        balletShoes: "balletShoes",\n        determination: "determination",\n        firstStrike: "firstStrike",\n        resistant: "resistant",\n        counterAttack: "counterAttack",\n        ironHead: "ironHead",\n        thief: "thief",\n        fierceBrute: "fierceBrute",\n        tragicPotion: "tragicPotion",\n        net: "net",\n        bomb: "bomb",\n        hammer: "hammer",\n        cryOfTheDamned: "cryOfTheDamned",\n        hypnosis: "hypnosis",\n        flashFlood: "flashFlood",\n        tamer: "tamer",\n        regeneration: "regeneration",\n        chef: "chef",\n        spy: "spy",\n        saboteur: "saboteur",\n        backup: "backup",\n        hideaway: "hideaway",\n        monk: "monk",\n        vampirism: "vampirism",\n        chaining: "chaining",\n        haste: "haste",\n        treat: "treat",\n        repulse: "repulse",\n        fastMetabolism: "fastMetabolism",\n        mimic: "mimic",\n        stickyHands: "stickyHands",\n        deity: "deity"\n      };\n      exports.PetName = exports.$Enums.PetName = {\n        dog1: "dog1",\n        dog2: "dog2",\n        dog3: "dog3",\n        panther: "panther",\n        bear: "bear"\n      };\n      exports.FightModifier = exports.$Enums.FightModifier = {\n        noThrows: "noThrows",\n        focusOpponent: "focusOpponent",\n        alwaysUseSupers: "alwaysUseSupers",\n        drawEveryWeapon: "drawEveryWeapon",\n        doubleAgility: "doubleAgility",\n        randomSkill: "randomSkill",\n        randomWeapon: "randomWeapon",\n        bareHandsFirstHit: "bareHandsFirstHit",\n        startWithWeapon: "startWithWeapon",\n        chaos: "chaos"\n      };\n      exports.LogType = exports.$Enums.LogType = {\n        win: "win",\n        lose: "lose",\n        child: "child",\n        childup: "childup",\n        up: "up",\n        lvl: "lvl",\n        ascend: "ascend",\n        tournament: "tournament",\n        tournamentXp: "tournamentXp",\n        bossFight: "bossFight",\n        bossDefeat: "bossDefeat"\n      };\n      exports.DestinyChoiceType = exports.$Enums.DestinyChoiceType = {\n        skill: "skill",\n        weapon: "weapon",\n        pet: "pet",\n        stats: "stats"\n      };\n      exports.BruteStat = exports.$Enums.BruteStat = {\n        hp: "hp",\n        strength: "strength",\n        agility: "agility",\n        speed: "speed"\n      };\n      exports.TournamentType = exports.$Enums.TournamentType = {\n        DAILY: "DAILY",\n        GLOBAL: "GLOBAL",\n        UNLIMITED_GLOBAL: "UNLIMITED_GLOBAL",\n        CUSTOM: "CUSTOM",\n        BATTLE_ROYALE: "BATTLE_ROYALE"\n      };\n      exports.AchievementName = exports.$Enums.AchievementName = {\n        wins: "wins",\n        defeats: "defeats",\n        flawless: "flawless",\n        winWith1HP: "winWith1HP",\n        steal2Weapons: "steal2Weapons",\n        singleHitWin: "singleHitWin",\n        combo3: "combo3",\n        combo4: "combo4",\n        combo5: "combo5",\n        counter5: "counter5",\n        evade10: "evade10",\n        block25: "block25",\n        counter4b2b: "counter4b2b",\n        reversal4b2b: "reversal4b2b",\n        block4b2b: "block4b2b",\n        evade4b2b: "evade4b2b",\n        throw10b2b: "throw10b2b",\n        disarm4: "disarm4",\n        disarm8: "disarm8",\n        damage50once: "damage50once",\n        damage100once: "damage100once",\n        hit20times: "hit20times",\n        use10skills: "use10skills",\n        kill3pets: "kill3pets",\n        maxDamage: "maxDamage",\n        hpHealed: "hpHealed",\n        saboteur: "saboteur",\n        dog: "dog",\n        panther: "panther",\n        bear: "bear",\n        panther_bear: "panther_bear",\n        felAg_fistsOfF: "felAg_fistsOfF",\n        felAg_fistsOfF_untouch_relentless: "felAg_fistsOfF_untouch_relentless",\n        vita_armor_toughened: "vita_armor_toughened",\n        herculStr_hammer_fierceBrute: "herculStr_hammer_fierceBrute",\n        shock: "shock",\n        balletShoes_survival: "balletShoes_survival",\n        cryOfTheDamned_hypnosis: "cryOfTheDamned_hypnosis",\n        shield_counterAttack: "shield_counterAttack",\n        reconnaissance_monk: "reconnaissance_monk",\n        immortality: "immortality",\n        doubleBoost: "doubleBoost",\n        tripleBoost: "tripleBoost",\n        quadrupleBoost: "quadrupleBoost",\n        regeneration_potion: "regeneration_potion",\n        bear_tamer: "bear_tamer",\n        tripleDogs: "tripleDogs",\n        fiveWeapons: "fiveWeapons",\n        tenWeapons: "tenWeapons",\n        fifteenWeapons: "fifteenWeapons",\n        twentyWeapons: "twentyWeapons",\n        twentyThreeWeapons: "twentyThreeWeapons",\n        monk_sixthSense_whip: "monk_sixthSense_whip",\n        weaponsMaster_sharp_bodybuilder_heavy: "weaponsMaster_sharp_bodybuilder_heavy",\n        hostility_counterWeapon: "hostility_counterWeapon",\n        flashFlood_twelveWeapons: "flashFlood_twelveWeapons",\n        lightningBolt_firstStrike: "lightningBolt_firstStrike",\n        herculeanStrength: "herculeanStrength",\n        felineAgility: "felineAgility",\n        lightningBolt: "lightningBolt",\n        vitality: "vitality",\n        potion_chef: "potion_chef",\n        tamer_net: "tamer_net",\n        untouchable_balletShoes: "untouchable_balletShoes",\n        survival_resistant: "survival_resistant",\n        hideaway_spy: "hideaway_spy",\n        weaponsFast3: "weaponsFast3",\n        weaponsSharp3: "weaponsSharp3",\n        weaponsHeavy3: "weaponsHeavy3",\n        weaponsLong3: "weaponsLong3",\n        weaponsThrown3: "weaponsThrown3",\n        weaponsBlunt3: "weaponsBlunt3",\n        thor: "thor",\n        deflector: "deflector",\n        allFastWeapons: "allFastWeapons",\n        allSharpWeapons: "allSharpWeapons",\n        allHeavyWeapons: "allHeavyWeapons",\n        allLongWeapons: "allLongWeapons",\n        allThrownWeapons: "allThrownWeapons",\n        allBluntWeapons: "allBluntWeapons",\n        agility50: "agility50",\n        agility100: "agility100",\n        speed50: "speed50",\n        speed100: "speed100",\n        strength50: "strength50",\n        strength100: "strength100",\n        hp300: "hp300",\n        hp600: "hp600",\n        maxLevel: "maxLevel",\n        allAchievements: "allAchievements",\n        winTournamentAs20: "winTournamentAs20",\n        winTournamentAs15: "winTournamentAs15",\n        looseAgainst2: "looseAgainst2",\n        looseAgainst3: "looseAgainst3",\n        looseAgainst4: "looseAgainst4",\n        winAgainst2: "winAgainst2",\n        winAgainst3: "winAgainst3",\n        winAgainst4: "winAgainst4",\n        winAsLower: "winAsLower",\n        win: "win",\n        battleRoyaleWin: "battleRoyaleWin",\n        rankUp10: "rankUp10",\n        rankUp9: "rankUp9",\n        rankUp8: "rankUp8",\n        rankUp7: "rankUp7",\n        rankUp6: "rankUp6",\n        rankUp5: "rankUp5",\n        rankUp4: "rankUp4",\n        rankUp3: "rankUp3",\n        rankUp2: "rankUp2",\n        rankUp1: "rankUp1",\n        rankUp0: "rankUp0",\n        ascend: "ascend",\n        sacrifice: "sacrifice",\n        beta: "beta",\n        bug: "bug"\n      };\n      exports.BruteReportReason = exports.$Enums.BruteReportReason = {\n        name: "name"\n      };\n      exports.BruteReportStatus = exports.$Enums.BruteReportStatus = {\n        pending: "pending",\n        accepted: "accepted",\n        rejected: "rejected"\n      };\n      exports.BossName = exports.$Enums.BossName = {\n        GoldClaw: "GoldClaw",\n        EmberFang: "EmberFang",\n        Cerberus: "Cerberus"\n      };\n      exports.ClanWarType = exports.$Enums.ClanWarType = {\n        friendly: "friendly",\n        official: "official"\n      };\n      exports.ClanWarStatus = exports.$Enums.ClanWarStatus = {\n        pending: "pending",\n        ongoing: "ongoing",\n        waitingForRewards: "waitingForRewards",\n        finished: "finished"\n      };\n      exports.InventoryItemType = exports.$Enums.InventoryItemType = {\n        visualReset: "visualReset",\n        bossTicket: "bossTicket",\n        nameChange: "nameChange",\n        favoriteFight: "favoriteFight",\n        customizationToken: "customizationToken"\n      };\n      exports.EventType = exports.$Enums.EventType = {\n        battleRoyale: "battleRoyale"\n      };\n      exports.EventStatus = exports.$Enums.EventStatus = {\n        starting: "starting",\n        ongoing: "ongoing",\n        finished: "finished"\n      };\n      exports.NotificationSeverity = exports.$Enums.NotificationSeverity = {\n        info: "info",\n        success: "success",\n        warning: "warning",\n        error: "error"\n      };\n      exports.ClanPermission = exports.$Enums.ClanPermission = {\n        canAcceptJoinRequests: "canAcceptJoinRequests",\n        canRejectJoinRequests: "canRejectJoinRequests",\n        canRemoveMembers: "canRemoveMembers",\n        canSelectWarFighters: "canSelectWarFighters",\n        canPinThreads: "canPinThreads",\n        canUnpinThreads: "canUnpinThreads",\n        canDeletePosts: "canDeletePosts",\n        canDeleteThreads: "canDeleteThreads",\n        canCreateRoles: "canCreateRoles",\n        canChangeRoles: "canChangeRoles"\n      };\n      exports.Prisma.ModelName = {\n        User: "User",\n        UserLog: "UserLog",\n        Brute: "Brute",\n        BruteStartingStats: "BruteStartingStats",\n        UnlockedColors: "UnlockedColors",\n        Fight: "Fight",\n        Log: "Log",\n        DestinyChoice: "DestinyChoice",\n        Tournament: "Tournament",\n        TournamentAchievement: "TournamentAchievement",\n        TournamentGold: "TournamentGold",\n        TournamentXp: "TournamentXp",\n        BruteRanking: "BruteRanking",\n        Achievement: "Achievement",\n        BruteReport: "BruteReport",\n        ServerState: "ServerState",\n        BannedWord: "BannedWord",\n        BannedIp: "BannedIp",\n        BannedFingerprint: "BannedFingerprint",\n        KnownFingerprint: "KnownFingerprint",\n        SharedBrowser: "SharedBrowser",\n        BannedBrowser: "BannedBrowser",\n        Clan: "Clan",\n        ClanThread: "ClanThread",\n        ClanPost: "ClanPost",\n        BossDamage: "BossDamage",\n        ClanWar: "ClanWar",\n        ClanWarFighters: "ClanWarFighters",\n        InventoryItem: "InventoryItem",\n        Release: "Release",\n        Event: "Event",\n        Notification: "Notification",\n        Config: "Config",\n        ClanRole: "ClanRole"\n      };\n      var PrismaClient = class {\n        constructor() {\n          return new Proxy(this, {\n            get(target, prop) {\n              let message;\n              const runtime = getRuntime2();\n              if (runtime.isEdge) {\n                message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:\n- Use Prisma Accelerate: https://pris.ly/d/accelerate\n- Use Driver Adapters: https://pris.ly/d/driver-adapters\n`;\n              } else {\n                message = "PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `" + runtime.prettyName + "`).";\n              }\n              message += `\nIf this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`;\n              throw new Error(message);\n            }\n          });\n        }\n      };\n      exports.PrismaClient = PrismaClient;\n      Object.assign(exports, Prisma2);\n    }\n  });\n\n  // node_modules/dayjs/dayjs.min.js\n  var require_dayjs_min = __commonJS({\n    "node_modules/dayjs/dayjs.min.js"(exports, module) {\n      !(function(t, e) {\n        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();\n      })(exports, (function() {\n        "use strict";\n        var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\\d{4})[-/]?(\\d{1,2})?[-/]?(\\d{0,2})[Tt\\s]*(\\d{1,2})?:?(\\d{1,2})?:?(\\d{1,2})?[.:]?(\\d+)?$/, y = /\\[([^\\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {\n          var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;\n          return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";\n        } }, m = function(t2, e2, n2) {\n          var r2 = String(t2);\n          return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;\n        }, v = { s: m, z: function(t2) {\n          var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;\n          return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");\n        }, m: function t2(e2, n2) {\n          if (e2.date() < n2.date()) return -t2(n2, e2);\n          var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);\n          return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);\n        }, a: function(t2) {\n          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);\n        }, p: function(t2) {\n          return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");\n        }, u: function(t2) {\n          return void 0 === t2;\n        } }, g = "en", D = {};\n        D[g] = M;\n        var p = "$isDayjsObject", S = function(t2) {\n          return t2 instanceof _ || !(!t2 || !t2[p]);\n        }, w = function t2(e2, n2, r2) {\n          var i2;\n          if (!e2) return g;\n          if ("string" == typeof e2) {\n            var s2 = e2.toLowerCase();\n            D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);\n            var u2 = e2.split("-");\n            if (!i2 && u2.length > 1) return t2(u2[0]);\n          } else {\n            var a2 = e2.name;\n            D[a2] = e2, i2 = a2;\n          }\n          return !r2 && i2 && (g = i2), i2 || !r2 && g;\n        }, O = function(t2, e2) {\n          if (S(t2)) return t2.clone();\n          var n2 = "object" == typeof e2 ? e2 : {};\n          return n2.date = t2, n2.args = arguments, new _(n2);\n        }, b = v;\n        b.l = w, b.i = S, b.w = function(t2, e2) {\n          return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });\n        };\n        var _ = (function() {\n          function M2(t2) {\n            this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;\n          }\n          var m2 = M2.prototype;\n          return m2.parse = function(t2) {\n            this.$d = (function(t3) {\n              var e2 = t3.date, n2 = t3.utc;\n              if (null === e2) return /* @__PURE__ */ new Date(NaN);\n              if (b.u(e2)) return /* @__PURE__ */ new Date();\n              if (e2 instanceof Date) return new Date(e2);\n              if ("string" == typeof e2 && !/Z$/i.test(e2)) {\n                var r2 = e2.match($);\n                if (r2) {\n                  var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);\n                  return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);\n                }\n              }\n              return new Date(e2);\n            })(t2), this.init();\n          }, m2.init = function() {\n            var t2 = this.$d;\n            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();\n          }, m2.$utils = function() {\n            return b;\n          }, m2.isValid = function() {\n            return !(this.$d.toString() === l);\n          }, m2.isSame = function(t2, e2) {\n            var n2 = O(t2);\n            return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);\n          }, m2.isAfter = function(t2, e2) {\n            return O(t2) < this.startOf(e2);\n          }, m2.isBefore = function(t2, e2) {\n            return this.endOf(e2) < O(t2);\n          }, m2.$g = function(t2, e2, n2) {\n            return b.u(t2) ? this[e2] : this.set(n2, t2);\n          }, m2.unix = function() {\n            return Math.floor(this.valueOf() / 1e3);\n          }, m2.valueOf = function() {\n            return this.$d.getTime();\n          }, m2.startOf = function(t2, e2) {\n            var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {\n              var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);\n              return r2 ? i2 : i2.endOf(a);\n            }, $2 = function(t3, e3) {\n              return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);\n            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");\n            switch (f2) {\n              case h:\n                return r2 ? l2(1, 0) : l2(31, 11);\n              case c:\n                return r2 ? l2(1, M3) : l2(0, M3 + 1);\n              case o:\n                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;\n                return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);\n              case a:\n              case d:\n                return $2(v2 + "Hours", 0);\n              case u:\n                return $2(v2 + "Minutes", 1);\n              case s:\n                return $2(v2 + "Seconds", 2);\n              case i:\n                return $2(v2 + "Milliseconds", 3);\n              default:\n                return this.clone();\n            }\n          }, m2.endOf = function(t2) {\n            return this.startOf(t2, false);\n          }, m2.$set = function(t2, e2) {\n            var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;\n            if (o2 === c || o2 === h) {\n              var y2 = this.clone().set(d, 1);\n              y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;\n            } else l2 && this.$d[l2]($2);\n            return this.init(), this;\n          }, m2.set = function(t2, e2) {\n            return this.clone().$set(t2, e2);\n          }, m2.get = function(t2) {\n            return this[b.p(t2)]();\n          }, m2.add = function(r2, f2) {\n            var d2, l2 = this;\n            r2 = Number(r2);\n            var $2 = b.p(f2), y2 = function(t2) {\n              var e2 = O(l2);\n              return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);\n            };\n            if ($2 === c) return this.set(c, this.$M + r2);\n            if ($2 === h) return this.set(h, this.$y + r2);\n            if ($2 === a) return y2(1);\n            if ($2 === o) return y2(7);\n            var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;\n            return b.w(m3, this);\n          }, m2.subtract = function(t2, e2) {\n            return this.add(-1 * t2, e2);\n          }, m2.format = function(t2) {\n            var e2 = this, n2 = this.$locale();\n            if (!this.isValid()) return n2.invalidDate || l;\n            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {\n              return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);\n            }, d2 = function(t3) {\n              return b.s(s2 % 12 || 12, t3, "0");\n            }, $2 = f2 || function(t3, e3, n3) {\n              var r3 = t3 < 12 ? "AM" : "PM";\n              return n3 ? r3.toLowerCase() : r3;\n            };\n            return r2.replace(y, (function(t3, r3) {\n              return r3 || (function(t4) {\n                switch (t4) {\n                  case "YY":\n                    return String(e2.$y).slice(-2);\n                  case "YYYY":\n                    return b.s(e2.$y, 4, "0");\n                  case "M":\n                    return a2 + 1;\n                  case "MM":\n                    return b.s(a2 + 1, 2, "0");\n                  case "MMM":\n                    return h2(n2.monthsShort, a2, c2, 3);\n                  case "MMMM":\n                    return h2(c2, a2);\n                  case "D":\n                    return e2.$D;\n                  case "DD":\n                    return b.s(e2.$D, 2, "0");\n                  case "d":\n                    return String(e2.$W);\n                  case "dd":\n                    return h2(n2.weekdaysMin, e2.$W, o2, 2);\n                  case "ddd":\n                    return h2(n2.weekdaysShort, e2.$W, o2, 3);\n                  case "dddd":\n                    return o2[e2.$W];\n                  case "H":\n                    return String(s2);\n                  case "HH":\n                    return b.s(s2, 2, "0");\n                  case "h":\n                    return d2(1);\n                  case "hh":\n                    return d2(2);\n                  case "a":\n                    return $2(s2, u2, true);\n                  case "A":\n                    return $2(s2, u2, false);\n                  case "m":\n                    return String(u2);\n                  case "mm":\n                    return b.s(u2, 2, "0");\n                  case "s":\n                    return String(e2.$s);\n                  case "ss":\n                    return b.s(e2.$s, 2, "0");\n                  case "SSS":\n                    return b.s(e2.$ms, 3, "0");\n                  case "Z":\n                    return i2;\n                }\n                return null;\n              })(t3) || i2.replace(":", "");\n            }));\n          }, m2.utcOffset = function() {\n            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);\n          }, m2.diff = function(r2, d2, l2) {\n            var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {\n              return b.m(y2, m3);\n            };\n            switch (M3) {\n              case h:\n                $2 = D2() / 12;\n                break;\n              case c:\n                $2 = D2();\n                break;\n              case f:\n                $2 = D2() / 3;\n                break;\n              case o:\n                $2 = (g2 - v2) / 6048e5;\n                break;\n              case a:\n                $2 = (g2 - v2) / 864e5;\n                break;\n              case u:\n                $2 = g2 / n;\n                break;\n              case s:\n                $2 = g2 / e;\n                break;\n              case i:\n                $2 = g2 / t;\n                break;\n              default:\n                $2 = g2;\n            }\n            return l2 ? $2 : b.a($2);\n          }, m2.daysInMonth = function() {\n            return this.endOf(c).$D;\n          }, m2.$locale = function() {\n            return D[this.$L];\n          }, m2.locale = function(t2, e2) {\n            if (!t2) return this.$L;\n            var n2 = this.clone(), r2 = w(t2, e2, true);\n            return r2 && (n2.$L = r2), n2;\n          }, m2.clone = function() {\n            return b.w(this.$d, this);\n          }, m2.toDate = function() {\n            return new Date(this.valueOf());\n          }, m2.toJSON = function() {\n            return this.isValid() ? this.toISOString() : null;\n          }, m2.toISOString = function() {\n            return this.$d.toISOString();\n          }, m2.toString = function() {\n            return this.$d.toUTCString();\n          }, M2;\n        })(), Y = _.prototype;\n        return O.prototype = Y, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach((function(t2) {\n          Y[t2[1]] = function(e2) {\n            return this.$g(e2, t2[0], t2[1]);\n          };\n        })), O.extend = function(t2, e2) {\n          return t2.$i || (t2(e2, _, O), t2.$i = true), O;\n        }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {\n          return O(1e3 * t2);\n        }, O.en = D[g], O.Ls = D, O.p = {}, O;\n      }));\n    }\n  });\n\n  // node_modules/dayjs/plugin/utc.js\n  var require_utc = __commonJS({\n    "node_modules/dayjs/plugin/utc.js"(exports, module) {\n      !(function(t, i) {\n        "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_utc = i();\n      })(exports, (function() {\n        "use strict";\n        var t = "minute", i = /[+-]\\d\\d(?::?\\d\\d)?/g, e = /([+-]|\\d\\d)/g;\n        return function(s, f, n) {\n          var u = f.prototype;\n          n.utc = function(t2) {\n            var i2 = { date: t2, utc: true, args: arguments };\n            return new f(i2);\n          }, u.utc = function(i2) {\n            var e2 = n(this.toDate(), { locale: this.$L, utc: true });\n            return i2 ? e2.add(this.utcOffset(), t) : e2;\n          }, u.local = function() {\n            return n(this.toDate(), { locale: this.$L, utc: false });\n          };\n          var r = u.parse;\n          u.parse = function(t2) {\n            t2.utc && (this.$u = true), this.$utils().u(t2.$offset) || (this.$offset = t2.$offset), r.call(this, t2);\n          };\n          var o = u.init;\n          u.init = function() {\n            if (this.$u) {\n              var t2 = this.$d;\n              this.$y = t2.getUTCFullYear(), this.$M = t2.getUTCMonth(), this.$D = t2.getUTCDate(), this.$W = t2.getUTCDay(), this.$H = t2.getUTCHours(), this.$m = t2.getUTCMinutes(), this.$s = t2.getUTCSeconds(), this.$ms = t2.getUTCMilliseconds();\n            } else o.call(this);\n          };\n          var a = u.utcOffset;\n          u.utcOffset = function(s2, f2) {\n            var n2 = this.$utils().u;\n            if (n2(s2)) return this.$u ? 0 : n2(this.$offset) ? a.call(this) : this.$offset;\n            if ("string" == typeof s2 && (s2 = (function(t2) {\n              void 0 === t2 && (t2 = "");\n              var s3 = t2.match(i);\n              if (!s3) return null;\n              var f3 = ("" + s3[0]).match(e) || ["-", 0, 0], n3 = f3[0], u3 = 60 * +f3[1] + +f3[2];\n              return 0 === u3 ? 0 : "+" === n3 ? u3 : -u3;\n            })(s2), null === s2)) return this;\n            var u2 = Math.abs(s2) <= 16 ? 60 * s2 : s2;\n            if (0 === u2) return this.utc(f2);\n            var r2 = this.clone();\n            if (f2) return r2.$offset = u2, r2.$u = false, r2;\n            var o2 = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();\n            return (r2 = this.local().add(u2 + o2, t)).$offset = u2, r2.$x.$localOffset = o2, r2;\n          };\n          var h = u.format;\n          u.format = function(t2) {\n            var i2 = t2 || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");\n            return h.call(this, i2);\n          }, u.valueOf = function() {\n            var t2 = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());\n            return this.$d.valueOf() - 6e4 * t2;\n          }, u.isUTC = function() {\n            return !!this.$u;\n          }, u.toISOString = function() {\n            return this.toDate().toISOString();\n          }, u.toString = function() {\n            return this.toDate().toUTCString();\n          };\n          var l = u.toDate;\n          u.toDate = function(t2) {\n            return "s" === t2 && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);\n          };\n          var c = u.diff;\n          u.diff = function(t2, i2, e2) {\n            if (t2 && this.$u === t2.$u) return c.call(this, t2, i2, e2);\n            var s2 = this.local(), f2 = n(t2).local();\n            return c.call(s2, f2, i2, e2);\n          };\n        };\n      }));\n    }\n  });\n\n  // vendor/labrute/core/src/Achievements.ts\n  var AchievementRarety = {\n    common: "common",\n    uncommon: "uncommon",\n    rare: "rare",\n    epic: "epic",\n    legendary: "legendary"\n  };\n  var RaretyOrder = [\n    AchievementRarety.common,\n    AchievementRarety.uncommon,\n    AchievementRarety.rare,\n    AchievementRarety.epic,\n    AchievementRarety.legendary\n  ];\n  var AchievementData = {\n    wins: {\n      rarety: AchievementRarety.common,\n      illustration: "wins.svg",\n      onePerFight: true\n    },\n    defeats: {\n      rarety: AchievementRarety.common,\n      illustration: "defeats.svg",\n      onePerFight: true\n    },\n    flawless: {\n      rarety: AchievementRarety.rare,\n      illustration: "flawless.svg",\n      onePerFight: true\n    },\n    winWith1HP: {\n      rarety: AchievementRarety.epic,\n      illustration: "winWith1HP.svg",\n      onePerFight: true\n    },\n    steal2Weapons: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "steal2Weapons.svg",\n      onePerFight: true\n    },\n    singleHitWin: {\n      rarety: AchievementRarety.epic,\n      illustration: "singleHitWin.svg",\n      onePerFight: true\n    },\n    combo3: {\n      rarety: AchievementRarety.common,\n      illustration: "combo3.svg",\n      onePerFight: true\n    },\n    combo4: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "combo4.svg",\n      onePerFight: true\n    },\n    combo5: {\n      rarety: AchievementRarety.rare,\n      illustration: "combo5.svg",\n      onePerFight: true\n    },\n    counter5: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "counter5.svg",\n      onePerFight: true\n    },\n    evade10: {\n      rarety: AchievementRarety.uncommon,\n      onePerFight: true\n    },\n    block25: {\n      rarety: AchievementRarety.uncommon,\n      onePerFight: true\n    },\n    counter4b2b: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "counter4b2b.svg",\n      onePerFight: true\n    },\n    reversal4b2b: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_paques.gif",\n      onePerFight: true\n    },\n    block4b2b: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "block4b2b.svg",\n      onePerFight: true\n    },\n    evade4b2b: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "evade4b2b.svg",\n      onePerFight: true\n    },\n    throw10b2b: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "throw10b2b.svg",\n      onePerFight: true\n    },\n    disarm4: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "disarm4.svg",\n      onePerFight: true\n    },\n    disarm8: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "disarm8.svg",\n      onePerFight: true\n    },\n    damage50once: {\n      rarety: AchievementRarety.common,\n      illustration: "r_armag.gif",\n      onePerFight: true\n    },\n    damage100once: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_armag.gif",\n      onePerFight: true\n    },\n    hit20times: {\n      rarety: AchievementRarety.common,\n      illustration: "hit20times.svg",\n      onePerFight: true\n    },\n    kill3pets: {\n      rarety: AchievementRarety.uncommon,\n      onePerFight: true\n    },\n    maxDamage: {\n      rarety: AchievementRarety.common,\n      max: true\n    },\n    hpHealed: {\n      rarety: AchievementRarety.common\n    },\n    use10skills: {\n      rarety: AchievementRarety.rare,\n      illustration: "r_jtech.gif",\n      onePerFight: true\n    },\n    saboteur: {\n      rarety: AchievementRarety.common,\n      illustration: "saboteur.svg"\n    },\n    dog: {\n      rarety: AchievementRarety.common,\n      illustration: "dog.svg",\n      perBrute: 3\n    },\n    panther: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_animal.gif",\n      perBrute: 1\n    },\n    bear: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "bear.svg",\n      perBrute: 1\n    },\n    panther_bear: {\n      rarety: AchievementRarety.legendary,\n      illustration: "r_share.gif",\n      perBrute: 1\n    },\n    felAg_fistsOfF: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_heroac.gif",\n      perBrute: 1\n    },\n    felAg_fistsOfF_untouch_relentless: {\n      rarety: AchievementRarety.rare,\n      illustration: "r_surlst.gif",\n      perBrute: 1\n    },\n    vita_armor_toughened: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_brep.gif",\n      perBrute: 1\n    },\n    herculStr_hammer_fierceBrute: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "herculStr_hammer_fierceBrute.svg",\n      perBrute: 1\n    },\n    shock: {\n      rarety: AchievementRarety.common,\n      illustration: "shock.svg",\n      perBrute: 1\n    },\n    balletShoes_survival: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_doutsd.gif",\n      perBrute: 1\n    },\n    cryOfTheDamned_hypnosis: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_forum.gif",\n      perBrute: 1\n    },\n    shield_counterAttack: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "shield_counterAttack.svg",\n      perBrute: 1\n    },\n    reconnaissance_monk: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "reconnaissance_monk.svg",\n      perBrute: 1\n    },\n    immortality: {\n      rarety: AchievementRarety.epic,\n      illustration: "immortality.svg",\n      perBrute: 1\n    },\n    doubleBoost: {\n      rarety: AchievementRarety.rare,\n      illustration: "doubleBoost.svg",\n      perBrute: 1\n    },\n    tripleBoost: {\n      rarety: AchievementRarety.epic,\n      illustration: "tripleBoost.svg",\n      perBrute: 1\n    },\n    quadrupleBoost: {\n      rarety: AchievementRarety.legendary,\n      illustration: "r_drug.gif",\n      perBrute: 1\n    },\n    regeneration_potion: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "bandage_potion.svg",\n      perBrute: 1\n    },\n    bear_tamer: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_cannib.gif",\n      perBrute: 1\n    },\n    tripleDogs: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "tripleDogs.svg",\n      perBrute: 1\n    },\n    fiveWeapons: {\n      rarety: AchievementRarety.common,\n      illustration: "fiveWeapons.svg",\n      perBrute: 1\n    },\n    tenWeapons: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "tenWeapons.svg",\n      perBrute: 1\n    },\n    fifteenWeapons: {\n      rarety: AchievementRarety.rare,\n      illustration: "fifteenWeapons.svg",\n      perBrute: 1\n    },\n    twentyWeapons: {\n      rarety: AchievementRarety.epic,\n      illustration: "r_watgun.gif",\n      perBrute: 1\n    },\n    twentyThreeWeapons: {\n      rarety: AchievementRarety.legendary,\n      illustration: "r_watgun.gif",\n      perBrute: 1\n    },\n    monk_sixthSense_whip: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_collec2.gif",\n      perBrute: 1\n    },\n    weaponsMaster_sharp_bodybuilder_heavy: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "weaponsMaster_sharp_bodybuilder_heavy.svg",\n      perBrute: 1\n    },\n    hostility_counterWeapon: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "hostility_counterWeapon.svg",\n      perBrute: 1\n    },\n    flashFlood_twelveWeapons: {\n      rarety: AchievementRarety.rare,\n      illustration: "r_batgun.gif",\n      perBrute: 1\n    },\n    lightningBolt_firstStrike: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "lightningBolt_firstStrike.svg",\n      perBrute: 1\n    },\n    herculeanStrength: {\n      rarety: AchievementRarety.common,\n      illustration: "herculeanStrength.svg",\n      perBrute: 1\n    },\n    felineAgility: {\n      rarety: AchievementRarety.common,\n      illustration: "felineAgility.svg",\n      perBrute: 1\n    },\n    lightningBolt: {\n      rarety: AchievementRarety.common,\n      illustration: "lightningBolt.svg",\n      perBrute: 1\n    },\n    vitality: {\n      rarety: AchievementRarety.common,\n      illustration: "vitality.svg",\n      perBrute: 1\n    },\n    potion_chef: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_cobaye.gif",\n      perBrute: 1\n    },\n    tamer_net: {\n      rarety: AchievementRarety.uncommon,\n      perBrute: 1\n    },\n    untouchable_balletShoes: {\n      rarety: AchievementRarety.uncommon,\n      perBrute: 1\n    },\n    survival_resistant: {\n      rarety: AchievementRarety.uncommon,\n      perBrute: 1\n    },\n    hideaway_spy: {\n      rarety: AchievementRarety.uncommon,\n      perBrute: 1\n    },\n    weaponsFast3: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_tronco.gif",\n      perBrute: 1\n    },\n    weaponsSharp3: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "weaponsSharp3.svg",\n      perBrute: 1\n    },\n    weaponsHeavy3: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "weaponsHeavy3.svg",\n      perBrute: 1\n    },\n    weaponsLong3: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "weaponsLong3.svg",\n      perBrute: 1\n    },\n    weaponsThrown3: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_sandb.gif",\n      perBrute: 1\n    },\n    weaponsBlunt3: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_refine.gif",\n      perBrute: 1\n    },\n    thor: {\n      rarety: AchievementRarety.rare,\n      perBrute: 1\n    },\n    deflector: {\n      rarety: AchievementRarety.rare,\n      perBrute: 1\n    },\n    allFastWeapons: {\n      rarety: AchievementRarety.epic,\n      perBrute: 1\n    },\n    allSharpWeapons: {\n      rarety: AchievementRarety.epic,\n      perBrute: 1\n    },\n    allHeavyWeapons: {\n      rarety: AchievementRarety.epic,\n      perBrute: 1\n    },\n    allLongWeapons: {\n      rarety: AchievementRarety.epic,\n      perBrute: 1\n    },\n    allThrownWeapons: {\n      rarety: AchievementRarety.epic,\n      perBrute: 1\n    },\n    allBluntWeapons: {\n      rarety: AchievementRarety.epic,\n      perBrute: 1\n    },\n    agility50: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "agility50.svg",\n      perBrute: 1\n    },\n    agility100: {\n      rarety: AchievementRarety.rare,\n      illustration: "agility100.svg",\n      perBrute: 1\n    },\n    speed50: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "speed50.svg",\n      perBrute: 1\n    },\n    speed100: {\n      rarety: AchievementRarety.rare,\n      illustration: "speed100.svg",\n      perBrute: 1\n    },\n    strength50: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "strength50.svg",\n      perBrute: 1\n    },\n    strength100: {\n      rarety: AchievementRarety.rare,\n      illustration: "strength100.svg",\n      perBrute: 1\n    },\n    hp300: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "hp300.svg",\n      perBrute: 1\n    },\n    hp600: {\n      rarety: AchievementRarety.rare,\n      illustration: "hp600.svg",\n      perBrute: 1\n    },\n    maxLevel: {\n      rarety: AchievementRarety.common,\n      illustration: "maxLevel.svg",\n      max: true\n    },\n    allAchievements: {\n      rarety: AchievementRarety.legendary,\n      perBrute: 1\n    },\n    winTournamentAs20: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "r_winthi.gif"\n    },\n    winTournamentAs15: {\n      rarety: AchievementRarety.rare,\n      illustration: "r_winthi.gif"\n    },\n    looseAgainst2: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "looseAgainst2.svg"\n    },\n    looseAgainst3: {\n      rarety: AchievementRarety.rare,\n      illustration: "looseAgainst3.svg"\n    },\n    looseAgainst4: {\n      rarety: AchievementRarety.epic,\n      illustration: "looseAgainst4.svg"\n    },\n    winAgainst2: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "winAgainst2.svg"\n    },\n    winAgainst3: {\n      rarety: AchievementRarety.rare,\n      illustration: "winAgainst3.svg"\n    },\n    winAgainst4: {\n      rarety: AchievementRarety.epic,\n      illustration: "winAgainst4.svg"\n    },\n    winAsLower: {\n      rarety: AchievementRarety.rare,\n      illustration: "r_winbas.gif"\n    },\n    win: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "win.svg"\n    },\n    battleRoyaleWin: {\n      rarety: AchievementRarety.legendary\n    },\n    rankUp10: {\n      rarety: AchievementRarety.uncommon\n    },\n    rankUp9: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "rankUp9.svg"\n    },\n    rankUp8: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "rankUp8.svg"\n    },\n    rankUp7: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "rankUp7.svg"\n    },\n    rankUp6: {\n      rarety: AchievementRarety.uncommon,\n      illustration: "rankUp6.svg"\n    },\n    rankUp5: {\n      rarety: AchievementRarety.uncommon\n    },\n    rankUp4: {\n      rarety: AchievementRarety.uncommon\n    },\n    rankUp3: {\n      rarety: AchievementRarety.uncommon\n    },\n    rankUp2: {\n      rarety: AchievementRarety.rare\n    },\n    rankUp1: {\n      rarety: AchievementRarety.epic\n    },\n    rankUp0: {\n      rarety: AchievementRarety.legendary\n    },\n    ascend: {\n      rarety: AchievementRarety.legendary\n    },\n    sacrifice: {\n      rarety: AchievementRarety.common,\n      illustration: "sacrifice.svg"\n    },\n    beta: {\n      rarety: AchievementRarety.legendary,\n      illustration: "beta.svg"\n    },\n    bug: {\n      rarety: AchievementRarety.legendary,\n      illustration: "bug.svg"\n    }\n  };\n  var updateAchievement = (store, name, count, bruteId) => {\n    if (bruteId === "") return;\n    const current = store[bruteId];\n    if (!current) return;\n    const previousCount = current.achievements[name] || 0;\n    if (previousCount > 0 && AchievementData[name].onePerFight) return;\n    current.achievements[name] = previousCount + count;\n  };\n\n  // vendor/labrute/core/src/constants.ts\n  var import_prisma4 = __toESM(require_index_browser2(), 1);\n\n  // vendor/labrute/core/src/brute/pets.ts\n  var import_prisma = __toESM(require_index_browser2(), 1);\n  var pets = {\n    [import_prisma.PetName.bear]: {\n      name: import_prisma.PetName.bear,\n      odds: 1,\n      hpMalus: [0.4, 0.4, 0.4],\n      initiative: [3.6, 3.6, 3.6],\n      strength: [40, 45, 50],\n      agility: [2, 4, 6],\n      speed: [1, 3, 5],\n      hp: [110, 120, 130],\n      counter: [0, 0, 0],\n      combo: [-0.2, -0.2, -0.2],\n      block: [-0.25, -0.25, -0.25],\n      evasion: [0.1, 0.15, 0.2],\n      accuracy: [0.2, 0.3, 0.4],\n      disarm: [0.05, 0.1, 0.15],\n      damage: [5, 10, 15]\n    },\n    [import_prisma.PetName.panther]: {\n      name: import_prisma.PetName.panther,\n      odds: 1,\n      hpMalus: [0.25, 0.25, 0.25],\n      initiative: [0.6, 0.6, 0.6],\n      strength: [23, 28, 33],\n      agility: [16, 20, 24],\n      speed: [24, 28, 32],\n      hp: [26, 30, 34],\n      counter: [0, 0, 0],\n      combo: [0.7, 0.75, 0.8],\n      block: [0, 0, 0],\n      evasion: [0.2, 0.25, 0.3],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      damage: [3, 6, 9]\n    },\n    [import_prisma.PetName.dog3]: {\n      name: import_prisma.PetName.dog3,\n      odds: 2,\n      hpMalus: [0.1, 0.1, 0.1],\n      initiative: [0.1, 0.1, 0.1],\n      strength: [8, 10, 12],\n      agility: [7, 9, 11],\n      speed: [5, 7, 9],\n      hp: [16, 18, 20],\n      counter: [0, 0, 0],\n      combo: [0.3, 0.4, 0.5],\n      block: [0, 0, 0],\n      evasion: [0, 0, 0],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      damage: [5, 8, 11]\n    },\n    [import_prisma.PetName.dog2]: {\n      name: import_prisma.PetName.dog2,\n      odds: 8,\n      hpMalus: [0.1, 0.1, 0.1],\n      initiative: [0.1, 0.1, 0.1],\n      strength: [7, 9, 11],\n      agility: [6, 8, 10],\n      speed: [4, 6, 8],\n      hp: [15, 17, 19],\n      counter: [0, 0, 0],\n      combo: [0.25, 0.35, 0.45],\n      block: [0, 0, 0],\n      evasion: [0, 0, 0],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      damage: [4, 7, 10]\n    },\n    [import_prisma.PetName.dog1]: {\n      name: import_prisma.PetName.dog1,\n      odds: 20,\n      hpMalus: [0.1, 0.1, 0.1],\n      initiative: [0.1, 0.1, 0.1],\n      strength: [6, 8, 10],\n      agility: [5, 7, 9],\n      speed: [3, 5, 7],\n      hp: [14, 16, 18],\n      counter: [0, 0, 0],\n      combo: [0.2, 0.3, 0.4],\n      block: [0, 0, 0],\n      evasion: [0, 0, 0],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      damage: [3, 6, 9]\n    }\n  };\n  var petList = Object.values(pets);\n  var PETS_TOTAL_ODDS = petList.reduce((acc, pet) => acc + pet.odds, 0);\n\n  // vendor/labrute/core/src/brute/skills.ts\n  var import_prisma3 = __toESM(require_index_browser2(), 1);\n\n  // vendor/labrute/core/src/brute/weapons.ts\n  var import_prisma2 = __toESM(require_index_browser2(), 1);\n  var WeaponByName = {\n    [import_prisma2.WeaponName.fan]: 0 /* fan */,\n    [import_prisma2.WeaponName.keyboard]: 1 /* keyboard */,\n    [import_prisma2.WeaponName.knife]: 2 /* knife */,\n    [import_prisma2.WeaponName.leek]: 3 /* leek */,\n    [import_prisma2.WeaponName.mug]: 4 /* mug */,\n    [import_prisma2.WeaponName.sai]: 5 /* sai */,\n    [import_prisma2.WeaponName.racquet]: 6 /* racquet */,\n    [import_prisma2.WeaponName.axe]: 7 /* axe */,\n    [import_prisma2.WeaponName.bumps]: 8 /* bumps */,\n    [import_prisma2.WeaponName.flail]: 9 /* flail */,\n    [import_prisma2.WeaponName.fryingPan]: 10 /* fryingPan */,\n    [import_prisma2.WeaponName.hatchet]: 11 /* hatchet */,\n    [import_prisma2.WeaponName.mammothBone]: 12 /* mammothBone */,\n    [import_prisma2.WeaponName.morningStar]: 13 /* morningStar */,\n    [import_prisma2.WeaponName.trombone]: 14 /* trombone */,\n    [import_prisma2.WeaponName.baton]: 15 /* baton */,\n    [import_prisma2.WeaponName.halbard]: 16 /* halbard */,\n    [import_prisma2.WeaponName.lance]: 17 /* lance */,\n    [import_prisma2.WeaponName.trident]: 18 /* trident */,\n    [import_prisma2.WeaponName.whip]: 19 /* whip */,\n    [import_prisma2.WeaponName.noodleBowl]: 20 /* noodleBowl */,\n    [import_prisma2.WeaponName.piopio]: 21 /* piopio */,\n    [import_prisma2.WeaponName.shuriken]: 22 /* shuriken */,\n    [import_prisma2.WeaponName.broadsword]: 23 /* broadsword */,\n    [import_prisma2.WeaponName.scimitar]: 24 /* scimitar */,\n    [import_prisma2.WeaponName.sword]: 25 /* sword */\n  };\n  var WeaponById = {\n    [0 /* fan */]: import_prisma2.WeaponName.fan,\n    [1 /* keyboard */]: import_prisma2.WeaponName.keyboard,\n    [2 /* knife */]: import_prisma2.WeaponName.knife,\n    [3 /* leek */]: import_prisma2.WeaponName.leek,\n    [4 /* mug */]: import_prisma2.WeaponName.mug,\n    [5 /* sai */]: import_prisma2.WeaponName.sai,\n    [6 /* racquet */]: import_prisma2.WeaponName.racquet,\n    [7 /* axe */]: import_prisma2.WeaponName.axe,\n    [8 /* bumps */]: import_prisma2.WeaponName.bumps,\n    [9 /* flail */]: import_prisma2.WeaponName.flail,\n    [10 /* fryingPan */]: import_prisma2.WeaponName.fryingPan,\n    [11 /* hatchet */]: import_prisma2.WeaponName.hatchet,\n    [12 /* mammothBone */]: import_prisma2.WeaponName.mammothBone,\n    [13 /* morningStar */]: import_prisma2.WeaponName.morningStar,\n    [14 /* trombone */]: import_prisma2.WeaponName.trombone,\n    [15 /* baton */]: import_prisma2.WeaponName.baton,\n    [16 /* halbard */]: import_prisma2.WeaponName.halbard,\n    [17 /* lance */]: import_prisma2.WeaponName.lance,\n    [18 /* trident */]: import_prisma2.WeaponName.trident,\n    [19 /* whip */]: import_prisma2.WeaponName.whip,\n    [20 /* noodleBowl */]: import_prisma2.WeaponName.noodleBowl,\n    [21 /* piopio */]: import_prisma2.WeaponName.piopio,\n    [22 /* shuriken */]: import_prisma2.WeaponName.shuriken,\n    [23 /* broadsword */]: import_prisma2.WeaponName.broadsword,\n    [24 /* scimitar */]: import_prisma2.WeaponName.scimitar,\n    [25 /* sword */]: import_prisma2.WeaponName.sword\n  };\n  var WeaponType = {\n    FAST: "fast",\n    SHARP: "sharp",\n    HEAVY: "heavy",\n    LONG: "long",\n    THROWN: "thrown",\n    BLUNT: "blunt"\n  };\n  var WeaponAnimations = ["fist", "slash", "estoc", "whip"];\n  var limitedWeapons = [\n    "knife",\n    "broadsword",\n    "lance",\n    "baton",\n    "trident",\n    "hatchet",\n    "scimitar",\n    "axe",\n    "sword",\n    "fan",\n    "shuriken",\n    "bumps",\n    "morningStar",\n    "mammothBone",\n    "flail",\n    "whip"\n  ];\n  var MAX_LIMITED_WEAPONS = limitedWeapons.length - 3;\n  var weapons = {\n    [import_prisma2.WeaponName.axe]: {\n      name: "axe",\n      odds: 3,\n      types: ["heavy", "blunt"],\n      tempo: [2.3, 2.3, 2.3],\n      reversal: [-0.2, -0.2, -0.2],\n      evasion: [-0.4, -0.4, -0.4],\n      dexterity: [-0.8, -0.8, -0.8],\n      block: [-0.5, -0.5, -0.5],\n      accuracy: [0.5, 0.6, 0.7],\n      disarm: [0.1, 0.15, 0.2],\n      combo: [-0.4, -0.4, -0.4],\n      deflect: [0, 0, 0],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [55, 75, 95],\n      toss: [5, 7, 9],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.baton]: {\n      name: "baton",\n      odds: 70,\n      types: ["long"],\n      tempo: [1, 1, 1],\n      reversal: [0.3, 0.35, 0.4],\n      evasion: [0.05, 0.1, 0.15],\n      dexterity: [0, 0, 0],\n      block: [0.25, 0.3, 0.35],\n      accuracy: [0, 0, 0],\n      disarm: [0.25, 0.3, 0.35],\n      combo: [0.1, 0.15, 0.2],\n      deflect: [0, 0, 0],\n      criticalChance: [0.2, 0.25, 0.3],\n      criticalDamage: [0, 0, 0],\n      damage: [6, 8, 10],\n      toss: [3, 5, 7],\n      reach: 3,\n      animation: "estoc"\n    },\n    [import_prisma2.WeaponName.broadsword]: {\n      name: "broadsword",\n      odds: 100,\n      types: ["sharp"],\n      tempo: [1.2, 1.2, 1.2],\n      reversal: [0.1, 0.15, 0.2],\n      evasion: [0, 0, 0],\n      dexterity: [0, 0, 0],\n      block: [0.15, 0.25, 0.35],\n      accuracy: [0, 0, 0],\n      disarm: [0.15, 0.2, 0.25],\n      combo: [0, 0, 0],\n      deflect: [0, 0, 0],\n      criticalChance: [0.3, 0.35, 0.4],\n      criticalDamage: [0, 0, 0],\n      damage: [10, 13, 16],\n      toss: [5, 7, 9],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.bumps]: {\n      name: "bumps",\n      odds: 50,\n      types: ["heavy", "blunt"],\n      tempo: [2, 2, 2],\n      reversal: [-0.3, -0.3, -0.3],\n      evasion: [-0.3, -0.3, -0.3],\n      dexterity: [-0.65, -0.6, -0.55],\n      block: [-0.3, -0.3, -0.3],\n      accuracy: [0.3, 0.4, 0.5],\n      disarm: [0.1, 0.15, 0.2],\n      combo: [-0.6, -0.55, -0.5],\n      deflect: [0, 0, 0],\n      criticalChance: [0.2, 0.3, 0.4],\n      criticalDamage: [0, 0, 0],\n      damage: [30, 40, 50],\n      toss: [5, 7, 9],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.fan]: {\n      name: "fan",\n      odds: 2,\n      types: ["fast"],\n      tempo: [0.28, 0.28, 0.28],\n      reversal: [0.5, 0.55, 0.6],\n      evasion: [0.6, 0.65, 0.7],\n      dexterity: [0.5, 0.55, 0.6],\n      block: [-0.5, -0.5, -0.5],\n      accuracy: [0, 0, 0],\n      disarm: [-0.5, -0.5, -0.5],\n      combo: [0.45, 0.5, 0.55],\n      deflect: [0.25, 0.3, 0.35],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [4, 6, 8],\n      toss: [5, 7, 9],\n      reach: 0,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.flail]: {\n      name: "flail",\n      odds: 4,\n      types: ["heavy", "blunt"],\n      tempo: [2.2, 2.2, 2.2],\n      reversal: [0, 0, 0],\n      evasion: [-0.3, -0.3, -0.3],\n      dexterity: [-1.6, -1.6, -1.6],\n      block: [-0.5, -0.5, -0.5],\n      accuracy: [1.5, 2, 2.5],\n      disarm: [-0.2, -0.2, -0.2],\n      combo: [0.3, 0.35, 0.4],\n      deflect: [0, 0, 0],\n      criticalChance: [-0.2, -0.2, -0.2],\n      criticalDamage: [0, 0, 0],\n      damage: [36, 42, 48],\n      toss: [5, 7, 9],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.fryingPan]: {\n      name: "fryingPan",\n      odds: 0.4,\n      types: ["heavy", "blunt"],\n      tempo: [1.2, 1.2, 1.2],\n      reversal: [0, 0, 0],\n      evasion: [0, 0, 0],\n      dexterity: [0, 0, 0],\n      block: [0.4, 0.45, 0.5],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      combo: [-0.4, -0.4, -0.4],\n      deflect: [0.4, 0.5, 0.6],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [17, 22, 27],\n      toss: [2, 4, 6],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.halbard]: {\n      name: "halbard",\n      odds: 2,\n      types: ["long", "heavy", "sharp"],\n      tempo: [1.8, 1.8, 1.8],\n      reversal: [0, 0, 0],\n      evasion: [0, 0, 0],\n      dexterity: [-0.4, -0.4, -0.4],\n      block: [0, 0, 0],\n      accuracy: [0, 0, 0],\n      disarm: [0.1, 0.15, 0.2],\n      combo: [0.1, 0.15, 0.2],\n      deflect: [0, 0, 0],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [24, 30, 36],\n      toss: [2, 4, 6],\n      reach: 4,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.hatchet]: {\n      name: "hatchet",\n      odds: 40,\n      types: ["heavy", "sharp"],\n      tempo: [1.5, 1.5, 1.5],\n      reversal: [0, 0, 0],\n      evasion: [0, 0, 0],\n      dexterity: [0, 0, 0],\n      block: [-0.1, -0.1, -0.1],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      combo: [0, 0, 0],\n      deflect: [0, 0, 0],\n      criticalChance: [0.15, 0.25, 0.35],\n      criticalDamage: [0, 0, 0],\n      damage: [17, 22, 27],\n      toss: [3, 5, 7],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.keyboard]: {\n      name: "keyboard",\n      odds: 0.4,\n      types: ["fast", "blunt"],\n      tempo: [1, 1, 1],\n      reversal: [0, 0, 0],\n      evasion: [0.1, 0.15, 0.2],\n      dexterity: [0.2, 0.3, 0.4],\n      block: [0, 0, 0],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      combo: [0.5, 0.55, 0.6],\n      deflect: [0.3, 0.35, 0.4],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [7, 10, 13],\n      toss: [2, 4, 6],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.knife]: {\n      name: "knife",\n      odds: 80,\n      types: ["fast", "sharp"],\n      tempo: [0.6, 0.6, 0.6],\n      reversal: [0, 0, 0],\n      evasion: [0.1, 0.15, 0.2],\n      dexterity: [0.5, 0.55, 0.6],\n      block: [0, 0, 0],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      combo: [0.3, 0.4, 0.5],\n      deflect: [0, 0, 0],\n      criticalChance: [0.25, 0.25, 0.25],\n      criticalDamage: [0, 0, 0],\n      damage: [7, 10, 13],\n      toss: [5, 7, 9],\n      reach: 0,\n      animation: "estoc"\n    },\n    [import_prisma2.WeaponName.lance]: {\n      name: "lance",\n      odds: 40,\n      types: ["long"],\n      tempo: [1.2, 1.2, 1.2],\n      reversal: [-0.1, -0.1, -0.1],\n      evasion: [0, 0, 0],\n      dexterity: [0, 0, 0],\n      block: [0, 0, 0],\n      accuracy: [0, 0, 0],\n      disarm: [0.1, 0.15, 0.2],\n      combo: [0, 0, 0],\n      deflect: [0, 0, 0],\n      criticalChance: [0.15, 0.25, 0.35],\n      criticalDamage: [0, 0, 0],\n      damage: [12, 16, 20],\n      toss: [2, 4, 6],\n      reach: 3,\n      animation: "estoc"\n    },\n    [import_prisma2.WeaponName.leek]: {\n      name: "leek",\n      odds: 0.4,\n      types: ["fast", "blunt"],\n      tempo: [1.1, 1.1, 1.1],\n      reversal: [1, 1, 1],\n      evasion: [0, 0, 0],\n      dexterity: [-1, -1, -1],\n      block: [-0.5, -0.5, -0.5],\n      accuracy: [2, 3, 4],\n      disarm: [0, 0, 0],\n      combo: [2, 3, 4],\n      deflect: [0, 0, 0],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [5, 8, 11],\n      toss: [2, 4, 6],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.mammothBone]: {\n      name: "mammothBone",\n      odds: 20,\n      types: ["heavy", "blunt"],\n      tempo: [1.6, 1.6, 1.6],\n      reversal: [0, 0, 0],\n      evasion: [0, 0, 0],\n      dexterity: [-0.5, -0.5, -0.5],\n      block: [0, 0, 0],\n      accuracy: [0.5, 0.55, 0.6],\n      disarm: [0.1, 0.15, 0.2],\n      combo: [-0.1, -0.1, -0.1],\n      deflect: [0, 0, 0],\n      criticalChance: [0.15, 0.25, 0.35],\n      criticalDamage: [0, 0, 0],\n      damage: [14, 18, 22],\n      toss: [5, 7, 9],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.morningStar]: {\n      name: "morningStar",\n      odds: 6,\n      types: ["heavy", "blunt"],\n      tempo: [1.5, 1.5, 1.5],\n      reversal: [0, 0, 0],\n      evasion: [-0.1, -0.1, -0.1],\n      block: [0, 0, 0],\n      accuracy: [0.3, 0.4, 0.5],\n      dexterity: [-0.35, -0.35, -0.35],\n      disarm: [0.1, 0.15, 0.2],\n      combo: [0, 0, 0],\n      deflect: [0, 0, 0],\n      criticalChance: [0.05, 0.1, 0.15],\n      criticalDamage: [0, 0, 0],\n      damage: [20, 30, 40],\n      toss: [5, 7, 9],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.mug]: {\n      name: "mug",\n      odds: 0.4,\n      types: ["fast"],\n      tempo: [0.9, 0.9, 0.9],\n      reversal: [0, 0, 0],\n      evasion: [0.15, 0.2, 0.25],\n      dexterity: [0.3, 0.4, 0.5],\n      block: [-0.1, -0.1, -0.1],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      combo: [0.4, 0.5, 0.6],\n      deflect: [0, 0, 0],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [8, 12, 16],\n      toss: [2, 4, 6],\n      reach: 0,\n      animation: "estoc"\n    },\n    [import_prisma2.WeaponName.noodleBowl]: {\n      name: "noodleBowl",\n      odds: 0.4,\n      types: ["thrown"],\n      tempo: [0.45, 0.45, 0.45],\n      reversal: [0, 0, 0],\n      evasion: [0.1, 0.15, 0.2],\n      dexterity: [0, 0, 0],\n      block: [-0.1, -0.1, -0.1],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      combo: [0.3, 0.4, 0.5],\n      deflect: [0, 0, 0],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [10, 15, 20],\n      toss: [2, 4, 6],\n      reach: 0,\n      animation: "fist"\n    },\n    [import_prisma2.WeaponName.piopio]: {\n      name: "piopio",\n      odds: 0.4,\n      types: ["thrown"],\n      tempo: [0.32, 0.32, 0.32],\n      reversal: [0, 0, 0],\n      evasion: [0.5, 0.55, 0.6],\n      dexterity: [0, 0, 0],\n      block: [-0.1, -0.1, -0.1],\n      accuracy: [0, 0, 0],\n      disarm: [0.5, 0.55, 0.6],\n      combo: [0, 0, 0],\n      deflect: [0, 0, 0],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [5, 8, 11],\n      toss: [2, 4, 6],\n      reach: 0,\n      animation: "fist"\n    },\n    [import_prisma2.WeaponName.racquet]: {\n      name: "racquet",\n      odds: 0.4,\n      types: ["fast", "blunt"],\n      tempo: [0.8, 0.8, 0.8],\n      reversal: [1, 1.5, 2],\n      evasion: [0.1, 0.15, 0.2],\n      dexterity: [0, 0, 0],\n      block: [0.2, 0.25, 0.3],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      combo: [0, 0, 0],\n      deflect: [0.5, 0.55, 0.6],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [6, 9, 12],\n      toss: [2, 4, 6],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.sai]: {\n      name: "sai",\n      odds: 6,\n      types: ["fast"],\n      tempo: [0.6, 0.6, 0.6],\n      reversal: [0, 0, 0],\n      evasion: [0.1, 0.15, 0.2],\n      dexterity: [0.25, 0.35, 0.45],\n      block: [0.3, 0.35, 0.4],\n      accuracy: [0, 0, 0],\n      disarm: [0.75, 0.8, 0.85],\n      combo: [0.3, 0.35, 0.4],\n      deflect: [0.25, 0.35, 0.45],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [8, 12, 16],\n      toss: [5, 7, 9],\n      reach: 0,\n      animation: "estoc"\n    },\n    [import_prisma2.WeaponName.scimitar]: {\n      name: "scimitar",\n      odds: 6,\n      types: ["sharp"],\n      tempo: [0.8, 0.8, 0.8],\n      reversal: [0, 0, 0],\n      evasion: [0, 0, 0],\n      dexterity: [0.2, 0.3, 0.4],\n      block: [0.1, 0.15, 0.2],\n      accuracy: [0, 0, 0],\n      disarm: [0, 0, 0],\n      combo: [0.15, 0.25, 0.35],\n      deflect: [0, 0, 0],\n      criticalChance: [0.05, 0.1, 0.15],\n      criticalDamage: [0, 0, 0],\n      damage: [10, 15, 20],\n      toss: [3, 5, 7],\n      reach: 1,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.shuriken]: {\n      name: "shuriken",\n      odds: 8,\n      types: ["thrown"],\n      tempo: [0.12, 0.12, 0.12],\n      reversal: [0, 0, 0],\n      evasion: [0.15, 0.2, 0.25],\n      dexterity: [0, 0, 0],\n      block: [-0.1, -0.1, -0.1],\n      accuracy: [0, 0, 0],\n      disarm: [-0.5, -0.5, -0.5],\n      combo: [0.3, 0.4, 0.5],\n      deflect: [0, 0, 0],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [3, 5, 7],\n      toss: [5, 7, 9],\n      reach: 0,\n      animation: "fist"\n    },\n    [import_prisma2.WeaponName.sword]: {\n      name: "sword",\n      odds: 4,\n      types: ["sharp"],\n      tempo: [1.8, 1.8, 1.8],\n      reversal: [0, 0, 0],\n      evasion: [-0.2, -0.2, -0.2],\n      dexterity: [0.1, 0.15, 0.2],\n      block: [0, 0, 0],\n      accuracy: [-0.2, -0.2, -0.2],\n      disarm: [0.1, 0.15, 0.2],\n      combo: [0, 0, 0],\n      deflect: [0, 0, 0],\n      criticalChance: [0.05, 0.1, 0.15],\n      criticalDamage: [0, 0, 0],\n      damage: [28, 36, 44],\n      toss: [5, 7, 9],\n      reach: 2,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.trident]: {\n      name: "trident",\n      odds: 10,\n      types: ["long"],\n      tempo: [1.4, 1.4, 1.4],\n      reversal: [0.05, 0.1, 0.15],\n      evasion: [0, 0, 0],\n      dexterity: [0, 0, 0],\n      block: [0, 0, 0],\n      accuracy: [0, 0, 0],\n      disarm: [0.2, 0.3, 0.4],\n      combo: [0, 0, 0],\n      deflect: [0, 0, 0],\n      criticalChance: [0.05, 0.1, 0.15],\n      criticalDamage: [0, 0, 0],\n      damage: [14, 18, 22],\n      toss: [3, 5, 7],\n      reach: 3,\n      animation: "estoc"\n    },\n    [import_prisma2.WeaponName.trombone]: {\n      name: "trombone",\n      odds: 0.4,\n      types: ["heavy", "blunt"],\n      tempo: [2.5, 2.5, 2.5],\n      reversal: [0, 0, 0],\n      evasion: [0, 0, 0],\n      dexterity: [-0.3, -0.3, -0.3],\n      block: [0.2, 0.25, 0.3],\n      accuracy: [0.2, 0.25, 0.3],\n      disarm: [0.5, 0.55, 0.6],\n      combo: [0.3, 0.35, 0.4],\n      deflect: [0, 0, 0],\n      criticalChance: [-0.1, -0.1, -0.1],\n      criticalDamage: [0, 0, 0],\n      damage: [20, 25, 30],\n      toss: [2, 4, 6],\n      reach: 2,\n      animation: "slash"\n    },\n    [import_prisma2.WeaponName.whip]: {\n      name: "whip",\n      odds: 3,\n      types: ["long"],\n      tempo: [1.5, 1.5, 1.5],\n      reversal: [-0.1, -0.1, -0.1],\n      evasion: [0.3, 0.35, 0.4],\n      dexterity: [0.5, 0.55, 0.6],\n      block: [-0.2, -0.2, -0.2],\n      accuracy: [-0.2, -0.2, -0.2],\n      disarm: [0.3, 0.35, 0.4],\n      combo: [0.35, 0.4, 0.45],\n      deflect: [0, 0, 0],\n      criticalChance: [0, 0, 0],\n      criticalDamage: [0, 0, 0],\n      damage: [10, 15, 20],\n      toss: [5, 7, 9],\n      reach: 5,\n      animation: "whip"\n    }\n  };\n  var weaponList = Object.values(weapons);\n  var WEAPONS_TOTAL_ODDS = weaponList.reduce((acc, weapon) => acc + weapon.odds, 0);\n  var WEAPONS_SFX = {\n    ...weaponList.reduce((acc, weapon) => {\n      acc[weapon.name] = [];\n      if (weapon.name === "fryingPan") {\n        acc[weapon.name] = ["fryingPan1", "fryingPan2"];\n        return acc;\n      }\n      if (weapon.name === "baton") {\n        acc[weapon.name] = ["baton1", "baton2", "baton3"];\n        return acc;\n      }\n      if (weapon.name === "lance") {\n        acc[weapon.name] = ["lance1", "lance2"];\n        return acc;\n      }\n      if (weapon.name === "axe") {\n        acc[weapon.name] = ["axe1", "axe2"];\n        return acc;\n      }\n      if (weapon.name === "keyboard") {\n        acc[weapon.name] = ["keyboard1", "keyboard2"];\n        return acc;\n      }\n      if (weapon.name === "broadsword") {\n        acc[weapon.name] = ["broadsword1", "broadsword2"];\n        return acc;\n      }\n      if (weapon.name === "hatchet") {\n        acc[weapon.name] = ["hatchet1", "hatchet2"];\n        return acc;\n      }\n      if (weapon.name === "knife") {\n        acc[weapon.name] = ["knife1", "knife2"];\n        return acc;\n      }\n      if (weapon.name === "noodleBowl") {\n        acc[weapon.name] = ["noodleBowl1", "noodleBowl2"];\n        return acc;\n      }\n      if (weapon.name === "fan") {\n        acc[weapon.name] = ["fan1", "fan2"];\n        return acc;\n      }\n      if (weapon.name === "piopio") {\n        acc[weapon.name] = ["piopio"];\n        return acc;\n      }\n      if (weapon.name === "shuriken") {\n        acc[weapon.name] = ["shuriken"];\n        return acc;\n      }\n      if (weapon.name === "racquet") {\n        acc[weapon.name] = ["racquet"];\n        return acc;\n      }\n      if (weapon.name === "scimitar") {\n        acc[weapon.name] = ["scimitar1", "scimitar2"];\n        return acc;\n      }\n      if (weapon.name === "mammothBone") {\n        acc[weapon.name] = ["mammothBone"];\n        return acc;\n      }\n      if (weapon.name === "sword") {\n        acc[weapon.name] = ["sword"];\n        return acc;\n      }\n      if (weapon.name === "trombone") {\n        acc[weapon.name] = ["trombone1", "trombone2"];\n        return acc;\n      }\n      if (weapon.name === "whip") {\n        acc[weapon.name] = ["whip"];\n        return acc;\n      }\n      if (weapon.name === "leek") {\n        acc[weapon.name] = ["leek"];\n        return acc;\n      }\n      if (weapon.types.includes("sharp")) {\n        acc[weapon.name].push("sharp1", "sharp2", "sharp3", "sharp4", "sharp5", "sharp6", "sharp7", "sharp8");\n      } else {\n        acc[weapon.name].push("blunt1", "blunt2", "blunt3", "blunt4", "blunt5", "blunt6", "blunt7", "blunt8");\n      }\n      return acc;\n    }, {})\n  };\n\n  // vendor/labrute/core/src/brute/skills.ts\n  var SkillByName = {\n    [import_prisma3.SkillName.herculeanStrength]: 0 /* herculeanStrength */,\n    [import_prisma3.SkillName.felineAgility]: 1 /* felineAgility */,\n    [import_prisma3.SkillName.lightningBolt]: 2 /* lightningBolt */,\n    [import_prisma3.SkillName.vitality]: 3 /* vitality */,\n    [import_prisma3.SkillName.immortality]: 4 /* immortality */,\n    [import_prisma3.SkillName.reconnaissance]: 5 /* reconnaissance */,\n    [import_prisma3.SkillName.weaponsMaster]: 6 /* weaponsMaster */,\n    [import_prisma3.SkillName.martialArts]: 7 /* martialArts */,\n    [import_prisma3.SkillName.sixthSense]: 8 /* sixthSense */,\n    [import_prisma3.SkillName.hostility]: 9 /* hostility */,\n    [import_prisma3.SkillName.fistsOfFury]: 10 /* fistsOfFury */,\n    [import_prisma3.SkillName.shield]: 11 /* shield */,\n    [import_prisma3.SkillName.armor]: 12 /* armor */,\n    [import_prisma3.SkillName.toughenedSkin]: 13 /* toughenedSkin */,\n    [import_prisma3.SkillName.untouchable]: 14 /* untouchable */,\n    [import_prisma3.SkillName.sabotage]: 15 /* sabotage */,\n    [import_prisma3.SkillName.shock]: 16 /* shock */,\n    [import_prisma3.SkillName.bodybuilder]: 17 /* bodybuilder */,\n    [import_prisma3.SkillName.relentless]: 18 /* relentless */,\n    [import_prisma3.SkillName.survival]: 19 /* survival */,\n    [import_prisma3.SkillName.leadSkeleton]: 20 /* leadSkeleton */,\n    [import_prisma3.SkillName.balletShoes]: 21 /* balletShoes */,\n    [import_prisma3.SkillName.determination]: 22 /* determination */,\n    [import_prisma3.SkillName.firstStrike]: 23 /* firstStrike */,\n    [import_prisma3.SkillName.resistant]: 24 /* resistant */,\n    [import_prisma3.SkillName.counterAttack]: 25 /* counterAttack */,\n    [import_prisma3.SkillName.ironHead]: 26 /* ironHead */,\n    [import_prisma3.SkillName.thief]: 27 /* thief */,\n    [import_prisma3.SkillName.fierceBrute]: 28 /* fierceBrute */,\n    [import_prisma3.SkillName.tragicPotion]: 29 /* tragicPotion */,\n    [import_prisma3.SkillName.net]: 30 /* net */,\n    [import_prisma3.SkillName.bomb]: 31 /* bomb */,\n    [import_prisma3.SkillName.hammer]: 32 /* hammer */,\n    [import_prisma3.SkillName.cryOfTheDamned]: 33 /* cryOfTheDamned */,\n    [import_prisma3.SkillName.hypnosis]: 34 /* hypnosis */,\n    [import_prisma3.SkillName.flashFlood]: 35 /* flashFlood */,\n    [import_prisma3.SkillName.tamer]: 36 /* tamer */,\n    [import_prisma3.SkillName.regeneration]: 37 /* regeneration */,\n    [import_prisma3.SkillName.chef]: 38 /* chef */,\n    [import_prisma3.SkillName.spy]: 39 /* spy */,\n    [import_prisma3.SkillName.saboteur]: 40 /* saboteur */,\n    [import_prisma3.SkillName.backup]: 41 /* backup */,\n    [import_prisma3.SkillName.hideaway]: 42 /* hideaway */,\n    [import_prisma3.SkillName.monk]: 43 /* monk */,\n    [import_prisma3.SkillName.vampirism]: 44 /* vampirism */,\n    [import_prisma3.SkillName.chaining]: 45 /* chaining */,\n    [import_prisma3.SkillName.haste]: 46 /* haste */,\n    [import_prisma3.SkillName.treat]: 47 /* treat */,\n    [import_prisma3.SkillName.repulse]: 48 /* repulse */,\n    [import_prisma3.SkillName.fastMetabolism]: 49 /* fastMetabolism */,\n    [import_prisma3.SkillName.mimic]: 50 /* mimic */,\n    [import_prisma3.SkillName.stickyHands]: 51 /* stickyHands */,\n    [import_prisma3.SkillName.deity]: 52 /* deity */\n  };\n  var SkillById = {\n    [0 /* herculeanStrength */]: import_prisma3.SkillName.herculeanStrength,\n    [1 /* felineAgility */]: import_prisma3.SkillName.felineAgility,\n    [2 /* lightningBolt */]: import_prisma3.SkillName.lightningBolt,\n    [3 /* vitality */]: import_prisma3.SkillName.vitality,\n    [4 /* immortality */]: import_prisma3.SkillName.immortality,\n    [5 /* reconnaissance */]: import_prisma3.SkillName.reconnaissance,\n    [6 /* weaponsMaster */]: import_prisma3.SkillName.weaponsMaster,\n    [7 /* martialArts */]: import_prisma3.SkillName.martialArts,\n    [8 /* sixthSense */]: import_prisma3.SkillName.sixthSense,\n    [9 /* hostility */]: import_prisma3.SkillName.hostility,\n    [10 /* fistsOfFury */]: import_prisma3.SkillName.fistsOfFury,\n    [11 /* shield */]: import_prisma3.SkillName.shield,\n    [12 /* armor */]: import_prisma3.SkillName.armor,\n    [13 /* toughenedSkin */]: import_prisma3.SkillName.toughenedSkin,\n    [14 /* untouchable */]: import_prisma3.SkillName.untouchable,\n    [15 /* sabotage */]: import_prisma3.SkillName.sabotage,\n    [16 /* shock */]: import_prisma3.SkillName.shock,\n    [17 /* bodybuilder */]: import_prisma3.SkillName.bodybuilder,\n    [18 /* relentless */]: import_prisma3.SkillName.relentless,\n    [19 /* survival */]: import_prisma3.SkillName.survival,\n    [20 /* leadSkeleton */]: import_prisma3.SkillName.leadSkeleton,\n    [21 /* balletShoes */]: import_prisma3.SkillName.balletShoes,\n    [22 /* determination */]: import_prisma3.SkillName.determination,\n    [23 /* firstStrike */]: import_prisma3.SkillName.firstStrike,\n    [24 /* resistant */]: import_prisma3.SkillName.resistant,\n    [25 /* counterAttack */]: import_prisma3.SkillName.counterAttack,\n    [26 /* ironHead */]: import_prisma3.SkillName.ironHead,\n    [27 /* thief */]: import_prisma3.SkillName.thief,\n    [28 /* fierceBrute */]: import_prisma3.SkillName.fierceBrute,\n    [29 /* tragicPotion */]: import_prisma3.SkillName.tragicPotion,\n    [30 /* net */]: import_prisma3.SkillName.net,\n    [31 /* bomb */]: import_prisma3.SkillName.bomb,\n    [32 /* hammer */]: import_prisma3.SkillName.hammer,\n    [33 /* cryOfTheDamned */]: import_prisma3.SkillName.cryOfTheDamned,\n    [34 /* hypnosis */]: import_prisma3.SkillName.hypnosis,\n    [35 /* flashFlood */]: import_prisma3.SkillName.flashFlood,\n    [36 /* tamer */]: import_prisma3.SkillName.tamer,\n    [37 /* regeneration */]: import_prisma3.SkillName.regeneration,\n    [38 /* chef */]: import_prisma3.SkillName.chef,\n    [39 /* spy */]: import_prisma3.SkillName.spy,\n    [40 /* saboteur */]: import_prisma3.SkillName.saboteur,\n    [41 /* backup */]: import_prisma3.SkillName.backup,\n    [42 /* hideaway */]: import_prisma3.SkillName.hideaway,\n    [43 /* monk */]: import_prisma3.SkillName.monk,\n    [44 /* vampirism */]: import_prisma3.SkillName.vampirism,\n    [45 /* chaining */]: import_prisma3.SkillName.chaining,\n    [46 /* haste */]: import_prisma3.SkillName.haste,\n    [47 /* treat */]: import_prisma3.SkillName.treat,\n    [48 /* repulse */]: import_prisma3.SkillName.repulse,\n    [49 /* fastMetabolism */]: import_prisma3.SkillName.fastMetabolism,\n    [50 /* mimic */]: import_prisma3.SkillName.mimic,\n    [51 /* stickyHands */]: import_prisma3.SkillName.stickyHands,\n    [52 /* deity */]: import_prisma3.SkillName.deity\n  };\n  var FightStat = {\n    REVERSAL: "reversal",\n    COUNTER: "counter",\n    EVASION: "evasion",\n    DEXTERITY: "dexterity",\n    BLOCK: "block",\n    ACCURACY: "accuracy",\n    DISARM: "disarm",\n    SABOTAGE: "sabotage",\n    COMBO: "combo",\n    DEFLECT: "deflect",\n    ARMOR: "armor",\n    DAMAGE: "damage",\n    CRITICAL_CHANCE: "criticalChance",\n    CRITICAL_DAMAGE: "criticalDamage",\n    HIT_SPEED: "hitSpeed",\n    INITIATIVE: "initiative",\n    STRENGTH: "strength",\n    AGILITY: "agility",\n    SPEED: "speed",\n    HP: "hp",\n    REGENERATION: "regeneration",\n    WEAPON_GRIP: "weaponGrip",\n    SIZE: "size"\n  };\n  var skills = {\n    [import_prisma3.SkillName.herculeanStrength]: {\n      name: "herculeanStrength",\n      odds: 60,\n      type: "booster"\n    },\n    [import_prisma3.SkillName.felineAgility]: {\n      name: "felineAgility",\n      odds: 60,\n      type: "booster"\n    },\n    [import_prisma3.SkillName.lightningBolt]: {\n      name: "lightningBolt",\n      odds: 60,\n      type: "booster"\n    },\n    [import_prisma3.SkillName.vitality]: {\n      name: "vitality",\n      odds: 60,\n      type: "booster"\n    },\n    [import_prisma3.SkillName.immortality]: {\n      name: "immortality",\n      odds: 0.14,\n      type: "booster"\n    },\n    [import_prisma3.SkillName.reconnaissance]: {\n      name: "reconnaissance",\n      odds: 1,\n      type: "booster"\n    },\n    [import_prisma3.SkillName.deity]: {\n      name: "deity",\n      odds: 2,\n      type: "booster"\n    },\n    [import_prisma3.SkillName.weaponsMaster]: {\n      name: "weaponsMaster",\n      odds: 10,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.martialArts]: {\n      name: "martialArts",\n      odds: 10,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.sixthSense]: {\n      name: "sixthSense",\n      odds: 20,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.hostility]: {\n      name: "hostility",\n      odds: 4,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.fistsOfFury]: {\n      name: "fistsOfFury",\n      odds: 10,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.shield]: {\n      name: "shield",\n      odds: 10,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.armor]: {\n      name: "armor",\n      odds: 4,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.toughenedSkin]: {\n      name: "toughenedSkin",\n      odds: 30,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.untouchable]: {\n      name: "untouchable",\n      odds: 1,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.sabotage]: {\n      name: "sabotage",\n      odds: 3,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.shock]: {\n      name: "shock",\n      odds: 4,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.bodybuilder]: {\n      name: "bodybuilder",\n      odds: 5,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.relentless]: {\n      name: "relentless",\n      odds: 4,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.survival]: {\n      name: "survival",\n      odds: 4,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.leadSkeleton]: {\n      name: "leadSkeleton",\n      odds: 4,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.balletShoes]: {\n      name: "balletShoes",\n      odds: 4,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.determination]: {\n      name: "determination",\n      odds: 4,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.firstStrike]: {\n      name: "firstStrike",\n      odds: 8,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.resistant]: {\n      name: "resistant",\n      odds: 3,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.counterAttack]: {\n      name: "counterAttack",\n      odds: 10,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.ironHead]: {\n      name: "ironHead",\n      odds: 4,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.thief]: {\n      name: "thief",\n      odds: 2.5,\n      type: "super",\n      toss: [8, 10, 12],\n      uses: [2, 3, 4]\n    },\n    [import_prisma3.SkillName.fierceBrute]: {\n      name: "fierceBrute",\n      odds: 20,\n      type: "super",\n      toss: [5, 8, 11],\n      uses: [1, 2, 3]\n    },\n    [import_prisma3.SkillName.tragicPotion]: {\n      name: "tragicPotion",\n      odds: 8,\n      type: "super",\n      toss: [10, 12, 14],\n      uses: [1, 2, 3]\n    },\n    [import_prisma3.SkillName.net]: {\n      name: "net",\n      odds: 16,\n      type: "super",\n      toss: [10, 12, 14],\n      uses: [1, 2, 3]\n    },\n    [import_prisma3.SkillName.bomb]: {\n      name: "bomb",\n      odds: 6,\n      type: "super",\n      toss: [2, 4, 6],\n      uses: [2, 3, 4]\n    },\n    [import_prisma3.SkillName.hammer]: {\n      name: "hammer",\n      odds: 1,\n      type: "super",\n      toss: [2, 4, 6],\n      uses: [1, 2, 3]\n    },\n    [import_prisma3.SkillName.cryOfTheDamned]: {\n      name: "cryOfTheDamned",\n      odds: 4,\n      type: "super",\n      toss: [8, 10, 12],\n      uses: [2, 3, 4]\n    },\n    [import_prisma3.SkillName.hypnosis]: {\n      name: "hypnosis",\n      odds: 0.5,\n      type: "super",\n      toss: [6, 8, 10],\n      uses: [1, 2, 3]\n    },\n    [import_prisma3.SkillName.flashFlood]: {\n      name: "flashFlood",\n      odds: 0.5,\n      type: "super",\n      toss: [2, 4, 6],\n      uses: [3, 4, 5]\n    },\n    [import_prisma3.SkillName.tamer]: {\n      name: "tamer",\n      odds: 4,\n      type: "super",\n      toss: [20, 22, 24],\n      uses: [4, 5, 6]\n    },\n    [import_prisma3.SkillName.regeneration]: {\n      name: "regeneration",\n      odds: 3,\n      type: "talent"\n    },\n    [import_prisma3.SkillName.chef]: {\n      name: "chef",\n      odds: 1,\n      type: "talent"\n    },\n    [import_prisma3.SkillName.spy]: {\n      name: "spy",\n      odds: 3,\n      type: "talent"\n    },\n    [import_prisma3.SkillName.saboteur]: {\n      name: "saboteur",\n      odds: 3,\n      type: "talent"\n    },\n    [import_prisma3.SkillName.backup]: {\n      name: "backup",\n      odds: 5,\n      type: "talent"\n    },\n    [import_prisma3.SkillName.hideaway]: {\n      name: "hideaway",\n      odds: 5,\n      type: "talent"\n    },\n    [import_prisma3.SkillName.monk]: {\n      name: "monk",\n      odds: 5,\n      type: "talent"\n    },\n    [import_prisma3.SkillName.vampirism]: {\n      name: "vampirism",\n      odds: 10,\n      type: "super",\n      toss: [5, 8, 11],\n      uses: [1, 2, 3]\n    },\n    [import_prisma3.SkillName.chaining]: {\n      name: "chaining",\n      odds: 5,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.haste]: {\n      name: "haste",\n      odds: 5,\n      type: "super",\n      toss: [3, 5, 7],\n      uses: [1, 2, 3]\n    },\n    [import_prisma3.SkillName.treat]: {\n      name: "treat",\n      odds: 20,\n      type: "super",\n      toss: [5, 8, 11],\n      uses: [4, 5, 6]\n    },\n    [import_prisma3.SkillName.repulse]: {\n      name: "repulse",\n      odds: 10,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.fastMetabolism]: {\n      name: "fastMetabolism",\n      odds: 5,\n      type: "passive"\n    },\n    [import_prisma3.SkillName.mimic]: {\n      name: "mimic",\n      odds: 5,\n      type: "super",\n      uses: [1, 2, 3]\n    },\n    [import_prisma3.SkillName.stickyHands]: {\n      name: "stickyHands",\n      odds: 5,\n      type: "passive"\n    }\n  };\n  var skillList = Object.values(skills);\n  var SKILLS_TOTAL_ODDS = skillList.reduce((acc, skill) => acc + skill.odds, 0);\n  var SkillModifiers = {\n    [import_prisma3.SkillName.herculeanStrength]: {\n      [FightStat.STRENGTH]: { flat: [3, 5, 7], percent: [0.5, 0.6, 0.7] }\n    },\n    [import_prisma3.SkillName.felineAgility]: {\n      [FightStat.AGILITY]: { flat: [3, 5, 7], percent: [0.5, 0.6, 0.7] }\n    },\n    [import_prisma3.SkillName.lightningBolt]: {\n      [FightStat.SPEED]: { flat: [3, 5, 7], percent: [0.5, 0.6, 0.7] }\n    },\n    [import_prisma3.SkillName.vitality]: {\n      [FightStat.HP]: { flat: [18, 30, 42], percent: [0.5, 0.6, 0.7] }\n    },\n    [import_prisma3.SkillName.immortality]: {\n      [FightStat.HP]: { percent: [2.5, 3, 3.5] },\n      [FightStat.STRENGTH]: { percent: [-0.25, -0.25, -0.25] },\n      [FightStat.AGILITY]: { percent: [-0.25, -0.25, -0.25] },\n      [FightStat.SPEED]: { percent: [-0.25, -0.25, -0.25] }\n    },\n    [import_prisma3.SkillName.reconnaissance]: {\n      [FightStat.INITIATIVE]: { flat: [-200, -200, -200] },\n      [FightStat.SPEED]: { flat: [5, 10, 15], percent: [1.5, 2, 2.5] },\n      [FightStat.CRITICAL_DAMAGE]: { percent: [0.5, 0.6, 0.7] }\n    },\n    [import_prisma3.SkillName.deity]: {\n      [FightStat.SIZE]: { percent: [0.5, 0.5, 0.5] },\n      [FightStat.HP]: { percent: [1, 1.25, 1.5] },\n      [FightStat.STRENGTH]: { percent: [1, 1.25, 1.5] },\n      [FightStat.REVERSAL]: { percent: [0.4, 0.5, 0.6] },\n      [FightStat.AGILITY]: { percent: [-1, -1, -1] },\n      [FightStat.SPEED]: { percent: [-1, -1, -1] },\n      [FightStat.DEXTERITY]: { percent: [-1, -1, -1] },\n      [FightStat.EVASION]: { percent: [-1, -1, -1] },\n      [FightStat.INITIATIVE]: { flat: [-200, -200, -200] }\n    },\n    [import_prisma3.SkillName.weaponsMaster]: {\n      [FightStat.DAMAGE]: { percent: [0.5, 0.75, 1], weaponType: WeaponType.SHARP }\n    },\n    [import_prisma3.SkillName.martialArts]: {\n      [FightStat.DAMAGE]: { percent: [1, 1.5, 2], weaponType: null }\n    },\n    [import_prisma3.SkillName.sixthSense]: {\n      [FightStat.COUNTER]: { percent: [0.1, 0.15, 0.2] }\n    },\n    [import_prisma3.SkillName.hostility]: {\n      [FightStat.REVERSAL]: { percent: [0.3, 0.35, 0.4] }\n    },\n    [import_prisma3.SkillName.fistsOfFury]: {\n      [FightStat.COMBO]: { percent: [0.2, 0.3, 0.4] }\n    },\n    [import_prisma3.SkillName.shield]: {\n      [FightStat.BLOCK]: { percent: [0.45, 0.5, 0.55] },\n      [FightStat.DAMAGE]: { percent: [-0.25, -0.25, -0.25] }\n    },\n    [import_prisma3.SkillName.armor]: {\n      [FightStat.ARMOR]: { percent: [0.25, 0.3, 0.35] },\n      [FightStat.SPEED]: { percent: [-0.15, -0.15, -0.15] }\n    },\n    [import_prisma3.SkillName.toughenedSkin]: {\n      [FightStat.ARMOR]: { percent: [0.1, 0.15, 0.2] }\n    },\n    [import_prisma3.SkillName.untouchable]: {\n      [FightStat.EVASION]: { percent: [0.3, 0.4, 0.5] }\n    },\n    [import_prisma3.SkillName.sabotage]: {\n      [FightStat.SABOTAGE]: { percent: [0.5, 0.75, 0.9] }\n    },\n    [import_prisma3.SkillName.shock]: {\n      [FightStat.DISARM]: { percent: [0.5, 0.6, 0.7] }\n    },\n    [import_prisma3.SkillName.bodybuilder]: {\n      [FightStat.HIT_SPEED]: { percent: [0.4, 0.5, 0.6], weaponType: WeaponType.HEAVY },\n      [FightStat.DEXTERITY]: { percent: [0.1, 0.15, 0.2], weaponType: WeaponType.HEAVY }\n    },\n    [import_prisma3.SkillName.relentless]: {\n      [FightStat.ACCURACY]: { percent: [0.3, 0.4, 0.5] }\n    },\n    [import_prisma3.SkillName.survival]: {\n      [FightStat.BLOCK]: { percent: [0.2, 0.3, 0.4], details: "atOneHp" },\n      [FightStat.EVASION]: { percent: [0.2, 0.3, 0.4], details: "atOneHp" }\n    },\n    [import_prisma3.SkillName.leadSkeleton]: {\n      [FightStat.ARMOR]: { percent: [0.15, 0.25, 0.35] },\n      [FightStat.DAMAGE]: {\n        percent: [-0.15, -0.2, -0.25],\n        weaponType: WeaponType.BLUNT,\n        opponent: true\n      },\n      [FightStat.EVASION]: { percent: [-0.15, -0.15, -0.15] }\n    },\n    [import_prisma3.SkillName.balletShoes]: {\n      [FightStat.EVASION]: { percent: [0.1, 0.15, 0.2] }\n    },\n    [import_prisma3.SkillName.determination]: {},\n    [import_prisma3.SkillName.firstStrike]: {\n      [FightStat.INITIATIVE]: { flat: [200, 300, 400] }\n    },\n    [import_prisma3.SkillName.resistant]: {},\n    [import_prisma3.SkillName.counterAttack]: {\n      [FightStat.BLOCK]: { percent: [0.1, 0.15, 0.2] },\n      [FightStat.REVERSAL]: { percent: [0.9, 0.95, 0.99], details: "afterBlock" }\n    },\n    [import_prisma3.SkillName.ironHead]: {},\n    [import_prisma3.SkillName.thief]: {},\n    [import_prisma3.SkillName.fierceBrute]: {\n      [FightStat.CRITICAL_CHANCE]: { percent: [0.1, 0.2, 0.3] }\n    },\n    [import_prisma3.SkillName.tragicPotion]: {},\n    [import_prisma3.SkillName.net]: {},\n    [import_prisma3.SkillName.bomb]: {},\n    [import_prisma3.SkillName.hammer]: {},\n    [import_prisma3.SkillName.cryOfTheDamned]: {},\n    [import_prisma3.SkillName.hypnosis]: {},\n    [import_prisma3.SkillName.flashFlood]: {},\n    [import_prisma3.SkillName.tamer]: {},\n    [import_prisma3.SkillName.regeneration]: {\n      [FightStat.ARMOR]: { percent: [0, 0.02, 0.05] }\n    },\n    [import_prisma3.SkillName.chef]: {},\n    [import_prisma3.SkillName.spy]: {},\n    [import_prisma3.SkillName.saboteur]: {},\n    [import_prisma3.SkillName.backup]: {},\n    [import_prisma3.SkillName.hideaway]: {\n      [FightStat.BLOCK]: { percent: [0.25, 0.3, 0.35], details: "againstThrows" }\n    },\n    [import_prisma3.SkillName.monk]: {\n      [FightStat.COUNTER]: { percent: [0.4, 0.45, 0.5] },\n      [FightStat.INITIATIVE]: { flat: [-200, -200, -200] },\n      [FightStat.HIT_SPEED]: { percent: [-1, -1, -1] }\n    },\n    [import_prisma3.SkillName.vampirism]: {},\n    [import_prisma3.SkillName.chaining]: {\n      [FightStat.COMBO]: { percent: [0, 0.1, 0.2] }\n    },\n    [import_prisma3.SkillName.haste]: {\n      [FightStat.CRITICAL_CHANCE]: { percent: [0.05, 0.1, 0.15] }\n    },\n    [import_prisma3.SkillName.treat]: {},\n    [import_prisma3.SkillName.repulse]: {\n      [FightStat.DEFLECT]: { percent: [0.3, 0.35, 0.4] },\n      [FightStat.CRITICAL_CHANCE]: { percent: [0.05, 0.1, 0.15] }\n    },\n    [import_prisma3.SkillName.fastMetabolism]: {\n      [FightStat.REGENERATION]: { percent: [0.01, 0.02, 0.03] },\n      [FightStat.HIT_SPEED]: { percent: [-0.5, -0.65, -0.8] },\n      [FightStat.CRITICAL_CHANCE]: { percent: [-0.05, -0.1, -0.15] }\n    },\n    [import_prisma3.SkillName.mimic]: {},\n    [import_prisma3.SkillName.stickyHands]: {\n      [FightStat.WEAPON_GRIP]: { percent: [0.5, 0.6, 0.7] }\n    }\n  };\n  var ExtraTieredSkillData = {\n    [import_prisma3.SkillName.determination]: [0.6, 0.7, 0.8],\n    [import_prisma3.SkillName.resistant]: [0.25, 0.2, 0.17],\n    [import_prisma3.SkillName.ironHead]: [0.4, 0.5, 0.6],\n    [import_prisma3.SkillName.chef]: [1.5, 2, 2.5],\n    [import_prisma3.SkillName.spy]: [0.2, 0.25, 0.3],\n    [import_prisma3.SkillName.saboteur]: [100, 150, 200],\n    [import_prisma3.SkillName.backup]: [2.8, 3.3, 3.8]\n  };\n  var SkillDamageModifiers = Object.entries(SkillModifiers).filter(([_, modifiers]) => modifiers[FightStat.DAMAGE]).map(([skill, modifiers]) => ({\n    skill,\n    ...modifiers[FightStat.DAMAGE]\n  }));\n\n  // vendor/labrute/core/src/constants.ts\n  var FIGHTS_PER_DAY = 6;\n  var PERKS_TOTAL_ODDS = WEAPONS_TOTAL_ODDS + PETS_TOTAL_ODDS + SKILLS_TOTAL_ODDS;\n  var NO_WEAPON_TOSS = 10;\n  var NO_SKILL_TOSS = 10;\n  var Animations = [\n    "arrive",\n    "attack",\n    "block",\n    "death",\n    "drink",\n    "eat",\n    "equip",\n    "evade",\n    "grab",\n    "grabbed",\n    "hit",\n    "hit-0",\n    "hit-1",\n    "hit-2",\n    "idle",\n    "launch",\n    "monk",\n    "prepare-throw",\n    "run",\n    "stolen",\n    "steal",\n    "strengthen",\n    "throw",\n    "train",\n    "train2",\n    "trapped",\n    "trash",\n    "win",\n    ...WeaponAnimations\n  ];\n  var FIGHTER_HEIGHT = {\n    brute: 80,\n    [import_prisma4.PetName.bear]: 100,\n    [import_prisma4.PetName.panther]: 60,\n    dog: 40\n  };\n  var FIGHTER_WIDTH = {\n    brute: 50,\n    [import_prisma4.PetName.bear]: 100,\n    [import_prisma4.PetName.panther]: 87,\n    dog: 58\n  };\n  var FIGHTER_HIT_ANCHOR = {\n    brute: { x: 5, y: 40 },\n    [import_prisma4.PetName.bear]: { x: 60, y: 100 },\n    [import_prisma4.PetName.panther]: { x: 45, y: 45 },\n    dog: { x: 30, y: 30 }\n  };\n  var BASE_FIGHTER_STATS = {\n    reversal: 0,\n    evasion: 0.1,\n    dexterity: 0.2,\n    block: -0.25,\n    accuracy: 0,\n    disarm: 0.05,\n    combo: 0,\n    deflect: 0,\n    tempo: 1.2,\n    criticalChance: 0.05,\n    criticalDamage: 1.5\n  };\n  var BARE_HANDS_DAMAGE = 5;\n  var DailyModifierOdds = [\n    { modifier: import_prisma4.FightModifier.noThrows, odds: 1 },\n    { modifier: import_prisma4.FightModifier.focusOpponent, odds: 1 },\n    { modifier: import_prisma4.FightModifier.alwaysUseSupers, odds: 1 },\n    { modifier: import_prisma4.FightModifier.drawEveryWeapon, odds: 1 },\n    { modifier: import_prisma4.FightModifier.doubleAgility, odds: 1 },\n    { modifier: import_prisma4.FightModifier.randomSkill, odds: 1 },\n    { modifier: import_prisma4.FightModifier.randomWeapon, odds: 1 },\n    { modifier: import_prisma4.FightModifier.bareHandsFirstHit, odds: 1 },\n    { modifier: import_prisma4.FightModifier.startWithWeapon, odds: 1 },\n    { modifier: import_prisma4.FightModifier.chaos, odds: 0 }\n  ];\n  var DailyModifierSpawnChance = 4 / 30;\n  var EventFightsPerDay = 10;\n  var DEFAULT_LANGUAGE = import_prisma4.Lang.en;\n  var CSRF_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1e3;\n\n  // vendor/labrute/core/src/Titles.ts\n  var BaseTitleRequirements = {\n    massive: [5e3, 1e4, 25e3, 5e4, 1e5],\n    [AchievementRarety.common]: [250, 500, 1e3, 2500, 5e3],\n    [AchievementRarety.uncommon]: [50, 100, 250, 500, 1e3],\n    [AchievementRarety.rare]: [10, 25, 50, 100, 250],\n    [AchievementRarety.epic]: [5, 10, 25, 50, 100],\n    [AchievementRarety.legendary]: [1, 5, 10, 25, 50]\n  };\n  var BruteUniqueTitleRequirements = [1, 2, 3, 4, 5];\n  var TitleRequirements = {\n    wins: BaseTitleRequirements[AchievementData.wins.rarety],\n    defeats: BaseTitleRequirements[AchievementData.defeats.rarety],\n    flawless: BaseTitleRequirements[AchievementData.flawless.rarety],\n    winWith1HP: BaseTitleRequirements[AchievementData.winWith1HP.rarety],\n    steal2Weapons: BaseTitleRequirements[AchievementData.steal2Weapons.rarety],\n    singleHitWin: BaseTitleRequirements[AchievementData.singleHitWin.rarety],\n    combo3: BaseTitleRequirements[AchievementData.combo3.rarety],\n    combo4: BaseTitleRequirements[AchievementData.combo4.rarety],\n    combo5: BaseTitleRequirements[AchievementData.combo5.rarety],\n    counter5: BaseTitleRequirements[AchievementData.counter5.rarety],\n    evade10: BaseTitleRequirements[AchievementData.evade10.rarety],\n    block25: BaseTitleRequirements[AchievementData.block25.rarety],\n    counter4b2b: BaseTitleRequirements[AchievementData.counter4b2b.rarety],\n    reversal4b2b: BaseTitleRequirements[AchievementData.reversal4b2b.rarety],\n    block4b2b: BaseTitleRequirements[AchievementData.block4b2b.rarety],\n    evade4b2b: BaseTitleRequirements[AchievementData.evade4b2b.rarety],\n    throw10b2b: BaseTitleRequirements[AchievementData.throw10b2b.rarety],\n    disarm4: BaseTitleRequirements[AchievementData.disarm4.rarety],\n    disarm8: BaseTitleRequirements[AchievementData.disarm8.rarety],\n    damage50once: BaseTitleRequirements[AchievementData.damage50once.rarety],\n    damage100once: BaseTitleRequirements[AchievementData.damage100once.rarety],\n    hit20times: BaseTitleRequirements[AchievementData.hit20times.rarety],\n    kill3pets: BaseTitleRequirements[AchievementData.kill3pets.rarety],\n    maxDamage: BaseTitleRequirements[AchievementData.maxDamage.rarety],\n    hpHealed: BaseTitleRequirements.massive,\n    use10skills: BaseTitleRequirements[AchievementData.use10skills.rarety],\n    saboteur: BaseTitleRequirements[AchievementData.saboteur.rarety],\n    dog: [3, 6, 9, 12, 15],\n    panther: BruteUniqueTitleRequirements,\n    bear: BruteUniqueTitleRequirements,\n    panther_bear: BruteUniqueTitleRequirements,\n    felAg_fistsOfF: BruteUniqueTitleRequirements,\n    felAg_fistsOfF_untouch_relentless: BruteUniqueTitleRequirements,\n    vita_armor_toughened: BruteUniqueTitleRequirements,\n    herculStr_hammer_fierceBrute: BruteUniqueTitleRequirements,\n    shock: BaseTitleRequirements[AchievementData.shock.rarety],\n    balletShoes_survival: BruteUniqueTitleRequirements,\n    cryOfTheDamned_hypnosis: BruteUniqueTitleRequirements,\n    shield_counterAttack: BruteUniqueTitleRequirements,\n    reconnaissance_monk: BruteUniqueTitleRequirements,\n    immortality: BruteUniqueTitleRequirements,\n    doubleBoost: BruteUniqueTitleRequirements,\n    tripleBoost: BruteUniqueTitleRequirements,\n    quadrupleBoost: BruteUniqueTitleRequirements,\n    regeneration_potion: BruteUniqueTitleRequirements,\n    bear_tamer: BruteUniqueTitleRequirements,\n    tripleDogs: BruteUniqueTitleRequirements,\n    fiveWeapons: BruteUniqueTitleRequirements,\n    tenWeapons: BruteUniqueTitleRequirements,\n    fifteenWeapons: BruteUniqueTitleRequirements,\n    twentyWeapons: BruteUniqueTitleRequirements,\n    twentyThreeWeapons: BruteUniqueTitleRequirements,\n    monk_sixthSense_whip: BruteUniqueTitleRequirements,\n    weaponsMaster_sharp_bodybuilder_heavy: BruteUniqueTitleRequirements,\n    hostility_counterWeapon: BruteUniqueTitleRequirements,\n    flashFlood_twelveWeapons: BruteUniqueTitleRequirements,\n    lightningBolt_firstStrike: BruteUniqueTitleRequirements,\n    herculeanStrength: BruteUniqueTitleRequirements,\n    felineAgility: BruteUniqueTitleRequirements,\n    lightningBolt: BruteUniqueTitleRequirements,\n    vitality: BruteUniqueTitleRequirements,\n    potion_chef: BruteUniqueTitleRequirements,\n    tamer_net: BruteUniqueTitleRequirements,\n    untouchable_balletShoes: BruteUniqueTitleRequirements,\n    survival_resistant: BruteUniqueTitleRequirements,\n    hideaway_spy: BruteUniqueTitleRequirements,\n    weaponsFast3: BruteUniqueTitleRequirements,\n    weaponsSharp3: BruteUniqueTitleRequirements,\n    weaponsHeavy3: BruteUniqueTitleRequirements,\n    weaponsLong3: BruteUniqueTitleRequirements,\n    weaponsThrown3: BruteUniqueTitleRequirements,\n    weaponsBlunt3: BruteUniqueTitleRequirements,\n    thor: BruteUniqueTitleRequirements,\n    deflector: BruteUniqueTitleRequirements,\n    allFastWeapons: BruteUniqueTitleRequirements,\n    allSharpWeapons: BruteUniqueTitleRequirements,\n    allHeavyWeapons: BruteUniqueTitleRequirements,\n    allLongWeapons: BruteUniqueTitleRequirements,\n    allThrownWeapons: BruteUniqueTitleRequirements,\n    allBluntWeapons: BruteUniqueTitleRequirements,\n    agility50: BruteUniqueTitleRequirements,\n    agility100: BruteUniqueTitleRequirements,\n    speed50: BruteUniqueTitleRequirements,\n    speed100: BruteUniqueTitleRequirements,\n    strength50: BruteUniqueTitleRequirements,\n    strength100: BruteUniqueTitleRequirements,\n    hp300: BruteUniqueTitleRequirements,\n    hp600: BruteUniqueTitleRequirements,\n    maxLevel: [50, 75, 100, 125, 150],\n    allAchievements: BruteUniqueTitleRequirements,\n    winTournamentAs20: BaseTitleRequirements[AchievementData.winTournamentAs20.rarety],\n    winTournamentAs15: BaseTitleRequirements[AchievementData.winTournamentAs15.rarety],\n    looseAgainst2: BaseTitleRequirements[AchievementData.looseAgainst2.rarety],\n    looseAgainst3: BaseTitleRequirements[AchievementData.looseAgainst3.rarety],\n    looseAgainst4: BaseTitleRequirements[AchievementData.looseAgainst4.rarety],\n    winAgainst2: BaseTitleRequirements[AchievementData.winAgainst2.rarety],\n    winAgainst3: BaseTitleRequirements[AchievementData.winAgainst3.rarety],\n    winAgainst4: BaseTitleRequirements[AchievementData.winAgainst4.rarety],\n    winAsLower: BaseTitleRequirements[AchievementData.winAsLower.rarety],\n    win: BaseTitleRequirements[AchievementData.win.rarety],\n    battleRoyaleWin: BruteUniqueTitleRequirements,\n    rankUp10: BaseTitleRequirements[AchievementData.rankUp10.rarety],\n    rankUp9: BaseTitleRequirements[AchievementData.rankUp9.rarety],\n    rankUp8: BaseTitleRequirements[AchievementData.rankUp8.rarety],\n    rankUp7: BaseTitleRequirements[AchievementData.rankUp7.rarety],\n    rankUp6: BaseTitleRequirements[AchievementData.rankUp6.rarety],\n    rankUp5: BaseTitleRequirements[AchievementData.rankUp5.rarety],\n    rankUp4: BaseTitleRequirements[AchievementData.rankUp4.rarety],\n    rankUp3: BaseTitleRequirements[AchievementData.rankUp3.rarety],\n    rankUp2: BaseTitleRequirements[AchievementData.rankUp2.rarety],\n    rankUp1: BaseTitleRequirements[AchievementData.rankUp1.rarety],\n    rankUp0: BaseTitleRequirements[AchievementData.rankUp0.rarety],\n    ascend: BaseTitleRequirements[AchievementData.ascend.rarety],\n    sacrifice: BaseTitleRequirements[AchievementData.sacrifice.rarety],\n    beta: BaseTitleRequirements[AchievementData.beta.rarety],\n    bug: BaseTitleRequirements[AchievementData.bug.rarety]\n  };\n\n  // vendor/labrute/core/src/types.ts\n  var import_prisma5 = __toESM(require_index_browser2(), 1);\n\n  // vendor/labrute/core/src/brute/getHP.ts\n  var getBruteHP = (brute) => Math.floor(\n    50 + brute.hpStat * brute.hpModifier + brute.level * 2\n  );\n\n  // vendor/labrute/core/src/brute/applySkillModifiers.ts\n  var applySkillModifiers = (brute, skillName, skillTier = 1, removePreviousTier = true) => {\n    Object.entries(SkillModifiers[skillName]).forEach(([unsafeStat, modifier]) => {\n      const stat = unsafeStat;\n      if (stat !== FightStat.HP && stat !== FightStat.STRENGTH && stat !== FightStat.AGILITY && stat !== FightStat.SPEED) {\n        return;\n      }\n      if (modifier.flat) {\n        if (skillTier > 1 && removePreviousTier) {\n          brute[`${stat}Stat`] -= modifier.flat[skillTier - 2] ?? 0;\n        }\n        brute[`${stat}Stat`] += modifier.flat[skillTier - 1] ?? 0;\n      }\n      if (modifier.percent) {\n        if (skillTier > 1 && removePreviousTier) {\n          brute[`${stat}Modifier`] -= modifier.percent[skillTier - 2] ?? 0;\n        }\n        brute[`${stat}Modifier`] += modifier.percent[skillTier - 1] ?? 0;\n      }\n      if (stat === FightStat.HP) {\n        brute[`${stat}Value`] = getBruteHP(brute);\n      } else {\n        brute[`${stat}Value`] = Math.floor(brute[`${stat}Stat`] * brute[`${stat}Modifier`]);\n      }\n    });\n  };\n\n  // vendor/labrute/core/src/brute/bosses.ts\n  var import_prisma6 = __toESM(require_index_browser2(), 1);\n  var bear = pets[import_prisma6.PetName.bear];\n  var panther = pets[import_prisma6.PetName.panther];\n  var dog1 = pets[import_prisma6.PetName.dog1];\n  var bosses = [\n    {\n      name: import_prisma6.BossName.GoldClaw,\n      base: import_prisma6.PetName.bear,\n      scale: 2,\n      initiative: -0.5,\n      strength: bear.strength[0] * 10,\n      agility: bear.agility[0],\n      speed: bear.speed[0],\n      hp: 1e5,\n      counter: bear.counter[0],\n      combo: bear.combo[0],\n      block: bear.block[0],\n      evasion: bear.evasion[0],\n      accuracy: 0.75,\n      disarm: bear.disarm[0],\n      damage: bear.damage[0],\n      reach: 3,\n      count: 1,\n      reward: 1,\n      odds: 10\n    },\n    {\n      name: import_prisma6.BossName.EmberFang,\n      base: import_prisma6.PetName.panther,\n      scale: 3,\n      initiative: -0.5,\n      strength: panther.strength[0] * 2,\n      agility: panther.agility[0],\n      speed: panther.speed[0] * 10,\n      hp: 5e4,\n      counter: panther.counter[0],\n      combo: panther.combo[0],\n      block: panther.block[0],\n      evasion: panther.evasion[0],\n      accuracy: 0.75,\n      disarm: panther.disarm[0],\n      damage: panther.damage[0],\n      reach: 3,\n      count: 1,\n      reward: 1,\n      odds: 10\n    },\n    {\n      name: import_prisma6.BossName.Cerberus,\n      base: import_prisma6.PetName.dog1,\n      scale: 2.15,\n      initiative: 1.3,\n      strength: dog1.strength[0] * 7.5,\n      agility: dog1.agility[0],\n      speed: dog1.speed[0] * 1.2,\n      hp: 1e4,\n      counter: dog1.counter[0],\n      combo: 0,\n      block: dog1.block[0],\n      evasion: -0.2,\n      accuracy: 0.75,\n      disarm: dog1.disarm[0],\n      damage: dog1.damage[0],\n      reach: 1,\n      count: 3,\n      reward: 0.2,\n      odds: 1\n    }\n  ];\n\n  // vendor/labrute/core/src/brute/calculatedBrute.ts\n  var import_prisma11 = __toESM(require_index_browser2(), 1);\n\n  // vendor/labrute/core/src/brute/getTempWeapon.ts\n  var import_prisma7 = __toESM(require_index_browser2(), 1);\n  var import_dayjs2 = __toESM(require_dayjs_min(), 1);\n\n  // vendor/labrute/core/src/utils/date.ts\n  var import_dayjs = __toESM(require_dayjs_min(), 1);\n  var import_utc = __toESM(require_utc(), 1);\n  import_dayjs.default.extend(import_utc.default);\n\n  // vendor/labrute/core/src/utils/random.ts\n  var seedCache = /* @__PURE__ */ new Map();\n  var MAX_CACHE_SIZE = 1e3;\n  var seedToRandom = (seed, cache = true) => {\n    if (cache) {\n      const cached = seedCache.get(seed);\n      if (cached !== void 0) {\n        return cached;\n      }\n    }\n    let hash = 0;\n    for (let i = 0; i < seed.length; i++) {\n      const char = seed.charCodeAt(i);\n      hash = (hash << 5) - hash + char;\n      hash &= hash;\n    }\n    const random = Math.abs(hash) / 2147483647;\n    if (cache) {\n      seedCache.set(seed, random);\n      if (seedCache.size > MAX_CACHE_SIZE) {\n        const firstKey = seedCache.keys().next().value;\n        if (firstKey) {\n          seedCache.delete(firstKey);\n        }\n      }\n    }\n    return random;\n  };\n  var randomBetween = (min, max, seed, cache = true) => {\n    if (min > max) return 0;\n    if (min === max) return min;\n    const random = seed ? seedToRandom(seed, cache) : Math.random();\n    return Math.floor(random * (max - min + 1) + min);\n  };\n  var randomItem = (items) => {\n    const size = items instanceof Map ? items.size : items.length;\n    if (size === 0) {\n      throw new Error("No items");\n    }\n    if (size === 1) {\n      const item2 = items instanceof Map ? items.values().next().value : items[0];\n      if (!item2) {\n        throw new Error("No item");\n      }\n      return item2;\n    }\n    const index = randomBetween(0, size - 1);\n    if (items instanceof Map) {\n      let i = 0;\n      for (const value of items.values()) {\n        if (i === index) {\n          return value;\n        }\n        i++;\n      }\n      throw new Error("No item");\n    }\n    const item = items[index];\n    if (!item) {\n      throw new Error("No item");\n    }\n    return item;\n  };\n\n  // vendor/labrute/core/src/utils/object.ts\n  var entries = (obj) => {\n    const keys2 = Object.keys(obj);\n    const result = [];\n    for (const key of keys2) {\n      const value = obj[key];\n      if (value !== void 0) {\n        result.push([key, value]);\n      }\n    }\n    return result;\n  };\n  var keys = (obj) => Object.keys(obj);\n\n  // vendor/labrute/core/src/utils/weightedRandom.ts\n  var weightedRandom = (items) => {\n    const firstItem = items[0];\n    if (!firstItem) {\n      throw new Error("No items");\n    }\n    const totalOdds = items.reduce((acc, item) => acc + item.odds, 0);\n    let i = 0;\n    const weights = [];\n    for (i = 0; i < items.length; i++) {\n      weights[i] = (items[i]?.odds || 0) / totalOdds + (weights[i - 1] || 0);\n    }\n    const random = Math.random() * (weights[weights.length - 1] || 0);\n    for (i = 0; i < weights.length; i++) {\n      if ((weights[i] || 0) > random) {\n        break;\n      }\n    }\n    return items[i] || firstItem;\n  };\n\n  // vendor/labrute/core/src/brute/getTempWeapon.ts\n  var getTempWeapon = (brute, modifiers) => {\n    if (!modifiers[import_prisma7.FightModifier.randomWeapon]) {\n      return null;\n    }\n    const weaponIndex = randomBetween(0, 200, `${brute.id}-randomWeapon-${import_dayjs2.default.utc().format("YYYY-MM-DD")}`);\n    const unownedWeapons = weaponList.filter((weapon) => !brute.weapons.includes(weapon.name));\n    if (unownedWeapons.length === 0) {\n      return null;\n    }\n    const tempWeapon = unownedWeapons[weaponIndex % unownedWeapons.length];\n    if (!tempWeapon) {\n      throw new Error("No temp weapon found");\n    }\n    return tempWeapon.name;\n  };\n\n  // vendor/labrute/core/src/brute/getTempSkill.ts\n  var import_prisma8 = __toESM(require_index_browser2(), 1);\n  var import_dayjs3 = __toESM(require_dayjs_min(), 1);\n  var unavailableTemporarySkills = [import_prisma8.SkillName.backup];\n  var getTempSkill = (brute, modifiers, useCache = true) => {\n    if (!modifiers[import_prisma8.FightModifier.randomSkill]) {\n      return null;\n    }\n    const skillIndex = randomBetween(0, 200, `${brute.id}-randomSkill-${import_dayjs3.default.utc().format("YYYY-MM-DD")}`, useCache);\n    const unownedSkills = skillList.filter((skill) => !brute.skills.includes(skill.name) && !unavailableTemporarySkills.includes(skill.name));\n    if (unownedSkills.length === 0) {\n      return null;\n    }\n    const tempSkill = unownedSkills[skillIndex % unownedSkills.length];\n    if (!tempSkill) {\n      throw new Error("No temp skill found");\n    }\n    return tempSkill.name;\n  };\n\n  // vendor/labrute/core/src/brute/scaledStat.ts\n  var import_prisma10 = __toESM(require_index_browser2(), 1);\n\n  // vendor/labrute/core/src/brute/chaos.ts\n  var import_prisma9 = __toESM(require_index_browser2(), 1);\n  var import_dayjs4 = __toESM(require_dayjs_min(), 1);\n  var CHAOS_SEEDS = /* @__PURE__ */ new Map();\n  var getSkillStatSeed = (skill, stat, type = "flat") => `skill:${skill}:${stat}:${type}`;\n  var getPetStatSeed = (pet, stat) => `pet:${pet.name}:${stat}`;\n  var getWeaponStatSeed = (weapon, stat) => `weapon:${weapon.name}:${stat}`;\n\n  // vendor/labrute/core/src/brute/scaledStat.ts\n  var scalingByPet = {\n    [import_prisma10.PetName.bear]: {\n      strength: 0.4,\n      agility: 0.1,\n      speed: 0.1,\n      hp: 0.4\n    },\n    [import_prisma10.PetName.panther]: {\n      strength: 0.25,\n      agility: 0.3,\n      speed: 0.3,\n      hp: 0.15\n    },\n    [import_prisma10.PetName.dog3]: {\n      strength: 0.1,\n      agility: 0.2,\n      speed: 0.4,\n      hp: 0.1\n    },\n    [import_prisma10.PetName.dog2]: {\n      strength: 0.1,\n      agility: 0.2,\n      speed: 0.4,\n      hp: 0.1\n    },\n    [import_prisma10.PetName.dog1]: {\n      strength: 0.1,\n      agility: 0.2,\n      speed: 0.4,\n      hp: 0.1\n    }\n  };\n  var CHAOS_SCALE = 3;\n  var getScaledStat = ({\n    chaos,\n    skill,\n    type = "flat",\n    pet,\n    weapon,\n    stat,\n    value,\n    precision = 0\n  }) => {\n    if (!chaos) {\n      return value;\n    }\n    if (value === 0) {\n      return 0;\n    }\n    let min = value < 0 ? value * CHAOS_SCALE : value / CHAOS_SCALE;\n    const max = value < 0 ? value / CHAOS_SCALE : value * CHAOS_SCALE;\n    if (stat === FightStat.DAMAGE) {\n      min = value;\n    }\n    let seed = "";\n    if (skill) {\n      seed = getSkillStatSeed(skill, stat, type);\n    } else if (pet) {\n      seed = getPetStatSeed(pet, stat);\n    } else if (weapon) {\n      seed = getWeaponStatSeed(weapon, stat);\n    } else {\n      throw new Error("Either skill, pet or weapon must be provided for scaled stat");\n    }\n    const randomNumber = min + (CHAOS_SEEDS.get(seed) ?? 0) * (max - min);\n    if (precision === 0) {\n      return Math.ceil(randomNumber);\n    }\n    return parseFloat(randomNumber.toFixed(precision));\n  };\n  var petStatToBruteStat = {\n    strength: "strengthValue",\n    agility: "agilityValue",\n    speed: "speedValue",\n    hp: "hpValue"\n  };\n  var getPetScaledStat = (chaos, brute, pet, stat, precision = 0) => {\n    if (stat === "strength" || stat === "agility" || stat === "speed" || stat === "hp") {\n      const base = pet[stat][pet.tier - 1] ?? 0;\n      const scaling = scalingByPet[pet.name][stat];\n      const bruteStat = brute[petStatToBruteStat[stat]];\n      const result = base + Math.ceil(scaling * bruteStat);\n      if (!chaos) {\n        return result;\n      }\n      return getScaledStat({\n        chaos,\n        pet,\n        stat,\n        value: result,\n        precision\n      });\n    }\n    if (!chaos) {\n      return pet[stat][pet.tier - 1] ?? 0;\n    }\n    return getScaledStat({\n      chaos,\n      pet,\n      stat,\n      value: pet[stat][pet.tier - 1] ?? 0,\n      precision\n    });\n  };\n  var getWeaponScaledStat = (chaos, weapon, stat, precision = 0) => {\n    if (!chaos) {\n      return weapon[stat][weapon.tier - 1] ?? 0;\n    }\n    return getScaledStat({\n      chaos,\n      weapon,\n      stat,\n      value: weapon[stat][weapon.tier - 1] ?? 0,\n      precision\n    });\n  };\n  var getSkillScaledStat = (chaos, skill, stat, type) => {\n    if (!skill) {\n      return 0;\n    }\n    const value = SkillModifiers[skill.name][stat]?.[type]?.[skill.tier - 1] ?? 0;\n    if (!chaos) {\n      return value;\n    }\n    return getScaledStat({\n      chaos,\n      skill: skill.name,\n      stat,\n      value\n    });\n  };\n\n  // vendor/labrute/core/src/brute/calculatedBrute.ts\n  var getTieredSkills = (brute, modifiers) => {\n    const tieredSkills = {};\n    for (const skill of brute.skills) {\n      tieredSkills[skill] = (tieredSkills[skill] ?? 0) + 1;\n    }\n    const randomSkill = getTempSkill(brute, modifiers);\n    if (randomSkill) {\n      tieredSkills[randomSkill] = (tieredSkills[randomSkill] ?? 0) + 1;\n    }\n    return tieredSkills;\n  };\n  var getTieredWeapons = (brute, modifiers) => {\n    const tieredWeapons = {};\n    for (const weapon of brute.weapons) {\n      tieredWeapons[weapon] = (tieredWeapons[weapon] ?? 0) + 1;\n    }\n    const randomWeapon = getTempWeapon(brute, modifiers);\n    if (randomWeapon) {\n      tieredWeapons[randomWeapon] = (tieredWeapons[randomWeapon] ?? 0) + 1;\n    }\n    return tieredWeapons;\n  };\n  var getTieredPets = (brute) => {\n    const tieredPets = {};\n    for (const pet of brute.pets) {\n      tieredPets[pet] = (tieredPets[pet] ?? 0) + 1;\n    }\n    return tieredPets;\n  };\n  var getCalculatedBrute = (brute, modifiers) => {\n    const calculatedBrute = {\n      ...brute,\n      weapons: {},\n      skills: {},\n      pets: {}\n    };\n    for (const weapon of brute.weapons) {\n      calculatedBrute.weapons[weapon] = (calculatedBrute.weapons[weapon] ?? 0) + 1;\n    }\n    const randomWeapon = getTempWeapon(brute, modifiers);\n    if (randomWeapon) {\n      calculatedBrute.weapons[randomWeapon] = (calculatedBrute.weapons[randomWeapon] ?? 0) + 1;\n      calculatedBrute.randomWeapon = randomWeapon;\n    }\n    for (const skill of brute.skills) {\n      calculatedBrute.skills[skill] = (calculatedBrute.skills[skill] ?? 0) + 1;\n    }\n    const randomSkill = getTempSkill(brute, modifiers);\n    if (randomSkill) {\n      calculatedBrute.skills[randomSkill] = (calculatedBrute.skills[randomSkill] ?? 0) + 1;\n      calculatedBrute.randomSkill = randomSkill;\n      applySkillModifiers(calculatedBrute, randomSkill);\n    }\n    for (const pet of brute.pets) {\n      calculatedBrute.pets[pet] = (calculatedBrute.pets[pet] ?? 0) + 1;\n    }\n    const skillsList = modifiers[import_prisma11.FightModifier.chaos] ? entries(calculatedBrute.skills) : [];\n    for (const stat of [\n      FightStat.HP,\n      FightStat.STRENGTH,\n      FightStat.AGILITY,\n      FightStat.SPEED\n    ]) {\n      if (modifiers[import_prisma11.FightModifier.chaos]) {\n        for (const [skillName, tier] of skillsList) {\n          const modifier = SkillModifiers[skillName][stat];\n          if (!modifier) {\n            continue;\n          }\n          if (modifier?.flat) {\n            calculatedBrute[`${stat}Stat`] -= modifier.flat[tier - 1] ?? 0;\n            calculatedBrute[`${stat}Stat`] += getScaledStat({\n              chaos: true,\n              skill: skillName,\n              type: "flat",\n              stat,\n              value: modifier.flat[tier - 1] ?? 0\n            });\n          }\n          if (modifier?.percent) {\n            calculatedBrute[`${stat}Modifier`] -= modifier.percent[tier - 1] ?? 0;\n            calculatedBrute[`${stat}Modifier`] += getScaledStat({\n              chaos: true,\n              skill: skillName,\n              type: "percent",\n              stat,\n              value: modifier.percent[tier - 1] ?? 0,\n              precision: 2\n            });\n          }\n        }\n        if (stat === FightStat.HP) {\n          calculatedBrute[`${stat}Value`] = getBruteHP(calculatedBrute);\n        } else {\n          calculatedBrute[`${stat}Value`] = Math.floor(calculatedBrute[`${stat}Stat`] * calculatedBrute[`${stat}Modifier`]);\n        }\n      }\n      if (stat === FightStat.AGILITY && modifiers[import_prisma11.FightModifier.doubleAgility]) {\n        calculatedBrute[`${stat}Value`] *= 2;\n      }\n    }\n    return calculatedBrute;\n  };\n  var getWeaponsList = (brute) => {\n    const weapons2 = [];\n    for (const [weaponName, tier] of entries(brute.weapons)) {\n      for (let i = 0; i < tier; i++) {\n        weapons2.push(weaponName);\n      }\n    }\n    return weapons2;\n  };\n  var getSkillsList = (brute) => {\n    const skills2 = [];\n    for (const [skillName, tier] of entries(brute.skills)) {\n      for (let i = 0; i < tier; i++) {\n        skills2.push(skillName);\n      }\n    }\n    return skills2;\n  };\n  var getPetsList = (brute) => {\n    const pets2 = [];\n    for (const [petName, tier] of entries(brute.pets)) {\n      for (let i = 0; i < tier; i++) {\n        pets2.push(petName);\n      }\n    }\n    return pets2;\n  };\n  var getBruteToSave = (brute) => {\n    const bruteToSave = {\n      ...brute,\n      weapons: getWeaponsList(brute),\n      skills: getSkillsList(brute),\n      pets: getPetsList(brute)\n    };\n    return bruteToSave;\n  };\n\n  // vendor/labrute/core/src/brute/createRandomBruteStats.ts\n  var import_prisma13 = __toESM(require_index_browser2(), 1);\n\n  // vendor/labrute/core/src/brute/getRandomBonus.ts\n  var import_prisma12 = __toESM(require_index_browser2(), 1);\n  var preventSomeBonuses = (brute, perkType, perkName) => {\n    let preventPerk = false;\n    if (perkType === "pet") {\n      const brutePets = getTieredPets(brute);\n      const tier = brutePets[perkName] ?? 0;\n      if (tier >= 3) {\n        preventPerk = true;\n        return preventPerk;\n      }\n      switch (perkName) {\n        case "dog1":\n          break;\n        case "dog2":\n          preventPerk = !brutePets[import_prisma12.PetName.dog1];\n          break;\n        case "dog3":\n          preventPerk = !brutePets[import_prisma12.PetName.dog1] || !brutePets[import_prisma12.PetName.dog2];\n          break;\n        case "panther": {\n          if (tier === 0) {\n            if (brutePets[import_prisma12.PetName.bear] && randomBetween(1, 1e3) <= 1) {\n              preventPerk = true;\n              break;\n            }\n          }\n          break;\n        }\n        case "bear": {\n          if (tier === 0) {\n            if (brutePets[import_prisma12.PetName.panther] && randomBetween(1, 1e3) <= 1) {\n              preventPerk = true;\n              break;\n            }\n          }\n          break;\n        }\n        default:\n          break;\n      }\n    } else if (perkType === "skill") {\n      const bruteSkills = getTieredSkills({ ...brute, id: "" }, {});\n      const selectedSkill = skills[perkName];\n      const tier = bruteSkills[perkName] ?? 0;\n      const hasMaxSkill = tier >= 3;\n      if (hasMaxSkill) {\n        preventPerk = true;\n      } else if (selectedSkill?.type === "booster") {\n        const boosters = skillList.filter((skill) => skill.type === "booster");\n        const gottenBoosters = keys(bruteSkills).filter(\n          (skill) => boosters.find((booster) => booster.name === skill)\n        );\n        if (tier === 0) {\n          switch (gottenBoosters.length) {\n            case 0:\n              preventPerk = false;\n              break;\n            case 1:\n              preventPerk = randomBetween(1, 100) < 95;\n              break;\n            case 2:\n              preventPerk = randomBetween(1, 100) < 98;\n              break;\n            case 3:\n              preventPerk = randomBetween(1, 1e3) < 999;\n              break;\n            case 4:\n              preventPerk = randomBetween(1, 1e3) < 999;\n              break;\n            case 5:\n              preventPerk = randomBetween(1, 1e3) < 999;\n              break;\n            default:\n              preventPerk = false;\n              break;\n          }\n        } else {\n          preventPerk = false;\n        }\n      } else {\n        preventPerk = false;\n      }\n    } else {\n      const bruteWeapons = getTieredWeapons({ ...brute, id: "" }, {});\n      const gottenLimitedWeapons = keys(bruteWeapons).filter(\n        (weapon) => limitedWeapons.includes(weapon)\n      );\n      if (limitedWeapons.find((w) => w === perkName) && gottenLimitedWeapons.length >= MAX_LIMITED_WEAPONS) {\n        preventPerk = true;\n      } else {\n        preventPerk = (bruteWeapons[perkName] ?? 0) >= 3;\n      }\n    }\n    return preventPerk;\n  };\n  var getRandomBonus = (brute, rerollUntilFound = false, disabledSkills = [], disabledWeapons = [], disabledPets = []) => {\n    const enabledSkills = skillList.filter((skill) => !disabledSkills.includes(skill.name));\n    const enabledWeapons = weaponList.filter((weapon) => !disabledWeapons.includes(weapon.name));\n    const enabledPets = petList.filter((pet) => !disabledPets.includes(pet.name));\n    const enabledPerksOdds = [\n      { name: "pet", odds: enabledPets.reduce((acc, pet) => acc + pet.odds, 0) },\n      { name: "skill", odds: enabledSkills.reduce((acc, skill) => acc + skill.odds, 0) },\n      { name: "weapon", odds: enabledWeapons.reduce((acc, weapon) => acc + weapon.odds, 0) }\n    ];\n    let perkName = null;\n    let perkType = null;\n    perkType = weightedRandom(enabledPerksOdds).name;\n    perkName = perkType === "pet" ? weightedRandom(petList).name : perkType === "skill" ? weightedRandom(skillList).name : weightedRandom(weaponList).name;\n    let found = !preventSomeBonuses(brute, perkType, perkName);\n    while (rerollUntilFound && !found) {\n      perkType = weightedRandom(enabledPerksOdds).name;\n      perkName = perkType === "pet" ? weightedRandom(petList).name : perkType === "skill" ? weightedRandom(skillList).name : weightedRandom(weaponList).name;\n      found = !preventSomeBonuses(brute, perkType, perkName);\n    }\n    return found ? {\n      type: perkType,\n      name: perkName\n    } : null;\n  };\n\n  // vendor/labrute/core/src/brute/getFightsLeft.ts\n  var import_dayjs5 = __toESM(require_dayjs_min(), 1);\n\n  // vendor/labrute/core/src/brute/getMaxFightsPerDay.ts\n  var import_prisma14 = __toESM(require_index_browser2(), 1);\n  var getMaxFightsPerDay = (brute) => {\n    const base = brute.eventId ? EventFightsPerDay : FIGHTS_PER_DAY;\n    return brute.skills[import_prisma14.SkillName.regeneration] ? base + 2 : base;\n  };\n\n  // vendor/labrute/core/src/brute/getFightsLeft.ts\n  var getFightsLeft = (brute) => import_dayjs5.default.utc(brute.lastFight).isSame(import_dayjs5.default.utc(), "day") ? brute.fightsLeft : getMaxFightsPerDay(brute);\n\n  // vendor/labrute/core/src/brute/getLevelUpChoices.ts\n  var import_prisma15 = __toESM(require_index_browser2(), 1);\n  var getLevelUpChoices = (brute) => {\n    let preventPerk = false;\n    let perkType = null;\n    let perkName = null;\n    let firstChoice = null;\n    const bruteStats = Object.values(import_prisma15.BruteStat);\n    let secondChoice = {\n      type: "stats",\n      stat1: bruteStats[randomBetween(0, bruteStats.length - 1)],\n      stat1Value: 2\n    };\n    if (secondChoice.stat1 === import_prisma15.BruteStat.hp) {\n      secondChoice.stat1Value = (secondChoice.stat1Value ?? 2) * 6;\n    }\n    if (brute.level >= 80 && randomBetween(0, brute.level) >= 80) {\n      preventPerk = true;\n    }\n    if (!preventPerk) {\n      const perk = getRandomBonus(brute);\n      if (perk) {\n        perkType = perk.type;\n        perkName = perk.name;\n      }\n      preventPerk = !perk;\n    }\n    if (preventPerk) {\n      const { [randomBetween(0, bruteStats.length - 1)]: firstStat } = bruteStats;\n      let { [randomBetween(0, bruteStats.length - 1)]: secondStat } = bruteStats;\n      while (secondStat === firstStat) {\n        secondStat = bruteStats[randomBetween(0, bruteStats.length - 1)];\n      }\n      const firstStatValue = firstStat === import_prisma15.BruteStat.hp ? 6 : 1;\n      const secondStatValue = secondStat === import_prisma15.BruteStat.hp ? 6 : 1;\n      firstChoice = secondChoice;\n      secondChoice = {\n        type: "stats",\n        stat1: firstStat,\n        stat1Value: firstStatValue,\n        stat2: secondStat,\n        stat2Value: secondStatValue\n      };\n    } else {\n      if (!perkType || !perkName) {\n        throw new Error("No perk type or name");\n      }\n      firstChoice = {\n        type: perkType,\n        skill: perkType === "skill" ? perkName : void 0,\n        pet: perkType === "pet" ? perkName : void 0,\n        weapon: perkType === "weapon" ? perkName : void 0\n      };\n    }\n    if (Math.random() < 0.5) {\n      [firstChoice, secondChoice] = [secondChoice, firstChoice];\n    }\n    return [firstChoice, secondChoice];\n  };\n\n  // vendor/labrute/server/src/utils/fight/getFighters.ts\n  var import_prisma16 = __toESM(require_index_browser2(), 1);\n  var handleSkills = (chaos, fighter) => {\n    Object.values(fighter.skills).forEach((skill) => {\n      for (const [unsafeStat, modifier] of Object.entries(SkillModifiers[skill.name])) {\n        const stat = unsafeStat;\n        if (modifier.details || typeof modifier.weaponType !== "undefined") continue;\n        if (stat === FightStat.DEXTERITY || stat === FightStat.DAMAGE || stat === FightStat.HP || stat === FightStat.STRENGTH || stat === FightStat.AGILITY || stat === FightStat.SPEED) continue;\n        if (modifier.flat) {\n          const flat = getScaledStat({\n            chaos,\n            skill: skill.name,\n            type: "flat",\n            stat,\n            value: modifier.flat[skill.tier - 1] ?? 0,\n            precision: 2\n          });\n          if (stat === FightStat.INITIATIVE) {\n            fighter.initiative -= flat / 100;\n          } else {\n            fighter[stat] += flat;\n          }\n        }\n        if (modifier.percent) {\n          fighter[stat] += getScaledStat({\n            chaos,\n            skill: skill.name,\n            type: "percent",\n            stat,\n            value: modifier.percent[skill.tier - 1] ?? 0,\n            precision: 2\n          });\n        }\n      }\n      if (ExtraTieredSkillData[skill.name]) {\n        switch (skill.name) {\n          case import_prisma16.SkillName.determination:\n          case import_prisma16.SkillName.resistant:\n          case import_prisma16.SkillName.ironHead:\n            fighter[skill.name] = ExtraTieredSkillData[skill.name]?.[skill.tier - 1] ?? 0;\n            break;\n          case import_prisma16.SkillName.saboteur:\n            break;\n          case import_prisma16.SkillName.chef:\n            break;\n          case import_prisma16.SkillName.spy:\n            break;\n          case import_prisma16.SkillName.backup:\n            break;\n          default:\n            throw new Error(`No extra handling defined for skill ${skill.name}`);\n        }\n      }\n      switch (skill.name) {\n        case import_prisma16.SkillName.shield:\n          fighter.shield = true;\n          break;\n        case import_prisma16.SkillName.bodybuilder:\n          fighter.bodybuilder = true;\n          break;\n        case import_prisma16.SkillName.survival:\n          fighter.survival = true;\n          break;\n        case import_prisma16.SkillName.balletShoes:\n          fighter.balletShoes = true;\n          break;\n        case import_prisma16.SkillName.fastMetabolism:\n          fighter.fastMetabolism = 0;\n          break;\n        case import_prisma16.SkillName.fierceBrute: {\n          skill.uses = skill.uses?.map(\n            (use) => use + Math.floor(fighter.strength / 30)\n          );\n          break;\n        }\n        default:\n      }\n    });\n  };\n  var getTempo = (speed) => 0.1 + 20 / Math.max(1, 10 + speed * 1.5) * 0.9;\n  var getFighters = ({\n    team1,\n    team2,\n    modifiers,\n    clanFight\n  }) => {\n    const chaos = modifiers[import_prisma16.FightModifier.chaos] === true;\n    let spawnedPets = 0;\n    const fighters = [];\n    let positiveIndex = 0;\n    [team1, team2].forEach((team, teamIndex) => {\n      const { brutes } = team;\n      for (const brute of brutes) {\n        const teamSide = teamIndex === 0 ? "L" : "R";\n        if (clanFight) {\n          for (const petName of keys(brute.pets)) {\n            const pet = pets[petName];\n            const petTier = brute.pets[petName] ?? 1;\n            brute.hpModifier += pet.hpMalus[petTier - 1] ?? 0;\n            brute.hpValue = getBruteHP(brute);\n          }\n        }\n        const tieredSkills = {};\n        for (const [skillName, tier] of entries(brute.skills)) {\n          tieredSkills[skillName] = {\n            ...structuredClone(skills[skillName]),\n            tier\n          };\n        }\n        const tieredWeapons = {};\n        for (const [weaponName, tier] of entries(brute.weapons)) {\n          tieredWeapons[weaponName] = {\n            ...structuredClone(weapons[weaponName]),\n            tier\n          };\n        }\n        positiveIndex++;\n        const fighter = {\n          id: brute.id,\n          eventId: brute.eventId ?? void 0,\n          index: positiveIndex,\n          team: teamSide,\n          name: brute.name,\n          // Add minimal visual data to still be able to display the fight if the brute was deleted\n          gender: brute.gender,\n          colors: brute.colors,\n          body: brute.body,\n          rank: brute.ranking,\n          level: brute.level,\n          pupilsCount: brute.pupilsCount,\n          type: "brute",\n          maxHp: brute.hpValue,\n          hp: brute.hpValue,\n          strength: brute.strengthValue,\n          agility: brute.agilityValue,\n          speed: brute.speedValue,\n          criticalChance: BASE_FIGHTER_STATS.criticalChance,\n          criticalDamage: BASE_FIGHTER_STATS.criticalDamage,\n          regeneration: 0,\n          initiative: (randomBetween(0, 10) - brute.speedValue) / 100,\n          hitSpeed: 0,\n          tempo: getTempo(brute.speedValue),\n          baseDamage: BARE_HANDS_DAMAGE,\n          counter: 0,\n          combo: 0,\n          deflect: 0,\n          reversal: 0,\n          block: 0,\n          accuracy: 0,\n          armor: 0,\n          disarm: 0,\n          weaponGrip: 0,\n          sabotage: 0,\n          evasion: 0,\n          reach: 0,\n          determination: 0,\n          resistant: 0,\n          ironHead: 0,\n          size: 1,\n          bodybuilder: false,\n          survival: false,\n          balletShoes: false,\n          retryAttack: false,\n          fastMetabolism: null,\n          skills: tieredSkills,\n          weapons: tieredWeapons,\n          shield: false,\n          activeSkills: [],\n          activeWeapon: null,\n          keepWeaponChance: 0,\n          poisonedBy: null,\n          trapped: false,\n          hitBy: {}\n        };\n        handleSkills(chaos, fighter);\n        fighters.push(fighter);\n        if (clanFight) {\n          continue;\n        }\n        for (const [petName, tier] of entries(brute.pets)) {\n          const pet = {\n            ...pets[petName],\n            tier\n          };\n          spawnedPets++;\n          fighters.push({\n            id: `${-spawnedPets}`,\n            index: -spawnedPets,\n            team: teamSide,\n            name: petName,\n            rank: 0,\n            level: 0,\n            type: "pet",\n            master: brute.id,\n            maxHp: getPetScaledStat(chaos, brute, pet, "hp"),\n            hp: getPetScaledStat(chaos, brute, pet, "hp"),\n            strength: getPetScaledStat(chaos, brute, pet, "strength"),\n            agility: getPetScaledStat(chaos, brute, pet, "agility"),\n            speed: getPetScaledStat(chaos, brute, pet, "speed"),\n            criticalChance: BASE_FIGHTER_STATS.criticalChance,\n            criticalDamage: BASE_FIGHTER_STATS.criticalDamage,\n            regeneration: 0,\n            initiative: getPetScaledStat(chaos, brute, pet, "initiative", 2) + randomBetween(0, 10) / 100,\n            hitSpeed: 0,\n            tempo: getTempo(getPetScaledStat(chaos, brute, pet, "speed")),\n            baseDamage: getPetScaledStat(chaos, brute, pet, "damage"),\n            counter: getPetScaledStat(chaos, brute, pet, "counter", 2),\n            combo: getPetScaledStat(chaos, brute, pet, "combo", 2),\n            deflect: 0,\n            reversal: getPetScaledStat(chaos, brute, pet, "counter", 2),\n            block: getPetScaledStat(chaos, brute, pet, "block", 2),\n            accuracy: getPetScaledStat(chaos, brute, pet, "accuracy", 2),\n            reach: 0,\n            armor: 0,\n            disarm: getPetScaledStat(chaos, brute, pet, "disarm", 2),\n            weaponGrip: 0,\n            sabotage: 0,\n            evasion: getPetScaledStat(chaos, brute, pet, "evasion", 2),\n            determination: 0,\n            resistant: 0,\n            ironHead: 0,\n            size: 1,\n            bodybuilder: false,\n            survival: false,\n            balletShoes: false,\n            retryAttack: false,\n            fastMetabolism: null,\n            skills: {},\n            weapons: {},\n            shield: false,\n            activeSkills: [],\n            activeWeapon: null,\n            keepWeaponChance: 0,\n            poisonedBy: null,\n            trapped: false,\n            hitBy: {}\n          });\n        }\n      }\n      for (const backup of team.backups) {\n        const backupMaster = team.brutes[0];\n        if (!backupMaster) {\n          throw new Error("Backup master not found");\n        }\n        const arrivesAt = randomBetween(1, 500) / 100;\n        const tieredSkills = {};\n        for (const [skillName, tier] of entries(backup.skills)) {\n          tieredSkills[skillName] = {\n            ...structuredClone(skills[skillName]),\n            tier\n          };\n        }\n        const tieredWeapons = {};\n        for (const [weaponName, tier] of entries(backup.weapons)) {\n          tieredWeapons[weaponName] = {\n            ...structuredClone(weapons[weaponName]),\n            tier\n          };\n        }\n        spawnedPets++;\n        const backupFighter = {\n          id: `${-spawnedPets}`,\n          index: -spawnedPets,\n          team: teamIndex === 0 ? "L" : "R",\n          name: backup.name,\n          // Add minimal visual data to still be able to display the fight if the brute was deleted\n          gender: backup.gender,\n          colors: backup.colors,\n          body: backup.body,\n          rank: backup.ranking,\n          level: backup.level,\n          type: "brute",\n          master: backupMaster.id,\n          arrivesAtInitiative: arrivesAt,\n          leavesAtInitiative: arrivesAt + (ExtraTieredSkillData[import_prisma16.SkillName.backup]?.[(backupMaster.skills[import_prisma16.SkillName.backup] ?? 0) - 1] ?? 0),\n          maxHp: backup.hpValue,\n          hp: backup.hpValue,\n          strength: backup.strengthValue,\n          agility: backup.agilityValue,\n          speed: backup.speedValue,\n          criticalChance: BASE_FIGHTER_STATS.criticalChance,\n          criticalDamage: BASE_FIGHTER_STATS.criticalDamage,\n          regeneration: 0,\n          initiative: arrivesAt,\n          hitSpeed: 0,\n          tempo: getTempo(backup.speedValue),\n          baseDamage: BARE_HANDS_DAMAGE,\n          counter: 0,\n          combo: 0,\n          deflect: 0,\n          reversal: 0,\n          block: 0,\n          accuracy: 0,\n          armor: 0,\n          disarm: 0,\n          weaponGrip: 0,\n          sabotage: 0,\n          evasion: 0,\n          reach: 0,\n          determination: 0,\n          resistant: 0,\n          ironHead: 0,\n          size: 1,\n          bodybuilder: false,\n          survival: false,\n          balletShoes: false,\n          retryAttack: false,\n          fastMetabolism: null,\n          skills: tieredSkills,\n          weapons: tieredWeapons,\n          shield: false,\n          activeSkills: [],\n          activeWeapon: null,\n          keepWeaponChance: 0,\n          poisonedBy: null,\n          trapped: false,\n          hitBy: {}\n        };\n        handleSkills(chaos, backupFighter);\n        backupFighter.initiative = arrivesAt;\n        fighters.push(backupFighter);\n      }\n      for (const boss of team.bosses) {\n        positiveIndex++;\n        spawnedPets++;\n        fighters.push({\n          id: `${-spawnedPets}`,\n          index: positiveIndex,\n          team: teamIndex === 0 ? "L" : "R",\n          name: boss.name,\n          rank: 0,\n          level: 0,\n          type: "boss",\n          maxHp: boss.hp,\n          hp: boss.startHP,\n          strength: boss.strength,\n          agility: boss.agility,\n          speed: boss.speed,\n          criticalChance: BASE_FIGHTER_STATS.criticalChance,\n          criticalDamage: BASE_FIGHTER_STATS.criticalDamage,\n          regeneration: 0,\n          initiative: boss.initiative + randomBetween(0, 10) / 100,\n          hitSpeed: 0,\n          tempo: getTempo(boss.speed),\n          baseDamage: boss.damage,\n          counter: boss.counter,\n          combo: boss.combo,\n          deflect: 0,\n          reversal: boss.counter,\n          block: boss.block,\n          accuracy: boss.accuracy,\n          reach: boss.reach,\n          armor: 0,\n          disarm: boss.disarm,\n          weaponGrip: 0,\n          sabotage: 0,\n          evasion: boss.evasion,\n          determination: 0,\n          resistant: 0,\n          ironHead: 0,\n          size: 1,\n          bodybuilder: false,\n          survival: false,\n          balletShoes: false,\n          retryAttack: false,\n          fastMetabolism: null,\n          skills: {},\n          weapons: {},\n          shield: false,\n          activeSkills: [],\n          activeWeapon: null,\n          keepWeaponChance: 0,\n          poisonedBy: null,\n          trapped: false,\n          hitBy: {}\n        });\n      }\n    });\n    return fighters;\n  };\n\n  // vendor/labrute/server/src/utils/fight/fightMethods.ts\n  var import_prisma19 = __toESM(require_index_browser2(), 1);\n\n  // vendor/labrute/server/src/utils/fight/getDamage.ts\n  var import_prisma18 = __toESM(require_index_browser2(), 1);\n\n  // vendor/labrute/server/src/utils/fight/getFighterStat.ts\n  var import_prisma17 = __toESM(require_index_browser2(), 1);\n  var getFighterStat = (chaos, fighter, stat, onlyStat) => {\n    if (stat === "dexterity") {\n      if (onlyStat === "fighter") return 0;\n      if (fighter.activeWeapon) {\n        const weaponStat = getWeaponScaledStat(chaos, fighter.activeWeapon, stat);\n        if (fighter.bodybuilder && fighter.activeWeapon.types.includes(WeaponType.HEAVY)) {\n          return weaponStat + getSkillScaledStat(chaos, fighter.skills[import_prisma17.SkillName.bodybuilder], FightStat.DEXTERITY, "percent");\n        }\n        return weaponStat;\n      }\n      return fighter.type === "brute" ? BASE_FIGHTER_STATS[stat] : 0;\n    }\n    if (stat === "tempo") {\n      if (fighter.activeWeapon) {\n        return getWeaponScaledStat(chaos, fighter.activeWeapon, stat);\n      }\n      return BASE_FIGHTER_STATS[stat];\n    }\n    let total = onlyStat === "weapon" ? 0 : fighter[stat];\n    if (onlyStat !== "fighter") {\n      if (fighter.activeWeapon) {\n        total += getWeaponScaledStat(chaos, fighter.activeWeapon, stat, 2);\n      } else if (stat !== FightStat.CRITICAL_DAMAGE && stat !== FightStat.CRITICAL_CHANCE) {\n        total += fighter.type === "brute" ? BASE_FIGHTER_STATS[stat] : fighter.type === "boss" ? fighter[stat] : 0;\n      }\n    }\n    return total;\n  };\n\n  // vendor/labrute/server/src/utils/fight/getDamage.ts\n  var getDamage = (chaos, fighter, opponent, thrown) => {\n    const base = thrown ? thrown.damage[thrown.tier - 1] ?? 0 : fighter.activeWeapon ? getWeaponScaledStat(chaos, fighter.activeWeapon, "damage") : fighter.baseDamage;\n    let skillsMultiplier = 1;\n    const piledriver = fighter.activeSkills.find((sk) => sk.name === import_prisma18.SkillName.hammer);\n    for (const modifier of SkillDamageModifiers) {\n      if (!fighter.skills[modifier.skill]) {\n        continue;\n      }\n      if (modifier.opponent) {\n        continue;\n      }\n      if (thrown) {\n        if (modifier.skill === import_prisma18.SkillName.weaponsMaster || modifier.skill === import_prisma18.SkillName.martialArts) {\n          continue;\n        }\n      }\n      if (piledriver && modifier.skill === import_prisma18.SkillName.martialArts) {\n        continue;\n      }\n      if (typeof modifier.weaponType !== "undefined") {\n        if (modifier.weaponType === null) {\n          if (!fighter.activeWeapon || fighter.activeWeapon.name === import_prisma18.WeaponName.mug) {\n            skillsMultiplier += getScaledStat({\n              chaos,\n              skill: modifier.skill,\n              type: "percent",\n              stat: FightStat.DAMAGE,\n              value: modifier.percent?.[(fighter.skills[modifier.skill]?.tier ?? 1) - 1] ?? 0,\n              precision: 2\n            });\n          }\n        } else if (fighter.activeWeapon?.types.includes(modifier.weaponType)) {\n          skillsMultiplier += getScaledStat({\n            chaos,\n            skill: modifier.skill,\n            type: "percent",\n            stat: FightStat.DAMAGE,\n            value: modifier.percent?.[(fighter.skills[modifier.skill]?.tier ?? 1) - 1] ?? 0,\n            precision: 2\n          });\n        }\n      } else {\n        skillsMultiplier += getScaledStat({\n          chaos,\n          skill: modifier.skill,\n          type: "percent",\n          stat: FightStat.DAMAGE,\n          value: modifier.percent?.[(fighter.skills[modifier.skill]?.tier ?? 1) - 1] ?? 0,\n          precision: 2\n        });\n      }\n    }\n    for (const modifier of SkillDamageModifiers) {\n      if (!opponent.skills[modifier.skill]) {\n        continue;\n      }\n      if (!modifier.opponent) {\n        continue;\n      }\n      if (thrown) {\n        if (modifier.skill === import_prisma18.SkillName.leadSkeleton) {\n          continue;\n        }\n      }\n      if (typeof modifier.weaponType !== "undefined") {\n        if (modifier.weaponType === null) {\n          if (!fighter.activeWeapon || fighter.activeWeapon.name === import_prisma18.WeaponName.mug) {\n            skillsMultiplier += getScaledStat({\n              chaos,\n              skill: modifier.skill,\n              type: "percent",\n              stat: FightStat.DAMAGE,\n              value: modifier.percent?.[(opponent.skills[modifier.skill]?.tier ?? 1) - 1] ?? 0,\n              precision: 2\n            });\n          }\n        } else if (fighter.activeWeapon?.types.includes(modifier.weaponType)) {\n          skillsMultiplier += getScaledStat({\n            chaos,\n            skill: modifier.skill,\n            type: "percent",\n            stat: FightStat.DAMAGE,\n            value: modifier.percent?.[(opponent.skills[modifier.skill]?.tier ?? 1) - 1] ?? 0,\n            precision: 2\n          });\n        }\n      } else {\n        skillsMultiplier += getScaledStat({\n          chaos,\n          skill: modifier.skill,\n          type: "percent",\n          stat: FightStat.DAMAGE,\n          value: modifier.percent?.[(opponent.skills[modifier.skill]?.tier ?? 1) - 1] ?? 0,\n          precision: 2\n        });\n      }\n    }\n    if (fighter.activeSkills.find((sk) => sk.name === "fierceBrute")) {\n      skillsMultiplier *= 2;\n    }\n    if (piledriver) {\n      skillsMultiplier *= 4;\n    }\n    let damage = 0;\n    if (thrown) {\n      damage = Math.floor(\n        (base + fighter.strength * 0.1 + fighter.agility * 0.15) * (1 + Math.random() * 0.5) * skillsMultiplier\n      );\n    } else if (piledriver) {\n      damage = Math.floor(\n        (10 + opponent.strength * 0.6) * (0.8 + Math.random() * 0.4) * skillsMultiplier\n      );\n    } else {\n      damage = Math.floor(\n        (base + fighter.strength * (0.2 + base * 0.05)) * (0.8 + Math.random() * 0.4) * skillsMultiplier\n      );\n    }\n    if (fighter.activeWeapon?.damaged) {\n      damage = Math.floor(damage * (1 - (fighter.activeWeapon.damaged ?? 0)));\n    }\n    const criticalChance = getFighterStat(chaos, fighter, FightStat.CRITICAL_CHANCE);\n    const criticalHit = !!criticalChance && Math.random() < criticalChance;\n    if (criticalHit) {\n      damage = Math.floor(damage * getFighterStat(chaos, fighter, FightStat.CRITICAL_DAMAGE));\n    }\n    if (!thrown) {\n      damage = Math.ceil(damage * (1 - Math.min(opponent.armor, 0.9)));\n    }\n    if (damage < 1) {\n      damage = 1;\n    }\n    return {\n      damage,\n      criticalHit\n    };\n  };\n\n  // vendor/labrute/server/src/utils/fight/fightMethods.ts\n  var skillTargetsFilter = (skill) => {\n    switch (skill) {\n      case import_prisma19.SkillName.tamer: {\n        return (f) => f.type === "pet" && f.hp <= 0 && !f.eaten;\n      }\n      default: {\n        return () => true;\n      }\n    }\n  };\n  var resetOthersStats = (stats, excludedFighter, stat) => {\n    for (const [bruteId, bruteStats] of Object.entries(stats)) {\n      if (bruteId !== excludedFighter) {\n        bruteStats[stat] = 0;\n      }\n    }\n  };\n  var updateStats = (stats, bruteId, stat, value, masterId, replace) => {\n    if (stat === "hits" && masterId) {\n      const master = stats[masterId];\n      if (master) {\n        master.otherTeamMembersHits = replace ? value : (master.otherTeamMembersHits || 0) + value;\n      }\n      return;\n    }\n    const current = stats[bruteId];\n    if (!current) return;\n    if (value === 0) {\n      current[stat] = 0;\n    } else {\n      current[stat] = replace ? value : (current[stat] || 0) + value;\n    }\n  };\n  var checkAchievements = (stats, achievements) => {\n    for (const [bruteId, stat] of Object.entries(stats)) {\n      const achievement = achievements[bruteId];\n      if (!achievement) {\n        continue;\n      }\n      if (stat.consecutiveCounters && stat.consecutiveCounters >= 4) {\n        updateAchievement(achievements, "counter4b2b", 1, bruteId);\n        stat.consecutiveCounters = 0;\n      }\n      if (stat.consecutiveReversals && stat.consecutiveReversals >= 4) {\n        updateAchievement(achievements, "reversal4b2b", 1, bruteId);\n        stat.consecutiveReversals = 0;\n      }\n      if (stat.consecutiveBlocks && stat.consecutiveBlocks >= 4) {\n        updateAchievement(achievements, "block4b2b", 1, bruteId);\n        stat.consecutiveBlocks = 0;\n      }\n      if (stat.consecutiveEvades && stat.consecutiveEvades >= 4) {\n        updateAchievement(achievements, "evade4b2b", 1, bruteId);\n        stat.consecutiveEvades = 0;\n      }\n      if (stat.consecutiveThrows && stat.consecutiveThrows >= 10) {\n        updateAchievement(achievements, "throw10b2b", 1, bruteId);\n        stat.consecutiveThrows = 0;\n      }\n    }\n  };\n  var getOpponents = ({\n    fightData,\n    fighter,\n    bruteAndBossOnly,\n    petOnly\n  }) => {\n    let opponents = [];\n    opponents = fightData.fighters.filter((f) => !f.arrivesAtInitiative && f.hp > 0 && f.team !== fighter.team);\n    if (bruteAndBossOnly) {\n      opponents = opponents.filter((f) => f.type === "brute" || f.type === "boss");\n    }\n    if (petOnly) {\n      opponents = opponents.filter((f) => f.type === "pet");\n    }\n    return opponents;\n  };\n  var getRandomOpponent = ({\n    fightData,\n    fighter,\n    bruteAndBossOnly,\n    petOnly,\n    nonTrappedOrStunnedOnly\n  }) => {\n    const focusOpponent = fightData.modifiers[import_prisma19.FightModifier.focusOpponent] || !!fighter.skills[import_prisma19.SkillName.hypnosis];\n    let opponents = getOpponents({\n      fightData,\n      fighter,\n      bruteAndBossOnly: bruteAndBossOnly || focusOpponent,\n      petOnly\n    });\n    opponents = opponents.filter((f) => f.type !== "pet" || !f.trapped);\n    if (nonTrappedOrStunnedOnly) {\n      opponents = opponents.filter((f) => !f.trapped && !f.stunned);\n    }\n    if (focusOpponent) {\n      opponents = opponents.filter((f) => !f.master);\n    }\n    if (!opponents.length) {\n      return null;\n    }\n    return randomItem(opponents);\n  };\n  var saboteur = (fightData, achievements) => {\n    fightData.fighters.filter((fighter) => fighter.type === "brute" && !fighter.master).forEach((fighter) => {\n      const saboteurSkill = fighter.skills[import_prisma19.SkillName.saboteur];\n      if (saboteurSkill) {\n        const opponent = getRandomOpponent({ fightData, fighter, bruteAndBossOnly: true });\n        const opponentWeapons = Object.values(opponent?.weapons ?? {});\n        if (opponent && opponentWeapons.length > 0) {\n          const sabotagedWeapon = randomItem(opponentWeapons);\n          const weapon = opponent.weapons[sabotagedWeapon.name];\n          if (!weapon) {\n            throw new Error("Weapon not found");\n          }\n          weapon.sabotaged = ExtraTieredSkillData[import_prisma19.SkillName.saboteur]?.[saboteurSkill.tier - 1] ?? 0;\n          updateAchievement(achievements, "saboteur", 1, fighter.id);\n        }\n      }\n    });\n  };\n  var orderFighters = (fightData) => {\n    fightData.fighters = fightData.fighters.sort((a, b) => {\n      if (a.hp <= 0) return 1;\n      if (b.hp <= 0) return -1;\n      if (a.stunned) return 1;\n      if (b.stunned) return -1;\n      if (a.initiative === b.initiative) {\n        return Math.random() > 0.5 ? 1 : -1;\n      }\n      return a.initiative - b.initiative;\n    });\n  };\n  var randomlyGetSuper = (fightData, fighter) => {\n    let supers = Object.values(fighter.skills).filter(\n      // Skill has uses left\n      (skill) => skill.uses?.[skill.tier - 1] && skill.name !== import_prisma19.SkillName.mimic\n    );\n    if (!supers.length) return null;\n    if (fighter.activeSkills.some((sk) => sk.name === import_prisma19.SkillName.fierceBrute)) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.fierceBrute && skill.name !== import_prisma19.SkillName.tamer && skill.name !== import_prisma19.SkillName.tragicPotion && skill.name !== import_prisma19.SkillName.treat);\n    }\n    if (fightData.fighters.filter(skillTargetsFilter(import_prisma19.SkillName.tamer)).length === 0 || fighter.hp > fighter.maxHp * 0.8) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.tamer);\n    }\n    if (getOpponents({ fightData, fighter, bruteAndBossOnly: true }).filter((f) => !f.trapped && f.activeWeapon).length === 0) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.thief);\n    }\n    if (fighter.hp > fighter.maxHp * (fighter.poisonedBy ? 0.3 : 0.5)) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.tragicPotion);\n    }\n    if (getOpponents({ fightData, fighter, petOnly: true }).filter((f) => !f.trapped).length === 0) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.cryOfTheDamned && skill.name !== import_prisma19.SkillName.hypnosis);\n    }\n    if (supers.some((s) => s.name === import_prisma19.SkillName.hypnosis)) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.bomb);\n    }\n    if (supers.some((s) => s.name === import_prisma19.SkillName.hypnosis) && !fighter.stunned) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.cryOfTheDamned);\n    }\n    if (keys(fighter.weapons).length + (fighter.activeWeapon ? 1 : 0) < 3) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.flashFlood);\n    }\n    if (!getOpponents({ fightData, fighter }).some((f) => !f.trapped && !f.stunned) || !fightData.modifiers[import_prisma19.FightModifier.focusOpponent] && getOpponents({ fightData, fighter, petOnly: true }).some((p) => !p.trapped) && supers.some((skill) => skill.name === import_prisma19.SkillName.hypnosis || skill.name === import_prisma19.SkillName.cryOfTheDamned || skill.name === import_prisma19.SkillName.bomb)) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.net);\n    }\n    if (fighter.hp > fighter.maxHp / 2 || getOpponents({ fightData, fighter, bruteAndBossOnly: true }).length === 0) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.vampirism);\n    }\n    if (fightData.fighters.filter((f) => f.type === "pet" && f.team === fighter.team && (f.hp < f.maxHp || f.trapped)).length === 0) {\n      supers = supers.filter((skill) => skill.name !== import_prisma19.SkillName.treat);\n    }\n    if (!supers.length) return null;\n    const NO_SUPER_TOSS = fightData.modifiers[import_prisma19.FightModifier.alwaysUseSupers] ? 0 : NO_SKILL_TOSS;\n    const randomSuper = randomBetween(\n      0,\n      supers.reduce((acc, skill) => acc + (skill.toss?.[skill.tier - 1] || 0), -1) + NO_SUPER_TOSS\n    );\n    let toss = 0;\n    for (let i = 0; i < supers.length; i += 1) {\n      toss += supers[i]?.toss?.[(supers[i]?.tier ?? 1) - 1] || 0;\n      if (randomSuper < toss) {\n        return supers[i];\n      }\n    }\n    return null;\n  };\n  var randomlyDrawWeapon = (fightData, fighterWeapons, forceDraw) => {\n    const weapons2 = entries(fighterWeapons);\n    if (!weapons2.length) return null;\n    let totalToss = -1;\n    for (const [, weapon] of weapons2) {\n      totalToss += weapon.toss[weapon.tier - 1] ?? 0;\n    }\n    if (!forceDraw && !fightData.modifiers[import_prisma19.FightModifier.drawEveryWeapon]) {\n      totalToss += NO_WEAPON_TOSS;\n    }\n    const randomWeapon = randomBetween(0, totalToss);\n    let toss = 0;\n    for (const [, weapon] of weapons2) {\n      toss += weapon.toss[weapon.tier - 1] ?? 0;\n      if (randomWeapon < toss) {\n        return weapon;\n      }\n    }\n    return null;\n  };\n  var healFighter = (stats, fighter, amount) => {\n    fighter.hp += amount;\n    updateStats(stats, fighter.id, "hpHealed", amount);\n  };\n  var increaseInitiative = (chaos, fighter, multiplicator = 1) => {\n    const random = randomBetween(0, 10);\n    let tempo = getFighterStat(chaos, fighter, "tempo") * fighter.tempo + random / 100;\n    if (fighter.activeWeapon && fighter.bodybuilder && fighter.activeWeapon.types.includes(WeaponType.HEAVY)) {\n      tempo *= 1 - getSkillScaledStat(chaos, fighter.skills[import_prisma19.SkillName.bodybuilder], FightStat.HIT_SPEED, "percent");\n    }\n    tempo *= 1 - fighter.hitSpeed;\n    fighter.initiative += tempo * multiplicator;\n  };\n  var fighterArrives = (fightData, fighter) => {\n    const arriveWithWeapon = fightData.modifiers[import_prisma19.FightModifier.startWithWeapon];\n    const step = {\n      a: 2 /* Arrive */,\n      f: fighter.index\n    };\n    if (arriveWithWeapon) {\n      const possibleWeapon = randomlyDrawWeapon(fightData, fighter.weapons, true);\n      if (possibleWeapon) {\n        fighter.activeWeapon = possibleWeapon;\n        fighter.keepWeaponChance = 0.5;\n        delete fighter.weapons[possibleWeapon.name];\n        step.w = WeaponByName[possibleWeapon.name];\n      }\n    }\n    if (!fighter.master && fighter.skills[import_prisma19.SkillName.chef]) {\n      getOpponents({ fightData, fighter }).forEach((opponent) => {\n        if (opponent.type !== "boss") {\n          opponent.poisonedBy = fighter.index;\n        }\n      });\n    }\n    fightData.steps.push(step);\n  };\n  var wakeUp = (fightData, fighter, initiativeMalus = false) => {\n    fighter.stunned = false;\n    if (fighter.initiative < fightData.initiative) {\n      fighter.initiative = fightData.initiative;\n    }\n    if (initiativeMalus) fighter.initiative -= 0.3;\n  };\n  var consumeActiveSkill = (fightData, fighter, skillName) => {\n    if (!fighter.activeSkills.some((sk) => sk.name === skillName)) return;\n    fightData.steps.push({\n      a: 29 /* SkillExpire */,\n      b: fighter.index,\n      s: SkillByName[skillName]\n    });\n    fighter.activeSkills = fighter.activeSkills.filter((sk) => sk.name !== skillName);\n  };\n  var registerHit = ({\n    fightData,\n    stats,\n    achievements,\n    fighter,\n    opponents,\n    damage,\n    criticalHit,\n    thrown,\n    source,\n    flashFloodWeapon\n  }) => {\n    const bombDamageRangeOnPets = {\n      [import_prisma19.PetName.dog1]: [90, 150],\n      [import_prisma19.PetName.dog2]: [90, 150],\n      [import_prisma19.PetName.dog3]: [90, 150],\n      [import_prisma19.PetName.panther]: [40, 80],\n      [import_prisma19.PetName.bear]: [15, 30]\n    };\n    const actualDamage = opponents.reduce((acc, opponent) => ({\n      ...acc,\n      [opponent.index]: source === "bomb" && opponent.type === "pet" ? Math.round(\n        randomBetween(\n          ...bombDamageRangeOnPets[opponent.name]\n        ) / 100 * opponent.maxHp\n      ) : damage\n    }), {});\n    opponents.forEach((opponent) => {\n      if (source !== "poison") {\n        fighter.hitBy[opponent.index] = 0;\n      }\n      if (opponent.stunned) {\n        wakeUp(fightData, opponent, !!source);\n      }\n      if (opponent.trapped) {\n        opponent.trapped = false;\n        opponent.initiative = fightData.initiative + 0.5;\n        if (opponent.type === "brute") {\n          opponent.stunned = true;\n        }\n      }\n      if (opponent.resistant) {\n        actualDamage[opponent.index] = Math.min(\n          damage,\n          Math.floor(opponent.maxHp * opponent.resistant)\n        );\n        if ((actualDamage[opponent.index] ?? damage) < damage) {\n          fightData.steps.push({\n            a: 7 /* Resist */,\n            b: opponent.index\n          });\n        }\n      }\n      if (opponent.immune) {\n        actualDamage[opponent.index] = 0;\n        opponent.immune = false;\n        fightData.steps.push({\n          a: 7 /* Resist */,\n          b: opponent.index\n        });\n      }\n      const opponentDamage = actualDamage[opponent.index] ?? damage;\n      if (opponent.leavesAtInitiative) {\n        opponent.leavesAtInitiative -= opponentDamage * 0.05;\n      } else {\n        opponent.hp -= opponentDamage;\n      }\n    });\n    if (source === "bomb") {\n      fightData.steps.push({\n        a: 13 /* Bomb */,\n        f: fighter.index,\n        t: opponents.map((opponent) => opponent.index),\n        d: opponents.reduce((acc, curr) => {\n          acc[curr.index] = actualDamage[curr.index] ?? damage;\n          return acc;\n        }, {})\n      });\n    } else if (source === "vampirism") {\n      const opponent = opponents[0];\n      if (!opponent) {\n        throw new Error("No opponent found");\n      }\n      const finalDamage = actualDamage[opponent.index] ?? damage;\n      const heal = Math.floor(\n        Math.min(finalDamage * (1 + Math.random()), fighter.maxHp - fighter.hp)\n      );\n      healFighter(stats, fighter, heal);\n      fightData.steps.push({\n        a: 31 /* Vampirism */,\n        b: fighter.index,\n        t: opponent.index,\n        d: actualDamage[opponent.index] ?? damage,\n        h: heal\n      });\n    } else if (source === "haste") {\n      const opponent = opponents[0];\n      if (!opponent) {\n        throw new Error("No opponent found");\n      }\n      const step = {\n        a: 32 /* Haste */,\n        b: fighter.index,\n        t: opponent.index,\n        d: actualDamage[opponent.index] ?? damage\n      };\n      if (criticalHit) {\n        step.c = 1;\n      }\n      fightData.steps.push(step);\n    } else {\n      opponents.forEach((opponent) => {\n        const stepType = source === "hammer" ? 11 /* Hammer */ : source === "flashFlood" ? 10 /* FlashFlood */ : source === "poison" ? 12 /* Poison */ : 9 /* Hit */;\n        const step = {\n          a: stepType,\n          f: fighter.index,\n          t: opponent.index,\n          w: source ? flashFloodWeapon ? WeaponByName[flashFloodWeapon.name] : void 0 : fighter.activeWeapon ? WeaponByName[fighter.activeWeapon.name] : void 0,\n          d: actualDamage[opponent.index] ?? damage\n        };\n        if (criticalHit) {\n          step.c = 1;\n        }\n        if (!thrown && !source && !flashFloodWeapon && opponent.type === "brute") {\n          opponent.hitBy[fighter.index] = (opponent.hitBy[fighter.index] || 0) + 1;\n          if (fighter.skills[import_prisma19.SkillName.chaining] && (opponent.hitBy[fighter.index] || 0) === 3) {\n            step.s = 1;\n            opponent.stunned = true;\n            opponent.hitBy[fighter.index] = 0;\n          }\n        }\n        fightData.steps.push(step);\n      });\n    }\n    const moreThan50 = Object.values(actualDamage).filter((d) => d >= 50).length;\n    if (moreThan50) {\n      updateAchievement(achievements, "damage50once", moreThan50, fighter.id);\n    }\n    const moreThan100 = Object.values(actualDamage).filter((d) => d >= 100).length;\n    if (moreThan100) {\n      updateAchievement(achievements, "damage100once", moreThan100, fighter.id);\n    }\n    const maxDamage = Math.max(...Object.values(actualDamage));\n    if ((stats[fighter.id]?.maxDamage ?? 0) < maxDamage) {\n      updateStats(stats, fighter.id, "maxDamage", maxDamage, void 0, true);\n    }\n    opponents.forEach((opponent) => {\n      if (opponent.survival && opponent.hp <= 1) {\n        opponent.survival = false;\n        opponent.hp = 1;\n        fightData.steps.push({\n          a: 8 /* Survive */,\n          b: opponent.index\n        });\n      }\n      if (opponent.fastMetabolism !== null && opponent.fastMetabolism > 0) {\n        opponent.fastMetabolism = null;\n      }\n      if (opponent.fastMetabolism === 0 && opponent.hp < opponent.maxHp * 0.5) {\n        opponent.fastMetabolism = 10;\n        opponent.initiative = fighter.initiative;\n      }\n    });\n    updateStats(stats, fighter.id, "hits", 1, fighter.master);\n  };\n  var dropShield = ({\n    fightData,\n    chaos,\n    fighter,\n    addStep = true\n  }) => {\n    fighter.shield = false;\n    fighter.block -= getSkillScaledStat(chaos, fighter.skills[import_prisma19.SkillName.shield], FightStat.BLOCK, "percent");\n    delete fighter.skills[import_prisma19.SkillName.shield];\n    if (addStep) {\n      fightData.steps.push({\n        a: 34 /* DropShield */,\n        b: fighter.index\n      });\n    }\n  };\n  var drawWeapon = (fightData, fighter, forceDraw = false) => {\n    const bareHandsFirstHit = fightData.modifiers[import_prisma19.FightModifier.bareHandsFirstHit];\n    if (bareHandsFirstHit && !fighter.bareHandHit) {\n      return false;\n    }\n    const drawEveryWeapon = fightData.modifiers[import_prisma19.FightModifier.drawEveryWeapon];\n    if (fighter.activeWeapon && !drawEveryWeapon && randomBetween(0, keys(fighter.weapons).length * 2) === 0) return false;\n    if (fighter.activeWeapon && fighter.weaponGrip) {\n      const preventedDraw = fighter.weaponGrip * 100 >= randomBetween(1, 100);\n      if (preventedDraw) {\n        return false;\n      }\n    }\n    const possibleWeapon = randomlyDrawWeapon(fightData, fighter.weapons, forceDraw);\n    if (fighter.activeWeapon && !drawEveryWeapon && Math.random() < fighter.keepWeaponChance) {\n      fighter.keepWeaponChance *= 0.5;\n      return false;\n    }\n    if (!possibleWeapon) return false;\n    if (fighter.activeWeapon) {\n      fightData.steps.push({\n        a: 3 /* Trash */,\n        b: fighter.index\n      });\n      fighter.activeWeapon = null;\n    }\n    fighter.activeWeapon = possibleWeapon;\n    fighter.keepWeaponChance = 0.5;\n    delete fighter.weapons[possibleWeapon.name];\n    fightData.steps.push({\n      a: 18 /* Equip */,\n      b: fighter.index,\n      w: WeaponByName[possibleWeapon.name]\n    });\n    if (possibleWeapon.sabotaged) {\n      fightData.steps.push({\n        a: 0 /* Saboteur */,\n        b: fighter.index,\n        w: WeaponByName[possibleWeapon.name]\n      });\n      fighter.activeWeapon = null;\n      fighter.initiative += (possibleWeapon.sabotaged ?? 100) / 100;\n      return true;\n    }\n    return false;\n  };\n  var mimicSkill = (fightData, fighter, skillToMimic) => {\n    const opponents = getOpponents({ fightData, fighter }).filter((f) => f.skills[import_prisma19.SkillName.mimic]);\n    if (!opponents.length) {\n      return;\n    }\n    const mimickingOpponents = [];\n    for (const opponent of opponents) {\n      if (opponent.trapped || opponent.stunned) {\n        continue;\n      }\n      switch (skillToMimic.name) {\n        case import_prisma19.SkillName.flashFlood: {\n          if (keys(opponent.weapons).length + (opponent.activeWeapon ? 1 : 0) < 3) {\n            continue;\n          }\n          break;\n        }\n        case import_prisma19.SkillName.tamer: {\n          if (fightData.fighters.filter((f) => f.type === "pet" && f.team === opponent.team).length === 0) {\n            continue;\n          }\n          break;\n        }\n        case import_prisma19.SkillName.treat: {\n          if (fightData.fighters.filter((f) => f.type === "pet" && f.team === opponent.team && f.hp > 0).length === 0) {\n            continue;\n          }\n          break;\n        }\n      }\n      mimickingOpponents.push(opponent);\n    }\n    if (!mimickingOpponents.length) {\n      return;\n    }\n    fightData.steps.push({\n      a: 36 /* Mimic */,\n      f: mimickingOpponents.map((o) => o.index),\n      s: SkillByName[skillToMimic.name],\n      t: skillToMimic.tier\n    });\n    for (const opponent of mimickingOpponents) {\n      const existingSkill = opponent.skills[skillToMimic.name];\n      if (existingSkill) {\n        existingSkill.uses = existingSkill.uses?.map((use) => use + 1) ?? [0, 0, 0];\n      } else {\n        opponent.skills[skillToMimic.name] = {\n          name: skillToMimic.name,\n          tier: skillToMimic.tier,\n          odds: skillToMimic.odds,\n          type: skillToMimic.type,\n          toss: skillToMimic.toss,\n          uses: [1, 1, 1]\n        };\n      }\n      const skill = opponent.skills[import_prisma19.SkillName.mimic];\n      if (skill && skill.uses) {\n        skill.uses[skill.tier - 1] = (skill.uses[skill.tier - 1] ?? 0) - 1;\n        if ((skill.uses[skill.tier - 1] ?? 0) <= 0) {\n          delete opponent.skills[import_prisma19.SkillName.mimic];\n        }\n      }\n    }\n  };\n  var activateSuper = (chaos, fightData, fighter, skill, stats, achievements) => {\n    if (!skill.uses?.[skill.tier - 1]) return false;\n    if (fighter.hypnotized) return false;\n    switch (skill.name) {\n      // Steal opponent\'s weapon if he has one\n      case import_prisma19.SkillName.thief: {\n        const opponents = getOpponents({ fightData, fighter, bruteAndBossOnly: true }).filter((f) => !f.trapped && f.activeWeapon);\n        if (!opponents.length) {\n          return false;\n        }\n        const opponent = randomItem(opponents);\n        if (!opponent) {\n          return false;\n        }\n        if (!opponent.activeWeapon) {\n          throw new Error("No weapon to steal");\n        }\n        if (fighter.activeWeapon?.name === opponent.activeWeapon.name || fighter.weapons[opponent.activeWeapon.name]) {\n          return false;\n        }\n        if (fighter.activeWeapon && randomBetween(1, 5) !== 1) {\n          return false;\n        }\n        if (fighter.activeWeapon) {\n          fightData.steps.push({\n            a: 3 /* Trash */,\n            b: fighter.index\n          });\n          fighter.activeWeapon = null;\n        }\n        fightData.steps.push({\n          a: 4 /* Steal */,\n          b: fighter.index,\n          w: WeaponByName[opponent.activeWeapon.name],\n          t: opponent.index\n        });\n        fighter.activeWeapon = opponent.activeWeapon;\n        fighter.keepWeaponChance = 1;\n        opponent.activeWeapon = null;\n        if (opponent.stunned) wakeUp(fightData, opponent, true);\n        fighter.initiative -= 0.01;\n        updateStats(stats, fighter.id, "weaponsStolen", 1);\n        break;\n      }\n      case import_prisma19.SkillName.fierceBrute: {\n        fighter.activeSkills.push(skill);\n        fightData.steps.push({\n          a: 28 /* SkillActivate */,\n          b: fighter.index,\n          s: SkillByName[skill.name]\n        });\n        fighter.initiative -= 0.01;\n        break;\n      }\n      case import_prisma19.SkillName.tragicPotion: {\n        let hpHealed = Math.floor(fighter.maxHp * (0.25 + Math.random() * 0.25));\n        let poisonHeal = false;\n        hpHealed = Math.min(hpHealed, fighter.maxHp - fighter.hp);\n        healFighter(stats, fighter, hpHealed);\n        if (fighter.poisonedBy) {\n          fighter.poisonedBy = null;\n          poisonHeal = true;\n        }\n        fighter.initiative += 0.3;\n        fightData.steps.push({\n          a: 6 /* Heal */,\n          b: fighter.index,\n          h: hpHealed,\n          c: poisonHeal ? 1 : 0\n        });\n        break;\n      }\n      case import_prisma19.SkillName.net: {\n        let opponent = getRandomOpponent({\n          fightData,\n          fighter,\n          petOnly: true,\n          nonTrappedOrStunnedOnly: true\n        });\n        if (!opponent) {\n          opponent = getRandomOpponent({\n            fightData,\n            fighter,\n            bruteAndBossOnly: true,\n            nonTrappedOrStunnedOnly: true\n          });\n          if (!opponent) {\n            return false;\n          }\n        }\n        opponent.trapped = true;\n        opponent.initiative += 1e3;\n        fighter.initiative += 0.2 * fighter.tempo;\n        fightData.steps.push({\n          a: 5 /* Trap */,\n          b: fighter.index,\n          t: opponent.index\n        });\n        break;\n      }\n      case import_prisma19.SkillName.bomb: {\n        const opponents = getOpponents({ fightData, fighter });\n        const damage = 15 + randomBetween(0, 10);\n        registerHit({\n          fightData,\n          stats,\n          achievements,\n          fighter,\n          opponents,\n          damage,\n          thrown: true,\n          source: "bomb"\n        });\n        fighter.initiative += 0.5 * fighter.tempo;\n        break;\n      }\n      case import_prisma19.SkillName.hammer: {\n        if (fighter.activeWeapon) {\n          if (randomBetween(1, 5) === 1) {\n            fightData.steps.push({\n              a: 3 /* Trash */,\n              b: fighter.index\n            });\n            fighter.activeWeapon = null;\n          } else {\n            return false;\n          }\n        }\n        if (fighter.shield) {\n          dropShield({ fightData, chaos, fighter });\n        }\n        const opponent = getRandomOpponent({ fightData, fighter, bruteAndBossOnly: true });\n        if (!opponent) {\n          return false;\n        }\n        fighter.activeSkills.push(skill);\n        const { damage, criticalHit } = getDamage(chaos, fighter, opponent);\n        fightData.steps.push({\n          a: 28 /* SkillActivate */,\n          b: fighter.index,\n          s: SkillByName[skill.name]\n        });\n        fightData.steps.push({\n          a: 15 /* Move */,\n          f: fighter.index,\n          t: opponent.index,\n          s: 1\n        });\n        registerHit({\n          fightData,\n          stats,\n          achievements,\n          fighter,\n          opponents: [opponent],\n          damage,\n          source: "hammer",\n          criticalHit\n        });\n        consumeActiveSkill(fightData, fighter, import_prisma19.SkillName.fierceBrute);\n        if (opponent.shield) {\n          dropShield({ fightData, chaos, fighter: opponent });\n          updateStats(stats, fighter.id, "disarms", 1);\n        }\n        if (opponent.activeWeapon) {\n          fightData.steps.push({\n            a: 23 /* Disarm */,\n            f: fighter.index,\n            t: opponent.index,\n            w: WeaponByName[opponent.activeWeapon.name]\n          });\n          opponent.activeWeapon = null;\n          updateStats(stats, fighter.id, "disarms", 1);\n        }\n        fightData.steps.push({\n          a: 29 /* SkillExpire */,\n          b: fighter.index,\n          s: SkillByName[skill.name]\n        });\n        fightData.steps.push({\n          a: 17 /* MoveBack */,\n          f: fighter.index\n        });\n        fighter.initiative += 1 * fighter.tempo;\n        fighter.activeSkills = fighter.activeSkills.filter((s) => s.name !== skill.name);\n        break;\n      }\n      case import_prisma19.SkillName.cryOfTheDamned: {\n        const opponentPets = getOpponents({ fightData, fighter, petOnly: true }).filter((f) => !f.trapped);\n        const fearSteps = [];\n        const unafraidPetIndexes = [];\n        for (const pet of opponentPets) {\n          if (randomBetween(0, 1) === 0) {\n            fearSteps.push({\n              a: 1 /* Leave */,\n              f: pet.index\n            });\n            fightData.fighters = fightData.fighters.filter((f) => f.index !== pet.index);\n          } else {\n            pet.initiative = fighter.initiative - 0.01;\n            unafraidPetIndexes.push(pet.index);\n          }\n        }\n        getOpponents({ fightData, fighter, bruteAndBossOnly: true }).forEach((opponent) => {\n          opponent.initiative += 0.15;\n        });\n        fightData.steps = fightData.steps.concat(fearSteps);\n        const cryStep = {\n          a: 28 /* SkillActivate */,\n          b: fighter.index,\n          s: SkillByName[skill.name]\n        };\n        if (unafraidPetIndexes.length) {\n          cryStep.p = unafraidPetIndexes;\n        }\n        fightData.steps.push(cryStep);\n        break;\n      }\n      case import_prisma19.SkillName.hypnosis: {\n        const opponentPets = getOpponents({ fightData, fighter, petOnly: true }).filter((f) => !f.trapped);\n        const hypnotisedPets = [];\n        for (const pet of opponentPets) {\n          if (Math.random() > 0.9) continue;\n          hypnotisedPets.push(pet.index);\n          pet.master = fighter.id;\n          pet.team = fighter.team;\n          pet.initiative = fighter.initiative - 0.01;\n        }\n        const opponents = getOpponents({ fightData, fighter, bruteAndBossOnly: true });\n        opponents.forEach((opponent) => {\n          opponent.hypnotized = true;\n        });\n        fightData.steps.push({\n          a: 14 /* Hypnotise */,\n          b: fighter.index,\n          t: opponents.map((opponent) => opponent.index),\n          p: hypnotisedPets\n        });\n        break;\n      }\n      case import_prisma19.SkillName.flashFlood: {\n        const opponent = getRandomOpponent({ fightData, fighter, bruteAndBossOnly: true });\n        if (!opponent) {\n          return false;\n        }\n        let throwShield = false;\n        if (fighter.shield && (skill.uses[skill.tier - 1] === 1 || keys(fighter.weapons).length < 6)) {\n          throwShield = true;\n          dropShield({ fightData, chaos, fighter, addStep: false });\n        }\n        const shuffledWeapons = [...entries(fighter.weapons)].sort(() => Math.random() - 0.5);\n        const weaponsToThrow = shuffledWeapons.slice(0, fighter.activeWeapon ? 2 : 3);\n        for (const [, w] of weaponsToThrow) {\n          delete fighter.weapons[w.name];\n        }\n        if (fighter.activeWeapon) {\n          weaponsToThrow.unshift([fighter.activeWeapon.name, fighter.activeWeapon]);\n          fighter.activeWeapon = null;\n        }\n        fightData.steps.push({\n          a: 28 /* SkillActivate */,\n          b: fighter.index,\n          s: SkillByName[skill.name]\n        });\n        const damages = [];\n        for (const [, weapon] of weaponsToThrow) {\n          const damage = Math.floor(getDamage(chaos, fighter, opponent, weapon).damage * 1.5);\n          damages.push(damage);\n          registerHit({\n            fightData,\n            stats,\n            achievements,\n            fighter,\n            opponents: [opponent],\n            damage,\n            thrown: true,\n            source: "flashFlood",\n            flashFloodWeapon: weapon\n          });\n        }\n        if (throwShield) {\n          if (opponent.type === "brute") opponent.stunned = true;\n          fightData.steps.push({\n            a: 10 /* FlashFlood */,\n            f: fighter.index,\n            t: opponent.index,\n            d: 0,\n            s: 1\n          });\n        }\n        consumeActiveSkill(fightData, fighter, import_prisma19.SkillName.fierceBrute);\n        fightData.steps.push({\n          a: 29 /* SkillExpire */,\n          b: fighter.index,\n          s: SkillByName[skill.name]\n        });\n        fighter.initiative += 2 * fighter.tempo;\n        break;\n      }\n      case import_prisma19.SkillName.tamer: {\n        const deadPets = fightData.fighters.filter(skillTargetsFilter(import_prisma19.SkillName.tamer));\n        if (deadPets.length === 0) return false;\n        const pet = randomItem(deadPets);\n        let healPercentage = 0;\n        switch (pet.name) {\n          case "dog1":\n          case "dog2":\n          case "dog3":\n            healPercentage = 0.2;\n            break;\n          case "panther":\n            healPercentage = 0.3;\n            break;\n          case "bear":\n            healPercentage = 0.5;\n            break;\n          default:\n            return false;\n        }\n        const heal = Math.min(\n          fighter.maxHp - fighter.hp,\n          Math.floor(fighter.maxHp * healPercentage)\n        );\n        healFighter(stats, fighter, heal);\n        fighter.initiative += 0.15;\n        pet.eaten = true;\n        fightData.steps.push({\n          a: 15 /* Move */,\n          f: fighter.index,\n          t: pet.index,\n          s: 1\n        });\n        fightData.steps.push({\n          a: 16 /* Eat */,\n          b: fighter.index,\n          t: pet.index,\n          h: heal\n        });\n        fightData.steps.push({\n          a: 17 /* MoveBack */,\n          f: fighter.index\n        });\n        break;\n      }\n      case import_prisma19.SkillName.vampirism: {\n        const opponent = getRandomOpponent({ fightData, fighter, bruteAndBossOnly: true });\n        if (!opponent) {\n          return false;\n        }\n        let damage = Math.floor((fighter.maxHp - fighter.hp) * 0.25);\n        if (fighter.activeSkills.some((sk) => sk.name === import_prisma19.SkillName.fierceBrute)) damage *= 2;\n        registerHit({\n          fightData,\n          stats,\n          achievements,\n          fighter,\n          opponents: [opponent],\n          damage,\n          source: "vampirism"\n        });\n        consumeActiveSkill(fightData, fighter, import_prisma19.SkillName.fierceBrute);\n        fighter.initiative += 0.3 + fighter.tempo;\n        break;\n      }\n      case import_prisma19.SkillName.haste: {\n        const opponent = getRandomOpponent({ fightData, fighter });\n        if (!opponent) {\n          return false;\n        }\n        if (!fighter.activeWeapon) drawWeapon(fightData, fighter, true);\n        const { damage: initialDamage, criticalHit } = getDamage(chaos, fighter, opponent);\n        const damage = initialDamage + fighter.speed;\n        registerHit({\n          fightData,\n          stats,\n          achievements,\n          fighter,\n          opponents: [opponent],\n          damage,\n          source: "haste",\n          criticalHit\n        });\n        consumeActiveSkill(fightData, fighter, import_prisma19.SkillName.fierceBrute);\n        fighter.initiative += 0.3 + fighter.tempo;\n        break;\n      }\n      case import_prisma19.SkillName.treat: {\n        const pets2 = fightData.fighters.filter((f) => f.type === "pet" && f.team === fighter.team && f.hp > 0);\n        const pet = pets2.find((p) => p.hp < p.maxHp || p.trapped);\n        if (!pet) {\n          return false;\n        }\n        const heal = Math.min(\n          Math.floor(pet.maxHp * 0.5),\n          pet.maxHp - pet.hp\n        );\n        pet.hp += heal;\n        let poisonHeal = false;\n        if (pet.poisonedBy) {\n          pet.poisonedBy = null;\n          poisonHeal = true;\n        }\n        if (pet.trapped) {\n          pet.trapped = false;\n        }\n        pet.initiative = fighter.initiative - 0.01;\n        pet.immune = true;\n        fightData.steps.push({\n          a: 15 /* Move */,\n          f: fighter.index,\n          t: pet.index,\n          s: 1\n        });\n        const step = {\n          a: 33 /* Treat */,\n          b: fighter.index,\n          t: pet.index,\n          h: heal\n        };\n        if (poisonHeal) {\n          step.c = 1;\n        }\n        fightData.steps.push(step);\n        break;\n      }\n      default:\n        return false;\n    }\n    skill.uses[skill.tier - 1] = (skill.uses[skill.tier - 1] ?? 0) - 1;\n    updateStats(stats, fighter.id, "skillsUsed", 1);\n    mimicSkill(fightData, fighter, skill);\n    if (!skill.uses?.[skill.tier - 1]) {\n      delete fighter.skills[skill.name];\n    }\n    return true;\n  };\n  var counterAttack = (fighter, opponent) => {\n    if (opponent.hp <= 0) return false;\n    if (opponent.trapped) return false;\n    if (opponent.stunned) return false;\n    if (opponent.hypnotized) return false;\n    const random = Math.random();\n    const valueToBeat = (opponent.counter * 10 + (opponent.reach + (opponent.activeWeapon?.reach || 0) - (fighter.reach + (fighter.activeWeapon?.reach || 0)))) * 0.1;\n    return random < valueToBeat;\n  };\n  var block = ({\n    chaos,\n    fighter,\n    opponent,\n    thrown = false,\n    ease = 1\n  }) => {\n    if (opponent.hp <= 0) return false;\n    if (opponent.trapped) return false;\n    if (opponent.stunned) return false;\n    if (opponent.type === "pet" || opponent.type === "boss") return false;\n    let opponentBlock = getFighterStat(chaos, opponent, "block");\n    if (thrown && opponent.skills[import_prisma19.SkillName.hideaway]) {\n      opponentBlock += ease * getSkillScaledStat(chaos, opponent.skills[import_prisma19.SkillName.hideaway], FightStat.BLOCK, "percent");\n    }\n    if (opponent.hp === 1 && opponent.skills[import_prisma19.SkillName.survival]) {\n      opponentBlock += getSkillScaledStat(chaos, opponent.skills[import_prisma19.SkillName.survival], FightStat.BLOCK, "percent");\n    }\n    return Math.random() * ease < Math.min(\n      opponentBlock - getFighterStat(chaos, fighter, "accuracy"),\n      0.9 * ease\n    );\n  };\n  var evade = (chaos, fighter, opponent, difficulty = 1) => {\n    if (opponent.hp <= 0) return false;\n    if (opponent.trapped) return false;\n    if (opponent.stunned) return false;\n    if (fighter.hypnotized) return true;\n    if (opponent.balletShoes) {\n      opponent.balletShoes = false;\n      return true;\n    }\n    let opponentEvasion = getFighterStat(chaos, opponent, "evasion");\n    if (opponent.hp === 1 && opponent.skills[import_prisma19.SkillName.survival]) {\n      opponentEvasion += getSkillScaledStat(chaos, opponent.skills[import_prisma19.SkillName.survival], FightStat.EVASION, "percent");\n    }\n    const agilityDifference = Math.min(\n      Math.max(\n        -40,\n        (opponent.agility - fighter.agility) * 2\n      ),\n      40\n    );\n    const random = Math.random();\n    return random * difficulty < Math.min(\n      opponentEvasion + agilityDifference * 0.01 - getFighterStat(chaos, fighter, "accuracy") - getFighterStat(chaos, fighter, "dexterity"),\n      0.9 * difficulty\n    );\n  };\n  var breakShield = (chaos, fighter, opponent) => {\n    if (!opponent.shield) return false;\n    return getFighterStat(chaos, fighter, "disarm") * 100 >= randomBetween(1, 300);\n  };\n  var disarm = (chaos, fighter, opponent, thrown) => {\n    if (!opponent.activeWeapon) return false;\n    const shouldDisarm = getFighterStat(chaos, fighter, "disarm", thrown ? "weapon" : void 0) * 100 >= randomBetween(1, 100);\n    if (shouldDisarm && opponent.weaponGrip) {\n      const preventedDisarm = opponent.weaponGrip * 100 >= randomBetween(1, 100);\n      if (preventedDisarm) {\n        return false;\n      }\n    }\n    return shouldDisarm;\n  };\n  var disarmAttacker = (fighter, opponent) => {\n    if (!fighter.activeWeapon) return false;\n    if (!opponent.ironHead) return false;\n    const shouldDisarm = Math.random() < opponent.ironHead;\n    if (shouldDisarm && fighter.weaponGrip) {\n      const preventedDisarm = fighter.weaponGrip * 100 >= randomBetween(1, 100);\n      if (preventedDisarm) {\n        return false;\n      }\n    }\n    return shouldDisarm;\n  };\n  var reversal = (chaos, opponent, blocked) => {\n    if (opponent.stunned) return false;\n    const random = Math.random();\n    let reversalStat = getFighterStat(chaos, opponent, "reversal");\n    if (blocked && opponent.skills[import_prisma19.SkillName.counterAttack]) {\n      reversalStat += getSkillScaledStat(chaos, opponent.skills[import_prisma19.SkillName.counterAttack], FightStat.REVERSAL, "percent");\n    } else {\n      reversalStat = Math.min(reversalStat, 0.9);\n    }\n    return random < reversalStat;\n  };\n  var deflectProjectile = (chaos, fighter, timesDeflected) => {\n    if (fighter.hp <= 0) return false;\n    if (fighter.trapped) return false;\n    if (fighter.stunned) return false;\n    const deflectWithWeapon = timesDeflected % 2 === 0 || !!fighter.skills[import_prisma19.SkillName.hideaway] || fighter.activeWeapon?.types.includes("thrown");\n    const random = Math.random();\n    const stat = Math.min(\n      getFighterStat(chaos, fighter, "deflect", deflectWithWeapon ? void 0 : "fighter"),\n      0.9\n    );\n    return random < stat;\n  };\n  var attack = (chaos, fightData, fighter, opponent, stats, achievements, isCounter = false) => {\n    if (fighter.hp <= 0) return { blocked: false, lostReach: 0 };\n    if (opponent.hypnotized) {\n      opponent.hypnotized = false;\n      fightData.steps.push({\n        a: 29 /* SkillExpire */,\n        b: opponent.index,\n        s: SkillByName[import_prisma19.SkillName.hypnosis]\n      });\n    }\n    const damageResult = getDamage(chaos, fighter, opponent);\n    let { damage } = damageResult;\n    const { criticalHit } = damageResult;\n    const blocked = block({ chaos, fighter, opponent });\n    const evaded = evade(chaos, fighter, opponent);\n    const brokeShield = breakShield(chaos, fighter, opponent);\n    fightData.steps.push({\n      a: 19 /* AttemptHit */,\n      f: fighter.index,\n      t: opponent.index,\n      w: fighter.activeWeapon ? WeaponByName[fighter.activeWeapon.name] : void 0\n    });\n    if (evaded) {\n      damage = 0;\n      fightData.steps.push({\n        a: 21 /* Evade */,\n        f: opponent.index\n      });\n      updateStats(stats, opponent.id, "evades", 1);\n      updateStats(stats, opponent.id, "consecutiveEvades", 1);\n      checkAchievements(stats, achievements);\n    } else {\n      updateStats(stats, opponent.id, "consecutiveEvades", 0);\n      if (brokeShield) {\n        updateStats(stats, fighter.id, "disarms", 1);\n        dropShield({ fightData, chaos, fighter: opponent });\n      }\n      if (blocked) {\n        damage = 0;\n        fightData.steps.push({\n          a: 20 /* Block */,\n          f: opponent.index\n        });\n        updateStats(stats, opponent.id, "blocks", 1);\n        updateStats(stats, opponent.id, "consecutiveBlocks", 1);\n        checkAchievements(stats, achievements);\n      } else {\n        updateStats(stats, opponent.id, "consecutiveBlocks", 0);\n      }\n    }\n    if (damage && fighter.sabotage) {\n      const opponentWeapons = keys(opponent.weapons);\n      if (opponentWeapons.length && Math.random() < fighter.sabotage) {\n        const weapon = randomItem(opponentWeapons);\n        delete opponent.weapons[weapon];\n        fightData.steps.push({\n          a: 22 /* Sabotage */,\n          f: fighter.index,\n          t: opponent.index,\n          w: WeaponByName[weapon]\n        });\n      }\n    }\n    if (damage && disarm(chaos, fighter, opponent)) {\n      if (opponent.activeWeapon) {\n        fightData.steps.push({\n          a: 23 /* Disarm */,\n          f: fighter.index,\n          t: opponent.index,\n          w: WeaponByName[opponent.activeWeapon.name]\n        });\n        opponent.activeWeapon = null;\n        updateStats(stats, fighter.id, "disarms", 1);\n      }\n    }\n    let lostReach = 0;\n    if (damage) {\n      if (!fighter.activeWeapon && !fighter.bareHandHit) {\n        fighter.bareHandHit = true;\n      }\n      if (fighter.activeWeapon && disarmAttacker(fighter, opponent)) {\n        fightData.steps.push({\n          a: 23 /* Disarm */,\n          f: opponent.index,\n          t: fighter.index,\n          w: WeaponByName[fighter.activeWeapon.name]\n        });\n        lostReach = fighter.activeWeapon.reach;\n        fighter.activeWeapon = null;\n        updateStats(stats, opponent.id, "disarms", 1);\n      }\n      registerHit({\n        fightData,\n        stats,\n        achievements,\n        fighter,\n        opponents: [opponent],\n        damage,\n        criticalHit\n      });\n    }\n    if (!isCounter && !damage && fighter.determination && !fighter.hypnotized && Math.random() < fighter.determination) {\n      fighter.retryAttack = true;\n    }\n    const reversed = reversal(chaos, opponent, blocked);\n    return {\n      blocked: !evaded && blocked,\n      reversed: !evaded && reversed,\n      lostReach\n    };\n  };\n  var checkDeaths = (fightData, stats) => {\n    for (const fighter of fightData.fighters) {\n      if (fighter.hp <= 0 && fightData.steps.filter((step) => step.a === 24 /* Death */ && step.f === fighter.index).length === 0) {\n        fightData.steps.push({\n          a: 24 /* Death */,\n          f: fighter.index\n        });\n        if (fighter.type === "pet") {\n          const { master } = fighter;\n          if (!master) {\n            throw new Error("Pet without master");\n          }\n          const opponents = getOpponents({ fightData, fighter, bruteAndBossOnly: true });\n          opponents.forEach((opponent) => {\n            updateStats(stats, opponent.id, "petsKilled", 1);\n          });\n        } else if (!fightData.loser && fightData.fighters.filter((f) => f.team === fighter.team && !f.master && f.hp > 0).length === 0) {\n          fightData.loser = fighter.id;\n        }\n      }\n    }\n  };\n  var startAttack = (chaos, fightData, stats, achievements, fighter, opponent, isCounter) => {\n    const initialFighterHp = fighter.hp;\n    let opponentWasTrapped = opponent.trapped;\n    const attackResult = {\n      blocked: false,\n      reversed: false,\n      lostReach: 0\n    };\n    const {\n      blocked,\n      reversed,\n      lostReach\n    } = attack(chaos, fightData, fighter, opponent, stats, achievements, isCounter);\n    if (blocked) attackResult.blocked = true;\n    if (reversed) attackResult.reversed = true;\n    attackResult.lostReach = lostReach;\n    let attacksCount = 1;\n    let combo = getFighterStat(chaos, fighter, "combo") + fighter.agility * 0.01;\n    if (!isCounter) {\n      let random = Math.random();\n      while (!attackResult.reversed && (random < combo || fighter.retryAttack)) {\n        fighter.retryAttack = false;\n        if (fighter.hp < initialFighterHp) {\n          break;\n        }\n        if (attackResult.lostReach > 1) {\n          fightData.steps.push({\n            a: 15 /* Move */,\n            f: fighter.index,\n            t: opponent.index,\n            r: 1\n          });\n        }\n        combo *= 0.5;\n        const {\n          blocked: comboBlocked,\n          reversed: comboReversed,\n          lostReach: comboLostReach\n        } = attack(chaos, fightData, fighter, opponent, stats, achievements);\n        attacksCount++;\n        if (comboBlocked) attackResult.blocked = true;\n        if (comboReversed) attackResult.reversed = true;\n        attackResult.lostReach = comboLostReach;\n        opponentWasTrapped = false;\n        random = Math.random();\n      }\n      if (!opponentWasTrapped && attackResult.reversed && opponent.hp > 0) {\n        updateStats(stats, opponent.id, "consecutiveReversals", 1);\n        checkAchievements(stats, achievements);\n        const opponentReach = opponent.activeWeapon?.reach ?? 0;\n        const fighterReach = fighter.activeWeapon?.reach ?? 0;\n        if (opponentReach < fighterReach) {\n          fightData.steps.push({\n            a: 15 /* Move */,\n            f: opponent.index,\n            t: fighter.index,\n            r: 1\n          });\n        }\n        attack(chaos, fightData, opponent, fighter, stats, achievements);\n      } else {\n        updateStats(stats, opponent.id, "consecutiveReversals", 0);\n      }\n      if (attacksCount === 3) {\n        updateAchievement(achievements, "combo3", 1, fighter.id);\n      } else if (attacksCount === 4) {\n        updateAchievement(achievements, "combo4", 1, fighter.id);\n      } else if (attacksCount >= 5) {\n        updateAchievement(achievements, "combo5", 1, fighter.id);\n      }\n    }\n    fighter.retryAttack = false;\n    checkDeaths(fightData, stats);\n  };\n  var playFighterTurn = (fightData, stats, achievements) => {\n    const fighter = fightData.fighters[0];\n    if (!fighter) {\n      throw new Error("No fighter found");\n    }\n    const chaos = !!fightData.modifiers[import_prisma19.FightModifier.chaos];\n    if (fighter.trapped) {\n      fightData.steps.push({\n        a: 29 /* SkillExpire */,\n        b: fighter.index,\n        s: SkillByName[import_prisma19.SkillName.net]\n      });\n      fighter.trapped = false;\n    }\n    if (fighter.stunned) {\n      fightData.steps.push({\n        a: 29 /* SkillExpire */,\n        b: fighter.index,\n        s: SkillByName[import_prisma19.SkillName.chaining]\n      });\n      wakeUp(fightData, fighter);\n    }\n    resetOthersStats(stats, fighter.id, "consecutiveThrows");\n    if (fighter.leavesAtInitiative && fighter.leavesAtInitiative <= fightData.initiative) {\n      fightData.steps.push({\n        a: 1 /* Leave */,\n        f: fighter.index\n      });\n      fightData.fighters.shift();\n      return;\n    }\n    if (fighter.arrivesAtInitiative) {\n      fighter.arrivesAtInitiative = void 0;\n      fighterArrives(fightData, fighter);\n    }\n    if (fighter.fastMetabolism !== null && fighter.fastMetabolism > 0) {\n      if (fighter.hp >= fighter.maxHp) {\n        fighter.fastMetabolism = null;\n        return;\n      }\n      fighter.fastMetabolism -= 1;\n      let heal = Math.ceil(fighter.maxHp * 0.05);\n      if (fighter.hp + heal > fighter.maxHp) {\n        heal = fighter.maxHp - fighter.hp;\n      }\n      healFighter(stats, fighter, heal);\n      fightData.steps.push({\n        a: 35 /* Regeneration */,\n        f: fighter.index,\n        h: heal,\n        d: 1\n      });\n      if (fighter.fastMetabolism <= 0) {\n        fighter.fastMetabolism = null;\n      }\n      fighter.initiative += 0.15;\n      return;\n    }\n    if (fighter.hp < fighter.maxHp) {\n      if (fighter.regeneration > 0) {\n        let heal = Math.ceil(fighter.maxHp * fighter.regeneration);\n        if (fighter.hp + heal > fighter.maxHp) {\n          heal = fighter.maxHp - fighter.hp;\n        }\n        healFighter(stats, fighter, heal);\n        fightData.steps.push({\n          a: 35 /* Regeneration */,\n          f: fighter.index,\n          h: heal\n        });\n      }\n    }\n    const possibleSuper = randomlyGetSuper(fightData, fighter);\n    if (possibleSuper) {\n      if (activateSuper(chaos, fightData, fighter, possibleSuper, stats, achievements)) {\n        return;\n      }\n    }\n    const forceDraw = !fighter.activeWeapon && fighter.activeSkills.some((sk) => sk.name === import_prisma19.SkillName.fierceBrute);\n    const sabotaged = drawWeapon(fightData, fighter, forceDraw);\n    if (sabotaged) {\n      return;\n    }\n    let attackType = fighter.activeWeapon?.types.includes("thrown") ? "thrown" : fighter.activeWeapon ? fighter.skills[import_prisma19.SkillName.hideaway] ? randomBetween(0, 1) === 0 ? "thrown" : "melee" : randomBetween(\n      0,\n      Math.round(33 - (fighter.activeWeapon.tempo[fighter.activeWeapon.tier - 1] ?? 0) * 5)\n    ) === 0 ? "thrown" : "melee" : "melee";\n    if (attackType === "thrown" && fightData.modifiers[import_prisma19.FightModifier.noThrows]) {\n      attackType = "melee";\n    }\n    const opponent = getRandomOpponent({ fightData, fighter });\n    if (!opponent) {\n      return;\n    }\n    if (opponent.hp < opponent.maxHp * 0.2 && !opponent.stunned && !opponent.trapped && !fighter.hypnotized) {\n      const opponentHypnosis = opponent.skills[import_prisma19.SkillName.hypnosis];\n      if (opponentHypnosis && Math.random() < 0.9) {\n        if (activateSuper(chaos, fightData, opponent, opponentHypnosis, stats, achievements)) {\n          if (fighter.type === "pet") return;\n        }\n      }\n    }\n    if (attackType === "melee") {\n      const countered = counterAttack(fighter, opponent);\n      fightData.steps.push({\n        a: 15 /* Move */,\n        f: fighter.index,\n        t: opponent.index,\n        c: countered ? 1 : 0\n      });\n      if (countered) {\n        updateStats(stats, opponent.id, "counters", 1);\n        updateStats(stats, fighter.id, "countersTriggered", 1);\n        updateStats(stats, opponent.id, "consecutiveCounters", 1);\n        checkAchievements(stats, achievements);\n        fightData.steps.push({\n          a: 27 /* Counter */,\n          f: opponent.index,\n          t: fighter.index\n        });\n        startAttack(chaos, fightData, stats, achievements, opponent, fighter, true);\n      } else {\n        updateStats(stats, opponent.id, "consecutiveCounters", 0);\n        if (opponent.stunned && !opponent.trapped) {\n          const opponentCry = opponent.skills[import_prisma19.SkillName.cryOfTheDamned];\n          if (opponentCry && randomBetween(0, 1) === 0) {\n            if (activateSuper(chaos, fightData, opponent, opponentCry, stats, achievements)) {\n              wakeUp(fightData, opponent);\n              if (fightData.fighters.includes(fighter)) {\n                fightData.steps.push({\n                  a: 17 /* MoveBack */,\n                  f: fighter.index\n                });\n              }\n              increaseInitiative(chaos, fighter, 0.5);\n              return;\n            }\n          }\n        }\n        startAttack(chaos, fightData, stats, achievements, fighter, opponent);\n      }\n    } else {\n      if (!fighter.activeWeapon) {\n        throw new Error("Trying to throw a weapon but no weapon is active");\n      }\n      const keepWeapon = fighter.activeWeapon.types.includes("thrown") || !!fighter.skills[import_prisma19.SkillName.hideaway];\n      let firstThrow = true;\n      let combo = getFighterStat(chaos, fighter, "combo") + fighter.agility * 0.01;\n      let random = Math.random();\n      while (firstThrow || keepWeapon && random < combo) {\n        if (!fighter.activeWeapon) {\n          break;\n        }\n        if (fighter.hp <= 0 || opponent.hp <= 0) {\n          break;\n        }\n        const thrownWeapon = fighter.activeWeapon;\n        let deflected = null;\n        let currentFighter = fighter;\n        let currentOpponent = opponent;\n        let timesDeflected = 0;\n        while (deflected === null || deflected) {\n          if (currentOpponent.hypnotized) {\n            currentOpponent.hypnotized = false;\n            fightData.steps.push({\n              a: 29 /* SkillExpire */,\n              b: currentOpponent.index,\n              s: SkillByName[import_prisma19.SkillName.hypnosis]\n            });\n          }\n          fightData.steps.push({\n            a: 25 /* Throw */,\n            f: currentFighter.index,\n            t: currentOpponent.index,\n            w: WeaponByName[thrownWeapon.name],\n            k: keepWeapon ? 1 : 0,\n            r: deflected ? 1 : 0\n          });\n          deflected = deflectProjectile(chaos, currentOpponent, timesDeflected);\n          let damage = 0;\n          let criticalHit = false;\n          if (!deflected) {\n            const damageResult = getDamage(\n              chaos,\n              currentFighter,\n              currentOpponent,\n              thrownWeapon\n            );\n            damage = damageResult.damage;\n            criticalHit = damageResult.criticalHit;\n            damage = Math.floor(damage * 1.5 ** timesDeflected);\n          }\n          updateStats(stats, currentFighter.id, "consecutiveThrows", 1);\n          checkAchievements(stats, achievements);\n          if (!deflected && block({\n            chaos,\n            fighter: currentFighter,\n            opponent: currentOpponent,\n            thrown: true,\n            ease: 2\n          })) {\n            damage = 0;\n            fightData.steps.push({\n              a: 20 /* Block */,\n              f: currentOpponent.index\n            });\n            updateStats(stats, currentOpponent.id, "blocks", 1);\n            updateStats(stats, currentOpponent.id, "consecutiveBlocks", 1);\n            checkAchievements(stats, achievements);\n          } else {\n            updateStats(stats, currentOpponent.id, "consecutiveBlocks", 0);\n          }\n          if (damage && evade(chaos, currentFighter, currentOpponent, 2)) {\n            damage = 0;\n            fightData.steps.push({\n              a: 21 /* Evade */,\n              f: currentOpponent.index\n            });\n            updateStats(stats, currentOpponent.id, "consecutiveEvades", 1);\n            checkAchievements(stats, achievements);\n          } else {\n            updateStats(stats, currentOpponent.id, "consecutiveEvades", 0);\n          }\n          if (damage) {\n            if (disarm(chaos, currentFighter, currentOpponent, true)) {\n              if (currentOpponent.activeWeapon) {\n                fightData.steps.push({\n                  a: 23 /* Disarm */,\n                  f: currentFighter.index,\n                  t: currentOpponent.index,\n                  w: WeaponByName[currentOpponent.activeWeapon.name]\n                });\n                currentOpponent.activeWeapon = null;\n                updateStats(stats, currentFighter.id, "disarms", 1);\n              }\n            }\n            registerHit({\n              fightData,\n              stats,\n              achievements,\n              fighter: currentFighter,\n              opponents: [currentOpponent],\n              damage,\n              thrown: true,\n              criticalHit\n            });\n          }\n          if (deflected) {\n            [currentFighter, currentOpponent] = [currentOpponent, currentFighter];\n            timesDeflected++;\n          }\n        }\n        if (!keepWeapon) {\n          fighter.activeWeapon = null;\n        }\n        firstThrow = false;\n        combo *= 0.5;\n        random = Math.random();\n      }\n      checkDeaths(fightData, stats);\n    }\n    fighter.activeSkills.forEach((skill) => {\n      fightData.steps.push({\n        a: 29 /* SkillExpire */,\n        b: fighter.index,\n        s: SkillByName[skill.name]\n      });\n    });\n    fighter.activeSkills = [];\n    if (attackType === "melee" && fighter.hp > 0 && !fighter.stunned) {\n      fightData.steps.push({\n        a: 17 /* MoveBack */,\n        f: fighter.index\n      });\n    }\n    if (!fightData.loser && fighter.hp > 0 && fighter.poisonedBy) {\n      const poisoner = fightData.fighters.find((f) => f.index === fighter.poisonedBy);\n      if (!poisoner) {\n        throw new Error("No poisoner found");\n      }\n      const poisonPercentage = ExtraTieredSkillData[import_prisma19.SkillName.chef]?.[(poisoner.skills[import_prisma19.SkillName.chef]?.tier ?? 1) - 1] ?? 2;\n      const poisonDamage = Math.ceil(fighter.maxHp * (poisonPercentage / 100));\n      registerHit({\n        fightData,\n        stats,\n        achievements,\n        fighter: poisoner,\n        opponents: [fighter],\n        damage: poisonDamage,\n        source: "poison"\n      });\n    }\n    if (!fightData.loser && fighter.hp > 0 && fightData.overtime) {\n      const poisonDamage = Math.ceil(fighter.maxHp / 4);\n      const poisoner = getRandomOpponent({ fightData, fighter, bruteAndBossOnly: true });\n      if (poisoner) {\n        registerHit({\n          fightData,\n          stats,\n          achievements,\n          fighter: poisoner,\n          opponents: [fighter],\n          damage: poisonDamage,\n          source: "poison"\n        });\n      }\n    }\n    increaseInitiative(chaos, fighter);\n  };\n\n  // vendor/labrute/server/src/utils/fight/applySpy.ts\n  var import_prisma20 = __toESM(require_index_browser2(), 1);\n\n  // vendor/labrute/server/src/utils/shuffle.ts\n  var shuffle = (array) => {\n    const shuffledArray = [...array];\n    for (let i = array.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n      const iItem = shuffledArray[i];\n      const jItem = shuffledArray[j];\n      if (typeof iItem === "undefined" || typeof jItem === "undefined") {\n        throw new Error("Item not found while shuffling array");\n      }\n      shuffledArray[i] = jItem;\n      shuffledArray[j] = iItem;\n    }\n    return shuffledArray;\n  };\n\n  // vendor/labrute/server/src/utils/fight/applySpy.ts\n  var applySpy = (fightData, brute, opponent) => {\n    if (!brute.skills[import_prisma20.SkillName.spy]) return;\n    const opponentWeaponNames = Object.keys(opponent.weapons);\n    const bruteWeaponNames = Object.keys(brute.weapons);\n    const swapPairs = [];\n    const processedNames = /* @__PURE__ */ new Set();\n    for (const name of bruteWeaponNames) {\n      const opponentWeapon = opponent.weapons[name];\n      if (opponentWeapon) {\n        if (opponent.skills[import_prisma20.SkillName.weaponsMaster] && opponentWeapon.types.includes(WeaponType.SHARP)) {\n          continue;\n        }\n        swapPairs.push({\n          bruteWeapon: brute.weapons[name],\n          opponentWeapon\n        });\n        processedNames.add(name);\n      }\n    }\n    const uniqueBruteNames = bruteWeaponNames.filter((name) => !processedNames.has(name));\n    const uniqueOpponentNames = opponentWeaponNames.filter((name) => {\n      if (processedNames.has(name)) return false;\n      const weapon = opponent.weapons[name];\n      return !(opponent.skills[import_prisma20.SkillName.weaponsMaster] && weapon?.types.includes(WeaponType.SHARP));\n    });\n    const uniquePairCount = Math.min(uniqueBruteNames.length, uniqueOpponentNames.length);\n    for (let i = 0; i < uniquePairCount; i++) {\n      swapPairs.push({\n        bruteWeapon: brute.weapons[uniqueBruteNames[i]],\n        opponentWeapon: opponent.weapons[uniqueOpponentNames[i]]\n      });\n    }\n    if (swapPairs.length === 0) return;\n    const shuffledPairs = shuffle(swapPairs);\n    const maxSwaps = Math.min(bruteWeaponNames.length, opponentWeaponNames.length);\n    const pairsToSwap = shuffledPairs.slice(0, maxSwaps);\n    fightData.steps.push({\n      a: 30 /* Spy */,\n      b: brute.index,\n      t: opponent.index,\n      s: pairsToSwap.map((p) => WeaponByName[p.bruteWeapon.name]),\n      r: pairsToSwap.map((p) => WeaponByName[p.opponentWeapon.name])\n    });\n    for (const { bruteWeapon, opponentWeapon } of pairsToSwap) {\n      bruteWeapon.damaged = ExtraTieredSkillData[import_prisma20.SkillName.spy]?.[(brute.skills[import_prisma20.SkillName.spy]?.tier ?? 1) - 1];\n      delete brute.weapons[bruteWeapon.name];\n      delete opponent.weapons[opponentWeapon.name];\n      opponent.weapons[bruteWeapon.name] = bruteWeapon;\n      brute.weapons[opponentWeapon.name] = opponentWeapon;\n    }\n  };\n\n  // src/engine/simulateOnce.ts\n  var MAX_RETRIES = 10;\n  var calculate = (brute, modifiers) => getCalculatedBrute(brute, modifiers);\n  var retry = (fn, times) => {\n    let lastError;\n    for (let attempt = 0; attempt < times; attempt += 1) {\n      try {\n        return fn();\n      } catch (error) {\n        lastError = error;\n      }\n    }\n    throw lastError;\n  };\n  var buildFighters = (brute, opponent, modifiers, backups = {}) => getFighters({\n    team1: {\n      brutes: [calculate(brute, modifiers)],\n      backups: backups.own ? [calculate(backups.own, modifiers)] : [],\n      bosses: []\n    },\n    team2: {\n      brutes: [calculate(opponent, modifiers)],\n      backups: backups.opponent ? [calculate(backups.opponent, modifiers)] : [],\n      bosses: []\n    },\n    modifiers,\n    clanFight: false\n  });\n  var drawBackup = (pool) => pool?.length ? pool[Math.floor(Math.random() * pool.length)] : void 0;\n  var runFight = (brute, opponent, modifiers, backups) => {\n    const fighters = buildFighters(brute, opponent, modifiers, {\n      own: drawBackup(backups.own),\n      opponent: drawBackup(backups.opponent)\n    });\n    const fightData = {\n      modifiers,\n      fighters,\n      initialFighters: [],\n      steps: [],\n      initiative: 0,\n      winner: null,\n      loser: null,\n      overtime: false\n    };\n    const stats = {};\n    const achievements = {};\n    fightData.fighters.forEach((f) => {\n      if (f.type === "brute" && f.master) return;\n      fighterArrives(fightData, f);\n    });\n    orderFighters(fightData);\n    const mains = fightData.fighters.filter((f) => f.type === "brute" && !f.master);\n    mains.forEach((f) => {\n      const foe = mains.find((o) => o.id !== f.id);\n      if (foe) applySpy(fightData, f, foe);\n    });\n    saboteur(fightData, achievements);\n    let turn = 0;\n    while (!fightData.loser && turn < 2e3) {\n      orderFighters(fightData);\n      if (!fightData.fighters[0]) break;\n      fightData.initiative = fightData.fighters[0].initiative;\n      if (turn > 1e3) fightData.overtime = true;\n      playFighterTurn(fightData, stats, achievements);\n      checkDeaths(fightData, stats);\n      fightData.steps = fightData.steps.filter((s) => s.a === 24 /* Death */);\n      turn += 1;\n    }\n    if (!fightData.loser) throw new Error("Fight not finished");\n    const loser = fightData.fighters.find((f) => f.id === fightData.loser);\n    if (!loser) throw new Error("No loser found");\n    const mine = fightData.fighters.find((f) => f.type === "brute" && !f.master && f.team === "L");\n    return {\n      result: loser.team === "L" ? "loss" : "win",\n      turns: turn,\n      hpLeft: mine && mine.maxHp > 0 ? Math.max(0, mine.hp) / mine.maxHp : 0\n    };\n  };\n  var simulateOnce = (brute, opponent, modifiers, backups = {}) => retry(() => runFight(brute, opponent, modifiers, backups), MAX_RETRIES);\n\n  // src/odds/interval.ts\n  var Z = 1.96;\n  var wilson = (wins, n) => {\n    if (n <= 0) return { lo: 0, hi: 1, half: 0.5 };\n    const p = wins / n;\n    const z2 = Z * Z;\n    const denominator = 1 + z2 / n;\n    const center = (p + z2 / (2 * n)) / denominator;\n    const spread = Z / denominator * Math.sqrt(p * (1 - p) / n + z2 / (4 * n * n));\n    const lo = Math.min(p, Math.max(0, center - spread));\n    const hi = Math.max(p, Math.min(1, center + spread));\n    return { lo, hi, half: Math.max(hi - p, p - lo) };\n  };\n\n  // src/odds/rng.ts\n  var hashSeed = (key) => {\n    let hash = 2166136261;\n    for (let i = 0; i < key.length; i += 1) {\n      hash ^= key.charCodeAt(i);\n      hash = Math.imul(hash, 16777619);\n    }\n    return hash >>> 0;\n  };\n  var mulberry32 = (seed) => {\n    let state = seed >>> 0;\n    return () => {\n      state = state + 1831565813 >>> 0;\n      let t = state;\n      t = Math.imul(t ^ t >>> 15, t | 1);\n      t ^= t + Math.imul(t ^ t >>> 7, t | 61);\n      return ((t ^ t >>> 14) >>> 0) / 4294967296;\n    };\n  };\n  var withSeededRandom = (seed, fn) => {\n    const original = Math.random;\n    Math.random = mulberry32(seed);\n    try {\n      return fn();\n    } finally {\n      Math.random = original;\n    }\n  };\n\n  // src/odds/fastClone.ts\n  var MAX_DEPTH = 50;\n  var clone = (value, native, depth) => {\n    if (value === null || typeof value !== "object") return value;\n    if (depth > MAX_DEPTH) return native(value);\n    if (Array.isArray(value)) {\n      const copy2 = new Array(value.length);\n      for (let i = 0; i < value.length; i += 1) copy2[i] = clone(value[i], native, depth + 1);\n      return copy2;\n    }\n    if (Object.getPrototypeOf(value) !== Object.prototype) return native(value);\n    const copy = {};\n    const source = value;\n    for (const key of Object.keys(source)) {\n      copy[key] = clone(source[key], native, depth + 1);\n    }\n    return copy;\n  };\n  var withFastClone = (fn) => {\n    const native = globalThis.structuredClone;\n    if (typeof native !== "function") return fn();\n    globalThis.structuredClone = ((value) => clone(value, native, 0));\n    try {\n      return fn();\n    } finally {\n      globalThis.structuredClone = native;\n    }\n  };\n\n  // src/odds/estimate.ts\n  var seedOf = (input) => hashSeed([\n    input.brute.id,\n    input.opponent.id,\n    Object.keys(input.modifiers).sort().join(","),\n    (input.backups?.own ?? []).map((b) => b.id).sort().join(","),\n    (input.backups?.opponent ?? []).map((b) => b.id).sort().join(","),\n    `salve${input.round ?? 0}`\n  ].join("|"));\n  var summarize = (tally) => {\n    const winRate = tally.samples > 0 ? tally.wins / tally.samples : 0;\n    const { lo, hi, half } = wilson(tally.wins, tally.samples);\n    return {\n      ...tally,\n      winRate,\n      ci: half,\n      lo,\n      hi,\n      meanTurns: tally.samples > 0 ? tally.turnsTotal / tally.samples : 0,\n      hpLeftOnWin: tally.wins > 0 ? tally.hpLeftTotalOnWin / tally.wins : 0\n    };\n  };\n  var estimate = (input, n, sim = simulateOnce) => withFastClone(() => withSeededRandom(seedOf(input), () => {\n    let wins = 0;\n    let hpLeftTotalOnWin = 0;\n    let turnsTotal = 0;\n    for (let i = 0; i < n; i += 1) {\n      const outcome = sim(input.brute, input.opponent, input.modifiers, input.backups ?? {});\n      turnsTotal += outcome.turns;\n      if (outcome.result === "win") {\n        wins += 1;\n        hpLeftTotalOnWin += outcome.hpLeft;\n      }\n    }\n    return summarize({\n      wins,\n      samples: n,\n      turnsTotal,\n      hpLeftTotalOnWin,\n      approximate: input.approximate ?? false\n    });\n  }));\n\n  // vendor/labrute/server/src/utils/brute/updateBruteData.ts\n  var import_prisma21 = __toESM(require_index_browser2(), 1);\n  var updateStat = (brute, stat, value) => {\n    switch (stat) {\n      case "hp":\n        return {\n          ...brute,\n          hpStat: brute.hpStat + value\n        };\n      case "strength":\n        return {\n          ...brute,\n          strengthStat: brute.strengthStat + value\n        };\n      case "agility":\n        return {\n          ...brute,\n          agilityStat: brute.agilityStat + value\n        };\n      case "speed":\n        return {\n          ...brute,\n          speedStat: brute.speedStat + value\n        };\n      default:\n        throw new Error("Invalid stat");\n    }\n  };\n  var updateBruteData = (brute, destinyChoice) => {\n    let updatedBrute = {\n      ...brute,\n      pets: [...brute.pets],\n      skills: [...brute.skills],\n      weapons: [...brute.weapons],\n      xp: 0,\n      level: brute.level + 1\n    };\n    if (destinyChoice.type === "skill") {\n      const skillName = destinyChoice.skill;\n      if (!skillName) {\n        throw new Error("No skill provided");\n      }\n      const calculatedBrute = getCalculatedBrute(updatedBrute, {});\n      if (skillName === import_prisma21.SkillName.regeneration && !brute.eventId) {\n        updatedBrute.fightsLeft = getFightsLeft(calculatedBrute) + 2;\n      }\n      calculatedBrute.skills[skillName] = calculatedBrute.skills[skillName] ? calculatedBrute.skills[skillName] + 1 : 1;\n      applySkillModifiers(calculatedBrute, skillName, calculatedBrute.skills[skillName]);\n      updatedBrute = getBruteToSave(calculatedBrute);\n    } else if (destinyChoice.type === "weapon") {\n      updatedBrute.weapons.push(destinyChoice.weapon);\n    } else if (destinyChoice.type === "pet") {\n      const pet = destinyChoice.pet && pets[destinyChoice.pet];\n      if (!pet) {\n        throw new Error("Pet not found");\n      }\n      updatedBrute.pets.push(pet.name);\n      const petTier = updatedBrute.pets.filter((p) => p === pet.name).length;\n      if (petTier > 1) {\n        updatedBrute.hpModifier += pet.hpMalus[petTier - 2] ?? 0;\n      }\n      updatedBrute.hpModifier -= pet.hpMalus[petTier - 1] ?? 0;\n    } else if (destinyChoice.stat1 && !destinyChoice.stat2) {\n      const stat = destinyChoice.stat1;\n      updatedBrute = updateStat(updatedBrute, stat, destinyChoice.stat1Value);\n    } else {\n      if (!destinyChoice.stat1 || !destinyChoice.stat2 || !destinyChoice.stat1Value || !destinyChoice.stat2Value) {\n        throw new Error("No stats provided");\n      }\n      updatedBrute = updateStat(\n        updatedBrute,\n        destinyChoice.stat1,\n        destinyChoice.stat1Value\n      );\n      updatedBrute = updateStat(\n        updatedBrute,\n        destinyChoice.stat2,\n        destinyChoice.stat2Value\n      );\n    }\n    updatedBrute.hpValue = getBruteHP(updatedBrute);\n    updatedBrute.strengthValue = Math.floor(\n      updatedBrute.strengthStat * updatedBrute.strengthModifier\n    );\n    updatedBrute.agilityValue = Math.floor(\n      updatedBrute.agilityStat * updatedBrute.agilityModifier\n    );\n    updatedBrute.speedValue = Math.floor(\n      updatedBrute.speedStat * updatedBrute.speedModifier\n    );\n    return updatedBrute;\n  };\n\n  // src/engine/levelUp.ts\n  var applyChoice = (brute, choice) => updateBruteData(\n    // `updateBruteData` lit deux champs que l\'API d\'ar\xE8ne ne renvoie pas, et ne s\'en\n    // sert que pour le compte de combats quotidiens, sans effet sur un combat simul\xE9.\n    { fightsLeft: 0, lastFight: null, ...brute },\n    choice\n  );\n\n  // src/engine/career.ts\n  var rollout = (brute, levels) => {\n    let current = brute;\n    for (let i = 0; i < levels; i += 1) {\n      const choices = getLevelUpChoices(current);\n      const choice = choices[Math.random() < 0.5 ? 0 : 1];\n      if (!choice) break;\n      current = applyChoice(current, choice);\n    }\n    return current;\n  };\n\n  // src/odds/rollout.ts\n  var seedOf2 = (input) => hashSeed([\n    input.brute.id,\n    input.brute.level,\n    input.brute.skills.join(","),\n    input.brute.weapons.join(","),\n    input.references.map((r) => r.id).sort().join(","),\n    `carri\\xE8re${input.levels}x${input.trajectories}x${input.round ?? 0}`\n  ].join("|"));\n  var careerValue = (input, sim = simulateOnce) => withFastClone(() => withSeededRandom(seedOf2(input), () => {\n    let wins = 0;\n    let samples = 0;\n    let turnsTotal = 0;\n    let hpLeftTotalOnWin = 0;\n    if (!input.references.length) {\n      return summarize({\n        wins: 0,\n        samples: 0,\n        turnsTotal: 0,\n        hpLeftTotalOnWin: 0,\n        approximate: true\n      });\n    }\n    for (let t = 0; t < input.trajectories; t += 1) {\n      const future = rollout(input.brute, input.levels);\n      for (let f = 0; f < input.fightsPerTrajectory; f += 1) {\n        const opponent = input.references[f % input.references.length];\n        const outcome = sim(future, opponent, input.modifiers, {});\n        samples += 1;\n        turnsTotal += outcome.turns;\n        if (outcome.result === "win") {\n          wins += 1;\n          hpLeftTotalOnWin += outcome.hpLeft;\n        }\n      }\n    }\n    return summarize({\n      wins,\n      samples,\n      turnsTotal,\n      hpLeftTotalOnWin,\n      approximate: false\n    });\n  }));\n\n  // src/odds/config.ts\n  var FIRST_PASS = 1500;\n\n  // src/worker/protocol.ts\n  var handleRequest = (req, sim) => {\n    try {\n      return {\n        id: req.id,\n        estimation: req.kind === "career" ? careerValue(req.input, sim) : estimate(req.input, req.samples ?? FIRST_PASS, sim)\n      };\n    } catch (error) {\n      return { id: req.id, error: error instanceof Error ? error.message : String(error) };\n    }\n  };\n\n  // src/worker/worker.ts\n  self.onmessage = (event) => {\n    self.postMessage(handleRequest(event.data));\n  };\n})();\n/*! Bundled license information:\n\ndecimal.js/decimal.mjs:\n  (*!\n   *  decimal.js v10.5.0\n   *  An arbitrary-precision Decimal type for JavaScript.\n   *  https://github.com/MikeMcl/decimal.js\n   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>\n   *  MIT Licence\n   *)\n*/\n'], { type: "application/javascript" })
  ));
  var pool;
  var run = (request) => {
    pool ??= createPool(
      poolSize(navigator.hardwareConcurrency, OPPONENTS_PER_ARENA),
      spawn
    );
    return pool.run(request);
  };
  var calibration = createCalibrationLog(localStorage);
  var opponents2 = createOpponentPool(localStorage);
  var onArena = createArenaHandler({
    getBrute: (name) => store.getBrute(name),
    getOpponents: (name) => store.getOpponents(name),
    getModifiers: () => store.getModifiers(),
    getOwnBrutes: () => store.getOwnBrutes(),
    fetchProfileBrutes,
    run,
    render: renderOdds,
    renderBest,
    onPrediction: calibration.remember
  });
  var onLevelUp = createAdvisor({
    getBrute: (name) => store.getBrute(name),
    getOpponents: (name) => store.getOpponents(name),
    getModifiers: () => store.getModifiers(),
    sampleOpponents: opponents2.sample,
    run,
    render: renderAdvice
  });
  installInterceptor({
    onArena: (bruteName) => {
      opponents2.remember(store.getOpponents(bruteName) ?? []);
      void onArena(bruteName);
    },
    onLevelUpChoices: (bruteName, choices) => {
      void onLevelUp(bruteName, choices);
    },
    onFight: (fight) => {
      const recorded = calibration.record(fight);
      if (!recorded) return;
      console.info(
        `brute-odds : annonc\xE9 ${Math.round(recorded.predicted * 100)} %, r\xE9sultat ${recorded.won ? "victoire" : "d\xE9faite"}. bruteOdds.calibration() pour le bilan.`
      );
    }
  });
  window.bruteOdds = {
    calibration: () => calibration.report(),
    records: () => calibration.records(),
    reset: () => calibration.reset(),
    // Le vivier : de combien d'adversaires réels le conseil dispose.
    pool: () => opponents2.size(),
    forgetPool: () => opponents2.reset()
  };
})();
/*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.5.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
