/*----------------------------------

Texture pack extractor & packer

----------------------------------*/
var objCsInterface = new CSInterface();
// CEP7+ need absolute path, not relative
var strDir = objCsInterface.getSystemPath(SystemPath.EXTENSION);
// Required modules
const objJSZip = require(strDir + "/lib/jszip/");
const objFS = require(strDir + "/lib/fs-extra/");
const strValidFiletypes = /(.png.mcmeta|.png)$/;
var objZip = new objJSZip();
// Unzipper
$(function()
{
	$("#zipfile").change(function(event)
	{
		// Closure to capture the file information.
		function handleFile(objZipData)
		{
			objJSZip.loadAsync(objZipData,
			{
				createFolders: true
			})
			.then(function(objZip)
			{
				var strPromises = Object.keys(objZip.files).filter(function(strFileName)
				{
					debugAlert("NAME: " + strFileName);
					// Only extract files in assets folder
					if (!(/assets/g).test(strFileName))
					{
						return false;
					}
					// don't consider non image files
					return strValidFiletypes.test(strFileName.toLowerCase());
				}).map(function(strFileName)
				{
					var objFile = objZip.files[strFileName];
					return objFile.async("nodebuffer").then(function(blob)
					{
						strDest = strDir + '/' + strFileName;
						objFS.writeFileSync(strDest, blob);
						console.log(JSON.stringify(blob, null, 4));
						debugAlert("BLOB: " + blob + " NAME: " + strFileName + URL.createObjectURL(blob));
						return [
							strFileName, // keep the link between the file name and the content
							URL.createObjectURL(blob) // create an url. img.src = URL.createObjectURL(...) will work
						];
					});
				});
				return Promise.all(strPromises);
			})
			.then(function(result)
			{
				debugAlert("RESULTAT: " + result + typeof(result));
				console.log(JSON.stringify(result, null, 4));
				return result.reduce(function (acc, val) 
				{
					acc[val[0]] = val[1];
					debugAlert("acc[val[0]]: " + acc[val[0]] + typeof(acc[val[0]]));
					debugAlert("val[0]: " + val[0] + typeof(val[0]));
					return acc;
			  	},{});
			})
			.then(function(imgData)
			{
				var strDest = null;
				debugAlert("imgData " + imgData + typeof(imgData));
				console.log(JSON.stringify(imgData, null, 4));
				console.log(imgData);
//				for(var strName in imgData) 
//				{
//					strDest = strDir + '/' + strName;
//					debugAlert("strName: " + strName + " strDest " + strDest);
//					debugAlert("strName " + imgData[strName] + typeof(imgData[strName]));
//					var content = objFS.readFileSync(imgData[strName]);
//					console.log(content);
//					objFS.writeFileSync(strDest, content);
//					console.log(imgData);
//				}
			})
				/*objZip.forEach(function(strRelativePath, objZipEntry)
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
			}*/
		}
		if (event.target.files[0].name.endsWith(".zip"))
		{
			handleFile(event.target.files[0]);
		}
	});
})