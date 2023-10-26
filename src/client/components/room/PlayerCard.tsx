import React from 'react';
import { Card, Center, Group, SimpleGrid, Text, createStyles } from '@mantine/core';
import { BOARD_HEIGHT, BOARD_WIDTH, Stage as StageType, createBoardOld } from '@/shared/game/board';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface CardWithStatsProps {
  stage: StageType;
  title: string;
  stats: {
    title: string;
    value: string;
  }[];
}

export function CardWithStats({ stage, title, stats }: CardWithStatsProps) {
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
    <Card withBorder p="lg" className={classes.card}>
      <Card.Section>
        <Center>
          <SimpleGrid cols={BOARD_WIDTH} spacing={0}>
            {createBoardOld(BOARD_HEIGHT, BOARD_WIDTH).map((row, rowIndex) =>
              row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  style={{
                    // display: 'inline-block',
                    width: '5px',
                    height: '5px',
                    // minHeight: '10px',
                    border: '1px solid black',
                    margin: '0px',
                    backgroundColor: cell || 'white',
                  }}
                />
              )),
            )}
          </SimpleGrid>
        </Center>
      </Card.Section>

      <Group position="apart" mt="xl">
        <Text size="sm" weight={700} className={classes.title}>
          {title}
        </Text>
        <Text size="xs" color="dimmed">
          1e
        </Text>
      </Group>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}
