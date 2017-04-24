export function getKeywordData(rawData, width, height) {
  const keywords = [];
  const emotions = ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness']

  rawData.forEach(entry => {
    entry.keywords.forEach(word => {
      if (word.relevance > 0.2) {
        //TODO: push this higher
        const impact = word.relevance * 39;
        const num = Math.floor(Math.random() * 4);
        keywords.push({
          word: word.text,
          x: Math.random() * width,
          y: Math.random() * height,
          r: impact,
          emotion: emotions[num]
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

const width = 960;
const height = 640;

export const emotionCenters = {
  'Anger': { x: width / 6, y: height / 2 },
  'Disgust': { x: width / 3, y: height / 2 },
  'Fear': { x: width / 2, y: height / 2 },
  'Joy': { x: (2 / 3) * width, y: height / 2 },
  'Sadness': { x: (5 / 6) * width, y: height / 2 }
}