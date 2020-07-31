$(document).ready(function () {
   
    $('.content-section-item').click(function () {
        const href = $(this).find('a').attr('href')
        window.location.href += href;
    })
    $('.content-menu-item').click(function () {
        const href = $(this).find('a').attr('href')
        console.log(`${window.location.host}/admin${href}`);
        window.location.href = `http://${window.location.host}/admin${href}`
    })

});