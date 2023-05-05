import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import _ from 'lodash'
import TransactionsTable from './components/TransactionsTable';
import AssetHeader from './components/AssetHeader';
import DisplayAsset from './components/DisplayAsset';
import Togglable from './components/Togglable';

function App() {
	const [transactions, setTransactions] = useState([])
	const [assets, setAssets] = useState([])
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [errorType, setErrorType] = useState(null)
	const [userTransactions, setUserTransactions] = useState([])
	const [userAssets, setUserAssets] = useState([])

	const promptMessage = (message, errorType) => {
		setErrorType(errorType)
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
			setErrorType(null)
		}, 5000)
	}

	const userId = process.env.REACT_APP_USERID

	// const transactionTableRef = useRef()

	useEffect(() => {
		// const getTransactions = async () => {
		// 	const getTransactions = await axios.get('/api/transactions')
		// 	const filteredTransactions = getTransactions.data.filter(transaction => transaction.user === userId)
		// 	setTransactions(filteredTransactions)
		// }
		// getTransactions()

		// const getAssets = async () => {
		// 	const getAssets = await axios.get('/api/assets')
		// 	const filteredAssets = getAssets.data.filter(asset => asset.user === userId)
		// 	setAssets(filteredAssets)
		// }
		// getAssets()

		const getUserAssets = async () => {
			const getUserAssets = await axios.get(`/api/assets/byuser/${userId}`)
			setUserAssets(getUserAssets.data)
		}

		getUserAssets()


		const getUserTransactions = async () => {
			const getUserTransactions = await axios.get(`/api/transactions/byuser/${userId}`)
			setUserTransactions(getUserTransactions.data)
		}
		getUserTransactions()


	}, [])
	
	// const handleShowTransactions = () => {
	// 	transactionTableRef.current.toggleVisibility()
	// }

	// const DisplayAsset = ({ userAssets, assetId, userTransactions, keyindex }) => {
	// 	return (
	// 		<div>
	// 			{userAssets.map(asset => asset.id === assetId 
	// 						? <div>
	// 							<AssetHeader asset = {asset} assetKey = {assetId} userTransactions={userTransactions} key = {keyindex} handleShowTransactions={handleShowTransactions}></AssetHeader>
	// 							<Togglable ref={transactionTableRef}>
	// 								<TransactionsTable userTransactions={userTransactions} assetId = {assetId}></TransactionsTable>
	// 							</Togglable>
	// 						</div> 
	// 						: null)}
	// 			{/* <button onClick={handleShowTransactions}>show</button> */}
	// 		</div>
	// 	)
	// }


	
	return (
    <div className="App">
		{/* <div>
			Transactions:
			{transactions.map(transaction => {return <div>{transaction.id}</div>})}
		</div>
		<div>
			Assets:
			{assets.map(asset => {return <div>{asset.assetName} {asset.assetTicker} {asset.assetHoldingUnits} {asset.assetCurrentPrice} {asset.assetTransactions.map(transaction => <div>{transaction}</div>)}</div>})}
		</div> */}
		{/* <div> */}
			User Assets:
			{Object.keys(userTransactions).map((assetId, keyindex) => {
				return(
				<div key = {keyindex} className='asset'>
					{/* {assets.map(asset => asset.id === key ? <div key = {keyindex}>{asset.id} {asset.assetName} {asset.assetTicker} {asset.assetClass} {asset.assetCurrentPrice} Cost basis: { _.sumBy(userTransactions[key], x => x.transactedPrice * x.transactedUnits) / _.sumBy(userTransactions[key], 'transactedUnits')} Total units: {_.sumBy(userTransactions[key], 'transactedUnits')} Current value: {(asset.assetCurrentPrice * _.sumBy(userTransactions[key], 'transactedUnits')).toFixed(2)} P/L: {((asset.assetCurrentPrice - (_.sumBy(userTransactions[key], x => x.transactedPrice * x.transactedUnits) / _.sumBy(userTransactions[key], 'transactedUnits')))/((_.sumBy(userTransactions[key], x => x.transactedPrice * x.transactedUnits) / _.sumBy(userTransactions[key], 'transactedUnits')))).toFixed(2)}%</div> : null)} */}
					
					{/* {userAssets.map(asset => asset.id === assetId 
						? <AssetHeader asset = {asset} assetKey = {assetId} userTransactions={userTransactions} key = {keyindex}></AssetHeader>
						: null)}

					<TransactionsTable userTransactions={userTransactions} assetId = {assetId}></TransactionsTable> */}

					<DisplayAsset userAssets={userAssets} assetId = {assetId} userTransactions={userTransactions} keyindex={keyindex}></DisplayAsset>

				</div>
				)
			})}


		{/* </div> */}

    </div>
  );
}

export default App;
