window.onload = function() {
  var imageForm = document.getElementById('imageUpload');
  var imageSource = document.getElementById("imageSource");
  var canvasOutput= document.getElementById("canvasOutput"); //canvas
  var downloadButton = document.getElementById('imageDownload');
  var refreshButton = document.getElementById('refresh');


  imageSource.onload = processCanvas; //wait until file upload is completed

  imageForm.addEventListener('change',  function (input) {
    if (input.srcElement.files && input.srcElement.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        imageSource.setAttribute('src', e.target.result);
      };

      reader.readAsDataURL(input.srcElement.files[0]);
    }
  });

  downloadButton.addEventListener('click', function (e) {
    exportCanvasAsPNG(canvasOutput, "meme_" + Date.now() + ".png");
  });

  refreshButton.addEventListener('click', processCanvas);
};

function processCanvas() {
  canvasOutput.width = imageSource.width;
  canvasOutput.height = imageSource.height;
  canvasOutput.getContext("2d").drawImage(imageSource,0,10);
}

function exportCanvasAsPNG(canvasElement, fileName) {
  var MIME_TYPE = "image/png";
  var imgURL = canvasElement.toDataURL(MIME_TYPE);
  var dlLink = document.createElement('a');

  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}
