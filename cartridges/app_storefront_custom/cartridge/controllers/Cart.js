'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');
var Site = require('dw/system/Site');
var ContentMgr = require('dw/content/ContentMgr');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentBasket();
    var cartTotal = currentBasket ? currentBasket.totalGrossPrice.value : 0;

    var cartTotalThreshold =
        Site.getCurrent().getCustomPreferenceValue('cartTotalThreshold') || 200;

    var showContent = cartTotal > cartTotalThreshold;

    var viewData = res.getViewData();
    viewData.showContent = showContent;
    viewData.cartTotalThreshold = cartTotalThreshold;

    if (showContent) {
        var contentAsset = ContentMgr.getContent('cart_total_message');
        if (contentAsset && contentAsset.online) {
            var cartMessage = contentAsset.custom.body.toString();
            viewData.cartMessage = cartMessage.replace(
                /\[\[cartTotalThreshold\]\]/g,
                cartTotalThreshold
            );
        }
    }

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
