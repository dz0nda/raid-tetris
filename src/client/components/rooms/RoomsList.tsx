import React, { useState } from 'react';
import { ScrollArea, Table, Text, createStyles, rem } from '@mantine/core';
import { keys } from '@mantine/utils';
import { Room } from '@/server/modules/rooms/room.entity';

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

interface RowData {
  name: string;
  settings: string;
  company: string;
}

interface TableSortProps {
  data: Room[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

// function Th({ children, reversed, sorted, onSort }: ThProps) {
//   const { classes } = useStyles();
//   const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
//   return (
//     <th className={classes.th}>
//       <UnstyledButton onClick={onSort} className={classes.control}>
//         <Group position="apart">
//           <Text fw={500} fz="sm">
//             {children}
//           </Text>
//           <Center className={classes.icon}>
//             <Icon size="0.9rem" stroke={1.5} />
//           </Center>
//         </Group>
//       </UnstyledButton>
//     </th>
//   );
// }

function filterData(data: any[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => {
      switch (key) {
        case 'settings':
          return item.settings.owner.toLowerCase().includes(query);
        case 'players':
          return false;
        case 'name':
          return item[key].toLowerCase().includes(query);
        default:
          return false;
      }
    }),
  );
}

export function RoomsList({ data }: any) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  // const setSorting = (field: keyof RowData) => {
  //   const reversed = field === sortBy ? !reverseSortDirection : false;
  //   setReverseSortDirection(reversed);
  //   setSortBy(field);
  //   setSortedData(sortData(data, { sortBy: field, reversed, search }));
  // };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setSearch(value);
    setSortedData(filterData(data, value));
  };

  const rows = sortedData.map((row: any) => (
    <tr key={row.room}>
      <td>{row.name}</td>
      <td>{row.settings.owner}</td>
      <td>{Object.keys(row.players).length}</td>
    </tr>
  ));

  return (
    <ScrollArea p="xs" scrollbarSize={1} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} h={300}>
      <Table horizontalSpacing="md" verticalSpacing="xs" sx={{ tableLayout: 'fixed' }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={3}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
