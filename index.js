// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const {isSet} = require('@taufik-nurrohman/is');
    const hooks = {};
    function fire(event, data) {
        const $ = this;
        if (!isSet(hooks[event])) {
            return $;
        }
        hooks[event].forEach(hook => hook.apply($, data));
        return $;
    }
    function off(event, fn) {
        const $ = this;
        if (!isSet(event)) {
            return (hooks = {}), $;
        }
        if (isSet(hooks[event])) {
            if (isSet(fn)) {
                hooks[event].forEach((hook, i) => {
                    if (fn === hook) {
                        hooks[event].splice(i, 1);
                    }
                });
                // Clean-up empty hook(s)
                if (0 === hooks[event].length) {
                    delete hooks[event];
                }
            } else {
                delete hooks[event];
            }
        }
        return $;
    }
    function on(event, fn) {
        const $ = this;
        if (!isSet(hooks[event])) {
            hooks[event] = [];
        }
        if (isSet(fn)) {
            hooks[event].push(fn);
        }
        return $;
    }
    $$.fire = fire;
    $$.hooks = hooks;
    $$.off = off;
    $$.on = on;
})(exports || window || {});
