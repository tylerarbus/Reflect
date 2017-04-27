# Reflective

Reflective is a simple, yet powerful, journaling app. Here's how it works:

1. :phone: "How's your day going?" - every day you'll receive a 60 second phone call from the app. This is your chance to talk about whatever's on your mind.

2. :green_book: Reflective will download a recording of your call and convert it into text. The next time you log into the web app, you'll be able to see (and listen to!) past journal entries.

3. :crystal_ball: Reflective's *insights* feature will run analysis on your entries to glean insights into sentiment, emotion, and keywords. It will then visualize this data to show how your mood changes over time, and how topics/keywords mentioned in your entries relate to your emotional state.

## Table of Contents

1. [Features](#zap-features)
    1. [Calling](#calling)
    1. [Journal](#journal)
    1. [Insights](#insights)
1. [Team](#busts_in_silhouette-team)
1. [Tech Stack](#package-tech-stack)
    1. [Front-End](#front-end)
    1. [Back-End](#back-end)
    1. [Development Tools](#development-tools)
    1. [Deployment](#deployment)
1. [Usage](#runner-usage)
1. [Requirements](#o-requirements)
    1. [Technologies](#technologies)
    1. [APIs](#apis)
1. [Development](#rocket-development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Testing](#testing)
    1. [Tasks](#tasks)
1. [Contributing](#speech_balloon-contributing)

## :zap: Features

### Calling

[Insert screenshots here]

TBD - Discuss scheduled calling feature and call me now.

### Journal

[Insert screenshots here]

TBD - Discuss entries view, including timeline and search.

### Insights

[Insert screenshots here]

TBD - Discuss insights feature.

## :busts_in_silhouette: Team

We're a team of full-stack engineers who are passionate about creating beautiful, fast and scalable web applications. Say hello - we'd love to chat!

  - [Jason Chang](https://github.com/j-chang)
  - [Scott Clendening](https://github.com/smclendening)
  - [Terence Tham](https://github.com/terencetmac)
  - [Tyler Arbus](https://github.com/tylerarbus)

## :package: Tech Stack

### Front-End

1. React
2. Redux
3. React Router
4. D3

### Back-End

1. Node
2. Express
3. PostgreSQL
4. Kue
5. JWT & Bcrypt
6. Cron
7. Elasticsearch

### Development Tools

1. Webpack
2. React Hot Reloader
3. Jest
4. Enzyme
5. Supertest
6. ESLint

#### Deployment

1. Heroku
2. AWS Lambda
3. CircleCI

## :runner: Usage

Run the following script from within the root directory:

```sh
npm run dev
```

Note: for the application to run correctly, you'll need to configure the following environment variables (these should be saved in a .env file in the root directory)

```sh
JWT_SECRET= [TBD]
TWILIO_SID= [TBD]
TWILIO_AUTH_TOKEN= [TBD]
AUTHY_KEY= [TBD]
TWILIO_FROM= [TBD]
TWILIO_XML_URL= [TBD]
DATABASE_URL= [URL of PostgreSQL database]
IS_ON= [TBD]
SPEECH_USERNAME= [Watson Speech to Text Username]
SPEECH_PASSWORD= [Watson Speech to Text Password]
SENTIMENT_USERNAME= [Watson Natural Language Understanding Username]
SENTIMENT_PASSWORD= [Watson Natural Language Understanding Password]
REDIS_URL= [URL of Redis database]
SEARCH_URL= [URL of elasticsearch cluster]
```

## :o: Requirements

### Technologies

- Node 6.4.x
- Redis 2.6.x
- Postgresql 9.1.x
- Elasticsearch 5.3.x

You may use a local or hosted database/search service for Redis, Postgresql, and Elasticsearch.

### APIs

Reflective uses third-party services to power its calling and analytics features. To use the application, you'll need to generate API keys from the following services:

- [Twilio](https://www.twilio.com/)
- [IBM Watson - Speech to Text](https://www.ibm.com/watson/developercloud/speech-to-text.html)
- [IBM Watson - Natural Language Understanding](https://www.ibm.com/watson/developercloud/natural-language-understanding.html)

## :rocket: Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Testing

Our test suite is built with **Jest, Enzyme** (for testing React components), and **Supertest** (for mock HTTP requests). To run all tests:

```sh
npm run test:dev
```

Refer to [TESTING.md](./docs/TESTING.md) for testing guidelines.

## :speech_balloon: Contributing

We keep track of features, bugs, ui fixes, and other tickets using **Github Issues**. Check out [this page](https://github.com/ConvivialChameleons/Reflective/issues) for a list of open issues. Refer to [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for contribution guidelines.

Our application was written in ES6 (ECMAScript 2015) syntax and follows the [Airbnb Style Guide](https://github.com/airbnb/javascript).

