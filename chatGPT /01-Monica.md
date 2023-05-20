# 1 浏览器插件 Monica

https://chat.openai.com/ 这个未知原因无法访问？所以用 Monica 替代

Monica是Chrome扩展程序，是您的AI辅助驾驶员。您可以与Monica随时随地聊天，Monica可以帮助您轻松创建文案，并将文本插入任何位置。

因为官方的 chatGPT4 需要 token 和注册，这个插件每天提供30次免费查询。付费版本每月 60 元，有更多的查询次数。打开侧栏的快捷键是 command + M。

账户ID：3f094d409dd941bea8032dba22d7dded

邮箱：michael18811380328@gmail.com

姓名：Michael An

https://monica.im/billing

提问：JavaScript 语言中，使用动态规划短发，解决斐波那契数列问题。

（短发，写错了，应该是算法）

回答如下，看起来非常智能

~~~
动态规划是一种常用的算法思想，可以用来解决很多问题，包括斐波那契数列问题。在 JavaScript 中，我们可以使用动态规划来计算斐波那契数列。

以下是使用动态规划解决斐波那契数列问题的 JavaScript 代码示例：

在上面的代码中，我们使用了一个数组 fib 来存储计算过程中的斐波那契数列。我们首先将 fib 数组的前两项初始化为 0 和 1，然后使用一个循环来计算从第三项开始的所有斐波那契数列。最后返回 fib[n] 即可得到第 n 项斐波那契数列的值。
~~~

~~~js
function fibonacci(n) {
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}

console.log(fibonacci(10)); // 输出 55
~~~

每次回答结果不一样，这是第二次结果

~~~js
function fibonacci(n) {
  if (n < 1) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }
  let prev1 = 1;
  let prev2 = 1;
  let curr = 0;
  for (let i = 3; i <= n; i++) {
    curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return curr;
}
~~~

~~~python
def fibonacci(n: int) -> int:
    if n < 1:
        return 0
    if n == 1 or n == 2:
        return 1
    prev1 = 1
    prev2 = 1
    curr = 0
    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return curr
~~~

N 皇后算法

这个函数接收一个整数 n 作为参数，返回一个数组，其中包含所有可能的 N 皇后问题的解。在这个实现中，我们使用了回溯算法来递归地尝试每一行中的每一个位置，如果当前位置可以放置皇后，则继续递归下一行；如果当前位置不行，则回溯到上一行重新尝试。在判断当前位置是否可以放置皇后时，我们检查当前列、当前左对角线和当前右对角线是否已经有皇后，如果没有，则可以放置。时间复杂度为 O(n!)。

~~~js
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array.from({ length: n }, () => '.'));

  function backtrack(row) {
    if (row === n) {
      result.push(board.map(row => row.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }

  function isValid(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') {
        return false;
      }
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') {
        return false;
      }
    }
    return true;
  }

  backtrack(0);
  return result;
}
~~~

