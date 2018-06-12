// imports
var express = require('express');
var dirMulter = require('multer');
var imagesMulter = require('multer');
var fs = require('fs-extra');
var path = require('path');

// private method for GUID generating
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

// router object
var router = express.Router();

// dicom dir server storage path
var dicomDirStorage = dirMulter.diskStorage({
  destination: function (req, file, cb) {
    var SaveDirectoryPath = JSON.parse(fs.readFileSync('public/config.json', 'utf8')).SaveDirectoryPath;
    var dir = SaveDirectoryPath + '/DicomDir/' + req.body.selectedCategory + '-' + req.params.ssid + '/';
    fs.ensureDirSync(dir);
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    var extension = path.extname(file.originalname);
    cb(null, guid() + extension)
  }
})

// dicom image server storage path
var dicomImagesStorage = imagesMulter.diskStorage({
  destination: function (req, file, cb) {
    var SaveDirectoryPath = JSON.parse(fs.readFileSync('public/config.json', 'utf8')).SaveDirectoryPath;
    var dir = SaveDirectoryPath + '/DicomImages/' + req.body.selectedCategory + '-' + req.params.ssid + '/';
    fs.ensureDirSync(dir);
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    var extension = path.extname(file.originalname);
    cb(null, guid() + extension)
  }
})

// dicom dir multer object
var dicomDirUpload = dirMulter({ storage: dicomDirStorage });

// dicom image multer object
var dicomImagesUpload = imagesMulter({ storage: dicomImagesStorage });


/* Actions & Routes */

/* GET home page. */
router.get('/:ssid', function (req, res, next) {
  res.render('index',
    {
      title: 'NabdaNet Uploader',
      item: JSON.parse(fs.readFileSync('public/config.json', 'utf8')).Categories,
      currentYear: new Date().getFullYear(),
      ssid: req.params.ssid,
    });
});

/* POST upload dicom file action. */
router.post('/SaveUploadedFile/:ssid', dicomImagesUpload.single('file'), function (req, res, next) {
  var _ssid = req.params.ssid;
  var isSavedSuccessfully = true;
  var fName = "";
  //console.log(req.body);
  return res.status(200).send(req.file);
});

/* POST upload dicom dir action. */
router.post('/SaveUploadedDicomDir/:ssid', dicomDirUpload.single('file'), function (req, res, next) {
  var _ssid = req.params.ssid;
  var isSavedSuccessfully = true;
  var fName = "";
  //console.log(req.body);
  return res.status(200).send(req.file);



  // try {
  //   foreach(string fileName in Request.Files)
  //   {
  //     HttpPostedFileBase file = Request.Files[fileName];
  //     //Save file content goes here
  //     fName = file.FileName;
  //     if (file != null && file.ContentLength > 0) {

  //       var originalDirectory =
  //         new DirectoryInfo(string.Format("C:\\DicomImages\{1}-{2}",
  //           req.params["selectedCategory"],
  //           _ssid));

  //       var fileInfo = new FileInfo(Path.GetFileName(file.FileName));
  //       var extension = fileInfo.Extension;

  //       if (!Directory.Exists(originalDirectory.FullName))
  //         Directory.CreateDirectory(originalDirectory.FullName);

  //       var path = string.Format("{0}\\{1}{2}", originalDirectory.FullName, Guid.NewGuid().ToString("N"), extension);
  //       file.SaveAs(path);

  //     }

  //   }

  // }
  // catch (Exception ex) {
  //   isSavedSuccessfully = false;
  // }


  // if (isSavedSuccessfully) {
  //   return Json(new { Message = fName });
  // }
  // else {
  //   return Json(new { Message = "Error in saving file" });
  // }
});

module.exports = router;
