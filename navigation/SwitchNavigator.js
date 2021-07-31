import React, { useState } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Home from '../screens/Home';
import Auth from '../screens/Auth';


const Switch = createSwitchNavigator(
    {
        auth: Auth,
        home: Home
    },
    {
        initialRouteName: 'auth'
    }
)