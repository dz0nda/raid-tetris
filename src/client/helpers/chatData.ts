import { generateFakeMessages } from '../components/chat/fake';

export const chatData = {
  general: generateFakeMessages(10),
  room1: generateFakeMessages(10),
  room2: generateFakeMessages(10),
};
