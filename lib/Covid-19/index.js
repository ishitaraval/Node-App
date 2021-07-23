var fs = require("fs");
var data = {};

data.detailedData = function (){
    var fileContent = fs.readFileSync(__dirname +"/data.txt", "utf-8");
    var arrayofData = fileContent.split(/\r?\n/);

    return arrayofData;
}



module.exports = data;