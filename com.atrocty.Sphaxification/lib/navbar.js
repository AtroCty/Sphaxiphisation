// Loop through the buttons and add the active class to the current/clicked button
function clickButton(buttonID)
{
	var btns = document.getElementById("buttons").getElementsByTagName("a");
	
	
	if (btns[buttonID].className !== "active") 
	{
		// Clear all buttons
		for (var i = 0; i < btns.length; i++)
		{
			btns[i].className = "";
		}
		
		btns[buttonID].className = "active";
	}
	
	if (buttonID === 3)
	{
		if (typeof(cep_node) !== 'undefined')
		{
			//if require and process is available, it should be mixed context
			if ((typeof(require) !== 'undefined') && (typeof(process) !== 'undefined')) 
			{
				$("#result2").val("Node.js is enabled with mixed-context mode");
			}
			else
			{
			 	$("#result2").val("Node.js is enabled");
			}
		}
		else 
		{
			$("#result2").val("Node.js is disabled");
		}
	}
	
	if (buttonID === 2)
	{
		ziptester();
	}
}