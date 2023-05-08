import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import _ from 'lodash'
import TransactionsTable from './components/TransactionsTable';
import AssetHeader from './components/AssetHeader';
import DisplayAsset from './components/DisplayAsset';
import Togglable from './components/Togglable';
import loginService from './services/login'
import assetsService from './services/assets'
import LoginForm from './components/LoginForm';
import AddAsset from './components/AddAsset';

function App() {
	const [transactions, setTransactions] = useState([])
	const [assets, setAssets] = useState([])
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const [errorType, setErrorType] = useState(null)
	const [userTransactions, setUserTransactions] = useState([])
	const [userAssets, setUserAssets] = useState([])
	const [userId, setUserId] = useState(null)

	const promptMessage = (message, errorType) => {
		setErrorType(errorType)
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
			setErrorType(null)
		}, 5000)
	}

	// const userId = process.env.REACT_APP_USERID

	// const userId = user.id

	// const transactionTableRef = useRef()

	useEffect(() => {
		getUserAssets()
		getUserTransactions()
	}, [userId])
	// console.log(user)

	const getUserAssets = async () => {
		const getUserAssets = await axios.get(`/api/assets/byuser/${userId}`)
		// const getUserAssets = await assetsService.getUserAssets(userId)
		setUserAssets(getUserAssets.data)
	}

	const getUserTransactions = async () => {
		const getUserTransactions = await axios.get(`/api/transactions/byuser/${userId}`)
		// const getUserTransactions = await assetsService.getUserTransactions(userId)
		setUserTransactions(getUserTransactions.data)
	}

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedAssetAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			setUserId(process.env.REACT_APP_USERID)
			assetsService.setToken(user.token)
			// console.log(userId)
			// console.log(process.env.REACT_APP_USERID)
			// getUserAssets()
			// getUserTransactions()

		}
	}, [])

	const handleLogin = async (userObject) => {
		// event.preventDefault()

		try {
			const user = await loginService.login(userObject)
			window.localStorage.setItem(
				'loggedAssetAppUser', JSON.stringify(user)
			)
			assetsService.setToken(user.token)
			setUser(user)
			// setUsername('')
			// setPassword('')
			getUserAssets()
			getUserTransactions()

			promptMessage(`Welcome ${user.name}`, false)

		} catch (exception) {
			// console.log(exception)
			promptMessage('Unable to login. username/password does not exist', true)
		}
	}

	const handleLogout = () => {
		try {
			window.localStorage.removeItem('loggedAssetAppUser')
			setUser(null)
			promptMessage('Successfully logged out', false)
		} catch (exception) {
			console.log(exception)
		}
	}
	
	return (
    <div className="App">
			{!user && 
			<div>
				Login to Asset Tracker:
				<LoginForm handleLogin={handleLogin}></LoginForm>
			</div>
			}

			{user && 
			
				<div>
					<button onClick={handleLogout}>Logout</button>
					<AddAsset></AddAsset>
					User Assets:
				{/* {Object.keys(userTransactions).map((assetId, keyindex) => {
					return(
						<div key = {keyindex} className='asset'>
						
						<DisplayAsset userAssets={userAssets} assetId = {assetId} userTransactions={userTransactions} keyindex={keyindex}></DisplayAsset>
						
						</div>
						)
					})}
					
				V2: */}

				{Object.keys(userAssets).map((assetIndex, keyindex) => {
					// console.log(userAssets[assetIndex].id)
					const id = userAssets[assetIndex].id
					return (
						<div key = {userAssets[assetIndex].id} className='asset'>
							<DisplayAsset userAssets = {userAssets} assetId = {id} userTransactions = {userTransactions} keyindex={keyindex}></DisplayAsset>
						</div>
					)
				})}
				</div>
			}

    </div>
  );
}

export default App;
