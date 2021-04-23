$(document).ready(() => {
    // new WOW({
    //     animateClass: 'animate__animated',
    // }).init();


    $('#masters-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        responsive: [
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 666,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
        ]

    });



    $('#gallery-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        accessibility: true,
        variableWidth: true,
        focusOnSelect: false,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1089,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
        ]

    });

    $('.gallery-popup').magnificPopup({
        type: 'image'
        // other options
    });

    $("#accordion").accordion({
        heightStyle: "content"
    });

    $('.open-modal').click(() => {
        $('#reservation-container').css('display', 'flex')
    });

    $('#reservation-cancel, #reservation-container').click((e) => {
        if (e.target.id === 'reservation-container' || e.target.id === 'reservation-cancel') {
            $('#reservation-container').hide()
        }
    });

    $('#reservation-cancel-2, #reservation-container').click((e) => {
        if (e.target.id === 'reservation-container' || e.target.id === 'reservation-cancel-2') {
            $('#reservation-container').hide()
        }
    });


    $(".custom-select").each(function () {
        var classes = $(this).attr("class"),
            id = $(this).attr("id"),
            name = $(this).attr("name");
        var template = '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function () {
            template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="custom-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".custom-option:first-of-type").hover(function () {
        $(this).parents(".custom-options").addClass("option-hover");
    }, function () {
        $(this).parents(".custom-options").removeClass("option-hover");
    });
    $(".custom-select-trigger").on("click", function () {
        $('html').one('click', function () {
            $(".custom-select").removeClass("opened");
        });
        $(this).parents(".custom-select").toggleClass("opened");
        event.stopPropagation();
    });
    $(".custom-option").on("click", function () {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".custom-select").removeClass("opened");
        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
    });

    jQuery('#datetimepicker').datetimepicker({
        startDate: '+1971/05/01',
        allowTimes: [
            '09:00', '10:00', '11:00', '12:00', '13:00', '15:00',
            '17:00', '18:00', '19:00', '20:00', '21:00'
        ],
        minDate: '0',
    });

    var selector = $("#phone-input");

    var im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selector);

    var selector2 = $("#input-phone");

    var im = new Inputmask("+7 (999) 999-99-99");
    im.mask(selector2);

    $('#form-button > button').click(() => {
         $('.error-text').hide();

        let name = $('#name');
        let phone = $('#phone-input');
        let service = $('.custom-select-wrapper');
        let dateTime = $('#datetimepicker');

        name.css('border', '1px solid #721163');
        phone.css('border', '1px solid #721163');
        dateTime.css('border', '1px solid #721163');
        service.css('border', '1px solid #721163').css('border-radius', '30px');

        if (!name.val()) {
            name.siblings('.error-text').show();
            name.css('border', '1px solid red');
            return;
        }

        if (!phone.val()) {
            phone.siblings('.error-text').show();
            phone.css('border', '1px solid red');
            return;
        }

        if (!service.find('select').val()) {
            service.siblings('.error-text').show();
            service.css('border', '1px solid red').css('border-radius', '30px');
            return;
        }

        if (!dateTime.val()) {
            dateTime.siblings('.error-text').show();
            dateTime.css('border', '1px solid red');
            return;
        }

        if (name.val() && phone.val() && service.find('select').val() && dateTime.val()) {
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name= ' + name.val() + '&phone= ' + phone.val() + '&service= ' + service.val() + '&dateTime= ' + dateTime.val(),
                success: () => {
                    $('#reservation-sent-block').show();
                    $('#reservation-content-block').hide();
                },
                error: () => {
                    $('#reservation-container').hide();
                    alert('Ошибка бронирования, пожалуйста, свяжитесь по номеру телефона.')
                }
            });
        }
    });

    $('#call-form-btn > button').click(() => {
        let callPhone = $('#input-phone');
        if (callPhone.val()) {
            $.ajax({
                type: 'post',
                url: 'mail2.php',
                data: 'callPhone= ' + callPhone.val(),
                success: () => {
                    $('#call-form-text').text('Спасибо, мы свяжемся с вами в течение 5 минут.');
                    $('#call-btn').remove();
                    callPhone.remove();
                    $('#decor-rose').remove();
                    $('.error').hide();
                },
                error: () => {
                    alert('Ошибка бронирования, пожалуйста, свяжитесь по номеру телефона.')
                }
            });
        } else {
            callPhone.css('border', '1px solid red');
            $('.error').show();
        }
    });

    $('#burger').click(() => {
        $('#menu').css('display', 'flex');
    });

    if (window.screen.width <= 767) {
        $('#cancel,  .menu-item').click(() => {
            $('#menu').css('display', 'none')
        });
    }

})