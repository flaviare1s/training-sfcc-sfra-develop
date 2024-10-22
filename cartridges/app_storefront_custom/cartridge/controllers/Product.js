'use strict';

var server = require('server');
var CategoryMgr = require('dw/catalog/CategoryMgr');
var Logger = require('dw/system/Logger');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();

    // Corrigido para usar `req` em vez de `request`
    var categoryId = req.httpParameterMap.categoryID.stringValue;
    var category = CategoryMgr.getCategory(categoryId);

    if (category) {
        Logger.info('Category ID: ' + categoryId);
        Logger.info(
            'Background Color: ' + category.custom.backgroundColor || 'not set'
        );
        Logger.info('Text Color: ' + category.custom.textColor || 'not set');
        Logger.info(
            'Text Attribute: ' + category.custom.textAttribute || 'not set'
        );

        viewData.category = {
            categoryId: category.ID,
            backgroundColor: category.custom.backgroundColor || '',
            textColor: category.custom.textColor || '',
            textAttribute: category.custom.textAttribute || ''
        };
    } else {
        Logger.warn('Category not found for ID: ' + categoryId);
    }

    res.setViewData(viewData);
    return next();
});

module.exports = server.exports();
