import React, { FC } from 'react';
import { useState } from 'react';
import { Grid, ScrollArea, createStyles, rem } from '@mantine/core';
import { useAppSelector } from '@/client/store';
import { selectPlayers } from '@/client/store/selectors/player.selectors';
import { CardWithStats } from './PlayerCard';
import { PlayerStateClient } from '@/client/store/slices/player.slice';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: { name: string; email: string; company: string }[];
}

export const GamePlayers: FC<TableScrollAreaProps> = ({ data }) => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const players = useAppSelector(selectPlayers);

  console.log(players);

  const rows = Object.values(players).map((player: any) => (
    <tr key={player.name}>
      <td>{player.name}</td>
      <td>{player.score}</td>
      <td>{player.lines}</td>
      <td>{/* <Stage style={{ padding: '2px' }} stage={player.stage} type="stagePlayers" /> */}</td>
    </tr>
  ));

  return (
    <ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Grid>
        {Object.values(players).map((player: PlayerStateClient) => (
          <Grid.Col span={4}>
            <CardWithStats
              stage={player.stage}
              title={player.name}
              stats={[
                { title: 'Score', value: String(player.score) },
                { title: 'Lines', value: String(player.lines) },
                { title: 'Stage', value: String(player.rank) },
              ]}
            />
          </Grid.Col>
        ))}
      </Grid>
      {/* <Table miw={300}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Lines</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table> */}
    </ScrollArea>
  );
};
