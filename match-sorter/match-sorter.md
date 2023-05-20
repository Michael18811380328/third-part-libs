# match-sorter

https://github.com/kentcdodds/match-sorter

Simple, expected, and deterministic best-match sorting of an array in JavaScript

数组的简单、预期和确定性最佳匹配排序。普通数字数组直接排序即可，这个使用在数组项是对象，属性排序。

**[Demo](https://codesandbox.io/s/wyk856yo48)**

## The problem

1. You have a list of dozens, hundreds, or thousands of items
2. You want to filter and sort those items intelligently (maybe you have a filter input for the user)
3. You want simple, expected, and deterministic sorting of the items (no fancy math algorithm that fancily changes the sorting as they type) 你想要简单、预期和确定性的项目排序（没有花哨的数学算法会随着它们的键入而奇怪地改变排序）

## This solution

This follows a simple and sensible (user friendly) algorithm that makes it easy for you to filter and sort a list of items based on given input. Items are ranked based on sensible criteria that result in a better user experience.

To explain the ranking system, I'll use countries as an example:——主要是姓名和国家等字符串排序

1. **CASE SENSITIVE EQUALS**: Case-sensitive equality trumps all. These will be first. (ex. `France` would match `France`, but not `france`)
2. **EQUALS**: Case-insensitive equality (ex. `France` would match `france`)
3. **STARTS WITH**: If the item starts with the given value (ex. `Sou` would match `South Korea` or `South Africa`)
4. **WORD STARTS WITH**: If the item has multiple words, then if one of those words starts with the given value (ex. `Repub` would match `Dominican Republic`)
5. **CONTAINS**: If the item contains the given value (ex. `ham` would match `Bahamas`)
6. **ACRONYM**: If the item's acronym is the given value (ex. `us` would match `United States`)
7. **SIMPLE MATCH**: If the item has letters in the same order as the letters of the given value (ex. `iw` would match `Zimbabwe`, but not `Kuwait` because it must be in the same order). Furthermore, if the item is a closer match, it will rank higher (ex. `ua` matches `Uruguay` more closely than `United States of America`, therefore `Uruguay` will be ordered before `United States of America`)

This ranking seems to make sense in people's minds. At least it does in mine. Feedback welcome!

## Installation

```
npm install match-sorter
```

## Usage

```js
import {matchSorter} from 'match-sorter'
// or const {matchSorter} = require('match-sorter')
// or window.matchSorter.matchSorter

const list = ['hi', 'hey', 'hello', 'sup', 'yo']
matchSorter(list, 'h') // ['hello', 'hey', 'hi']
matchSorter(list, 'y') // ['yo', 'hey']
matchSorter(list, 'z') // []
```

## Advanced options

### keys: `[string]`

*Default: `undefined`*

By default it just uses the value itself as above. Passing an array tells match-sorter which keys to use for the ranking.

```js
const objList = [
  {name: 'Janice', color: 'Green'},
  {name: 'Fred', color: 'Orange'},
  {name: 'George', color: 'Blue'},
  {name: 'Jen', color: 'Red'},
]

matchSorter(objList, 'g', {keys: ['name', 'color']})
// [{name: 'George', color: 'Blue'}, {name: 'Janice', color: 'Green'}, {name: 'Fred', color: 'Orange'}]

matchSorter(objList, 're', {keys: ['color', 'name']})
// [{name: 'Jen', color: 'Red'}, {name: 'Janice', color: 'Green'}, {name: 'Fred', color: 'Orange'}, {name: 'George', color: 'Blue'}]
```



**Array of values**: When the specified key matches an array of values, the best match from the values of in the array is going to be used for the ranking.

```js
const iceCreamYum = [
  {favoriteIceCream: ['mint', 'chocolate']},
  {favoriteIceCream: ['candy cane', 'brownie']},
  {favoriteIceCream: ['birthday cake', 'rocky road', 'strawberry']},
]

matchSorter(iceCreamYum, 'cc', {keys: ['favoriteIceCream']})
// [{favoriteIceCream: ['candy cane', 'brownie']}, {favoriteIceCream: ['mint', 'chocolate']}]
```



**Nested Keys**: You can specify nested keys using dot-notation.

```js
const nestedObjList = [
  {name: {first: 'Janice'}},
  {name: {first: 'Fred'}},
  {name: {first: 'George'}},
  {name: {first: 'Jen'}},
]
matchSorter(nestedObjList, 'j', {keys: ['name.first']})
// [{name: {first: 'Janice'}}, {name: {first: 'Jen'}}]

const nestedObjList = [
  {name: [{first: 'Janice'}]},
  {name: [{first: 'Fred'}]},
  {name: [{first: 'George'}]},
  {name: [{first: 'Jen'}]},
]
matchSorter(nestedObjList, 'j', {keys: ['name.0.first']})
// [{name: {first: 'Janice'}}, {name: {first: 'Jen'}}]

// matchSorter(nestedObjList, 'j', {keys: ['name[0].first']}) does not work
```

This even works with arrays of multiple nested objects: just specify the key using dot-notation with the `*` wildcard instead of a numeric index.

```js
const nestedObjList = [
  {aliases: [{name: {first: 'Janice'}},{name: {first: 'Jen'}}]},
  {aliases: [{name: {first: 'Fred'}},{name: {first: 'Frederic'}}]},
  {aliases: [{name: {first: 'George'}},{name: {first: 'Georgie'}}]},
]
matchSorter(nestedObjList, 'jen', {keys: ['aliases.*.name.first']})
// [{aliases: [{name: {first: 'Janice'}},{name: {first: 'Jen'}}]}]
matchSorter(nestedObjList, 'jen', {keys: ['aliases.0.name.first']})
// []
```



**Property Callbacks**: Alternatively, you may also pass in a callback function that resolves the value of the key(s) you wish to match on. This is especially useful when interfacing with libraries such as Immutable.js

```js
const list = [{name: 'Janice'}, {name: 'Fred'}, {name: 'George'}, {name: 'Jen'}]
matchSorter(list, 'j', {keys: [item => item.name]})
// [{name: 'Janice'}, {name: 'Jen'}]
```

For more complex structures, expanding on the `nestedObjList` example above, you can use `map`:

```js
const nestedObjList = [
  {
    name: [
      {first: 'Janice', last: 'Smith'},
      {first: 'Jon', last: 'Doe'},
    ],
  },
  {
    name: [
      {first: 'Fred', last: 'Astaire'},
      {first: 'Jenny', last: 'Doe'},
      {first: 'Wilma', last: 'Flintstone'},
    ],
  },
]

matchSorter(nestedObjList, 'doe', {
  keys: [
    item => item.name.map(i => i.first),
    item => item.name.map(i => i.last),
  ],
})
// [name: [{ first: 'Janice', last: 'Smith' },{ first: 'Jon', last: 'Doe' }], name: [{ first: 'Fred', last: 'Astaire' },{ first: 'Jenny', last: 'Doe' },{ first: 'Wilma', last: 'Flintstone' }]]
```



**Threshold**: You may specify an individual threshold for specific keys. A key will only match if it meets the specified threshold. *For more information regarding thresholds [see below](https://github.com/kentcdodds/match-sorter#threshold-number)*

```js
const list = [
  {name: 'Fred', color: 'Orange'},
  {name: 'Jen', color: 'Red'},
]
matchSorter(list, 'ed', {
  keys: [{threshold: matchSorter.rankings.STARTS_WITH, key: 'name'}, 'color'],
})
//[{name: 'Jen', color: 'Red'}]
```



**Min and Max Ranking**: You may restrict specific keys to a minimum or maximum ranking by passing in an object. A key with a minimum rank will only get promoted if there is at least a simple match.

```js
const tea = [
  {tea: 'Earl Grey', alias: 'A'},
  {tea: 'Assam', alias: 'B'},
  {tea: 'Black', alias: 'C'},
]
matchSorter(tea, 'A', {
  keys: ['tea', {maxRanking: matchSorter.rankings.STARTS_WITH, key: 'alias'}],
})
// without maxRanking, Earl Grey would come first because the alias "A" would be CASE_SENSITIVE_EQUAL
// `tea` key comes before `alias` key, so Assam comes first even though both match as STARTS_WITH
// [{tea: 'Assam', alias: 'B'}, {tea: 'Earl Grey', alias: 'A'},{tea: 'Black', alias: 'C'}]
const tea = [
  {tea: 'Milk', alias: 'moo'},
  {tea: 'Oolong', alias: 'B'},
  {tea: 'Green', alias: 'C'},
]
matchSorter(tea, 'oo', {
  keys: ['tea', {minRanking: matchSorter.rankings.EQUAL, key: 'alias'}],
})
// minRanking bumps Milk up to EQUAL from CONTAINS (alias)
// Oolong matches as STARTS_WITH
// Green is missing due to no match
// [{tea: 'Milk', alias: 'moo'}, {tea: 'Oolong', alias: 'B'}]
```



### threshold: `number`

*Default: `MATCHES`*

Thresholds can be used to specify the criteria used to rank the results. Available thresholds (from top to bottom) are:

- CASE_SENSITIVE_EQUAL
- EQUAL
- STARTS_WITH
- WORD_STARTS_WITH
- STRING_CASE
- STRING_CASE_ACRONYM
- CONTAINS
- ACRONYM
- MATCHES *(default value)*
- NO_MATCH

```js
const fruit = ['orange', 'apple', 'grape', 'banana']
matchSorter(fruit, 'ap', {threshold: matchSorter.rankings.NO_MATCH})
// ['apple', 'grape', 'orange', 'banana'] (returns all items, just sorted by best match)

const things = ['google', 'airbnb', 'apple', 'apply', 'app'],
matchSorter(things, 'app', {threshold: matchSorter.rankings.EQUAL})
// ['app'] (only items that are equal)

const otherThings = ['fiji apple', 'google', 'app', 'crabapple', 'apple', 'apply']
matchSorter(otherThings, 'app', {threshold: matchSorter.rankings.WORD_STARTS_WITH})
// ['app', 'apple', 'apply', 'fiji apple'] (everything that matches with "word starts with" or better)
```

### keepDiacritics: `boolean`

*Default: `false`*

By default, match-sorter will strip diacritics before doing any comparisons. This is the default because it makes the most sense from a UX perspective.

You can disable this behavior by specifying `keepDiacritics: true`

```js
const thingsWithDiacritics = [
  'jalapeño',
  'à la carte',
  'café',
  'papier-mâché',
  'à la mode',
]
matchSorter(thingsWithDiacritics, 'aa')
// ['jalapeño', 'à la carte', 'à la mode', 'papier-mâché']

matchSorter(thingsWithDiacritics, 'aa', {keepDiacritics: true})
// ['jalapeño', 'à la carte']

matchSorter(thingsWithDiacritics, 'à', {keepDiacritics: true})
// ['à la carte', 'à la mode']
```

### baseSort: `function(itemA, itemB): -1 | 0 | 1`

*Default: `(a, b) => String(a.rankedValue).localeCompare(b.rankedValue)`*

By default, match-sorter uses the `String.localeCompare` function to tie-break items that have the same ranking. This results in a stable, alphabetic sort.

```js
const list = ['C apple', 'B apple', 'A apple']
matchSorter(list, 'apple')
// ['A apple', 'B apple', 'C apple']
```

*You can customize this behavior by specifying a custom `baseSort` function:*

```js
const list = ['C apple', 'B apple', 'A apple']
// This baseSort function will use the original index of items as the tie breaker
matchSorter(list, 'apple', {baseSort: (a, b) => (a.index < b.index ? -1 : 1)})
// ['C apple', 'B apple', 'A apple']
```

### sorter: `function(rankedItems): rankedItems`

*Default: `matchedItems => matchedItems.sort((a, b) => sortRankedValues(a, b, baseSort))`*

By default, match-sorter uses an internal `sortRankedValues` function to sort items after matching them.

*You can customize the core sorting behavior by specifying a custom `sorter` function:*

Disable sorting entirely:

```js
const list = ['appl', 'C apple', 'B apple', 'A apple', 'app', 'applebutter']
matchSorter(list, 'apple', {sorter: rankedItems => rankedItems})
// ['C apple', 'B apple', 'A apple', 'applebutter']
```

Return the unsorted rankedItems, but in reverse order:

```js
const list = ['appl', 'C apple', 'B apple', 'A apple', 'app', 'applebutter']
matchSorter(list, 'apple', {sorter: rankedItems => [...rankedItems].reverse()})
// ['applebutter', 'A apple', 'B apple', 'C apple']
```

## Recipes

### Match PascalCase, camelCase, snake_case, or kebab-case as words

By default, `match-sorter` assumes spaces to be the word separator. However, if your data has a different word separator, you can use a property callback to replace your separator with spaces. For example, for `snake_case`:

```js
const list = [
  {name: 'Janice_Kurtis'},
  {name: 'Fred_Mertz'},
  {name: 'George_Foreman'},
  {name: 'Jen_Smith'},
]
matchSorter(list, 'js', {keys: [item => item.name.replace(/_/g, ' ')]})
// [{name: 'Jen_Smith'}, {name: 'Janice_Kurtis'}]
```

### Match many words across multiple fields (table filtering)

By default, `match-sorter` will return matches from objects where one of the properties matches *the entire* search term. For multi-column data sets it can be beneficial to split words in search string and match each word separately. This can be done by chaining `match-sorter` calls.

The benefit of this is that a filter string of "two words" will match both "two" and "words", but will return rows where the two words are found in *different* columns as well as when both words match in the same column. For single-column matches it will also return matches out of order (column = "wordstwo" will match just as well as column="twowords", the latter getting a higher score).

```js
function fuzzySearchMultipleWords(
  rows, // array of data [{a: "a", b: "b"}, {a: "c", b: "d"}]
  keys, // keys to search ["a", "b"]
  filterValue: string, // potentially multi-word search string "two words"
) {
  if (!filterValue || !filterValue.length) {
    return rows
  }

  const terms = filterValue.split(' ')
  if (!terms) {
    return rows
  }

  // reduceRight will mean sorting is done by score for the _first_ entered word.
  return terms.reduceRight(
    (results, term) => matchSorter(results, term, {keys}),
    rows,
  )
}
```

[Multi-column code sandbox](https://codesandbox.io/s/match-sorter-example-forked-1ko35)

