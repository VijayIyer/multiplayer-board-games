import React, { Component, useState } from "react";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { TicTacToe } from "../TicTacToe";
import { Connect4 } from "../Connect4";
import { PageNotFound } from "../PageNotFound";
import { GameOptions } from '../GameOptions';
function ChooseGame() {
  const [promptType, setPromptType] = useState(null);
  const handlePrompt = ()=>setPromptType(null);
  return (
      <>
      {promptType ? <GameOptions handlePrompt={handlePrompt} type={promptType} />:null}
      <div>
        <h1>Choose New Game:</h1>
        <ul>
          <li>
            <Button variant='outline-dark'  onClick={()=>setPromptType('TicTacToe')}>Tic Tac Toe
            </Button>
          </li>
          <li>
            <Button variant='outline-dark' onClick={()=>setPromptType('Connect4')}>Connect-4
            </Button>
          </li>
          <li>
            <Button variant='outline-dark'>Chutes and Ladders</Button>
          </li>
        </ul>
      </div>
      </>
      )
}
export { ChooseGame };