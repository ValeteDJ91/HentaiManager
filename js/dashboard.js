var imgarray = [];
var doujarray = [];
var doujpgarray = [];
var folderarraydoujin = [];
var imgsize = 0
var imgsizeb = 0
var doujsize = 0
var doujsizeb = 0
var i = 0
var p = 0
var a = 0
var q = 0

// set default settings
if (settings.image.folder == 0 || settings.doujinshi.folder == 0) {
    var hmpath = home + "/Documents/HentaiManager";
    var imgpath = home + "/Documents/HentaiManager/image";
    var doujpath = home + "/Documents/HentaiManager/doujinshi";
    settings.image.folder = imgpath
    settings.doujinshi.folder = doujpath
    try {
        fs.mkdirSync(hmpath);
        fs.mkdirSync(imgpath);
        fs.mkdirSync(doujpath);
        console.log("hentaifolder created")
    } catch (e) {
        console.error("settings.image.folder was 0 but the folder was already created");
    }
    var jsonoutput = JSON.stringify(settings, null, '\t');
    fs.writeFile('data/settings.json', jsonoutput, function (err) {
        if (err) throw err;
    })
}

try {
    fs.readdirSync(settings.image.folder).forEach(file => {
        imgarray.push(file);
    });
} catch(e) {console.error("Can't access image folder: "+settings.image.folder)}
try {
    fs.readdirSync(settings.doujinshi.folder).forEach(file => {
        doujarray.push(file);
    });
} catch(e) {console.error("Can't access doujinshi folder: "+settings.doujinshi.folder)}
while (i < doujarray.length) {
    fs.readdirSync(settings.doujinshi.folder+"/"+doujarray[i]).forEach(file => {
        doujpgarray.push(file);
    });
    i++
}

try {
    var jsoninput = fs.readFileSync('data/placeholder.json', 'utf8')
    var tagjson = JSON.parse(jsoninput)
} catch (e) {
    var tagjson = '{"tag": {"doujinshi": [],"image": []},"character": {"doujinshi": [],"image": []},"imggroup": {"image": []}}'
    fs.writeFile('data/placeholder.json', tagjson, function (err) {
        if (err) throw err;
    })
    var favoritejson = '{"image": [],"doujinshi": []}'
    fs.writeFile('data/favorite.json', favoritejson, function (err) {
        if (err) throw err;
    })
    var imagejson = '[]'
    fs.writeFile('data/image.json', imagejson, function (err) {
        if (err) throw err;
    })
    var doujinshijson = '[]'
    fs.writeFile('data/doujinshi.json', doujinshijson, function (err) {
        if (err) throw err;
    })
    location.reload()
}

// set image info
document.getElementById("imagenumber").innerHTML = imgarray.length+" Images"
document.getElementById("imagetagnumber").innerHTML = tagjson.tag.image.length+" Tags"
document.getElementById("imagecharacternumber").innerHTML = tagjson.character.image.length+" Characters"

// set doujinshi info
document.getElementById("doujinshinumber").innerHTML = doujarray.length+" Doujinshis"
document.getElementById("doujinshipagenumber").innerHTML = "• "+doujpgarray.length+" Pages"
document.getElementById("doujinshitagnumber").innerHTML = tagjson.tag.doujinshi.length+" Tags"
document.getElementById("doujinshicharacternumber").innerHTML = tagjson.character.doujinshi.length+" Characters"

// recalcul folder size
if (settings.general.recalcul == 1 || settings.general.imgfoldsize == 0 || settings.general.doujfoldsize == 0) {
    // image
    while (p < imgarray.length) {
        imgsizeb += fs.statSync(settings.image.folder+"/"+imgarray[p]).size
        p++
    }
    imgsize = btoo(imgsizeb)
    document.getElementById("imagesize").innerHTML = imgsize;
    // doujinshi
    while (a < doujarray.length) {
        q = 0
        folderarraydoujin = [];
        fs.readdirSync(settings.doujinshi.folder+"/"+doujarray[a]).forEach(file => {
            folderarraydoujin.push(file);
        });
        while (q < folderarraydoujin.length) {
            doujsizeb += fs.statSync(settings.doujinshi.folder+"/"+doujarray[a]+"/"+folderarraydoujin[q]).size
            q++
        }
        a++
    }
    doujsize = btoo(doujsizeb)
    document.getElementById("doujinshisize").innerHTML = doujsize;


    settings.general.imgfoldsize = imgsize;
    settings.general.doujfoldsize = doujsize;
    var jsonoutput = JSON.stringify(settings, null, '\t');
    fs.writeFile('data/settings.json', jsonoutput, function (err) {
        if (err) throw err;
    })
}
else {document.getElementById("imagesize").innerHTML = settings.general.imgfoldsize;document.getElementById("doujinshisize").innerHTML = settings.general.doujfoldsize}