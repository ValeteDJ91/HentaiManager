const fs = require('fs')
var testregex = /[<>]/i
var home = require("os").homedir();
try {
    var jsoninput = fs.readFileSync('data/settings.json', 'utf8')
    var settings = JSON.parse(jsoninput)
} catch (e) {
    fs.mkdirSync("data");
    settings = {
        "general": {
            "recalcul": 0,
            "imgfoldsize": 0,
            "doujfoldsize": 0
        },
        "image": {
            "folder": 0,
            "imgsize": 3,
            "imgloadfirst": 700,
            "imgloadscroll": 400,
            "zoomindex": 100
        },
        "doujinshi": {
            "folder": 0,
            "zoomindex": 100,
            "doujloadfirst": 80,
            "doujloadscroll": 40,
            "scrolltotop": 0,
            "showfull": 0,
            "margin": 0,
            "closealpage": 0
        },
        "version": "Hentai manager v0.1.2"
    }
    var jsonoutput = JSON.stringify(settings, null, '\t')
    fs.writeFile('data/settings.json', jsonoutput, function (err) {if (err) throw err;});
    console.error("can't find settings.json so one has been created")
}
document.getElementById("title").innerHTML = settings.version