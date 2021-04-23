;(function($){
var myflow = $.myflow;
var imgSrc = 'images/flow/';

$.extend(true,myflow.config.props.props,{
	"pkgId": "00000",
	"id": "00000",
	"props" : {
		"text" : {"name":'name', "label":'名称：', "value":'任务流程图', "editor":function(){return new myflow.editors.inputEditor();}}
	}
});
$.extend(true,myflow.config.tools.states,{
	"start" : {
		"type" : 'start',
		"name" : {"text":'<<start>>'},
		"text" : {"text":'开始', "fill":"#ffffff"},
		"img" : {"src" : imgSrc + 'startWhite.png',"width" : 18, "height":18},
		"attr": {"fill":"#77bb11", "width":75,"height":30},
		"props": {
			"text": {"name":"text","label": "名称：", "value":'', "editor": function(){return new myflow.editors.textEditor();}, value:'开始'},
			"expressionTime": {"name":'text', "label": '定时表达式:', "value":'', "editor": function(){return new myflow.editors.expressionTimeEditor();}},
			"startTaskMark": {"name":'text', "label": '流程名称:', "value":'', "editor": function(){return new myflow.editors.startTaskMark();}, value:'流程名称'},
			"setMore": {"label": 'btn',"value":"","editor": function(){return new myflow.editors.setMoreEditor();}},
			"startContact": {"label": '0',"value":''},
			"sabnormalEnd": {"label": '0',"value":'[]'},
			"sarchive": {"label": '0',"value":'[]'},
            "sstopValue":{"label": '0',"value": '[]'},
			"sperformGroup":{"name":"指定分组执行", "label": '0',"value": '[]',"editor": function(){return new myflow.editors.startPerformGroupEditor();}}
		}},
	"end" : {"type" : 'end',
		"name" : {"text":'<<end>>'},
		"text" : {"text":'结束', "fill":"#ffffff"},
		"img" : {"src" : imgSrc + 'endWhite.png',"width" : 18, "height":18},
		"attr": {"fill":"#e87340", "width":75,"height":30},
		"props" : {
			"text": {"name":'text',"label": '名称：', "value":'', "editor": function(){return new myflow.editors.textEditor();}, value:'结束'}
		}},
	"fork" : {"type" : 'fork',
		"name" : {"text":'<<fork>>'},
		"showType": 'image',
		"text" : {"text":'并行'},
		"attr":{"width":30, "height":30,"fill":"#ffffff"},
		"img" : {"src" : imgSrc + 'branch1.png',"width":30, "height":30},
		"props" : {
			"text": {"name":'text', "label": '名称：', "value":'', "editor": function(){return new myflow.editors.textEditor();}},
			"startTime": {"name":'startTime', "label": '距开始时间:', "value":'', "editor": function(){return new myflow.editors.calendarEditor();}},
			"startTimeUnit":{"name":"距离开始时间单位", "label": '0',"value": '' }
		}},
	"decision" : {"type" : 'decision',
		"name" : {"text":'<<decision>>'},
		"text" : {"text":'判定', "fill":"#ffffff"},
		"attr":{"fill":"#a29e98","width":100, "height":40},
		"img" : {"src" : imgSrc + 'branchWhite.png',"width":18, "height":18},
		"props" : {
			"text": {"name":'text', "label": '名称：', "value":'', "editor": function(){return new myflow.editors.inputEditor();}},
			"startTime": {"name":'startTime', "label": '距开始时间:', "value":'', "editor": function(){return new myflow.editors.calendarEditor();}},
			"startTimeUnit":{"name":"距离开始时间单位", "label": '0',"value": '' }
		}},
	"join" : {"type" : 'join',
		"name" : {"text":'<<join>>'},
		"text" : {"text":'合并'},
		"showType": 'image',
		"attr":{"width":30, "height":30,"fill":"#ffffff"},
		"img" : {"src" : imgSrc + 'merge1.png',"width":30, "height":30},
		"props" : {
			"text": {"name":'text', "label": '名称：', "value":'', "editor": function(){return new myflow.editors.textEditor();}}
		}},
	"task" : {"type" : 'task',
		"name" : {"text":'<<task>>'},
		"text" : {"text":'任务', "fill":"#ffffff"},
		"attr":{"fill":"#4496d1", "width":75, "height":30},
		"img" : {"src" : imgSrc + 'actionWhite1.png',"width":18, "height":18},
		"props" : {
			"text": {"name":'text', "label": '任务名称:', "value":'', "editor": function(){return new myflow.editors.inputEditor();}},
			"action": {"name":'action', "label": 'Java类名:', "value":'', "editor": function(){return new myflow.editors.inputEditorMore("action");}},
			"startTime": {"name":'startTime', "label": '距开始时间:', "value":'', "editor": function(){return new myflow.editors.calendarEditor();}},
			"setMore": {"label": 'btn',"value":'',"editor": function(){return new myflow.editors.setMoreEditor();}},
            "startTimeUnit":{"name":"距离开始时间单位", "label": '0',"value": '' },
            "taskMark":{"name":"任务描述", "label": '0',"value": '' },
            "taskParameter":{"name":"任务参数", "label": '0',"value": '' },
            "expirationTime":{"name":"过期时间(秒)", "label": '0',"value": '' },
            "estimatedTime":{"name":"预估时间(秒)", "label": '0',"value": '' },
            "contact":{"name":"联系人", "label": '0',"value": '' },
            "taskNotAccept":{"name":"任务未接受","label": '0',"value": '[]' },
            "execTimeOut":{"name":"超过预估执行时间", "label": '0',"value": '[]' },
            "abnormalEnd":{"name":"异常结束", "label": '0',"value": '[]' },
            "archive":{"name":"存档(子任务也结束)", "label": '0',"value": '[]' },
            "performGroup":{"name":"指定分组执行", "label": '0',"value": '[]',"editor": function(){return new myflow.editors.setPerformGroup();}},
            "execIp":{"name":"指定IP执行", "label": '0',"value": '[]' }
		}
	},

		// "task2" : {"type" : 'task2',
		// "name" : {"text":'<<task2>>'},
		// "text" : {"text":'动作2', "fill":"#ffffff"},
		// "attr":{"fill":"#4496d1", "width":70, "height":26},
		// "img" : {"src" : imgSrc + 'actionWhite.png',"width":18, "height":18},
		// "props" : {
		// 	"text": {"name":'text', "label": '名称：', "value":'', "editor": function(){return new myflow.editors.inputEditor();}, value:'动作'},
		// 	"select": {"name":'select', "label": '类型：', "value":'', "editor": function(){return new myflow.editors.selectEditor(new Array({'value':'1','name':'计算'},{'value':'2','name':'判断'}));}},
		// 	"selects": {"name":'selects', "label": '类型：', "value":'', "editor": function(){return new myflow.editors.selectEditorMulti(new Array({'id':'1','text':'计算'},{'id':'2','text':'判断'}));}}
		// }},
	
	
	// "rule" : {"type" : 'rule',
	// 	"name" : {"text":'<<rule>>'},
	// 	"text" : {"text":'规则', "fill":"#ffffff"},
	// 	"attr":{"fill":"#a50078", "width":70, "height":26},
	// 	"img" : {"src" : imgSrc + 'ruleWhite.png',"width":18, "height":18},
	// 	"props" : {
	// 		"text": {"name":'text', "label": '名称：', "value":'', "editor": function(){return new myflow.editors.inputEditor();}, value:'规则'},
	// 		"condition": {"name":'condition', "label": '条件：', "value":'', "editor": function(){return new myflow.editors.inputEditorMore("condition");}},
	// 		"action": {"name":'action', "label": '动作：', "value":'', "editor": function(){return new myflow.editors.inputEditorMore("action");}},
	// 	}},
});
})(jQuery);