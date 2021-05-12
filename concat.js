var fs = require('fs');
var path = require('path');
// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");

var moveFrom = "./lodash-old";

var source_data = ""

    var logger = fs.createWriteStream('./old_output.js', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })


// Loop through all the files in the temp directory
fs.readdir(moveFrom, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach(function (file, index) {
    // Make one pass and make the file complete
    var fromPath = path.join(moveFrom, file);
    

    fs.stat(fromPath, function (error, stat) {
      if (error) {
        console.error("Error stating file.", error);
        return;
      }

      if (stat.isFile()){
        var fileType = file.substr(file.length - 3)
        if(fileType==".js"){
            try {
                const data = fs.readFileSync('./lodash-old/'+file, 'utf8')
                logger.write(data)
              } catch (err) {
                console.error(err)
              }
        }
      }
        
     


    });
  });
});

