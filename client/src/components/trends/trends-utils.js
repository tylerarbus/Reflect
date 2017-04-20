export default function transformData(rawData) {
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
