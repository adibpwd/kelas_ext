// var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

// var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];

// var date = new Date();

// var day = date.getDate();

// var month = date.getMonth();

// var thisDay = date.getDay(),

//     thisDay = myDays[thisDay];

// var yy = date.getYear();

// var year = (yy < 1000) ? yy + 1900 : yy;

// document.write(thisDay + ', ' + day + ' ' + months[month] + ' ' + year);


function $(id) {
    return document.getElementById(id);
}

function create(name, props) {
    element = document.createElement(name)

    for (var i in props) {
        element[i] = props[i]

    }

    return element
    // return element
}

function get(url, nameFunc) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            nameFunc(JSON.parse(this.responseText))
        }

    }

    xhttp.open("GET", url, true)
    xhttp.send()
}

function listsurah(res) {
    // console.log(res);

    var msgContainer = document.createDocumentFragment()

    for (var i = 0; i < res.hasil.length; i++) {
        msgContainer.appendChild(create('option', {
            text: res.hasil[i].name,
            value: res.hasil[i].nomor
        }))
    }
    $('listSurah').appendChild(msgContainer)
}

function listAyat(res) {
    // console.log(res);
    $('listAyat').innerHTML = ""
    var msgContainer = document.createDocumentFragment()

    for (var i = 1; i <= res.hasil[0].ayat; i++) {
        msgContainer.appendChild(create('option', {
            text: i,
            value: i
        }))
    }
    $('listAyat').appendChild(msgContainer)
    // default ayat
    $('listAyat').value = 1
}

function ayat(res) {
    $('ayat').innerHTML = res.ayat.data.ar[0].teks
    $('terjemah').innerHTML = res.ayat.data.id[0].teks
}

function change(surahSelect, ayatSelect) {
    get("https://api.banghasan.com/quran/format/json/surat/" + surahSelect + "/ayat/" + ayatSelect, ayat)

}

function next() {
    $('listAyat')
}

window.onload = function () {
    surahSelected = 1
    ayatSelected = 1
    // event surah
    $('listSurah').addEventListener('change', function () {
        surahSelected = this.value
        change(surahSelected, 1)
        get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected, listAyat)
    })

    // event ayat
    $('listAyat').addEventListener('change',
        function () {
            change(surahSelected, this.value)
            // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected + "/ayat/" + this.value, ayat)
        })

    $('prev').addEventListener('click',
        function () {
            ayatSelected = ayatSelected - 1
            change(surahSelected, ayatSelected)
            // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected + "/ayat/" + this.value, ayat)
        })

        $('next').addEventListener('click',
        function () {
            ayatSelected = ayatSelected + 1
            change(surahSelected, ayatSelected)
            // get("https://api.banghasan.com/quran/format/json/surat/" + surahSelected + "/ayat/" + this.value, ayat)
        })

    get("https://api.banghasan.com/quran/format/json/surat/1/ayat/1", ayat)
    get("https://api.banghasan.com/quran/format/json/surat", listsurah)
    get("https://api.banghasan.com/quran/format/json/surat/1", listAyat)
    get("https://api.banghasan.com/sholat/format/json/kota/nama/yogyakarta", locbirth)
}

// var kikuk = document.getElementById("indonesia");

// function berubah() {
//     kikuk.backgroundColor='red';
// }

// kikuk.onclick = function () {
//     berubah()
// }

// kikuk.addEventListener('click', berubah());

// function berubah1(id) {
//     id.innerHTML = "gokil";
// }

function changeText(id) {
    id.innerHTML = "iofk!";
}