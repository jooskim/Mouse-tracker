/*
MouseTracker Module
Joosung Kim (jooskim@umich.edu)

11-19-2012
*/

var arr = [];
var interval = 500; 	// how often the coordinates should be recorded (milliseconds)
var regexp_fname = /[/]/;
var url = document.URL;
var fname = url.split(regexp_fname);
var logtime = new Date();
var now = logtime.toGMTString();
var windowX = $(window).width();
var windowY = $(window).height()

function show_coords(){
	var string = '';
	for(var i=0; i<arr.length; i++){
		string += arr[i]['x']+"px "+arr[i]['y']+"px "+arr[i]['time']+"ms "+arr[i]['fname']+"\n";
	}
	return string;
}

function run_tracker(){
	$(document).mousemove(function(e){
		$('#mouse_x').val(window.scrollX + e.clientX);
		$('#mouse_y').val(window.scrollY + e.clientY);
		//$('#floating_coord').css({'top': window.scrollY + e.clientY, 'left': window.scrollX + e.clientX});
	});
	
	var record_timer = setInterval(function(){
		var x = $('#mouse_x').val();
		var y = $('#mouse_y').val();
		var tdiff = Date.now() - logtime;
		arr.push({'x':x,'y':y,'time':tdiff,'fname':fname[fname.length-1]});
	}, interval);
	
	//var counter_timer = setInterval(function(){
	//	$('#counter').html(Date.now() - Date.parse(now)+"ms elapsed<br>");
	//	$('#time_now').val(Date.now() - Date.parse(now));
	//}, 50);
	
	$(document).on('dblclick',function(){
		alert(show_coords()); // debug code (dump)
	});
	
	$('<input>',{"id": "mouse_x", "type": "hidden"}).appendTo('body');
	$('<input>',{"id": "mouse_y", "type": "hidden"}).appendTo('body');

}

function export_data(){
	var total_count = 0;
	for(var i=0; i<Math.ceil(arr.length/50); i++){
		var newarr = arr.slice(i*50, i*50+50);
		$.ajax({
			async: false,
			url: 'process.php',
			data: {'index': i, 'arr': newarr, 'windowX': windowX, 'windowY': windowY},
			success: function(data){
				//total_count += parseInt(data);
				//$('#append_result').html("<br>"+total_count+" items exported");
			}
		});		
	}
}

function getSessionId(){	// No need to display the session ID on the browser. Only for a test purpose
	$.ajax({
		url: 'return_sessid.php',
		success: function(data){
			$('#space').append("session id: "+data);
		}
	});
}
