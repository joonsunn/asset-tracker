import { useState, useEffect } from "react";
import assetsService from '../services/assets'
import { symbol } from "prop-types";


const SearchResultDataRow = ({item}) => {

	const [symbolData, setSymbolData] = useState([])

	useEffect(()=> {
		
		const getPrice = async (item) => {
			const symbolData = await assetsService.getAssetPrice(item.symbol)
			console.log(symbolData.price)
			setSymbolData(symbolData)
		}

		getPrice(item)

	}, [])

	const symbolToBeAdded = {
		assetClass: item.typeDisp,
		assetName: !!item.longname? item.longname: item.shortname,
		assetTicker: item.symbol,
		assetCurrentPrice: symbolData.price,
		assetHoldingUnits: 0,
		assetCurrency: symbolData.currency,
	}

	const addAsset = async (symbolToBeAdded) => {
		const response = await assetsService.addAsset(symbolToBeAdded)
		console.log(response)
	}
	
	return (
		<tr key = {item.symbol}>
			<td key = 'symbol'>{item.symbol}</td>
			<td key = 'shortname'>{item.shortname}</td>
			<td key = 'longname'>{!!item.longname? item.longname: item.shortname}</td>
			<td key = 'exchDisp'>{item.exchDisp}</td>
			<td key = 'typeDisp'>{item.typeDisp}</td>
			<td key = 'price'>{`${symbolData.currency} ${symbolData.price}`}</td>
			<td key = 'add-button'><button onClick={event => {event.preventDefault(); addAsset(symbolToBeAdded)}}>Add</button></td>
		</tr>
	)
}

const AssetAdder = () => {
	const [newSearch, setNewSearch] = useState('')
	const [resultsVisibility, setResultsVisibility] = useState(false)
	const [results, setResults] = useState([])

	const showResults = {display: results.length > 0 ? '': 'none'}

	const toggleResultsVisibility = () => {
		setResultsVisibility(!resultsVisibility)
	}

	const search = async () => {
		const results = await assetsService.searchAsset(newSearch)
		setResults(results)

		console.log(results)

		if (results.length > 0) {
			setResultsVisibility(true)
		} else {
			setResultsVisibility(false)
		}
	}

	// const getPrice = async (symbol) => {
	// 	const results = await assetsService.getAssetPrice(symbol)

	// 	console.log(`${results.currency} ${results.price}`)

	// 	return {price: results.price, currency: results.currency}
	// }
	
	return (
		<div>
			<form className="searcher">
				Search for instrument: <input type="string" onChange={event => {event.preventDefault(); console.log(event.target.value); setNewSearch(event.target.value)}}></input> 
				<button onClick={event => {event.preventDefault(); console.log(newSearch); setResultsVisibility(true); search()}}>Search</button>
			</form>
			<form className="results-table" style={showResults}>
				<table>
					<thead>
						<tr>
							<th>Symbol</th>
							<th>Short Name</th>
							<th>Long Name</th>
							<th>Exchange</th>
							<th>Asset Type</th>
							<th>Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{results.map(item => {
							return (
								// <tr key = {item.symbol}>
								// 	<td key = 'symbol'>{item.symbol}</td>
								// 	<td key = 'shortname'>{item.shortname}</td>
								// 	<td key = 'longname'>{item.longname}</td>
								// 	<td key = 'exchDisp'>{item.exchDisp}</td>
								// 	<td key = 'typeDisp'>{item.typeDisp}</td>
								// 	{/* <td key = 'price'>{price.price}</td> */}
								// 	<td key = 'add-button'><button onClick={event => {event.preventDefault(); console.log(item.symbol); getPrice(item.symbol)}}>Add</button></td>
								// </tr>
								<SearchResultDataRow item = {item} key={item.symbol}></SearchResultDataRow>
							)
							})}
					</tbody>
				</table>
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
		<div className="asset-adder">
			<button onClick={toggleVisibility}>{!visible? 'Add Asset': 'Cancel Add Asset'}</button>
			<div style={showWhenVisible}>
				<AssetAdder></AssetAdder>
			</div>
		</div>
	)
}

export default AddAsset