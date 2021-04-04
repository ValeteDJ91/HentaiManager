const sizeOf = require('image-size');
var folderarray = [];
var i = 0;
var max_height = 230;
var max_width = 230;
var pg = 0;
var zoomindex = settings.doujinshi.zoomindex;
var showtag = document.getElementById("showtag");
var showcharacter = document.getElementById("showcharacter");
var margindropdown = document.getElementById("margindropdown");
var doujinshi = require('../data/doujinshi.json');
var doujinshiarray = [];
if (settings.doujinshi.zoomindex > 500) {zoomindex = 500};
if (settings.doujinshi.zoomindex < 25) {zoomindex = 25};

// read all folder show them with title and first page
fs.readdirSync(settings.doujinshi.folder).forEach(file => {
    folderarray.push(file);
});
var doujinshizone = document.getElementById("doujinshizone");
if (folderarray.length == 0) {var nfa = document.createElement("a");nfa.style = "color:#ffffff;text-align:center; font-size: 230%;";doujinshizone.appendChild(nfa);nfa.innerHTML = "No doujinshi found ;(";}
function loaddoujinshi(toload){
    document.getElementById("loadinginfo").style.display= "block"
    var z = 0;
    while(i < folderarray.length && z < toload) {
    doujinshiarray = [];
    fs.readdirSync(settings.doujinshi.folder+"/"+folderarray[i]).forEach(file => {
        doujinshiarray.push(file);
    });
    if (doujinshiarray.length !== 0){
        try {
            var previewsize = sizeOf(settings.doujinshi.folder+"/"+folderarray[i]+"/"+doujinshiarray[0])
            var previewcontainer = document.createElement("div");
            var preview = document.createElement("img");
            var title = document.createElement("p");
            preview.src = settings.doujinshi.folder+"/"+folderarray[i]+"/"+doujinshiarray[0];
            preview.style = `height: ${previewsize.height}px; width: ${previewsize.width}px`
            doujinshiinfo = doujinshi.find( ({ folder }) => folder === folderarray[i] );
            if (!doujinshiinfo) {
                title.innerHTML = folderarray[i]
                previewcontainer.alt = folderarray[i]
            } else {
                title.innerHTML = doujinshiinfo.name
                previewcontainer.alt = doujinshiinfo.name
            }
            previewcontainer.id = "contdoujinshi"+i
            title.style = `margin: 6px;font-size: 13px;`
            previewcontainer.appendChild(preview);
            previewcontainer.appendChild(title);
            previewcontainer.setAttribute('onclick',`modal.style.display = 'block'; pg = 0; viewdoujinshi(${pg}, "${folderarray[i]}"); document.getElementById("modaldoujinshi").alt = "${folderarray[i]}"; document.getElementById("forward").alt = "${folderarray[i]}"`)
            doujinshizone.appendChild(previewcontainer);
            if(preview.height > max_height && preview.height>preview.width || preview.height==preview.width)
            {
                ratio = max_height / preview.height;
                new_height = preview.height * ratio;
                new_width = preview.width * ratio;
            }
            if(preview.width > max_width  && preview.width>preview.height)
            {
                ratio = max_width / preview.width;
                new_height = preview.height * ratio;
                new_width = preview.width * ratio;
            }
            preview.style = `height: ${new_height}px; width: ${new_width}px;display: unset;margin-top: 6px;`
            previewcontainer.style = `border-radius: 5px;background-color: #2b2b2b;margin-top: 6px;margin-right: 6px;text-align: center;position: relative;width: ${new_width+15}px;display: inline-block;vertical-align: middle;cursor: pointer;`

        } catch (e) {console.error("Failed to load: "+settings.doujinshi.folder+"/"+folderarray[i]+"\nFolder Empty or not accepted\n"+e)}
    } else {console.error("Failed to load: "+settings.doujinshi.folder+"/"+folderarray[i]+"\nFolder Empty")}
    i++;
    z++;
    }
    document.getElementById("loadinginfo").style.display= "none"
}
loaddoujinshi(settings.doujinshi.doujloadfirst)

// load more doujinshi on scroll
document.body.addEventListener('scroll',()=>{
    if (document.body.scrollTop+3500 > document.body.scrollHeight) {
        loaddoujinshi(settings.doujinshi.doujloadscroll)
    }
})

// MODAL/ZOOM
// exit modal
var modal = document.getElementById("doujinshimodal");
var modalImg = document.getElementById("modaldoujinshi");
var showfulldoujinshi = document.getElementById("showfulldoujinshi")
var imgazone = document.getElementById("imgazone")
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
showfulldoujinshi.onclick = function(event) {
    if (event.target == showfulldoujinshi) {
        modal.style.display = "none";
    }
}
imgazone.onclick = function(event) {
    if (event.target == imgazone) {
        modal.style.display = "none";
    }
}
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        modal.style.display = "none";
    }
};

// enter modal
function viewdoujinshi(page, title) {
    var doujinshiinfo = 0
    document.getElementById("taglist").innerHTML = ""
    document.getElementById("characterlist").innerHTML = ""
    document.getElementById("showtag").innerHTML = ""
    document.getElementById("showcharacter").innerHTML = ""
    document.getElementById('edittitle').style.display='none'
    document.getElementById('editartist').style.display='none'
    document.getElementById('editdate').style.display='none'
    document.getElementById('editdatepencil').setAttribute('onclick',`editdateon()`)
    document.getElementById('editartistpencil').setAttribute('onclick',`editartiston()`)
    document.getElementById('edittitlepencil').setAttribute('onclick',`edittitleon()`)
    var doujinshi = require('../data/doujinshi.json');
    var tagjson = require('../data/placeholder.json');
    // add show tag when input
    var m = 0
    while (m < tagjson.tag.doujinshi.length) {
        var option = document.createElement('option');
        option.innerHTML = tagjson.tag.doujinshi[m]
        document.getElementById("taglist").appendChild(option)
        m++
    }
    var b = 0
    while (b < tagjson.character.doujinshi.length) {
        var option = document.createElement('option');
        option.innerHTML = tagjson.character.doujinshi[b]
        document.getElementById("characterlist").appendChild(option)
        b++
    }
    // set page number
    doujinshiarray = [];
    fs.readdirSync(settings.doujinshi.folder+"/"+title).forEach(file => {
        if (file.includes(".png")||file.includes(".jpg")||file.includes(".jpeg")||file.includes(".gif")) {doujinshiarray.push(file);}
    });
    if (page >= doujinshiarray.length) {
        page = 0
        pg = 0
    }
    if (page < 0) {
        page = doujinshiarray.length-1
        pg = doujinshiarray.length-1
    }
    // get doujinshi info
    doujinshiinfo = doujinshi.find( ({ folder }) => folder === title );
    if (!doujinshiinfo || doujinshiinfo == 0) {
        // push info in json if doujinshi has no info
        document.getElementById("doujinshititle").innerHTML = "Title: "+title
        document.getElementById('edittitle').value = title
        document.getElementById("doujinshiartist").innerHTML = "Artist: "
        document.getElementById("doujinshidate").innerHTML = "Date: "
        doujinshi.push({"folder":title,"name":title,"artist":"","tag":[],"date":"","character":[]})
        var jsonoutput = JSON.stringify(doujinshi, null, '\t')
        fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
    } else {
        // show info of doujinshi
        document.getElementById("doujinshititle").innerHTML = "Title: "+doujinshiinfo.name
        document.getElementById('edittitle').value = doujinshiinfo.name
        document.getElementById("doujinshiartist").innerHTML = "Artist: "+doujinshiinfo.artist
        document.getElementById('editartist').value = doujinshiinfo.artist
        document.getElementById("doujinshidate").innerHTML = "Date: "+doujinshiinfo.date
        document.getElementById('editdate').value = doujinshiinfo.date
        // show all tag
        var j = 0
        while (j < doujinshiinfo.tag.length) {
            var tag = document.createElement("a");
            var tagremove = document.createElement("span");
            tagremove.innerHTML = "X"
            tagremove.className = "tagcross"
            tag.id = "tagcross"+j
            tagremove.setAttribute('onclick',`removetag("${title}", "${doujinshiinfo.tag[j]}");this.remove();document.getElementById("tagcross${j}").remove();`)
            tag.className = "tagclass"
            tag.innerHTML = doujinshiinfo.tag[j]
            tag.appendChild(tagremove)
            showtag.appendChild(tag)
            j++
        }
        // show all character
        var e = 0
        while (e < doujinshiinfo.character.length) {
            var character = document.createElement("a");
            var characterremove = document.createElement("span");
            characterremove.innerHTML = "X"
            characterremove.className = "charactercross"
            character.id = "charactercross"+e
            characterremove.setAttribute('onclick',`removecharacter("${title}", "${doujinshiinfo.character[e]}");this.remove();document.getElementById("charactercross${e}").remove();`)
            character.className = "tagclass"
            character.innerHTML = doujinshiinfo.character[e]
            character.appendChild(characterremove)
            showcharacter.appendChild(character)
            e++
        }
    }
    // show doujinshi pages
    modalImg.src = settings.doujinshi.folder+"/"+title+"/"+doujinshiarray[page];
    if (settings.doujinshi.showfull == 1) {
        var fu = 0
        showfulldoujinshi.innerHTML = ""
        modalImg.style.display="none";
        document.getElementById("forward").style.display="none"
        while (fu < doujinshiarray.length) {
            var imgfull = document.createElement("img");
            imgfull.src = settings.doujinshi.folder+"/"+title+"/"+doujinshiarray[fu];
            imgfull.style = "margin: auto auto "+margindropdown.value+"px;display: block;width: 80%;max-width: "+700/100*zoomindex+"px;"
            imgfull.id = "imageforfull"+[fu]
            showfulldoujinshi.appendChild(imgfull)
            fu++
        }
    }
    
    // scroll img to top
    if (settings.doujinshi.scrolltotop == 1) {
        modalImg.scrollIntoView();
    }
    // upadte page
    document.getElementById("pageview1").innerHTML = page+1
    document.getElementById("pageview2").innerHTML = doujinshiarray.length
}

// zoom % when in modal
var zoompercent = document.getElementById("zoompercent")
zoompercent.innerHTML = zoomindex+"%"
modalImg.style = "margin: auto;display: block;width: 80%;max-width: "+700/100*zoomindex+"px;"

function zoomout() {
    if (zoomindex == 100 || zoomindex == 87.5 || zoomindex == 112.5 || zoomindex == 125 || zoomindex == 62.5 || zoomindex == 75 || zoomindex == 50 || zoomindex == 37.5) {zoomindex-=12.5}
    else if (zoomindex == 25) {zoomindex=25}
    else {zoomindex-=25}
    if (settings.doujinshi.showfull == 1) {
        var ful = 0
        while (ful < doujinshiarray.length) {
            document.getElementById("imageforfull"+ful).style = "margin: auto;display: block;width: 80%;max-width: "+700/100*zoomindex+"px;"
            ful++
        }
    } else {modalImg.style = "margin: auto;display: block;width: 80%;max-width: "+700/100*zoomindex+"px;"}
    zoompercent.innerHTML = zoomindex+"%"
}

function zoomin() {
    if (zoomindex == 100 || zoomindex == 87.5 || zoomindex == 112.5 || zoomindex == 75 || zoomindex == 62.5 || zoomindex == 50 || zoomindex == 37.5 || zoomindex == 25) {zoomindex+=12.5}
    else if (zoomindex == 500) {zoomindex=500}
    else {zoomindex+=25}
    if (settings.doujinshi.showfull == 1) {
        var ful = 0
        while (ful < doujinshiarray.length) {
            document.getElementById("imageforfull"+ful).style = "margin: auto;display: block;width: 80%;max-width: "+700/100*zoomindex+"px;"
            ful++
        }
    } else {modalImg.style = "margin: auto;display: block;width: 80%;max-width: "+700/100*zoomindex+"px";}
    zoompercent.innerHTML = zoomindex+"%"
}

// open folder function because "" and `` and '' mess with onclick=""
function openfolder() {
    require('child_process').exec(`start "" "${settings.doujinshi.folder}/${document.getElementById("modaldoujinshi").alt}"`);
}

// image margin
if (settings.doujinshi.showfull == 1) {
    margindropdown.value = settings.doujinshi.margin
    margindropdown.style.display = "inline-block"
    document.getElementById("margintext").style.display = "inline-block"
}

margindropdown.addEventListener('change', (updateValue) => {
    var mlu = 0
    while (mlu < doujinshiarray.length) {
        document.getElementById("imageforfull"+mlu).style.margin = "auto auto "+margindropdown.value+"px"
        mlu++
    }
});