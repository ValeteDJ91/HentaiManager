const sizeOf = require('image-size');
sizeOf.setConcurrency(100000000)

var filearray = [];
var i = 0;
var max_height = [1, 40, 75, 130, 230, 400, 600];
var max_width = [1, 40, 75, 130, 230, 400, 600];
var favorite = require('../data/favorite.json');
var slider = document.getElementById("sizeslider");
var imgerrordir = settings.image.folder+"/Image_errors";
var showtag = document.getElementById("showtag");
var showcharacter = document.getElementById("showcharacter");
var showimagegroup = document.getElementById("showimagegroup");
var imagezone = document.getElementById("imagezone")
var img = require('../data/image.json')
if (settings.image.imgsize) {sizeslider.setAttribute('value',settings.image.imgsize)}

//find all imgs and create <img> with src
var imagezone = document.getElementById("imagezone");
try {
    fs.readdirSync(settings.image.folder).forEach(file => {
        filearray.push(file);
    });
} catch(e) {console.error("Can't access image folder: "+settings.image.folder)}

if (filearray.length == 0) {
    var nfa = document.createElement("a");
    nfa.style = "color:#ffffff;text-align:center; font-size: 230%;";
    imagezone.appendChild(nfa);
    nfa.innerHTML = "No images found ;(";
}
function loadimage(toload){
    document.getElementById("loadinginfo").style.display= "block"
    var z = 0;
    while (i < filearray.length && z < toload) {
        if (filearray[i].includes(".png")||filearray[i].includes(".jpg")||filearray[i].includes(".jpeg")||filearray[i].includes(".gif")) {
            try{
                var imgsize = sizeOf(settings.image.folder+"/"+filearray[i])
                var img = document.createElement("img");
                img.src = settings.image.folder+"/"+filearray[i];
                imagezone.appendChild(img);
                img.style = `height: ${imgsize.height}px; width: ${imgsize.width}px;vertical-align: middle;`
                img.id = filearray[i]
                img.setAttribute('onclick',`modal.style.display = 'block'; modalImg.src = this.src; modalImg.alt = this.id;viewimage(this.id)`)
                if(img.height > max_height[slider.value] && img.height>img.width || img.height==img.width)
                {
                    ratio = max_height[slider.value] / img.height;
                    new_height = img.height * ratio;
                    new_width = img.width * ratio;
                }
                if(img.width > max_width[slider.value]  && img.width>img.height)
                {
                    ratio = max_width[slider.value] / img.width;
                    new_height = img.height * ratio;
                    new_width = img.width * ratio;
                }
                if(slider.value > 2) { img.style = `height: ${new_height}px; width: ${new_width}px;display: unset;margin-left: 7px;margin-top: 4px;vertical-align: middle;` }
                if(slider.value <= 2) { img.style = `height: ${new_height}px; width: ${new_width}px;display: unset;margin-left: 4px;margin-top: 2px;vertical-align: middle;` }
            } catch(error) {
                console.error(error);
                console.error("Problem loading image: "+settings.image.folder+"/"+filearray[i]);
                if (!fs.existsSync(imgerrordir)){
                    fs.mkdirSync(imgerrordir);
                    console.log("Corrupt/Error image folder successfully created")
                }
                fs.rename(settings.image.folder+"/"+filearray[i], imgerrordir+"/"+filearray[i], (err) => {
                if (err) { console.error(err); };
                });
                console.log('Corrupt/Error image moved successfully');
            }
        }
        i++
        z++
    }
    document.getElementById("loadinginfo").style.display= "none"
}
loadimage(settings.image.imgloadfirst)

// load more image on scroll
document.body.addEventListener('scroll',()=>{
    if (document.body.scrollTop+5000 > document.body.scrollHeight) {
        loadimage(settings.image.imgloadscroll)
    }
})

//slider img size
slider.oninput = function() {
    var j = 0;
    while (j < filearray.length && j < i) {
        var img = document.getElementById("img"+j);
        var imgsize = sizeOf(settings.image.folder+"/"+filearray[j])
        img.style = `height: ${imgsize.height}px; width: ${imgsize.width}px`
        if(img.height > max_height[slider.value] && img.height>img.width || img.height==img.width)
        {
            ratio = max_height[slider.value] / img.height;
            new_height = img.height * ratio;
            new_width = img.width * ratio;
        }
        if(img.width > max_width[slider.value]  && img.width>img.height)
        {
            ratio = max_width[slider.value] / img.width;
            new_height = img.height * ratio;
            new_width = img.width * ratio;
        }
        if(slider.value > 2) { img.style = `height: ${new_height}px; width: ${new_width}px;display: unset;margin-left: 7px;margin-top: 4px;vertical-align: middle;` }
        if(slider.value == 2) { img.style = `height: ${new_height}px; width: ${new_width}px;display: unset;margin-left: 4px;margin-top: 2px;vertical-align: middle;` }
        if(slider.value < 2) { img.style = `height: ${new_height}px; width: ${new_width}px;display: unset;margin-left: 1px;margin-top: 1px;vertical-align: middle;` }
        j++
    }
}

//modal/zoom
var modal = document.getElementById("imgmodal");
var modalImg = document.getElementById("modalimg");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
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
function viewimage(title) {
    var imginfo = 0
    if (favorite.image.indexOf(title) > -1) {
        favoritestar.src = "../img/starfull.png"
        favoritestar.setAttribute('onclick',`removefavorite()`)
    } else {
        favoritestar.src = "../img/star.png"
        favoritestar.setAttribute('onclick',`addfavorite()`)
    }
    document.getElementById("showtag").innerHTML = ""
    document.getElementById("taglist").innerHTML = ""
    document.getElementById("characterlist").innerHTML = ""
    document.getElementById("imggrouplist").innerHTML = ""
    document.getElementById("showcharacter").innerHTML = ""
    document.getElementById("showimagegroup").innerHTML = ""
    document.getElementById('edittitle').style.display='none'
    document.getElementById('editartist').style.display='none'
    img = require('../data/image.json');
    tagjson = require('../data/placeholder.json');
    // add show tag when input
    m = 0
    while (m < tagjson.tag.image.length) {
        var option = document.createElement('option');
        option.innerHTML = tagjson.tag.image[m]
        document.getElementById("taglist").appendChild(option)
        m++
    }
    m = 0
    while (m < tagjson.character.image.length) {
        var option = document.createElement('option');
        option.innerHTML = tagjson.character.image[m]
        document.getElementById("characterlist").appendChild(option)
        m++
    }
    m = 0
    while (m < tagjson.imggroup.image.length) {
        var option = document.createElement('option');
        option.innerHTML = tagjson.imggroup.image[m]
        document.getElementById("characterlist").appendChild(option)
        m++
    }
    // get img info
    imginfo = img.find( ({ file }) => file === title );
    if (!imginfo || imginfo == 0) {
        // push info in json if img has no info
        document.getElementById("imgtitle").innerHTML = "Title: "+title
        document.getElementById('edittitle').value = title
        document.getElementById("imgartist").innerHTML = "Artist: "
        img.push({"file": title,"quickname": title,"character": [],"artist": "","tag": [],"imagegroup": []},)
        var jsonoutput = JSON.stringify(img, null, '\t')
        fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
    } else {
        // show info of img
        document.getElementById("imgtitle").innerHTML = "Title: "+imginfo.quickname
        document.getElementById('edittitle').value = imginfo.quickname
        document.getElementById("imgartist").innerHTML = "Artist: "+imginfo.artist
        document.getElementById('editartist').value = imginfo.artist
        // show all tag
        var j = 0
        while (j < imginfo.tag.length) {
            var tag = document.createElement("a");
            var tagremove = document.createElement("span");
            tagremove.innerHTML = "X"
            tagremove.className = "tagcross"
            tag.id = "tagcross"+j
            tagremove.setAttribute('onclick',`removetag("${title}", "${imginfo.tag[j]}");this.remove();document.getElementById("tagcross${j}").remove();`)
            tag.className = "tagclass"
            tag.innerHTML = imginfo.tag[j]
            tag.appendChild(tagremove)
            showtag.appendChild(tag)
            j++
        }
        // show all character
        var e = 0
        while (e < imginfo.character.length) {
            var character = document.createElement("a");
            var characterremove = document.createElement("span");
            characterremove.innerHTML = "X"
            characterremove.className = "charactercross"
            character.id = "charactercross"+e
            characterremove.setAttribute('onclick',`removecharacter("${title}", "${imginfo.character[e]}");this.remove();document.getElementById("charactercross${e}").remove();`)
            character.className = "tagclass"
            character.innerHTML = imginfo.character[e]
            character.appendChild(characterremove)
            showcharacter.appendChild(character)
            e++
        }
        // show all imggroup
        var t = 0
        while (t < imginfo.imagegroup.length) {
            var imagegroup = document.createElement("a");
            var imagegroupremove = document.createElement("span");
            imagegroupremove.innerHTML = "X"
            imagegroupremove.className = "imagegroupcross"
            imagegroup.id = "imagegroupcross"+t
            imagegroupremove.setAttribute('onclick',`removeimagegroup("${title}", "${imginfo.imagegroup[e]}");this.remove();document.getElementById("charactercross${e}").remove();`)
            imagegroup.className = "tagclass"
            imagegroup.innerHTML = imginfo.imagegroup[e]
            imagegroup.appendChild(imagegroupremove)
            showimagegroup.appendChild(imagegroup)
            t++
        }
    }
}

// delete image
function deleteimg() {
    var imagetodelete = settings.image.folder+"/"+modalImg.alt
    fs.rmdir(imagetodelete, { recursive: true }, () => {
        console.log("Image deleted!");
        document.getElementById(modalImg.alt).remove();
        modal.style.display = "none"
    });
}

// zoom in modal
var zoomindex = settings.image.zoomindex;
if (settings.image.zoomindex > 500) {zoomindex = 500};
if (settings.image.zoomindex < 25) {zoomindex = 25};
var zoompercent = document.getElementById("zoompercent")
zoompercent.innerHTML = zoomindex+"%"
modalImg.style = "margin: auto;display: block;width: 80%;max-width: "+700/100*zoomindex+"px;"

function zoomoutimg() {
    if (zoomindex == 100 || zoomindex == 87.5 || zoomindex == 112.5 || zoomindex == 125 || zoomindex == 62.5 || zoomindex == 75 || zoomindex == 50 || zoomindex == 37.5) {zoomindex-=12.5}
    else if (zoomindex == 25) {zoomindex=25}
    else {zoomindex-=25}
    modalImg.style = "margin: auto;display: block;width: 80%;max-width: "+700/100*zoomindex+"px;"
    zoompercent.innerHTML = zoomindex+"%"
}

function zoominimg() {
    if (zoomindex == 100 || zoomindex == 87.5 || zoomindex == 112.5 || zoomindex == 75 || zoomindex == 62.5 || zoomindex == 50 || zoomindex == 37.5 || zoomindex == 25) {zoomindex+=12.5}
    else if (zoomindex == 500) {zoomindex=500}
    else {zoomindex+=25}
    modalImg.style = "margin: auto;display: block;width: 80%;max-width: "+700/100*zoomindex+"px";
    zoompercent.innerHTML = zoomindex+"%"
}