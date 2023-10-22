import React, { FC } from 'react';
import { Card, Container } from '@mantine/core';

// import GameRoom from '../components/game/GameRoom';
// import { GameBoard } from '../components/game/GameBoard';
import { GameNavbar } from '../components/game/Navbar';
// import GameChat from '../components/game/GameChat';
// import { RoomInfo } from '../components/game/RoomInfo';

export const Game: FC = () => {
  return (
    <>
      <Container>
        {/* <Group grow> */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          {/* <GameBoard /> */}
        </Card>
        <GameNavbar />
        {/* </Group> */}
        {/* <RoomInfo /> */}
        {/* <Group position="center" grow> */}
        {/* <GameRoom /> */}
        {/* <Center> */}
        {/* <GameBoard /> */}
        {/* </Center> */}
        {/* <GameChat /> */}
        {/* </Group> */}
      </Container>
      {/* <GameAside /> */}
    </>
  );
};
