// Custom debug-screen
var debugStr = null;

function debugAlert(content)
{
	var htmlString = $("#debugdialog").html();
	$("#debugdialog").html(htmlString + content + "<br />");
	$("#debugdialog").dialog("open");
}

function debugAlertClear()
{
	$("#debugdialog").html("");
}

// Checks if Node.js-module is avaible
function NodeAvailable(name)
{
	try
	{
		require.resolve(name);
		return true;
	}
	catch (e)
	{
		debugAlert(e);
	}
	return false;
}

function getAllMethods(object)
{
	console.log(Object.getOwnPropertyNames(object).filter(function(p)
	{
		return typeof object[p] /*=== 'function'*/;
	}));
}