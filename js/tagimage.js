// function used to show or hide the text insert for title
function edittitleon() {
    titlec = document.getElementById('imgtitle').innerHTML
    document.getElementById('imgtitle').innerHTML='Title: ';
    document.getElementById('edittitle').style.display=''
    document.getElementById('edittitlepencil').setAttribute('onclick',`edittitleoff()`)
}

function edittitleoff() {
    document.getElementById('edittitle').style.display='none'
    document.getElementById('imgtitle').innerHTML=titlec;
    document.getElementById('edittitlepencil').setAttribute('onclick',`edittitleon()`)
}

// function used to show or hide the text insert for artist
function editartiston() {
    artistc = document.getElementById('imgartist').innerHTML
    document.getElementById('imgartist').innerHTML='Artist: ';
    document.getElementById('editartist').style.display=''
    document.getElementById('editartistpencil').setAttribute('onclick',`editartistoff()`)
}

function editartistoff() {
    document.getElementById('editartist').style.display='none'
    document.getElementById('imgartist').innerHTML=artistc;
    document.getElementById('editartistpencil').setAttribute('onclick',`editartiston()`)
}

// function used to add a tag
function addtag() {
    var value = document.getElementById("addtag").value
    var test = testregex.exec(value);
    if (value && !test) {
        var showtag = document.getElementById("showtag");
        var tag = document.createElement("a");
        var tagremove = document.createElement("span");
        titled = document.getElementById("modalimg").alt
        imginfo = img.find( ({ file }) => file === titled );
        imginfoindex = img.indexOf(imginfo)
        imginfotesttag = img[imginfoindex].tag.indexOf(value)
        document.getElementById("addtag").value = ""
        if (imginfotesttag < 0) {
            tagremove.innerHTML = "X"
            tagremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: inline-block;cursor: pointer;"
            tagremove.className = "tagcross"
            tag.id = "tagcross"+j
            tagremove.setAttribute('onclick',`removetag("${titled}", "${value}");this.remove();document.getElementById("tagcross${j}").remove();`)
            tag.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            tag.innerHTML = value
            tag.appendChild(tagremove)
            showtag.appendChild(tag)
            img[imginfoindex].tag.push(value)
            var jsonoutput = JSON.stringify(img, null, '\t')
            fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
            var tagjson = require('../data/placeholder.json')
            tagjsonindex = tagjson.tag.image.indexOf(value)
            if (tagjsonindex < 0) {
                tagjson.tag.image.push(value)
                var tagjsonoutput = JSON.stringify(tagjson, null, '\t')
                fs.writeFile('data/placeholder.json', tagjsonoutput, function (err) {if (err) throw err;});
            }
            j++
        }
    }
}

// function used to remove a tag
function removetag(titled, value) {
    imginfo = img.find( ({ file }) => file === titled );
    imginfoindex = img.indexOf(imginfo)
    imginfotesttag = img[imginfoindex].tag.indexOf(value)
    if (imginfotesttag > -1) {
        img[imginfoindex].tag.splice(imginfotesttag, 1)
        var jsonoutput = JSON.stringify(img, null, '\t')
        fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
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
    var test = testregex.exec(value);
    if (value && !test) {
        var showcharacter = document.getElementById("showcharacter");
        var character = document.createElement("a");
        var characterremove = document.createElement("span");
        titled = document.getElementById("modalimg").alt
        imginfo = img.find( ({ file }) => file === titled );
        imginfoindex = img.indexOf(imginfo)
        imginfotestcharacter = img[imginfoindex].character.indexOf(value)
        document.getElementById("addcharacter").value = ""
        if (imginfotestcharacter < 0) {
            characterremove.innerHTML = "X"
            characterremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: inline-block;cursor: pointer;"
            characterremove.className = "charactercross"
            character.id = "charactercross"+e
            characterremove.setAttribute('onclick',`removecharacter("${titled}", "${value}");this.remove();document.getElementById("charactercross${e}").remove();`)
            character.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            character.innerHTML = value
            character.appendChild(characterremove)
            showcharacter.appendChild(character)
            img[imginfoindex].character.push(value)
            var jsonoutput = JSON.stringify(img, null, '\t')
            fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
            var tagjson = require('../data/placeholder.json')
            tagjsonindex = tagjson.character.image.indexOf(value)
            if (tagjsonindex < 0) {
                tagjson.character.image.push(value)
                var tagjsonoutput = JSON.stringify(tagjson, null, '\t')
                fs.writeFile('data/placeholder.json', tagjsonoutput, function (err) {if (err) throw err;});
            }
            e++
        }
    }
}

// function used to remove a character
function removecharacter(titled, value) {
    imginfo = img.find( ({ file }) => file === titled );
    imginfoindex = img.indexOf(imginfo)
    imginfotestcharacter = img[imginfoindex].character.indexOf(value)
    if (imginfotestcharacter > -1) {
        img[imginfoindex].character.splice(imginfotestcharacter, 1)
        var jsonoutput = JSON.stringify(img, null, '\t')
        fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
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

// function used to add a imagegroup
function addimagegroup() {
    var value = document.getElementById("addimagegroup").value
    var test = testregex.exec(value);
    if (value && !test) {
        var showimagegroup = document.getElementById("showimagegroup");
        var imagegroup = document.createElement("a");
        var imagegroupremove = document.createElement("span");
        titled = document.getElementById("modalimg").alt
        imginfo = img.find( ({ file }) => file === titled );
        imginfoindex = img.indexOf(imginfo)
        imginfotestimagegroup = img[imginfoindex].imagegroup.indexOf(value)
        document.getElementById("addimagegroup").value = ""
        if (imginfotestimagegroup < 0) {
            imagegroupremove.innerHTML = "X"
            imagegroupremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: inline-block;cursor: pointer;"
            imagegroupremove.className = "imagegroupcross"
            imagegroup.id = "imagegroupcross"+e
            imagegroupremove.setAttribute('onclick',`removeimagegroup("${titled}", "${value}");this.remove();document.getElementById("imagegroupcross${e}").remove();`)
            imagegroup.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            imagegroup.innerHTML = value
            imagegroup.appendChild(imagegroupremove)
            showimagegroup.appendChild(imagegroup)
            img[imginfoindex].imagegroup.push(value)
            var jsonoutput = JSON.stringify(img, null, '\t')
            fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
            var tagjson = require('../data/placeholder.json')
            tagjsonindex = tagjson.imggroup.image.indexOf(value)
            if (tagjsonindex < 0) {
                tagjson.imggroup.image.push(value)
                var tagjsonoutput = JSON.stringify(tagjson, null, '\t')
                fs.writeFile('data/placeholder.json', tagjsonoutput, function (err) {if (err) throw err;});
            }
            e++
        }
    }
}

// function used to remove a imagegroup
function removeimagegroup(titled, value) {
    imginfo = img.find( ({ file }) => file === titled );
    imginfoindex = img.indexOf(imginfo)
    imginfotestimagegroup = img[imginfoindex].imagegroup.indexOf(value)
    if (imginfotestimagegroup > -1) {
        img[imginfoindex].imagegroup.splice(imginfotestimagegroup, 1)
        var jsonoutput = JSON.stringify(img, null, '\t')
        fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
    }
}

// function used to show or hide the delete cross for imagegroup
function editimagegroup() {
    x = 0;
    while (x < imagegroupcross.length) {imagegroupcross[x].style.display='inline-block';x++};
    document.getElementById("addimagegroup").style.display='inline-block';
    document.getElementById("addimagegroupv").style.display='inline-block';
    document.getElementById("imagegroupeditpencil").setAttribute('onclick',`editimagegroupoff()`)
}

function editimagegroupoff() {
    x = 0;
    while (x < imagegroupcross.length) {imagegroupcross[x].style.display='none';x++};
    document.getElementById("addimagegroup").style.display='none';
    document.getElementById("addimagegroupv").style.display='none';
    document.getElementById("imagegroupeditpencil").setAttribute('onclick',`editimagegroup()`)
}

// detect if title has been change them save change
document.getElementById("edittitle").addEventListener('change', (updateValue) => {
    document.getElementById('edittitlepencil').setAttribute('onclick',`edittitleon()`)
    titled = document.getElementById("modalimg").alt
    imginfo = img.find( ({ file }) => file === titled );
    imginfoindex = img.indexOf(imginfo)
    img[imginfoindex].quickname = event.target.value
    var jsonoutput = JSON.stringify(img, null, '\t')
    fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
    document.getElementById('edittitle').style.display='none'
    document.getElementById("imgtitle").innerHTML = "Title: "+img[imginfoindex].quickname
});

// detect if artist has been change them save change
document.getElementById("editartist").addEventListener('change', (updateValue) => {
    document.getElementById('editartistpencil').setAttribute('onclick',`editartiston()`)
    titled = document.getElementById("modalimg").alt
    imginfo = img.find( ({ file }) => file === titled );
    imginfoindex = img.indexOf(imginfo)
    img[imginfoindex].artist = event.target.value
    var jsonoutput = JSON.stringify(img, null, '\t')
    fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
    document.getElementById('editartist').style.display='none'
    document.getElementById("imgartist").innerHTML = "Artist: "+img[imginfoindex].artist
});