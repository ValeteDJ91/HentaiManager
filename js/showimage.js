const sizeOf = require('image-size');
sizeOf.setConcurrency(100000000)

var filearray = [];
var i = 0;
var j = 0;
var e = 0;
var t = 0;
var max_height = [1, 40, 75, 130, 230, 400, 600];
var max_width = [1, 40, 75, 130, 230, 400, 600];
var new_width;
var new_height;
var slider = document.getElementById("sizeslider");
var imgerrordir = settings.image.folder+"/Image_errors";
var imgtoload = settings.image.imgloadfirst
var imgtoloadscroll = settings.image.imgloadscroll
var imginfo
var tagcross = document.getElementsByClassName('tagcross');
var charactercross = document.getElementsByClassName('charactercross');
var imagegroupcross = document.getElementsByClassName('imagegroupcross');
var img = require('../data/image.json')
if (settings.image.imgsize) {sizeslider.setAttribute('value',settings.image.imgsize)}


//find all imgs and create <img> with src
fs.readdirSync(settings.image.folder).forEach(file => {
    filearray.push(file);
});
var imagezone = document.getElementById("imagezone");
if (filearray.length == 0) {var nfa = document.createElement("a");nfa.style = "color:#ffffff;text-align:center; font-size: 230%;";imagezone.appendChild(nfa);nfa.innerHTML = "No images found ;(";}
function loadimage(toload){
    var z = 0;
    while (i < filearray.length && z < toload) {
        if (filearray[i].includes(".png")||filearray[i].includes(".jpg")||filearray[i].includes(".jpeg")||filearray[i].includes(".gif")) {
            try{
                var imgsize = sizeOf(settings.image.folder+"/"+filearray[i])
                var img = document.createElement("img");
                img.src = settings.image.folder+"/"+filearray[i];
                imagezone.appendChild(img);
                img.id = "img"+i
                img.style = `height: ${imgsize.height}px; width: ${imgsize.width}px;vertical-align: middle;`
                img.alt = `${filearray[i]}`
                img.setAttribute('onclick',`modal.style.display = 'block'; modalImg.src = this.src; modalImg.alt = this.alt;viewimage(this.alt)`)
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
}
loadimage(imgtoload)

// load more image on scroll
document.body.addEventListener('scroll',()=>{
    if (document.body.scrollTop+5000 > document.body.scrollHeight) {
        loadimage(imgtoloadscroll)
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

// enter modal
function viewimage(title) {
    imginfo = 0
    document.getElementById("showtag").innerHTML = ""
    document.getElementById("showcharacter").innerHTML = ""
    document.getElementById("showimagegroup").innerHTML = ""
    document.getElementById('edittitle').style.display='none'
    document.getElementById('editartist').style.display='none'
    edittagoff()
    editcharacteroff()
    editimagegroupoff()
    img = require('../data/image.json');
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
        j = 0
        while (j < imginfo.tag.length) {
            var showtag = document.getElementById("showtag");
            var tag = document.createElement("a");
            var tagremove = document.createElement("span");
            tagremove.innerHTML = "X"
            tagremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: none;cursor: pointer;"
            tagremove.className = "tagcross"
            tag.id = "tagcross"+j
            tagremove.setAttribute('onclick',`removetag("${title}", "${imginfo.tag[j]}");this.remove();document.getElementById("tagcross${j}").remove();`)
            tag.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            tag.innerHTML = imginfo.tag[j]
            tag.appendChild(tagremove)
            showtag.appendChild(tag)
            j++
        }
        // show all character
        e = 0
        while (e < imginfo.character.length) {
            var showcharacter = document.getElementById("showcharacter");
            var character = document.createElement("a");
            var characterremove = document.createElement("span");
            characterremove.innerHTML = "X"
            characterremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: none;cursor: pointer;"
            characterremove.className = "charactercross"
            character.id = "charactercross"+e
            characterremove.setAttribute('onclick',`removecharacter("${title}", "${imginfo.character[e]}");this.remove();document.getElementById("charactercross${e}").remove();`)
            character.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            character.innerHTML = imginfo.character[e]
            character.appendChild(characterremove)
            showcharacter.appendChild(character)
            e++
        }
        // show all imggroup
        t = 0
        while (t < imginfo.imagegroup.length) {
            var showimagegroup = document.getElementById("showimagegroup");
            var imagegroup = document.createElement("a");
            var imagegroupremove = document.createElement("span");
            imagegroupremove.innerHTML = "X"
            imagegroupremove.style = "color:#ffffff;vertical-align: middle;font-size: 13px;margin-right: 6px;margin-left: 6px;font-weight: bold;display: none;cursor: pointer;"
            imagegroupremove.className = "imagegroupcross"
            imagegroup.id = "imagegroupcross"+t
            imagegroupremove.setAttribute('onclick',`removeimagegroup("${title}", "${imginfo.imagegroup[e]}");this.remove();document.getElementById("charactercross${e}").remove();`)
            imagegroup.style = "color:#e0e0e0;background-color:#000000;border-radius: 5px;margin-right: 6px"
            imagegroup.innerHTML = imginfo.imagegroup[e]
            imagegroup.appendChild(imagegroupremove)
            showimagegroup.appendChild(imagegroup)
            t++
        }
    }
}