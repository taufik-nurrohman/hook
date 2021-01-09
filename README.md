Hook Utility
============

JavaScript hook system.

Usage
-----

### CommonJS

~~~ js
const {hooks, on} = require('@taufik-nurrohman/hook');

on('click', () => console.log('click 1'));
on('click', () => console.log('click 2'));
on('focus', () => console.log('focus 1'));

console.log(hooks);
~~~

### ECMAScript

~~~ js
import {hooks, on} from '@taufik-nurrohman/hook';

on('click', () => console.log('click 1'));
on('click', () => console.log('click 2'));
on('focus', () => console.log('focus 1'));

console.log(hooks);
~~~

Methods
-------

### fire(event, data)

Fire a hook.

~~~ js
window.addEventListener('resize', () => {
    fire('window-resize', [{
        height: window.innerHeight,
        width: window.innerWidth
    }]);
});
~~~

### hooks

Return the added hooks.

~~~ js
console.log(hooks);
~~~

### off(event, then)

Remove a hook.

Remove all `window-resize` hooks.

~~~ js
off('window-resize');
~~~

Remove `onWindowResize` hook from `window-resize` event.

~~~ js
off('window-resize', onWindowResize);
~~~

### on(event, then)

Add a hook.

Add `window-resize` hook anonymously.

~~~ js
on('window-resize', data => {
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

on('window-resize', onWindowResize);
~~~

Extends
-------

Extend the hook system to an application.

~~~ js
import {context} from '@taufik-nurrohman/hook';

class Widget {
    constructor() {
        this.#data = [];
        let $ = context(this);
        this.fire = $.fire;
        this.hooks = $.hooks;
        this.off = $.off;
        this.on = $.on;
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
