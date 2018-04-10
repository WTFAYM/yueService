let ejs = require('../node_modules/ejs');
let fs = require('fs');

function generateDao(moduleName, tableName) {
    let data = {moduleName, tableName};
    let daoTemplate = fs.readFileSync('./daoTemplate.ejs', 'utf-8');
    let dao = ejs.render(daoTemplate, data);
    let daoFileName = `${moduleName}Dao.js`;
    fs.writeFileSync(`../app/daos/${daoFileName}`, dao);
}

function generateService(moduleName, daoName) {
    let data = {moduleName, daoName};
    let serviceTemplate = fs.readFileSync('./serviceTemplate.ejs', 'utf-8');
    let service = ejs.render(serviceTemplate, data);
    let serviceFileName = `${moduleName}Service.js`;
    fs.writeFileSync(`../app/services/${serviceFileName}`, service);
}

function generateController(moduleName, serviceName) {
    let data = {moduleName, serviceName};
    let controllerTemplate = fs.readFileSync('./controllerTemplate.ejs', 'utf-8');
    let controller = ejs.render(controllerTemplate, data);
    let controllerFileName = `${moduleName}Controller.js`;
    fs.writeFileSync(`../app/controllers/${controllerFileName}`, controller);
}

function generateRoute(moduleName) {
    let data = {moduleName};
    let routeTemplate = fs.readFileSync('./routeTemplate.ejs', 'utf-8');
    let route = ejs.render(routeTemplate, data);
    let routeFileName = `${moduleName}Route.js`;
    fs.writeFileSync(`../app/routes/${routeFileName}`, route);
}


function generate(moduleName, tableName){
    // dao
    generateDao(moduleName, tableName);

    // service
    let daoName = `${moduleName.substring(0,1).toLowerCase()}${moduleName.substring(1)}Dao`;
    generateService(moduleName, daoName);

    // controller
    let serviceName = `${moduleName.substring(0,1).toLowerCase()}${moduleName.substring(1)}Service`;
    generateController(moduleName, serviceName);

    //route
    generateRoute(moduleName);
}

generate('Tree', 'tree');