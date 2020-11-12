var jxl_enc = (function () {
  var _scriptDir =
    typeof document !== 'undefined' && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return function (jxl_enc) {
    jxl_enc = jxl_enc || {};

    var f;
    f || (f = typeof jxl_enc !== 'undefined' ? jxl_enc : {});
    var aa, ba;
    f.ready = new Promise(function (a, b) {
      aa = a;
      ba = b;
    });
    var p = {},
      t;
    for (t in f) f.hasOwnProperty(t) && (p[t] = f[t]);
    var ca = './this.program',
      da = !1,
      w = !1,
      ea = !1,
      fa = !1;
    da = 'object' === typeof window;
    w = 'function' === typeof importScripts;
    ea =
      'object' === typeof process &&
      'object' === typeof process.versions &&
      'string' === typeof process.versions.node;
    fa = !da && !ea && !w;
    var z = '',
      ha,
      ia,
      ka,
      la;
    if (ea)
      (z = w ? require('path').dirname(z) + '/' : __dirname + '/'),
        (ha = function (a, b) {
          ka || (ka = require('fs'));
          la || (la = require('path'));
          a = la.normalize(a);
          return ka.readFileSync(a, b ? null : 'utf8');
        }),
        (ia = function (a) {
          a = ha(a, !0);
          a.buffer || (a = new Uint8Array(a));
          assert(a.buffer);
          return a;
        }),
        1 < process.argv.length && (ca = process.argv[1].replace(/\\/g, '/')),
        process.argv.slice(2),
        process.on('uncaughtException', function (a) {
          throw a;
        }),
        process.on('unhandledRejection', A),
        (f.inspect = function () {
          return '[Emscripten Module object]';
        });
    else if (fa)
      'undefined' != typeof read &&
        (ha = function (a) {
          return read(a);
        }),
        (ia = function (a) {
          if ('function' === typeof readbuffer)
            return new Uint8Array(readbuffer(a));
          a = read(a, 'binary');
          assert('object' === typeof a);
          return a;
        }),
        'undefined' !== typeof print &&
          ('undefined' === typeof console && (console = {}),
          (console.log = print),
          (console.warn = console.error =
            'undefined' !== typeof printErr ? printErr : print));
    else if (da || w)
      w
        ? (z = self.location.href)
        : document.currentScript && (z = document.currentScript.src),
        _scriptDir && (z = _scriptDir),
        0 !== z.indexOf('blob:')
          ? (z = z.substr(0, z.lastIndexOf('/') + 1))
          : (z = ''),
        (ha = function (a) {
          var b = new XMLHttpRequest();
          b.open('GET', a, !1);
          b.send(null);
          return b.responseText;
        }),
        w &&
          (ia = function (a) {
            var b = new XMLHttpRequest();
            b.open('GET', a, !1);
            b.responseType = 'arraybuffer';
            b.send(null);
            return new Uint8Array(b.response);
          });
    var ma = f.print || console.log.bind(console),
      B = f.printErr || console.warn.bind(console);
    for (t in p) p.hasOwnProperty(t) && (f[t] = p[t]);
    p = null;
    f.thisProgram && (ca = f.thisProgram);
    var na;
    f.wasmBinary && (na = f.wasmBinary);
    var noExitRuntime;
    f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
    'object' !== typeof WebAssembly && A('no native wasm support detected');
    var C,
      oa = new WebAssembly.Table({
        initial: 780,
        maximum: 780,
        element: 'anyfunc',
      }),
      pa = !1;
    function assert(a, b) {
      a || A('Assertion failed: ' + b);
    }
    var qa =
      'undefined' !== typeof TextDecoder ? new TextDecoder('utf8') : void 0;
    function D(a, b, c) {
      var d = b + c;
      for (c = b; a[c] && !(c >= d); ) ++c;
      if (16 < c - b && a.subarray && qa) return qa.decode(a.subarray(b, c));
      for (d = ''; b < c; ) {
        var e = a[b++];
        if (e & 128) {
          var g = a[b++] & 63;
          if (192 == (e & 224)) d += String.fromCharCode(((e & 31) << 6) | g);
          else {
            var k = a[b++] & 63;
            e =
              224 == (e & 240)
                ? ((e & 15) << 12) | (g << 6) | k
                : ((e & 7) << 18) | (g << 12) | (k << 6) | (a[b++] & 63);
            65536 > e
              ? (d += String.fromCharCode(e))
              : ((e -= 65536),
                (d += String.fromCharCode(
                  55296 | (e >> 10),
                  56320 | (e & 1023),
                )));
          }
        } else d += String.fromCharCode(e);
      }
      return d;
    }
    function ra(a, b, c, d) {
      if (!(0 < d)) return 0;
      var e = c;
      d = c + d - 1;
      for (var g = 0; g < a.length; ++g) {
        var k = a.charCodeAt(g);
        if (55296 <= k && 57343 >= k) {
          var m = a.charCodeAt(++g);
          k = (65536 + ((k & 1023) << 10)) | (m & 1023);
        }
        if (127 >= k) {
          if (c >= d) break;
          b[c++] = k;
        } else {
          if (2047 >= k) {
            if (c + 1 >= d) break;
            b[c++] = 192 | (k >> 6);
          } else {
            if (65535 >= k) {
              if (c + 2 >= d) break;
              b[c++] = 224 | (k >> 12);
            } else {
              if (c + 3 >= d) break;
              b[c++] = 240 | (k >> 18);
              b[c++] = 128 | ((k >> 12) & 63);
            }
            b[c++] = 128 | ((k >> 6) & 63);
          }
          b[c++] = 128 | (k & 63);
        }
      }
      b[c] = 0;
      return c - e;
    }
    function sa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d &&
          57343 >= d &&
          (d = (65536 + ((d & 1023) << 10)) | (a.charCodeAt(++c) & 1023));
        127 >= d ? ++b : (b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4);
      }
      return b;
    }
    var ta =
      'undefined' !== typeof TextDecoder ? new TextDecoder('utf-16le') : void 0;
    function ua(a, b) {
      var c = a >> 1;
      for (var d = c + b / 2; !(c >= d) && va[c]; ) ++c;
      c <<= 1;
      if (32 < c - a && ta) return ta.decode(E.subarray(a, c));
      c = 0;
      for (d = ''; ; ) {
        var e = G[(a + 2 * c) >> 1];
        if (0 == e || c == b / 2) return d;
        ++c;
        d += String.fromCharCode(e);
      }
    }
    function wa(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;
      for (var e = 0; e < c; ++e) (G[b >> 1] = a.charCodeAt(e)), (b += 2);
      G[b >> 1] = 0;
      return b - d;
    }
    function xa(a) {
      return 2 * a.length;
    }
    function ya(a, b) {
      for (var c = 0, d = ''; !(c >= b / 4); ) {
        var e = H[(a + 4 * c) >> 2];
        if (0 == e) break;
        ++c;
        65536 <= e
          ? ((e -= 65536),
            (d += String.fromCharCode(55296 | (e >> 10), 56320 | (e & 1023))))
          : (d += String.fromCharCode(e));
      }
      return d;
    }
    function za(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;
      for (var e = 0; e < a.length; ++e) {
        var g = a.charCodeAt(e);
        if (55296 <= g && 57343 >= g) {
          var k = a.charCodeAt(++e);
          g = (65536 + ((g & 1023) << 10)) | (k & 1023);
        }
        H[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }
      H[b >> 2] = 0;
      return b - d;
    }
    function Aa(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }
      return b;
    }
    var I, J, E, G, va, H, K, Ba, Ca;
    function Da(a) {
      I = a;
      f.HEAP8 = J = new Int8Array(a);
      f.HEAP16 = G = new Int16Array(a);
      f.HEAP32 = H = new Int32Array(a);
      f.HEAPU8 = E = new Uint8Array(a);
      f.HEAPU16 = va = new Uint16Array(a);
      f.HEAPU32 = K = new Uint32Array(a);
      f.HEAPF32 = Ba = new Float32Array(a);
      f.HEAPF64 = Ca = new Float64Array(a);
    }
    var Ea = f.INITIAL_MEMORY || 16777216;
    f.wasmMemory
      ? (C = f.wasmMemory)
      : (C = new WebAssembly.Memory({ initial: Ea / 65536, maximum: 32768 }));
    C && (I = C.buffer);
    Ea = I.byteLength;
    Da(I);
    H[771892] = 8330608;
    function Fa(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ('function' == typeof b) b(f);
        else {
          var c = b.eb;
          'number' === typeof c
            ? void 0 === b.Ma
              ? f.dynCall_v(c)
              : f.dynCall_vi(c, b.Ma)
            : c(void 0 === b.Ma ? null : b.Ma);
        }
      }
    }
    var Ga = [],
      Ha = [],
      Ia = [],
      Ja = [];
    function Ka() {
      var a = f.preRun.shift();
      Ga.unshift(a);
    }
    var La = Math.abs,
      Ma = Math.ceil,
      Na = Math.floor,
      Oa = Math.min,
      L = 0,
      Pa = null,
      Qa = null;
    f.preloadedImages = {};
    f.preloadedAudios = {};
    function A(a) {
      if (f.onAbort) f.onAbort(a);
      B(a);
      pa = !0;
      a = new WebAssembly.RuntimeError(
        'abort(' + a + '). Build with -s ASSERTIONS=1 for more info.',
      );
      ba(a);
      throw a;
    }
    function Ra(a) {
      var b = M;
      return String.prototype.startsWith ? b.startsWith(a) : 0 === b.indexOf(a);
    }
    function Sa() {
      return Ra('data:application/octet-stream;base64,');
    }
    var M = 'jxl_enc.wasm';
    if (!Sa()) {
      var Ta = M;
      M = f.locateFile ? f.locateFile(Ta, z) : z + Ta;
    }
    function Ua() {
      try {
        if (na) return new Uint8Array(na);
        if (ia) return ia(M);
        throw 'both async and sync fetching of the wasm failed';
      } catch (a) {
        A(a);
      }
    }
    function Va() {
      return na || (!da && !w) || 'function' !== typeof fetch || Ra('file://')
        ? new Promise(function (a) {
            a(Ua());
          })
        : fetch(M, { credentials: 'same-origin' })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + M + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Ua();
            });
    }
    var N, Wa;
    Ha.push({
      eb: function () {
        Xa();
      },
    });
    function Ya() {
      return 0 < Ya.Ia;
    }
    function Za(a, b) {
      for (var c = 0, d = a.length - 1; 0 <= d; d--) {
        var e = a[d];
        '.' === e
          ? a.splice(d, 1)
          : '..' === e
          ? (a.splice(d, 1), c++)
          : c && (a.splice(d, 1), c--);
      }
      if (b) for (; c; c--) a.unshift('..');
      return a;
    }
    function $a(a) {
      var b = '/' === a.charAt(0),
        c = '/' === a.substr(-1);
      (a = Za(
        a.split('/').filter(function (d) {
          return !!d;
        }),
        !b,
      ).join('/')) ||
        b ||
        (a = '.');
      a && c && (a += '/');
      return (b ? '/' : '') + a;
    }
    function ab(a) {
      var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
        .exec(a)
        .slice(1);
      a = b[0];
      b = b[1];
      if (!a && !b) return '.';
      b && (b = b.substr(0, b.length - 1));
      return a + b;
    }
    function bb(a) {
      if ('/' === a) return '/';
      var b = a.lastIndexOf('/');
      return -1 === b ? a : a.substr(b + 1);
    }
    function cb() {
      for (var a = '', b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
        b = 0 <= c ? arguments[c] : '/';
        if ('string' !== typeof b)
          throw new TypeError('Arguments to path.resolve must be strings');
        if (!b) return '';
        a = b + '/' + a;
        b = '/' === b.charAt(0);
      }
      a = Za(
        a.split('/').filter(function (d) {
          return !!d;
        }),
        !b,
      ).join('/');
      return (b ? '/' : '') + a || '.';
    }
    var db = [];
    function eb(a, b) {
      db[a] = { input: [], output: [], Ba: b };
      fb(a, gb);
    }
    var gb = {
        open: function (a) {
          var b = db[a.node.rdev];
          if (!b) throw new O(43);
          a.tty = b;
          a.seekable = !1;
        },
        close: function (a) {
          a.tty.Ba.flush(a.tty);
        },
        flush: function (a) {
          a.tty.Ba.flush(a.tty);
        },
        read: function (a, b, c, d) {
          if (!a.tty || !a.tty.Ba.Xa) throw new O(60);
          for (var e = 0, g = 0; g < d; g++) {
            try {
              var k = a.tty.Ba.Xa(a.tty);
            } catch (m) {
              throw new O(29);
            }
            if (void 0 === k && 0 === e) throw new O(6);
            if (null === k || void 0 === k) break;
            e++;
            b[c + g] = k;
          }
          e && (a.node.timestamp = Date.now());
          return e;
        },
        write: function (a, b, c, d) {
          if (!a.tty || !a.tty.Ba.Oa) throw new O(60);
          try {
            for (var e = 0; e < d; e++) a.tty.Ba.Oa(a.tty, b[c + e]);
          } catch (g) {
            throw new O(29);
          }
          d && (a.node.timestamp = Date.now());
          return e;
        },
      },
      ib = {
        Xa: function (a) {
          if (!a.input.length) {
            var b = null;
            if (ea) {
              var c = Buffer.Ia ? Buffer.Ia(256) : new Buffer(256),
                d = 0;
              try {
                d = ka.readSync(process.stdin.fd, c, 0, 256, null);
              } catch (e) {
                if (-1 != e.toString().indexOf('EOF')) d = 0;
                else throw e;
              }
              0 < d ? (b = c.slice(0, d).toString('utf-8')) : (b = null);
            } else
              'undefined' != typeof window && 'function' == typeof window.prompt
                ? ((b = window.prompt('Input: ')), null !== b && (b += '\n'))
                : 'function' == typeof readline &&
                  ((b = readline()), null !== b && (b += '\n'));
            if (!b) return null;
            a.input = hb(b, !0);
          }
          return a.input.shift();
        },
        Oa: function (a, b) {
          null === b || 10 === b
            ? (ma(D(a.output, 0)), (a.output = []))
            : 0 != b && a.output.push(b);
        },
        flush: function (a) {
          a.output &&
            0 < a.output.length &&
            (ma(D(a.output, 0)), (a.output = []));
        },
      },
      jb = {
        Oa: function (a, b) {
          null === b || 10 === b
            ? (B(D(a.output, 0)), (a.output = []))
            : 0 != b && a.output.push(b);
        },
        flush: function (a) {
          a.output &&
            0 < a.output.length &&
            (B(D(a.output, 0)), (a.output = []));
        },
      },
      P = {
        ta: null,
        ya: function () {
          return P.createNode(null, '/', 16895, 0);
        },
        createNode: function (a, b, c, d) {
          if (24576 === (c & 61440) || 4096 === (c & 61440)) throw new O(63);
          P.ta ||
            (P.ta = {
              dir: {
                node: {
                  za: P.pa.za,
                  va: P.pa.va,
                  lookup: P.pa.lookup,
                  Fa: P.pa.Fa,
                  rename: P.pa.rename,
                  unlink: P.pa.unlink,
                  rmdir: P.pa.rmdir,
                  readdir: P.pa.readdir,
                  symlink: P.pa.symlink,
                },
                stream: { Aa: P.qa.Aa },
              },
              file: {
                node: { za: P.pa.za, va: P.pa.va },
                stream: {
                  Aa: P.qa.Aa,
                  read: P.qa.read,
                  write: P.qa.write,
                  Ra: P.qa.Ra,
                  Ya: P.qa.Ya,
                  Ha: P.qa.Ha,
                },
              },
              link: {
                node: { za: P.pa.za, va: P.pa.va, readlink: P.pa.readlink },
                stream: {},
              },
              Sa: { node: { za: P.pa.za, va: P.pa.va }, stream: kb },
            });
          c = lb(a, b, c, d);
          16384 === (c.mode & 61440)
            ? ((c.pa = P.ta.dir.node), (c.qa = P.ta.dir.stream), (c.oa = {}))
            : 32768 === (c.mode & 61440)
            ? ((c.pa = P.ta.file.node),
              (c.qa = P.ta.file.stream),
              (c.ra = 0),
              (c.oa = null))
            : 40960 === (c.mode & 61440)
            ? ((c.pa = P.ta.link.node), (c.qa = P.ta.link.stream))
            : 8192 === (c.mode & 61440) &&
              ((c.pa = P.ta.Sa.node), (c.qa = P.ta.Sa.stream));
          c.timestamp = Date.now();
          a && (a.oa[b] = c);
          return c;
        },
        xb: function (a) {
          if (a.oa && a.oa.subarray) {
            for (var b = [], c = 0; c < a.ra; ++c) b.push(a.oa[c]);
            return b;
          }
          return a.oa;
        },
        yb: function (a) {
          return a.oa
            ? a.oa.subarray
              ? a.oa.subarray(0, a.ra)
              : new Uint8Array(a.oa)
            : new Uint8Array(0);
        },
        Ta: function (a, b) {
          var c = a.oa ? a.oa.length : 0;
          c >= b ||
            ((b = Math.max(b, (c * (1048576 > c ? 2 : 1.125)) >>> 0)),
            0 != c && (b = Math.max(b, 256)),
            (c = a.oa),
            (a.oa = new Uint8Array(b)),
            0 < a.ra && a.oa.set(c.subarray(0, a.ra), 0));
        },
        nb: function (a, b) {
          if (a.ra != b)
            if (0 == b) (a.oa = null), (a.ra = 0);
            else {
              if (!a.oa || a.oa.subarray) {
                var c = a.oa;
                a.oa = new Uint8Array(b);
                c && a.oa.set(c.subarray(0, Math.min(b, a.ra)));
              } else if ((a.oa || (a.oa = []), a.oa.length > b))
                a.oa.length = b;
              else for (; a.oa.length < b; ) a.oa.push(0);
              a.ra = b;
            }
        },
        pa: {
          za: function (a) {
            var b = {};
            b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
            b.ino = a.id;
            b.mode = a.mode;
            b.nlink = 1;
            b.uid = 0;
            b.gid = 0;
            b.rdev = a.rdev;
            16384 === (a.mode & 61440)
              ? (b.size = 4096)
              : 32768 === (a.mode & 61440)
              ? (b.size = a.ra)
              : 40960 === (a.mode & 61440)
              ? (b.size = a.link.length)
              : (b.size = 0);
            b.atime = new Date(a.timestamp);
            b.mtime = new Date(a.timestamp);
            b.ctime = new Date(a.timestamp);
            b.bb = 4096;
            b.blocks = Math.ceil(b.size / b.bb);
            return b;
          },
          va: function (a, b) {
            void 0 !== b.mode && (a.mode = b.mode);
            void 0 !== b.timestamp && (a.timestamp = b.timestamp);
            void 0 !== b.size && P.nb(a, b.size);
          },
          lookup: function () {
            throw mb[44];
          },
          Fa: function (a, b, c, d) {
            return P.createNode(a, b, c, d);
          },
          rename: function (a, b, c) {
            if (16384 === (a.mode & 61440)) {
              try {
                var d = nb(b, c);
              } catch (g) {}
              if (d) for (var e in d.oa) throw new O(55);
            }
            delete a.parent.oa[a.name];
            a.name = c;
            b.oa[c] = a;
            a.parent = b;
          },
          unlink: function (a, b) {
            delete a.oa[b];
          },
          rmdir: function (a, b) {
            var c = nb(a, b),
              d;
            for (d in c.oa) throw new O(55);
            delete a.oa[b];
          },
          readdir: function (a) {
            var b = ['.', '..'],
              c;
            for (c in a.oa) a.oa.hasOwnProperty(c) && b.push(c);
            return b;
          },
          symlink: function (a, b, c) {
            a = P.createNode(a, b, 41471, 0);
            a.link = c;
            return a;
          },
          readlink: function (a) {
            if (40960 !== (a.mode & 61440)) throw new O(28);
            return a.link;
          },
        },
        qa: {
          read: function (a, b, c, d, e) {
            var g = a.node.oa;
            if (e >= a.node.ra) return 0;
            a = Math.min(a.node.ra - e, d);
            if (8 < a && g.subarray) b.set(g.subarray(e, e + a), c);
            else for (d = 0; d < a; d++) b[c + d] = g[e + d];
            return a;
          },
          write: function (a, b, c, d, e, g) {
            b.buffer === J.buffer && (g = !1);
            if (!d) return 0;
            a = a.node;
            a.timestamp = Date.now();
            if (b.subarray && (!a.oa || a.oa.subarray)) {
              if (g) return (a.oa = b.subarray(c, c + d)), (a.ra = d);
              if (0 === a.ra && 0 === e)
                return (a.oa = b.slice(c, c + d)), (a.ra = d);
              if (e + d <= a.ra) return a.oa.set(b.subarray(c, c + d), e), d;
            }
            P.Ta(a, e + d);
            if (a.oa.subarray && b.subarray) a.oa.set(b.subarray(c, c + d), e);
            else for (g = 0; g < d; g++) a.oa[e + g] = b[c + g];
            a.ra = Math.max(a.ra, e + d);
            return d;
          },
          Aa: function (a, b, c) {
            1 === c
              ? (b += a.position)
              : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.ra);
            if (0 > b) throw new O(28);
            return b;
          },
          Ra: function (a, b, c) {
            P.Ta(a.node, b + c);
            a.node.ra = Math.max(a.node.ra, b + c);
          },
          Ya: function (a, b, c, d, e, g) {
            assert(0 === b);
            if (32768 !== (a.node.mode & 61440)) throw new O(43);
            a = a.node.oa;
            if (g & 2 || a.buffer !== I) {
              if (0 < d || d + c < a.length)
                a.subarray
                  ? (a = a.subarray(d, d + c))
                  : (a = Array.prototype.slice.call(a, d, d + c));
              d = !0;
              g = 16384 * Math.ceil(c / 16384);
              for (b = ob(g); c < g; ) J[b + c++] = 0;
              c = b;
              if (!c) throw new O(48);
              J.set(a, c);
            } else (d = !1), (c = a.byteOffset);
            return { Fb: c, $a: d };
          },
          Ha: function (a, b, c, d, e) {
            if (32768 !== (a.node.mode & 61440)) throw new O(43);
            if (e & 2) return 0;
            P.qa.write(a, b, 0, d, c, !1);
            return 0;
          },
        },
      },
      pb = null,
      qb = {},
      Q = [],
      rb = 1,
      sb = null,
      tb = !0,
      ub = {},
      O = null,
      mb = {};
    function R(a, b) {
      a = cb('/', a);
      b = b || {};
      if (!a) return { path: '', node: null };
      var c = { Wa: !0, Pa: 0 },
        d;
      for (d in c) void 0 === b[d] && (b[d] = c[d]);
      if (8 < b.Pa) throw new O(32);
      a = Za(
        a.split('/').filter(function (k) {
          return !!k;
        }),
        !1,
      );
      var e = pb;
      c = '/';
      for (d = 0; d < a.length; d++) {
        var g = d === a.length - 1;
        if (g && b.parent) break;
        e = nb(e, a[d]);
        c = $a(c + '/' + a[d]);
        e.Ga && (!g || (g && b.Wa)) && (e = e.Ga.root);
        if (!g || b.Va)
          for (g = 0; 40960 === (e.mode & 61440); )
            if (
              ((e = vb(c)),
              (c = cb(ab(c), e)),
              (e = R(c, { Pa: b.Pa }).node),
              40 < g++)
            )
              throw new O(32);
      }
      return { path: c, node: e };
    }
    function wb(a) {
      for (var b; ; ) {
        if (a === a.parent)
          return (
            (a = a.ya.Za),
            b ? ('/' !== a[a.length - 1] ? a + '/' + b : a + b) : a
          );
        b = b ? a.name + '/' + b : a.name;
        a = a.parent;
      }
    }
    function xb(a, b) {
      for (var c = 0, d = 0; d < b.length; d++)
        c = ((c << 5) - c + b.charCodeAt(d)) | 0;
      return ((a + c) >>> 0) % sb.length;
    }
    function nb(a, b) {
      var c;
      if ((c = (c = yb(a, 'x')) ? c : a.pa.lookup ? 0 : 2)) throw new O(c, a);
      for (c = sb[xb(a.id, b)]; c; c = c.kb) {
        var d = c.name;
        if (c.parent.id === a.id && d === b) return c;
      }
      return a.pa.lookup(a, b);
    }
    function lb(a, b, c, d) {
      a = new zb(a, b, c, d);
      b = xb(a.parent.id, a.name);
      a.kb = sb[b];
      return (sb[b] = a);
    }
    var Ab = {
      r: 0,
      rs: 1052672,
      'r+': 2,
      w: 577,
      wx: 705,
      xw: 705,
      'w+': 578,
      'wx+': 706,
      'xw+': 706,
      a: 1089,
      ax: 1217,
      xa: 1217,
      'a+': 1090,
      'ax+': 1218,
      'xa+': 1218,
    };
    function Bb(a) {
      var b = ['r', 'w', 'rw'][a & 3];
      a & 512 && (b += 'w');
      return b;
    }
    function yb(a, b) {
      if (tb) return 0;
      if (-1 === b.indexOf('r') || a.mode & 292) {
        if (
          (-1 !== b.indexOf('w') && !(a.mode & 146)) ||
          (-1 !== b.indexOf('x') && !(a.mode & 73))
        )
          return 2;
      } else return 2;
      return 0;
    }
    function Cb(a, b) {
      try {
        return nb(a, b), 20;
      } catch (c) {}
      return yb(a, 'wx');
    }
    function Db() {
      var a = 4096;
      for (var b = 0; b <= a; b++) if (!Q[b]) return b;
      throw new O(33);
    }
    function Eb(a) {
      Fb || ((Fb = function () {}), (Fb.prototype = {}));
      var b = new Fb(),
        c;
      for (c in a) b[c] = a[c];
      a = b;
      b = Db();
      a.fd = b;
      return (Q[b] = a);
    }
    var kb = {
      open: function (a) {
        a.qa = qb[a.node.rdev].qa;
        a.qa.open && a.qa.open(a);
      },
      Aa: function () {
        throw new O(70);
      },
    };
    function fb(a, b) {
      qb[a] = { qa: b };
    }
    function Gb(a, b) {
      var c = '/' === b,
        d = !b;
      if (c && pb) throw new O(10);
      if (!c && !d) {
        var e = R(b, { Wa: !1 });
        b = e.path;
        e = e.node;
        if (e.Ga) throw new O(10);
        if (16384 !== (e.mode & 61440)) throw new O(54);
      }
      b = { type: a, Db: {}, Za: b, jb: [] };
      a = a.ya(b);
      a.ya = b;
      b.root = a;
      c ? (pb = a) : e && ((e.Ga = b), e.ya && e.ya.jb.push(b));
    }
    function Hb(a, b, c) {
      var d = R(a, { parent: !0 }).node;
      a = bb(a);
      if (!a || '.' === a || '..' === a) throw new O(28);
      var e = Cb(d, a);
      if (e) throw new O(e);
      if (!d.pa.Fa) throw new O(63);
      return d.pa.Fa(d, a, b, c);
    }
    function S(a) {
      Hb(a, 16895, 0);
    }
    function Ib(a, b, c) {
      'undefined' === typeof c && ((c = b), (b = 438));
      Hb(a, b | 8192, c);
    }
    function Jb(a, b) {
      if (!cb(a)) throw new O(44);
      var c = R(b, { parent: !0 }).node;
      if (!c) throw new O(44);
      b = bb(b);
      var d = Cb(c, b);
      if (d) throw new O(d);
      if (!c.pa.symlink) throw new O(63);
      c.pa.symlink(c, b, a);
    }
    function vb(a) {
      a = R(a).node;
      if (!a) throw new O(44);
      if (!a.pa.readlink) throw new O(28);
      return cb(wb(a.parent), a.pa.readlink(a));
    }
    function Kb(a, b) {
      if ('' === a) throw new O(44);
      if ('string' === typeof b) {
        var c = Ab[b];
        if ('undefined' === typeof c)
          throw Error('Unknown file open mode: ' + b);
        b = c;
      }
      var d =
        b & 64 ? (('undefined' === typeof d ? 438 : d) & 4095) | 32768 : 0;
      if ('object' === typeof a) var e = a;
      else {
        a = $a(a);
        try {
          e = R(a, { Va: !(b & 131072) }).node;
        } catch (k) {}
      }
      c = !1;
      if (b & 64)
        if (e) {
          if (b & 128) throw new O(20);
        } else (e = Hb(a, d, 0)), (c = !0);
      if (!e) throw new O(44);
      8192 === (e.mode & 61440) && (b &= -513);
      if (b & 65536 && 16384 !== (e.mode & 61440)) throw new O(54);
      if (
        !c &&
        (d = e
          ? 40960 === (e.mode & 61440)
            ? 32
            : 16384 === (e.mode & 61440) && ('r' !== Bb(b) || b & 512)
            ? 31
            : yb(e, Bb(b))
          : 44)
      )
        throw new O(d);
      if (b & 512) {
        d = e;
        var g;
        'string' === typeof d ? (g = R(d, { Va: !0 }).node) : (g = d);
        if (!g.pa.va) throw new O(63);
        if (16384 === (g.mode & 61440)) throw new O(31);
        if (32768 !== (g.mode & 61440)) throw new O(28);
        if ((d = yb(g, 'w'))) throw new O(d);
        g.pa.va(g, { size: 0, timestamp: Date.now() });
      }
      b &= -131713;
      e = Eb({
        node: e,
        path: wb(e),
        flags: b,
        seekable: !0,
        position: 0,
        qa: e.qa,
        wb: [],
        error: !1,
      });
      e.qa.open && e.qa.open(e);
      !f.logReadFiles ||
        b & 1 ||
        (Lb || (Lb = {}),
        a in Lb ||
          ((Lb[a] = 1), B('FS.trackingDelegate error on read file: ' + a)));
      try {
        ub.onOpenFile &&
          ((e = 0),
          1 !== (b & 2097155) && (e |= 1),
          0 !== (b & 2097155) && (e |= 2),
          ub.onOpenFile(a, e));
      } catch (k) {
        B(
          "FS.trackingDelegate['onOpenFile']('" +
            a +
            "', flags) threw an exception: " +
            k.message,
        );
      }
    }
    function Mb(a, b, c) {
      if (null === a.fd) throw new O(8);
      if (!a.seekable || !a.qa.Aa) throw new O(70);
      if (0 != c && 1 != c && 2 != c) throw new O(28);
      a.position = a.qa.Aa(a, b, c);
      a.wb = [];
    }
    function Nb() {
      O ||
        ((O = function (a, b) {
          this.node = b;
          this.ob = function (c) {
            this.Ea = c;
          };
          this.ob(a);
          this.message = 'FS error';
        }),
        (O.prototype = Error()),
        (O.prototype.constructor = O),
        [44].forEach(function (a) {
          mb[a] = new O(a);
          mb[a].stack = '<generic error, no stack>';
        }));
    }
    var Ob;
    function Pb(a, b) {
      var c = 0;
      a && (c |= 365);
      b && (c |= 146);
      return c;
    }
    function Qb(a, b, c) {
      a = $a('/dev/' + a);
      var d = Pb(!!b, !!c);
      Rb || (Rb = 64);
      var e = (Rb++ << 8) | 0;
      fb(e, {
        open: function (g) {
          g.seekable = !1;
        },
        close: function () {
          c && c.buffer && c.buffer.length && c(10);
        },
        read: function (g, k, m, l) {
          for (var q = 0, r = 0; r < l; r++) {
            try {
              var u = b();
            } catch (x) {
              throw new O(29);
            }
            if (void 0 === u && 0 === q) throw new O(6);
            if (null === u || void 0 === u) break;
            q++;
            k[m + r] = u;
          }
          q && (g.node.timestamp = Date.now());
          return q;
        },
        write: function (g, k, m, l) {
          for (var q = 0; q < l; q++)
            try {
              c(k[m + q]);
            } catch (r) {
              throw new O(29);
            }
          l && (g.node.timestamp = Date.now());
          return q;
        },
      });
      Ib(a, d, e);
    }
    var Rb,
      Sb = {},
      Fb,
      Lb,
      Tb = {};
    function Ub(a) {
      a = Q[a];
      if (!a) throw new O(8);
      return a;
    }
    var Vb = {};
    function Wb(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function Xb(a) {
      return this.fromWireType(K[a >> 2]);
    }
    var T = {},
      U = {},
      Yb = {};
    function Zb(a) {
      if (void 0 === a) return '_unknown';
      a = a.replace(/[^a-zA-Z0-9_]/g, '$');
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? '_' + a : a;
    }
    function $b(a, b) {
      a = Zb(a);
      return new Function(
        'body',
        'return function ' +
          a +
          '() {\n    "use strict";    return body.apply(this, arguments);\n};\n',
      )(b);
    }
    function ac(a) {
      var b = Error,
        c = $b(a, function (d) {
          this.name = a;
          this.message = d;
          d = Error(d).stack;
          void 0 !== d &&
            (this.stack =
              this.toString() + '\n' + d.replace(/^Error(:[^\n]*)?\n/, ''));
        });
      c.prototype = Object.create(b.prototype);
      c.prototype.constructor = c;
      c.prototype.toString = function () {
        return void 0 === this.message
          ? this.name
          : this.name + ': ' + this.message;
      };
      return c;
    }
    var bc = void 0;
    function cc(a, b, c) {
      function d(m) {
        m = c(m);
        if (m.length !== a.length)
          throw new bc('Mismatched type converter count');
        for (var l = 0; l < a.length; ++l) V(a[l], m[l]);
      }
      a.forEach(function (m) {
        Yb[m] = b;
      });
      var e = Array(b.length),
        g = [],
        k = 0;
      b.forEach(function (m, l) {
        U.hasOwnProperty(m)
          ? (e[l] = U[m])
          : (g.push(m),
            T.hasOwnProperty(m) || (T[m] = []),
            T[m].push(function () {
              e[l] = U[m];
              ++k;
              k === g.length && d(e);
            }));
      });
      0 === g.length && d(e);
    }
    function dc(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError('Unknown type size: ' + a);
      }
    }
    var ec = void 0;
    function W(a) {
      for (var b = ''; E[a]; ) b += ec[E[a++]];
      return b;
    }
    var fc = void 0;
    function X(a) {
      throw new fc(a);
    }
    function V(a, b, c) {
      c = c || {};
      if (!('argPackAdvance' in b))
        throw new TypeError(
          'registerType registeredInstance requires argPackAdvance',
        );
      var d = b.name;
      a || X('type "' + d + '" must have a positive integer typeid pointer');
      if (U.hasOwnProperty(a)) {
        if (c.ib) return;
        X("Cannot register type '" + d + "' twice");
      }
      U[a] = b;
      delete Yb[a];
      T.hasOwnProperty(a) &&
        ((b = T[a]),
        delete T[a],
        b.forEach(function (e) {
          e();
        }));
    }
    var hc = [],
      Y = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function ic(a) {
      4 < a && 0 === --Y[a].Qa && ((Y[a] = void 0), hc.push(a));
    }
    function jc(a) {
      switch (a) {
        case void 0:
          return 1;
        case null:
          return 2;
        case !0:
          return 3;
        case !1:
          return 4;
        default:
          var b = hc.length ? hc.pop() : Y.length;
          Y[b] = { Qa: 1, value: a };
          return b;
      }
    }
    function kc(a) {
      if (null === a) return 'null';
      var b = typeof a;
      return 'object' === b || 'array' === b || 'function' === b
        ? a.toString()
        : '' + a;
    }
    function lc(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(Ba[c >> 2]);
          };
        case 3:
          return function (c) {
            return this.fromWireType(Ca[c >> 3]);
          };
        default:
          throw new TypeError('Unknown float type: ' + a);
      }
    }
    function mc(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          'new_ called with constructor type ' +
            typeof b +
            ' which is not a function',
        );
      var c = $b(b.name || 'unknownFunctionName', function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }
    function nc(a, b) {
      var c = f;
      if (void 0 === c[a].ua) {
        var d = c[a];
        c[a] = function () {
          c[a].ua.hasOwnProperty(arguments.length) ||
            X(
              "Function '" +
                b +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ') - expects one of (' +
                c[a].ua +
                ')!',
            );
          return c[a].ua[arguments.length].apply(this, arguments);
        };
        c[a].ua = [];
        c[a].ua[d.ab] = d;
      }
    }
    function oc(a, b, c) {
      f.hasOwnProperty(a)
        ? ((void 0 === c || (void 0 !== f[a].ua && void 0 !== f[a].ua[c])) &&
            X("Cannot register public name '" + a + "' twice"),
          nc(a, a),
          f.hasOwnProperty(c) &&
            X(
              'Cannot register multiple overloads of a function with the same number of arguments (' +
                c +
                ')!',
            ),
          (f[a].ua[c] = b))
        : ((f[a] = b), void 0 !== c && (f[a].Cb = c));
    }
    function pc(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(H[(b >> 2) + d]);
      return c;
    }
    function qc(a, b) {
      a = W(a);
      var c = f['dynCall_' + a];
      for (var d = [], e = 1; e < a.length; ++e) d.push('a' + e);
      e =
        'return function dynCall_' +
        (a + '_' + b) +
        '(' +
        d.join(', ') +
        ') {\n';
      e +=
        '    return dynCall(rawFunction' +
        (d.length ? ', ' : '') +
        d.join(', ') +
        ');\n';
      c = new Function('dynCall', 'rawFunction', e + '};\n')(c, b);
      'function' !== typeof c &&
        X('unknown function pointer with signature ' + a + ': ' + b);
      return c;
    }
    var rc = void 0;
    function sc(a) {
      a = tc(a);
      var b = W(a);
      Z(a);
      return b;
    }
    function uc(a, b) {
      function c(g) {
        e[g] || U[g] || (Yb[g] ? Yb[g].forEach(c) : (d.push(g), (e[g] = !0)));
      }
      var d = [],
        e = {};
      b.forEach(c);
      throw new rc(a + ': ' + d.map(sc).join([', ']));
    }
    function vc(a, b, c) {
      switch (b) {
        case 0:
          return c
            ? function (d) {
                return J[d];
              }
            : function (d) {
                return E[d];
              };
        case 1:
          return c
            ? function (d) {
                return G[d >> 1];
              }
            : function (d) {
                return va[d >> 1];
              };
        case 2:
          return c
            ? function (d) {
                return H[d >> 2];
              }
            : function (d) {
                return K[d >> 2];
              };
        default:
          throw new TypeError('Unknown integer type: ' + a);
      }
    }
    var wc = {};
    function xc() {
      return 'object' === typeof globalThis
        ? globalThis
        : Function('return this')();
    }
    function yc(a, b) {
      var c = U[a];
      void 0 === c && X(b + ' has unknown type ' + sc(a));
      return c;
    }
    var zc = {},
      Ac = {};
    function Bc() {
      if (!Cc) {
        var a = {
            USER: 'web_user',
            LOGNAME: 'web_user',
            PATH: '/',
            PWD: '/',
            HOME: '/home/web_user',
            LANG:
              (
                ('object' === typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                'C'
              ).replace('-', '_') + '.UTF-8',
            _: ca || './this.program',
          },
          b;
        for (b in Ac) a[b] = Ac[b];
        var c = [];
        for (b in a) c.push(b + '=' + a[b]);
        Cc = c;
      }
      return Cc;
    }
    var Cc;
    function Dc(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    function Ec(a, b) {
      for (var c = 0, d = 0; d <= b; c += a[d++]);
      return c;
    }
    var Fc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Gc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function Hc(a, b) {
      for (a = new Date(a.getTime()); 0 < b; ) {
        var c = a.getMonth(),
          d = (Dc(a.getFullYear()) ? Fc : Gc)[c];
        if (b > d - a.getDate())
          (b -= d - a.getDate() + 1),
            a.setDate(1),
            11 > c
              ? a.setMonth(c + 1)
              : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1));
        else {
          a.setDate(a.getDate() + b);
          break;
        }
      }
      return a;
    }
    function Ic(a, b, c, d) {
      function e(h, n, v) {
        for (h = 'number' === typeof h ? h.toString() : h || ''; h.length < n; )
          h = v[0] + h;
        return h;
      }
      function g(h, n) {
        return e(h, n, '0');
      }
      function k(h, n) {
        function v(F) {
          return 0 > F ? -1 : 0 < F ? 1 : 0;
        }
        var y;
        0 === (y = v(h.getFullYear() - n.getFullYear())) &&
          0 === (y = v(h.getMonth() - n.getMonth())) &&
          (y = v(h.getDate() - n.getDate()));
        return y;
      }
      function m(h) {
        switch (h.getDay()) {
          case 0:
            return new Date(h.getFullYear() - 1, 11, 29);
          case 1:
            return h;
          case 2:
            return new Date(h.getFullYear(), 0, 3);
          case 3:
            return new Date(h.getFullYear(), 0, 2);
          case 4:
            return new Date(h.getFullYear(), 0, 1);
          case 5:
            return new Date(h.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(h.getFullYear() - 1, 11, 30);
        }
      }
      function l(h) {
        h = Hc(new Date(h.sa + 1900, 0, 1), h.La);
        var n = new Date(h.getFullYear() + 1, 0, 4),
          v = m(new Date(h.getFullYear(), 0, 4));
        n = m(n);
        return 0 >= k(v, h)
          ? 0 >= k(n, h)
            ? h.getFullYear() + 1
            : h.getFullYear()
          : h.getFullYear() - 1;
      }
      var q = H[(d + 40) >> 2];
      d = {
        ub: H[d >> 2],
        tb: H[(d + 4) >> 2],
        Ja: H[(d + 8) >> 2],
        Da: H[(d + 12) >> 2],
        Ca: H[(d + 16) >> 2],
        sa: H[(d + 20) >> 2],
        Ka: H[(d + 24) >> 2],
        La: H[(d + 28) >> 2],
        Gb: H[(d + 32) >> 2],
        sb: H[(d + 36) >> 2],
        vb: q ? (q ? D(E, q, void 0) : '') : '',
      };
      c = c ? D(E, c, void 0) : '';
      q = {
        '%c': '%a %b %d %H:%M:%S %Y',
        '%D': '%m/%d/%y',
        '%F': '%Y-%m-%d',
        '%h': '%b',
        '%r': '%I:%M:%S %p',
        '%R': '%H:%M',
        '%T': '%H:%M:%S',
        '%x': '%m/%d/%y',
        '%X': '%H:%M:%S',
        '%Ec': '%c',
        '%EC': '%C',
        '%Ex': '%m/%d/%y',
        '%EX': '%H:%M:%S',
        '%Ey': '%y',
        '%EY': '%Y',
        '%Od': '%d',
        '%Oe': '%e',
        '%OH': '%H',
        '%OI': '%I',
        '%Om': '%m',
        '%OM': '%M',
        '%OS': '%S',
        '%Ou': '%u',
        '%OU': '%U',
        '%OV': '%V',
        '%Ow': '%w',
        '%OW': '%W',
        '%Oy': '%y',
      };
      for (var r in q) c = c.replace(new RegExp(r, 'g'), q[r]);
      var u = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(
          ' ',
        ),
        x = 'January February March April May June July August September October November December'.split(
          ' ',
        );
      q = {
        '%a': function (h) {
          return u[h.Ka].substring(0, 3);
        },
        '%A': function (h) {
          return u[h.Ka];
        },
        '%b': function (h) {
          return x[h.Ca].substring(0, 3);
        },
        '%B': function (h) {
          return x[h.Ca];
        },
        '%C': function (h) {
          return g(((h.sa + 1900) / 100) | 0, 2);
        },
        '%d': function (h) {
          return g(h.Da, 2);
        },
        '%e': function (h) {
          return e(h.Da, 2, ' ');
        },
        '%g': function (h) {
          return l(h).toString().substring(2);
        },
        '%G': function (h) {
          return l(h);
        },
        '%H': function (h) {
          return g(h.Ja, 2);
        },
        '%I': function (h) {
          h = h.Ja;
          0 == h ? (h = 12) : 12 < h && (h -= 12);
          return g(h, 2);
        },
        '%j': function (h) {
          return g(h.Da + Ec(Dc(h.sa + 1900) ? Fc : Gc, h.Ca - 1), 3);
        },
        '%m': function (h) {
          return g(h.Ca + 1, 2);
        },
        '%M': function (h) {
          return g(h.tb, 2);
        },
        '%n': function () {
          return '\n';
        },
        '%p': function (h) {
          return 0 <= h.Ja && 12 > h.Ja ? 'AM' : 'PM';
        },
        '%S': function (h) {
          return g(h.ub, 2);
        },
        '%t': function () {
          return '\t';
        },
        '%u': function (h) {
          return h.Ka || 7;
        },
        '%U': function (h) {
          var n = new Date(h.sa + 1900, 0, 1),
            v = 0 === n.getDay() ? n : Hc(n, 7 - n.getDay());
          h = new Date(h.sa + 1900, h.Ca, h.Da);
          return 0 > k(v, h)
            ? g(
                Math.ceil(
                  (31 -
                    v.getDate() +
                    (Ec(Dc(h.getFullYear()) ? Fc : Gc, h.getMonth() - 1) - 31) +
                    h.getDate()) /
                    7,
                ),
                2,
              )
            : 0 === k(v, n)
            ? '01'
            : '00';
        },
        '%V': function (h) {
          var n = new Date(h.sa + 1901, 0, 4),
            v = m(new Date(h.sa + 1900, 0, 4));
          n = m(n);
          var y = Hc(new Date(h.sa + 1900, 0, 1), h.La);
          return 0 > k(y, v)
            ? '53'
            : 0 >= k(n, y)
            ? '01'
            : g(
                Math.ceil(
                  (v.getFullYear() < h.sa + 1900
                    ? h.La + 32 - v.getDate()
                    : h.La + 1 - v.getDate()) / 7,
                ),
                2,
              );
        },
        '%w': function (h) {
          return h.Ka;
        },
        '%W': function (h) {
          var n = new Date(h.sa, 0, 1),
            v =
              1 === n.getDay()
                ? n
                : Hc(n, 0 === n.getDay() ? 1 : 7 - n.getDay() + 1);
          h = new Date(h.sa + 1900, h.Ca, h.Da);
          return 0 > k(v, h)
            ? g(
                Math.ceil(
                  (31 -
                    v.getDate() +
                    (Ec(Dc(h.getFullYear()) ? Fc : Gc, h.getMonth() - 1) - 31) +
                    h.getDate()) /
                    7,
                ),
                2,
              )
            : 0 === k(v, n)
            ? '01'
            : '00';
        },
        '%y': function (h) {
          return (h.sa + 1900).toString().substring(2);
        },
        '%Y': function (h) {
          return h.sa + 1900;
        },
        '%z': function (h) {
          h = h.sb;
          var n = 0 <= h;
          h = Math.abs(h) / 60;
          return (
            (n ? '+' : '-') +
            String('0000' + ((h / 60) * 100 + (h % 60))).slice(-4)
          );
        },
        '%Z': function (h) {
          return h.vb;
        },
        '%%': function () {
          return '%';
        },
      };
      for (r in q)
        0 <= c.indexOf(r) && (c = c.replace(new RegExp(r, 'g'), q[r](d)));
      r = hb(c, !1);
      if (r.length > b) return 0;
      J.set(r, a);
      return r.length - 1;
    }
    function zb(a, b, c, d) {
      a || (a = this);
      this.parent = a;
      this.ya = a.ya;
      this.Ga = null;
      this.id = rb++;
      this.name = b;
      this.mode = c;
      this.pa = {};
      this.qa = {};
      this.rdev = d;
    }
    Object.defineProperties(zb.prototype, {
      read: {
        get: function () {
          return 365 === (this.mode & 365);
        },
        set: function (a) {
          a ? (this.mode |= 365) : (this.mode &= -366);
        },
      },
      write: {
        get: function () {
          return 146 === (this.mode & 146);
        },
        set: function (a) {
          a ? (this.mode |= 146) : (this.mode &= -147);
        },
      },
    });
    Nb();
    sb = Array(4096);
    Gb(P, '/');
    S('/tmp');
    S('/home');
    S('/home/web_user');
    (function () {
      S('/dev');
      fb(259, {
        read: function () {
          return 0;
        },
        write: function (d, e, g, k) {
          return k;
        },
      });
      Ib('/dev/null', 259);
      eb(1280, ib);
      eb(1536, jb);
      Ib('/dev/tty', 1280);
      Ib('/dev/tty1', 1536);
      if (
        'object' === typeof crypto &&
        'function' === typeof crypto.getRandomValues
      ) {
        var a = new Uint8Array(1);
        var b = function () {
          crypto.getRandomValues(a);
          return a[0];
        };
      } else if (ea)
        try {
          var c = require('crypto');
          b = function () {
            return c.randomBytes(1)[0];
          };
        } catch (d) {}
      b ||
        (b = function () {
          A('random_device');
        });
      Qb('random', b);
      Qb('urandom', b);
      S('/dev/shm');
      S('/dev/shm/tmp');
    })();
    S('/proc');
    S('/proc/self');
    S('/proc/self/fd');
    Gb(
      {
        ya: function () {
          var a = lb('/proc/self', 'fd', 16895, 73);
          a.pa = {
            lookup: function (b, c) {
              var d = Q[+c];
              if (!d) throw new O(8);
              b = {
                parent: null,
                ya: { Za: 'fake' },
                pa: {
                  readlink: function () {
                    return d.path;
                  },
                },
              };
              return (b.parent = b);
            },
          };
          return a;
        },
      },
      '/proc/self/fd',
    );
    bc = f.InternalError = ac('InternalError');
    for (var Jc = Array(256), Kc = 0; 256 > Kc; ++Kc)
      Jc[Kc] = String.fromCharCode(Kc);
    ec = Jc;
    fc = f.BindingError = ac('BindingError');
    f.count_emval_handles = function () {
      for (var a = 0, b = 5; b < Y.length; ++b) void 0 !== Y[b] && ++a;
      return a;
    };
    f.get_first_emval = function () {
      for (var a = 5; a < Y.length; ++a) if (void 0 !== Y[a]) return Y[a];
      return null;
    };
    rc = f.UnboundTypeError = ac('UnboundTypeError');
    function hb(a, b) {
      var c = Array(sa(a) + 1);
      a = ra(a, c, 0, c.length);
      b && (c.length = a);
      return c;
    }
    var Mc = {
      t: function (a) {
        return ob(a);
      },
      G: function () {},
      q: function (a) {
        'uncaught_exception' in Ya ? Ya.Ia++ : (Ya.Ia = 1);
        throw a;
      },
      x: function () {
        H[Lc() >> 2] = 63;
        return -1;
      },
      w: function (a, b) {
        try {
          if (-1 === (a | 0) || 0 === b) var c = -28;
          else {
            var d = Tb[a];
            if (d && b === d.Ab) {
              var e = Q[d.fd];
              if (d.Eb & 2) {
                var g = d.flags,
                  k = d.offset,
                  m = E.slice(a, a + b);
                e && e.qa.Ha && e.qa.Ha(e, m, k, b, g);
              }
              Tb[a] = null;
              d.$a && Z(d.Bb);
            }
            c = 0;
          }
          return c;
        } catch (l) {
          return ('undefined' !== typeof Sb && l instanceof O) || A(l), -l.Ea;
        }
      },
      n: function (a) {
        var b = Vb[a];
        delete Vb[a];
        var c = b.lb,
          d = b.mb,
          e = b.Ua,
          g = e
            .map(function (k) {
              return k.hb;
            })
            .concat(
              e.map(function (k) {
                return k.qb;
              }),
            );
        cc([a], g, function (k) {
          var m = {};
          e.forEach(function (l, q) {
            var r = k[q],
              u = l.fb,
              x = l.gb,
              h = k[q + e.length],
              n = l.pb,
              v = l.rb;
            m[l.cb] = {
              read: function (y) {
                return r.fromWireType(u(x, y));
              },
              write: function (y, F) {
                var ja = [];
                n(v, y, h.toWireType(ja, F));
                Wb(ja);
              },
            };
          });
          return [
            {
              name: b.name,
              fromWireType: function (l) {
                var q = {},
                  r;
                for (r in m) q[r] = m[r].read(l);
                d(l);
                return q;
              },
              toWireType: function (l, q) {
                for (var r in m)
                  if (!(r in q))
                    throw new TypeError('Missing field:  "' + r + '"');
                var u = c();
                for (r in m) m[r].write(u, q[r]);
                null !== l && l.push(d, u);
                return u;
              },
              argPackAdvance: 8,
              readValueFromPointer: Xb,
              wa: d,
            },
          ];
        });
      },
      C: function (a, b, c, d, e) {
        var g = dc(c);
        b = W(b);
        V(a, {
          name: b,
          fromWireType: function (k) {
            return !!k;
          },
          toWireType: function (k, m) {
            return m ? d : e;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (k) {
            if (1 === c) var m = J;
            else if (2 === c) m = G;
            else if (4 === c) m = H;
            else throw new TypeError('Unknown boolean type size: ' + b);
            return this.fromWireType(m[k >> g]);
          },
          wa: null,
        });
      },
      B: function (a, b) {
        b = W(b);
        V(a, {
          name: b,
          fromWireType: function (c) {
            var d = Y[c].value;
            ic(c);
            return d;
          },
          toWireType: function (c, d) {
            return jc(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Xb,
          wa: null,
        });
      },
      j: function (a, b, c) {
        c = dc(c);
        b = W(b);
        V(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, e) {
            if ('number' !== typeof e && 'boolean' !== typeof e)
              throw new TypeError(
                'Cannot convert "' + kc(e) + '" to ' + this.name,
              );
            return e;
          },
          argPackAdvance: 8,
          readValueFromPointer: lc(b, c),
          wa: null,
        });
      },
      m: function (a, b, c, d, e, g) {
        var k = pc(b, c);
        a = W(a);
        e = qc(d, e);
        oc(
          a,
          function () {
            uc('Cannot call ' + a + ' due to unbound types', k);
          },
          b - 1,
        );
        cc([], k, function (m) {
          var l = [m[0], null].concat(m.slice(1)),
            q = (m = a),
            r = e,
            u = l.length;
          2 > u &&
            X(
              "argTypes array size mismatch! Must at least get return value and 'this' types!",
            );
          for (var x = null !== l[1] && !1, h = !1, n = 1; n < l.length; ++n)
            if (null !== l[n] && void 0 === l[n].wa) {
              h = !0;
              break;
            }
          var v = 'void' !== l[0].name,
            y = '',
            F = '';
          for (n = 0; n < u - 2; ++n)
            (y += (0 !== n ? ', ' : '') + 'arg' + n),
              (F += (0 !== n ? ', ' : '') + 'arg' + n + 'Wired');
          q =
            'return function ' +
            Zb(q) +
            '(' +
            y +
            ') {\nif (arguments.length !== ' +
            (u - 2) +
            ") {\nthrowBindingError('function " +
            q +
            " called with ' + arguments.length + ' arguments, expected " +
            (u - 2) +
            " args!');\n}\n";
          h && (q += 'var destructors = [];\n');
          var ja = h ? 'destructors' : 'null';
          y = 'throwBindingError invoker fn runDestructors retType classParam'.split(
            ' ',
          );
          r = [X, r, g, Wb, l[0], l[1]];
          x &&
            (q += 'var thisWired = classParam.toWireType(' + ja + ', this);\n');
          for (n = 0; n < u - 2; ++n)
            (q +=
              'var arg' +
              n +
              'Wired = argType' +
              n +
              '.toWireType(' +
              ja +
              ', arg' +
              n +
              '); // ' +
              l[n + 2].name +
              '\n'),
              y.push('argType' + n),
              r.push(l[n + 2]);
          x && (F = 'thisWired' + (0 < F.length ? ', ' : '') + F);
          q +=
            (v ? 'var rv = ' : '') +
            'invoker(fn' +
            (0 < F.length ? ', ' : '') +
            F +
            ');\n';
          if (h) q += 'runDestructors(destructors);\n';
          else
            for (n = x ? 1 : 2; n < l.length; ++n)
              (u = 1 === n ? 'thisWired' : 'arg' + (n - 2) + 'Wired'),
                null !== l[n].wa &&
                  ((q += u + '_dtor(' + u + '); // ' + l[n].name + '\n'),
                  y.push(u + '_dtor'),
                  r.push(l[n].wa));
          v && (q += 'var ret = retType.fromWireType(rv);\nreturn ret;\n');
          y.push(q + '}\n');
          l = mc(y).apply(null, r);
          n = b - 1;
          if (!f.hasOwnProperty(m))
            throw new bc('Replacing nonexistant public symbol');
          void 0 !== f[m].ua && void 0 !== n
            ? (f[m].ua[n] = l)
            : ((f[m] = l), (f[m].ab = n));
          return [];
        });
      },
      b: function (a, b, c, d, e) {
        function g(q) {
          return q;
        }
        b = W(b);
        -1 === e && (e = 4294967295);
        var k = dc(c);
        if (0 === d) {
          var m = 32 - 8 * c;
          g = function (q) {
            return (q << m) >>> m;
          };
        }
        var l = -1 != b.indexOf('unsigned');
        V(a, {
          name: b,
          fromWireType: g,
          toWireType: function (q, r) {
            if ('number' !== typeof r && 'boolean' !== typeof r)
              throw new TypeError(
                'Cannot convert "' + kc(r) + '" to ' + this.name,
              );
            if (r < d || r > e)
              throw new TypeError(
                'Passing a number "' +
                  kc(r) +
                  '" from JS side to C/C++ side to an argument of type "' +
                  b +
                  '", which is outside the valid range [' +
                  d +
                  ', ' +
                  e +
                  ']!',
              );
            return l ? r >>> 0 : r | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: vc(b, k, 0 !== d),
          wa: null,
        });
      },
      a: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var k = K;
          return new e(I, k[g + 1], k[g]);
        }
        var e = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
        ][b];
        c = W(c);
        V(
          a,
          {
            name: c,
            fromWireType: d,
            argPackAdvance: 8,
            readValueFromPointer: d,
          },
          { ib: !0 },
        );
      },
      k: function (a, b) {
        b = W(b);
        var c = 'std::string' === b;
        V(a, {
          name: b,
          fromWireType: function (d) {
            var e = K[d >> 2];
            if (c)
              for (var g = d + 4, k = 0; k <= e; ++k) {
                var m = d + 4 + k;
                if (k == e || 0 == E[m]) {
                  g = g ? D(E, g, m - g) : '';
                  if (void 0 === l) var l = g;
                  else (l += String.fromCharCode(0)), (l += g);
                  g = m + 1;
                }
              }
            else {
              l = Array(e);
              for (k = 0; k < e; ++k) l[k] = String.fromCharCode(E[d + 4 + k]);
              l = l.join('');
            }
            Z(d);
            return l;
          },
          toWireType: function (d, e) {
            e instanceof ArrayBuffer && (e = new Uint8Array(e));
            var g = 'string' === typeof e;
            g ||
              e instanceof Uint8Array ||
              e instanceof Uint8ClampedArray ||
              e instanceof Int8Array ||
              X('Cannot pass non-string to std::string');
            var k = (c && g
                ? function () {
                    return sa(e);
                  }
                : function () {
                    return e.length;
                  })(),
              m = ob(4 + k + 1);
            K[m >> 2] = k;
            if (c && g) ra(e, E, m + 4, k + 1);
            else if (g)
              for (g = 0; g < k; ++g) {
                var l = e.charCodeAt(g);
                255 < l &&
                  (Z(m),
                  X('String has UTF-16 code units that do not fit in 8 bits'));
                E[m + 4 + g] = l;
              }
            else for (g = 0; g < k; ++g) E[m + 4 + g] = e[g];
            null !== d && d.push(Z, m);
            return m;
          },
          argPackAdvance: 8,
          readValueFromPointer: Xb,
          wa: function (d) {
            Z(d);
          },
        });
      },
      g: function (a, b, c) {
        c = W(c);
        if (2 === b) {
          var d = ua;
          var e = wa;
          var g = xa;
          var k = function () {
            return va;
          };
          var m = 1;
        } else
          4 === b &&
            ((d = ya),
            (e = za),
            (g = Aa),
            (k = function () {
              return K;
            }),
            (m = 2));
        V(a, {
          name: c,
          fromWireType: function (l) {
            for (var q = K[l >> 2], r = k(), u, x = l + 4, h = 0; h <= q; ++h) {
              var n = l + 4 + h * b;
              if (h == q || 0 == r[n >> m])
                (x = d(x, n - x)),
                  void 0 === u
                    ? (u = x)
                    : ((u += String.fromCharCode(0)), (u += x)),
                  (x = n + b);
            }
            Z(l);
            return u;
          },
          toWireType: function (l, q) {
            'string' !== typeof q &&
              X('Cannot pass non-string to C++ string type ' + c);
            var r = g(q),
              u = ob(4 + r + b);
            K[u >> 2] = r >> m;
            e(q, u + 4, r + b);
            null !== l && l.push(Z, u);
            return u;
          },
          argPackAdvance: 8,
          readValueFromPointer: Xb,
          wa: function (l) {
            Z(l);
          },
        });
      },
      o: function (a, b, c, d, e, g) {
        Vb[a] = { name: W(b), lb: qc(c, d), mb: qc(e, g), Ua: [] };
      },
      h: function (a, b, c, d, e, g, k, m, l, q) {
        Vb[a].Ua.push({
          cb: W(b),
          hb: c,
          fb: qc(d, e),
          gb: g,
          qb: k,
          pb: qc(m, l),
          rb: q,
        });
      },
      D: function (a, b) {
        b = W(b);
        V(a, {
          zb: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {},
        });
      },
      e: ic,
      F: function (a) {
        if (0 === a) return jc(xc());
        var b = wc[a];
        a = void 0 === b ? W(a) : b;
        return jc(xc()[a]);
      },
      E: function (a) {
        4 < a && (Y[a].Qa += 1);
      },
      p: function (a, b, c, d) {
        a || X('Cannot use deleted val. handle = ' + a);
        a = Y[a].value;
        var e = zc[b];
        if (!e) {
          e = '';
          for (var g = 0; g < b; ++g) e += (0 !== g ? ', ' : '') + 'arg' + g;
          var k =
            'return function emval_allocator_' +
            b +
            '(constructor, argTypes, args) {\n';
          for (g = 0; g < b; ++g)
            k +=
              'var argType' +
              g +
              " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " +
              g +
              '], "parameter ' +
              g +
              '");\nvar arg' +
              g +
              ' = argType' +
              g +
              '.readValueFromPointer(args);\nargs += argType' +
              g +
              "['argPackAdvance'];\n";
          e = new Function(
            'requireRegisteredType',
            'Module',
            '__emval_register',
            k +
              ('var obj = new constructor(' +
                e +
                ');\nreturn __emval_register(obj);\n}\n'),
          )(yc, f, jc);
          zc[b] = e;
        }
        return e(a, c, d);
      },
      l: function () {
        A();
      },
      u: function (a, b, c) {
        E.copyWithin(a, b, b + c);
      },
      d: function (a) {
        a >>>= 0;
        var b = E.length;
        if (2147483648 < a) return !1;
        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + 0.2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - (d % 65536));
          a: {
            try {
              C.grow((Math.min(2147483648, d) - I.byteLength + 65535) >>> 16);
              Da(C.buffer);
              var e = 1;
              break a;
            } catch (g) {}
            e = void 0;
          }
          if (e) return !0;
        }
        return !1;
      },
      y: function (a, b) {
        var c = 0;
        Bc().forEach(function (d, e) {
          var g = b + c;
          e = H[(a + 4 * e) >> 2] = g;
          for (g = 0; g < d.length; ++g) J[e++ >> 0] = d.charCodeAt(g);
          J[e >> 0] = 0;
          c += d.length + 1;
        });
        return 0;
      },
      z: function (a, b) {
        var c = Bc();
        H[a >> 2] = c.length;
        var d = 0;
        c.forEach(function (e) {
          d += e.length + 1;
        });
        H[b >> 2] = d;
        return 0;
      },
      A: function (a) {
        try {
          var b = Ub(a);
          if (null === b.fd) throw new O(8);
          b.Na && (b.Na = null);
          try {
            b.qa.close && b.qa.close(b);
          } catch (c) {
            throw c;
          } finally {
            Q[b.fd] = null;
          }
          b.fd = null;
          return 0;
        } catch (c) {
          return ('undefined' !== typeof Sb && c instanceof O) || A(c), c.Ea;
        }
      },
      r: function (a, b, c, d, e) {
        try {
          var g = Ub(a);
          a = 4294967296 * c + (b >>> 0);
          if (-9007199254740992 >= a || 9007199254740992 <= a) return -61;
          Mb(g, a, d);
          Wa = [
            g.position >>> 0,
            ((N = g.position),
            1 <= +La(N)
              ? 0 < N
                ? (Oa(+Na(N / 4294967296), 4294967295) | 0) >>> 0
                : ~~+Ma((N - +(~~N >>> 0)) / 4294967296) >>> 0
              : 0),
          ];
          H[e >> 2] = Wa[0];
          H[(e + 4) >> 2] = Wa[1];
          g.Na && 0 === a && 0 === d && (g.Na = null);
          return 0;
        } catch (k) {
          return ('undefined' !== typeof Sb && k instanceof O) || A(k), k.Ea;
        }
      },
      i: function (a, b, c, d) {
        try {
          a: {
            for (var e = Ub(a), g = (a = 0); g < c; g++) {
              var k = e,
                m = H[(b + 8 * g) >> 2],
                l = H[(b + (8 * g + 4)) >> 2],
                q = void 0,
                r = J;
              if (0 > l || 0 > q) throw new O(28);
              if (null === k.fd) throw new O(8);
              if (0 === (k.flags & 2097155)) throw new O(8);
              if (16384 === (k.node.mode & 61440)) throw new O(31);
              if (!k.qa.write) throw new O(28);
              k.seekable && k.flags & 1024 && Mb(k, 0, 2);
              var u = 'undefined' !== typeof q;
              if (!u) q = k.position;
              else if (!k.seekable) throw new O(70);
              var x = k.qa.write(k, r, m, l, q, void 0);
              u || (k.position += x);
              try {
                if (k.path && ub.onWriteToFile) ub.onWriteToFile(k.path);
              } catch (v) {
                B(
                  "FS.trackingDelegate['onWriteToFile']('" +
                    k.path +
                    "') threw an exception: " +
                    v.message,
                );
              }
              var h = x;
              if (0 > h) {
                var n = -1;
                break a;
              }
              a += h;
            }
            n = a;
          }
          H[d >> 2] = n;
          return 0;
        } catch (v) {
          return ('undefined' !== typeof Sb && v instanceof O) || A(v), v.Ea;
        }
      },
      memory: C,
      f: function (a) {
        a = +a;
        return 0 <= a ? +Na(a + 0.5) : +Ma(a - 0.5);
      },
      c: function (a) {
        a = +a;
        return 0 <= a ? +Na(a + 0.5) : +Ma(a - 0.5);
      },
      s: function () {},
      v: function (a, b, c, d) {
        return Ic(a, b, c, d);
      },
      table: oa,
    };
    (function () {
      function a(e) {
        f.asm = e.exports;
        L--;
        f.monitorRunDependencies && f.monitorRunDependencies(L);
        0 == L &&
          (null !== Pa && (clearInterval(Pa), (Pa = null)),
          Qa && ((e = Qa), (Qa = null), e()));
      }
      function b(e) {
        a(e.instance);
      }
      function c(e) {
        return Va()
          .then(function (g) {
            return WebAssembly.instantiate(g, d);
          })
          .then(e, function (g) {
            B('failed to asynchronously prepare wasm: ' + g);
            A(g);
          });
      }
      var d = { a: Mc };
      L++;
      f.monitorRunDependencies && f.monitorRunDependencies(L);
      if (f.instantiateWasm)
        try {
          return f.instantiateWasm(d, a);
        } catch (e) {
          return (
            B('Module.instantiateWasm callback failed with error: ' + e), !1
          );
        }
      (function () {
        if (
          na ||
          'function' !== typeof WebAssembly.instantiateStreaming ||
          Sa() ||
          Ra('file://') ||
          'function' !== typeof fetch
        )
          return c(b);
        fetch(M, { credentials: 'same-origin' }).then(function (e) {
          return WebAssembly.instantiateStreaming(e, d).then(b, function (g) {
            B('wasm streaming compile failed: ' + g);
            B('falling back to ArrayBuffer instantiation');
            return c(b);
          });
        });
      })();
      return {};
    })();
    var Xa = (f.___wasm_call_ctors = function () {
        return (Xa = f.___wasm_call_ctors = f.asm.H).apply(null, arguments);
      }),
      ob = (f._malloc = function () {
        return (ob = f._malloc = f.asm.I).apply(null, arguments);
      }),
      Z = (f._free = function () {
        return (Z = f._free = f.asm.J).apply(null, arguments);
      }),
      Lc = (f.___errno_location = function () {
        return (Lc = f.___errno_location = f.asm.K).apply(null, arguments);
      }),
      tc = (f.___getTypeName = function () {
        return (tc = f.___getTypeName = f.asm.L).apply(null, arguments);
      });
    f.___embind_register_native_and_builtin_types = function () {
      return (f.___embind_register_native_and_builtin_types = f.asm.M).apply(
        null,
        arguments,
      );
    };
    f.dynCall_i = function () {
      return (f.dynCall_i = f.asm.N).apply(null, arguments);
    };
    f.dynCall_vi = function () {
      return (f.dynCall_vi = f.asm.O).apply(null, arguments);
    };
    f.dynCall_iii = function () {
      return (f.dynCall_iii = f.asm.P).apply(null, arguments);
    };
    f.dynCall_viii = function () {
      return (f.dynCall_viii = f.asm.Q).apply(null, arguments);
    };
    f.dynCall_fii = function () {
      return (f.dynCall_fii = f.asm.R).apply(null, arguments);
    };
    f.dynCall_viif = function () {
      return (f.dynCall_viif = f.asm.S).apply(null, arguments);
    };
    f.dynCall_iiiiii = function () {
      return (f.dynCall_iiiiii = f.asm.T).apply(null, arguments);
    };
    f.dynCall_viiiii = function () {
      return (f.dynCall_viiiii = f.asm.U).apply(null, arguments);
    };
    f.dynCall_iidiiii = function () {
      return (f.dynCall_iidiiii = f.asm.V).apply(null, arguments);
    };
    f.dynCall_vii = function () {
      return (f.dynCall_vii = f.asm.W).apply(null, arguments);
    };
    f.dynCall_ii = function () {
      return (f.dynCall_ii = f.asm.X).apply(null, arguments);
    };
    f.dynCall_iiiiiii = function () {
      return (f.dynCall_iiiiiii = f.asm.Y).apply(null, arguments);
    };
    f.dynCall_viiii = function () {
      return (f.dynCall_viiii = f.asm.Z).apply(null, arguments);
    };
    f.dynCall_iiii = function () {
      return (f.dynCall_iiii = f.asm._).apply(null, arguments);
    };
    f.dynCall_viiiiiii = function () {
      return (f.dynCall_viiiiiii = f.asm.$).apply(null, arguments);
    };
    f.dynCall_viijii = function () {
      return (f.dynCall_viijii = f.asm.aa).apply(null, arguments);
    };
    f.dynCall_v = function () {
      return (f.dynCall_v = f.asm.ba).apply(null, arguments);
    };
    f.dynCall_iiiii = function () {
      return (f.dynCall_iiiii = f.asm.ca).apply(null, arguments);
    };
    f.dynCall_fi = function () {
      return (f.dynCall_fi = f.asm.da).apply(null, arguments);
    };
    f.dynCall_viiiiii = function () {
      return (f.dynCall_viiiiii = f.asm.ea).apply(null, arguments);
    };
    f.dynCall_iiji = function () {
      return (f.dynCall_iiji = f.asm.fa).apply(null, arguments);
    };
    f.dynCall_iifi = function () {
      return (f.dynCall_iifi = f.asm.ga).apply(null, arguments);
    };
    f.dynCall_jiji = function () {
      return (f.dynCall_jiji = f.asm.ha).apply(null, arguments);
    };
    f.dynCall_iiiiiiiii = function () {
      return (f.dynCall_iiiiiiiii = f.asm.ia).apply(null, arguments);
    };
    f.dynCall_iiiiiiii = function () {
      return (f.dynCall_iiiiiiii = f.asm.ja).apply(null, arguments);
    };
    f.dynCall_iiiiiijj = function () {
      return (f.dynCall_iiiiiijj = f.asm.ka).apply(null, arguments);
    };
    f.dynCall_iiiiij = function () {
      return (f.dynCall_iiiiij = f.asm.la).apply(null, arguments);
    };
    f.dynCall_iiiiid = function () {
      return (f.dynCall_iiiiid = f.asm.ma).apply(null, arguments);
    };
    f.dynCall_iiiiijj = function () {
      return (f.dynCall_iiiiijj = f.asm.na).apply(null, arguments);
    };
    var Nc;
    Qa = function Oc() {
      Nc || Pc();
      Nc || (Qa = Oc);
    };
    function Pc() {
      function a() {
        if (!Nc && ((Nc = !0), (f.calledRun = !0), !pa)) {
          f.noFSInit ||
            Ob ||
            ((Ob = !0),
            Nb(),
            (f.stdin = f.stdin),
            (f.stdout = f.stdout),
            (f.stderr = f.stderr),
            f.stdin ? Qb('stdin', f.stdin) : Jb('/dev/tty', '/dev/stdin'),
            f.stdout
              ? Qb('stdout', null, f.stdout)
              : Jb('/dev/tty', '/dev/stdout'),
            f.stderr
              ? Qb('stderr', null, f.stderr)
              : Jb('/dev/tty1', '/dev/stderr'),
            Kb('/dev/stdin', 'r'),
            Kb('/dev/stdout', 'w'),
            Kb('/dev/stderr', 'w'));
          Fa(Ha);
          tb = !1;
          Fa(Ia);
          aa(f);
          if (f.onRuntimeInitialized) f.onRuntimeInitialized();
          if (f.postRun)
            for (
              'function' == typeof f.postRun && (f.postRun = [f.postRun]);
              f.postRun.length;

            ) {
              var b = f.postRun.shift();
              Ja.unshift(b);
            }
          Fa(Ja);
        }
      }
      if (!(0 < L)) {
        if (f.preRun)
          for (
            'function' == typeof f.preRun && (f.preRun = [f.preRun]);
            f.preRun.length;

          )
            Ka();
        Fa(Ga);
        0 < L ||
          (f.setStatus
            ? (f.setStatus('Running...'),
              setTimeout(function () {
                setTimeout(function () {
                  f.setStatus('');
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    f.run = Pc;
    if (f.preInit)
      for (
        'function' == typeof f.preInit && (f.preInit = [f.preInit]);
        0 < f.preInit.length;

      )
        f.preInit.pop()();
    noExitRuntime = !0;
    Pc();

    return jxl_enc.ready;
  };
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = jxl_enc;
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return jxl_enc;
  });
else if (typeof exports === 'object') exports['jxl_enc'] = jxl_enc;
