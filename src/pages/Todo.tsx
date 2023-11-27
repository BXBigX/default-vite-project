import React from "react";

import { useEffect, useState } from "react";

import { List, ListItem } from "@chakra-ui/react";

interface ITodo {
  id: string;
  text: string;
}

export default function Todo() {
  const [inputText, setInputText] = useState<string>("");

  const [todos, setTodos] = useState<ITodo[] | undefined>([]);

  useEffect(() => {
      const fromStorage = localStorage.getItem("todos")

      const localTodos = fromStorage ? JSON.parse(fromStorage) : [];

      setTodos(localTodos);
  }, []);

const handleAddTodo = () => {
  if (inputText.length === 0) {
    return
  }

  const newTodo: ITodo = {
    id: Date.now().toString(),
    text: inputText,
  };

  //@ts-ignore
  const newTodos = [...todos, newTodo]

  setTodos(newTodos);
  setInputText("");

  localStorage.setItem("todos", JSON.stringify(newTodos))
}

const handleRemoveTodo = (id: string) => {
  //@ts-ignore
  const newTodos = todos.filter((todo: ITodo) => todo.id !== id)

  setTodos(newTodos);

  localStorage.setItem("todos", JSON.stringify(newTodos))
}


    return (
            <div style={{
              paddingBottom: "25px",
            }}>
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "15px"
                  }}
                >
                  Todo List
                </h1>
    
                <List>
                    {
                      // @ts-ignore 
                        todos.map((todo) => (
                          // @ts-ignore
                          <ListItem key={todo.id}>
                            <div>
                              {todo.text}
    
                              <button 
                                style={{
                                  backgroundColor: "#ffca00",
                                  borderRadius: "5px",
                                  width: "75px",
                                  marginLeft: "10px",
                                  marginBottom: "10px"
                                }}
                                onClick={() => handleRemoveTodo(todo.id)}
                              >
                                Удалить
                              </button>
                            </div>
                          </ListItem>
                        ))
                    }
                </List>
    
                <div
                  style={{
                    paddingTop: "15px"
                  }}
                />
    
                <input
                  type="text"
                  placeholder="Добавить задачу"
                  value={ inputText }
                  style={{
                    border: "1px solid #000000",
                    borderRadius: "6px"
                  }}
                  onChange={ (e) => {
                      setInputText(e.target.value)
                  }}
                >
                </input>
    
              <button
                style={{
                  marginLeft: "15px",
                  backgroundColor: "#ffca00",
                  borderRadius: "5px",
                  width: "90px"
                }}
                onClick={ () => handleAddTodo() }>
                  Добавить
              </button>
            </div>
    )
}