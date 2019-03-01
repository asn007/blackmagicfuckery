async function render() {
  const sum = await import(/* webpackChunkName: "sum" */ './sum')
  const multiply = await import(/* webpackChunkName: "multiply" */ './multiply')
  document.querySelector('#results').innerHTML = `
    <p>sum(2, 3): ${sum.default(2, 3)}</p>
    <p>multiply(2, 3): ${multiply.default(2, 3)}</p>
  `
  const regex = /eval\("(.*)"\)/gm
  document.querySelector('#demo').value =
    regex
      .exec(__webpack_require__.m['multiply.js'].toString())[1].replace(/\\n/g, '\n')
}

async function recompile(file = 'multiply.js', source) {
  delete __webpack_require__.c[file]
  window.webpackJsonp.push([
    [file.split('.')[0]],
    {
      [file]: eval(`(function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        eval("${source.replace(/\n/g, '\\n')}")
      })`)
    }
  ])
}

window.apply = async () => {
  await recompile('multiply.js', document.querySelector('#demo').value)
  render()
}

render()
