import * as d3 from 'd3';

export function getKeywordData(rawData, width, height) {
  const keywords = {};
  const keywordsWithEmotion = [];

  rawData.forEach(entry => {
    entry.keywords.forEach(word => {
      if (word.relevance > 0.8) {
        if (keywords[word.text]) {
          keywords[word.text].relevance += word.relevance;
          for (var emotion in keywords[word.text].emotions) {
            keywords[word.text].emotions[emotion] += entry.emotions[emotion];
          }
          keywords[word.text].sentiment = (keywords[word.text].sentiment + entry.sentiment) / 2;
        } else {
          keywords[word.text] = {};
          keywords[word.text].relevance = word.relevance;
          keywords[word.text].emotions = entry.emotions;
          keywords[word.text].sentiment = entry.sentiment;
        }
      }
    })
  })

  Object.keys(keywords).forEach(word => {
    keywordsWithEmotion.push({
      word: word,
      r: keywords[word].relevance * 40,
      emotion: findMaxEmotion(keywords[word].emotions),
      sentiment: keywords[word].sentiment,
    })
  })

  keywordsWithEmotion.sort((a, b) => b.r - a.r);
  return keywordsWithEmotion.slice(0, 50);
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

export const checkBoundariesX = (x, r, coordinates) => {
  const closerToLeft = Math.abs(x - coordinates.left) < Math.abs(x - coordinates.right) ? true : false

  if (closerToLeft) {
    return Math.max(x, coordinates.left);
  } else {
    return Math.min(x, coordinates.right - r);
  }
}

export const colorScale = d3.scaleLinear()
    .domain([-1, 1])
    .interpolate(d3.interpolateRgb)
    .range(['#00c3ff','#ffff1c']);

export const upperCase = (word) => {
  const upperCased = word[0].toUpperCase();
  let letters = word.split('');
  letters.shift();
  letters.unshift(upperCased);
  return letters.join('');
}

