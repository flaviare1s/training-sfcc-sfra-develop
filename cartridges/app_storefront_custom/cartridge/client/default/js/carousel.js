'use strict';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {

    var $ = require('jquery');
    require('slick-carousel');


    $(document).ready(function () {
        $('#product_carousel').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    });
}
