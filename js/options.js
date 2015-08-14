document.getElementById("highlightCompareDifferences").checked = (localStorage.highlightCompareDifferences == 1);
//document.getElementById("useGallery").checked = (localStorage.useGallery == 1);

document.getElementById("highlightCompareDifferences").onclick = function (e) { localStorage.highlightCompareDifferences = (this.checked ? 1 : 0); }
//document.getElementById("useGallery").onclick = function (e) { localStorage.useGallery = (this.checked ? 1 : 0); }

