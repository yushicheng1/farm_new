"use strict";
var aUi = aUi || {};
aUi.recommend = {
	_recommend: function(data) {
		var html= '<li class="mui-table-view-cell" style="margin-bottom: 5px;">'+
						'<p><span>'+data.nick_name+'</span><span style="float: right;">'+data.phone+'</span></p>'+
					'</li>';
		return html;
	},
	recommendList: function(list4Record) {
		var html = "";
		for(var i = 0; i < list4Record.length; i++) {
			html += this._recommend(list4Record[i]);
		}
		return html;
	}
}
