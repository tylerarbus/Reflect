export function entriesByDate(entries) {
  const byDate = {};

  entries.forEach((entry) => {
    const date = new Date(entry.created);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (byDate[year]) {
      if (byDate[year][month]) {
        byDate[year][month].push(entry.entry_id);
      } else {
        byDate[year][month] = [entry.entry_id];
      }
    } else {
      byDate[year] = {};
      byDate[year][month] = [entry.entry_id];
    }
  });
  return byDate;
}

export const toMonthName = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];


export function toDateString(sqlDate) {
  const date = new Date(sqlDate.replace(' ', 'T'));
  return date.toDateString();
}

export function monthByYear(sqlDate) {
  const date = new Date(sqlDate);
  return `${date.getFullYear()}${toMonthName[date.getMonth()]}`;
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
