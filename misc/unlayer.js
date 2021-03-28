// just un-uglified their code

'use strict';
var unlayer = function(e) {
  /**
   * @param {number} i
   * @return {?}
   */
  function t(i) {
    if (n[i]) {
      return n[i].exports;
    }
    var module = n[i] = {
      i : i,
      l : false,
      exports : {}
    };
    return e[i].call(module.exports, module, module.exports, t), module.l = true, module.exports;
  }
  var n = {};
  return t.m = e, t.c = n, t.d = function(d, name, n) {
    if (!t.o(d, name)) {
      Object.defineProperty(d, name, {
        enumerable : true,
        get : n
      });
    }
  }, t.r = function(o) {
    if ("undefined" != typeof Symbol && Symbol.toStringTag) {
      Object.defineProperty(o, Symbol.toStringTag, {
        value : "Module"
      });
    }
    Object.defineProperty(o, "__esModule", {
      value : true
    });
  }, t.t = function(value, defaultValue) {
    if (1 & defaultValue && (value = t(value)), 8 & defaultValue) {
      return value;
    }
    if (4 & defaultValue && "object" == typeof value && value && value.__esModule) {
      return value;
    }
    /** @type {!Object} */
    var d = Object.create(null);
    if (t.r(d), Object.defineProperty(d, "default", {
      enumerable : true,
      value : value
    }), 2 & defaultValue && "string" != typeof value) {
      var s;
      for (s in value) {
        t.d(d, s, function(subel) {
          return value[subel];
        }.bind(null, s));
      }
    }
    return d;
  }, t.n = function(module) {
    /** @type {function(): ?} */
    var n = module && module.__esModule ? function() {
      return module.default;
    } : function() {
      return module;
    };
    return t.d(n, "a", n), n;
  }, t.o = function(property, object) {
    return Object.prototype.hasOwnProperty.call(property, object);
  }, t.p = "/", t(t.s = 0);
}([function(module, canCreateDiscussions, factory) {
  factory(1);
  factory(2);
  factory(3);
  module.exports = factory(5);
}, function(canCreateDiscussions, isSlidingUp) {
  /** @type {boolean} */
  Window.prototype.forceJURL = false;
  (function(scope) {
    /**
     * @param {string} creationPath
     * @return {?}
     */
    function isRelativeScheme(creationPath) {
      return void 0 !== config[creationPath];
    }
    /**
     * @return {undefined}
     */
    function invalid() {
      clear.call(this);
      /** @type {boolean} */
      this._isInvalid = true;
    }
    /**
     * @param {string} name
     * @return {?}
     */
    function exports(name) {
      return "" == name && invalid.call(this), name.toLowerCase();
    }
    /**
     * @param {string} c
     * @return {?}
     */
    function percentEscape(c) {
      var t = c.charCodeAt(0);
      return t > 32 && t < 127 && -1 == [34, 35, 60, 62, 63, 96].indexOf(t) ? c : encodeURIComponent(c);
    }
    /**
     * @param {string} c
     * @return {?}
     */
    function percentEscapeQuery(c) {
      var t = c.charCodeAt(0);
      return t > 32 && t < 127 && -1 == [34, 35, 60, 62, 96].indexOf(t) ? c : encodeURIComponent(c);
    }
    /**
     * @param {!Object} input
     * @param {string} stateOverride
     * @param {!Object} base
     * @return {undefined}
     */
    function parse(input, stateOverride, base) {
      /**
       * @param {string} str
       * @return {undefined}
       */
      function error(str) {
        shadowStrings.push(str);
      }
      var state = stateOverride || "scheme start";
      /** @type {number} */
      var cursor = 0;
      /** @type {string} */
      var buffer = "";
      /** @type {boolean} */
      var g = false;
      /** @type {boolean} */
      var y = false;
      /** @type {!Array} */
      var shadowStrings = [];
      e: for (; (input[cursor - 1] != EOF || 0 == cursor) && !this._isInvalid;) {
        var c = input[cursor];
        switch(state) {
          case "scheme start":
            if (!c || !ALPHA.test(c)) {
              if (stateOverride) {
                error("Invalid scheme.");
                break e;
              }
              /** @type {string} */
              buffer = "";
              /** @type {string} */
              state = "no scheme";
              continue;
            }
            /** @type {string} */
            buffer = buffer + c.toLowerCase();
            /** @type {string} */
            state = "scheme";
            break;
          case "scheme":
            if (c && matchLetter.test(c)) {
              /** @type {string} */
              buffer = buffer + c.toLowerCase();
            } else {
              if (":" != c) {
                if (stateOverride) {
                  if (EOF == c) {
                    break e;
                  }
                  error("Code point not allowed in scheme: " + c);
                  break e;
                }
                /** @type {string} */
                buffer = "";
                /** @type {number} */
                cursor = 0;
                /** @type {string} */
                state = "no scheme";
                continue;
              }
              if (this._scheme = buffer, buffer = "", stateOverride) {
                break e;
              }
              if (isRelativeScheme(this._scheme)) {
                /** @type {boolean} */
                this._isRelative = true;
              }
              /** @type {string} */
              state = "file" == this._scheme ? "relative" : this._isRelative && base && base._scheme == this._scheme ? "relative or authority" : this._isRelative ? "authority first slash" : "scheme data";
            }
            break;
          case "scheme data":
            if ("?" == c) {
              /** @type {string} */
              this._query = "?";
              /** @type {string} */
              state = "query";
            } else {
              if ("#" == c) {
                /** @type {string} */
                this._fragment = "#";
                /** @type {string} */
                state = "fragment";
              } else {
                if (EOF != c && "\t" != c && "\n" != c && "\r" != c) {
                  this._schemeData += percentEscape(c);
                }
              }
            }
            break;
          case "no scheme":
            if (base && isRelativeScheme(base._scheme)) {
              /** @type {string} */
              state = "relative";
              continue;
            }
            error("Missing scheme.");
            invalid.call(this);
            break;
          case "relative or authority":
            if ("/" != c || "/" != input[cursor + 1]) {
              error("Expected /, got: " + c);
              /** @type {string} */
              state = "relative";
              continue;
            }
            /** @type {string} */
            state = "authority ignore slashes";
            break;
          case "relative":
            if (this._isRelative = true, "file" != this._scheme && (this._scheme = base._scheme), EOF == c) {
              this._host = base._host;
              this._port = base._port;
              this._path = base._path.slice();
              this._query = base._query;
              this._username = base._username;
              this._password = base._password;
              break e;
            }
            if ("/" == c || "\\" == c) {
              if ("\\" == c) {
                error("\\ is an invalid code point.");
              }
              /** @type {string} */
              state = "relative slash";
            } else {
              if ("?" == c) {
                this._host = base._host;
                this._port = base._port;
                this._path = base._path.slice();
                /** @type {string} */
                this._query = "?";
                this._username = base._username;
                this._password = base._password;
                /** @type {string} */
                state = "query";
              } else {
                if ("#" != c) {
                  var value = input[cursor + 1];
                  var nextNextC = input[cursor + 2];
                  if ("file" != this._scheme || !ALPHA.test(c) || ":" != value && "|" != value || EOF != nextNextC && "/" != nextNextC && "\\" != nextNextC && "?" != nextNextC && "#" != nextNextC) {
                    this._host = base._host;
                    this._port = base._port;
                    this._username = base._username;
                    this._password = base._password;
                    this._path = base._path.slice();
                    this._path.pop();
                  }
                  /** @type {string} */
                  state = "relative path";
                  continue;
                }
                this._host = base._host;
                this._port = base._port;
                this._path = base._path.slice();
                this._query = base._query;
                /** @type {string} */
                this._fragment = "#";
                this._username = base._username;
                this._password = base._password;
                /** @type {string} */
                state = "fragment";
              }
            }
            break;
          case "relative slash":
            if ("/" != c && "\\" != c) {
              if ("file" != this._scheme) {
                this._host = base._host;
                this._port = base._port;
                this._username = base._username;
                this._password = base._password;
              }
              /** @type {string} */
              state = "relative path";
              continue;
            }
            if ("\\" == c) {
              error("\\ is an invalid code point.");
            }
            /** @type {string} */
            state = "file" == this._scheme ? "file host" : "authority ignore slashes";
            break;
          case "authority first slash":
            if ("/" != c) {
              error("Expected '/', got: " + c);
              /** @type {string} */
              state = "authority ignore slashes";
              continue;
            }
            /** @type {string} */
            state = "authority second slash";
            break;
          case "authority second slash":
            if (state = "authority ignore slashes", "/" != c) {
              error("Expected '/', got: " + c);
              continue;
            }
            break;
          case "authority ignore slashes":
            if ("/" != c && "\\" != c) {
              /** @type {string} */
              state = "authority";
              continue;
            }
            error("Expected authority, got: " + c);
            break;
          case "authority":
            if ("@" == c) {
              if (g) {
                error("@ already seen.");
                /** @type {string} */
                buffer = buffer + "%40";
              }
              /** @type {boolean} */
              g = true;
              /** @type {number} */
              var i = 0;
              for (; i < buffer.length; i++) {
                var cp = buffer[i];
                if ("\t" != cp && "\n" != cp && "\r" != cp) {
                  if (":" != cp || null !== this._password) {
                    var tempC = percentEscape(cp);
                    if (null !== this._password) {
                      this._password += tempC;
                    } else {
                      this._username += tempC;
                    }
                  } else {
                    /** @type {string} */
                    this._password = "";
                  }
                } else {
                  error("Invalid whitespace in authority.");
                }
              }
              /** @type {string} */
              buffer = "";
            } else {
              if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
                /** @type {number} */
                cursor = cursor - buffer.length;
                /** @type {string} */
                buffer = "";
                /** @type {string} */
                state = "host";
                continue;
              }
              /** @type {string} */
              buffer = buffer + c;
            }
            break;
          case "file host":
            if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
              if (2 != buffer.length || !ALPHA.test(buffer[0]) || ":" != buffer[1] && "|" != buffer[1]) {
                if (!(0 == buffer.length)) {
                  this._host = exports.call(this, buffer);
                  /** @type {string} */
                  buffer = "";
                }
                /** @type {string} */
                state = "relative path start";
              } else {
                /** @type {string} */
                state = "relative path";
              }
              continue;
            }
            if ("\t" == c || "\n" == c || "\r" == c) {
              error("Invalid whitespace in file host.");
            } else {
              /** @type {string} */
              buffer = buffer + c;
            }
            break;
          case "host":
          case "hostname":
            if (":" != c || y) {
              if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c) {
                if (this._host = exports.call(this, buffer), buffer = "", state = "relative path start", stateOverride) {
                  break e;
                }
                continue;
              }
              if ("\t" != c && "\n" != c && "\r" != c) {
                if ("[" == c) {
                  /** @type {boolean} */
                  y = true;
                } else {
                  if ("]" == c) {
                    /** @type {boolean} */
                    y = false;
                  }
                }
                /** @type {string} */
                buffer = buffer + c;
              } else {
                error("Invalid code point in host/hostname: " + c);
              }
            } else {
              if (this._host = exports.call(this, buffer), buffer = "", state = "port", "hostname" == stateOverride) {
                break e;
              }
            }
            break;
          case "port":
            if (/[0-9]/.test(c)) {
              /** @type {string} */
              buffer = buffer + c;
            } else {
              if (EOF == c || "/" == c || "\\" == c || "?" == c || "#" == c || stateOverride) {
                if ("" != buffer) {
                  /** @type {number} */
                  var temp = parseInt(buffer, 10);
                  if (temp != config[this._scheme]) {
                    /** @type {string} */
                    this._port = temp + "";
                  }
                  /** @type {string} */
                  buffer = "";
                }
                if (stateOverride) {
                  break e;
                }
                /** @type {string} */
                state = "relative path start";
                continue;
              }
              if ("\t" == c || "\n" == c || "\r" == c) {
                error("Invalid code point in port: " + c);
              } else {
                invalid.call(this);
              }
            }
            break;
          case "relative path start":
            if ("\\" == c && error("'\\' not allowed in path."), state = "relative path", "/" != c && "\\" != c) {
              continue;
            }
            break;
          case "relative path":
            var s;
            if (EOF != c && "/" != c && "\\" != c && (stateOverride || "?" != c && "#" != c)) {
              if ("\t" != c && "\n" != c && "\r" != c) {
                /** @type {string} */
                buffer = buffer + percentEscape(c);
              }
            } else {
              if ("\\" == c) {
                error("\\ not allowed in relative path.");
              }
              if (s = r[buffer.toLowerCase()]) {
                buffer = s;
              }
              if (".." == buffer) {
                this._path.pop();
                if ("/" != c && "\\" != c) {
                  this._path.push("");
                }
              } else {
                if ("." == buffer && "/" != c && "\\" != c) {
                  this._path.push("");
                } else {
                  if ("." != buffer) {
                    if ("file" == this._scheme && 0 == this._path.length && 2 == buffer.length && ALPHA.test(buffer[0]) && "|" == buffer[1]) {
                      buffer = buffer[0] + ":";
                    }
                    this._path.push(buffer);
                  }
                }
              }
              /** @type {string} */
              buffer = "";
              if ("?" == c) {
                /** @type {string} */
                this._query = "?";
                /** @type {string} */
                state = "query";
              } else {
                if ("#" == c) {
                  /** @type {string} */
                  this._fragment = "#";
                  /** @type {string} */
                  state = "fragment";
                }
              }
            }
            break;
          case "query":
            if (stateOverride || "#" != c) {
              if (EOF != c && "\t" != c && "\n" != c && "\r" != c) {
                this._query += percentEscapeQuery(c);
              }
            } else {
              /** @type {string} */
              this._fragment = "#";
              /** @type {string} */
              state = "fragment";
            }
            break;
          case "fragment":
            if (EOF != c && "\t" != c && "\n" != c && "\r" != c) {
              this._fragment += c;
            }
        }
        cursor++;
      }
    }
    /**
     * @return {undefined}
     */
    function clear() {
      /** @type {string} */
      this._scheme = "";
      /** @type {string} */
      this._schemeData = "";
      /** @type {string} */
      this._username = "";
      /** @type {null} */
      this._password = null;
      /** @type {string} */
      this._host = "";
      /** @type {string} */
      this._port = "";
      /** @type {!Array} */
      this._path = [];
      /** @type {string} */
      this._query = "";
      /** @type {string} */
      this._fragment = "";
      /** @type {boolean} */
      this._isInvalid = false;
      /** @type {boolean} */
      this._isRelative = false;
    }
    /**
     * @param {string} url
     * @param {!Array} base
     * @return {undefined}
     */
    function jURL(url, base) {
      if (!(void 0 === base || base instanceof jURL)) {
        base = new jURL(String(base));
      }
      /** @type {string} */
      this._url = "" + url;
      clear.call(this);
      /** @type {string} */
      var mode = this._url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
      parse.call(this, mode, null, base);
    }
    /** @type {boolean} */
    var t = false;
    if (!scope.forceJURL) {
      try {
        /** @type {!URL} */
        var u = new URL("b", "http://a");
        /** @type {string} */
        u.pathname = "c%20d";
        /** @type {boolean} */
        t = "http://a/c%20d" === u.href;
      } catch (e) {
      }
    }
    if (!t) {
      /** @type {!Object} */
      var config = Object.create(null);
      /** @type {number} */
      config.ftp = 21;
      /** @type {number} */
      config.file = 0;
      /** @type {number} */
      config.gopher = 70;
      /** @type {number} */
      config.http = 80;
      /** @type {number} */
      config.https = 443;
      /** @type {number} */
      config.ws = 80;
      /** @type {number} */
      config.wss = 443;
      /** @type {!Object} */
      var r = Object.create(null);
      /** @type {string} */
      r["%2e"] = ".";
      /** @type {string} */
      r[".%2e"] = "..";
      /** @type {string} */
      r["%2e."] = "..";
      /** @type {string} */
      r["%2e%2e"] = "..";
      var EOF = void 0;
      /** @type {!RegExp} */
      var ALPHA = /[a-zA-Z]/;
      /** @type {!RegExp} */
      var matchLetter = /[a-zA-Z0-9\+\-\.]/;
      jURL.prototype = {
        toString : function() {
          return this.href;
        },
        get href() {
          if (this._isInvalid) {
            return this._url;
          }
          /** @type {string} */
          var authority = "";
          return "" == this._username && null == this._password || (authority = this._username + (null != this._password ? ":" + this._password : "") + "@"), this.protocol + (this._isRelative ? "//" + authority + this.host : "") + this.pathname + this._query + this._fragment;
        },
        set href(data) {
          clear.call(this);
          parse.call(this, data);
        },
        get protocol() {
          return this._scheme + ":";
        },
        set protocol(protocol) {
          if (!this._isInvalid) {
            parse.call(this, protocol + ":", "scheme start");
          }
        },
        get host() {
          return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host;
        },
        set host(data) {
          if (!this._isInvalid && this._isRelative) {
            parse.call(this, data, "host");
          }
        },
        get hostname() {
          return this._host;
        },
        set hostname(data) {
          if (!this._isInvalid && this._isRelative) {
            parse.call(this, data, "hostname");
          }
        },
        get port() {
          return this._port;
        },
        set port(data) {
          if (!this._isInvalid && this._isRelative) {
            parse.call(this, data, "port");
          }
        },
        get pathname() {
          return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join("/") : this._schemeData;
        },
        set pathname(data) {
          if (!this._isInvalid && this._isRelative) {
            /** @type {!Array} */
            this._path = [];
            parse.call(this, data, "relative path start");
          }
        },
        get search() {
          return this._isInvalid || !this._query || "?" == this._query ? "" : this._query;
        },
        set search(data) {
          if (!this._isInvalid && this._isRelative) {
            /** @type {string} */
            this._query = "?";
            if ("?" == data[0]) {
              data = data.slice(1);
            }
            parse.call(this, data, "query");
          }
        },
        get hash() {
          return this._isInvalid || !this._fragment || "#" == this._fragment ? "" : this._fragment;
        },
        set hash(hash) {
          if (!this._isInvalid) {
            if (hash) {
              /** @type {string} */
              this._fragment = "#";
              if ("#" == hash[0]) {
                hash = hash.slice(1);
              }
              parse.call(this, hash, "fragment");
            } else {
              /** @type {string} */
              this._fragment = "";
            }
          }
        },
        get origin() {
          var data;
          if (this._isInvalid || !this._scheme) {
            return "";
          }
          switch(this._scheme) {
            case "data":
            case "file":
            case "javascript":
            case "mailto":
              return "null";
          }
          return (data = this.host) ? this._scheme + "://" + data : "";
        }
      };
      var OriginalURL = scope.URL;
      if (OriginalURL) {
        /**
         * @param {?} blob
         * @return {?}
         */
        jURL.createObjectURL = function(blob) {
          return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
        };
        /**
         * @param {?} url
         * @return {undefined}
         */
        jURL.revokeObjectURL = function(url) {
          OriginalURL.revokeObjectURL(url);
        };
      }
      /** @type {function(string, !Array): undefined} */
      scope.URL = jURL;
    }
  })(window);
}, function(canCreateDiscussions, isSlidingUp) {
  !function(doc) {
    /** @type {!NodeList<Element>} */
    var scripts = doc.getElementsByTagName("script");
    if (!("currentScript" in doc)) {
      Object.defineProperty(doc, "currentScript", {
        get : function() {
          try {
            throw new Error;
          } catch (error) {
            var i;
            var _src_temp = (/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(error.stack) || [false])[1];
            for (i in scripts) {
              if (scripts[i].src == _src_temp || "interactive" == scripts[i].readyState) {
                return scripts[i];
              }
            }
            return null;
          }
        }
      });
    }
  }(document);
}, function(canCreateDiscussions, isSlidingUp, state) {
  /** @type {!URL} */
  var url = new URL(document.currentScript.src);
  /** @type {string} */
  var tag = url.href.substring(0, url.href.lastIndexOf("/") + 1);
  /** @type {string} */
  state.p = tag;
}, function(module, s, a) {
  var test;
  var e;
  var match;
  /** @type {!Array} */
  e = [];
  if (!(void 0 === (match = "function" == typeof(test = function() {
    /**
     * @param {string} n
     * @return {?}
     */
    function parse(n) {
      var value;
      var dateDelim;
      var line = n.replace(/^v/, "").replace(/\+.*$/, "");
      var index = (dateDelim = "-", -1 === (value = line).indexOf(dateDelim) ? value.length : value.indexOf(dateDelim));
      var newNodeLists = line.substring(0, index).split(".");
      return newNodeLists.push(line.substring(index + 1)), newNodeLists;
    }
    /**
     * @param {number} value
     * @return {?}
     */
    function badValue3(value) {
      return isNaN(Number(value)) ? value : Number(value);
    }
    /**
     * @param {string} val
     * @return {undefined}
     */
    function i(val) {
      if ("string" != typeof val) {
        throw new TypeError("Invalid argument expected string");
      }
      if (!rNumpx.test(val)) {
        throw new Error("Invalid argument not valid semver ('" + val + "' received)");
      }
    }
    /**
     * @param {string} b
     * @param {string} a
     * @return {?}
     */
    function b(b, a) {
      [b, a].forEach(i);
      var output = parse(b);
      var date = parse(a);
      /** @type {number} */
      var prop = 0;
      for (; prop < Math.max(output.length - 1, date.length - 1); prop++) {
        /** @type {number} */
        var l = parseInt(output[prop] || 0, 10);
        /** @type {number} */
        var i = parseInt(date[prop] || 0, 10);
        if (l > i) {
          return 1;
        }
        if (i > l) {
          return -1;
        }
      }
      var o = output[output.length - 1];
      var d = date[date.length - 1];
      if (o && d) {
        var a = o.split(".").map(badValue3);
        var b = d.split(".").map(badValue3);
        /** @type {number} */
        prop = 0;
        for (; prop < Math.max(a.length, b.length); prop++) {
          if (void 0 === a[prop] || "string" == typeof b[prop] && "number" == typeof a[prop]) {
            return -1;
          }
          if (void 0 === b[prop] || "string" == typeof a[prop] && "number" == typeof b[prop]) {
            return 1;
          }
          if (a[prop] > b[prop]) {
            return 1;
          }
          if (b[prop] > a[prop]) {
            return -1;
          }
        }
      } else {
        if (o || d) {
          return o ? -1 : 1;
        }
      }
      return 0;
    }
    /** @type {!RegExp} */
    var rNumpx = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
    /** @type {!Array} */
    var a = [">", ">=", "=", "<", "<="];
    var ip_segments = {
      ">" : [1],
      ">=" : [0, 1],
      "=" : [0],
      "<=" : [-1, 0],
      "<" : [-1]
    };
    return b.validate = function(val) {
      return "string" == typeof val && rNumpx.test(val);
    }, b.compare = function(e, n, i) {
      !function(val) {
        if ("string" != typeof val) {
          throw new TypeError("Invalid operator type, expected string but got " + typeof val);
        }
        if (-1 === a.indexOf(val)) {
          throw new TypeError("Invalid operator, expected one of " + a.join("|"));
        }
      }(i);
      var result = b(e, n);
      return ip_segments[i].indexOf(result) > -1;
    }, b;
  }) ? test.apply(s, e) : test))) {
    module.exports = match;
  }
}, function(canCreateDiscussions, res, self) {
  /**
   * @param {!Object} o
   * @param {boolean} op
   * @return {?}
   */
  function assign(o, op) {
    /** @type {!Array<string>} */
    var t = Object.keys(o);
    if (Object.getOwnPropertySymbols) {
      /** @type {!Array<?>} */
      var neighbors = Object.getOwnPropertySymbols(o);
      if (op) {
        /** @type {!Array<?>} */
        neighbors = neighbors.filter(function(key) {
          return Object.getOwnPropertyDescriptor(o, key).enumerable;
        });
      }
      t.push.apply(t, neighbors);
    }
    return t;
  }
  /**
   * @param {!Object} target
   * @return {?}
   */
  function extend(target) {
    /** @type {number} */
    var i = 1;
    for (; i < arguments.length; i++) {
      var obj = null != arguments[i] ? arguments[i] : {};
      if (i % 2) {
        assign(Object(obj), true).forEach(function(lang) {
          callback(target, lang, obj[lang]);
        });
      } else {
        if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(obj));
        } else {
          assign(Object(obj)).forEach(function(prop) {
            Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(obj, prop));
          });
        }
      }
    }
    return target;
  }
  /**
   * @param {!Object} a
   * @param {number} val
   * @return {undefined}
   */
  function t(a, val) {
    /** @type {number} */
    var i = 0;
    for (; i < val.length; i++) {
      var descriptor = val[i];
      descriptor.enumerable = descriptor.enumerable || false;
      /** @type {boolean} */
      descriptor.configurable = true;
      if ("value" in descriptor) {
        /** @type {boolean} */
        descriptor.writable = true;
      }
      Object.defineProperty(a, descriptor.key, descriptor);
    }
  }
  /**
   * @param {!Object} obj
   * @param {string} key
   * @param {number} value
   * @return {?}
   */
  function callback(obj, key, value) {
    return key in obj ? Object.defineProperty(obj, key, {
      value : value,
      enumerable : true,
      configurable : true,
      writable : true
    }) : obj[key] = value, obj;
  }
  /**
   * @param {!Object} el
   * @param {number} o
   * @return {undefined}
   */
  function defineProperty(el, o) {
    /** @type {number} */
    var i = 0;
    for (; i < o.length; i++) {
      var descriptor = o[i];
      descriptor.enumerable = descriptor.enumerable || false;
      /** @type {boolean} */
      descriptor.configurable = true;
      if ("value" in descriptor) {
        /** @type {boolean} */
        descriptor.writable = true;
      }
      Object.defineProperty(el, descriptor.key, descriptor);
    }
  }
  /**
   * @param {string} cb
   * @return {?}
   */
  function next(cb) {
    return (next = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(init) {
      return typeof init;
    } : function(obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    })(cb);
  }
  /**
   * @param {!AudioNode} x
   * @param {!Function} t
   * @return {undefined}
   */
  function use(x, t) {
    if (!(x instanceof t)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  /**
   * @param {!Object} raw
   * @param {number} props
   * @return {undefined}
   */
  function get(raw, props) {
    /** @type {number} */
    var i = 0;
    for (; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      /** @type {boolean} */
      descriptor.configurable = true;
      if ("value" in descriptor) {
        /** @type {boolean} */
        descriptor.writable = true;
      }
      Object.defineProperty(raw, descriptor.key, descriptor);
    }
  }
  /**
   * @param {!Function} e
   * @param {!Object} obj
   * @return {?}
   */
  function action(e, obj) {
    return (action = Object.setPrototypeOf || function(origin, proto) {
      return origin.__proto__ = proto, origin;
    })(e, obj);
  }
  /**
   * @param {string} s
   * @return {?}
   */
  function traverse(s) {
    var t = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) {
        return false;
      }
      if (Reflect.construct.sham) {
        return false;
      }
      if ("function" == typeof Proxy) {
        return true;
      }
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        })), true;
      } catch (e) {
        return false;
      }
    }();
    return function() {
      var ret;
      var value = fn(s);
      if (t) {
        var ctor = fn(this).constructor;
        ret = Reflect.construct(value, arguments, ctor);
      } else {
        ret = value.apply(this, arguments);
      }
      return process(this, ret);
    };
  }
  /**
   * @param {!Array} name
   * @param {string} o
   * @return {?}
   */
  function process(name, o) {
    return !o || "object" !== next(o) && "function" != typeof o ? function(value) {
      if (void 0 === value) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return value;
    }(name) : o;
  }
  /**
   * @param {!Object} pos
   * @return {?}
   */
  function fn(pos) {
    return (fn = Object.setPrototypeOf ? Object.getPrototypeOf : function(target) {
      return target.__proto__ || Object.getPrototypeOf(target);
    })(pos);
  }
  self.r(res);
  /** @type {number} */
  var nextProfileItemId = 0;
  /** @type {boolean} */
  var dayMode = true;
  var current = {};
  var Uint8Array = function() {
    /**
     * @param {?} settings
     * @return {undefined}
     */
    function init(settings) {
      var kbnServer = this;
      !function(impromptuInstance, Impromptu) {
        if (!(impromptuInstance instanceof Impromptu)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }(this, init);
      callback(this, "id", void 0);
      callback(this, "ready", void 0);
      callback(this, "iframe", void 0);
      callback(this, "messages", void 0);
      callback(this, "callbackId", void 0);
      callback(this, "callbacks", void 0);
      /** @type {number} */
      this.id = ++nextProfileItemId;
      current[this.id] = this;
      /** @type {boolean} */
      this.ready = false;
      this.iframe = this.createIframe(settings);
      /** @type {!Array} */
      this.messages = [];
      /**
       * @return {undefined}
       */
      this.iframe.onload = function() {
        /** @type {boolean} */
        kbnServer.ready = true;
        kbnServer.flushMessages();
      };
      /** @type {number} */
      this.callbackId = 0;
      this.callbacks = {};
    }
    var e;
    var width;
    var n;
    return e = init, (width = [{
      key : "createIframe",
      value : function(e) {
        /** @type {!Element} */
        var self = document.createElement("iframe");
        return self.src = e, self.frameBorder = "0", self.width = "100%", self.height = "100%", self.style.minWidth = "1024px", self.style.minHeight = "100%", self.style.height = "100%", self.style.width = "100%", self.style.border = "0px", self;
      }
    }, {
      key : "appendTo",
      value : function(parent) {
        parent.appendChild(this.iframe);
      }
    }, {
      key : "postMessage",
      value : function(commit, message) {
        this.scheduleMessage(extend({
          action : commit
        }, message));
        this.flushMessages();
      }
    }, {
      key : "withMessage",
      value : function(data, t, cb) {
        /** @type {number} */
        var id = this.callbackId++;
        /** @type {!Function} */
        this.callbacks[id] = cb;
        this.postMessage(data, extend({
          frameId : this.id,
          callbackId : id
        }, t));
      }
    }, {
      key : "scheduleMessage",
      value : function(data) {
        this.messages.push(data);
      }
    }, {
      key : "flushMessages",
      value : function() {
        var self = this;
        if (this.ready) {
          this.messages.forEach(function(message_arg) {
            if (self.iframe && self.iframe.contentWindow) {
              self.iframe.contentWindow.postMessage(message_arg, "*");
            }
          });
          /** @type {!Array} */
          this.messages = [];
        }
      }
    }, {
      key : "handleMessage",
      value : function(data) {
        var socket = this;
        var type = data.action;
        var callbackId = data.callbackId;
        var jointKeys = data.doneId;
        var story = data.result;
        var callback = this.callbacks[callbackId];
        switch(type) {
          case "response":
            if (callback) {
              callback(story);
              delete this.callbacks[callbackId];
            }
            break;
          case "callback":
            if (story.attachments) {
              story.attachments = story.attachments.map(function(f) {
                return new File([f.content], f.name, {
                  type : f.type
                });
              });
            }
            if (callback) {
              callback(story, function(result, metaHashes) {
                socket.postMessage("done", {
                  doneId : jointKeys,
                  result : result,
                  meta : metaHashes
                });
              });
            }
        }
      }
    }, {
      key : "receiveMessage",
      value : function(evt) {
        if (evt.data) {
          this.handleMessage(evt.data);
        }
      }
    }]) && t(e.prototype, width), n && t(e, n), init;
  }();
  window.addEventListener("message", function(message) {
    var header;
    var module;
    var i = dayMode ? null == message || null === (header = message.data) || void 0 === header ? void 0 : header.frameId : 1;
    if (i) {
      if (!(null === (module = current[i]) || void 0 === module)) {
        module.receiveMessage(message);
      }
    }
  }, false);
  /** @type {string} */
  var contactCapacity = "1.0.57";
  var StringIO = function() {
    /**
     * @param {?} extent
     * @return {undefined}
     */
    function callback(extent) {
      var head;
      var key;
      var i;
      !function(value, fn) {
        if (!(value instanceof fn)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }(this, callback);
      /** @type {null} */
      i = null;
      if ((key = "frame") in (head = this)) {
        Object.defineProperty(head, key, {
          value : i,
          enumerable : true,
          configurable : true,
          writable : true
        });
      } else {
        /** @type {null} */
        head[key] = i;
      }
      if (extent) {
        this.init(extent);
      }
    }
    var self;
    var fObPool;
    var i;
    return self = callback, (fObPool = [{
      key : "init",
      value : function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.loadEditor(e);
        this.renderEditor(e);
        this.initEditor(e);
      }
    }, {
      key : "loadEditor",
      value : function($) {
        var setwidth;
        var i;
        var width = $.version || "1.1.150";
        /** @type {string} */
        var size = "".concat(self.p).concat(width, "/editor.html");
        /** @type {string} */
        var w = $.offline ? "".concat(size, "?offline=true") : size;
        /** @type {string} */
        i = contactCapacity;
        if (("dev" === (setwidth = width) ? 1 : self(4)(setwidth, i)) <= 0) {
          /** @type {boolean} */
          dayMode = false;
        }
        this.frame = new Uint8Array(w);
      }
    }, {
      key : "renderEditor",
      value : function(options) {
        var frame;
        /** @type {null} */
        var d = null;
        if (options.id ? d = document.getElementById(options.id) : options.className && (d = document.getElementsByClassName(options.className)[0]), !options.id && !options.className) {
          throw new Error("id or className must be provided.");
        }
        if (!d) {
          throw new Error("Could not find a valid element for given id or className.");
        }
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.appendTo(d);
        }
      }
    }, {
      key : "initEditor",
      value : function(options) {
        var channel;
        var self = {};
        /** @type {string} */
        self.referrer = window.location.href;
        if (options.source) {
          self.source = options.source;
        }
        if (options.designMode) {
          self.designMode = options.designMode;
        }
        if (options.displayMode) {
          self.displayMode = options.displayMode;
        }
        if (options.projectId) {
          self.projectId = options.projectId;
        }
        if (options.user) {
          self.user = options.user;
        }
        if (options.templateId) {
          self.templateId = options.templateId;
        }
        if (options.stockTemplateId) {
          self.stockTemplateId = options.stockTemplateId;
        }
        if (options.loadTimeout) {
          self.loadTimeout = options.loadTimeout;
        }
        if (options.safeHtml || options.safeHTML) {
          /** @type {boolean} */
          self.safeHtml = true;
        }
        if (options.options) {
          self.options = options.options;
        }
        if (options.tools) {
          self.tools = options.tools;
        }
        if (options.excludeTools) {
          self.excludeTools = options.excludeTools;
        }
        if (options.blocks) {
          self.blocks = options.blocks;
        }
        if (options.editor) {
          self.editor = options.editor;
        }
        if (options.fonts) {
          self.fonts = options.fonts;
        }
        if (options.linkTypes) {
          self.linkTypes = options.linkTypes;
        }
        if (options.mergeTags) {
          self.mergeTags = options.mergeTags;
        }
        if (options.displayConditions) {
          self.displayConditions = options.displayConditions;
        }
        if (options.specialLinks) {
          self.specialLinks = options.specialLinks;
        }
        if (options.designTags) {
          self.designTags = options.designTags;
        }
        if (options.customCSS) {
          self.customCSS = options.customCSS;
        }
        if (options.customJS) {
          self.customJS = options.customJS;
        }
        if (options.locale) {
          self.locale = options.locale;
        }
        if (options.translations) {
          self.translations = options.translations;
        }
        if (options.appearance) {
          self.appearance = options.appearance;
        }
        if (options.features) {
          self.features = options.features;
        }
        if (options.designTagsConfig) {
          self.designTagsConfig = options.designTagsConfig;
        }
        if (options.mergeTagsConfig) {
          self.mergeTagsConfig = options.mergeTagsConfig;
        }
        if (!(null === (channel = this.frame) || void 0 === channel)) {
          channel.postMessage("config", self);
        }
      }
    }, {
      key : "registerColumns",
      value : function(data) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("registerColumns", {
            cells : data
          });
        }
      }
    }, {
      key : "registerCallback",
      value : function(commit, done) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("registerCallback", {
            type : commit
          }, done);
        }
      }
    }, {
      key : "unregisterCallback",
      value : function(e) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("unregisterCallback", {
            type : e
          });
        }
      }
    }, {
      key : "registerProvider",
      value : function(type, criteria) {
        var self;
        if (!(null === (self = this.frame) || void 0 === self)) {
          self.withMessage("registerProvider", {
            type : type
          }, criteria);
        }
      }
    }, {
      key : "unregisterProvider",
      value : function(e) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("unregisterProvider", {
            type : e
          });
        }
      }
    }, {
      key : "reloadProvider",
      value : function(e) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("reloadProvider", {
            type : e
          });
        }
      }
    }, {
      key : "addEventListener",
      value : function(type, criteria) {
        var self;
        if (!(null === (self = this.frame) || void 0 === self)) {
          self.withMessage("registerCallback", {
            type : type
          }, criteria);
        }
      }
    }, {
      key : "removeEventListener",
      value : function(e) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("unregisterCallback", {
            type : e
          });
        }
      }
    }, {
      key : "setDesignMode",
      value : function(value) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("setDesignMode", {
            designMode : value
          });
        }
      }
    }, {
      key : "setDisplayMode",
      value : function(recB) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("setDisplayMode", {
            displayMode : recB
          });
        }
      }
    }, {
      key : "loadProject",
      value : function(id) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("loadProject", {
            projectId : id
          });
        }
      }
    }, {
      key : "loadUser",
      value : function(clone) {
        var client;
        if (!(null === (client = this.frame) || void 0 === client)) {
          client.postMessage("loadUser", {
            user : clone
          });
        }
      }
    }, {
      key : "loadTemplate",
      value : function(value) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("loadTemplate", {
            templateId : value
          });
        }
      }
    }, {
      key : "loadStockTemplate",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("loadStockTemplate", {
            stockTemplateId : recB
          });
        }
      }
    }, {
      key : "setLinkTypes",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("setLinkTypes", {
            linkTypes : recB
          });
        }
      }
    }, {
      key : "setMergeTags",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("setMergeTags", {
            mergeTags : recB
          });
        }
      }
    }, {
      key : "setSpecialLinks",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("setSpecialLinks", {
            specialLinks : recB
          });
        }
      }
    }, {
      key : "setDisplayConditions",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("setDisplayConditions", {
            displayConditions : recB
          });
        }
      }
    }, {
      key : "setLocale",
      value : function(value) {
        var $;
        if (!(null === ($ = this.frame) || void 0 === $)) {
          $.postMessage("setLocale", {
            locale : value
          });
        }
      }
    }, {
      key : "setTranslations",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("setTranslations", {
            translations : recB
          });
        }
      }
    }, {
      key : "loadBlank",
      value : function() {
        var frame;
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("loadBlank", {
            bodyValues : t
          });
        }
      }
    }, {
      key : "loadDesign",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("loadDesign", {
            design : recB
          });
        }
      }
    }, {
      key : "saveDesign",
      value : function(criteria) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("saveDesign", {}, criteria);
        }
      }
    }, {
      key : "exportHtml",
      value : function(t, o) {
        var point;
        if (!(null === (point = this.frame) || void 0 === point)) {
          point.withMessage("exportHtml", {
            options : o
          }, t);
        }
      }
    }, {
      key : "exportLiveHtml",
      value : function(criteria) {
        var dir;
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("exportLiveHtml", {}, criteria);
        }
      }
    }, {
      key : "exportPlainText",
      value : function(criteria) {
        var dir;
        var usedOptions = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!(null === (dir = this.frame) || void 0 === dir)) {
          dir.withMessage("exportPlainText", {
            options : usedOptions
          }, criteria);
        }
      }
    }, {
      key : "setAppearance",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("setAppearance", {
            appearance : recB
          });
        }
      }
    }, {
      key : "setBodyValues",
      value : function(e, i) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("setBodyValues", {
            bodyId : i,
            bodyValues : e
          });
        }
      }
    }, {
      key : "setDesignTagsConfig",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("setDesignTagsConfig", {
            designTagsConfig : recB
          });
        }
      }
    }, {
      key : "setMergeTagsConfig",
      value : function(recB) {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("setMergeTagsConfig", {
            mergeTagsConfig : recB
          });
        }
      }
    }, {
      key : "showPreview",
      value : function(options) {
        var socket;
        if (!(null === (socket = this.frame) || void 0 === socket)) {
          socket.postMessage("showPreview", {
            device : options
          });
        }
      }
    }, {
      key : "hidePreview",
      value : function() {
        var frame;
        if (!(null === (frame = this.frame) || void 0 === frame)) {
          frame.postMessage("hidePreview", {});
        }
      }
    }, {
      key : "registerTool",
      value : function() {
        throw new Error("registerTool method is not available here. It must be passed as customJS. More info at https://docs.unlayer.com/docs/custom-js-css");
      }
    }, {
      key : "registerPropertyEditor",
      value : function() {
        throw new Error("registerPropertyEditor method is not available here. It must be passed as customJS. More info at https://docs.unlayer.com/docs/custom-js-css");
      }
    }, {
      key : "createViewer",
      value : function() {
        throw new Error("createViewer method is not available here. It must be passed as customJS. More info at https://docs.unlayer.com/docs/custom-js-css");
      }
    }, {
      key : "createWidget",
      value : function() {
        throw new Error("createWidget method is not available here. It must be passed as customJS. More info at https://docs.unlayer.com/docs/custom-js-css");
      }
    }]) && defineProperty(self.prototype, fObPool), i && defineProperty(self, i), callback;
  }();
  var Constant = function(_WebInspector$GeneralTreeElement) {
    /**
     * @return {?}
     */
    function data() {
      return use(this, data), val.apply(this, arguments);
    }
    !function(data, superClass) {
      if ("function" != typeof superClass && null !== superClass) {
        throw new TypeError("Super expression must either be null or a function");
      }
      /** @type {!Object} */
      data.prototype = Object.create(superClass && superClass.prototype, {
        constructor : {
          value : data,
          writable : true,
          configurable : true
        }
      });
      if (superClass) {
        action(data, superClass);
      }
    }(data, _WebInspector$GeneralTreeElement);
    var target;
    var property;
    var value;
    var val = traverse(data);
    return target = data, (property = [{
      key : "createEditor",
      value : function(data) {
        return new StringIO(data);
      }
    }]) && get(target.prototype, property), value && get(target, value), data;
  }(StringIO);
  res.default = new Constant;
}]).default;
