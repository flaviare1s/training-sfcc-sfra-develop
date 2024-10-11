'use strict';

var server = require('server');
var PageMgr = require('dw/experience/PageMgr');
var CatalogMgr = require('dw/catalog/CatalogMgr');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var catId = req.querystring.catId || '';
    var category = CatalogMgr.getCategory(catId);
    var pageDesignerID =
        category && 'pageDesignerPageID' in category.custom
            ? category.custom.pageDesignerPageID
            : null;
    var pageDesigner = pageDesignerID ? PageMgr.getPage(pageDesignerID) : null;

    if (pageDesigner && pageDesigner.isVisible()) {
        res.writer.println(PageMgr.renderPage(pageDesigner.ID, ''));
        return;
    }

    next();
});

module.exports = server.exports();
