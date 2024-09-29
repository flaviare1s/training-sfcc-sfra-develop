'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var productHelper = require('*/cartridge/scripts/helpers/productHelpers');

/**
 * Extensão da Rota Product-Show
 */
server.extend(module.superModule);

server.get(
    'Show',
    cache.applyPromotionSensitiveCache,
    consentTracking.consent,
    function (req, res, next) {
        var showProductPageHelperResult = productHelper.showProductPage(
            req.querystring,
            req.pageMetaData
        );

        if (!showProductPageHelperResult.product.online) {
            res.setStatusCode(404);
            res.render('error/notFound');
        } else {
            res.render(showProductPageHelperResult.template, {
                product: showProductPageHelperResult.product,
                addToCartUrl: showProductPageHelperResult.addToCartUrl,
                resources: showProductPageHelperResult.resources,
                breadcrumbs: showProductPageHelperResult.breadcrumbs,
                // Customizações adicionadas aqui
                customData:
                    'Adicione mais informações ou variáveis personalizadas aqui'
            });
        }
        next();
    }
);

module.exports = server.exports();
