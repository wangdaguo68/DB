var area_a = new Array();
var area_b = new Array();
var area_c = new Array();
var area_d = new Array();
var option1 = new Array(40);
var option2 = new Array(40);
var option3 = new Array(40);
var refreshspeed = 600;//数据刷新速度初始默认10分钟
var changespeed = 60;//屏幕切换速度初始默认1分钟
var myChart1 = new Array(40);
var myChart2 = new Array(40);
var myChart3 = new Array(40);
var height = 150;//视窗高度
var width = 150;//视窗宽度
var fontsize = 2;//字体大小
var chartheight = 100;//仪表盘高度
var chartwidth = 150;//仪表盘宽度
var option = {
    series: [
        {
            name: '业务指标',
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            radius: 50,
            axisLine: {
                show: true,
                // 属性lineStyle控制线条样式
                lineStyle: {
                    width: 15,
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
                fontSize: 14,
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

    },
    SetCss: function () {
        height = $(window).height();
        width = $(window).width();
        //根据屏幕尺寸设置字体大小
        fontsize = width / 4096 * 4;
        //设置图表尺寸
        chartwidth = Math.round(width / 1980) * 150;
        chartheight = chartwidth / 3 * 4;
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
        dom_index = dom_index + '<img src="/images/bg1.jpg" />';
        dom_index = dom_index + '</div>';
        var dom_a = '<div id="area_a" class="hidden hundred-height">';
        dom_a = dom_a + '<div class="row row-margin">' + this.CreateBox(0) + this.CreateBox(1) + this.CreateBox(2) + this.CreateBox(3) + '</div>';
        dom_a = dom_a + '<div class="row row-margin">' + this.CreateBox(4) + this.CreateBox(5) + this.CreateBox(6) + this.CreateBox(7) + '</div>';
        dom_a = dom_a + '</div>';
        var dom_b = '<div id="area_b" class="hidden hundred-height">';
        dom_b = dom_b + '<div class="row row-margin">' + this.CreateBox(8) + this.CreateBox(9) + this.CreateBox(10) + this.CreateBox(11) + '</div>';
        dom_b = dom_b + '<div class="row row-margin">' + this.CreateBox(12) + this.CreateBox(13) + this.CreateBox(14) + this.CreateBox(15) + '</div>';
        dom_b = dom_b + '<div class="row row-margin">' + this.CreateBox(16) + this.CreateBox(17) + this.CreateBox(18) + '</div>';
        dom_b = dom_b + '</div>';
        var dom_c = '<div id="area_c" class="hidden hundred-height">';
        dom_c = dom_c + '<div class="row row-margin">' + this.CreateBox(19) + this.CreateBox(20) + this.CreateBox(21) + this.CreateBox(22) + '</div>';
        dom_c = dom_c + '<div class="row row-margin">' + this.CreateBox(23) + this.CreateBox(24) + this.CreateBox(25) + this.CreateBox(26) + '</div>';
        dom_c = dom_c + '<div class="row row-margin">' + this.CreateBox(27) + this.CreateBox(28) + this.CreateBox(29) + '</div>';
        dom_c = dom_c + '</div>';
        var dom_d = '<div id="area_d" class="hidden hundred-height">';
        dom_d = dom_d + '<div class="row row-margin">' + this.CreateBox(30) + this.CreateBox(31) + this.CreateBox(32) + this.CreateBox(33) + '</div>';
        dom_d = dom_d + '<div class="row row-margin">' + this.CreateBox(34) + this.CreateBox(35) + this.CreateBox(36) + this.CreateBox(37) + '</div>';
        dom_d = dom_d + '<div class="row row-margin">' + this.CreateBox(38) + this.CreateBox(39) + '</div>';
        dom_d = dom_d + '</div>';
        var dom = dom_index + dom_a + dom_b + dom_c + dom_d;
        $("#body").html(dom);
        for (var i = 0; i < 40; i++) {
            option1[i] = option;
            option2[i] = option;
            option3[i] = option;
            myChart1[i] = echarts.init(document.getElementById('main_' + i + '1'));
            myChart2[i] = echarts.init(document.getElementById('main_' + i + '2'));
            myChart3[i] = echarts.init(document.getElementById('main_' + i + '3'));
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

            }
        });
    },
    CreateBox: function (num) {
        var doc = '<div class="col-md-3 hundred-height">';
        doc = doc + '<div class="box">';
        doc = doc + '<div class="row" style="height:20%">';
        doc = doc + '<div class="col-md-1"> <img src="images/robot.ico" class="img-css" alt="" style ="height:' + height / 24 + 'px"/></div>';
        doc = doc + '<div class="col-md-5 p-name" id="name_' + num + '" style ="height:' + height / 24 + 'px;font-size:' + fontsize + 'em"></div>';
        doc = doc + '<div class="col-md-4 p-num" id="num_' + num + '" style ="height:' + height / 24 + 'px;font-size:' + fontsize + 'em"></div>';
        doc = doc + '</div>';
        doc = doc + '<div class="row" style="height:20%">';
        doc = doc + '<progress class="process" id="process_' + num + '" style ="height:' + height / 24 + 'px"></progress>';
        doc = doc + '<p class="process-p" id="processnum_' + num + '" style ="height:' + height / 24 + 'px;font-size:' + fontsize + 'em"></p>';
        doc = doc + '</div>';
        doc = doc + '<div class="row" style="height:60%">';
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
    },
    DataBind_A: function () {
        for (var i = 0; i < 8; i++) {
            option1[i].series[0].detail.formatter = 'OEEC {value}%';
            option1[i].series[0].data[0].value = area_a[i].oeec;
            myChart1[i].setOption(option1[i]);
            option2[i].series[0].detail.formatter = 'OEEP {value}%';
            option2[i].series[0].data[0].value = area_a[i].oeep;
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
    },
    DataBind_B: function () {
        for (var i = 8; i < 19; i++) {
            option1[i].series[0].detail.formatter = 'OEEC {value}%';
            option1[i].series[0].data[0].value = area_b[i - 8].oeec;
            myChart1[i].setOption(option1[i]);
            option2[i].series[0].detail.formatter = 'OEEP {value}%';
            option2[i].series[0].data[0].value = area_b[i - 8].oeep;
            myChart2[i].setOption(option2[i]);
            option3[i].series[0].detail.formatter = '良率 {value}%';
            option3[i].series[0].data[0].value = area_b[i - 8].badRate;
            myChart3[i].setOption(option3[i]);
            $("#name_" + i).html(area_b[i - 8].wcnName);
            $("#num_" + i).html(area_b[i - 8].docNum2);
            $("#process_" + i).attr("value", area_b[i - 8].factQty);
            $("#process_" + i).attr("max", area_b[i - 8].qty);
            $("#processnum_" + i).html(area_b[i - 8].factQty + "/" + area_b[i - 8].qty);
            $("#area_b").removeClass("hidden").addClass("active");
            $("#area_a").removeClass("acitve").addClass("hidden");
            $("#area_c").removeClass("acitve").addClass("hidden");
            $("#area_d").removeClass("acitve").addClass("hidden");
            $("#area_index").removeClass("active").addClass("hidden");
        }
    },
    DataBind_C: function () {
        for (var i = 19; i < 30; i++) {
            option1[i].series[0].detail.formatter = 'OEEC {value}%';
            option1[i].series[0].data[0].value = area_c[i - 19].oeec;
            myChart1[i].setOption(option1[i - 19]);
            option2[i].series[0].detail.formatter = 'OEEP {value}%';
            option2[i].series[0].data[0].value = area_c[i - 19].oeep;
            myChart2[i].setOption(option2[i]);
            option3[i].series[0].detail.formatter = '良率 {value}%';
            option3[i].series[0].data[0].value = area_c[i - 19].badRate;
            myChart3[i].setOption(option3[i]);
            $("#name_" + i).html(area_c[i - 19].wcnName);
            $("#num_" + i).html(area_c[i - 19].docNum2);
            $("#process_" + i).attr("value", area_c[i - 19].factQty);
            $("#process_" + i).attr("max", area_c[i - 19].qty);
            $("#processnum_" + i).html(area_c[i - 19].factQty + "/" + area_c[i - 19].qty);
            $("#area_c").removeClass("hidden").addClass("active");
            $("#area_b").removeClass("acitve").addClass("hidden");
            $("#area_a").removeClass("acitve").addClass("hidden");
            $("#area_d").removeClass("acitve").addClass("hidden");
            $("#area_index").removeClass("active").addClass("hidden");
        }
    },
    DataBind_D: function () {
        for (var i = 30; i < 40; i++) {
            option1[i].series[0].detail.formatter = 'OEEC {value}%';
            option1[i].series[0].data[0].value = area_d[i - 30].oeec;
            myChart1[i].setOption(option1[i - 30]);
            option2[i].series[0].detail.formatter = 'OEEP {value}%';
            option2[i].series[0].data[0].value = area_d[i - 30].oeep;
            myChart2[i].setOption(option2[i]);
            option3[i].series[0].detail.formatter = '良率 {value}%';
            option3[i].series[0].data[0].value = area_d[i - 30].badRate;
            myChart3[i].setOption(option3[i]);
            $("#name_" + i).html(area_d[i - 30].wcnName);
            $("#num_" + i).html(area_d[i - 30].docNum2);
            $("#process_" + i).attr("value", area_d[i - 30].factQty);
            $("#process_" + i).attr("max", area_d[i - 30].qty);
            $("#processnum_" + i).html(area_d[i - 30].factQty + "/" + area_d[i - 30].qty);
            $("#area_d").removeClass("hidden").addClass("active");
            $("#area_b").removeClass("acitve").addClass("hidden");
            $("#area_c").removeClass("acitve").addClass("hidden");
            $("#area_a").removeClass("acitve").addClass("hidden");
            $("#area_index").removeClass("active").addClass("hidden");
        }
    }
};