/**
 * 初始化决策树的函数代码
 */
var initFlow = function() {
    $('#myflow').myflow({
        restore: ({
            "states": {
                "rect1": {
                    "type": "start",
                    "text": { "text": "开始", "fill": "#ffffff" },
                    "attr": { "x": "560", "y": "20", "width": "75", "height": "30","fill": "#77bb11" },
                    "props": { 
                        "text": {"label": '开始', "value": "开始" },
                        "expressionTime": {"name":'expressionTime', "label": '定时表达式:', "value":''},
                        "startTaskMark":{"label": '0',"value":""},
                        "startContact": {"label": '0',"value":""},
                        "sabnormalEnd": {"label": '0',"value":"[1]"},
                        "sarchive":{"label": '0',"value":"[2]"} 
                    }
                },
                "rect2": {
                    "type": "end",
                    "text": { "text": "结束", "fill": "#ffffff" },
                    "attr": { "x": "560", "y": "540", "width": "75", "height": "30", "fill": "#e87340" },
                    "props": { "text": { "value": "结束" } }
                },
                "rect3": {
                    "type": "task",
                    "text": { "text": "task1", "fill": "#ffffff" },
                    "attr": { "x": "560", "y": "100", "width": "75", "height": "30", "fill": "#4496d1" },
                    "props": { 
                        "text": { "value": "task1" },
                        "action": { "value": "task1类名" },
                        "startTime": { "value": "2017-11-1 12:12" },
                        "taskMark":{ "value": "" },
                        "taskParameter":{ "value": "" },
                        "expirationTime":{ "value": "" },
                        "estimatedTime":{ "value": "" },
                        "contact":{ "value": "" },
                        "taskNotAccept":{ "value": "[1]" },
                        "execTimeOut":{ "value": "[2]" },
                        "abnormalEnd":{ "value": "[1,2]" },
                        "archive":{ "value": "[]" },
                        "performGroup":{ "value": "[111,333]" },
                        "execIp":{ "value": "['123.13.13.13','123.12.12.12']" }
                    }
                },
                "rect4": {
                    "type": "fork",
                    "text": { "text": "分支", "fill": "#ffffff" },
                    "attr": { "x": "580", "y": "160", "width": "30", "height": "30", "fill": "#77bb11" },
                    "props": { "text": { "value": "分支" } }
                },
                 "rect5": {
                    "type": "task",
                    "text": { "text": "task2", "fill": "#ffffff" },
                    "attr": { "x": "500", "y": "220", "width": "75", "height": "30", "fill": "#4496d1" },
                    "props": { "text": { "value": "task2" },"action": { "value": "task2类名" },
                        "startTime": { "value": "2017-11-1 12:12" },
                        "taskMark":{ "value": "" },
                        "taskParameter":{ "value": "" },
                        "expirationTime":{ "value": "" },
                        "estimatedTime":{ "value": "" },
                        "contact":{ "value": "" },
                        "taskNotAccept":{ "value": "[1]" },
                        "execTimeOut":{ "value": "[2]" },
                        "abnormalEnd":{ "value": "[1,2]" },
                        "archive":{ "value": "[]" },
                        "performGroup":{ "value": "[111,333]" },
                        "execIp":{ "value": "['123.13.13.13','123.12.12.12']" }
                     }
                },
                 "rect6": {
                    "type": "task",
                    "text": { "text": "task3", "fill": "#ffffff" },
                    "attr": { "x": "620", "y": "220", "width": "75", "height": "30", "fill": "#4496d1" },
                    "props": { "text": { "value": "task3" },"action": { "value": "task3类名" },
                        "startTime": { "value": "2017-11-1 12:12" },
                        "taskMark":{ "value": "" },
                        "taskParameter":{ "value": "" },
                        "expirationTime":{ "value": "" },
                        "estimatedTime":{ "value": "" },
                        "contact":{ "value": "" },
                        "taskNotAccept":{ "value": "[1]" },
                        "execTimeOut":{ "value": "[2]" },
                        "abnormalEnd":{ "value": "[1,2]" },
                        "archive":{ "value": "[]" },
                        "performGroup":{ "value": "[111,333]" },
                        "execIp":{ "value": "['123.13.13.13','123.12.12.12']" }
                     }
                },
                "rect7": {
                    "type": "join",
                    "text": { "text": "聚合", "fill": "#ffffff" },
                    "attr": { "x": "580", "y": "280", "width": "30", "height": "30", "fill": "#77bb11" },
                    "props": { "text": { "value": "聚合" } }
                },
                 "rect8": {
                    "type": "task",
                    "text": { "text": "task4", "fill": "#ffffff" },
                    "attr": { "x": "560", "y": "340", "width": "75", "height": "30", "fill": "#4496d1" },
                    "props": { "text": { "value": "task4" },"action": { "value": "task4类名" },
                        "startTime": { "value": "2017-11-1 12:12" },
                        "taskMark":{ "value": "" },
                        "taskParameter":{ "value": "" },
                        "expirationTime":{ "value": "" },
                        "estimatedTime":{ "value": "" },
                        "contact":{ "value": "" },
                        "taskNotAccept":{ "value": "[1]" },
                        "execTimeOut":{ "value": "[2]" },
                        "abnormalEnd":{ "value": "[1,2]" },
                        "archive":{ "value": "[]" },
                        "performGroup":{ "value": "[111,333]" },
                        "execIp":{ "value": "['123.13.13.13','123.12.12.12']" }
                     }
                },
                "rect9": {
                    "type": "decision",
                    "text": { "text": "判定", "fill": "#ffffff" },
                    "attr": { "x": "540", "y": "400", "width": "110", "height": "30", "fill": "#a29e98" },
                    "props": { "text": { "value": "判定" } }
                },
                "rect10": {
                    "type": "task",
                    "text": { "text": "task5", "fill": "#ffffff" },
                    "attr": { "x": "500", "y": "460", "width": "75", "height": "30", "fill": "#4496d1" },
                    "props": { "text": { "value": "task5" },"action": { "value": "task5类名" },
                        "startTime": { "value": "2017-11-1 12:12" },
                        "taskMark":{ "value": "" },
                        "taskParameter":{ "value": "" },
                        "expirationTime":{ "value": "" },
                        "estimatedTime":{ "value": "" },
                        "contact":{ "value": "" },
                        "taskNotAccept":{ "value": "[1]" },
                        "execTimeOut":{ "value": "[2]" },
                        "abnormalEnd":{ "value": "[1,2]" },
                        "archive":{ "value": "[]" },
                        "performGroup":{ "value": "[111,333]" },
                        "execIp":{ "value": "['123.13.13.13','123.12.12.12']" }
                     }
                },
                "rect11": {
                    "type": "task",
                    "text": { "text": "task6", "fill": "#ffffff" },
                    "attr": { "x": "620", "y": "460", "width": "75", "height": "30", "fill": "#4496d1" },
                    "props": { "text": { "value": "task6" },"action": { "value": "task6类名" },
                        "startTime": { "value": "2017-11-1 12:12" },
                        "taskMark":{ "value": "" },
                        "taskParameter":{ "value": "" },
                        "expirationTime":{ "value": "" },
                        "estimatedTime":{ "value": "" },
                        "contact":{ "value": "" },
                        "taskNotAccept":{ "value": "[1]" },
                        "execTimeOut":{ "value": "[2]" },
                        "abnormalEnd":{ "value": "[1,2]" },
                        "archive":{ "value": "[]" },
                        "performGroup":{ "value": "[111,333]" },
                        "execIp":{ "value": "['123.13.13.13','123.12.12.12']" }
                     }
                },

                // "rect8": {
                //     "type": "task",
                //     "text": { "text": "动作", "fill": "#ffffff" },
                //     "attr": { "x": "285", "y": "275", "width": "70", "height": "26", "fill": "#4496d1" },
                //     "props": { "text": { "value": "动作" }, "action": { "value": "" } }
                // },
                // "rect9": {
                //     "type": "task2",
                //     "text": { "text": "动作2", "fill": "#ffffff" },
                //     "attr": { "x": "493", "y": "277", "width": "70", "height": "26", "fill": "#4496d1" },
                //     "props": { "text": { "value": "动作" }, "select": { "value": "1" }, "selects": { "value": "undefined" } }
                // }
            },
            "paths": {
                "path11": {
                    "from": "rect1",
                    "to": "rect3",
                    "dots": [],
                    "text": { "text": "", "textPos": { "x": "0", "y": "-10" } },
                    "props": { "text": { "value": "true" }, "pathCdt": { "value": "true" } }
                },
                "path12": {
                    "from": "rect3",
                    "to": "rect4",
                    "dots": [],
                    "text": { "text": "true", "textPos": { "x": "0", "y": "-10" } },
                    "props": {
                        "text": { "value": "true" },
                        "pathCdt": { "value": "true" }
                    }
                },
                "path13": {
                    "from": "rect4",
                    "to": "rect5",
                    "dots": [],
                    "text": { "text": "", "textPos": { "x": "0", "y": "-10" } },
                    "props": {
                        "text": { "value": "true" },
                        "pathCdt": { "value": "true" }
                    }
                },
                "path14": {
                    "from": "rect4",
                    "to": "rect6",
                    "dots": [],
                    "text": { "text": "", "textPos": { "x": "0", "y": "-10" } },
                    "props": { "text": { "value": "true" }, "pathCdt": { "value": "true" } }
                },
                "path15": {
                    "from": "rect5",
                    "to": "rect7",
                    "dots": [],
                    "text": { "text": "", "textPos": { "x": "0", "y": "-10" } },
                    "props": { "text": { "value": "true" }, "pathCdt": { "value": "true" } }
                },
                "path16": {
                    "from": "rect6",
                    "to": "rect7",
                    "dots": [],
                    "text": { "text": "", "textPos": { "x": "0", "y": "-10" } },
                    "props": { "text": { "value": "true" }, "pathCdt": { "value": "true" } }
                },
                "path17": {
                    "from": "rect7",
                    "to": "rect8",
                    "dots": [],
                    "text": { "text": "", "textPos": { "x": "0", "y": "-10" } },
                    "props": { "text": { "value": "true" }, "pathCdt": { "value": "true" } }
                },
                "path18": {
                    "from": "rect8",
                    "to": "rect9",
                    "dots": [],
                    "text": { "text": "", "textPos": { "x": "0", "y": "-10" } },
                    "props": { "text": { "value": "true" }, "pathCdt": { "value": "true" } }
                },
                "path19": {
                    "from": "rect9",
                    "to": "rect10",
                    "dots": [],
                    "text": { "text": "success", "textPos": { "x": "0", "y": "-10" } },
                    "props": { "text": { "value": "1" } }
                },
                "path20": {
                    "from": "rect9",
                    "to": "rect11",
                    "dots": [],
                    "text": { "text": "*", "textPos": { "x": "0", "y": "-10" } },
                    "props": {  "text": { "value": "3" } }
                },
                "path21": {
                    "from": "rect10",
                    "to": "rect2",
                    "dots": [],
                    "text": { "text": "", "textPos": { "x": "0", "y": "-10" } },
                    "props": { "text": { "value": "true" }, "pathCdt": { "value": "true" } }
                },
                "path22": {
                    "from": "rect11",
                    "to": "rect2",
                    "dots": [],
                    "text": { "text": "", "textPos": { "x": "0", "y": "-10" } },
                    "props": { "text": { "value": "true" }, "pathCdt": { "value": "true" } }
                },
            },
            "props": {
                "pkgId": "00000",
                "id": "00000",
                "props": { "text": { "value": "任务流程图" } }
            }
        })
    });
}

$(function() {
    initFlow();
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
