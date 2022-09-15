const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();

// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);
// 初期表示
window.onload = function () {
  showProcess(today);
};

// 前の月表示
function prev() {
  showDate.setMonth(showDate.getMonth() - 1);
  showProcess(showDate);
}

// 次の月表示
function next() {
  showDate.setMonth(showDate.getMonth() + 1);
  showProcess(showDate);
}

function current() {
  showDate.setFullYear(today.getFullYear());
  showDate.setMonth(today.getMonth());
  showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  document.querySelector('.cal_header').innerHTML =
    "<span class='year'>" +
    year +
    '</span>' +
    "<span class='month_num'>" +
    (month + 1) +
    '</span>' +
    "<span class='month'>" +
    new Intl.DateTimeFormat('en', { month: 'long' }).format(date).slice(0, 3) +
    '</span>';
  let calendar = createProcess(year, month);
  document.querySelector('.calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
  // 曜日
  let calendar = "<table><tr class='dayOfWeek'>";
  for (let i = 0; i < week.length; i++) {
    calendar += '<th>' + week[i] + '</th>';
  }
  calendar += '</tr>';

  let count = 0;
  let startDayOfWeek = new Date(year, month, 1).getDay();
  let endDate = new Date(year, month + 1, 0).getDate();
  let lastMonthEndDate = new Date(year, month, 0).getDate();
  let row = Math.ceil((startDayOfWeek + endDate) / week.length);

  // 一行ずつ設定
  for (let i = 0; i < row; i++) {
    calendar += '<tr>';
    // 1colum単位で設定
    for (let j = 0; j < week.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + '</td>';
      } else if (count >= endDate) {
        // 最終行で最終日以降、翌月の日付を設定
        count++;
        calendar += "<td class='disabled'>" + (count - endDate) + '</td>';
      } else {
        // 当月の日付を曜日に照らし合わせて設定
        count++;
        if (year == today.getFullYear() && month == today.getMonth() && count == today.getDate()) {
          calendar += "<td class='today'>" + count + '</td>';
        } else {
          if (new Date(year, month, count).getDay() == 2) {
            // 火曜日
            calendar += "<td class='Tuesday'>" + count + '</td>';
          } else if (new Date(year, month, count).getDay() == 1 && (i == 1 || i == 3)) {
            // 第2,第4月曜日
            calendar += "<td class='dayOff'>" + count + '</td>';
          } else if (month + 1 == 1 && new Date(year, month, count).getDate() < 4) {
            // 正月休み
            calendar += "<td class='dayOff'>" + count + '</td>';
          } else {
            // それ以外の日
            calendar += '<td>' + count + '</td>';
          }
        }
      }
    }
    calendar += '</tr>';
  }
  return calendar;
}
