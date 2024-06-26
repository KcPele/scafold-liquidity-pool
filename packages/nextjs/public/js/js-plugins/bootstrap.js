/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * -------------------------------------------------------------------------*/

if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (t) {
  "use strict";
  var e = t.fn.jquery.split(" ")[0].split(".");
  if ((e[0] < 2 && e[1] < 9) || (1 == e[0] && 9 == e[1] && e[2] < 1) || e[0] > 3)
    throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
})(jQuery),
  +(function (t) {
    "use strict";

    function e(e) {
      var a,
        s = e.attr("data-target") || ((a = e.attr("href")) && a.replace(/.*(?=#[^\s]+$)/, ""));
      return t(s);
    }

    function a(e) {
      return this.each(function () {
        var a = t(this),
          i = a.data("bs.collapse"),
          n = t.extend({}, s.DEFAULTS, a.data(), "object" == typeof e && e);
        !i && n.toggle && /show|hide/.test(e) && (n.toggle = !1),
          i || a.data("bs.collapse", (i = new s(this, n))),
          "string" == typeof e && i[e]();
      });
    }
    var s = function (e, a) {
      (this.$element = t(e)),
        (this.options = t.extend({}, s.DEFAULTS, a)),
        (this.$trigger = t(
          '[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]',
        )),
        (this.transitioning = null),
        this.options.parent
          ? (this.$parent = this.getParent())
          : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    (s.VERSION = "3.3.7"),
      (s.TRANSITION_DURATION = 350),
      (s.DEFAULTS = {
        toggle: !0,
      }),
      (s.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height";
      }),
      (s.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var e,
            i = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
          if (!(i && i.length && ((e = i.data("bs.collapse")), e && e.transitioning))) {
            var n = t.Event("show.bs.collapse");
            if ((this.$element.trigger(n), !n.isDefaultPrevented())) {
              i && i.length && (a.call(i, "hide"), e || i.data("bs.collapse", null));
              var r = this.dimension();
              this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0),
                this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
                (this.transitioning = 1);
              var l = function () {
                this.$element.removeClass("collapsing").addClass("collapse in")[r](""),
                  (this.transitioning = 0),
                  this.$element.trigger("shown.bs.collapse");
              };
              if (!t.support.transition) return l.call(this);
              var o = t.camelCase(["scroll", r].join("-"));
              this.$element
                .one("bsTransitionEnd", t.proxy(l, this))
                .emulateTransitionEnd(s.TRANSITION_DURATION)
                [r](this.$element[0][o]);
            }
          }
        }
      }),
      (s.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var e = t.Event("hide.bs.collapse");
          if ((this.$element.trigger(e), !e.isDefaultPrevented())) {
            var a = this.dimension();
            this.$element[a](this.$element[a]())[0].offsetHeight,
              this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1),
              this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
              (this.transitioning = 1);
            var i = function () {
              (this.transitioning = 0),
                this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
            };
            return t.support.transition
              ? void this.$element[a](0)
                  .one("bsTransitionEnd", t.proxy(i, this))
                  .emulateTransitionEnd(s.TRANSITION_DURATION)
              : i.call(this);
          }
        }
      }),
      (s.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      }),
      (s.prototype.getParent = function () {
        return t(this.options.parent)
          .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
          .each(
            t.proxy(function (a, s) {
              var i = t(s);
              this.addAriaAndCollapsedClass(e(i), i);
            }, this),
          )
          .end();
      }),
      (s.prototype.addAriaAndCollapsedClass = function (t, e) {
        var a = t.hasClass("in");
        t.attr("aria-expanded", a), e.toggleClass("collapsed", !a).attr("aria-expanded", a);
      });
    var i = t.fn.collapse;
    (t.fn.collapse = a),
      (t.fn.collapse.Constructor = s),
      (t.fn.collapse.noConflict = function () {
        return (t.fn.collapse = i), this;
      }),
      t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (s) {
        var i = t(this);
        i.attr("data-target") || s.preventDefault();
        var n = e(i),
          r = n.data("bs.collapse"),
          l = r ? "toggle" : i.data();
        a.call(n, l);
      });
  })(jQuery);

if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (n) {
  "use strict";
  var t = n.fn.jquery.split(" ")[0].split(".");
  if ((t[0] < 2 && t[1] < 9) || (1 == t[0] && 9 == t[1] && t[2] < 1) || t[0] > 3)
    throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
})(jQuery),
  +(function (n) {
    "use strict";

    function t() {
      var n = document.createElement("bootstrap"),
        t = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        };
      for (var i in t)
        if (void 0 !== n.style[i])
          return {
            end: t[i],
          };
      return !1;
    }
    (n.fn.emulateTransitionEnd = function (t) {
      var i = !1,
        r = this;
      n(this).one("bsTransitionEnd", function () {
        i = !0;
      });
      var e = function () {
        i || n(r).trigger(n.support.transition.end);
      };
      return setTimeout(e, t), this;
    }),
      n(function () {
        (n.support.transition = t()),
          n.support.transition &&
            (n.event.special.bsTransitionEnd = {
              bindType: n.support.transition.end,
              delegateType: n.support.transition.end,
              handle: function (t) {
                return n(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : void 0;
              },
            });
      });
  })(jQuery);

if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (t) {
  "use strict";
  var e = t.fn.jquery.split(" ")[0].split(".");
  if ((e[0] < 2 && e[1] < 9) || (1 == e[0] && 9 == e[1] && e[2] < 1) || e[0] > 3)
    throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
})(jQuery),
  +(function (t) {
    "use strict";

    function e(e) {
      return this.each(function () {
        var n = t(this),
          r = n.data("bs.tab");
        r || n.data("bs.tab", (r = new a(this))), "string" == typeof e && r[e]();
      });
    }
    var a = function (e) {
      this.element = t(e);
    };
    (a.VERSION = "3.3.7"),
      (a.TRANSITION_DURATION = 150),
      (a.prototype.show = function () {
        var e = this.element,
          a = e.closest("ul:not(.dropdown-menu)"),
          n = e.data("target");
        if (
          (n || ((n = e.attr("href")), (n = n && n.replace(/.*(?=#[^\s]*$)/, ""))), !e.parent("li").hasClass("active"))
        ) {
          var r = a.find(".active:last a"),
            i = t.Event("hide.bs.tab", {
              relatedTarget: e[0],
            }),
            s = t.Event("show.bs.tab", {
              relatedTarget: r[0],
            });
          if ((r.trigger(i), e.trigger(s), !s.isDefaultPrevented() && !i.isDefaultPrevented())) {
            var o = t(n);
            this.activate(e.closest("li"), a),
              this.activate(o, o.parent(), function () {
                r.trigger({
                  type: "hidden.bs.tab",
                  relatedTarget: e[0],
                }),
                  e.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: r[0],
                  });
              });
          }
        }
      }),
      (a.prototype.activate = function (e, n, r) {
        function i() {
          s
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active")
            .end()
            .find('[data-toggle="tab"]')
            .attr("aria-expanded", !1),
            e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0),
            o ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"),
            e.parent(".dropdown-menu").length &&
              e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0),
            r && r();
        }
        var s = n.find("> .active"),
          o = r && t.support.transition && ((s.length && s.hasClass("fade")) || !!n.find("> .fade").length);
        s.length && o ? s.one("bsTransitionEnd", i).emulateTransitionEnd(a.TRANSITION_DURATION) : i(),
          s.removeClass("in");
      });
    var n = t.fn.tab;
    (t.fn.tab = e),
      (t.fn.tab.Constructor = a),
      (t.fn.tab.noConflict = function () {
        return (t.fn.tab = n), this;
      });
    var r = function (a) {
      a.preventDefault(), e.call(t(this), "show");
    };
    t(document)
      .on("click.bs.tab.data-api", '[data-toggle="tab"]', r)
      .on("click.bs.tab.data-api", '[data-toggle="pill"]', r);
  })(jQuery);
