var objCsInterface 		= new CSInterface();
// CEP7+ need absolute path, not relative
var strDir 				= objCsInterface.getSystemPath(SystemPath.EXTENSION);
const objJSZip 			= require(strDir + "/lib/jszip/");
const objFS 			= require(strDir + "/lib/fs-extra/");
const strValidFiletypes = [".png",".png.mcmeta"];
var objZip 				= new objJSZip();

$(function()
{
	$("#zipfile").change(function(event)
	{
		// Closure to capture the file information.
		function handleFile(objFile)
		{
			objJSZip.loadAsync(objFile, {createFolders: true})
			.then
			(
				function(objZip)
				{
					objZip.forEach(function(strRelativePath, objZipEntry)
					{
						objZipEntry.async('nodebuffer').then(
							function(content) 
							{
								debugAlert(content);
								var strDest = strDir + '/' + objZipEntry.name;
								objFS.writeFileSync(strDest, content);
							});
						debugAlert(objZipEntry.name);
					});
				},
				function(error)
				{
					debugAlert("Error reading " + objFile.name + ": " + error.message);
				}
			);
		}
		debugAlert(event.target.files[0].name);
		if (boolCorrectFiletype(event.target.files[0].name))
		{
			handleFile(event.target.files[0]);	
		}
	});
})

function boolCorrectFiletype(strPath)
{
	debugAlert(typeof(strPath));
	for (var i = 0; i < strValidFiletypes.length; i++)
	{
//		if strPath.endsWith(strValidFiletypes[i])
//		{
//			return true;
//		}
	}
	return false;
}