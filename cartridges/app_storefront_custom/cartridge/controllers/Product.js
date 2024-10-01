'use strict';

var server = require('server');
server.extend(module.superModule);

var ProductMgr = require('dw/catalog/ProductMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var CatalogMgr = require('dw/catalog/CatalogMgr');
var ProductSearch = require('*/cartridge/models/search/productSearch');
var productHelpers = require('*/cartridge/scripts/helpers/productHelpers');

// Append to the 'Show' route of the Product-Show controller
server.append('Show', function (req, res, next) {
    // Obter o ID do produto a partir da resposta
    var viewData = res.getViewData();
    res.print(
        '<script>console.log("View Data: ' +
            JSON.stringify(viewData) +
            '");</script>'
    );

    if (!viewData || !viewData.product) {
        // Se não houver dados do produto, continue para o próximo middleware
        res.print('<script>console.log("No product data available");</script>');
        next();
        return;
    }

    var productId = viewData.product.id;
    res.print('<script>console.log("Product ID: ' + productId + '");</script>');

    var product = ProductMgr.getProduct(productId);
    res.print(
        '<script>console.log("Retrieved Product: ' +
            JSON.stringify(product) +
            '");</script>'
    );

    // Adicionando log para verificar se o produto é um objeto válido
    if (typeof product === 'object' && product !== null) {
        res.print(
            '<script>console.log("Product is an object and not null");</script>'
        );
    } else {
        res.print(
            '<script>console.log("Product is not a valid object");</script>'
        );
        next();
        return;
    }

    // Verifica se o produto é válido
    if (!product) {
        res.print('<script>console.log("Product is not valid");</script>');
        next();
        return;
    }

    // Adicionando logs para verificar propriedades básicas do produto
    res.print(
        '<script>console.log("Product Name: ' + product.name + '");</script>'
    );
    res.print(
        '<script>console.log("Product ID: ' + product.ID + '");</script>'
    );
    res.print(
        '<script>console.log("Product Availability: ' +
            product.availabilityModel +
            '");</script>'
    );

    var suggestedProducts = [];

    if (product.isCategorized()) {
        var apiProductSearch = new ProductSearchModel();
        apiProductSearch.setCategoryID(product.getPrimaryCategory().ID);
        apiProductSearch.search();

        res.print(
            '<script>console.log("Product Search Results Count: ' +
                apiProductSearch.count +
                '");</script>'
        );
        res.print(
            '<script>console.log("Product Search Results: ' +
                JSON.stringify(apiProductSearch.getProductSearchHits()) +
                '");</script>'
        );

        var productSearch = new ProductSearch(
            apiProductSearch,
            req.querystring,
            req.querystring.srule,
            CatalogMgr.getSortingOptions(),
            CatalogMgr.getSiteCatalog().getRoot()
        );

        // Verifica se há produtos sugeridos e busca até 4 produtos
        if (productSearch.productIds && productSearch.productIds.length > 0) {
            for (
                var index = 0;
                index < Math.min(4, productSearch.productIds.length);
                index++
            ) {
                var suggestedProductId =
                    productSearch.productIds[index].productID;
                var suggestedProduct =
                    ProductMgr.getProduct(suggestedProductId);

                // Certifique-se de que o produto sugerido não é vazio e é válido
                if (suggestedProduct) {
                    var productSearchHit =
                        productHelpers.getProductSearchHit(suggestedProduct);
                    res.print(
                        '<script>console.log("Product Search Hit: ' +
                            JSON.stringify(productSearchHit) +
                            '");</script>'
                    );
                    suggestedProducts.push(productSearchHit);
                } else {
                    res.print(
                        '<script>console.log("Suggested Product not found or is invalid at index: ' +
                            index +
                            '");</script>'
                    );
                }
            }
        } else {
            res.print(
                '<script>console.log("No suggested products available");</script>'
            );
        }
    } else {
        res.print(
            '<script>console.log("Product is not categorized");</script>'
        );
    }

    // Log para depuração no console do navegador
    res.print(
        '<script>console.log("Suggested Products: ' +
            JSON.stringify(suggestedProducts) +
            '");</script>'
    );

    res.setViewData({
        suggestedProducts: suggestedProducts
    });

    // Log final antes de continuar
    res.print(
        '<script>console.log("Exiting Product-Show controller");</script>'
    );

    next();
});

module.exports = server.exports();
