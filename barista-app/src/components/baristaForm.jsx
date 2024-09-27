import React, { useState } from "react";
import RecipeChoices from "./recipeChoices";
import drinksJson from "./drinks.json"
import '../barista.css'

const BaristaForm = () => {
	const drinksArr = drinksJson.drinks
	const [drink, setDrink] = useState('')
	const [recipe, setRecipe] = useState({})
	const [correctness, setCorrectness] = useState({
		temperature: '',
		syrup: '',
		milk: '',
		blended: ''
	});

	const [inputs, setInputs] = useState({
		'temperature': '',
		'milk': '',
		'syrup': '',
		'blended': ''
	});

	const ingredients = {
		'temperature': ['hot', 'lukewarm', 'cold'],

		'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],

		'milk': ['cow', 'oat', 'goat', 'almond', 'none'],

		'blended': ['yes', 'turbo', 'no']
	}

	const getNewDrink = () => {
		let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
		setDrink(drinksArr[randomDrinkIndex].name);
		setRecipe(drinksArr[randomDrinkIndex].ingredients)
	}

	const validateInput = (category, input) => {
		if (!ingredients[category].includes(input)) {
			alert(`This ${category} input is not an option!`);
			return false;
		}
		return true;
	};

	const onCheckAnswer = () => {
		if (!validateInput('temperature', inputs['temperature'])) return;
		if (!validateInput('syrup', inputs['syrup'])) return;
		if (!validateInput('milk', inputs['milk'])) return;
		if (!validateInput('blended', inputs['blended'])) return;

		setCorrectness({
			temperature: recipe.temp === inputs.temperature ? 'correct' : 'wrong',
			syrup: recipe.syrup === inputs.syrup ? 'correct' : 'wrong',
			milk: recipe.milk === inputs.milk ? 'correct' : 'wrong',
			blended: recipe.blended === inputs.blended ? 'correct' : 'wrong',
		});
	};

	const onNewDrink = () => {
		setInputs({
			temperature: '',
			milk: '',
			syrup: '',
			blended: ''
		});

		setCorrectness({
			temperature: '',
			syrup: '',
			milk: '',
			blended: ''
		});

		getNewDrink();
	};

	return (
		<div>
			<h2>Hi, I'd like to order a:</h2>
			<div className="drink-container">
				<h2 className="mini-header">{drink}</h2>
				<button
					className="button newdrink"
					onClick={onNewDrink}
				>
					🔄
				</button>
			</div>
			<form className="container">
				<div className="mini-container">
					<h3>Temperature</h3>
					<div className="answer-space" id={correctness.temperature}>
						{inputs["temperature"]}
					</div>
					<RecipeChoices
						handleChange={(e) => setInputs((prevState) => ({
							...prevState,
							[e.target.name]: e.target.value,
						}))}
						label="temperature"
						choices={ingredients["temperature"]}
						currentVal={inputs["temperature"]}
					/>
				</div>

				<div className="mini-container">
					<h3> Syrup </h3>
					<div className="answer-space" id={correctness.syrup}>
						{inputs["syrup"]}
					</div>
					<RecipeChoices
						handleChange={(e) => setInputs((prevState) => ({
							...prevState,
							[e.target.name]: e.target.value,
						}))}
						label="syrup"
						choices={ingredients["syrup"]}
						currentVal={inputs["syrup"]}
					/>
				</div>
				<div className="mini-container">
					<h3> Milk </h3>
					<div className="answer-space" id={correctness.milk}>
						{inputs["milk"]}
					</div>
					<RecipeChoices
						handleChange={(e) => setInputs((prevState) => ({
							...prevState,
							[e.target.name]: e.target.value,
						}))}
						label="milk"
						choices={ingredients["milk"]}
						currentVal={inputs["milk"]}
					/>
				</div>
				<div className="mini-container">
					<h3> Blended </h3>
					<div className="answer-space" id={correctness.blended} >
						{inputs["blended"]}
					</div>
					<RecipeChoices
						handleChange={(e) => setInputs((prevState) => ({
							...prevState,
							[e.target.name]: e.target.value,
						}))}
						label="blended"
						choices={ingredients["blended"]}
						currentVal={inputs["blended"]}
					/>
				</div>
			</form>
			<button
				type="submit"
				className="button submit"
				onClick={onCheckAnswer}
			>
				Check Answer
			</button>
		</div>
	)
}

export default BaristaForm;