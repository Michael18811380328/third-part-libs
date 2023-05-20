# sort-by

这是一个对象数组排序的库

A utility to create comparator functions for the native `Array.sort()` in both node and the browser. Allows for sorting by multiple properties.

Inspired by [this StackOverflow answer](http://stackoverflow.com/a/4760279).

------

## Example

```js
var sortBy = require('sort-by'), users = [];

users = [{
    id: 7,
    name: 'Foo',
    age: '34',
    email: { primary: 'foo@email.com' }
}, {
    id: 3,
    name: 'Baz',
    age: '67',
    email: { primary: 'baz@email.com' }
}, {
    id: 4,
    name: 'Bar',
    age: '67',
    email: { primary: 'bar@email.com' }
}];

users.sort(sortBy('name', 'age'));

/**
*   result:
*       [{id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
*       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }},
*       {id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }}]
*/

/**
* Use `-` to reverse the sort order
*/

users.sort(sortBy('-id', 'name'));

/*
*   result:
*       [{id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }},
*       {id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
*       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }}]
*/

/**
* Use `.` notation to traverse nested properties. See [object-path](https://www.npmjs.org/package/object-path) npm module for support.
*/

users.sort(sortBy('age', 'email.primary'));

/*
*   result:
*       [{id: 7, name: 'Foo', age: '34', email: { primary: 'foo@email.com' }},
*       {id: 4, name: 'Bar', age: '67', email: { primary: 'bar@email.com' }},
*       {id: 3, name: 'Baz', age: '67', email: { primary: 'baz@email.com' }}]
*/
```

## Test in node

```
git clone https://github.com/staygrimm/sort-by.git
cd sort-by && make test-node
```

