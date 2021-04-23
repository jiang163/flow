//使用.extend重写myflow.editors方法，写所有属性模块中需要调用的编辑input或者select输入
;(function($) {
    var myflow = $.myflow;
    var cfgActionLayer;
    //指定分组数据
    var IpData= {
        '111':'123.13.13.13,123.13.13.14',
        '222':'123.12.12.12',
        '333':'123.11.11.11'
    };
    /*var IpData= {"IpData":[
        {"group":"111","ips":[{"ip":"123.13.13.13","checked":true},{"ip":"123.13.13.14","checked":true}]},
        {"group":"222","ips":[{"ip":"123.13.13.13","checked":true}]},
        {"group":"333","ips":[{"ip":"123.13.13.13","checked":true}]}
    ]};*/
    var checkGroup = "";
    var isStartSubmit = false;
	//使用.extend重写myflow.editors方法，写所有属性模块中需要调用的编辑input或者select输入
    $.extend(true, myflow.editors, {
        setCfgData: function(obj) {
            //obj中含有data(返回字符串), cgfId(对应的path或者rect的id)
            //设置动作和条件配置子页面会调用这个方法返回配置动作和条件的值

            if (obj.chgIptType == 'action') {
                $("#paction > input").val(obj.data).trigger("change");
            } else if (obj.chgIptType =='pathCdt') {
                $("#ppathCdt > input").val(obj.data).trigger("change");
            }else if(obj.chgIptType =='condition'){
                $("#pcondition > input").val(obj.data).trigger("change");
            }
        },
        bindPickColor: function(obj, r, src) {
            var _src = src,
                _r = r;
            //obj是rect或者path对象，r是画图上下文。
            //选择颜色时候绑定函数
            var showDom = $("#curColor");
            var colorWrap = $("#colorWrap");

            if (obj.type != 'path' && obj.type != 'fork' && obj.type != 'join') {
                //点击开始、结束、动作的时候
                //colorWrap.show();
                colorWrap.hide();
                showDom.removeAttr('style').attr("style", "background-color:" + obj.attr.fill + ";color:" + obj.text.fill);
            } else if (obj.type == 'fork' || obj.type == 'join') {
                colorWrap.hide();
                return;
            } else if (obj.type == 'path') {
                //点击线的时候
                //colorWrap.show();
                colorWrap.hide();
                showDom.removeAttr('style').attr("style","background-color:" + obj.attr.text.fill +";color:" + obj.attr.text.fill);
            }
            
            $("#colorBoard > table td").unbind();
            $("#colorBoard > table td").click(function() {
                var styleStr = $(this).attr("style");
                var styleArr = styleStr.split(";");
                var bkColor, txtColor, i = 0,
                    tempArr;
                for (i = 0; i < styleArr.length; i++) {
                    if (styleArr[i].indexOf('background-color') >= 0) {
                        tempArr = styleArr[i].split(':');
                        bkColor = $.trim(tempArr[1]);
                    } else if (styleArr[i].indexOf('color') >= 0) {
                        tempArr = styleArr[i].split(':');
                        txtColor = $.trim(tempArr[1]);
                    }
                }

                showDom.removeAttr('style').attr("style", "background-color:" + bkColor + ";color:" + txtColor);

                //改变对象中的颜色
                if (obj.type != 'path' && obj.type != 'fork' && obj.type != 'join') {
                    //点击开始、结束、动作的时候
                    obj.attr.fill = bkColor;
                    obj.text.fill = txtColor;
                    //改变长方形背景和其中文字的颜色
                    $(_r).trigger('colorchange', [bkColor, txtColor, _src]);
                } else if (obj.type == 'path') {
                    //点击线的时候
                    obj.attr.text.fill = bkColor;
                    //改变线上文字的颜色
                    $(_r).trigger('colorchange', ['', bkColor, _src]);
                }
            });
        },
        bindOnClick: function(obj, r, src,O, k, div) {
            var _src = src,
                _r = r;
                _obj = obj;
            //TODO fork decision task三个类型的节点可以激活（从此节点开始执行）按钮
            if($("#startHere").length > 0){
                if (_obj.type == 'fork' || _obj.type == 'decision' || _obj.type == 'task') {
                    $("#startHere").addClass("btn-startHere").unbind().click(function(){
                        console.log(_obj.hide);
                    });
                }else{
                    $("#startHere").removeClass("btn-startHere");
                }
            }
            var top, left, tipsHtml;
            $("p.msgTips").remove();
            var srcJson = JSON.parse(src.toJson());
            if(_obj.hide != null && _obj.hide.error != ""){
                if(_obj.type == 'fork' || _obj.type == 'join'){
                    left = parseInt(srcJson.attr.x) + 160;
                    top = parseInt(srcJson.attr.y)+45;
                }else{
                    left = parseInt(srcJson.attr.x) + 200;
                    top = parseInt(srcJson.attr.y)+45;
                }
                tipsHtml = '<p class="msgTips" style="top:'+top+'px;left:'+left+'px;">'+_obj.hide.error+'</p>';
                $("#myflow").append(tipsHtml);
            }

        },
        textEditor: function() {
            //不可编辑的输入框如：分支、开始节点
            var _props, _k, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
                _props = O.props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
                var statesObjs = myflow.config.restore.states;
                $('<input id="ptext" style="width:100%;" />').val(_src.text()).change(
                    function() {
                        //TODO 验证修改属性框重名
                        var thisVal = _props[_k].value;
                        var statesx = "";
                        for(var x in statesObjs){
                            statesx = statesObjs[x];
                            if($(this).val() == statesx.text.text){
                                layer.open({
                                    type: 1,
                                    shade: 0.3,
                                    title: false, //不显示标题
                                    content: '<p>流程图中已存在命名为【'+statesx.text.text+'】的'+O.type+'节点!</p>', 
                                    cancel: function(){
                                        $("input#ptext").val(thisVal);
                                        layer.close();
                                    }
                                });
                                return false;
                            }
                        }
                        statesx.text.text = $(this).val();  
                        _props[_k].value = $(this).val();
                        $(_r).trigger('textchange', [$(this).val(), _src]);
                    }).appendTo('#' + _div);
               
                $('#' + _div).data('editor', this);
                //改变颜色函数绑定
                myflow.editors.bindPickColor(O, r, _src);
                myflow.editors.bindOnClick(O, r, _src);
            };
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                    $(_r).trigger('textchange', [$(this).val(), _src]);
                });
            };
        },
        inputEditor: function() {
            //使用在属性窗口的第一个输入框，输入框中的值变化可以让图上的文字改变
            var _props, _k, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
                _props = O.props;
                _obj = O;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
                var pathObjs = myflow.config.restore.paths;
                var statesObjs = myflow.config.restore.states;
                $('<input id="propTxts" style="width:100%;"/>').val(_src.text()).change(function() {
                    //TODO 验证修改属性框重名
                    var thisVal = _obj.text.text;
                    var statesx = "";
                    for(var x in statesObjs){
                        statesx = statesObjs[x];
                        if($(this).val() == statesx.text.text && x != _src.getId()){
                            layer.open({
                                type: 1,
                                shade: 0.3,
                                title: false, //不显示标题
                                content: '<p>流程图中已存在命名为【'+statesx.text.text+'】的'+O.type+'节点!</p>', 
                                cancel: function(){
                                    $("#propTxts").val(thisVal);
                                    layer.close();
                                }
                            });
                            return false;
                        }
                    }
                    statesx.text.text = $(this).val();   
                    _props[_k].value = $(this).val();
                    //$("#propTxts").val(_props[_k].value);
                    if (_src.getId().indexOf('path') >= 0) {
                        pathObjs[_src.getId()].text.text = $(this).val();
                        pathObjs[_src.getId()].props.text.value = $(this).val();
                    }
                    $(_r).trigger('textchange', [$(this).val(), _src]);
                }).bind('blur', function(event) {
                    //TODO 失去焦点 执行更新数据
                    $(this).trigger("change");
                }).appendTo('#' + _div);
                // .bind('keyup', function(event) {
                //     if (event.keyCode == "13") {
                //         //TODO 回车执行更新数据
                //         $(this).trigger("change");
                //     }
                // });
                // if($("#colorWrap").length==0){
                //     $("#propTxts").attr("readOnly",true).css("cursor","no-drop");
                // }


                if (_src.getId().indexOf('path') >= 0) {
                    _props[_k].value = pathObjs[_src.getId()].text.text;
                }
                $('#' + _div).data('editor', this);
                //改变颜色函数绑定
                myflow.editors.bindPickColor(O, r, _src);
                myflow.editors.bindOnClick(O, r, _src);
            }
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                });
            }
        },
        inputEditorSec: function() {
            //图上的文字不随着输入框中的文字改变，只是多了一个可以编辑的输入框的属性
            var _props, _k, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
                _props = O.props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
                var pathObjs = myflow.config.restore.paths;

                $('<input id="propTxtsSec" style="width:100%;"/>').change(function() {
                    _props[_k].value = $(this).val();
                }).appendTo('#' + _div).bind('blur', function(event) {
                    //TODO 失去焦点 执行更新数据
                    $(this).trigger("change");
                });
                //     .bind('keyup', function(event) {
                //     if (event.keyCode == "13") {
                //         //回车执行更新数据
                //         $(this).trigger("change");
                //     }
                // });
                if($("#colorWrap").length==0){
                    $("#propTxtsSec").attr("readOnly",true).css("cursor","no-drop");
                } 
                $("#propTxtsSec").val(_props[_k].value);

                $('#' + _div).data('editor', this);
            }
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                });
            }
        },
        inputEditorMore: function(type) {
            //带更多的按钮的输入框，输入框不可编辑
            var _props, _k, _t, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
                _props = O.props;
                _obj = O,
                    _k = k;
                _div = div;
                _src = src;
                _r = r;
                var _pathWithCdt = true;
                var states = myflow.config.restore.states;
                var pathObjs = myflow.config.restore.paths;
                var layerTop = $(window).height() / 2 - 516 / 2;
                
                $('<input class="moreCdt" id="javaName" />').val(_props[_k].value).change(function() {
                    _props[_k].value = $(this).val();
                }).appendTo('#' + _div);

                if($("#colorWrap").length==0){
                    $("#javaName").attr("readOnly",true).css("cursor","no-drop");
                }

                if (type == "pathCdt") {
                    //判断是从分支节点出来的线
                    var from = pathObjs[_src.getId()].from;

                    for (var rect in states) {
                        if (rect == from && states[rect].type == 'forkTxt') {
                            //if (rect == from && (states[rect].type == 'fork' || states[rect].type == 'forkTxt')) {
                            //线的from端是分支，可以显示配置条件
                            $(".moreCdt").width('100%');
                            _pathWithCdt = true;
                            break;
                        } else {
                            $(".moreCdt").width('100%');
                            _pathWithCdt = false;
                        }
                    }

                }

                if (_pathWithCdt || type == "action" || type == "condition") {
                    //打开配置子页面函数绑定
                    $(".moreCdt").attr("style","margin-right:5px;width:100%");
                    // $('<button class="setMove">...</button>').click(function() {
                    //     // layer.msg('点击了编辑更多按钮！',{
                    //     //         time :2000
                    //     // });
                    //     layer.open({
                    //         type: 1,
                    //         title: '节点属性',
                    //         shadeClose: true,
                    //         shade: false,
                    //         maxmin: true, //开启最大化最小化按钮
                    //         area: ['893px', '600px'],
                    //         content: $('#nodePropertyCon')
                    //     });

                    // }).appendTo('#' + _div);
                }
                $('#' + _div).data('editor', this);

                //改变颜色函数绑定
                myflow.editors.bindPickColor(O, r, _src);
                myflow.editors.bindOnClick(O, r, _src);
            }
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                });
            }
        },
        selectEditor: function(arg) {
            //下拉列表框，如果使用了这个函数需要调用easyui的插件来美化文本框
            //单选 获取值的方法是： $("#sltType").combobox('getValue');
            var _props, _k, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
                _props = O.props;
                _text = O.text;
                _k = k;
                _div = div;
                _src = src;
                _r = r;

                if (typeof arg === 'string') {
                    //传进来一个url用来获取select值
                    //获取的data对象是一个'value','name'值的对象
                    $.ajax({
                        type: "GET",
                        url: arg,
                        success: function(data) {
                            var opts = eval(data);
                            var sle = $('<input  style="width:100%;height:25px;" id="sltType" />').val(_props[_k].value).change(function() {
                                _props[_k].value = $(this).val();
                            }).appendTo('#' + _div);
                            easyloader.load('combobox',function(){
                                // alert('load combobox success!');
                                sle.css("width", sle.parent().width() + "px");
                                sle.combobox({});
                                sle.combobox({
                                    valueField: 'value',
                                    textField: 'name',
                                    editable: false,
                                    data: arg,
                                    panelHeight: 'auto',
                                    onLoadSuccess: function() {
                                        sle.combobox('setValue', _props[_k].value);
                                    },
                                    onSelect: function(record) {
                                        sle.val(record.value);
                                        _props[_k].value = record.value;
                                    }
                                });
                            });
                        }
                    });
                } else {
                    //传进来的arg是一个'value','name'值的对象
                    var sle = $('<input  style="width:20%;height:25px;" id="sltType" />').val(_props[_k].value).change(function() {
                        _props[_k].value = $(this).val();
                    }).appendTo('#' + _div);
                    easyloader.load('combobox',function(){
                        // alert('load combobox success!');
                        sle.css("width", sle.parent().width() + "px");
                        sle.combobox({});
                        sle.combobox({
                            valueField: 'value',
                            textField: 'name',
                            editable: false,
                            data: arg,
                            panelHeight: 'auto',
                            onLoadSuccess: function() {
                                if(_props[_k].value != ''){
                                    sle.combobox('setValue', _props[_k].value);
                                }else{
                                    sle.combobox('setValue', arg[0].value);
                                }
                            },
                            onSelect: function(record) {
                                sle.val(record.value);
                                _props[_k].value = record.value;
                                //TODO2
                                $(_r).trigger('textchange', [record.name, _src]);
                                //_text.patten = record.name;
                            }
                        });
                    });
                }
                $('#' + _div).data('editor', this);
                //改变颜色函数绑定
                myflow.editors.bindPickColor(O, r, _src);
                myflow.editors.bindOnClick(O, r, _src);

            };
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                });
            };
        },
        calendarEditor: function(arg) {
            //下拉列表框，如果使用了这个函数需要调用easyui的插件来美化文本框
            //单选 获取值的方法是： $("#sltType").combobox('getValue');
            var _props, _k, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
              
                _props = O.props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;

                var calendarVa = _props.startTime.value;
                var html = '<input  style="width:89px;height:25px;" id="startTime" type="number" placeholder="距开始时间" value="'+calendarVa+'"/>'
                        +'<select id="startTimeUnit" style="width:54px;height:27px;margin-left:2px">'
                        +'<option value="60">小时</option>'
                        +'<option value="1">分钟</option>'
                        +'<option value="1440">天</option>'
                        +'</select>';
                $(html).appendTo('#' + _div);
                $("#startTime").val(_props[_k].value).change(
                    function() {
                        _props[_k].value = $(this).val();
                        //$(_r).trigger('textchange', [$(this).val(), _src]);
                });
                $("#startTimeUnit").val(_props.startTimeUnit.value).change(
                    function() {
                        _props.startTimeUnit.value = $(this).val();
                        //$(_r).trigger('textchange', [$(this).val(), _src]);
                });
                
                $('#' + _div).data('editor', this);
               
                if($("#colorWrap").length==0){
                    $("#startTime").attr("readOnly",true).css("cursor","no-drop");
                }else{
                    // $('#startTime').datetimepicker({
                    //     step:1,
                    //     format:'Y-m-d H:i',
                    //     todayBtn: true,
                    // });
                    // $.datetimepicker.setLocale('ch');
                }
            };
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                });
            };
        },
        setMoreEditor: function(arg) {
            //下拉列表框，如果使用了这个函数需要调用easyui的插件来美化文本框
            //单选 获取值的方法是： $("#sltType").combobox('getValue');
            var _props, _k, _div, _src, _r,_states;
            this.init = function(O, k, div, src, r,states) {
                _props = O.props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
                _states = states;
                var type = O.type;

                //var _states = myflow.config.restore.states;
                var pathObjs = myflow.config.restore.paths;
               
                $('<button class="setMore">更多属性</button>').appendTo('#' + _div );
                $('button.setMore').click(function() {
                    var morePropertyCon = type == "task" ? $('#nodePropertyCon') : $('#startPropertyCon');
                    var layerBtns = ($("#colorWrap").length==0) ? ["取消"] : ["提交","取消"];
                    var layerArea = type == "task" ? ['893px', '600px'] : ['893px', '530px'];

                    //更多属性弹窗
                    layer.open({
                        type: 1,
                        title: '节点属性',
                        shadeClose: false,
                        shade: 0.4,
                        maxmin: true, //开启最大化最小化按钮
                        area: layerArea,
                        content: morePropertyCon,
                        btn:layerBtns,
                        yes: function(index, layero){
                            if(type == "task"){
                                //任务节点  提交表单
                                var taskVal = $("#layerTaskVal").val(),
                                javaVal = $("#layerJavaVal").val(),
                                startTime = $("#layerStartTime").val(),
                                startTimeUnit = $("#layerStartTimeUnit").val(),
                                taskMark = $("#layerTaskMark").val(),
                                taskParameter = $("#layerTaskParameter").val().replace(/\"/g,"'"),
                                expirationTime = $("#layerExpirationTime").val(),
                                estimatedTime = $("#layerEstimatedTime").val(),
                                contact = $("#layerContact").val(),
                                taskNotAcceptArray = [],
                                execTimeOutArray = [],
                                abnormalEndArray = [],
                                archiveArray = [],
                                execIpVal = [];

                                if(taskVal == "" || taskVal == null){
                                    layer.tips('任务名称不能为空！', '#layerTaskVal', {
                                        tips: 3
                                    });
                                    return false;
                                }
                                if(javaVal == "" || javaVal == null){
                                    layer.tips('java类名不能为空！', '#layerJavaVal', {
                                        tips: 3
                                    });
                                    return false;
                                }
                                if(expirationTime == "" || expirationTime == null){
                                    layer.tips('过期时间不能为空！', '#layerExpirationTime', {
                                        tips: 3
                                    });
                                    return false;
                                }
                                if(estimatedTime == "" || estimatedTime == null){
                                    layer.tips('预估时间不能为空！', '#layerEstimatedTime', {
                                        tips: 3
                                    });
                                    return false;
                                }

                                var taskCheckbox = $("#nodePropertyCon table input.taskCheckbox");
                                for(var i=0; i<4; i++){
                                    if($(taskCheckbox[i]).is(":checked")){
                                        //sms和email的input
                                        var preId = $(taskCheckbox[i]).attr("id");
                                        var array = [];
                                        var thisSms = $("#"+preId+"-sms");
                                        var thisEmail = $("#"+preId+"-email");
                                        if($("#"+preId+"-sms").is(":checked")) array.push(1);
                                        if($("#"+preId+"-email").is(":checked")) array.push(2);
                                        if(preId.indexOf("task") != -1) taskNotAcceptArray = array;
                                        if(preId.indexOf("exec") != -1) execTimeOutArray = array;
                                        if(preId.indexOf("abno") != -1) abnormalEndArray = array;
                                        if(preId.indexOf("arch") != -1) archiveArray = array;
                                    }
                                }

                                var execIp = $(".execIp ul li input");
                                for(var ipNum = 0; ipNum<execIp.length; ipNum++){
                                    var ipItem = $(execIp[ipNum]);
                                    if(ipItem.is(":checked")){
                                        execIpVal.push("'"+ipItem.val()+"'");
                                    }
                                }
                                var setMoreVal = _props;
                                setMoreVal.text.value = taskVal;
                                setMoreVal.action.value = javaVal;
                                setMoreVal.startTime.value = startTime;
                                setMoreVal.startTimeUnit.value = startTimeUnit;
                                setMoreVal.taskMark.value = taskMark;
                                setMoreVal.taskParameter.value = taskParameter;
                                setMoreVal.expirationTime.value = expirationTime;
                                setMoreVal.estimatedTime.value = estimatedTime;
                                setMoreVal.contact.value = contact;
                                setMoreVal.taskNotAccept.value = '['+taskNotAcceptArray+']';
                                setMoreVal.execTimeOut.value = '['+execTimeOutArray+']';
                                setMoreVal.abnormalEnd.value = '['+abnormalEndArray+']';
                                setMoreVal.archive.value = '['+archiveArray+']';
                                setMoreVal.execIp.value = '['+execIpVal+']';
                                myflow.config.restore.states[_src.getId()].props.execIp.value = setMoreVal.execIp.value;

                                $("#propTxts").val(taskVal);
                                $("#javaName").val(javaVal);
                                $("#startTime").val(startTime);
                                $("#startTimeUnit").val(startTimeUnit);
                            }else{
                                //开始节点  提交表单
                                isStartSubmit = true;
                                var expressionTime = $("#layerExpressionTime").val(),
                                    startTaskMark = $("#layerStartTaskMark").val(),
                                    startContact = $("#layerStartContact").val(),
                                    sabnormalEndArray = [],
                                    sarchiveArray = [],
                                    sstopArray = [],
                                    sperformGroupVal = [];
                                if(expressionTime == "" || expressionTime == null){
                                    layer.tips('定时表达式不能为空！', '#layerExpressionTime', {
                                        tips: 3
                                    });
                                    return false;
                                }
                                if(startTaskMark == "" || startTaskMark == null){
                                    layer.tips('流程名称不能为空！', '#layerStartTaskMark', {
                                        tips: 3
                                    });
                                    return false;
                                }

                                var startCheckbox = $("#startPropertyCon table input.taskCheckbox");
                                for(var i=0; i<3; i++){
                                    if($(startCheckbox[i]).is(":checked")){
                                        //sms和email的input
                                        var preId = $(startCheckbox[i]).attr("id");
                                        var array = [];
                                        // var thisSms = $("#"+preId+"-sms");
                                        // var thisEmail = $("#"+preId+"-email");
                                        if($("#"+preId+"-sms").is(":checked")) array.push(1);
                                        if($("#"+preId+"-email").is(":checked")) array.push(2);
                                        if(preId.indexOf("abno") != -1) sabnormalEndArray = array;
                                        if(preId.indexOf("arch") != -1) sarchiveArray = array;
                                        if(preId.indexOf("stop") != -1) sstopArray = array;
                                    }
                                }
                                //指定分组 的 分组名称
                                var sperformGroup = $(".perform ul li input");
                                for(var groupNum = 0; groupNum<sperformGroup.length; groupNum++){
                                    var sperformGroupItem = $(sperformGroup[groupNum]);
                                    if(sperformGroupItem.is(":checked")){
                                        sperformGroupVal.push(sperformGroupItem.val());
                                    }else{
                                        //开始节点中取消组的时候  取消任务myflow数据中所有task节点 该组内的IP
                                        //var _states = myflow.config.restore.states; //myflow.config.restore.states
                                        var groupVal = sperformGroupItem.val();
                                        var _data = IpData;
                                        for(var x in _states){
                                            if(_states[x].type == "task"){
                                                var execIpVal = _states[x].props.execIp.value;
                                                var execIpArray = [];
                                                var execIp = "";
                                                var needReplaceVal = _data[groupVal].split(",");
                                                for(var i = 0; i< needReplaceVal.length; i++){
                                                    execIpVal = execIpVal.replace(needReplaceVal[i],"").replace("''","");
                                                }
                                                execIp = execIpVal.replace("[","").replace("]","").split(",");
                                                for(var j=0; j<execIp.length; j++){
                                                    if(execIp[j] != ""){
                                                        execIpArray.push(execIp[j]);
                                                    }
                                                }
                                                debugger;
                                                execIpVal = '['+execIpArray+']';
                                                //myflow.editors.taskSubmitClick(O, k, div, src, r,x,execIpVal);
                                                //$(_r).trigger('changeArray', [e,execIpVal,x,_src]);
                                                _states[x].props.execIp.value = execIpVal;
                                                //console.log(_states[x].props.execIp.value);

                                            }
                                        }
                                    }
                                }

                                checkGroup = sperformGroupVal;
                                _props.expressionTime.value = expressionTime;
                                _props.startTaskMark.value = startTaskMark;
                                _props.startContact.value = startContact;
                                _props.sabnormalEnd.value = '['+sabnormalEndArray+']';
                                _props.sarchive.value = '['+sarchiveArray+']';
                                _props.sstopValue.value = '['+sstopArray+']';
                                _props.sperformGroup.value = '['+sperformGroupVal+']';
                                $("#expressionTime").val(expressionTime);
                            }
                            layer.close(index);
                            layer.closeAll('tips');
                        },
                        btn2: function(index, layero){
                            layer.close(index);
                            layer.closeAll('tips');
                        },
                        cancle: function(index){
                            layer.close(index);
                            layer.closeAll('tips');
                        }
                    });
                    $("div.group-control input[type='checkbox']").attr("checked",false);
                    if(type == "task"){
                        //任务节点  更多属性
                        $("#layerTaskVal").val($("#propTxts").val());
                        $("#layerJavaVal").val($("#javaName").val());
                        $("#layerStartTime").val($("#startTime").val());
                        $("#layerStartTimeUnit").val($("#startTimeUnit").val());
                        $("#layerTaskMark").val(_props.taskMark.value);
                        $("#layerTaskParameter").val(_props.taskParameter.value);
                        $("#layerExpirationTime").val(_props.expirationTime.value);
                        $("#layerEstimatedTime").val( _props.estimatedTime.value);
                        $("#layerContact").val(_props.contact.value);

                        var taskNotAcceptValue = eval("("+_props.taskNotAccept.value+")");
                        if(taskNotAcceptValue.length == 1){
                            $("#taskNotAccept").prop("checked",true);
                            if(taskNotAcceptValue[0] == 1){
                                $("#taskNotAccept-sms").prop("checked",true);
                            }else{
                                $("#taskNotAccept-email").prop("checked",true);
                            }
                        }else if(taskNotAcceptValue.length == 2){
                            $("#taskNotAccept").prop("checked",true);
                            $("#taskNotAccept-sms").prop("checked",true);
                            $("#taskNotAccept-email").prop("checked",true);
                        }
                        var execTimeOutValue = eval("("+_props.execTimeOut.value+")");
                        if(execTimeOutValue.length == 1){
                            $("#execTimeOut").prop("checked",true);
                            if(execTimeOutValue[0] == 1){
                                $("#execTimeOut-sms").prop("checked",true);
                            }else{
                                $("#execTimeOut-email").prop("checked",true);
                            }
                        }else if(execTimeOutValue.length == 2){
                            $("#execTimeOut").prop("checked",true);
                            $("#execTimeOut-sms").prop("checked",true);
                            $("#execTimeOut-email").prop("checked",true);
                        }
                        var abnormalEndValue = eval("("+_props.abnormalEnd.value+")");
                        if(abnormalEndValue.length == 1){
                            $("#abnormalEnd").prop("checked",true);
                            if(abnormalEndValue[0] == 1){
                                $("#abnormalEnd-sms").prop("checked",true);
                            }else{
                                $("#abnormalEnd-email").prop("checked",true);
                            }
                        }else if(abnormalEndValue.length == 2){
                            $("#abnormalEnd").prop("checked",true);
                            $("#abnormalEnd-sms").prop("checked",true);
                            $("#abnormalEnd-email").prop("checked",true);
                        }
                        var archiveValue = eval("("+_props.archive.value+")");
                        if(archiveValue.length == 1){
                            $("#archive").prop("checked",true);
                            if(archiveValue[0] == 1){
                                $("#archive-sms").prop("checked",true);
                            }else{
                                $("#archive-email").prop("checked",true);
                            }
                        }else if(archiveValue.length == 2){
                            $("#archive").prop("checked",true);
                            $("#archive-sms").prop("checked",true);
                            $("#archive-email").prop("checked",true);
                        }


                        var execIpValue = eval("("+_props.execIp.value+")");
                        if(execIpValue.length != 0){
                            var execIp = $(".execIp ul li input");
                                for(var ipNum = 0; ipNum<execIp.length; ipNum++){
                                    var ipItem = $(execIp[ipNum]);
                                    for(var e=0; e<execIpValue.length; e++){
                                        if(execIpValue[e] == ipItem.val() && execIpValue[e]!=null){
                                            ipItem.prop("checked",true);
                                        }
                                    }
                                }
                        }

                    }else{
                        //开始节点  更多属性
                        $("#layerExpressionTime").val($("#expressionTime").val());
                        $("#layerStartTaskMark").val(_props.startTaskMark.value);
                        $("#layerStartContact").val(_props.startContact.value);

                        var sabnormalEndValue = eval("("+_props.sabnormalEnd.value+")");
                        if(sabnormalEndValue.length == 1){
                            $("#sabnormalEnd").prop("checked",true);
                            if(sabnormalEndValue[0] == 1){
                                $("#sabnormalEnd-sms").prop("checked",true);
                            }else{
                                $("#sabnormalEnd-email").prop("checked",true);
                            }
                        }else if(sabnormalEndValue.length == 2){
                            $("#sabnormalEnd").prop("checked",true);
                            $("#sabnormalEnd-sms").prop("checked",true);
                            $("#sabnormalEnd-email").prop("checked",true);
                        }

                        var sarchiveValue = eval("("+_props.sarchive.value+")");
                        if(sarchiveValue.length == 1){
                            $("#sarchive").prop("checked",true);
                            if(sarchiveValue[0] == 1){
                                $("#sarchive-sms").prop("checked",true);
                            }else{
                                $("#sarchive-email").prop("checked",true);
                            }
                        }else if(sarchiveValue.length == 2){
                            $("#sarchive").prop("checked",true);
                            $("#sarchive-sms").prop("checked",true);
                            $("#sarchive-email").prop("checked",true);
                        }
                        var stopValue = eval("("+_props.sstopValue.value+")");
                        if(stopValue.length == 1){
                            $("#stop").prop("checked",true);
                            if(stopValue[0] == 1){
                                $("#stop-sms").prop("checked",true);
                            }else{
                                $("#stop-email").prop("checked",true);
                            }
                        }else if(stopValue.length == 2){
                            $("#stop").prop("checked",true);
                            $("#stop-sms").prop("checked",true);
                            $("#stop-email").prop("checked",true);
                        }


                        var sperformGroupValue = eval("("+_props.sperformGroup.value+")");
                        if(sperformGroupValue.length != 0){
                            var sperformGroup = $(".perform ul li input");
                            for(var groupNum = 0; groupNum<sperformGroup.length; groupNum++){
                                var sperformGroupItem = $(sperformGroup[groupNum]);
                                for(var p=0; p<sperformGroupValue.length; p++){
                                    if(sperformGroupValue[p] == sperformGroupItem.val()){
                                        $(sperformGroup[groupNum]).prop("checked",true);
                                    }
                                }
                            }
                        }
                    }

                })
            };
            // this.destroy = function() {
            //     $('#' + _div + ' input').each(function() {
            //         _props[_k].value = $(this).val();
            //     });
            // };
        },
        expressionTimeEditor: function(arg) {
            var _props, _k, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
                _props = O.props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
                var type = O.type;
                
                $('<input id="expressionTime" style="width:100%;" />').val(_props.expressionTime.value).change(
                    function() {
                        _props[_k].value = $(this).val();
                        //$(_r).trigger('textchange', [$(this).val(), _src]);
                    }).appendTo('#' + _div );
                if($("#colorWrap").length==0){
                    $("#expressionTime").attr("readOnly",true).css("cursor","no-drop");
                }               
            };
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                });
            };
        },
        startTaskMark: function() {
            //不可编辑的输入框如：分支、开始节点
            var _props, _k, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
                _props = O.props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
               
                $('<input  style="width:100%;"/>').val(_props[_k].value).change(
                    function() {
                        _props[_k].value = $(this).val();
                        //$(_r).trigger('textchange', [$(this).val(), _src]);
                    }).appendTo('#' + _div);
                
                //$('#' + _div).data('editor', this);
                //改变颜色函数绑定
                myflow.editors.bindPickColor(O, r, _src);
                myflow.editors.bindOnClick(O, r, _src);
            };
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                    $(_r).trigger('textchange', [$(this).val(), _src]);
                });
            };
        },
        setPerformGroup: function() {
            //任务节点  分组执行对应的IP  任务节点根据开始节点选择的分组 添加各组中的IP
            var _props, _k, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
                _props = O.props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
                var startPerformGroupArray = "";
                if(isStartSubmit){
                    startPerformGroupArray = checkGroup; //开始节点分组执行checkbox的改变 点击 提交后 修改全局变量checkGroup
                }else{
                    //首次加载任务节点时  IP信息从源数据中获得
                    var _states = myflow.config.restore.states;
                    for(var node in _states){
                        if(_states[node].type == "start"){
                            startPerformGroupArray = JSON.parse(_states[node].props.sperformGroup.value);
                        }
                    }
                }

                var liHtml = "";
                var divGroup = $("#nodePropertyCon #performGroupCon .execIp");
                //TODO  根据分组执行选中的IP  循环加载任务节点中的 IP项
                if(startPerformGroupArray.length == 0){
                    divGroup.empty().append("【开始节点未选择指定分组】");
                }else{
                    for(var i=0; i<startPerformGroupArray.length; i++){
                        var num = i+1;
                        for(var x in IpData){
                            if( startPerformGroupArray[i] == x){
                                liHtml +='<div class="panel panel-info">'
                                    +'<div class="panel-heading">'
                                    +'<h4 class="panel-title">'
                                    +'<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+num+'">'+x+'</a>'
                                    +'</h4>'
                                    +'</div>'
                                    +'<div id="collapse'+num+'" class="panel-collapse collapse in">'
                                    +'<div class="panel-body">'
                                    +'<ul>';
                                var ips = IpData[x].split(",");
                                var ipNum =1,ipHtml="";
                                for(var j=0;j<ips.length; j++){
                                    //分组内的IP
                                    ipHtml += '<li><input type="checkbox" name="" id="'+x+ipNum+'" value="'+ips[j]+'"><label for="'+x+ipNum+'">'+ips[j]+'</label></li>';
                                    ipNum++;
                                }
                                liHtml += ipHtml
                                    +'</ul>'
                                    +'</div>'
                                    +'</div>'
                                    +'</div>';
                            }
                            divGroup.empty().append(liHtml);
                            $('#collapse'+num).collapse('show');
                        }

                    }
                }

                //改变颜色函数绑定
                //myflow.editors.bindPickColor(O, r, _src);
                myflow.editors.bindOnClick(O, r, _src);
            };
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                    $(_r).trigger('textchange', [$(this).val(), _src]);
                });
            };
        },
        startPerformGroupEditor: function() {
            //开始节点从IpData中加载组名
            var _props, _k, _div, _src, _r;
            this.init = function(O, k, div, src, r) {
                _props = O.props;
                _k = k;
                _div = div;
                _src = src;
                _r = r;
                //指定分组数据
                var startPerformGroupHtml="",num=0;
                for(var x in IpData){
                    num++;
                    startPerformGroupHtml += '<li><input type="checkbox" name="" id="sperformGroup'+num+'" value="'+x+'"><label for="sperformGroup'+num+'">'+x+'</label></li>'
                }
                $("#startPerformGroup ul").empty().append(startPerformGroupHtml);

                myflow.editors.bindOnClick(O, r, _src);
            };
            this.destroy = function() {
                $('#' + _div + ' input').each(function() {
                    _props[_k].value = $(this).val();
                    $(_r).trigger('textchange', [$(this).val(), _src]);
                });
            };
        }
    });
	//使用.extend重写myflow.config.tools.save方法，写保存按钮点击时候做的操作。
	$.extend(true, myflow.config.tools.save, {
		onclick: function(data) {

            // var states = myflow.config.restore.states;
            // var changeColor = function(id,str) {
            //     var str = "sssss";
            //     var id="rect3";
            //     var bkColor = "#f51212";
            //     var txtColor = "#ffffff";
            //
            //     for(var x in states){
            //         if(x == id){
            //             states[x].attr.fill = bkColor;
            //             var _src = states[x];
            //         }
            //
            //     }
            // };
            // changeColor();

			console.log(data);
            alert(data);
			//保存事件			
		}
	});
})(jQuery);

//绑定保存按钮显示隐藏的事件
var bindSaveBtn = function() {
    $("#iconCtlSave").click(function() {
        $("#myflow_save").toggle();
    });
}

var calcToolboxContentMaxHeight = function(){
    var $toolbox = $('#myflow_tools');
    var toolboxTopHeight = $toolbox.css('top').split('px')[0];
    var toolboxHeaderHeight = $('#myflow_tools > .toolsHeader').height();
    var toolboxContentMaxHeight = $(window).height() - toolboxTopHeight - toolboxHeaderHeight - 30;
    $('#myflow_tools > .toolsContent').css('max-height',toolboxContentMaxHeight);
}


$(function() {
    bindSaveBtn();
    $("#myflow_tools").show();
    calcToolboxContentMaxHeight();
});
