import * as d3 from 'd3';

const findMaxEmotion = (emotionObj) => {
  let maxEmotion = 'anger';

  Object.keys(emotionObj).forEach((emotion) => {
    if (emotionObj[emotion] > emotionObj[maxEmotion]) {
      maxEmotion = emotion;
    }
  });

  return maxEmotion;
};

export function getKeywordData(rawData) {
  const keywords = {};
  const keywordsWithEmotion = [];

  rawData.forEach((entry) => {
    entry.keywords.forEach((word) => {
      if (word.relevance > 0.8) {
        if (keywords[word.text]) {
          keywords[word.text].relevance += word.relevance;
          Object.keys(keywords[word.text].emotions).forEach((emotion) => {
            keywords[word.text].emotions[emotion] += entry.emotions[emotion];
          });
          keywords[word.text].sentiment = (keywords[word.text].sentiment + entry.sentiment) / 2;
        } else {
          keywords[word.text] = {};
          keywords[word.text].relevance = word.relevance;
          keywords[word.text].emotions = entry.emotions;
          keywords[word.text].sentiment = entry.sentiment;
        }
      }
    });
  });

  Object.keys(keywords).forEach((word) => {
    keywordsWithEmotion.push({
      word,
      r: keywords[word].relevance * 40,
      emotion: findMaxEmotion(keywords[word].emotions),
      sentiment: keywords[word].sentiment
    });
  });

  keywordsWithEmotion.sort((a, b) => b.r - a.r);
  return keywordsWithEmotion.slice(0, 30);
}

export const getEmotionCenters = (width) => {
  const emotionCenters = {
    anger: { left: 0, right: width * 0.2 },
    disgust: { left: width * 0.2, right: width * 0.4 },
    fear: { left: width * 0.4, right: width * 0.6 },
    joy: { left: width * 0.6, right: width * 0.8 },
    sadness: { left: width * 0.8, right: width }
  };

  return emotionCenters;
};

export const checkBoundariesX = (x, r, coordinates) => {
  const closerToLeft = Math.abs(x - coordinates.left) < Math.abs(x - coordinates.right);

  if (closerToLeft) {
    return Math.max(x, coordinates.left);
  }
  return Math.min(x, coordinates.right - r);
};

export const colorScale = d3.scaleLinear()
    .domain([-1, 1])
    .interpolate(d3.interpolateRgb)
    .range(['#00c3ff', '#ffff1c']);

export const upperCase = (word) => {
  const upperCased = word[0].toUpperCase();
  const letters = word.split('');
  letters.shift();
  letters.unshift(upperCased);
  return letters.join('');
};

