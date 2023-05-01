import React, { FC } from 'react';
// import { connect } from 'react-redux';
import { Card, Group, Switch, Text, createStyles, rem } from '@mantine/core';

// import actions from '../../actions';

// import GameRoom from '../../components/Game/GameRoom';
// import GameRank from '../../components/Game/GameRank';

// import {  } from '@/client/store/reducers/app';

// import Button from '../common/Button';

// const useStyles = createStyles((theme) => ({
//   card: {
//     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
//   },

//   footer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
//     borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
//   },

//   title: {
//     fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//     lineHeight: 1,
//   },
// }));

interface CardWithStatsProps {
  image: string;
  title: string;
  description: string;
  stats: {
    title: string;
    value: string;
  }[];
}

const stats = [
  {
    title: 'Distance',
    value: '27.4 km',
  },
  {
    title: 'Avg. speed',
    value: '9.6 km/h',
  },
  {
    title: 'Score',
    value: '88/100',
  },
];

const useStyles = createStyles((theme) => ({
  body: {
    display: 'flex',
    alignItems: 'center',
  },

  track: {
    width: rem(40),
    height: rem(6),
    overflow: 'visible',
  },

  thumb: {
    width: rem(20),
    height: rem(20),
    left: rem(-2),
    transition: 'background-color 100ms ease, left 100ms ease',

    'input:checked + * > &': {
      backgroundColor: theme.fn.primaryColor(),
    },
  },
}));

export const RoomInfo: FC = (props) => {
  // const { name, room, settings, reqStartGame } = props;
  // const { owner, started } = settings;

  // const handleStart = () => reqStartGame({ name, room });
  const { classes } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text weight={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Card p={rem(40)}>
      {/* {items} */}
      <Card.Section>
        <Group></Group>
      </Card.Section>
      <Card.Section>
        {/* <Center> */}
        {/* <Button radius="xl" style={{ flex: 1 }} onClick={handleStart} disabled={started || !(name === owner)}>
            Start Game
          </Button> */}
        <Switch.Group
          defaultValue={['react']}
          label="Select your favorite framework/library"
          description="This is anonymous"
        >
          <Group mt="xs">
            <Switch value="levels" label="Levels" />
            <Switch value="mallus" label="Mallus" />
          </Group>
        </Switch.Group>
        {/* </Center> */}
      </Card.Section>
    </Card>
  );
  // return (
  //   <Grid container justifyContent="space-between" alignItems="center">
  //     <Grid item xs>
  //       <Grid container spacing={1} alignItems="center" sx={{ border: '1px solid black' }}>
  //         <Grid item xs={4}>
  //           <BoxInfo field="Logged as" value={name} className="roomName" id="roomName" />
  //         </Grid>
  //         <Grid item xs={4}>
  //           <BoxInfo field="room name" value={room} />
  //         </Grid>
  //         <Grid item xs={4}>
  //           <BoxInfo field="room owner" value={owner} />
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //     <Grid item xs container justifyContent="flex-end" alignItems="center" style={{ border: '1px solid black' }}>
  //       <Box>
  //         <Grid container spacing={1}>
  //           <Grid item xs={12}>
  //             <Button title="Start Game" onClick={handleStart} disabled={started || !(name === owner)} />
  //           </Grid>
  //         </Grid>
  //       </Box>
  //     </Grid>
  //   </Grid>
  // );
};

// RoomInfo.propTypes = {
//   name: PropTypes.string.isRequired,
//   room: PropTypes.string.isRequired,
//   settings: gameStateProp.settings.isRequired,
//   reqStartGame: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   name: state.player.name,
//   room: state.game.room,
//   settings: state.game.settings,
//   players: state.game.players,
// });

// const mapDispatchToProps = {
//   reqStartGame: actions.reqStartGame,
//   reqOwner: actions.reqOwner,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(GameRoomContainer);
// export default connect(mapStateToProps, mapDispatchToProps)(RoomInfo);
