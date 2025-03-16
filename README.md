Hook Utility
============

JavaScript hook system.

Usage
-----

### CommonJS

~~~ js
const {hook} = require('@taufik-nurrohman/hook');

hook(window);

window.on('click', () => console.log('click 1'));
window.on('click', () => console.log('click 2'));
window.on('focus', () => console.log('focus 1'));

console.log(window.hooks);
~~~

### ECMAScript

~~~ js
import {hook} from '@taufik-nurrohman/hook';

hook(window);

window.on('click', () => console.log('click 1'));
window.on('click', () => console.log('click 2'));
window.on('focus', () => console.log('focus 1'));

console.log(window.hooks);
~~~

Methods
-------

### hook(object, objectPrototype)

Create hook properties to an object.

~~~ js
hook(window);

window.addEventListener('resize', () => {
    window.fire('window-resize', [{
        height: window.innerHeight,
        width: window.innerWidth
    }]);
});
~~~

#### object.fire(event, data, that)

Fire a hook.

~~~ js
window.addEventListener('resize', () => {
    window.fire('window-resize', [{
        height: window.innerHeight,
        width: window.innerWidth
    }]);
});
~~~

~~~ js
window.on('test', function (a, b, c) {
    console.log(this); // Returns `Set [1, 2, 3]`
    console.log({a, b, c}); // Returns `{ a: 1, b: 2, c: 3 }`
});

window.fire('test', [1, 2, 3], new Set([1, 2, 3]));
~~~

#### object.hooks

Return the added hooks.

~~~ js
console.log(window.hooks);
~~~

#### object.off(event, then)

Remove a hook.

Remove all `window-resize` hooks.

~~~ js
window.off('window-resize');
~~~

Remove `onWindowResize` hook from `window-resize` event.

~~~ js
window.off('window-resize', onWindowResize);
~~~

#### object.on(event, then)

Add a hook.

Add `window-resize` hook anonymously.

~~~ js
window.on('window-resize', data => {
    console.log([
        data.height,
        data.width
    ]);
});
~~~

Add `window-resize` hook with named function.

~~~ js
function onWindowResize(data) {
    console.log([
        data.height,
        data.width
    ]);
}

window.on('window-resize', onWindowResize);
~~~

Extends
-------

Extend the hook system to an application.

~~~ js
import {hook} from '@taufik-nurrohman/hook';

class Widget {
    constructor() {
        this.#data = [];
        // This will create `fire()`, `off()`, and `on()` methods, and a `hooks` property
        hook(this, this.constructor.prototype);
    }
    append(datum) {
        this.#data.push(datum);
        this.fire('update', [datum]);
        return this;
    }
    create(data) {
        this.#data = data;
        this.fire('create');
        return this;
    }
    destroy() {
        this.fire('destroy');
        return this;
    }
    prepend(datum) {
        this.#data.unshift(datum);
        this.fire('update', [datum]);
        return this;
    }
}

const widget = new Widget;

widget.on('create', () => {
    console.log('Created!');
});

widget.on('destroy', () => {
    console.log('Destroyed!');
});

widget.on('update', datum => {
    console.log('Added ' + datum);
});

widget.create([1, 2, 3]);
widget.append(4).append(5).append(6);

// `Created!`
// `Added 4`
// `Added 5`
// `Added 6`
~~~