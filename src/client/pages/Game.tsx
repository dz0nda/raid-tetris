import React, { FC } from 'react';
import { Card, Container } from '@mantine/core';

// import GameRoom from '../components/game/GameRoom';
import { GameBoard } from '../components/game/GameBoard';
// import GameChat from '../components/game/GameChat';
// import { RoomInfo } from '../components/game/RoomInfo';
import { GameAside } from '../components/game/GameAside';

export const Game: FC = () => {
  return (
    <>
      <Container>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          {/* <RoomInfo /> */}
          {/* <Group position="center" grow> */}
          {/* <GameRoom /> */}
          {/* <Center> */}
          <GameBoard />
          {/* </Center> */}
          {/* <GameChat /> */}
          {/* </Group> */}
        </Card>
      </Container>
      <GameAside />
    </>
  );
};
