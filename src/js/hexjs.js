import * as PREF from './pref.js';
import * as PAGE from './utile/page.js';
import * as SCENE from './utile/scene.js';
import * as DES from './des.js';

(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
  else if (typeof define === 'function' && define.amd) define('hexjs', [], factory);
  else if (typeof exports === 'object') exports['hexjs'] = factory();
  else root['HEX'] = factory();
})(typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : this, () => {

  /* Modules Registry */
  /* Modules Class    */
  /* Modules Function */

  return (() => {
    'use strict';

    /*
    <Modules Registry>
    */

    const modules = {};
    modules._legacy = (_unused, _exports, _require) => {
      _require.d(_exports, {
        Dev: () => IM.Dev,
        Page: () => IM.Page,
        Scene: () => IM.Scene,

        Pref: () => IM.Pref,
        Des: () => IM.Des
      });

      const IM = _require('_commom');

      const globalObject = typeof _require.g !== 'undefined' ? _require.g : typeof window !== 'undefined' ? window : undefined;
      if (typeof globalObject !== 'undefined') {
        globalObject.HEX = globalObject.HEX || {};
        const HEXGLOBAL = globalObject.HEX;
       
        for (let key in IM) {
          if (!HEXGLOBAL[key]) {
            HEXGLOBAL[key] = IM[key];
          }
        }
      }
    };

    /* 
    </Modules Registry>
    */

    /*
    <Modules Class>
    */

    modules._commom = (_unused, _exports, _require) => {
      _require.r(_exports);
      _require.d(_exports, {
        Dev: () => Dev,
        Page: () => Page,
        Scene: () => Scene,

        Pref: () => Pref,

        Des: () => Des
      });
      
      /* <Dev> */
      const Dev = function () {};

      Dev.prototype._info = function () {
        this.ver = '#0.0.0';
        this.date = '24-0712-1207';

        return this;
      };

      Dev.prototype.isDev = false;
      Object.defineProperty(Dev.prototype, '_isDev', {
        get() {
          return this.isDev;
        },
        set(value) {
          if (this.isDev === value) return;
          this.isDev = value;
        },
        enumerable: false,
        configurable: true,
      });
      /* </Dev> */

      /* <Page> */ const Page = PAGE;
      /* <Scene> */ const Scene = SCENE;  

      /* <Pref>  */ const Pref = PREF;
      /* <Des>   */ const Des = DES;

    };

    /*
    </Modules Class>
    */

    /*
    <Modules Function>
    */

    let _module_cache_ = {};
    const _require = (moduleId) => {
      let cachedModule = _module_cache_[moduleId];
      if (cachedModule !== undefined) return cachedModule.exports;

      let module = (_module_cache_[moduleId] = {
        exports: {},
      });
      modules[moduleId](module, module.exports, _require);

      return module.exports;
    };

    (() => {
      _require.d = (exports, definition) => {
        for (var key in definition) {
          if (_require.o(definition, key) && !_require.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          }
        }
      };
    })();

    (() => {
      _require.g = (function () {
        if (typeof globalThis === 'object') return globalThis;
        try {
          return this || new Function('return this')();
        } catch (e) {
          if (typeof window === 'object') return window;
        }
      })();
    })();

    (() => {
      _require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();

    (() => {
      _require.r = (exports) => {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        }
        Object.defineProperty(exports, '_esModule', { value: true });
      };
    })();

    let _exports = {};
    (() => {
      _require.r(_exports);
      _require.d(_exports, {
        core: () => _IMPORTED_MODULE_LEGACY_,
        default: () => _DEFAULT_EXPORT_,
      });

      const _IMPORTED_MODULE_LEGACY_ = _require('_legacy');
      const _DEFAULT_EXPORT_ = _IMPORTED_MODULE_LEGACY_;
    })();

    _exports = _exports['default'];

    return _exports;

    /*
    </Modules Function>
    */
  })();
});
