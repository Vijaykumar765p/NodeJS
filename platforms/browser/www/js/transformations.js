'use strict';


function loadtransData() {

	try {
		var http = new XMLHttpRequest();
		http.open("GET", _TR_DETAIL_URL, true);
		//http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
		//http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				//console.log( JSON.parse( http.responseText ).fitness_level );
				//localStorage.setItem( "USER_INFO" ,  http.responseText  );
				transformations = JSON.parse(Base64.decode(http.responseText));

				localStorage.setItem("transformations", JSON.stringify(transformations));
				try {
					len = transformations[0].details.length;
					console.log(transformations[0].details.length);
				} catch (err) {}


			}

			http.onerror = function (error) {
				transformations = JSON.parse(localStorage.getItem("transformations") || "[]");
				try {
					len = transformations[0].details.length;
				} catch (err) {}


			}
		}
		http.send();
	} catch (err) {
		alert(err);
	}
}

loadtransData();