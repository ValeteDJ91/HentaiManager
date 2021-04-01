const { ServerlessApplicationRepository } = require("aws-sdk");

var imgslidervaluetext = ["HOW", "tiny", "small", "normal", "big", "huge", "just click on it at this point"];
var recalcul = document.getElementById("recalcul");
var imgfoldloc = document.getElementById("imgfoldloc");
var imgsizeslider = document.getElementById("imgsizeslider");
var imgloadfirst = document.getElementById("imgloadfirst");
var imgloadscroll = document.getElementById("imgloadscroll");
var doujinshifoldloc = document.getElementById("doujinshifoldloc");
var doujsizeslider = document.getElementById("doujsizeslider");
var doujloadfirst = document.getElementById("doujloadfirst");
var doujloadscroll = document.getElementById("doujloadscroll");
var scrolltop = document.getElementById("scrolltop");
var showfull = document.getElementById("showfull");
var zoomarray = [25, 37.5, 50, 62.5, 75, 87.5, 100, 112.5, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500];
var imgsize = 0
var doujsize = 0
var filet

// ---------------------------GENERAL-----------------------------------

// set if programm recalcul folder size on openning
if (settings.general.recalcul == 1) {recalcul.setAttribute('checked',"")}
recalcul.addEventListener('change', (updateValue) => {
    if (settings.general.recalcul == 1) {settings.general.recalcul = 0}
    else if (settings.general.recalcul == 0) {settings.general.recalcul = 1}
    savesettings()
});

// recalcule folder size
function fullrecalcul() {
    // image
    fs.readdirSync(settings.image.folder).forEach(file => {
        imgsize += fs.statSync(settings.image.folder+"/"+file).size
    });
    imgsize = btoo(imgsize)
    // doujinshi
    fs.readdirSync(settings.doujinshi.folder).forEach(file => {
        filet = file
        fs.readdirSync(settings.doujinshi.folder+"/"+file).forEach(file => {
            doujsize += fs.statSync(settings.doujinshi.folder+"/"+filet+"/"+file).size
        });
    });
    doujsize = btoo(doujsize)
    
    settings.general.imgfoldsize = imgsize;
    settings.general.doujfoldsize = doujsize;
    var jsonoutput = JSON.stringify(settings, null, '\t');
    fs.writeFile('data/settings.json', jsonoutput, function (err) {
        if (err) throw err;
    })
    document.getElementById("recalculfinished").innerHTML = "Full recalcul of folders size finished succesfully! doujinshi: "+doujsize+" image: "+imgsize
}

// reset options to default
var home = require("os").homedir();
var imgpath = home + "/Documents/HentaiManager/image";
var doujpath = home + "/Documents/HentaiManager/doujinshi";

function optionreset() {
    settings.general.recalcul = 0
    settings.general.imgfoldsize = 0
    settings.general.doujfoldsize = 0
    settings.image.folder = imgpath
    settings.image.imgsize = 3
    settings.image.imgloadfirst = 700
    settings.image.imgloadscroll = 500
    settings.doujinshi.folder = doujpath
    settings.doujinshi.zoomindex = 100
    settings.doujinshi.doujloadfirst = 80
    settings.doujinshi.doujloadscroll = 40
    settings.doujinshi.scrolltotop = 0
    settings.doujinshi.showfull = 0
    savesettings()
    location.reload()
}

// reset json to default
function jsonreset() {
    doujinshi = []
    var jsonoutput = JSON.stringify(doujinshi, null, '\t')
    fs.writeFile('data/doujinshi.json', jsonoutput, function (err) {if (err) throw err;});
    image = []
    var jsonoutput = JSON.stringify(image, null, '\t')
    fs.writeFile('data/image.json', jsonoutput, function (err) {if (err) throw err;});
    tag = {"tag":{"doujinshi": [],"image": []},"character":{"doujinshi": [],"image": []},"imggroup":{"image": []}}
    var jsonoutput = JSON.stringify(tag, null, '\t')
    fs.writeFile('data/placeholder.json', jsonoutput, function (err) {if (err) throw err;});
    savesettings()
}

// ---------------------------IMAGE-----------------------------------

// img folder location
if (settings.image.folder) {imgfoldloc.setAttribute('value',settings.image.folder)}
imgfoldloc.addEventListener('change', (updateValue) => {
    settings.image.folder = event.target.value
    savesettings()
});

// default img size
if (settings.image.imgsize) {imgsizeslider.setAttribute('value',settings.image.imgsize)}
document.getElementById("imgslidervaluetext").innerHTML = imgslidervaluetext[imgsizeslider.value]
imgsizeslider.oninput = function() {
    settings.image.imgsize = imgsizeslider.value
    savesettings()
    document.getElementById("imgslidervaluetext").innerHTML = imgslidervaluetext[imgsizeslider.value]
}

// img first load
if (settings.image.imgloadfirst) {imgloadfirst.setAttribute('value',settings.image.imgloadfirst)}
imgloadfirst.addEventListener('change', (updateValue) => {
    settings.image.imgloadfirst = parseInt(event.target.value)
    savesettings()
});

// img load on scrolling
if (settings.image.imgloadscroll) {imgloadscroll.setAttribute('value',settings.image.imgloadscroll)}
imgloadscroll.addEventListener('change', (updateValue) => {
    settings.image.imgloadscroll = parseInt(event.target.value)
    savesettings()
});

// ---------------------------DOUJINSHI-----------------------------------

// doujinshi folder location
if (settings.doujinshi.folder) {doujinshifoldloc.setAttribute('value',settings.doujinshi.folder)}
doujinshifoldloc.addEventListener('change', (updateValue) => {
    settings.doujinshi.folder = event.target.value
    savesettings()
});

// default doujinshimodal size  // 25 37.5 50 62.5 75 87.5 100 112.5 125 150 175 200 225 250 275 300 325 350 375 400 425 450 475 500 
if (settings.doujinshi.zoomindex) {doujsizeslider.setAttribute('value',zoomarray.indexOf(settings.doujinshi.zoomindex))}
document.getElementById("doujslidervaluetext").innerHTML = zoomarray[doujsizeslider.value]+"%"
doujsizeslider.oninput = function() {
    console.log(zoomarray[doujsizeslider.value])
    document.getElementById("doujslidervaluetext").innerHTML = zoomarray[doujsizeslider.value]+"%"
    settings.doujinshi.zoomindex = zoomarray[doujsizeslider.value]
    savesettings()
}

// doujinshi first load
if (settings.doujinshi.doujloadfirst) {doujloadfirst.setAttribute('value',settings.doujinshi.doujloadfirst)}
doujloadfirst.addEventListener('change', (updateValue) => {
    settings.doujinshi.doujloadfirst = parseInt(event.target.value)
    savesettings()
});

// doujinshi load on scrolling
if (settings.doujinshi.doujloadscroll) {doujloadscroll.setAttribute('value',settings.doujinshi.doujloadscroll)}
doujloadscroll.addEventListener('change', (updateValue) => {
    settings.doujinshi.doujloadscroll = parseInt(event.target.value)
    savesettings()
});

// set if the programm will scroll the doujinshi img to top
if (settings.doujinshi.scrolltotop == 1) {scrolltop.setAttribute('checked',"")}
scrolltop.addEventListener('change', (updateValue) => {
    if (settings.doujinshi.scrolltotop == 1) {settings.doujinshi.scrolltotop = 0}
    else if (settings.doujinshi.scrolltotop == 0) {settings.doujinshi.scrolltotop = 1}
    savesettings()
});

// set if the programm will scroll the doujinshi img to top
if (settings.doujinshi.showfull == 1) {showfull.setAttribute('checked',"")}
showfull.addEventListener('change', (updateValue) => {
    if (settings.doujinshi.showfull == 1) {settings.doujinshi.showfull = 0}
    else if (settings.doujinshi.showfull == 0) {settings.doujinshi.showfull = 1}
    savesettings()
});

// ------------------------------ save changes ------------------------------
function savesettings(){
    var jsonoutput = JSON.stringify(settings, null, '\t')
    fs.writeFile('data/settings.json', jsonoutput, function (err) {
        if (err) throw err;
    });
    document.getElementById("saved").style.color = "#199c0d"
    document.getElementById("saved").innerHTML = "Settings saved!"
    setTimeout(() => {  document.getElementById("saved").innerHTML = ""; }, 2000);
}
