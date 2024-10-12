'use strict';

var server = require('server');
var PageMgr = require('dw/experience/PageMgr');
var CatalogMgr = require('dw/catalog/CatalogMgr');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var catId = req.querystring.catId || '';

    res.print('<script>console.log("catId:", "' + catId + '");</script>');

    var category = CatalogMgr.getCategory(catId);
    res.print(
        '<script>console.log("category:", ' +
            JSON.stringify(category) +
            ');</script>'
    );

    var pageDesignerID =
        category && 'pageDesignerPageID' in category.custom
            ? category.custom.pageDesignerPageID
            : null;
    res.print(
        '<script>console.log("pageDesignerID:", "' +
            pageDesignerID +
            '");</script>'
    );

    var pageDesigner = pageDesignerID ? PageMgr.getPage(pageDesignerID) : null;

    if (pageDesigner && pageDesigner.isVisible()) {
        res.print(PageMgr.renderPage(pageDesigner.ID, ''));
        return;
    }

    next();
});

module.exports = server.exports();

// 'use strict';

// var server = require('server');
// var PageMgr = require('dw/experience/PageMgr');
// var CatalogMgr = require('dw/catalog/CatalogMgr');

// server.extend(module.superModule);

// server.append('Show', function (req, res, next) {
//     var catId = req.querystring.catId || '';
//     res.print(
//         '<script>console.log(catId);</script>'
//     );
//     var category = CatalogMgr.getCategory(catId);
//     res.print('<script>console.log(category);</script>');
//     var pageDesignerID =
//         category && 'pageDesignerPageID' in category.custom
//             ? category.custom.pageDesignerPageID
//             : null;
//     var pageDesigner = pageDesignerID ? PageMgr.getPage(pageDesignerID) : null;
//     res.print('<script>console.log(pageDesignerID);</script>');

//     if (pageDesigner && pageDesigner.isVisible()) {
//         res.writer.println(PageMgr.renderPage(pageDesigner.ID, ''));
//         return;
//     }

//     next();
// });

// module.exports = server.exports();
