import { effectScope as ie, computed as w, ref as p, onMounted as F, onBeforeUnmount as U, defineComponent as oe, unref as b, openBlock as R, createElementBlock as X, normalizeStyle as ee, Fragment as se, renderList as ae, createCommentVNode as ue, createBlock as ce, resolveDynamicComponent as ve, markRaw as de } from "vue";
let te = !1, Y;
const M = () => (te || (Y = ie(!0).run(() => ({
  /** Whether any drag operation is currently active */
  isDragging: w(
    () => Y.draggingElements.value.length > 0
  ),
  /** Active container where dragging occurs */
  activeContainer: {
    /** Component instance of active container */
    component: p(null),
    /** DOM reference of active container */
    ref: p(null)
  },
  /** All registered draggable elements */
  elements: p([]),
  /** Elements currently being dragged */
  draggingElements: p([]),
  /** Elements currently selected (for multi-drag) */
  selectedElements: p([]),
  /** All registered drop zones */
  zones: p([]),
  /** Current hover states */
  hovered: {
    /** Currently hovered drop zone */
    zone: p(null),
    /** Currently hovered draggable element */
    element: p(null)
  },
  /** Pointer position tracking */
  pointerPosition: {
    /** Current pointer coordinates */
    current: p(null),
    /** Initial coordinates when drag started */
    start: p(null),
    /** Offset from start position */
    offset: {
      /** Offset as percentage of container */
      percent: p(null),
      /** Offset in pixels */
      pixel: p(null)
    }
  }
})), te = !0), Y), ge = () => {
  const t = p(null), { draggingElements: e, pointerPosition: a, isDragging: u, activeContainer: c } = M();
  return F(() => {
    c.ref = t;
  }), U(() => {
    c.ref.value = null;
  }), {
    elementRef: t,
    draggingElements: e,
    pointerPosition: a,
    isDragging: u
  };
}, he = ["innerHTML"], fe = /* @__PURE__ */ oe({
  __name: "DefaultOverlay",
  setup(t) {
    const { elementRef: e, pointerPosition: a, isDragging: u, draggingElements: c } = ge(), n = w(() => {
      var i, h, f, y;
      return {
        transform: `translate3d(${(((i = a.current.value) == null ? void 0 : i.x) ?? 0) - (((h = a.offset.pixel.value) == null ? void 0 : h.x) ?? 0)}px, ${(((f = a.current.value) == null ? void 0 : f.y) ?? 0) - (((y = a.offset.pixel.value) == null ? void 0 : y.y) ?? 0)}px, 0)`,
        zIndex: 1e3,
        position: "fixed",
        top: 0,
        left: 0,
        transition: "0.3s cubic-bezier(0.165, 0.84, 0.44, 1)"
      };
    });
    return (i, h) => b(u) ? (R(), X("div", {
      key: 0,
      ref_key: "elementRef",
      ref: e,
      style: ee(n.value)
    }, [
      (R(!0), X(se, null, ae(b(c), (f, y) => {
        var l, E;
        return R(), X("div", {
          key: y,
          innerHTML: f.initialHTML,
          style: ee({
            width: `${(l = f.initialRect) == null ? void 0 : l.width}px`,
            height: `${(E = f.initialRect) == null ? void 0 : E.height}px`
          })
        }, null, 12, he);
      }), 128))
    ], 4)) : ue("", !0);
  }
}), Le = /* @__PURE__ */ oe({
  __name: "DragOverlay",
  setup(t) {
    const { activeContainer: e } = M(), a = w(
      () => e.component.value ?? fe
    );
    return (u, c) => (R(), ce(ve(a.value)));
  }
}), me = "data-dnd-draggable", pe = (t) => {
  const {
    elements: e,
    draggingElements: a,
    hovered: u,
    selectedElements: c,
    isDragging: n
  } = M(), i = p(null), h = w(
    () => {
      var m;
      return ((m = u.element.value) == null ? void 0 : m.node) === i.value;
    }
  ), f = w(
    () => a.value.some((m) => m.node === i.value)
  ), y = w(() => {
    if (!i.value || !n.value)
      return !1;
    const m = e.value.find(
      (D) => D.node === i.value
    );
    return m != null && m.groups.length ? !a.value.some((D) => D.groups.length ? !D.groups.some(
      (r) => m.groups.includes(r)
    ) : !1) : !0;
  });
  return {
    elementRef: i,
    registerElement: () => {
      if (!i.value)
        throw new Error("ElementRef is not set");
      e.value.push({
        node: i.value,
        groups: (t == null ? void 0 : t.groups) ?? [],
        layer: (t == null ? void 0 : t.layer) ?? null,
        defaultLayer: (t == null ? void 0 : t.layer) ?? null,
        events: (t == null ? void 0 : t.events) ?? {},
        data: (t == null ? void 0 : t.data) ?? void 0
      }), i.value.setAttribute(me, "true");
    },
    unregisterElement: () => {
      const m = e.value.findIndex(
        (r) => r.node === i.value
      );
      m !== -1 && e.value.splice(m, 1);
      const D = c.value.findIndex(
        (r) => r.node === i.value
      );
      D !== -1 && c.value.splice(D, 1);
    },
    isDragging: f,
    isOvered: h,
    isAllowed: y
  };
}, ye = () => {
  let t = "", e = "", a = "";
  const u = () => {
    const i = document.body;
    t = i.style.userSelect, e = i.style.touchAction, a = i.style.overscrollBehavior, i.style.userSelect = "none", i.style.touchAction = "none", i.style.overscrollBehavior = "none", window.addEventListener("contextmenu", n), window.addEventListener("selectstart", n), window.addEventListener("touchstart", n), window.addEventListener("touchmove", n);
  }, c = () => {
    const i = document.body;
    i.style.userSelect = t, i.style.touchAction = e, i.style.overscrollBehavior = a, window.removeEventListener("contextmenu", n), window.removeEventListener("selectstart", n), window.removeEventListener("touchstart", n), window.removeEventListener("touchmove", n);
  }, n = (i) => i.preventDefault();
  return {
    disableInteractions: u,
    enableInteractions: c
  };
}, ne = (t, e) => t.x < e.x + e.width && t.x + t.width > e.x && t.y < e.y + e.height && t.y + t.height > e.y, z = (t) => {
  if (!t)
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
  const e = t.getBoundingClientRect();
  return {
    bottom: e.bottom,
    left: e.left,
    right: e.right,
    top: e.top,
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height
  };
}, $ = (t) => ({
  x: t.x + t.width / 2,
  y: t.y + t.height / 2
}), Ee = (t, e) => {
  const a = z(t);
  return {
    pixel: {
      x: e.x - a.x,
      y: e.y - a.y
    },
    percent: {
      x: (e.x - a.x) / a.width * 100,
      y: (e.y - a.y) / a.height * 100
    }
  };
}, re = (t, e) => {
  const a = e.x - t.x, u = e.y - t.y;
  return Math.sqrt(a * a + u * u);
}, C = (t, e) => t ? e.contains(t) : !1, Pe = (t) => {
  const e = M();
  return {
    onPointerStart: (n) => {
      e.pointerPosition.start.value = { x: n.clientX, y: n.clientY }, e.pointerPosition.current.value = {
        x: n.clientX,
        y: n.clientY
      };
      const { pixel: i, percent: h } = Ee(t.value, {
        x: n.clientX,
        y: n.clientY
      });
      e.pointerPosition.offset.pixel.value = i, e.pointerPosition.offset.percent.value = h;
    },
    onPointerMove: (n) => {
      e.pointerPosition.current.value = {
        x: n.clientX,
        y: n.clientY
      };
    },
    onPointerEnd: () => {
      e.pointerPosition.current.value = null, e.pointerPosition.start.value = null, e.pointerPosition.offset.pixel.value = null, e.pointerPosition.offset.percent.value = null;
    }
  };
}, we = (t) => {
  const e = M(), { onPointerStart: a, onPointerMove: u, onPointerEnd: c } = Pe(t);
  let n = null;
  const i = (r) => {
    var v, L;
    const d = e.selectedElements.value.some(
      (P) => P.node === r
    );
    if (e.selectedElements.value.length && d)
      return e.selectedElements.value.map((P) => {
        var S, T;
        return {
          ...P,
          initialHTML: ((S = P.node) == null ? void 0 : S.outerHTML) ?? "",
          initialRect: (T = P.node) == null ? void 0 : T.getBoundingClientRect()
        };
      });
    e.selectedElements.value = [];
    const g = e.elements.value.find(
      (P) => P.node === r
    );
    return g ? [
      {
        ...g,
        initialHTML: ((v = g.node) == null ? void 0 : v.outerHTML) ?? "",
        initialRect: (L = g.node) == null ? void 0 : L.getBoundingClientRect()
      }
    ] : [];
  }, h = (r, d) => {
    const g = Math.max(
      0,
      Math.min(r.x + r.width, d.x + d.width) - Math.max(r.x, d.x)
    ), v = Math.max(
      0,
      Math.min(r.y + r.height, d.y + d.height) - Math.max(r.y, d.y)
    ), L = g * v, P = r.width * r.height, S = d.width * d.height;
    return (L / P * 100 + L / S * 100) / 2;
  }, f = () => {
    var q, N, B, V, j, G, J, K, Q, W;
    const r = z(e.activeContainer.ref.value), d = $(r), g = ((q = e.pointerPosition.current.value) == null ? void 0 : q.x) ?? 0, v = ((N = e.pointerPosition.current.value) == null ? void 0 : N.y) ?? 0, P = !(r && g >= r.x && g <= r.x + r.width && v >= r.y && v <= r.y + r.height), S = e.draggingElements.value.map((o) => o.node), T = e.elements.value.filter((o) => {
      if (!o.node || S.some(
        (x) => x && C(o.node, x)
      ) || o.groups.length && !!e.draggingElements.value.some(
        (I) => I.groups.length ? !I.groups.some(
          (_) => o.groups.includes(_)
        ) : !1
      ))
        return !1;
      const s = z(o.node);
      return s && r && ne(s, r);
    }).map((o) => {
      const s = z(o.node), x = $(s), I = g >= s.x && g <= s.x + s.width && v >= s.y && v <= s.y + s.height, _ = h(s, r), Z = re(d, x), A = e.elements.value.filter(
        (O) => O !== o && O.node && o.node && C(
          o.node,
          O.node
        )
      ).length;
      return {
        element: o,
        isPointerInElement: I,
        overlapPercent: _,
        depth: A,
        centerDistance: Z
      };
    }).sort((o, s) => {
      if (!P) {
        if (o.isPointerInElement && s.isPointerInElement)
          return s.depth - o.depth;
        if (o.isPointerInElement !== s.isPointerInElement)
          return o.isPointerInElement ? -1 : 1;
      }
      return Math.abs(o.overlapPercent - s.overlapPercent) <= 1 ? o.centerDistance - s.centerDistance : s.overlapPercent - o.overlapPercent;
    }), le = e.zones.value.filter((o) => {
      if (!o.node || S.some(
        (x) => x && C(o.node, x)
      ) || o.groups.length && !!e.draggingElements.value.some((I) => I.groups.length ? !I.groups.some((_) => o.groups.includes(_)) : !1))
        return !1;
      const s = z(o.node);
      return s && r && ne(s, r);
    }).map((o) => {
      const s = z(o.node), x = $(s), I = g >= s.x && g <= s.x + s.width && v >= s.y && v <= s.y + s.height, _ = h(s, r), Z = re(d, x), A = e.zones.value.filter(
        (O) => O !== o && O.node && o.node && C(o.node, O.node)
      ).length;
      return {
        zone: o,
        isPointerInElement: I,
        overlapPercent: _,
        depth: A,
        centerDistance: Z
      };
    }).sort((o, s) => {
      if (!P) {
        if (o.isPointerInElement && s.isPointerInElement)
          return s.depth - o.depth;
        if (o.isPointerInElement !== s.isPointerInElement)
          return o.isPointerInElement ? -1 : 1;
      }
      return Math.abs(o.overlapPercent - s.overlapPercent) <= 1 ? o.centerDistance - s.centerDistance : s.overlapPercent - o.overlapPercent;
    }), k = e.hovered.element.value, H = e.hovered.zone.value;
    e.hovered.element.value = ((B = T[0]) == null ? void 0 : B.element) ?? null, e.hovered.zone.value = ((V = le[0]) == null ? void 0 : V.zone) ?? null, e.hovered.element.value !== k && ((j = k == null ? void 0 : k.events) != null && j.onLeave && k.events.onLeave(e), (J = (G = e.hovered.element.value) == null ? void 0 : G.events) != null && J.onHover && e.hovered.element.value.events.onHover(e)), e.hovered.zone.value !== H && ((K = H == null ? void 0 : H.events) != null && K.onLeave && H.events.onLeave(e), (W = (Q = e.hovered.zone.value) == null ? void 0 : Q.events) != null && W.onHover && e.hovered.zone.value.events.onHover(e)), n = requestAnimationFrame(f);
  }, y = () => {
    f();
  }, l = () => {
    n !== null && (cancelAnimationFrame(n), n = null);
  };
  return {
    activate: (r) => {
      e.draggingElements.value = i(t.value), a(r), y();
    },
    track: (r) => {
      u(r);
    },
    deactivate: () => {
      var r, d;
      c(), e.hovered.zone.value ? (d = (r = e.hovered.zone.value.events).onDrop) == null || d.call(r, e) : e.draggingElements.value.forEach(
        (g) => {
          var v, L;
          return (L = (v = g.events).onEnd) == null ? void 0 : L.call(v, e);
        }
      ), e.draggingElements.value = [], e.selectedElements.value = [], e.hovered.zone.value = null, e.hovered.element.value = null, l();
    }
  };
}, Ie = (t) => {
  const {
    elementRef: e,
    registerElement: a,
    unregisterElement: u,
    isDragging: c,
    isOvered: n,
    isAllowed: i
  } = pe(t), { disableInteractions: h, enableInteractions: f } = ye(), y = M(), { activate: l, track: E, deactivate: m } = we(e), D = (v) => {
    t != null && t.container && (y.activeContainer.component.value = de(t.container)), h(), l(v), document.addEventListener("pointermove", r), document.addEventListener("pointerup", g), document.addEventListener("wheel", d);
  }, r = (v) => {
    E(v);
  }, d = (v) => {
    E(v);
  }, g = () => {
    y.activeContainer.component.value = null, f(), m(), document.removeEventListener("pointermove", r), document.removeEventListener("pointerup", g), document.removeEventListener("wheel", d);
  };
  return F(a), U(u), {
    pointerPosition: y.pointerPosition,
    elementRef: e,
    isDragging: c,
    isOvered: n,
    isAllowed: i,
    handleDragStart: D
  };
}, xe = (t) => {
  const { zones: e, hovered: a, draggingElements: u, isDragging: c } = M(), n = p(null), i = w(() => {
    var l;
    return ((l = a.zone.value) == null ? void 0 : l.node) === n.value;
  }), h = w(() => {
    if (!n.value || !c.value)
      return !1;
    const l = e.value.find(
      (E) => E.node === n.value
    );
    return l != null && l.groups.length ? !u.value.some((E) => E.groups.length ? !E.groups.some(
      (m) => l.groups.includes(m)
    ) : !1) : !0;
  });
  return { elementRef: n, registerZone: () => {
    if (!n.value)
      throw new Error("elementRef is not set");
    e.value.push({
      node: n.value,
      groups: (t == null ? void 0 : t.groups) ?? [],
      events: (t == null ? void 0 : t.events) ?? {},
      data: (t == null ? void 0 : t.data) ?? void 0
    }), n.value.setAttribute("data-dnd-droppable", "true");
  }, unregisterZone: () => {
    if (!n.value)
      throw new Error("elementRef is not set");
    const l = e.value.findIndex(
      (E) => E.node === n.value
    );
    l !== -1 && e.value.splice(l, 1);
  }, isOvered: i, isAllowed: h };
}, Ce = (t) => {
  const { elementRef: e, registerZone: a, unregisterZone: u, isOvered: c, isAllowed: n } = xe(t);
  return F(a), U(u), { elementRef: e, isOvered: c, isAllowed: n };
}, Me = (t) => {
  const { selectedElements: e, elements: a } = M(), u = w(
    () => a.value.find((l) => l.node === t.value)
  ), c = w(
    () => e.value.some((l) => l.node === t.value)
  ), n = w(() => t.value ? e.value.some(
    (l) => l.node && C(
      l.node,
      t.value
    )
  ) : !1), i = w(() => t.value ? e.value.some(
    (l) => l.node && C(
      t.value,
      l.node
    )
  ) : !1), h = () => {
    u.value && (e.value = e.value.filter(
      (l) => l.node !== t.value
    ));
  }, f = () => {
    u.value && (n.value && (e.value = e.value.filter(
      (l) => l.node && !C(
        l.node,
        t.value
      )
    )), i.value && (e.value = e.value.filter(
      (l) => l.node && !C(
        t.value,
        l.node
      )
    )), e.value.push(u.value));
  };
  return {
    handleUnselect: h,
    handleSelect: f,
    handleToggleSelect: () => {
      u.value && (e.value.some((l) => l.node === t.value) ? h() : f());
    },
    isSelected: c,
    isParentOfSelected: n
  };
};
export {
  Le as DragOverlay,
  M as useDnDStore,
  Ie as useDraggable,
  Ce as useDroppable,
  Me as useSelection
};
