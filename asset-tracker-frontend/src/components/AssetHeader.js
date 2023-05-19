import { useState, useEffect } from 'react'
import _ from 'lodash'
import assetsService from '../services/assets'

const AssetHeader = ({ asset, assetKey, userTransactions, handleShowTransactions}) => {
	const [assetCurrentPrice, setAssetCurrentPrice] = useState([])

	useEffect(() => {
		const getAssetCurrentPrice = async (asset) => {
			const symbolData = await assetsService.getAssetPrice(asset.assetTicker)
			setAssetCurrentPrice(symbolData.price)
			console.log(asset.assetName, asset.assetTicker, symbolData.price)
			await assetsService.updateAssetPrice(asset.id, symbolData.price)
		}
		getAssetCurrentPrice(asset)
	}, [])

	const totalUnits = _.sumBy(userTransactions[assetKey], 'transactedUnits')
	const costBasisUnit = _.sumBy(userTransactions[assetKey], x => x.transactedPrice * x.transactedUnits) / _.sumBy(userTransactions[assetKey], 'transactedUnits')
	const costBasis = _.sumBy(userTransactions[assetKey], x => x.transactedPrice * x.transactedUnits)
	const currentValue = (assetCurrentPrice * _.sumBy(userTransactions[assetKey], 'transactedUnits'))
	const profitLoss = (currentValue - costBasis)/costBasis
	const assetHasTransactions = !!userTransactions[assetKey]

	const [showTransactions, setShowTransactions] = useState(false)
	const buttonText = showTransactions ? 'Hide Transactions' : 'Show Transactions'


	return (
		<div className='assetHeader'>

			<table>
				<thead>
					<tr>
						<th>Asset Id</th>
						<th>Asset Name</th>
						<th>Asset Ticker</th>
						<th>Asset Class</th>
						<th>Total Units</th>
						<th>Asset Current Price</th>
						<th>Cost Basis per unit</th>
						<th>Cost Basis</th>
						<th>Current Value</th>
						<th>P/L</th>
						{assetHasTransactions && 
						<th><button onClick={() => {handleShowTransactions(); setShowTransactions(!showTransactions)}}>{buttonText}</button></th>
						}
						<th><button onClick={event => {event.preventDefault(); console.log(`Simulating delete ${asset.id}`)}}>Delete Asset</button></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{asset.id}</td>
						<td>{asset.assetName}</td>
						<td>{asset.assetTicker}</td>
						<td>{asset.assetClass}</td>
						<td>{ totalUnits ? totalUnits:0 }</td>
						<td>{`${asset.assetCurrency} ${assetCurrentPrice}`}</td>
						<td>{ costBasisUnit ? costBasisUnit : 0 }</td>
						<td>{ costBasis ? costBasis : 0 }</td>
						<td>{ currentValue ? currentValue.toFixed(2) :0}</td>
						<td>{ profitLoss? (profitLoss*100).toFixed(2) : 0}%</td>
						<td><button onClick={event => {event.preventDefault(); console.log(`Simulate adding transaction to ${asset.id}`)}}>Add Transaction</button></td>
						
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default AssetHeader