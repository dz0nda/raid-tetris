/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Center, Group, ScrollArea, Table, Text, UnstyledButton, createStyles, rem } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },
  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

export interface Column<T> {
  key: (row: T) => any;
  label: string;
}

interface TableSortProps<T> {
  data: T[];
  search: string;
  columns: Column<T>[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

/**
 * Table header component with sorting functionality.
 */
function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

/**
 * Filters data based on search query.
 */
function filterData<T>(data: T[], search: string, columns: Column<T>[]) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => columns.some((column) => String(column.key(item)).toLowerCase().includes(query)));
}

/**
 * Sorts and filters data based on provided criteria.
 */
function sortData<T extends object>(
  data: T[],
  payload: { sortBy: number | null; reversed: boolean; search: string },
  columns: Column<T>[],
) {
  if (payload.sortBy === null) {
    return filterData(data, payload.search, columns);
  }

  return filterData(
    [...data].sort((a, b) => {
      const column = columns[payload.sortBy as number];
      if (column) {
        const aValue = String(column.key(a));
        const bValue = String(column.key(b));
        if (payload.reversed) {
          return bValue.localeCompare(aValue);
        }
        return aValue.localeCompare(bValue);
      }
      return 0;
    }),
    payload.search,
    columns,
  );
}

/**
 * Generic table component with sorting and filtering functionality.
 */
export function TableSort<T extends object>({ data, search, columns }: TableSortProps<T>) {
  const [sortedData, setSortedData] = useState<T[]>([]);
  const [sortBy, setSortBy] = useState<number | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (columnIndex: number) => {
    const reversed = columnIndex === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(columnIndex);
    setSortedData(sortData(data, { sortBy: columnIndex, reversed, search }, columns)); // Pass columnIndex directly
  };

  useEffect(() => {
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search }, columns));
  }, [search]);

  const rows = sortedData.map((row, index) => (
    <tr key={index}>
      {columns.map((column, colIndex) => (
        <td key={colIndex}>{String(column.key(row))}</td> // Adjusted this line
      ))}
    </tr>
  ));

  return (
    <ScrollArea>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <Th
                key={index}
                sorted={sortBy === index}
                reversed={reverseSortDirection}
                onSort={() => setSorting(index)}
              >
                {column.label}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={columns.length}>
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
