import React from 'react';
import HomepageHeader from './HomepageHeader'
import {Redirect} from 'react-router-dom'
import LogoutButton from './LogoutButton';
import CalorieTrackerContainer from './CalorieTrackerContainer';
// import { Menu, Segment } from 'semantic-ui-react'
function Homepage({user, logout}) {

    return (
        <>
         <LogoutButton logout={logout}/>
         <HomepageHeader name={user.name}/>
         <CalorieTrackerContainer/>
        </>
    )
}

export default Homepage;
