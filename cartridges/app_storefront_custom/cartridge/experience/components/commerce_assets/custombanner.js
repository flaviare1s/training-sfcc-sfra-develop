'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.bannerImage = content.bannerImage;
    model.categoryURL = content.category ? content.category.URL : '#';

    return new Template('experience/components/commerce_assets/custombanner').render(
        model
    ).text;
};
