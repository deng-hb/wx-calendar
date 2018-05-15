//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },
  onLoad: function (options) {
    this.toMonth();
  },
  // 
  tapday: function(e){
    console.log(e);
    var data = e.target.dataset;
    wx.showToast({
      title: data.year + "年" + data.month + "月" + data.day + "日",
      icon: "none"
    })
  },
  preMonth: function () {
    this.addMonth(-1);
  },
  nextMonth: function () {
    this.addMonth(1);
  },
  toMonth: function () {
    var date = new Date();
    this.setData({ month: { current: { year: date.getFullYear(), month: date.getMonth() + 1 } } });
    this.loadDays();
  },
  addMonth: function (m) {

    var year = this.data.month.current.year;
    var month = this.data.month.current.month;
    var date = new Date(year + "/" + month + "/1");
    date.setMonth(date.getMonth() + m)

    this.setData({ month: { current: { year: date.getFullYear(), month: date.getMonth() + 1 } } });
    this.loadDays();
  },
  loadDays: function () {
    var year = this.data.month.current.year;
    var month = this.data.month.current.month;
    var date = new Date(year + "/" + month + "/1");

    // 日期加指定天数
    var addDay = function (date, day) {
      var time = date.getTime();
      time = time + day * 24 * 60 * 60 * 1000;
      return new Date(time);
    };

    var buildDay = function (date) {
      var yyyy = date.getFullYear();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();

      var style = (mm > month || mm < month) ? "background:#efefef;" : "";

      var week = date.getDay();
      style += (0 == week || 6 == week) ? 'color:red;' : '';

      var now = new Date();
      var today = new Date(now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate());

      var c = new Date(yyyy + "/" + mm + "/" + dd);
      if (today.getTime() == c.getTime()) {
        style += "border:1px red solid;";
      }

      return {
        year: yyyy,
        month: mm,
        day: dd,
        week: week,
        style: style
      };
    };

    var days = [];

    // 获取本月第一天是星期几，每月显示42天
    var week = date.getDay();
    var start = -(0 == week ? 7 : week);

    for (var i = start; i < 42 + start; i++) {
      var day = addDay(date, i);
      days.push(buildDay(day));
    }
    this.setData({ month: { days: days, current: this.data.month.current } });

  }
})