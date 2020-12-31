const {isSet} = require('@taufik-nurrohman/is');

function fire(name, data) {
    const $ = this;
    if (!isSet(hooks[name])) {
        return $;
    }
    hooks[name].forEach(then => then.apply($, data));
    return $;
}

let hooks = {};

function off(name, then) {
    const $ = this;
    if (!isSet(name)) {
        return (hooks = {}), $;
    }
    if (isSet(hooks[name])) {
        if (isSet(then)) {
            for (let i = 0, j = hooks[name].length; i < j; ++i) {
                if (then === hooks[name][i]) {
                    hooks[name].splice(i, 1);
                    break;
                }
            }
            // Clean-up empty hook(s)
            if (0 === j) {
                delete hooks[name];
            }
        } else {
            delete hooks[name];
        }
    }
    return $;
}

function on(name, then) {
    const $ = this;
    if (!isSet(hooks[name])) {
        hooks[name] = [];
    }
    if (isSet(then)) {
        hooks[name].push(then);
    }
    return $;
}

Object.assign(exports || {}, {
    fire,
    hooks,
    off,
    on
});
