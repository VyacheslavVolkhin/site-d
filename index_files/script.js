function site_version(v){
    $.cookie('site_version',v,{
        path: '/'
    });
    location.reload()
}
$(document).ready(function () {
    $('.p-cart-fastorder form').submit(function(e) {
        e.preventDefault();
        var productsOrder = {};

        $( ".ocpb-products .items > div" ).each(function(i) {
            var nameProd = $(this).find('.name-td a').text();
            var countProd = $(this).find('.b-price-pcs_count').val();
            var price = $(this).find('.total-td').text();
            productsOrder[i] = [
                {
                    name: nameProd,
                    count: countProd,
                    price: price,
                }
            ]
        });

        var nameClient = $('.p-cart-fastorder .name-form').val();
        var phoneClient = $('.p-cart-fastorder .phone-form').val();
        var allPrice = $('.ocpb-products .priceAll').last().text();
        if(nameClient == '' || phoneClient == '') {
            return false;
        }
        
        var jsonProducts = JSON.stringify(productsOrder);
        $.ajax ({
                url: '/assets/senders/sender.php',
                type: 'post',
                data: {"quickcart" : 1, "nameClient" : nameClient, "phoneClient" : phoneClient, "jsonProducts" : jsonProducts, "allPrice" : allPrice },
                success: function(res) {
                    $.trim(res);
                    
                    if(res == 1) {
                        nameClient = '';
                        phoneClient = '';
                        alert("Успешно отправлено!");
                    }
                }
        }); 

    })
    $('.promo-works-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        navText: [],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items: 4
            }
        }
    });

    $('.b-products-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        navText: [],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items: 4
            }
        }
    });

    $('.b-products-carousel-3').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        navText: [],
        responsive:{
            0:{
                items: 2
            },
            600:{
                items: 3
            },
            1000:{
                items: 3
            }
        }
    });

});
