import React, {useState, useEffect} from "react";




//create your first component
const Home = () => {
	const [tareas, setTareas] = useState([]);
	const url =  'https://assets.breatheco.de/apis/fake/todos/user/magdis'
	
	useEffect(()=>{
	//fetch api
	fetch(url)
	.then(response=>response.json())
	.then(data=>setTareas(data))},[])
	


	return (
		<div className="text-center">
			<h1>ToDo List API</h1>
			{tareas.map((elem, index)=>{
				return <li>{elem?.label}</li>

			})}
		</div>
	);
};

export default Home;
