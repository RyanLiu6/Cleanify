// Bunch of common functions that are used

exports.showBuffer = function(fileText) {
  for (var line in fileText) {
    console.log(fileText[line])
  }
}
