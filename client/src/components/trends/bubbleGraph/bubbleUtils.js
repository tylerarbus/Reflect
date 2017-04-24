export function getKeywordData(rawData, width, height) {
  const keywords = [];

  rawData.forEach(entry => {
    entry.keywords.forEach(word => {
      if (word.relevance > 0.2) {
        //TODO: push this higher
        const impact = word.relevance * 39;
        keywords.push({
          word: word.text,
          x: Math.random() * width,
          y: Math.random() * height,
          r: impact
          //TODO: add scaling and coordinates here 
        })
      }
    })
  })

  // sort desc to prevent occlusion of less relevant
  keywords.sort((a, b) => b.r - a.r);
  console.log('KEYWORD', keywords);
  console.log('width', width);
  return keywords;
} 