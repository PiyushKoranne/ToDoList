// FUTURE TARGET:
//  1. I have to add the Drag Functionality, to change the order of the Tasks 
//  2. I have to add a Priority Flag according to which the task will be arranged.
//  3. Some Reward system for Completion of Tasks.
//  4. Edit Option for Tasks.

import React, { useState, useReducer } from "react";
import "./ToDo.css";
import {FaWindowClose} from "react-icons/fa";

function reducer(state, action) {
  switch (action.type) {
    case "ADDITEM":
      return action.payload === ""
        ? {
            todo: [...state.todo],
            input: state.input,
            warn: true,
            addItem: false
          }
        : {
            todo: [...state.todo, { text: action.payload, remove: false }],
            input: "",
            warn: false,
            addItem: true
          };
    case "REMOVEITEM":
      return {
        todo: state.todo.map((item, idx) => {
          if (idx === action.idx) {
            return { ...item, remove: true };
          } else {
            return { ...item };
          }
        }),
        input: state.input,
        warn: false,
        addItem: false
      };
    case "INPUT":
      return { ...state, input: action.payload, warn: false, addItem: false };

    default:
      return {
        todo: [...state.todo],
        input: state.input,
        warn: state.warn,
        addItem: false
      };
  }
}

const FinalToDo = () => {
  const [state, dispatch] = useReducer(reducer, {
    todo: [],
    input: "",
    warn: false,
    addItem: false
  });
  return (
    <div className="ToDo--App--Container">
        <h1 style={{fontFamily:'Oswald'}}>To Do List</h1>
      <div className="Form--Container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={state.input}
            onChange={(event) => {
              dispatch({ type: "INPUT", payload: event.target.value });
            }}
          />
        </form>
        <button
          type="submit"
          onClick={(event) => {
            dispatch({ type: "ADDITEM", payload: state.input });
          }}
        >
          Add Item
        </button>
      </div>
      <div className="ToDo--Item--Container">
        {state.todo.map((item, idx) => {
          return (
            !item.remove && (
              <div
                className="Todo--Item"
                onClick={(event) => {
                  dispatch({ type: "REMOVEITEM", idx: idx });
                }}
              >
                {item.text}
                <FaWindowClose className="Todo--Item--Icon"/>
              </div>
            )
          );
        })}
        </div>
        {state.warn ? (
          <div
            className="Flag--Div"
          >
            Cannot Add Empty Task
          </div>
        ) : (
          <div></div>
        )}
        {state.addItem ? (
          <div
            className="Flag--Div"
          >
            Item Added
          </div>
        ) : (
          <div></div>
        )}
    </div>
  );
};

export default FinalToDo;
