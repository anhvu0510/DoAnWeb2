function ShowImage(e) {
    const flag = e.id.toLowerCase().indexOf("font") !== -1 ? true : false;
    console.log(flag);
    const reader = new FileReader();
    reader.onload = function (e) {
        if (flag) $("#imgFont").attr("src", e.target.result);
        else $("#imgEnd").attr("src", e.target.result);
    };
    //Imagepath.files[0] is blob type
    reader.readAsDataURL(e.files[0]);
}
$(document).ready(function () {
    $('input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        $(".custom-file-label").html(fileName);
    });


    $('.content-section-item').click(function () {
        const href = $(this).find('a').attr('href')
        window.location.href += href;
    })
    $('.content-menu-item').click(function () {
        const href = $(this).find('a').attr('href')
        console.log(`${window.location.host}/admin${href}`);
        window.location.href = `http://${window.location.host}/admin${href}`
    })
    $('#FormInfoCus').on('click', (e) => {
        e.preventDefault();
    })

    $('#Submit').click(function () {
        $('#FormInfoCus').unbind('click')
    })

    $('.btnEdit').on('click', () => {
        $('.edit').fadeIn('slow');
    })

    $('#data').on('click', '.btnEdit', function () {
        console.log($(this).closest('tr'));
        const row = $(this).closest('tr')
        $('#Fullname').val(row.find('.name').text())
        $("input[name='DOB']").val(row.find('.dob').text().trim())
        $("input[name='Phone']").val(row.find('.phone').text().trim())
        $("input[name='Address']").val(row.find('.address').text().trim())
        $("input[name='IdentifyNumber']").val(row.find('.i-id').text().trim())
        
        let id = row.find('.id').text().trim()
        let fontname = row.find('.font-img').text().trim()
        let endname = row.find('.end-img').text().trim()
        $("input[name='ID']").val(`${id}/${fontname}/${endname}`)
        $("input[name='IdentifyDate']").val(row.find('.i-date').text().trim())
        $("select[name='Identify']").val(row.find('.identify').text().trim())
        $("select[name='Gender']").val(row.find('.gender').text().trim())
        $('#imgFont').attr('src', row.find('.i-FontImg').attr('src'))
        $('#imgEnd').attr('src', row.find('.i-EndImg').attr('src'))

    })



    $('#btnClose').on('click', (e) => {
        e.preventDefault()
        $('.edit').fadeOut('slow');
    })
    $("#btnFontCus").on("click", function () {
        $('#FormInfoCus').unbind('click')
        $("#imgFontFile").trigger("click");
    });

    $("#btnEndCus").on("click", function (e) {
        $('#FormInfoCus').unbind('click')
        $("#imgEndFile").trigger("click");
    });

});
