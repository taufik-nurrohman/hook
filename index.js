const {isSet} = require('@taufik-nurrohman/is');

function hook($) {
    let hooks = {};
    function fire(name, data) {
        if (!isSet(hooks[name])) {
            return $;
        }
        hooks[name].forEach(then => then.apply($, data));
        return $;
    }
    function off(name, then) {
        if (!isSet(name)) {
            return (hooks = {}), $;
        }
        if (isSet(hooks[name])) {
            if (isSet(then)) {
                let j = hooks[name].length;
                // Clean-up empty hook(s)
                if (0 === j) {
                    delete hooks[name];
                } else {
                    for (let i = 0; i < j; ++i) {
                        if (then === hooks[name][i]) {
                            hooks[name].splice(i, 1);
                            break;
                        }
                    }
                }
            } else {
                delete hooks[name];
            }
        }
        return $;
    }
    function on(name, then) {
        if (!isSet(hooks[name])) {
            hooks[name] = [];
        }
        if (isSet(then)) {
            hooks[name].push(then);
        }
        return $;
    }
    $.hooks = hooks;
    $.fire = fire;
    $.off = off;
    $.on = on;
    return $;
}

Object.assign(exports, {hook});