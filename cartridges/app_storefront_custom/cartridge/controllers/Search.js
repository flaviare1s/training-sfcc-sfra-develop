'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var PageMgr = require('dw/experience/PageMgr');
    var CatalogMgr = require('dw/catalog/CatalogMgr');

    var catId = req.querystring.cgid || null;

    if (!catId) {
        res.setStatusCode(400);
        res.json({
            success: false,
            message: 'ID not provided.'
        });
        return next();
    }

    var category = CatalogMgr.getCategory(catId);

    if (!category) {
        res.setStatusCode(404);
        res.json({
            success: false,
            message: 'Category not found.'
        });
        return next();
    }

    var pageDesignerID =
        category && 'pageDesignerPageID' in category.custom
            ? category.custom.pageDesignerPageID
            : null;

    var pageDesigner = pageDesignerID ? PageMgr.getPage(pageDesignerID) : null;


    if (pageDesigner && pageDesigner.isVisible()) {
        res.print(PageMgr.renderPage(pageDesigner.ID, ''));
    } else {

        res.render('search/noPageDesigner');
    }

    next();
});

module.exports = server.exports();
