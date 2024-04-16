import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled from 'styled-components'
import Homecomponents from './modules/home'
import Overviewcomponents from './modules/home/Overview'
import Transactioncomponents from './modules/home/Transaction'
import { Header, MainContainer } from './constants/styled'



function App() {
 
  return (
    <MainContainer>
      <Header>Expense tracker</Header>
      <Homecomponents />
    </MainContainer>
  );
}

export default App
