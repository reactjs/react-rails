function getStackTrace() {
  var stack;
  try {
    throw new Error('');
  }
  catch (error) {
    stack = error.stack || '';
  }
  stack = stack.split('\\n').map(function (line) {
    return line.trim();
  });
  return stack.splice(stack[0] == 'Error' ? 2 : 1);
};

function printError(functionName){
  console.error(functionName + ' is not defined for execJS. See https://github.com/sstephenson/execjs#faq. Note babel-polyfill may call this.');
  console.error(getStackTrace().join('\\n'));
};

function setTimeout() {
  printError('setTimeout');
};

function clearTimeout() {
  printError('clearTimeout');
};
