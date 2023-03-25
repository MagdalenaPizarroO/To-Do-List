import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [tareas, setTareas] = useState([]); // matriz vacía que contiene los elementos de la lista (que se encuentran ahora en la API)
  const url = "https://assets.breatheco.de/apis/fake/todos/user/magdis";
  const [inputValue, setInputValue] = useState(""); // captura el valor del input

  useEffect(() => {
    //fetch api
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTareas(data))
      .catch((error) => console.log(error, "DANGER")); // me avisa si hay un error en la API misma
  }, []);

  //creo una función que se llame cuando se hace clic en el botón "agregar"; agrega un nuevo elemento a la lsta de tareas
  //1) verifica que el valor en  el input no esté vacío
  //2) si no está vacío, agrega el valor del inputValue (yo quiero que lo guarde en la API)
  const addToList = () => {
    if (inputValue.trim() === "") {
      //trim() elimina los espacios en blanco al inicio y al final de una cadena de texto
      return;
    }
    //aquí agrego el código que me permite almacenar la info del input en la API
    //Creo un nuevo objeto con la información del nuevo elemento
    const nuevaTarea = {
      label: inputValue.trim(),
      done: false,
    };

    //envío una solicitud POST a la API para agregar el nuevo elemento
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...tareas, nuevaTarea]),
    })
      .then((response) => response.json())
      .then((data) => setTareas([...tareas, nuevaTarea]))
      .catch((error) => console.log(error));

    //limpia el valor del input después de agregar el nuevo elemento
    setInputValue("");
  };

  //para eliminar una tarea
  const deleteTarea = (index) => {
	const nuevaTarea = tareas.filter((_,i) => i !== index);
	fetch(url, {
		method: "PUT",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(nuevaTarea),
	  })
		.then((response) => response.json())
		.then((data) => setTareas(nuevaTarea))
		.catch((error) => console.log(error));

	  setInputValue("");
	};

	//para eliminar todas las tareas
	const deleteAll = () => {
		fetch(url, {
			method: "DELETE",
			headers: {
			  "Content-Type": "application/json",
			},
		  })
			.then((response) => response.json())
			.then(() => {
				setTareas([]);
				return fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					  },
					body: JSON.stringify([])
				});
			})
			.then((response) => response.json())
			.catch((error) => console.log(error));
	  
		  setInputValue("");

	}

  return (
    <div className="text-center">
      <h1>ToDo List API</h1>
      <input
        className="border border-info border-2 me-1 my-1"
        style={{ width: "90%" }}
        type="text"
        placeholder="Tasks to do"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addToList} style={{ width: "9%" }}>
        Add
      </button>
      <ul className="m-0 p-0">
        {tareas?.map((elem, index) => {
          return (
            <li
              className="border border-info border-1 my-2"
              style={{ width: "100%", listStyleType: "none" }}
              key={index}
            >
              {elem?.label}
			  <button onClick={() => deleteTarea(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
	  <button onClick={deleteAll}>Clear ToDo List</button>
    </div>
  );
};

export default Home;
