import {isSet} from '@taufik-nurrohman/is';

export const hooks = {};

export function fire(event, data) {
    const $ = this;
    if (!isSet(hooks[event])) {
        return $;
    }
    hooks[event].forEach(hook => hook.apply($, data));
    return $;
}

export function off(event, fn) {
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

export function on(event, fn) {
    const $ = this;
    if (!isSet(hooks[event])) {
        hooks[event] = [];
    }
    if (isSet(fn)) {
        hooks[event].push(fn);
    }
    return $;
}
