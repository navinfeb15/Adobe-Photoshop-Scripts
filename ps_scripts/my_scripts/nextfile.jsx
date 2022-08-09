var og, ind;
ofile_array = new Array();
cfile_array = new Array();

function openNextNumericalFile() {
  try {
    fol = Folder(activeDocument.path.toString()); /* initiates obj */
    file_list = fol.getFiles(); /* gets files as an obj */

    files = Folder(activeDocument.path.toString()).getFiles();
    file_array = files.toString().split(",");
    if (/order_details.csv$/.test(file_array.slice(-1)) == true) {
      file_array.pop();
    }

    // Creates _c file array
    for (var i = 0; i < file_array.length; i++) {
      var file_name = file_array[i].toString();
      if (/\/\d+\.[jpeg|png]+$/.test(file_name) == true) {
        ofile_array.push(file_name);
      }
    }

    // Create the original file array
    for (var i = 0; i < file_array.length; i++) {
      var file_name = file_array[i].toString();

      if (/\/\d+_c\.[jpeg|png]+$/.test(file_name) == true) {
        cfile_array.push(file_name);
      }
    }

    // Finding next document
    og = activeDocument.name;
    // Find next Original file
    for (var step = 0; step < ofile_array.length; step++) {
      if (ofile_array[step].toString().split("/").slice(-1) == og) {
        ind = step;
        break;
      }
    }

    // Next file Index
    var fileRef = new File(ofile_array[ind + 1]);

    /* Loop and find if any files are unsaved...*/
    for (var i = 0; i < documents.length; i++) {
      if (/\d+\.\w{3,4}\w?PR$/.test(documents[i].name) == true) {
        if (documents[i].saved == false) {
          alert("please save the file : " + documents[i]);
        }
      } else {
        documents[i].close(SaveOptions.DONOTSAVECHANGES);
      }
    }

    // Open next file
    app.open(fileRef);
  } catch (e) {
    alert(e);
  }
}
openNextNumericalFile();

// TO DO
// save file to complted folder
// resize/rotate file when saving
