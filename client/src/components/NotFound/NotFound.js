import React from 'react'
import { Box, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';


export default function PageNotFround() {
    return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: indigo[500],
          }}
        >
          <Typography variant="h3" style={{ color: 'white' }}>
            404 | Not Found
          </Typography>
        </Box>
      );
}