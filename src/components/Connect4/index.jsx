import './index.css';
import { Table } from './table';
import Button from 'react-bootstrap/Button';
import React, {Component} from 'react';

export const Connect4 = (props) => {
  
  // refresh(){
  //   window.location.reload(); /* more elegant solution required - no refresh of page, only components back to initial state */
  // }
  
    return (
    <div className="App">
      <h1>Connect 4!</h1>
      { /* <Button variant='outline-dark' onClick={()=>this.refresh()}>Refresh</Button> */}
      <ul>
        <li><div>Try to get a pattern with 4 continuous circles having same color</div></li>
        {/*<li><div>Refresh to start over again</div></li>*/}
        <li><div>Grey - disabled</div></li>
        <li><div>White - allowed</div></li>
        <li><div>Red - Player 1 filled</div></li>
        <li><div>Blue - Player 2 filled</div></li>
        <li><div>Marked Solid Border - 4 Consecutive locations with same color</div></li>
      </ul>
      <Table />
    </div>
    )
}
