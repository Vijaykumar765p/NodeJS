function b64toBlob(b64Data, contentType, sliceSize) {
	try{
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
	}catch(err){
		navigator.notification.alert("Not a valid URL", null, _CMP_NAME, "OK");
	};
}



function savebase64AsImageFile(saveAs,content,contentType , imageId){
    // Convert the base64 string in a Blob
    var DataBlob = b64toBlob(content,contentType);

   // console.log("Starting to write the file");
    if(DataBlob !== "undefined"){
    window.requestFileSystem( 1, 0 , function(dir) {
		dir.root.getFile(saveAs, { create: true, exclusive: false  }, function(file) {
			  //  console.log("Access to the directory granted succesfully");
            file.createWriter(function(fileWriter) {

                fileWriter.write(DataBlob);
				localStorage.setItem("saveAs" , file.toURL() );
				removeLoader(imageId);
				console.log("Writed content of base65 file " +file.toURL() );
				localStorage.setItem( saveAs, file.toURL() );
            },
                onErrorBlobWrite );
		} ,  onErrorCreateFile  );
    }, onErrorLoadFs );
	}
}



function saveBase64Image(myBaseString , saveAs  , imageId){

		// Split the base64 string in data and contentType
		//var block = myBaseString.split(";");
		// Get the content type
		//var dataType = block[0].split(":")[1];// In this case "image/png"
		// get the real base64 content of the file
		//var realData = block[1].split(",")[1];// In this case Image data

		//var extension = dataType.split("/")[1];//In this case extension "png"

		//var SAVEAS = saveAs + "." + extension;
		var SAVEAS = saveAs + "." + "mp4";
		 savebase64AsImageFile(SAVEAS,realData,dataType , imageId);

}
