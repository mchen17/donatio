function preview(e){
	e.childNodes[1].childNodes[5].style.opacity = '0.2'
	e.childNodes[1].childNodes[3].style.display = 'none'
	e.childNodes[1].childNodes[1].style.opacity = '1'
	e.childNodes[1].childNodes[1].style.visibility = 'visible'
}

function close_preview(e){
	e.childNodes[1].childNodes[5].style.opacity = '1'
	e.childNodes[1].childNodes[3].style.display = 'block'
	e.childNodes[1].childNodes[1].style.opacity = '0'
	e.childNodes[1].childNodes[1].style.visibility = 'visible'
}

$(document).ready(function(event) {
    $('#searchBar').keyup(function(event) {
        if (event.keyCode == 13) {
            search=document.getElementById('searchBar').value.toLowerCase()
            var sessionObject = getSessionObject();
			sessionObject["searchStrings"] = [search];
			setSessionObject(sessionObject);
			window.location.href = "./search.html";
            return;
         }
    });
});

function query_search(){
	search=document.getElementById('searchBar').value.toLowerCase()

	var sessionObject = getSessionObject();
	sessionObject["searchStrings"] = [search];
	setSessionObject(sessionObject);
	window.location.href = "./search.html";

}

function searchFromDiscover(element) {
	var searchCause = $(element).find(".cause-subcategory").html();
	var searchCategory = $(element).closest(":has(h2)").find("h2").html();
	var sessionObject = getSessionObject();
	sessionObject["searchFilters"]["cause"] = [searchCause];
	sessionObject["searchFilters"]["category"] = [searchCategory];
	sessionObject["searchStrings"] = [""];
	setSessionObject(sessionObject);
}

function searchAllFromDiscover(element) {
	var searchCategory = $(element).closest(":has(h2)").find("h2").html();
	console.log(searchCategory)
	var sessionObject = getSessionObject();
	sessionObject["searchFilters"]["category"] = [searchCategory];
	sessionObject["searchStrings"] = [""];
	setSessionObject(sessionObject);
	window.location.href = "./search.html";
}