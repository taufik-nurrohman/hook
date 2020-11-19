Hook Utility
============

Simple JavaScript hook system.

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

// Remove `onWindowResize` `window-resize` hook only
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

class Application {
    constructor() {
        this.data = [];
        this.fire = fire.bind(this);
        this.hooks = hooks;
        this.off = off.bind(this);
        this.on = on.bind(this);
    }
    append(data) {
        this.data.push(data);
        this.fire('update', [data]);
    }
    create(data) {
        this.data = data;
        this.fire('create');
    }
    destroy() {
        this.fire('destroy');
    }
    prepend(data) {
        this.data.unshift(data);
        this.fire('update', [data]);
    }
}

const application = new Application;

application.on('create', () => {
    console.log('Created!');
});

application.on('destroy', () => {
    console.log('Destroyed!');
});

application.on('update', data => {
    console.log('Added ' + data);
});

application.create([1, 2, 3]);
application.append(4);
application.append(5);
application.append(6);
~~~
