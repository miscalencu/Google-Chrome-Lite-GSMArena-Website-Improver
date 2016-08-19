function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function IsNumeric(sText)
	{
	var ValidChars = "0123456789.";
    var IsNumber=true;
    var Char;
    for (i = 0; i < sText.length && IsNumber == true; i++) 
		{ 
		Char = sText.charAt(i); 
		if (ValidChars.indexOf(Char) == -1) 
			{
			IsNumber = false;
			}
		}
	return IsNumber;   
   }

function fixvars(spec)
{
	spec = spec.toLowerCase();

	spec = spec.replace("no", "1");
	spec = spec.replace("yes", "2");

	spec = spec.replace("=", "");
	spec = spec.replace("-", "");
	spec = spec.replace(",", "");
	spec = spec.replace(";", "");
	return spec;
}

/// returns 1, 2 or zero (if equals)
function compareAsNumbers(var1, var2)
{
	var len1 = var1.length;
	var len2 = var2.length;
	var min = ((len1 < len2) ? len1 : len2);
	var prevnumeric = 0;

	for(var i = 0; i < min; i++)
	{
		if(var1[i] != var2[i])
		{
			if(IsNumeric(var1[i]) && IsNumeric(var2[i]))
			{
				if(var1[i] != var2[i])
				{
					return ((var1[i] > var2[i]) ? 1 : ((var1[i] < var2[i]) ? 2 : 0));
				}
				prevnumeric = 1;
			}
			else
			{
				if(IsNumeric(var1[i]))
				{
					return 1;
				}

				if(IsNumeric(var2[i]))
				{
					return 2;
				}

				if(prevnumeric == 1)
				{
					if(var1[i] == " ")
					{
						return 2;
					}

					if(var2[i] == " ")
					{
						return 1;
					}					
				}

				return 0;
			}
		}
	}
	return 0;
}

function highlightDifferences() {
	var specsTable = document.getElementById("specs-list");

	if(!specsTable)
		return;

	var specsRows = specsTable.getElementsByTagName("tr");
	var compare12 = 0, compare23 = 0, compare13 = 0;
	var score1 = 0, score2 = 0, score3 = 0;

	for (var ii = 0; ii < specsRows.length; ii++) {
		var specCells = specsRows[ii].getElementsByTagName("td");
		if (specCells.length == 4 || specCells.length == 5)
		{
			var pos1 = specCells.length - 3
			var pos2 = specCells.length - 2;
			var pos3 = specCells.length - 1;

			var spec1 = fixvars(trim(specCells[pos1].innerText, "").replace(/\s+/g, ""));
			var spec2 = fixvars(trim(specCells[pos2].innerText, "").replace(/\s+/g, ""));
			var spec3 = fixvars(trim(specCells[pos3].innerText, "").replace(/\s+/g, ""));

			if (spec2 == "" && spec3 == "") {
				continue;
			}

			if (spec1 != spec2 || (spec1 != spec3 && spec3 != "") || (spec2 != spec3 && spec3 != ""))
			{
				specCells[pos1].className += " gsmarena_improve_highlight";
				specCells[pos2].className += " gsmarena_improve_highlight";

				if (spec3 != "") {
					specCells[pos3].className += " gsmarena_improve_highlight";
				}

				// debugger;
				// add 5 points for each winning position
				// make them all red when no gray is required (there are two on the same position)
				compare12 = compareAsNumbers(spec1, spec2);
				if (spec3 == "") {
					score1 = (compare12 == 1) ? 10 : 5;
					score2 = (compare12 == 2) ? 10 : 5;
				}
				else {
					compare23 = compareAsNumbers(spec2, spec3);
					compare13 = compareAsNumbers(spec1, spec3);

					score1 = (((compare12 == 1) ? 1 : 0) + ((compare13 == 1) ? 1 : 0)) * 5;
					score2 = (((compare12 == 2) ? 1 : 0) + ((compare23 == 1) ? 1 : 0)) * 5;
					score3 = (((compare13 == 2) ? 1 : 0) + ((compare23 == 2) ? 1 : 0)) * 5;

					// when they are all equal
					if (compare12 == 0 && compare13 == 0 && compare23 == 0) {
						score1 = 5;
						score2 = 5;
						score3 = 5;
					}
				}

				specCells[pos1].className += " gsmarena_improve_highlight" + score1;
				specCells[pos2].className += " gsmarena_improve_highlight" + score2;

				if (spec3 != "") {
					specCells[pos3].className += " gsmarena_improve_highlight" + score3;
				}

				//specCells[pos1].innerHTML = spec1;
				//specCells[pos2].innerHTML = spec2;
				//specCells[pos3].innerHTML = spec3;
			}
		}
	}
}

function addGallery() {
	return; // disabled;
	var galleryContainer =  document.getElementById("gallery");
	if(!galleryContainer)
		return;

	var galleryLinks = galleryContainer.getElementsByTagName("a");
	for (var ii = 0; ii < galleryLinks.length; ii++) {
		if(galleryLinks[ii].getElementsByTagName("img").length > 0)	{
			var innerImg = galleryLinks[ii].getElementsByTagName("img")[0];

			galleryLinks[ii].title = innerImg.alt;
			galleryLinks[ii].rel = "lightbox[album]";
			galleryLinks[ii].removeAttribute("onclick");
			//galleryLinks[ii].removeAttribute("href");
			galleryLinks[ii].href = innerImg.src.replace("/thumb/", "/");
			}
		}

	//initLightbox();
}
	
var highlightCompareDifferences;
var useGallery;

chrome.extension.sendRequest({method: "get_highlightCompareDifferences"}, function(response) {
  highlightCompareDifferences = response.status;
  if(highlightCompareDifferences == 1)
	highlightDifferences();
});

chrome.extension.sendRequest({method: "get_useGallery"}, function(response) {
  useGallery = response.status;
  if(useGallery == 1)
	addGallery();
});