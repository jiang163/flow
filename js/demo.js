/**
 * 初始化决策树的函数代码
 */
var ui = "";
var myflow = $.myflow;
var initFlow = function() {
	ui = {
        "states": {
            "rect1": {
                "type": "start",
                "text": {
                    "text": "开始",
                    "fill": "#ffffff"
                },
                "attr": {
                    "x": "336",
                    "y": "71",
                    "width": "62",
                    "height": "30",
                    "fill": "#77bb11"
                },
                "props": {
                    "text": {
                        "value": "开始"
                    },
                    "expressionTime": {
                        "value": ""
                    },
                    "startTaskMark": {
                        "value": "流程名称"
                    },
                    "setMore": {
                        "value": ""
                    },
                    "startContact": {
                        "value": ""
                    },
                    "sabnormalEnd": {
                        "value": "[]"
                    },
                    "sarchive": {
                        "value": "[]"
                    },
                    "sstopValue":{
                        "value": "[1,2]"
                    },
                    "sperformGroup":{"value": '[111,222]' }
                }
            },
            "rect2": {
                "type": "fork",
                "text": {
                    "text": "并行",
                    "fill": "#ffffff"
                },
                "attr": {
                    "x": "353",
                    "y": "161",
                    "width": "30",
                    "height": "30",
                    "fill": "#ffffff"
                },
                "props": {
                    "text": {
                        "value": "并行"
                    },
                    "startTime": {
                        "value": ""
                    },
                    "startTimeUnit": {
                        "value": ""
                    }
                }
            },
            "rect3": {
                "type": "task",
                "text": {
                    "text": "任务",
                    "fill": "#ffffff"
                },
                "attr": {
                    "x": "333",
                    "y": "255",
                    "width": "75",
                    "height": "30",
                    "fill": "#4496d1"
                },
                "props": {
                    "text": {
                        "value": "任务"
                    },
                    "action": {
                        "value": ""
                    },
                    "startTime": {
                        "value": ""
                    },
                    "setMore": {
                        "value": ""
                    },
                    "startTimeUnit": {
                        "value": ""
                    },
                    "taskMark": {
                        "value": ""
                    },
                    "taskParameter": {
                        "value": ""
                    },
                    "expirationTime": {
                        "value": ""
                    },
                    "estimatedTime": {
                        "value": ""
                    },
                    "contact": {
                        "value": ""
                    },
                    "taskNotAccept": {
                        "value": "[]"
                    },
                    "execTimeOut": {
                        "value": "[1]"
                    },
                    "abnormalEnd": {
                        "value": "[1,2]"
                    },
                    "archive": {
                        "value": "[]"
                    },
                    "performGroup": {
                        "value": "[]"
                    },
                    "execIp": {
                        "value": "['123.13.13.13','123.12.12.12']"
                    }
                },
                "hide":{
                    "flowRuntimeId":92,
                    "vertexDefineId":197,
                    "fireTime":"2017-11-21 20:05:00",
                    "scheduledFireTime":"2017-11-21 20:05:00",
                    "vertexRuntimeId":279,
                    "flowStatus":"RUNNING",
                    "error":"就是这个问题<a href='www.baidu.com'>www.baidu.com</a>"
                }
            }
        },
        "paths": {},
        "props": {
            "pkgId": "00000",
            "id": "00000",
            "props": {
                "text": {
                    "value": "任务流程图"
                }
            }
        }
    };
	$('#myflow').empty().myflow({
		restore: (
			ui
		)
	});
    
}

$(function() {
	initFlow();

 //    setTimeout(function(){
 //    	ui = {};
	// 	myflow.config.restore.states = ui.states;
		
 //    }, 3000);

	// window.setInterval(function(){
	// 	$('#myflow').empty().myflow({
	// 		restore: (
	// 			ui
	// 		)
	// 	});
	// }, 5000); 
    
    //通知时刻第一级checkbox
    $("input.taskCheckbox").click(function(){
        var _this = $(this);
        var thisId = _this.attr("id");
        if(_this.is(":checked")){
            $("#"+thisId+"-email").prop("checked",true);
        }else{
            $("#"+thisId+"-email").prop("checked",false);
            $("#"+thisId+"-sms").prop("checked",false);
        }
    });
    //通知时刻第二级checkbox（短信or邮件）
    $(".taskCheckboxSub input[type='checkbox']").click(function(){
        var _this = $(this);
        var thisId = _this.attr("id");
        var _pre = thisId.substring(0,thisId.indexOf("-"));
        
        var type = (thisId.indexOf("sms") != -1) ? "sms" : "email";
        var otherType = (thisId.indexOf("sms") != -1) ? "email" : "sms";

        var pre = $("#"+_pre);
        var one = $("#"+_pre+"-"+type);
        var other = $("#"+_pre+"-"+otherType);
            
        if(one.is(":checked")){
            one.prop("checked",true);
            if(!pre.is("checked")){
                pre.prop("checked",true);
            }
        }else{
            one.prop("checked",false);
            if(!other.is(":checked")){
                pre.prop("checked",false);
            }
        }
    })
});
