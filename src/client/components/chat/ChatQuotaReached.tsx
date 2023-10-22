import React from 'react';
import { Alert, Center, Stack } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const QuotaReached = () => {
  return (
    <Center sx={{ flexGrow: 1 }}>
      <Stack align="center" p="lg">
        <Alert icon={<IconAlertCircle size={16} />} title="Oh no!" color="red">
          Unfortunately our Database reached its limit, Sorry for inconvinience. Come back again tomorrow, Thank you for
          understanding !
        </Alert>
      </Stack>
    </Center>
  );
};

export default QuotaReached;
