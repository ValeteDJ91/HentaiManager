var tagcross = document.getElementsByClassName('tagcross');
var charactercross = document.getElementsByClassName('charactercross');
var favoritestar = document.getElementById("favoritestar")
var j = 0;
var e = 0;

// function used to show or hide the text insert for title
function edittitleon() {
    titlec = document.getElementById('doujinshititle').innerHTML
    document.getElementById('doujinshititle').innerHTML='Title: ';
    document.getElementById('edittitle').style.display=''
    document.getElementById('edittitlepencil').setAttribute('onclick',`edittitleoff()`)
}

function edittitleoff() {
    document.getElementById('edittitle').style.display='none'
    document.getElementById('doujinshititle').innerHTML=titlec;
    document.getElementById('edittitlepencil').setAttribute('onclick',`edittitleon()`)
}

// function used to show or hide the text insert for artist
function editartiston() {
    artistc = document.getElementById('doujinshiartist').innerHTML
    document.getElementById('doujinshiartist').innerHTML='Artist: ';
    document.getElementById('editartist').style.display=''
    document.getElementById('editartistpencil').setAttribute('onclick',`editartistoff()`)
}

function editartistoff() {
    document.getElementById('editartist').style.display='none'
    document.getElementById('doujinshiartist').innerHTML=artistc;
    document.getElementById('editartistpencil').setAttribute('onclick',`editartiston()`)
}

// function used to show or hide the text insert for the date
function editdateon() {
    datec = document.getElementById('doujinshidate').innerHTML
    document.getElementById('doujinshidate').innerHTML='Date: ';
    document.getElementById('editdate').style.display=''
    document.getElementById('editdatepencil').setAttribute('onclick',`editdateoff()`)
}

function editdateoff() {
    document.getElementById('editdate').style.display='none'
    document.getElementById('doujinshidate').innerHTML=datec;
    document.getElementById('editdatepencil').setAttribute('onclick',`editdateon()`)
}

// function used to add a tag
function addtag() {
    var value = document.getElementById("addtag").value
    var reg = testregex.exec(value);
    if (value && !reg) {
        var showtag = document.getElementById("showtag");
        var tag = document.createElement("a");
        var tagremove = document.createElement("span");
        titled = document.getElementById("modaldoujinshi").alt
        doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
        var doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
        var doujinshiinfotesttag = doujinshi[doujinshiinfoindex].tag.indexOf(value)
        document.getElementById("addtag").value = ""
        if (doujinshiinfotesttag < 0) {
            tagremove.innerHTML = "X"
            tagremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: inline-block;cursor: pointer;"
            tagremove.className = "tagcross"
            tag.id = "tagcross"+j
            tag.className = "tagclass"
            tagremove.setAttribute('onclick',`removetag("${titled}", "${value}");this.remove();document.getElementById("tagcross${j}").remove();`)
            tag.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            tag.innerHTML = value
            tag.appendChild(tagremove)
            showtag.appendChild(tag)
            doujinshi[doujinshiinfoindex].tag.push(value)
            var jsonoutput = JSON.stringify(doujinshi, null, '\t')
            fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
            var tagjson = require('../data/placeholder.json')
            var tagjsonindex = tagjson.tag.doujinshi.indexOf(value)
            if (tagjsonindex < 0) {
                tagjson.tag.doujinshi.push(value)
                var tagjsonoutput = JSON.stringify(tagjson, null, '\t')
                fs.writeFile('data/placeholder.json', tagjsonoutput, function (err) {if (err) throw err;});
            }
            j++
        }
    }
}

// function used to remove a tag
function removetag(titled, value) {
    doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
    var doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
    var doujinshiinfotesttag = doujinshi[doujinshiinfoindex].tag.indexOf(value)
    if (doujinshiinfotesttag > -1) {
        doujinshi[doujinshiinfoindex].tag.splice(doujinshiinfotesttag, 1)
        var jsonoutput = JSON.stringify(doujinshi, null, '\t')
        fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
    }
}

// function used to show or hide the delete cross for tag
function edittag() {
    var x = 0;
    while (x < tagcross.length) {tagcross[x].style.display='inline-block';x++};
    document.getElementById("addtag").style.display='inline-block';
    document.getElementById("addtagv").style.display='inline-block';
    document.getElementById("tageditpencil").setAttribute('onclick',`edittagoff()`)
}

function edittagoff() {
    var x = 0;
    while (x < tagcross.length) {tagcross[x].style.display='none';x++};
    document.getElementById("addtag").style.display='none';
    document.getElementById("addtagv").style.display='none';
    document.getElementById("tageditpencil").setAttribute('onclick',`edittag()`)
}

// function used to add a character
function addcharacter() {
    var value = document.getElementById("addcharacter").value
    var test = testregex.exec(value);
    if (value && !test) {
        var showcharacter = document.getElementById("showcharacter");
        var character = document.createElement("a");
        var characterremove = document.createElement("span");
        titled = document.getElementById("modaldoujinshi").alt
        doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
        var doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
        var doujinshiinfotestcharacter = doujinshi[doujinshiinfoindex].character.indexOf(value)
        document.getElementById("addcharacter").value = ""
        if (doujinshiinfotestcharacter < 0) {
            characterremove.innerHTML = "X"
            characterremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: inline-block;cursor: pointer;"
            characterremove.className = "charactercross"
            character.id = "charactercross"+e
            characterremove.setAttribute('onclick',`removecharacter("${titled}", "${value}");this.remove();document.getElementById("charactercross${e}").remove();`)
            character.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            character.innerHTML = value
            character.className = "tagclass"
            character.appendChild(characterremove)
            showcharacter.appendChild(character)
            doujinshi[doujinshiinfoindex].character.push(value)
            var jsonoutput = JSON.stringify(doujinshi, null, '\t')
            fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
            var tagjson = require('../data/placeholder.json')
            var tagjsonindex = tagjson.character.doujinshi.indexOf(value)
            if (tagjsonindex < 0) {
                tagjson.character.doujinshi.push(value)
                var tagjsonoutput = JSON.stringify(tagjson, null, '\t')
                fs.writeFile('data/placeholder.json', tagjsonoutput, function (err) {if (err) throw err;});
            }
            e++
        }
    }
}

// function used to remove a character
function removecharacter(titled, value) {
    doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
    var doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
    var doujinshiinfotestcharacter = doujinshi[doujinshiinfoindex].character.indexOf(value)
    if (doujinshiinfotestcharacter > -1) {
        doujinshi[doujinshiinfoindex].character.splice(doujinshiinfotestcharacter, 1)
        var jsonoutput = JSON.stringify(doujinshi, null, '\t')
        fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
    }
}

// function used to show or hide the delete cross for character
function editcharacter() {
    var x = 0;
    while (x < charactercross.length) {charactercross[x].style.display='inline-block';x++};
    document.getElementById("addcharacter").style.display='inline-block';
    document.getElementById("addcharacterv").style.display='inline-block';
    document.getElementById("charactereditpencil").setAttribute('onclick',`editcharacteroff()`)
}

function editcharacteroff() {
    var x = 0;
    while (x < charactercross.length) {charactercross[x].style.display='none';x++};
    document.getElementById("addcharacter").style.display='none';
    document.getElementById("addcharacterv").style.display='none';
    document.getElementById("charactereditpencil").setAttribute('onclick',`editcharacter()`)
}

// detect if title has been change them save change
document.getElementById("edittitle").addEventListener('change', (updateValue) => {
    var reg = testregex.exec(event.target.value);
    if (!reg) {
        document.getElementById('edittitlepencil').setAttribute('onclick',`edittitleon()`)
        titled = document.getElementById("modaldoujinshi").alt
        doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
        var doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
        doujinshi[doujinshiinfoindex].name = event.target.value
        var jsonoutput = JSON.stringify(doujinshi, null, '\t')
        fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
        document.getElementById('edittitle').style.display='none'
        document.getElementById("doujinshititle").innerHTML = "Title: "+doujinshi[doujinshiinfoindex].name
    }
});

// detect if artist has been change them save change
document.getElementById("editartist").addEventListener('change', (updateValue) => {
    var reg = testregex.exec(event.target.value);
    if (!reg) {
        document.getElementById('editartistpencil').setAttribute('onclick',`editartiston()`)
        titled = document.getElementById("modaldoujinshi").alt
        doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
        var doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
        doujinshi[doujinshiinfoindex].artist = event.target.value
        var jsonoutput = JSON.stringify(doujinshi, null, '\t')
        fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
        document.getElementById('editartist').style.display='none'
        document.getElementById("doujinshiartist").innerHTML = "Artist: "+doujinshi[doujinshiinfoindex].artist
    }
});

// detect if date has been change them save change
document.getElementById("editdate").addEventListener('change', (updateValue) => {
    var reg = testregex.exec(event.target.value);
    if (!reg) {
        document.getElementById('editdatepencil').setAttribute('onclick',`editdateon()`)
        titled = document.getElementById("modaldoujinshi").alt
        doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
        var doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
        doujinshi[doujinshiinfoindex].date = event.target.value
        var jsonoutput = JSON.stringify(doujinshi, null, '\t')
        fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
        document.getElementById('editdate').style.display='none'
        document.getElementById("doujinshidate").innerHTML = "Date: "+doujinshi[doujinshiinfoindex].date
    }
});

// show tag list
function tagliston() {
    doujinshizone.innerHTML = '';
    doujtagzone.innerHTML = '';
    document.getElementById("doujinshimodal").style.display= "none"
    doujtagzone.style.display = "block"
    var palceholders = require('../data/placeholder.json');
    var i = 0
    while (i < palceholders.tag.doujinshi.length) {
        var tag = document.createElement("a");
        tag.innerHTML = palceholders.tag.doujinshi[i];
        tag.className = "taglistentry"
        tag.setAttribute('onclick',`tagsearch.value = this.innerHTML; loaddoujinshi(80, 1)`)
        doujtagzone.appendChild(tag);
        i++
    }
}

// show character list
function characterliston() {
    doujinshizone.innerHTML = '';
    doujtagzone.innerHTML = '';
    document.getElementById("doujinshimodal").style.display= "none"
    doujtagzone.style.display = "block"
    var palceholders = require('../data/placeholder.json');
    var i = 0
    while (i < palceholders.character.doujinshi.length) {
        var character = document.createElement("a");
        character.innerHTML = palceholders.character.doujinshi[i];
        character.className = "taglistentry"
        character.setAttribute('onclick',`charactersearch.value = this.innerHTML; loaddoujinshi(80, 1)`)
        doujtagzone.appendChild(character);
        i++
    }
}

// favorite systeme
function addfavorite() {
    favoritestar.src = "../img/starfull.png"
    favoritestar.setAttribute('onclick',`removefavorite()`)
    favorite.doujinshi.push(modaldoujinshi.alt);
    var jsonoutput = JSON.stringify(favorite, null, '\t')
    fs.writeFile('data/favorite.json', jsonoutput, function (err) {if (err) throw err;});
}

function removefavorite() {
    favoritestar.src = "../img/star.png"
    favoritestar.setAttribute('onclick',`addfavorite()`)
    var favoriteindex = favorite.doujinshi.indexOf(modaldoujinshi.alt)
    if (favoriteindex > -1) {
        favorite.doujinshi.splice(favoriteindex, 1)
        var jsonoutput = JSON.stringify(favorite, null, '\t')
        fs.writeFile('data/favorite.json', jsonoutput, function (err) {if (err) throw err;});
    }
}