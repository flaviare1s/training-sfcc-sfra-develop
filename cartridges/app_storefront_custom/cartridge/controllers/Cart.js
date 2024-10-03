'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentBasket();
    var cartTotal = currentBasket.totalGrossPrice.value;

    var message = '';

    if (cartTotal > 200) {
        message = 'Your cart total exceeds $200';
    }

    var viewData = res.getViewData();
    viewData.cartTotal = cartTotal;
    viewData.message = message;
    res.setViewData(viewData);

    next();
});

module.exports = server.exports();
