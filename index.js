

/**
 * SET CANVAS
 **/
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

/**
 * LOAD IMAGE
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
 * https://codepen.io/pen/?&editable=true
 *
 * download image: https://stackoverflow.com/questions/11112321/how-to-save-canvas-as-png-image
 **/
var preview = document.querySelector('.preview');
var input = document.querySelector('input');
input.style.opacity = 0;

/**
 * INPUT ON FILES ARE LOADS
 */
input.addEventListener('change', () => {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  uploadImageToCnanvas(input.files);
});

function uploadImageToCnanvas( currentFiles ) {
  var para = document.createElement('p');
  var list = document.createElement('ol');

  if (currentFiles.length === 0) {
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    preview.appendChild(list);

    for (var i = 0; i < currentFiles.length; i++) {

      var listItem = document.createElement('li');

      if (validFileType(currentFiles[i])) {

        para.textContent = 'File name ' + currentFiles[i].name + ', file size ' + returnFileSize(currentFiles[i].size) + '.';
        var image = document.createElement('img');

        image.onload = function () {
          // draw cropped image
          console.log(`width: ${this.naturalWidth} x height: ${this.naturalHeight}`);
          var newSiza = settingImageSize(this.naturalWidth, this.naturalHeight);
          var sourceX = 0;
          var sourceY = 0;
          var sourceWidth = newSiza.width;
          var sourceHeight = newSiza.height;
          var destWidth = sourceWidth;
          var destHeight = sourceHeight;
          var destX = canvas.width / 2 - destWidth / 2;
          var destY = canvas.height / 2 - destHeight / 2;
          context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
        };

        context.filter = "grayscale(100%)";
        image.src = window.URL.createObjectURL(currentFiles[i]);

        listItem.appendChild(image);
        listItem.appendChild(para);

      } else {
        para.textContent = 'File name ' + currentFiles[i].name + ': Not a valid file type. Update your selection.';
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }

  }
}

var fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif'
];

function settingImageSize ( originalWidth, originalHeight ) {
  var finalWidth  = originalWidth   || 512;
  var finalHeight = originalHeight  || 512;

  return {
    width: finalWidth,
    height: finalHeight
  }
}

function validFileType(file) {
  for (var i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + 'bytes';
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB';
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + 'MB';
  }
}

function download() {
  var download = document.getElementById("download");
  var image = document.getElementById("myCanvas").toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
}
