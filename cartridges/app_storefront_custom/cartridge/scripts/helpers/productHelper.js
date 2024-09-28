'use strict';

function calculatePercentageOff(standardPrice, salePrice) {
    if (!standardPrice || !salePrice || standardPrice <= salePrice) {
        return null;
    }
    var discountPercentage =
        ((standardPrice - salePrice) / standardPrice) * 100;
    return Math.round(discountPercentage);
}

module.exports = {
    calculatePercentageOff: calculatePercentageOff
};
