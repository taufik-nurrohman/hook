import {isSet} from '@taufik-nurrohman/is';

export function hook($) {
    const constructor = $.constructor.prototype;
    constructor.fire = function (name, data) {
        let $ = this,
            {hooks} = $;
        if (!isSet(hooks[name])) {
            return $;
        }
        hooks[name].forEach(then => then.apply($, data));
        return $;
    };
    constructor.off = function (name, then) {
        let $ = this,
            {hooks} = $;
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
    };
    constructor.on = function (name, then) {
        let $ = this,
            {hooks} = $;
        if (!isSet(hooks[name])) {
            hooks[name] = [];
        }
        if (isSet(then)) {
            hooks[name].push(then);
        }
        return $;
    };
    return ($.hooks = {}), $;
}