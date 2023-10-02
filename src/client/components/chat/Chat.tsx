import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { Alert, Group, Loader, ScrollArea, Stack, Tabs, Text } from '@mantine/core';

// import { makeStyles } from '@material-ui/core/styles';
// import { chatStatePropTypes } from '@/client/store/reducers/reducers.types';

// import {
//   // List,
//   Paper,
//   InputBase,
//   // Typography,
//   // IconButton,
//   // Box,
// } from '@mui/material';
// import { reqChat, selectRoomChat } from '@/client/store/reducers/game';

import ChatBox from './ChatBox';
import { useAppSelector } from '@/client/store';
import { selectAppChats } from '@/client/store/reducers/app';

const messages = new Array(100).fill({ id: 'key', user: 'test', date: '29/02: 19h', text: 'test' });

interface IMessage {
  id: string;
  user: string;
  date: string;
  text: string;
}

const Message: FC<IMessage> = ({ id, user, date, text }) => {
  const loading = false;
  const color = 'teal';

  return (
    <>
      <Group
        // onMouseEnter={() =>
        //   deleted === undefined ? setHovered(true) : undefined
        // }
        // onMouseLeave={() => setHovered(false)}
        position={'right'}
        align="flex-end"
        noWrap
      >
        <Stack p={0} spacing={2} sx={{ maxWidth: '80%' }} align="flex-end">
          <Group align="flex-end" spacing="xs">
            <Stack p={0} spacing={0} m={0}>
              <Stack p={0} spacing={0} m={0}>
                <Group
                  align="center"
                  style={{ position: 'relative', bottom: -8 }}
                  p={0}
                  spacing="xs"
                  m={0}
                  noWrap
                  // position="apart"
                >
                  {/* <IconCornerUpLeft size={15} /> */}
                  <Text size="xs" p={0}>
                    {user}
                  </Text>
                  <Text size="xs" p={0} color="gray">
                    {date}
                  </Text>
                </Group>
                <Group>
                  <Alert
                    sx={{ bottom: '-10px', zIndex: -1 }}
                    color="gray"
                    // variant={repDel === undefined ? 'light' : 'outline'}
                    radius="lg"
                    py={8}
                  >
                    {loading ? <Loader size="xs" color={color} /> : text}
                  </Alert>
                </Group>
              </Stack>
            </Stack>
          </Group>
        </Stack>
      </Group>
    </>
  );
};

export const Chat: FC = () => {
  const [message, setMessage] = useState('');
  const scrollRef = useRef(null);
  // const chat = useAppSelector(selectRoomChat);
  // const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const chats = useAppSelector(selectAppChats);

  console.log('chats', chats);
  // const handleSubmit = () => {
  //   if (!message) return;

  //   dispatch(reqChat({ message }));

  //   setMessage('');
  // };

  // useEffect(() => {
  //   // if (scrollRef.current) {
  //   //   scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  //   // }
  // }, [chat]);

  // const renderBox = () => {
  //   return (
  //     <Paper elevation={0}>
  //       <InputBase
  //         id="chatBoxInput"
  //         //   className={classes.chatBoxInput}
  //         placeholder="message..."
  //         value={message}
  //         onChange={handleMessage}
  //         onKeyPress={(ev) => {
  //           if (ev.key === 'Enter') {
  //             // handleSubmit();
  //           }
  //         }}
  //       />
  //       {/* <IconButton className="chatBoxButton" onClick={handleSubmit}>
  //         <Telegram />
  //       </IconButton> */}
  //       {/* <RedIconButton className="chatBoxButton" onClick={handleSubmit}>
  //         <Telegram />
  //       </RedIconButton> */}
  //     </Paper>
  //   );
  // };

  const rows = messages.map((row, i) => (
    <tr key={i}>
      <td>{row.name}</td>
      <td>{row.message}</td>
    </tr>
  ));

  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        {Object.keys(chats).map((key: string) => (
          <Tabs.Tab value={key}>#{key}</Tabs.Tab>
        ))}
        {/* <Tabs.Tab value="gallery"># Gallery</Tabs.Tab>
        <Tabs.Tab value="messages"># Messages</Tabs.Tab>
        <Tabs.Tab value="settings"># Settings</Tabs.Tab> */}
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        <Stack h={450} p={0}>
          <ScrollArea p="xs" scrollbarSize={1} h={450}>
            <Stack>
              {messages.map((message, i) => (
                <Message key={i} {...message} />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
        <ChatBox />
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );

  // return (
  //   <Box style={{ height: '100%' }}>
  //     <Grid container alignItems="center" className={classes.grid}>
  //       <Grid item xs>
  //         <Paper variant="outlined" elevation={0}>
  //           <Grid container alignItems="center">
  //             <Grid xs>
  //               <List className={classes.list}>
  //                 {/* {chat.map((entryMessage) => renderMessage(entryMessage))} */}
  //                 <div ref={scrollRef} />
  //               </List>
  //               <CardContent>
  //                 <Grid container>
  //                   <Grid item xs>
  //                     {renderBox()}
  //                     {/* <GameChatBox message={message} handleMessage={handleMessage} handleSubmit={handleSubmit} /> */}
  //                   </Grid>
  //                 </Grid>
  //               </CardContent>
  //             </Grid>
  //           </Grid>
  //         </Paper>
  //       </Grid>
  //     </Grid>
  //   </Box>
  // );
};

// GameChat.propTypes = {
//   chat: chatStatePropTypes.isRequired,
//   reqChat: PropTypes.func.isRequired,
// };

// // export default GameChat
// const mapStateToProps = (state) => ({
//   chat: state.game.chat,
// });

// const mapDispatchToProps = {
//   reqChat: actions.reqChat,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(GameChat);
