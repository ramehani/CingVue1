var jsonresults = null;
function DisplayResults()
{
 $.ajax({
			beforeSend: function(request) {
			request.setRequestHeader("Accept-Encoding", "gzip, deflate");
			},
			url:'./data/schools_numeracy_list.json',
			dataType:'json',
			type:'POST',
			success: function (json){
				jsonresults = json.schools;
				ShowResults(json.schools);
			}
			});
}

function ShowResults(resultJs)
{
	document.getElementById('appendResults').innerHTML = "";
	var results_data = "";
	$.each(resultJs, function(key, val) {
  	    results_data +="<div style='clear:both'>";
		results_data += "<div class='subhead' style='width:200px !important'>"+resultJs[key].school.schoolName+"</div>";
		results_data += "<div class='subhead'> "+(resultJs[key].latestY3).toFixed(2)+"</div>";
		results_data += "<div class='subhead'>"+(resultJs[key].latestY5).toFixed(2)+"</div>";
		results_data += "<div class='subhead'>"+(resultJs[key].latestY7).toFixed(2)+"</div>";
		results_data += "<div class='subhead'>"+(resultJs[key].latestY9).toFixed(2)+"</div>";
		results_data += "<div class='subhead'>"+(resultJs[key].rawGainY3Y5).toFixed(2)+"</div>";
		results_data += "<div class='subhead'>"+(resultJs[key].factoredGainY3Y5).toFixed(2)+"</div>";		
		results_data += "<div class='subhead'>"+(resultJs[key].glgY3Y5).toFixed(2)+"</div>";
		results_data += "<div class='subhead'>"+(resultJs[key].latestGainInGainY3Y5).toFixed(2)+"</div>";
		results_data +="</div>";
		});
	var newdiv = document.createElement("div");
	newdiv.innerHTML = results_data;
	var container = document.getElementById('appendResults');
	container.appendChild(newdiv);
}

function CallFilters(filtername)
{
	filteredResults=new Array();
	$.each(jsonresults,function(key1,val1){
		if(jsonresults[key1].subject == filtername)
		{
			filteredResults[filteredResults.length] = jsonresults[key1];
		}
	});
	ShowResults(filteredResults);
}
