'use strict';

var server = require('server');
server.extend(module.superModule);

var ProductMgr = require('dw/catalog/ProductMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var URLUtils = require('dw/web/URLUtils');

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    var productId = viewData.product.id;

    var product = ProductMgr.getProduct(productId);
    var suggestedProducts = [];

    if (product.isCategorized()) {
        var apiProductSearch = new ProductSearchModel();
        apiProductSearch.setCategoryID(product.getPrimaryCategory().ID);
        apiProductSearch.search();

        var productsIterator = apiProductSearch.getProductSearchHits();
        var index = 0;

        while (productsIterator.hasNext() && index < 4) {
            var searchProduct = productsIterator.next().getProduct();
            if (searchProduct && searchProduct.ID !== product.ID) {
                suggestedProducts.push({
                    name: searchProduct.name,
                    ID: searchProduct.ID,
                    URL: URLUtils.url(
                        'Product-Show',
                        'pid',
                        searchProduct.ID
                    ).toString()
                });
                index++;
            }
        }
    }

    viewData.suggestedProducts = suggestedProducts;
    res.setViewData(viewData);

    next();
});

module.exports = server.exports();
