// show or hide search menu
function searchon() {
    document.getElementById("searchtoggle").setAttribute('onclick',`searchoff()`)
    document.getElementById("searchdiv").style.display='block';
}

function searchoff() {
    document.getElementById("searchtoggle").setAttribute('onclick',`searchon()`)
    document.getElementById("searchdiv").style.display='none';
}

// search function
function search() {
	var titlesearch = document.getElementById("titlesearch").value
	var tagsearch = document.getElementById("tagsearch").value
	var charactersearch = document.getElementById("charactersearch").value
	var artistsearch = document.getElementById("artistsearch").value
	var imggroupsearch = document.getElementById("imggroupsearch").value
	var favoritesearch = document.getElementById("favoritesearch").checked
    imagezone.innerHTML = '';
    i = 0;
    modal.style.display = "none";
    filearray = [];
    fs.readdirSync(settings.image.folder).forEach(file => {
        var imgfile = file
        var addimg = 0
        var addimgneed = 0
        var favorite = require('../data/favorite.json');
        if (titlesearch) {var addimgneed = addimgneed+1}
        if (tagsearch) {var addimgneed = addimgneed+1}
        if (charactersearch) {var addimgneed = addimgneed+1}
        if (artistsearch) {var addimgneed = addimgneed+1}
        if (imggroupsearch) {var addimgneed = addimgneed+1}
        if (favoritesearch === "on") {var addimgneed = addimgneed+1}
        try {var fileinfo = img.find( ({ file }) => file === imgfile );}
        catch (e) {console.error(e)}
        finally {
            if (fileinfo && titlesearch && fileinfo.quickname.includes(titlesearch)) {var addimg = addimg+1;} 
            else if (fileinfo && titlesearch && !fileinfo.quickname.includes(titlesearch)){var addimg = addimg-1;}
            else if (!fileinfo && titlesearch && imgfile.includes(titlesearch)) {var addimg = addimg+1;} 
            else if (!fileinfo && titlesearch && !imgfile.includes(titlesearch)){var addimg = addimg-1;}
            if (fileinfo && tagsearch && fileinfo.tag.indexOf(tagsearch) > -1) {var addimg = addimg+1;} 
            else if (fileinfo && tagsearch && fileinfo.tag.indexOf(tagsearch) == -1) {var addimg = addimg-1;}
            else if (!fileinfo && tagsearch) {var addimg = addimg-1;}
            if (fileinfo && charactersearch && fileinfo.character.indexOf(charactersearch) > -1) {var addimg = addimg+1;} 
            else if (fileinfo && charactersearch && fileinfo.character.indexOf(charactersearch) == -1) {var addimg = addimg-1;}
            else if (!fileinfo && charactersearch) {var addimg = addimg-1;}
            if (fileinfo && artistsearch && fileinfo.artist.includes(artistsearch)) {var addimg = addimg+1;} 
            else if (fileinfo && artistsearch && !!fileinfo.artist.includes(artistsearch)) {var addimg = addimg-1;}
            else if (!fileinfo && artistsearch) {var addimg = addimg-1;}
            if (fileinfo && imggroupsearch && fileinfo.character.indexOf(imggroupsearch) > -1) {var addimg = addimg+1;} 
            else if (fileinfo && imggroupsearch && fileinfo.character.indexOf(imggroupsearch) == -1) {var addimg = addimg-1;}
            else if (!fileinfo && imggroupsearch) {var addimg = addimg-1;}
            if (favoritesearch == true && favorite.image.indexOf(imgfile) > -1) {var addimg = addimg+1;}
            else if (favoritesearch == true && favorite.image.indexOf(imgfile) == -1) {var addimg = addimg-1;}
            if (addimg >= addimgneed) {
                filearray.push(file);
            }
        }
    });
    loadimage(settings.image.imgloadfirst);
}