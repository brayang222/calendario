const actualYear = 2023;
const locale = "en-US"; //english

const weekDays = [...Array(7).keys()]
const intlWeekDay = new Intl.DateTimeFormat(locale, {weekday: 'long'})

const weekDaysNames = weekDays.map(weekDayIndex =>{
  const date = new Date(2023, 4, weekDayIndex + 1)
  const weekDayName = intlWeekDay.format(date)
 

  return weekDayName;

})

const months = [...Array(12).keys()];
const intl = new Intl.DateTimeFormat(locale, {month: 'long'})

const calendar = months.map(monthKey => {
  const monthName = intl.format(new Date(actualYear, monthKey))

  const nextMonthIndex = monthKey + 1;
  const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate();

  const startsOn = new Date(actualYear, monthKey, 1).getDay();

  return {
    monthName,
    daysOfMonth,
    startsOn,
    nextMonthIndex
  }
})

const html = calendar.map(({daysOfMonth, monthName, startsOn, nextMonthIndex}) =>{
  const days = [...Array(daysOfMonth).keys()];
  const colorDay = `style='background-color: rgba(255, 0, 0, 0.7);'`;
  const actualDay = new Date().getDate();
  const actualMonth = new Date().getMonth();

  const firstDayAtt =`class='first-day' style='--first-day-start: ${startsOn} '`
  const renderedDays = days.map((day, index)=> `<li ${index === 0 ? firstDayAtt : ''} ${nextMonthIndex === actualMonth + 1 && index === actualDay - 1? colorDay : ''} > ${day + 1} </li>`).join('');
  const renderedWeek = weekDaysNames.map(weekDayName => `<li class="day-name"> ${weekDayName} </li>`).join('');
  console.log(renderedDays)
  return `<h1>${monthName} ${actualYear} </h1><ol> ${renderedWeek} ${renderedDays} </ol> `
}).join('');

document.querySelector('div').innerHTML = html