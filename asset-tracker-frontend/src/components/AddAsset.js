import { useState } from "react";


const AssetAdder = () => {
	const [newSearch, setNewSearch] = useState('')
	
	return (
		<div>
			<form className="searcher">
				Search for instrument: <input type="string" onChange={event => {event.preventDefault(); console.log(event.target.value); setNewSearch(event.target.value)}}></input> 
				<button onClick={event => {event.preventDefault(); console.log(newSearch)}}>Search</button>
			</form>
			<form className="info">

			</form>
		</div>
	)
}


const AddAsset = () => {
	const [number, setNumber] = useState(0)

	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible? 'none' : '' }
	const showWhenVisible = { display: visible? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}


	const addNumber = () => {
		const newNum = number + 1
		setNumber(newNum)
	}

	return (
		<div>
			<button onClick={toggleVisibility}>{!visible? 'Add Asset': 'Cancel Add Asset'}</button>
			<div style={showWhenVisible}>
				<AssetAdder></AssetAdder>
			</div>
		</div>
	)
}

export default AddAsset