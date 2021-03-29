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
    if (value) {
        var showtag = document.getElementById("showtag");
        var tag = document.createElement("a");
        var tagremove = document.createElement("span");
        titled = document.getElementById("modaldoujinshi").alt
        doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
        doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
        doujinshiinfotesttag = doujinshi[doujinshiinfoindex].tag.indexOf(value)
        document.getElementById("addtag").value = ""
        if (doujinshiinfotesttag < 0) {
            tagremove.innerHTML = "X"
            tagremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: inline-block;cursor: pointer;"
            tagremove.className = "tagcross"
            tag.id = "tagcross"+j
            tagremove.setAttribute('onclick',`removetag("${titled}", "${value}");this.remove();document.getElementById("tagcross${j}").remove();`)
            tag.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            tag.innerHTML = value
            tag.appendChild(tagremove)
            showtag.appendChild(tag)
            doujinshi[doujinshiinfoindex].tag.push(value)
            var jsonoutput = JSON.stringify(doujinshi, null, '\t')
            fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
            j++
        }
    }
}

// function used to remove a tag
function removetag(titled, value) {
    doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
    doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
    doujinshiinfotesttag = doujinshi[doujinshiinfoindex].tag.indexOf(value)
    if (doujinshiinfotesttag > -1) {
        doujinshi[doujinshiinfoindex].tag.splice(doujinshiinfotesttag, 1)
        var jsonoutput = JSON.stringify(doujinshi, null, '\t')
        fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
    }
}

// function used to show or hide the delete cross for tag
function edittag() {
    x = 0;
    while (x < tagcross.length) {tagcross[x].style.display='inline-block';x++};
    document.getElementById("addtag").style.display='inline-block';
    document.getElementById("addtagv").style.display='inline-block';
    document.getElementById("tageditpencil").setAttribute('onclick',`edittagoff()`)
}

function edittagoff() {
    x = 0;
    while (x < tagcross.length) {tagcross[x].style.display='none';x++};
    document.getElementById("addtag").style.display='none';
    document.getElementById("addtagv").style.display='none';
    document.getElementById("tageditpencil").setAttribute('onclick',`edittag()`)
}

// function used to add a character
function addcharacter() {
    var value = document.getElementById("addcharacter").value
    if (value) {
        var showcharacter = document.getElementById("showcharacter");
        var character = document.createElement("a");
        var characterremove = document.createElement("span");
        titled = document.getElementById("modaldoujinshi").alt
        doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
        doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
        doujinshiinfotestcharacter = doujinshi[doujinshiinfoindex].character.indexOf(value)
        document.getElementById("addcharacter").value = ""
        if (doujinshiinfotestcharacter < 0) {
            characterremove.innerHTML = "X"
            characterremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: inline-block;cursor: pointer;"
            characterremove.className = "charactercross"
            character.id = "charactercross"+e
            characterremove.setAttribute('onclick',`removecharacter("${titled}", "${value}");this.remove();document.getElementById("charactercross${e}").remove();`)
            character.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            character.innerHTML = value
            character.appendChild(characterremove)
            showcharacter.appendChild(character)
            doujinshi[doujinshiinfoindex].character.push(value)
            var jsonoutput = JSON.stringify(doujinshi, null, '\t')
            fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
            e++
        }
    }
}

// function used to remove a character
function removecharacter(titled, value) {
    doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
    doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
    doujinshiinfotestcharacter = doujinshi[doujinshiinfoindex].character.indexOf(value)
    if (doujinshiinfotestcharacter > -1) {
        doujinshi[doujinshiinfoindex].character.splice(doujinshiinfotestcharacter, 1)
        var jsonoutput = JSON.stringify(doujinshi, null, '\t')
        fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
    }
}

// function used to show or hide the delete cross for character
function editcharacter() {
    x = 0;
    while (x < charactercross.length) {charactercross[x].style.display='inline-block';x++};
    document.getElementById("addcharacter").style.display='inline-block';
    document.getElementById("addcharacterv").style.display='inline-block';
    document.getElementById("charactereditpencil").setAttribute('onclick',`editcharacteroff()`)
}

function editcharacteroff() {
    x = 0;
    while (x < charactercross.length) {charactercross[x].style.display='none';x++};
    document.getElementById("addcharacter").style.display='none';
    document.getElementById("addcharacterv").style.display='none';
    document.getElementById("charactereditpencil").setAttribute('onclick',`editcharacter()`)
}

// detect if title has been change them save change
document.getElementById("edittitle").addEventListener('change', (updateValue) => {
    document.getElementById('edittitlepencil').setAttribute('onclick',`edittitleon()`)
    titled = document.getElementById("modaldoujinshi").alt
    doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
    doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
    doujinshi[doujinshiinfoindex].name = event.target.value
    var jsonoutput = JSON.stringify(doujinshi, null, '\t')
    fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
    document.getElementById('edittitle').style.display='none'
    document.getElementById("doujinshititle").innerHTML = "Title: "+doujinshi[doujinshiinfoindex].name
});

// detect if artist has been change them save change
document.getElementById("editartist").addEventListener('change', (updateValue) => {
    document.getElementById('editartistpencil').setAttribute('onclick',`editartistoff()`)
    titled = document.getElementById("modaldoujinshi").alt
    doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
    doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
    doujinshi[doujinshiinfoindex].artist = event.target.value
    var jsonoutput = JSON.stringify(doujinshi, null, '\t')
    fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
    document.getElementById('editartist').style.display='none'
    document.getElementById("doujinshiartist").innerHTML = "Artist: "+doujinshi[doujinshiinfoindex].artist
});

// detect if date has been change them save change
document.getElementById("editdate").addEventListener('change', (updateValue) => {
    document.getElementById('editdatepencil').setAttribute('onclick',`editdateon()`)
    titled = document.getElementById("modaldoujinshi").alt
    doujinshiinfo = doujinshi.find( ({ folder }) => folder === titled );
    doujinshiinfoindex = doujinshi.indexOf(doujinshiinfo)
    doujinshi[doujinshiinfoindex].date = event.target.value
    var jsonoutput = JSON.stringify(doujinshi, null, '\t')
    fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
    document.getElementById('editdate').style.display='none'
    document.getElementById("doujinshidate").innerHTML = "Date: "+doujinshi[doujinshiinfoindex].date
});