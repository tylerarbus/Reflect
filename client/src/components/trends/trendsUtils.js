import * as d3 from 'd3';

export function transformData(rawData) {
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

export function filterData(filter, rawData) {
  const numDaysBetween = (d1, d2) => {
    const diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };
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

  Object.keys(months).sort().reverse().forEach((year) => {
    months[year].forEach((val, month) => {
      let formatted;
      if (year === currentYear && month === currentMonth) {
        formatted = 'Current Month';
      } else {
        formatted = parseTime(new Date(year, month));
      }
      formattedMonths.push([formatted, [month, year]]);
    });
  });
  return formattedMonths;
}
