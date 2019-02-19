var x = 350;
var y = 350;
var z = 600;
var common = 0;
var exception = 0;
var stop = 0;
var area_a = new Array();
var area_b = new Array();
var area_c = new Array();
var area_d = new Array();
var option1 = new Array(40);
var option2 = new Array(40);
var option3 = new Array(40);
var data_day = new Array();
var data_week = new Array();
var data_month = new Array();
var day_axis = new Array();
var week_axis = new Array();
var month_axis = new Array();

var day_yield = new Array();
var week_yield = new Array();
var month_yield = new Array();

var day_pep = new Array();
var week_pep = new Array();
var month_pep = new Array();

var day_pec = new Array();
var week_pec = new Array();
var month_pec = new Array();

var day_performance = new Array();
var week_performance = new Array();
var month_performance = new Array();

var day_oeec = new Array();
var week_oeec = new Array();
var month_oeec = new Array();

var day_oeep = new Array();
var week_oeep = new Array();
var month_oeep = new Array();

var refreshspeed = 600;//数据刷新速度初始默认10分钟
var changespeed = 60;//屏幕切换速度初始默认1分钟
var myChart1 = new Array(40);
var myChart2 = new Array(40);
var myChart3 = new Array(40);

var myChartx = new Array(6);
var myCharty = new Array(6);
var myChartz = new Array(6);

var height = 150;//视窗高度
var width = 150;//视窗宽度
var fontsize = 2;//字体大小
var chartheight = 60;//仪表盘高度
var chartwidth = 70;//仪表盘宽度
var chartfontsize = 10;
var option_temp = {
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    legend: {
        data: ['良率', '生产效率P', '生产效率C', '绩效'],
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    },
    xAxis: [
        {
            type: 'category',
            splitLine: { show: false },//去除网格线
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '趋势',
            axisLabel: {
                formatter: '{value}',
                show: true,
                textStyle: {
                    color: '#fff'
                }
            },
            splitLine: { show: false },//去除网格线
            nameTextStyle: {
                color: '#fff'
            }
        }
    ],
    series: [

        {
            name: '良率',
            type: 'line',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
                normal: {
                    color: 'red',
                    label: { show: true }
                }
            },
        },
        {
            name: '生产效率P',
            type: 'line',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
                normal: {
                    color: 'blue',
                    label: { show: true }
                }
            },
        },
        {
            name: '生产效率C',
            type: 'line',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
                normal: {
                    color: 'yellow',
                    label: { show: true }
                }
            },
        },
        {
            name: '绩效',
            type: 'line',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
                normal: {
                    color: 'pink',
                    label: { show: true }
                }
            },
        }
    ]
};
var option_oee = {
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    legend: {
        data: ['OEEC', 'OEEP'],
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    },
    xAxis: [
        {
            type: 'category',
            splitLine: { show: false },//去除网格线
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff'
                }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '趋势',
            axisLabel: {
                formatter: '{value}',
                show: true,
                textStyle: {
                    color: '#fff'
                }
            },
            splitLine: { show: false },//去除网格线
            nameTextStyle: {
                color: '#fff'
            }
        }
    ],
    series: [

        {
            name: 'OEEC',
            type: 'line',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
                normal: {
                    color: 'red',
                    label: { show: true }
                }
            },
        },
        {
            name: 'OEEP',
            type: 'line',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
                normal: {
                    color: 'orange',
                    label: { show: true }
                }
            },
        }
    ]
};
var option = {
    series: [
        {
            name: '业务指标',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            radius: 30,
            axisLine: {
                show: true,
                // 属性lineStyle控制线条样式
                lineStyle: {
                    width: 10,
                    color: [
                        [0.6, "#DA462C"],//0-60%处的颜色
                        [0.7, "#FF9618"],//60%-70%处的颜色
                        [0.9, "#FFED44"],//70%-90%处的颜色
                        [1, "#20AE51"]//90%-100%处的颜色
                    ]
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            pointer: {
                length: '50%',
                width: 4,
                color: 'auto'
            },
            detail: {
                //offsetCenter: [0, '-120%'],
                fontSize: chartfontsize,
                formatter: ''
            },
            data: [
                { value: 0 }
            ]
        }
    ]
};
var App = {
    Init: function () {
        //根据屏幕尺寸调整样式
        this.SetCss();
        //初始化数据刷新速度，屏幕切换速度
        this.InitSpeed();
        //初始化所有Dom
        this.InitDom();
        //初始化数据
        this.InitData();
        //区域A数据绑定
        this.ShowIndex();
        this.DataBind_A();
        //this.ShowReport();

    },
    SetCss: function () {
        height = $(window).height();
        width = $(window).width();
        console.log(window.screen.width + "," + window.screen.height);
        console.log(width + "," + height);
        //根据屏幕尺寸设置字体大小
        fontsize = width / 3840 * 4;
        if (width > 1360) {
            //设置图表尺寸
            chartwidth = Math.round(width / 1980) * 150;
            chartheight = chartwidth / 3 * 4;
            chartfontsize = 15;
            x = 500;
            y = 400;
            z = 1000;
        }
    },
    /**
     * 初始化速度
     * */
    InitSpeed: function () {
        $.ajax({
            url: '/Home/GetSpeed',
            type: 'Get',
            async: false,
            dataType: 'Json',
            success: function (data) {
                if (data !== null && data !== undefined) {
                    refreshspeed = data.dataRefreshSpeed;
                    changespeed = data.screenSpeed;
                }
            }
        });
    },
    /**
     * 初始化Dom
     * */
    InitDom: function () {
        var dom_index = '<div id="area_index" class="active hundred-height">';
        dom_index = dom_index + '<img src="/images/bg1.png" />';
        dom_index = dom_index + '</div>';
        var dom_report = '<div id="area_report" class="active hundred-height">';
        for (var i = 0; i < 2; i++) {
            dom_report += '<div class="row row-report">';
            dom_report += '<div id="main_' + i + 'x' + '" class="chart-css" style ="height:' + 350 + 'px;width:' + x + 'px"></div>';
            dom_report += '<div id="main_' + i + 'z' + '" class="chart-css" style ="height:' + 350 + 'px;width:' + z + 'px"></div>';
            dom_report += '</div>';
        }
        dom_report += '<p style="color:red;text-align:center;font-size:22px" id="status"></p>';
        dom_report = dom_report + '</div>';
        var dom_a = '<div id="area_a" class="hidden hundred-height">';
        dom_a = dom_a + '<div class="row row-margin">' + this.CreateBox(0) + this.CreateBox(1) + this.CreateBox(2) + this.CreateBox(3) + '</div>';
        dom_a = dom_a + '<div class="row row-margin">' + this.CreateBox(4) + this.CreateBox(5) + this.CreateBox(6) + this.CreateBox(7) + '</div>';
        dom_a = dom_a + '<div class="row row-margin">' + this.CreateBox(8) + this.CreateBox(9) + this.CreateBox(10) + '</div>';
        dom_a = dom_a + '</div>';
        var dom_b = '<div id="area_b" class="hidden hundred-height">';
        dom_b = dom_b + '<div class="row row-margin">' + this.CreateBox(11) + this.CreateBox(12) + this.CreateBox(13) + this.CreateBox(14) + '</div>';
        dom_b = dom_b + '<div class="row row-margin">' + this.CreateBox(15) + this.CreateBox(16) + this.CreateBox(17) + this.CreateBox(18) + '</div>';
        dom_b = dom_b + '<div class="row row-margin">' + this.CreateBox(19) + this.CreateBox(20) + this.CreateBox(21) + '</div>';
        dom_b = dom_b + '</div>';
        var dom_c = '<div id="area_c" class="hidden hundred-height">';
        dom_c = dom_c + '<div class="row row-margin">' + this.CreateBox(22) + this.CreateBox(23) + this.CreateBox(24) + this.CreateBox(25) + '</div>';
        dom_c = dom_c + '<div class="row row-margin">' + this.CreateBox(26) + this.CreateBox(27) + this.CreateBox(28) + this.CreateBox(29) + '</div>';
        dom_c = dom_c + '<div class="row row-margin">' + this.CreateBox(30) + this.CreateBox(31) + this.CreateBox(32) + '</div>';
        dom_c = dom_c + '</div>';
        var dom_d = '<div id="area_d" class="hidden hundred-height">';
        dom_d = dom_d + '<div class="row row-margin">' + this.CreateBox(33) + this.CreateBox(34) + this.CreateBox(35) + this.CreateBox(36) + '</div>';
        dom_d = dom_d + '<div class="row row-margin">' + this.CreateBox(37) + this.CreateBox(38) + this.CreateBox(39) + this.CreateBox(40) + '</div>';
        dom_d = dom_d + '<div class="row row-margin">' + this.CreateBox(41) + this.CreateBox(42) + this.CreateBox(43) + '</div>';
        dom_d = dom_d + '</div>';
        var dom = dom_index + dom_report + dom_a + dom_b + dom_c + dom_d;
        $("#body").html(dom);
        for (var i = 0; i < 44; i++) {
            option1[i] = option;
            option2[i] = option;
            option3[i] = option;
            myChart1[i] = echarts.init(document.getElementById('main_' + i + '1'));
            myChart2[i] = echarts.init(document.getElementById('main_' + i + '2'));
            myChart3[i] = echarts.init(document.getElementById('main_' + i + '3'));
        }
        for (var i = 0; i < 2; i++) {
            myChartx[i] = echarts.init(document.getElementById('main_' + i + 'x'));
            myChartz[i] = echarts.init(document.getElementById('main_' + i + 'z'));
        }
    },
    /**
     * 初始化数据
     * */
    InitData: function () {
        $.ajax({
            url: '/Home/GetAreas',
            type: 'Get',
            dataType: 'Json',
            async: false,
            success: function (data) {
                area_a = data.a;
                area_b = data.b;
                area_c = data.c;
                area_d = data.d;
                common = data.common;
                exception = data.exception;
                stop = data.stop;
                data_day = data.report.results_Day;
                data_week = data.report.results_Week;
                data_month = data.report.results_Month;
                $("#status").html('正常运行：' + common + '台     异常：' + exception + '台       停机：' + stop + '台');
                for (x in data_day) {
                    day_yield.push(data_day[x].yield);
                    day_axis.push(data_day[x].date);
                    day_pep.push(data_day[x].p_Efficiency_P);
                    day_pec.push(data_day[x].p_Efficiency_C);
                    day_performance.push(data_day[x].performance);
                    day_oeec.push(data_day[x].oeec);
                    day_oeep.push(data_day[x].oeep);
                }
                for (x in data_week) {
                    week_axis.push(data_week[x].date);
                    week_yield.push(data_week[x].yield);
                    week_pep.push(data_week[x].p_Efficiency_P);
                    week_pec.push(data_week[x].p_Efficiency_C);
                    week_performance.push(data_week[x].performance);
                    week_oeec.push(data_week[x].oeec);
                    week_oeep.push(data_week[x].oeep);
                }
                for (x in data_month) {
                    month_axis.push(data_month[x].date);
                    month_yield.push(data_month[x].yield);
                    month_pep.push(data_month[x].p_Efficiency_P);
                    month_pec.push(data_month[x].p_Efficiency_C);
                    month_performance.push(data_month[x].performance);
                    month_oeec.push(data_month[x].oeec);
                    month_oeep.push(data_month[x].oeep);
                }
            }
        });
    },
    CreateBox: function (num) {
        var doc = '<div class="col-xs-3 hundred-height">';
        doc = doc + '<div class="box">';
        doc = doc + '<div class="row" style="height:15%">';
        doc = doc + '<div class="col-xs-1"> <img src="images/robot.ico" class="img-css" alt="" style ="height:' + height / 23 + 'px"/></div>';
        doc = doc + '<div class="col-xs-5 p-name" id="name_' + num + '" style ="height:' + height / 23 + 'px;font-size:' + fontsize + 'em"></div>';
        doc = doc + '<div class="col-xs-4 p-num" id="num_' + num + '" style ="height:' + height / 23 + 'px;font-size:' + fontsize + 'em"></div>';
        doc = doc + '</div>';
        doc = doc + '<div class="row" style="height:15%">';
        doc = doc + '<progress class="process" id="process_' + num + '" style ="height:' + height / 23 + 'px"></progress>';
        doc = doc + '<p class="process-p" id="processnum_' + num + '" style ="height:' + height / 23 + 'px;font-size:' + fontsize + 'em"></p>';
        doc = doc + '</div>';
        doc = doc + '<div class="row" style="height:70%">';
        doc = doc + '<div id="main_' + num + '1" class="chart-css" style ="height:' + chartheight + 'px;width:' + chartwidth + 'px;margin-left:15px"></div>';
        doc = doc + '<div id="main_' + num + '2" class="chart-css" style ="height:' + chartheight + 'px;width:' + chartwidth + 'px"></div>';
        doc = doc + '<div id="main_' + num + '3" class="chart-css" style ="height:' + chartheight + 'px;width:' + chartwidth + 'px"></div>';
        doc = doc + '</div>';
        doc = doc + '</div>';
        doc = doc + '</div>';
        return doc;
    },
    ShowIndex: function () {
        $("#area_index").removeClass("hidden").addClass("active");
        $("#area_a").removeClass("acitve").addClass("hidden");
        $("#area_b").removeClass("acitve").addClass("hidden");
        $("#area_c").removeClass("acitve").addClass("hidden");
        $("#area_d").removeClass("acitve").addClass("hidden");
        $("#area_report").removeClass("acitve").addClass("hidden");
    },
    ShowReport: function () {


        option_temp.xAxis[0].data = day_axis;
        option_temp.yAxis[0].name = '日趋势';
        option_temp.series[0].data = day_yield;
        option_temp.series[1].data = day_pep;
        option_temp.series[2].data = day_pec;
        option_temp.series[3].data = day_performance;
        //option_temp.series[0].name = name;
        //option_temp.legend.data[0] = name;
        //option_temp.series[0].itemStyle.normal.color = 'blue';
        myChartx[0].setOption(option_temp);

        option_temp.xAxis[0].data = month_axis;
        option_temp.yAxis[0].name = '月趋势';
        option_temp.series[0].data = month_yield;
        option_temp.series[1].data = month_pep;
        option_temp.series[2].data = month_pec;
        option_temp.series[3].data = month_performance;
        myChartz[0].setOption(option_temp);

        option_oee.xAxis[0].data = day_axis;
        option_oee.yAxis[0].name = '日趋势';
        option_oee.series[0].data = day_oeec;
        option_oee.series[1].data = day_oeep;
        myChartx[1].setOption(option_oee);


        option_oee.xAxis[0].data = month_axis;
        option_oee.yAxis[0].name = '月趋势';
        option_oee.series[0].data = month_oeec;
        option_oee.series[1].data = month_oeep;
        myChartz[1].setOption(option_oee);



        $("#area_report").removeClass("hidden").addClass("active");
        $("#area_index").removeClass("acitve").addClass("hidden");
        $("#area_a").removeClass("acitve").addClass("hidden");
        $("#area_b").removeClass("acitve").addClass("hidden");
        $("#area_c").removeClass("acitve").addClass("hidden");
        $("#area_d").removeClass("acitve").addClass("hidden");
    },
    DataBind_A: function () {
        for (var i = 0; i < 11; i++) {
            option1[i].series[0].detail.formatter = 'OEEC {value}%';
            option1[i].series[0].data[0].value = parseInt(area_a[i].oeec * 100);
            myChart1[i].setOption(option1[i]);
            option2[i].series[0].detail.formatter = 'OEEP {value}%';
            option2[i].series[0].data[0].value = parseInt(area_a[i].oeep * 100);
            myChart2[i].setOption(option2[i]);
            option3[i].series[0].detail.formatter = '良率 {value}%';
            option3[i].series[0].data[0].value = area_a[i].badRate;
            myChart3[i].setOption(option3[i]);
            $("#name_" + i).html(area_a[i].wcnName);
            $("#num_" + i).html(area_a[i].docNum2);
            $("#process_" + i).attr("value", area_a[i].factQty);
            $("#process_" + i).attr("max", area_a[i].qty);
            $("#processnum_" + i).html(area_a[i].factQty + "/" + area_a[i].qty);
        }
        $("#area_a").removeClass("hidden").addClass("active");
        $("#area_b").removeClass("acitve").addClass("hidden");
        $("#area_c").removeClass("acitve").addClass("hidden");
        $("#area_d").removeClass("acitve").addClass("hidden");
        $("#area_index").removeClass("active").addClass("hidden");
        $("#area_report").removeClass("acitve").addClass("hidden");
    },
    DataBind_B: function () {
        for (var i = 11; i < 22; i++) {
            option1[i].series[0].detail.formatter = 'OEEC {value}%';
            option1[i].series[0].data[0].value = parseInt(area_b[i - 11].oeec * 100);
            myChart1[i].setOption(option1[i]);
            option2[i].series[0].detail.formatter = 'OEEP {value}%';
            option2[i].series[0].data[0].value = parseInt(area_b[i - 11].oeep * 100);
            myChart2[i].setOption(option2[i]);
            option3[i].series[0].detail.formatter = '良率 {value}%';
            option3[i].series[0].data[0].value = area_b[i - 11].badRate;
            myChart3[i].setOption(option3[i]);
            $("#name_" + i).html(area_b[i - 11].wcnName);
            $("#num_" + i).html(area_b[i - 11].docNum2);
            $("#process_" + i).attr("value", area_b[i - 11].factQty);
            $("#process_" + i).attr("max", area_b[i - 11].qty);
            $("#processnum_" + i).html(area_b[i - 11].factQty + "/" + area_b[i - 11].qty);
            $("#area_b").removeClass("hidden").addClass("active");
            $("#area_a").removeClass("acitve").addClass("hidden");
            $("#area_c").removeClass("acitve").addClass("hidden");
            $("#area_d").removeClass("acitve").addClass("hidden");
            $("#area_index").removeClass("active").addClass("hidden");
            $("#area_report").removeClass("acitve").addClass("hidden");
        }
    },
    DataBind_C: function () {
        for (var i = 22; i < 33; i++) {
            option1[i].series[0].detail.formatter = 'OEEC {value}%';
            option1[i].series[0].data[0].value = parseInt(area_c[i - 22].oeec * 100);
            myChart1[i].setOption(option1[i - 22]);
            option2[i].series[0].detail.formatter = 'OEEP {value}%';
            option2[i].series[0].data[0].value = parseInt(area_c[i - 22].oeep * 100);
            myChart2[i].setOption(option2[i]);
            option3[i].series[0].detail.formatter = '良率 {value}%';
            option3[i].series[0].data[0].value = area_c[i - 22].badRate;
            myChart3[i].setOption(option3[i]);
            $("#name_" + i).html(area_c[i - 22].wcnName);
            $("#num_" + i).html(area_c[i - 22].docNum2);
            $("#process_" + i).attr("value", area_c[i - 22].factQty);
            $("#process_" + i).attr("max", area_c[i - 22].qty);
            $("#processnum_" + i).html(area_c[i - 22].factQty + "/" + area_c[i - 22].qty);
            $("#area_c").removeClass("hidden").addClass("active");
            $("#area_b").removeClass("acitve").addClass("hidden");
            $("#area_a").removeClass("acitve").addClass("hidden");
            $("#area_d").removeClass("acitve").addClass("hidden");
            $("#area_index").removeClass("active").addClass("hidden");
            $("#area_report").removeClass("acitve").addClass("hidden");
        }
    },
    DataBind_D: function () {
        for (var i = 33; i < 44; i++) {
            option1[i].series[0].detail.formatter = 'OEEC {value}%';
            option1[i].series[0].data[0].value = parseInt(area_d[i - 33].oeec * 100);
            myChart1[i].setOption(option1[i - 33]);
            option2[i].series[0].detail.formatter = 'OEEP {value}%';
            option2[i].series[0].data[0].value = parseInt(area_d[i - 33].oeep * 100);
            myChart2[i].setOption(option2[i]);
            option3[i].series[0].detail.formatter = '良率 {value}%';
            option3[i].series[0].data[0].value = area_d[i - 33].badRate;
            myChart3[i].setOption(option3[i]);
            $("#name_" + i).html(area_d[i - 33].wcnName);
            $("#num_" + i).html(area_d[i - 33].docNum2);
            $("#process_" + i).attr("value", area_d[i - 33].factQty);
            $("#process_" + i).attr("max", area_d[i - 33].qty);
            $("#processnum_" + i).html(area_d[i - 33].factQty + "/" + area_d[i - 33].qty);
            $("#area_d").removeClass("hidden").addClass("active");
            $("#area_b").removeClass("acitve").addClass("hidden");
            $("#area_c").removeClass("acitve").addClass("hidden");
            $("#area_a").removeClass("acitve").addClass("hidden");
            $("#area_index").removeClass("active").addClass("hidden");
            $("#area_report").removeClass("acitve").addClass("hidden");
        }
    }
};