'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the assets.wayfinderAsset.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var category = content.category;
  
    if (category) {
        model.url = URLUtils.url('Search-Show', 'cgid', category.ID);
    } else {
        model.url = URLUtils.url('Home-Show');
    }

    model.text_headline = content.text_headline;
    if (content.text_subline) {
        model.text_subline = content.text_subline;
    }
    model.text_alignment = content.text_alignment == 'Left' ? 'left' : 'center';

    if (content.image) {
        model.image = {
            src: {
                mobile: ImageTransformation.url(content.image, {
                    device: 'mobile'
                }),
                desktop: ImageTransformation.url(content.image, {
                    device: 'desktop'
                })
            },
            alt: content.image.file.getAlt(),
            focalPointX: content.image.focalPoint.x * 100 + '%',
            focalPointY: content.image.focalPoint.y * 100 + '%'
        };
    }

    return new Template('experience/components/assets/wayfinderAsset').render(
        model
    ).text;
};
