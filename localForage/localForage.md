# localForage

中文文档：https://localforage.docschina.org/

localForage 是简单快速的存储库。在离线模式下，使用异步存储（indexedDB or WebSQL）提升了存储体验，API 很简单。

localForage is a fast and simple storage library for JavaScript. localForage improves the offline experience of your web app by using asynchronous storage (IndexedDB or WebSQL) with a simple, `localStorage`-like API.

localForage uses localStorage in browsers with no IndexedDB or WebSQL support. See [the wiki for detailed compatibility info](https://github.com/localForage/localForage/wiki/Supported-Browsers-Platforms).

To use localForage, just drop a single JavaScript file into your page:

```
<script src="localforage/dist/localforage.js"></script>
<script>localforage.getItem('something', myCallback);</script>
```

```
npm install localforage
```

文档链接：Try the [localForage API documentation](https://localforage.github.io/localForage).

# 使用

## Callbacks vs Promises

使用异步存储，所以有一个异步的 API，和 localStorage 是一样的，可以使用 callback 语法，或者 Promise 语法，async 语法等。

Because localForage uses async storage, it has an async API. It's otherwise exactly the same as the [localStorage API](https://hacks.mozilla.org/2009/06/localstorage/).

localForage has a dual API that allows you to either use Node-style callbacks or [Promises](https://www.promisejs.org/). If you are unsure which one is right for you, it's recommended to use Promises.

Here's an example of the Node-style callback form:

```js
localforage.setItem('key', 'value', function (err) {
  // if err is non-null, we got an error
  localforage.getItem('key', function (err, value) {
    // if err is non-null, we got an error. otherwise, value is the value
  });
});
```

And the Promise form:

```js
localforage.setItem('key', 'value').then(function () {
  return localforage.getItem('key');
}).then(function (value) {
  // we got our value
}).catch(function (err) {
  // we got an error
});
```

Or, use `async`/`await`:

```js
try {
    const value = await localforage.getItem('somekey');
    // This code runs once the value has been loaded
    // from the offline store.
    console.log(value);
} catch (err) {
    // This code runs if there were any errors.
    console.log(err);
}
```

For more examples, please visit [the API docs](https://localforage.github.io/localForage).

## Storing Blobs, TypedArrays, and other JS objects

存储类型支持 blob，类型数组，或者其他 JS 对象（也包括基本对象）

You can store any type in localForage; you aren't limited to strings like in localStorage. Even if localStorage is your storage backend, localForage automatically does `JSON.parse()` and `JSON.stringify()` when getting/setting values.

localForage supports storing all native JS objects that can be serialized to JSON, as well as ArrayBuffers, Blobs, and TypedArrays. Check the [API docs](https://localforage.github.io/localForage/#data-api-setitem) for a full list of types supported by localForage.

All types are supported in every storage backend, though storage limits in localStorage make storing many large Blobs impossible.

## Configuration

配置文件

You can set database information with the `config()` method. Available options are `driver`, `name`, `storeName`, `version`, `size`, and `description`.

```js
localforage.config({
    driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    name        : 'myApp',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'some description'
});
```

**Note:** you must call `config()` *before* you interact with your data. This means calling `config()` before using `getItem()`, `setItem()`, `removeItem()`, `clear()`, `key()`, `keys()` or `length()`.

## Multiple instances

You can create multiple instances of localForage that point to different stores using `createInstance`. All the configuration options used by [`config`](https://www.npmjs.com/package/localforage#configuration) are supported.

```js
var store = localforage.createInstance({
  name: "nameHere"
});

var otherStore = localforage.createInstance({
  name: "otherName"
});

// Setting the key on one of these doesn't affect the other.
store.setItem("key", "value");
otherStore.setItem("key", "value2");
```

## RequireJS

You can use localForage with [RequireJS](http://requirejs.org/):

```js
define(['localforage'], function(localforage) {
    // As a callback:
    localforage.setItem('mykey', 'myvalue', console.log);

    // With a Promise:
    localforage.setItem('mykey', 'myvalue').then(console.log);
});
```

## TypeScript

If you have the [`allowSyntheticDefaultImports` compiler option](https://www.typescriptlang.org/docs/handbook/compiler-options.html) set to `true` in your [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) (supported in TypeScript v1.8+), you should use:

```
import localForage from "localforage";
```

Otherwise you should use one of the following:

```js
import * as localForage from "localforage";
// or, in case that the typescript version that you are using
// doesn't support ES6 style imports for UMD modules like localForage
import localForage = require("localforage");
```



# Working on localForage

You'll need [node/npm](http://nodejs.org/) and [bower](http://bower.io/#installing-bower).

To work on localForage, you should start by [forking it](https://github.com/localForage/localForage/fork) and installing its dependencies. Replace `USERNAME` with your GitHub username and run the following:

```js
# Install bower globally if you don't have it:
npm install -g bower

# Replace USERNAME with your GitHub username:
git clone git@github.com:USERNAME/localForage.git
cd localForage
npm install
bower install
```

Omitting the bower dependencies will cause the tests to fail!

