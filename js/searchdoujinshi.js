// show search menu or not
function searchon() {
    document.getElementById("searchtoggle").setAttribute('onclick',`searchoff()`)
    document.getElementById("searchdiv").style.display='block';
}

function searchoff() {
    document.getElementById("searchtoggle").setAttribute('onclick',`searchon()`)
    document.getElementById("searchdiv").style.display='none';
}

var doujarray = [];
var doujpgarraynow = [];
var doujpgarraylonger = [];
var doujpgarrayshorter = [];
var t = 0;
var inputLeft = document.getElementById("input-left");
var inputRight = document.getElementById("input-right");
var minpage = document.getElementById("minpage");
var maxpage = document.getElementById("maxpage");

var thumbLeft = document.querySelector(".slider > .thumb.left");
var thumbRight = document.querySelector(".slider > .thumb.right");
var range = document.querySelector(".slider > .range");

// set max and min sliders
try {
	fs.readdirSync(settings.doujinshi.folder).forEach(file => {
	    doujarray.push(file);
	});
} catch(e) {console.error("Can't access doujinshi folder: "+settings.doujinshi.folder)}
while (t < doujarray.length) {
    fs.readdirSync(settings.doujinshi.folder+"/"+doujarray[t]).forEach(file => {
        doujpgarraynow.push(file);
    });
    if (doujpgarraynow.length > doujpgarraylonger.length) {doujpgarraylonger = doujpgarraynow;}
	if (!doujpgarrayshorter.length) {doujpgarrayshorter = doujpgarraynow;}
    if (doujpgarraynow.length < doujpgarrayshorter.length) {doujpgarrayshorter = doujpgarraynow;}
    doujpgarraynow = [];
    t++
}
if (doujpgarraylonger.length) {
	inputRight.max = doujpgarraylonger.length
	inputLeft.max = doujpgarraylonger.length
	inputRight.value = doujpgarraylonger.length
} else {
	inputRight.max = 100
	inputLeft.max = 100
	inputRight.value = 100
}
if (doujpgarrayshorter.length) {
	inputRight.min = doujpgarrayshorter.length
	inputLeft.min = doujpgarrayshorter.length
	inputLeft.value = doujpgarrayshorter.length
} else {
	inputRight.min = 0
	inputLeft.min = 0
	inputLeft.value = 0
}

// sliders set up
function setLeftValue() {
	var _this = inputLeft,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbLeft.style.left = percent + "%";
	range.style.left = percent + "%";
	minpage.innerHTML= _this.value
}
setLeftValue();

function setRightValue() {
	var _this = inputRight,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

	_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

	var percent = ((_this.value - min) / (max - min)) * 100;

	thumbRight.style.right = (100 - percent) + "%";
	range.style.right = (95 - percent) + "%";
	maxpage.innerHTML= _this.value
}
setRightValue();

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);
