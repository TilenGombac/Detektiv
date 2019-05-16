function posljiPodatke()
{
    var ime = $('#kontaktIme');
    var priimek = $('#kontaktPriimek');
    var podjetje = $('#kontaktPodjetje');
    var email = $('#kontaktEmail');
    var telefon = $('#kontaktStevilka');
    var drzava = $('#kontaktDrzava');
    var sporocilo = $('#kontaktSporocilo');
    var odgovor = $("input[name='odgovor']:checked");

    if(isEmptyField(ime) || isEmptyField(priimek) || isEmptyField(podjetje)
        || isEmptyField(email) || isEmptyField(telefon) || isEmptyField(drzava)
            || isEmptyField(sporocilo) || isEmptyField(odgovor))
    {
        $('form').addClass('error');
    }
    else
    {
        if(isValidEmailAddress(email.val()) && drzava.val() == "si")
        {
            $('form').removeClass('error');

            $('#cIme').html(ime.val());
            $('#cPriimek').html(priimek.val());
            $('#cPodjetje').html(podjetje.val());
            $('#cEmail').html(email.val());
            $('#cTelefon').html(telefon.val());
            $('#cDrzava').html("Slovenija");
            $('#cSporocilo').html(sporocilo.val());

            if(odgovor.val() == 0)
            {
                $('#cOdgovor').html("Odgovor bo posredovan po e-pošti.");
            }
            else
            {
                $('#cOdgovor').html("Odgovor boste prejeli preko telefona.");
            }

            $('.ui.modal').modal('show');
        }
        else
        {
            $('form').addClass('error');
        }
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function isEmptyField(field)
{
    if(field.val() == "")
    {
        field.parent().addClass('error');

        return true;
    }

    field.parent().removeClass('error');

    return false;
}


function storitveContentSwap(id)
{
    var pageNames = ["detektivovo-delovno-podrocje", "osebna-zaznava",
                     "zvestoba-partnerjev", "vrocanje", "dokazno-gradivo",
                     "disciplinske-krsitve", "bolniska-odsotnost",
                     "zloraba-potnih-stroskov",
                     "zloraba-alkohola-in-drog-na-delovnem-mestu",
                     "konkurencna-prepoved-in-konkurencna-klavzula",
                     "iskanje-dolznikov", "premozenje-dolznikov",
                     "pogresani-predmeti", "pogresane-ali-skrite-osebe",
                     "mladostniki", "povzrocitelji-skod",
                     "business-intelligence", "tatvine-kraje",
                     "druge-diskretne-storitve"];

    var url = "./strani/storitve/" + pageNames[id] + ".html";

    $('#storitve-content').addClass('loading');

    $.ajax({
        type: "GET",
        url: url,
        success: function(data)
        {
            $('#storitve-content').html(data);
            $('#storitve-content').removeClass('loading');
        }
    });
}

function cenikContentSwap(id)
{
    var pageNames = ["o-ceniku", "detektivska-ura",
                     "nadzor-zaposlenega-na-bolniski",
                     "osebno-vrocanje", "tatvine", "varno-zaposlovanje",
                     "test-na-droge", "kontrola-zlorabe-potnih-stroskov",
                     "iskanje-premozenja-dolznikov"];

    var url = "./strani/cenik/" + pageNames[id] + ".html";

    $('#cenik-content').addClass('loading');

    $.ajax({
        type: "GET",
        url: url,
        success: function(data)
        {
            $('#cenik-content').html(data);
            $('#cenik-content').removeClass('loading');
        }
    });
}

$(document).ready(function() {
    storitveContentSwap(0);
    cenikContentSwap(0);
});

$('select[name=storitve]').on('change', function() {
    var id = $(this).val();
    storitveContentSwap(id);
});

$('#storitveButtons button').click(function() {
    $('#storitveButtons button').removeClass('active');
    $(this).addClass('active');
});

$('#cenikButtons button').click(function() {
    $('#cenikButtons button').removeClass('active');
    $(this).addClass('active');
});

$(document).on('scroll', function() {
    if($(this).scrollTop() >= $("#domov").position().top){
        removeActive();
        $('a[href$="#domov"]').addClass("active");
    }
});

$(document).on('scroll', function() {
    if($(this).scrollTop() >= $("#storitve").position().top){
        removeActive();
        $('a[href$="#storitve"]').addClass("active");
    }
});

$(document).on('scroll', function() {
    if($(this).scrollTop() >= $("#storitve").position().top){
        removeActive();
        $('a[href$="#storitve"]').addClass("active");
    }
});

$(document).on('scroll', function() {
    if($(this).scrollTop() >= $("#zakonodaja").position().top){
        removeActive();
        $('a[href$="#zakonodaja"]').addClass("active");
    }
});

$(document).on('scroll', function() {
    if($(this).scrollTop() >= $("#cenik").position().top){
        removeActive();
        $('a[href$="#cenik"]').addClass("active");
    }
});

$(document).on('scroll', function() {
    if($(this).scrollTop() >= $("#o-meni").position().top){
        removeActive();
        $('a[href$="#o-meni"]').addClass("active");
    }
});

$(document).on('scroll', function() {
    if($(this).scrollTop() >= $("#kontakt").position().top){
        removeActive();
        $('a[href$="#kontakt"]').addClass("active");
    }
});

function removeActive()
{
    $("a.item").removeClass("active");
}

$('#menu-collapse').click(function() {
    $('.ui.menu').toggle();
});

$(window).ready(function() {
    if($(window).width() <= 768)
    {
        $('.ui.menu').hide();
    }
});

$(window).resize(function() {
    if($(window).width() <= 768)
    {
        $('.ui.menu').hide();
    }
    else
    {
        $('.ui.menu').show();
    }
});