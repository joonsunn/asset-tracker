import { useState } from 'react'
import _ from 'lodash'

const AssetHeader = ({ asset, assetKey, userTransactions, handleShowTransactions }) => {
	
	const totalUnits = _.sumBy(userTransactions[assetKey], 'transactedUnits')
	const costBasisUnit = _.sumBy(userTransactions[assetKey], x => x.transactedPrice * x.transactedUnits) / _.sumBy(userTransactions[assetKey], 'transactedUnits')
	const costBasis = _.sumBy(userTransactions[assetKey], x => x.transactedPrice * x.transactedUnits)
	const currentValue = (asset.assetCurrentPrice * _.sumBy(userTransactions[assetKey], 'transactedUnits'))
	const profitLoss = (currentValue - costBasis)/costBasis
	
	return (
		<div className='assetHeader'>
			{/* {asset.id} {asset.assetName} {asset.assetTicker} {asset.assetClass} {asset.assetCurrentPrice} Cost basis: { _.sumBy(userTransactions[assetKey], x => x.transactedPrice * x.transactedUnits) / _.sumBy(userTransactions[assetKey], 'transactedUnits')} Total units: {_.sumBy(userTransactions[assetKey], 'transactedUnits')} Current value: {(asset.assetCurrentPrice * _.sumBy(userTransactions[assetKey], 'transactedUnits')).toFixed(2)} P/L: {((asset.assetCurrentPrice - (_.sumBy(userTransactions[assetKey], x => x.transactedPrice * x.transactedUnits) / _.sumBy(userTransactions[assetKey], 'transactedUnits')))/((_.sumBy(userTransactions[assetKey], x => x.transactedPrice * x.transactedUnits) / _.sumBy(userTransactions[assetKey], 'transactedUnits')))).toFixed(2)}% */}

			{/* {asset.id} {asset.assetName} {asset.assetTicker} {asset.assetClass} {asset.assetCurrentPrice} Cost basis: { costBasis } Total units: { totalUnits } Current value: { currentValue.toFixed(2) } P/L: { profitLoss.toFixed(2) }% */}

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
						<th><button onClick={handleShowTransactions}>Show Transactions</button></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{asset.id}</td>
						<td>{asset.assetName}</td>
						<td>{asset.assetTicker}</td>
						<td>{asset.assetClass}</td>
						<td>{ totalUnits ? totalUnits:0 }</td>
						<td>{asset.assetCurrentPrice}</td>
						<td>{ costBasisUnit ? costBasisUnit : 0 }</td>
						<td>{ costBasis ? costBasis : 0 }</td>
						<td>{ currentValue ? currentValue.toFixed(2) :0}</td>
						<td>{ profitLoss? (profitLoss*100).toFixed(2) : 0}%</td>
						<td><button>Add Transaction</button></td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default AssetHeader