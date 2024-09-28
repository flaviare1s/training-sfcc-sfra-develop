'use strict';

var server = require('server');

var productHelpers = require('*/cartridge/scripts/helpers/productHelpers');


server.extend(module.superModule);


server.append('Show', function (req, res, next) {

    var viewData = res.getViewData();


    var product = viewData.product;
    var discountPercentage = null;

    if (
        product &&
        product.price &&
        product.price.sales &&
        product.price.sales.value < product.price.list.value
    ) {

        discountPercentage = productHelpers.calculatePercentageOff(
            product.price.list.value,
            product.price.sales.value
        );
    }


    viewData.discountPercentage = discountPercentage;


    res.setViewData(viewData);
    return next();
});

module.exports = server.exports();

// 'use strict';

// var server = require('server');

// server.extend(module.superModule);

// server.append('Show', function (req, res, next) {

//     var viewData = res.getViewData();
//     viewData.example = 'Testando';

//     res.setViewData(viewData);
//     return next();
// });

// module.exports = server.exports();
