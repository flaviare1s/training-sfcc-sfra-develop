'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.image = ImageTransformation.getScaledImage(content.image);
    model.categoryLink = URLUtils.url(
        'Search-Show',
        'cgid',
        content.category.getID()
    ).toString();
    model.categoryName = content.category.displayName;

    return new Template(
        'experience/components/commerce_assets/wayfinderAsset'
    ).render(model).text;
};
