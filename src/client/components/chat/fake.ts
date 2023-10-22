import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  text: string;
  uid: string;
  createdAt: string;
  photoURL: string;
  deleted?: boolean;
  repliedTo?: string;
  ruid?: string;
  rtext?: string;
}

export const generateFakeMessages = (count: number): Message[] => {
  const fakeMessages: Message[] = [];
  const fakeUserIds = ['user1', 'user2', 'user3', 'sampleUID']; // Added 'sampleUID' to the list
  const fakeTexts = [
    'Hello!',
    'How are you?',
    'This is a test message.',
    'What are you up to?',
    'Have a great day!',
    'Did you see the news today?',
    "Let's catch up later!",
    'Sounds good!',
    'Thanks for the update.',
    "I'll be there soon.",
  ];
  const fakePhotos = [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
    'https://example.com/photo3.jpg',
  ];

  for (let i = 0; i < count; i++) {
    const randomUserIndex = Math.floor(Math.random() * fakeUserIds.length);
    const randomTextIndex = Math.floor(Math.random() * fakeTexts.length);
    const randomPhotoIndex = Math.floor(Math.random() * fakePhotos.length);

    const message: Message = {
      id: uuidv4(),
      text: fakeTexts[randomTextIndex],
      uid: fakeUserIds[randomUserIndex],
      createdAt: String(new Date()),
      photoURL: fakePhotos[randomPhotoIndex],
    };

    // Randomly add repliedTo, ruid, and rtext properties
    if (Math.random() > 0.7 && i > 0) {
      message.repliedTo = fakeMessages[i - 1].id;
      message.ruid = fakeMessages[i - 1].uid;
      message.rtext = fakeMessages[i - 1].text;
    }

    // Randomly mark some messages as deleted
    if (Math.random() > 0.9) {
      message.deleted = true;
    }

    fakeMessages.push(message);
  }

  return fakeMessages;
};

// Usage
// const messages = generateFakeMessages(50);

// // Determine message position
// const currentUserUID = 'sampleUID';
// messages.forEach((msg) => {
//   const messagePosition = msg.uid === currentUserUID ? 'right' : 'left';
//   console.log(`Message: ${msg.text}, Position: ${messagePosition}`);
// });
