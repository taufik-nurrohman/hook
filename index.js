const {isSet} = require('@taufik-nurrohman/is');

function hook($, $$) {
    $$ = $$ || $;
    $$.fire = function (event, data, that) {
        let $ = this,
            {hooks} = $;
        if (!isSet(hooks[event])) {
            return $;
        }
        hooks[event].forEach(then => then.apply(that || $, data));
        return $;
    };
    $$.off = function (event, then) {
        let $ = this,
            {hooks} = $;
        if (!isSet(event)) {
            return (hooks = {}), $;
        }
        if (isSet(hooks[event])) {
            if (isSet(then)) {
                let j = hooks[event].length;
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