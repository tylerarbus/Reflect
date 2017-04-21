import * as d3 from 'd3';

const numDaysBetween = (d1, d2) => {
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / (1000 * 60 * 60 * 24);
};

export function transformWeekView(rawData) {
  let transformedData = [];
  for (let i = 0; i < 7; i += 1) {
    transformedData.push({
      sentiment: 0,
      day: i,
      counter: 0
    });
  }

  rawData.forEach((entry) => {
    const entryDay = new Date(entry.created).getDay();
    transformedData[entryDay].sentiment += entry.sentiment;
    transformedData[entryDay].counter += 1;
  });

  transformedData = transformedData.map((entry) => {
    const newEntry = entry;
    if (entry.counter === 0) {
      newEntry.sentiment = 0;
    } else {
      newEntry.sentiment /= entry.counter;
    }
    return newEntry;
  });
  return transformedData;
}

export function filterWeekView(filter, rawData) {
  const today = new Date();
  const filteredData = rawData.filter((entry) => {
    const entryDate = new Date(entry.created);
    if (filter === '1') {
      return numDaysBetween(today, entryDate) <= 7;
    } else if (filter === '2') {
      return numDaysBetween(today, entryDate) <= 30;
    }
    return true;
  });
  return filteredData;
}

export function transformMonthView(rawData, filter) {
  const month = parseInt(filter.split(',')[0], 10);
  const year = parseInt(filter.split(',')[1], 10);
  const daysInMonth = Math.floor(numDaysBetween(new Date(year, month), new Date(year, month + 1)));
  const arrayOfDays = [];
  for (let i = 1; i <= daysInMonth; i += 1) {
    arrayOfDays.push({
      day: i,
      sentiment: 0
    });
  }
  rawData.forEach((entry) => {
    const entryDay = new Date(entry.created).getDate();
    arrayOfDays[entryDay - 1].sentiment = entry.sentiment;
  });
  return arrayOfDays;
}

export function filterMonthView(filter, rawData) {
  const filterSplit = filter.split(',');
  return rawData.filter((entry) => {
    const entryDate = new Date(entry.created);
    return entryDate.getMonth().toString() === filterSplit[0] &&
      entryDate.getFullYear().toString() === filterSplit[1];
  });
}

export function generateArrayOfMonths(rawData) {
  const months = {};
  rawData.forEach((entry) => {
    const tempMonth = new Date(entry.created).getMonth();
    const tempYear = new Date(entry.created).getFullYear();
    months[tempYear] = months[tempYear] || [];
    months[tempYear][tempMonth] = true;
  });

  const parseTime = d3.timeFormat('%B %Y');
  const formattedMonths = [];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear().toString();

  Object.keys(months).sort().forEach((year) => {
    months[year].forEach((val, month) => {
      let formatted;
      if (year === currentYear && month === currentMonth) {
        formatted = 'Current Month';
      } else {
        formatted = parseTime(new Date(year, month));
      }
      formattedMonths.unshift([formatted, [month, year]]);
    });
  });
  return formattedMonths;
}
