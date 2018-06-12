$(document).ready(function () {

    var errors = false;

    //turn off dropZone auto discover
    Dropzone.autoDiscover = false;

    //initially hide the dropZone div for dicom dir
    $('#dropzonDicomDirDiv').hide();

    //dropZone object for dicom images type
    var dropzonImages = new Dropzone("#dropzonImagesDiv", {
        url: window.uploadedFileURL,
        method: 'POST',
        maxFiles: Number.MAX_SAFE_INTEGER,
        acceptedFiles: '.dcm',
        init: function () {
            this.on("complete", function (file) {
                var _this = this;
                _this.removeFile(file);
            });
            this.on("maxfilesexceeded", function (data) {
                this.removeFile(data);
            });
            this.on("addedfile", function (file) {
                var selectedCategory = $('#Categories').text();
                this.options.params = { "selectedCategory": selectedCategory };
            });
        },
        error: function (file, errorMessage) {
            errors = true;
        },
        queuecomplete: function() {
        if (errors) {
            showIziToast("Error", "Please check your connection.","red");
            errors = false;
        } else {
            showIziToast("Done", "Uploaded Files Completed","green");
        }
    }
    });

    //dropZone object for dicom dir type
    var dropzonDicomDir = new Dropzone("#dropzonDicomDirDiv", {
        url: window.uploadedDicomDirURL,
        method: 'POST',
        maxFiles: 20,
        acceptedFiles: '.zip,.rar',
        init: function () {
            this.on("complete", function (file) {
                var _this = this;
                _this.removeFile(file);
            });
            this.on("maxfilesexceeded", function (data) {
                this.removeFile(data);
            });
            this.on("addedfile", function (file) {
                var selectedCategory = $('#Categories').text();
                this.options.params = { "selectedCategory": selectedCategory };
            });
        },
        error: function (file, errorMessage) {
            errors = true;          
        },
        queuecomplete: function () {
            if (errors) {
                showIziToast("Error", "Please check your connection. " ,"red");
                errors = false;
            } else {
                showIziToast("Done", "Uploaded Files Completed","green");
            }
        }
    });

    //event listener for the radio button change
    $('input[type=radio][name=UploadType]').change(function () {
        if (this.value == 'DicomDir') {
            $('#dropzonDicomDirDiv').show();
            $('#dropzonImagesDiv').hide();
        }
        else if (this.value == 'DicomImage') {
            $('#dropzonDicomDirDiv').hide();
            $('#dropzonImagesDiv').show();
        }
    });

    //selector to accquire first value in the drop downlist
    $('#Categories').text($('.dropdown li').children()[0].text);

    //event listener for the dropdown item click
    $('.dropdown li').click(function() {
        $('#Categories').text($(this).children()[0].text);
    });
});

//Izi toast alert function
function showIziToast(alertTitle, alertMessage, alertColor) {

    var iconClass = "";

    if (alertColor === "red") {
        iconClass = "icon-cross";
    } else {
        iconClass = "icon-checkmark";
    }

    iziToast.show({
        class: '',
        title: alertTitle,
        titleColor: '',
        message: alertMessage,
        messageColor: '',
        backgroundColor: '',
        color: alertColor, // blue, red, green, yellow
        icon: iconClass,
        iconText: '',
        iconColor: '',
        image: '',
        imageWidth: 50,
        zindex: 99999,
        layout: 2,
        balloon: false,
        close: true,
        rtl: false,
        position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        target: '',
        targetFirst: true,
        timeout: 5000,
        drag: true,
        pauseOnHover: true,
        resetOnHover: false,
        progressBar: false,
        progressBarColor: '',
        animateInside: true,
        buttons: {},
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        transitionInMobile: 'flipInX',
        transitionOutMobile: 'flipOutX',
        onOpen: function () { },
        onClose: function () { }
    });
}