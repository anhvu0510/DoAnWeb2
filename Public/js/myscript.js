$(document).ready(function () {
   
    $('.content-section-item').click(function () {
        const href = $(this).find('a').attr('href')
        window.location.href += href;
    })

    // const Info = $('#FormInfo');
    // $('#Submit').click(() => {
    //     alert('da vao')
    //     Info.validate({
    //         rules: {
    //             Fullname: {
    //                 require: true
    //             }
    //         },
    //         messages: {
    //             require: "Full not empty"
    //         }
    //     })
    // })

});