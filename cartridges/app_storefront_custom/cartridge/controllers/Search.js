'use strict';

var server = require('server');
var searchController = require('app_storefront_base/cartridge/controllers/Search');
var CatalogMgr = require('dw/catalog/CatalogMgr');

server.extend(searchController);

server.append('Show', function (req, res, next) {
    var catId = req.querystring.cgid;

    var PageMgr = require('dw/experience/PageMgr');
    var category = CatalogMgr.getCategory(catId);
    var pageDesignerID =
        category && 'pageDesignerPageID' in category.custom
            ? category.custom.pageDesignerPageID
            : null;
    var pageDesigner = pageDesignerID ? PageMgr.getPage(pageDesignerID) : null;

    if (pageDesigner && pageDesigner.isVisible()) {
        return response.writer.println(PageMgr.renderPage(pageDesigner.ID, ''));
    }

    return next();
});

module.exports = server.exports();
