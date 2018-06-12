<h1>Node Dicom Image Uploader</h1>

This application is an uploading & archiving portal for medical images (dicom images and dicom dir files). It is using dropzone component and built against node.js with handlebars engine as front end parser.

To start using the application follow these steps:
1- npm install
2-set DEBUG=NabdaNetImageUploader.WebPortal:* & set NODE_ENV=development & npm run build & npm start

To use the application you should navigate to "http://localhost:{PORT}/{SSID}", in this case SSID is an id that identifies each study for each patient.