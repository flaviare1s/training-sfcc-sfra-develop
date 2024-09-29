'use strict';

var server = require('server');
server.extend(module.superModule);

var ProductMgr = require('dw/catalog/ProductMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');

// Append to the 'Show' route of the Product-Show controller
server.append('Show', function (req, res, next) {
    var productId = res.getViewData().product.id;
    var product = ProductMgr.getProduct(productId);
    var suggestedProducts = [];

    // Check if the product is categorized
    if (product.isCategorized()) {
        var apiProductSearch = new ProductSearchModel();
        apiProductSearch.setCategoryID(product.getPrimaryCategory().ID);
        apiProductSearch.search();

        var productSearch = apiProductSearch.getProductSearchHits();
        var index = 0;
        while (productSearch.hasNext() && index < 4) {
            var suggestedProductHit = productSearch.next();
            var suggestedProductId = suggestedProductHit.getProduct().ID;
            var suggestedProduct = ProductMgr.getProduct(suggestedProductId);
            suggestedProducts.push(suggestedProduct);
            index++;
        }
    }

    // Pass the suggested products to the view
    res.setViewData({
        suggestedProducts: suggestedProducts
    });

    next();
});

module.exports = server.exports();
