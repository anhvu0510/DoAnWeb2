$(document).ready(function () {
    $('.content-section-item').click(function () {
        const href = $(this).find('a').attr('href')
        window.location.href += href;
    })

});