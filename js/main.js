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

function fixvars(spec)
{
	spec = spec.toLowerCase();
	spec = spec.replace("no", "1");
	spec = spec.replace("yes", "2");
	spec = spec.replace(".", " ");
	spec = spec.replace("=", " ");
	spec = spec.replace("-", " ");
	spec = spec.replace(",", " ");
	return spec;
}

var specsTable =  document.getElementById("specs-list");
var specsRows = specsTable.getElementsByTagName("tr");

for (var i = 0; i < specsRows.length; i++) {
	var specCells = specsRows[i].getElementsByTagName("td");
	if(specCells.length == 3)
	{
		var spec1 = fixvars(trim(specCells[1].innerHTML, "").replace(/\s+/g, ""));
		var spec2 = fixvars(trim(specCells[2].innerHTML, "").replace(/\s+/g, ""));

		if(spec1 != spec2)
		{
			specCells[1].className += " gsmarena_improve_highlight";
			specCells[2].className += " gsmarena_improve_highlight";

			if(spec1 > spec2)
				specCells[1].className += " gsmarena_improve_bold";

			if(spec2 > spec1)
				specCells[2].className += " gsmarena_improve_bold";

			//specCells[1].innerHTML = spec1;
			//specCells[2].innerHTML = spec2;
		}
	}
}