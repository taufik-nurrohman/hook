Hook Utility
============

JavaScript hook system.

Usage
-----

### Browser

~~~ html
<script src="./@taufik-nurrohman/hook/index.js"></script>
<script>
on('click', () => console.log('click 1'));
on('click', () => console.log('click 2'));
on('focus', () => console.log('focus 1'));

console.log(hooks);
</script>
~~~

### Browser Module

~~~ html
<script type="module">
import {
    hooks,
    on
} from './@taufik-nurrohman/hook/index.mjs';

on('click', () => console.log('click 1'));
on('click', () => console.log('click 2'));
on('focus', () => console.log('focus 1'));

console.log(hooks);
</script>
~~~

### CommonJS Module

~~~ js
const {
    hooks,
    on
} = require('@taufik-nurrohman/hook');

on('click', () => console.log('click 1'));
on('click', () => console.log('click 2'));
on('focus', () => console.log('focus 1'));

console.log(hooks);
~~~

### ECMAScript Module

~~~ js
import {
    hooks,
    on
} from '@taufik-nurrohman/hook';

on('click', () => console.log('click 1'));
on('click', () => console.log('click 2'));
on('focus', () => console.log('focus 1'));

console.log(hooks);
~~~

Methods
-------

### fire(event, data)

Fire a custom event.

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

### off(event, fn)

~~~ js
// Remove all `window-resize` hooks
off('window-resize');

// Remove `onWindowResize` hook from `window-resize` event
off('window-resize', onWindowResize);
~~~

### on(event, fn)

~~~ js
// Add `window-resize` hook anonymously
on('window-resize', data => {
    console.log([
        data.height,
        data.width
    ]);
});

// Add `window-resize` hook with named function
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
import {
    fire,
    hooks,
    off,
    on
} from '@taufik-nurrohman/hook';

class Widget {
    constructor() {
        this.#data = [];
        this.fire = fire.bind(this);
        this.hooks = hooks;
        this.off = off.bind(this);
        this.on = on.bind(this);
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
