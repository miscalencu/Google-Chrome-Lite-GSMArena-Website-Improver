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
					return ((var1[i] > var2[i])? 1 : 2);
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

var specsTable =  document.getElementById("specs-list");
var specsRows = specsTable.getElementsByTagName("tr");
var compare = 0;

for (var ii = 0; ii < specsRows.length; ii++) {
	var specCells = specsRows[ii].getElementsByTagName("td");
	if(specCells.length == 3)
	{
		var spec1 = fixvars(trim(specCells[1].innerHTML, "").replace(/\s+/g, ""));
		var spec2 = fixvars(trim(specCells[2].innerHTML, "").replace(/\s+/g, ""));

		if(spec1 != spec2)
		{
			specCells[1].className += " gsmarena_improve_highlight";
			specCells[2].className += " gsmarena_improve_highlight";

			//if(spec1 > spec2)
			//	specCells[1].className += " gsmarena_improve_bold";

			//if(spec2 > spec1)
			//	specCells[2].className += " gsmarena_improve_bold";

			compare = compareAsNumbers(spec1, spec2);
			if(compare == 1)
				specCells[1].className += " gsmarena_improve_bold";

			if(compare == 2)
				specCells[2].className += " gsmarena_improve_bold";

			//specCells[1].innerHTML = spec1;
			//specCells[2].innerHTML = spec2;
		}
	}
}