const fs = require('fs')
var jsoninput = fs.readFileSync('data/settings.json', 'utf8')
var settings = JSON.parse(jsoninput)
document.getElementById("title").innerHTML = settings.version