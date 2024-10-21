'use strict';

var server = require('server');
var CatalogMgr = require('dw/catalog/CatalogMgr');
var Logger = require('dw/system/Logger');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();

    var categoryId = req.querystring.cgid || 'defaultCategoryId';
    var category = CatalogMgr.getCategory(categoryId);

    if (category) {
        Logger.info('Category ID: ' + categoryId);
        Logger.info('Background Color: ' + category.custom.backgroundColor);
        Logger.info('Text Color: ' + category.custom.textColor);
        Logger.info('Text Attribute: ' + category.custom.textAttribute);

        viewData.category = {
            backgroundColor: category.custom.backgroundColor,
            textColor: category.custom.textColor,
            textAttribute: category.custom.textAttribute
        };
    } else {
        Logger.warn('Category not found for ID: ' + categoryId);
    }

    res.setViewData(viewData);
    return next();
});

module.exports = server.exports();
