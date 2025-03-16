const {forEachArray} = require('@taufik-nurrohman/f');
const {isSet} = require('@taufik-nurrohman/is');
const {toCount} = require('@taufik-nurrohman/to');

function hook($, $$) {
    $$ = $$ || $;
    $$.fire = function (event, data, that) {
        let $ = this,
            {hooks} = $;
        if (!isSet(hooks[event])) {
            return $;
        }
        return forEachArray(hooks[event], v => {
            v.apply(that || $, data);
        }), $;
    };
    $$.off = function (event, then) {
        let $ = this,
            {hooks} = $;
        if (!isSet(event)) {
            return (hooks = {}), $;
        }
        if (isSet(hooks[event])) {
            if (isSet(then)) {
                let j = toCount(hooks[event]);
                // Clean-up empty hook(s)
                if (0 === j) {
                    delete hooks[event];
                } else {
                    for (let i = 0; i < j; ++i) {
                        if (then === hooks[event][i]) {
                            hooks[event].splice(i, 1);
                            break;
                        }
                    }
                }
            } else {
                delete hooks[event];
            }
        }
        return $;
    };
    $$.on = function (event, then) {
        let $ = this,
            {hooks} = $;
        if (!isSet(hooks[event])) {
            hooks[event] = [];
        }
        if (isSet(then)) {
            hooks[event].push(then);
        }
        return $;
    };
    return ($.hooks = {}), $;
}

Object.assign(exports, {hook});