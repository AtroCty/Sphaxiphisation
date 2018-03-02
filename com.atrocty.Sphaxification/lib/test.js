var csInterface = new CSInterface();

// CEP7+ need absolute path, not relative
var dir = csInterface.getSystemPath(SystemPath.EXTENSION);
var JSZip = require(dir + "/lib/jszip/dist/jszip.js");
var zip = new JSZip();

function moduleAvailable(name) 
{
	try 
	{
		require.resolve(name);
		return true;
	} 
	catch(e)
	{
		debugAlert(e);
	}
	return false;
}

$(function()
{
	$("#zipfile").change(function(evt) 
	{
		debugAlert("PENIS");
		debugAlert(this);
		// remove content
		$("#result").html("");
		// be sure to show the results
		$("#result_block").removeClass("hidden").addClass("show");

		// Closure to capture the file information.
		function handleFile(f) 
		{
			var title = $("<h4>", 
			{
				text : f.name
			});
			var fileContent = $("<ul>");
			$("#result").append(title);
			$("#result").append(fileContent);

			var dateBefore = new Date();
			JSZip.loadAsync(f).then(
			function(zip)
			{
				var dateAfter = new Date();
				title.append($("<span>", 
				{
					"class": "small",
					text:" (loaded in " + (dateAfter - dateBefore) + "ms)"
				}));

				zip.forEach(function (relativePath, zipEntry)
				{	// 2) print entries
					debugAlert(zipEntry.name);
				});
			}, function (e) 
			{
				$("#result").append($("<div>", 
				{
					"class" : "alert alert-danger",
					text : "Error reading " + f.name + ": " + e.message
				}));
			});
		}

		var files = evt.target.files;
		for (var i = 0; i < files.length; i++) 
		{
			handleFile(files[i]);
		}
	});
});