

var csv1 = [];
var csv2 = [];
$(document).ready(function() {
    $.getJSON('majorsFromxml.json', function(data) {
    	csv1.push(data);
    	$.getJSON('majors.json', function(data) {
			csv2.push(data);
			appender(csv1, csv2);
		});

    });

});
function appender(data1, data2) {
	var csv1 = [].concat.apply([], data1);
	var csv2 = [].concat.apply([], data2);
	if (csv1.length !== csv2.length) {
		$('.content').append('<div class="warning">Warning, Arrays are not the same length</div>');
	}

	$.each(csv1, function(index, data) {
		if (data.CODE !== csv2[index].CODE) {
			$('.description').append('<div class="notSame">' + data.CODE + '|' + csv2[index].CODE + '</div>');
		}
	});

	$.each(csv1, function(index, data) {
		if (data.DESCRIPTION !== csv2[index].DESCRIPTION) {
			$('.description').append('<div class="notSame">' + data.DESCRIPTION + '|' + csv2[index].DESCRIPTION + '</div>');
		}
	});
};