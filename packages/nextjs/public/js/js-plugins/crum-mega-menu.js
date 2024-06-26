(function ($) {
  jQuery.fn.crumegamenu = function (options) {
    var settings;
    $.extend(
      (settings = {
        showDelay: 100,
        hideDelay: 100,
        effect: "fade",
        align: "left",
        responsive: true,
        indentChildren: true,
        scrollable: true,
        scrollableMaxHeight: 460,
      }),
      options,
    );

    // variables
    var menu_container = $(this);
    var menu = $(menu_container).children(".primary-menu-menu");
    var menu_li = $(menu).find("li");
    var showHideButton;
    var mobileWidthBase = 1023;
    var bigScreenFlag = 2000; // a number greater than "mobileWidthBase"
    var smallScreenFlag = 200; // a number less than "mobileWidthBase"

    // sub-menu/megamenu indicators
    $(menu)
      .children("li")
      .children("a")
      .each(function () {
        if ($(this).siblings(".sub-menu, .megamenu").length > 0) {
          $(this).append("<span class='indicator'>" + settings.indicatorFirstLevel + "</span>");
        }
      });
    $(menu)
      .children("li")
      .children(".megamenu")
      .each(function () {
        $(this).find("ul").removeClass("sub-menu");
      });
    $(menu)
      .find(".sub-menu")
      .children("li")
      .children("a")
      .each(function () {
        if ($(this).siblings(".sub-menu").length > 0) {
          $(this).append("<span class='indicator'>" + settings.indicatorSecondLevel + "</span>");
        }
      });

    // sub-menu indentation (mobile mode)
    if (settings.indentChildren) {
      $(menu).addClass("primary-menu-indented");
    }

    // responsive behavior
    if (settings.responsive) {
      $(menu_container).addClass("primary-menu-responsive");
      showHideButton = $(menu_container).children(".showhide");
    }

    // scrollable menu
    if (settings.scrollable) {
      if (settings.responsive) {
        $(menu)
          .css("max-height", settings.scrollableMaxHeight)
          .addClass("scrollable")
          .append("<li class='scrollable-fix'></li>");
      }
    }

    // shows a sub-menu
    function showDropdown(item) {
      if (settings.animation === "fade") {
        $(item)
          .children(".sub-menu, .megamenu")
          .stop(true, true)
          .delay(settings.showDelay)
          .fadeIn(settings.showSpeed)
          .addClass(settings.animation)
          .addClass("in");
      } else {
        $(item)
          .children(".sub-menu, .megamenu")
          .stop(true, true)
          .delay(settings.showDelay)
          .slideDown(settings.showSpeed)
          .addClass(settings.animation);
      }
    }

    // hides a sub-menu
    function hideDropdown(item) {
      if (settings.animation === "fade") {
        $(item)
          .children(".sub-menu, .megamenu")
          .stop(true, true)
          .delay(settings.hideDelay)
          .fadeOut(settings.hideSpeed)
          .removeClass(settings.animation)
          .removeClass("in");
      } else {
        $(item)
          .children(".sub-menu, .megamenu")
          .stop(true, true)
          .delay(settings.hideDelay)
          .fadeOut(settings.hideSpeed)
          .removeClass(settings.animation);
      }
      $(item)
        .children(".sub-menu, .megamenu")
        .stop(true, true)
        .delay(settings.hideDelay)
        .slideUp(settings.hideSpeed)
        .removeClass(settings.animation);
    }

    // landscape mode
    function landscapeMode() {
      $(menu).find(".sub-menu, .megamenu").hide(0);
      if (navigator.userAgent.match(/Mobi/i) || window.navigator.msMaxTouchPoints > 0 || settings.trigger == "click") {
        $(".primary-menu-menu > li > a, .primary-menu-menu ul.sub-menu li a").bind("click touchstart", function (e) {
          e.stopPropagation();
          e.preventDefault();
          $(this).parent("li").siblings("li").find(".sub-menu, .megamenu").stop(true, true).fadeOut(300);
          if ($(this).siblings(".sub-menu, .megamenu").css("display") == "block") {
            showDropdown($(this).parent("li"));
            return false;
          } else {
            hideDropdown($(this).parent("li"));
          }
          window.location.href = $(this).attr("href");
        });
        $(document).bind("click.menu touchstart.menu", function (ev) {
          if ($(ev.target).closest(".primary-menu").length == 0) {
            $(".primary-menu-menu").find(".sub-menu, .megamenu").fadeOut(300);
          }
        });
      } else {
        $(menu_li)
          .bind("mouseenter", function () {
            showDropdown(this);
          })
          .bind("mouseleave", function () {
            hideDropdown(this);
          });
      }
    }

    // portrait mode
    function portraitMode() {
      $(menu).find(".sub-menu, .megamenu").hide(0);
      $(menu)
        .find(".indicator")
        .each(function () {
          if ($(this).parent("a").siblings(".sub-menu, .megamenu").length > 0) {
            $(this).bind("click", function (e) {
              $(menu).scrollTo(
                {
                  top: 45,
                  left: 0,
                },
                600,
              );
              if ($(this).parent().prop("tagName") == "A") {
                e.preventDefault();
              }
              if ($(this).parent("a").siblings(".sub-menu, .megamenu").css("display") == "none") {
                $(this)
                  .parent("a")
                  .siblings(".sub-menu, .megamenu")
                  .delay(settings.showDelay)
                  .slideDown(settings.showSpeed);
                $(this)
                  .parent("a")
                  .parent("li")
                  .siblings("li")
                  .find(".sub-menu, .megamenu")
                  .slideUp(settings.hideSpeed);
              } else {
                $(this).parent("a").siblings(".sub-menu, .megamenu").slideUp(settings.hideSpeed);
              }
            });
          }
        });
    }

    // Fix the submenu on the right side
    function fixSubmenuRight() {
      var submenus = $(menu).children("li").find(".sub-menu");

      if ($(window).innerWidth() > mobileWidthBase) {
        var menu_width = $("body").outerWidth(true);

        for (var i = 0; i < submenus.length; i++) {
          var submenusPosition = $(submenus[i]).css("display", "block").offset().left;

          if ($(submenus[i]).outerWidth() + submenusPosition > menu_width) {
            $(submenus[i]).addClass("sub-menu-left");
          } else {
            if (menu_width == $(submenus[i]).outerWidth() || menu_width - $(submenus[i]).outerWidth() < 20) {
              $(submenus[i]).addClass("sub-menu-left");
            }
            if (submenusPosition + $(submenus[i]).outerWidth() < menu_width) {
              $(submenus[i]).addClass("sub-menu-right");
            }
          }
        }

        portraitMode();
      }
    }

    // show the bar to show/hide menu items on mobile
    function showMobileBar() {
      $(menu).hide(0);
      $(showHideButton)
        .show(0)
        .click(function () {
          if ($(menu).css("display") == "none") $(menu).slideDown(settings.showSpeed);
          else $(menu).slideUp(settings.hideSpeed).find(".sub-menu, .megamenu").hide(settings.hideSpeed);
        });
    }

    // hide the bar to show/hide menu items on mobile
    function hideMobileBar() {
      $(menu).show(0).css("display", "inline-block");
      $(showHideButton).hide(0);
    }

    // unbind events
    function unbindEvents() {
      $(menu_container).find("li, a").unbind();
      $(document).unbind("click.menu touchstart.menu");
    }

    // return window's width
    function windowWidth() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }

    // navigation start function
    function startMenu() {
      if (windowWidth() <= mobileWidthBase && bigScreenFlag > mobileWidthBase) {
        unbindEvents();
        if (settings.responsive) {
          showMobileBar();
          portraitMode();
        } else {
          landscapeMode();
        }
      }
      if (windowWidth() > mobileWidthBase && smallScreenFlag <= mobileWidthBase) {
        unbindEvents();
        hideMobileBar();
        landscapeMode();
      }
      bigScreenFlag = windowWidth();
      smallScreenFlag = windowWidth();
      /* IE8 fix */
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent) && windowWidth() < mobileWidthBase) {
        var ieversion = new Number(RegExp.$1);
        if (ieversion == 8) {
          $(showHideButton).hide(0);
          $(menu).show(0).css("display", "inline-block");
          unbindEvents();
          landscapeMode();
        }
      }
    }

    $(window).resize(function () {
      startMenu();
    });

    $(document).ready(function () {
      fixSubmenuRight();
      startMenu();
    });
  };
})(jQuery);

/**
 * jquery.scrollTo
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.13
 */

(function (k) {
  "use strict";
  k(["jquery"], function ($) {
    var j = ($.scrollTo = function (a, b, c) {
      return $(window).scrollTo(a, b, c);
    });
    j.defaults = {
      axis: "xy",
      duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
      limit: !0,
    };
    j.window = function (a) {
      return $(window)._scrollable();
    };
    $.fn._scrollable = function () {
      return this.map(function () {
        var a = this,
          isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
        if (!isWin) return a;
        var b = (a.contentWindow || a).document || a.ownerDocument || a;
        return /webkit/i.test(navigator.userAgent) || b.compatMode == "BackCompat" ? b.body : b.documentElement;
      });
    };
    $.fn.scrollTo = function (f, g, h) {
      if (typeof g == "object") {
        h = g;
        g = 0;
      }
      if (typeof h == "function")
        h = {
          onAfter: h,
        };
      if (f == "max") f = 9e9;
      h = $.extend({}, j.defaults, h);
      g = g || h.duration;
      h.queue = h.queue && h.axis.length > 1;
      if (h.queue) g /= 2;
      h.offset = both(h.offset);
      h.over = both(h.over);
      return this._scrollable()
        .each(function () {
          if (f == null) return;
          var d = this,
            $elem = $(d),
            targ = f,
            toff,
            attr = {},
            win = $elem.is("html,body");
          switch (typeof targ) {
            case "number":
            case "string":
              if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                targ = both(targ);
                break;
              }
              targ = win ? $(targ) : $(targ, this);
              if (!targ.length) return;
            case "object":
              if (targ.is || targ.style) toff = (targ = $(targ)).offset();
          }
          var e = ($.isFunction(h.offset) && h.offset(d, targ)) || h.offset;
          $.each(h.axis.split(""), function (i, a) {
            var b = a == "x" ? "Left" : "Top",
              pos = b.toLowerCase(),
              key = "scroll" + b,
              old = d[key],
              max = j.max(d, a);
            if (toff) {
              attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
              if (h.margin) {
                attr[key] -= parseInt(targ.css("margin" + b)) || 0;
                attr[key] -= parseInt(targ.css("border" + b + "Width")) || 0;
              }
              attr[key] += e[pos] || 0;
              if (h.over[pos]) attr[key] += targ[a == "x" ? "width" : "height"]() * h.over[pos];
            } else {
              var c = targ[pos];
              attr[key] = c.slice && c.slice(-1) == "%" ? (parseFloat(c) / 100) * max : c;
            }
            if (h.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
            if (!i && h.queue) {
              if (old != attr[key]) animate(h.onAfterFirst);
              delete attr[key];
            }
          });
          animate(h.onAfter);

          function animate(a) {
            $elem.animate(
              attr,
              g,
              h.easing,
              a &&
                function () {
                  a.call(this, targ, h);
                },
            );
          }
        })
        .end();
    };
    j.max = function (a, b) {
      var c = b == "x" ? "Width" : "Height",
        scroll = "scroll" + c;
      if (!$(a).is("html,body")) return a[scroll] - $(a)[c.toLowerCase()]();
      var d = "client" + c,
        html = a.ownerDocument.documentElement,
        body = a.ownerDocument.body;
      return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d]);
    };

    function both(a) {
      return $.isFunction(a) || typeof a == "object"
        ? a
        : {
            top: a,
            left: a,
          };
    }
    return j;
  });
})(
  typeof define === "function" && define.amd
    ? define
    : function (a, b) {
        if (typeof module !== "undefined" && module.exports) {
          module.exports = b(require("jquery"));
        } else {
          b(jQuery);
        }
      },
);
