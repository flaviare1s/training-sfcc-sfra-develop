'use strict';

/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var component = context.component;
    model.component = component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    var content = context.content;

    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var ProductSearch = require('*/cartridge/models/search/productSearch');

    var apiProductSearch = new ProductSearchModel();
    var params = {};
    var productIdsInput = content.productIds || '';
    var productIds = productIdsInput.split(',').map(function (id) {
        return id.trim();
    }).filter(Boolean);

    if (content.category) {
        // Prioritize category
        params.cgid = content.category.getID();
        apiProductSearch = searchHelper.setupSearch(apiProductSearch, params);
        var sortingRule = apiProductSearch.category.defaultSortingRule.ID;
        apiProductSearch.search();

        var productSearch = new ProductSearch(
            apiProductSearch,
            params,
            sortingRule,
            CatalogMgr.getSortingOptions(),
            CatalogMgr.getSiteCatalog().getRoot()
        );
        model.productSearch = productSearch;
        model.apiProductSearch = apiProductSearch;
        model.maxSlots = 4;
    } else if (productIds.length > 0) {
        // Use product IDs if no category
        model.productSearch = productIds.map(function (id) {
            return ProductMgr.getProduct(id);
        }).filter(Boolean);
    }

    var gridCol = '4';
    if (content.displayFormat && content.displayFormat.value === 'row') {
        gridCol = '12';
    }
    model.gridClassName = 'region col-6 col-sm-' + gridCol;
    model.isEditMode = PageRenderHelper.isInEditMode();

    var expires = new Date();
    expires.setHours(expires.getHours() + 1);
    response.setExpires(expires);
    response.setVaryBy('price_promotion');

    return new Template(
        'experience/components/dynamic/productList/productListingComponent'
    ).render(model).text;
};

// 25686395M, 25686514M , 25686364M, 25686364M
