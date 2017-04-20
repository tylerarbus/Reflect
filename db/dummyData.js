process.env.IS_ON = 'development';
process.env.DATABASE_URL = 'postgres://@localhost:5432/reflective';

const { db } = require('./config.js');
const User = require('../server/models/users.js');
const CallPreferences = require('../server/models/call-preferences.js');
const Audio = require('../server/models/audio.js');
const Entries = require('../server/models/entries.js');
const EntryText = require('../server/models/entry-text.js');


const newUser = {
  email: 'adrianmole@email.com',
  first_name: 'Adrian',
  last_name: 'Mole',
  password: 'password',
  phone: '6505421376',
  phone_verified: true
};

const entries = [
  {
    entry_id: 1,
    entry_text: 'I felt rotten today. It’s my mother’s fault for singing ‘My Way’ at two o’clock in the morning at the top of the stairs. Just my luck to have a mother like her. There is a chance my parents could be alcoholics. Next year I could be in a children’s home. The dog got its own back on my father. It jumped up and knocked down his model ship, then ran into the garden with the rigging tangled in its feet. My father kept saying, ‘Three months’ work down the drain’, over and over again. The spot on my chin is getting bigger. It’s my mother’s fault for not knowing about vitamins.',
    call_id: 1,
    created: '2017-02-01 22:38:38.130256-07'
  },
  {
    entry_id: 2,
    entry_text: 'I shall go mad through lack of sleep! My father has banned the dog from the house so it barked outside my window all night. Just my luck! My father shouted a swear-word at it. If he’s not careful he will get done by the police for obscene language. I think the spot is a boil. Just my luck to have it where everybody can see it. I pointed out to my mother that I hadn’t had any vitamin C today. She said, ‘Go and buy an orange, then’. This is typical. She still hasn’t worn the lurex apron. I will be glad to get back to school.',
    call_id: 2,
    created: '2017-02-02 22:38:38.130256-07'
  },
  {
    entry_id: 3,
    entry_text: 'My father has got the flu. I’m not surprised with the diet we get. My mother went out in the rain to get him a vitamin C drink, but as I told her, ‘It’s too late now’. It’s a miracle we don’t get scurvy. My mother says she can’t see anything on my chin, but this is guilt because of the diet. The dog has run off because my mother didn’t close the gate. I have broken the arm on the stereo. Nobody knows yet, and with a bit of luck my father will be ill for a long time. He is the only one who uses it apart from me. No sign of the apron.',
    call_id: 3,
    created: '2017-03-03 22:38:38.130256-07'
  },
  {
    entry_id: 4,
    entry_text: 'Now my mother has got the flu. This means that I have to look after them both. Just my luck! I have been up and down the stairs all day. I cooked a big dinner for them tonight: two poached eggs with beans, and tinned semolina pudding. (It’s a good job I wore the green lurex apron because the poached eggs escaped out of the pan and got all over me.) I nearly said something when I saw they hadn’t eaten any of it. They can’t be that ill. I gave it to the dog in the coal shed. My grandmother is coming tomorrow morning, so I had to clean the burnt saucepans, then take the dog for a walk. It was half-past eleven before I got to bed. No wonder I am short for my age. I have decided against medicine for a career.',
    call_id: 4,
    created: '2017-03-04 22:38:38.130256-07'
  },
  {
    entry_id: 5,
    entry_text: 'The dog is back. It keeps licking its stitches, so when I am eating I sit with my back to it. My mother got up this morning to make the dog a bed to sleep in until it’s better. It is made out of a cardboard box that used to contain packets of soap powder. My father said this would make the dog sneeze and burst its stitches, and the vet would charge even more to stitch it back up again. They had a row aboutthe box, then my father went on about Mr Lucas. Though what Mr Lucas has to do with the dog’s bed is a mystery to me.',
    call_id: 5,
    created: '2017-04-05 22:38:38.130256-07'
  },
  {
    entry_id: 6,
    entry_text: 'My father came into my bedroom this morning, he said he wanted a chat. He looked at my Kevin Keegan scrapbook, screwed the knob of my wardrobe door back on with his Swiss army knife, and asked me about school. Then he said he was sorry about yesterday and the shouting, he said my mother and him are ‘going through a bad patch’. He asked me if I had anything to say. I said he owed me thirty-two pence for the Chinese chips and soy sauce. He gave me a pound. So I made a profit of sixty-eight pence.',
    call_id: 6,
    created: '2017-04-06 22:38:38.130256-07'
  }
];

const users = [
  {
    email: 'random1@email.com',
    first_name: 'Random1',
    last_name: 'Lastname1',
    password: 'password',
    phone: '6505421376',
    phone_verified: false
  },
  {
    email: 'random2@email.com',
    first_name: 'Random2',
    last_name: 'Lastname2',
    password: 'password',
    phone: '6505421376',
    phone_verified: false
  },
  {
    email: 'random3@email.com',
    first_name: 'Random3',
    last_name: 'Lastname3',
    password: 'password',
    phone: '6505421376',
    phone_verified: false
  },
  {
    email: 'random4@email.com',
    first_name: 'Random4',
    last_name: 'Lastname4',
    password: 'password',
    phone: '6505421376',
    phone_verified: false
  }
];

User.new(newUser)
  .then((user) => {
    newUser.user_id = user.user_id;
    CallPreferences.new(newUser.user_id, '19:39');
  })
  .then(() => {
    entries.forEach((entry) => {
      const newEntry = entry;
      newEntry.user_id = newUser.user_id;
      Entries.new(newEntry)
        .then(result => (
          EntryText.new(result.entry_id, entry.entry_text)
        ))
        .then(() => {
          console.log('entry added!');
        })
        .catch((error) => {
          console.error('error adding mock entries', error);
        });
    });
  })
  .catch((error) => {
    console.error('failed to add user', error);
  });
