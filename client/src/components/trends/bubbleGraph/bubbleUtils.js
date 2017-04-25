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

export const getEmotionCenters = (width, height) => {
  const emotionCenters = {
    'anger': { left: 0, right: width * 0.2 },
    'disgust': { left: width * 0.2, right: width * 0.4 },
    'fear': { left: width * 0.4, right: width * 0.6 },
    'joy': { left: width * 0.6, right: width * 0.8},
    'sadness': { left: width * 0.8, right: width}
  }

  return emotionCenters;
}

export const checkBoundariesY = (y, height) => {
  const closerToBottom = height - x < x;

  if (closerToBottom) {
    return Math.min(24 + y, height);
  } else {
    return Math.max(24 + y, height + 24);
  }
}

export const checkBoundariesX = (x, coordinates) => {
  const closerToLeft = Math.abs(x - coordinates.left) < Math.abs(x - coordinates.right) ? true : false

  if (closerToLeft) {
    return Math.max(x, coordinates.left);
  } else {
    return Math.min(x, coordinates.right);
  }
}