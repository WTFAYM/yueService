let fs = require('fs');
let p = require('path');

let getName = (name) => name.substring(0, name.lastIndexOf('.'));

function beanRegistry(path, symbol) {
    console.log(`beanRegistry, path: ${path}, symbol: ${symbol}`);

    let dir = p.join(__dirname, '..', path);

    // init beanContainer
    if (!global.beanContainer) {
        global.beanContainer = {};
    }

    // global ref method
    let ref = 'ref' + symbol.substring(0, 1).toUpperCase() + symbol.substring(1);
    global[ref] = (name) => beanContainer[symbol][name.toLowerCase()];

    let container = global.beanContainer[symbol] = {};

    fs.readdirSync(dir).forEach(fileName => {
        let file = p.join(dir, fileName);
        let name = getName(fileName);
        console.log(`register ${name}`);
        let obj = require(file);
        container[name.toLowerCase()] = new obj;
    });
}

module.exports = beanRegistry;