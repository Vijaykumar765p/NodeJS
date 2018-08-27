"use strict";

function loadPropertiesData() {
	try {
		var http = new XMLHttpRequest();
		http.open("GET", _VD_LOCK_DETAIL_URL, true);
		//http.setRequestHeader("Authorization", "Basic Zml0bW9zaGE6V2Vya0l0R2lybDA4MTAh");
		//http.setRequestHeader("Content-type", "application/json");
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status == 200) {
				//console.log( JSON.parse( http.responseText ).fitness_level );
				VIDEO_CONFIG = JSON.parse(Base64.decode(http.responseText));
				localStorage.setItem("properties", JSON.stringify(VIDEO_CONFIG));
			}
			http.onerror = function (error) {
				VIDEO_CONFIG = JSON.parse(localStorage.getItem("properties") || "[]");
			}
		}
		http.send();
	} catch (err) {
		alert(err);
	}
}

loadPropertiesData();