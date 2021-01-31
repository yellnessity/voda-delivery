import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';

export default function MainTheme() {

    const VDTheme = createMuiTheme({
        typography: {
            fontFamily: 'Muller'
          },
      });

    return VDTheme

}
