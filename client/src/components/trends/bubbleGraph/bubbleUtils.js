export function getKeywordData(rawData, width, height) {
  const keywords = {};
  const emotions = ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness'];
  const finalKeywords = [];
  const test = [];

  rawData.forEach(entry => {
    entry.keywords.forEach(word => {
      if (word.relevance > 0.5) {
        //TODO: push this higher
        const impact = word.relevance * 38;
        const num = Math.floor(Math.random() * 5);
        if (keywords[word.text]) {
          keywords[word.text].relevance += word.relevance;
          for (var emotion in keywords[word.text].emotions) {
            keywords[word.text].emotions[emotion] += entry.emotions[emotion];
          }
        } else {
          keywords[word.text] = {};
          keywords[word.text].relevance = word.relevance;
          keywords[word.text].emotions = entry.emotions;
        }
        test.push({
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
  Object.keys(keywords).forEach(word => {
    finalKeywords.push({
      word: word,
      // x: Math.random() * width,
      // y: Math.random() * height,
      r: keywords[word].relevance * 40,
      emotion: findMaxEmotion(keywords[word].emotions)
    })
  })

  // sort desc to prevent occlusion of less relevant
  finalKeywords.sort((a, b) => b.r - a.r);
  return finalKeywords.slice(0, 50);
  //return test.slice(0, 50);
}

const findMaxEmotion = (emotionObj) => {
  let maxEmotion = 'anger';

  for (var emotion in emotionObj) {
    if (emotionObj[emotion] > emotionObj[maxEmotion]) {
      maxEmotion = emotion;
    }
  }

  return maxEmotion;
}

// const width = 960;
// const height = 640;

export const emotions = ['anger', 'disgust', 'fear', 'joy', 'sadness'];

export const emotionCenters = (height, width, emotion, axis) => {
  const emotionCoordinates = {
    'anger': { x: width / 5, y: height / 2 },
    'disgust': { x: width / 3, y: height / 2 },
    'fear': { x: width / 2, y: height / 2 },
    'joy': { x: (2 / 3) * width, y: height / 2 },
    'sadness': { x: (4 / 5) * width, y: height / 2 }
  }
  console.log('emotion', emotion)

  return emotionCoordinates[emotion][axis];
}