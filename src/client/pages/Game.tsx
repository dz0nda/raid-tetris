import React, { FC } from 'react';
import { Box, Center, Container, SimpleGrid } from '@mantine/core';

// import { Tetris } from '../components/board/Tetris';
import { RoomNavbar } from '../components/room/RoomNavbar';
import { Tetris } from '../components/board/Tetris';
import { BOARD_PIECE_HEIGHT, BOARD_PIECE_WIDTH, createBoardOld } from '@/shared/game/board';

export const Game: FC = () => {
  return (
    <Container>
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[
          { maxWidth: 'sm', cols: 2, spacing: 'sm' },
          { maxWidth: 'xs', cols: 1, spacing: 'sm' },
        ]}
      >
        <Center>
          <Tetris />
          <Box>
            <SimpleGrid cols={BOARD_PIECE_WIDTH} spacing={0}>
              {createBoardOld(BOARD_PIECE_HEIGHT, BOARD_PIECE_WIDTH).map((row, rowIndex) =>
                row.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    style={{
                      // display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      // minHeight: '10px',
                      border: '1px solid black',
                      margin: '0px',
                      backgroundColor: cell || 'black',
                    }}
                  />
                )),
              )}
            </SimpleGrid>
          </Box>
        </Center>
        <RoomNavbar />
      </SimpleGrid>
      {/* <Card shadow="sm" padding="lg" radius="md" withBorder> */}
      {/* </Card> */}
    </Container>
  );
};
