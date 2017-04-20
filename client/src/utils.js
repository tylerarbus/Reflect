export function getMonthData(entries) {
  const months = {};

  entries.forEach((entry) => {
    const month = entry.created.split('-')[1];
    if (months[month]) {
      months[month].push(entry.entry_id);
    } else {
      months[month] = [entry.entry_id];
    }
  });

  return months;
}

export const monthToEnglish = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

export const toMonthName = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];


export function toDateString(sqlDate) {
  const date = new Date(sqlDate.replace(' ', 'T'));
  return date.toDateString();
}

export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}
