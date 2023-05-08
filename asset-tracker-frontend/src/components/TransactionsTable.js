import { useState, forwardRef, useImperativeHandle } from 'react'

// const TransactionsTable = ({ userTransactions, assetId }) => {
// 	return (
// 		<table>
// 			<thead>
// 				<tr>
// 					<th key = 'date'>Transaction Date</th>
// 					<th key = 'price'> Transacted Price (USD)</th>
// 					<th key = 'units'>Transacted Units</th>
// 					<th key = 'direction'>Transaction Direction</th>
// 					<th key = 'id'>Transaction id</th>
// 					{/* <th key = 'delete'>Delete Transaction</th> */}
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{userTransactions[assetId].map((transaction, index) => {return(
// 				<tr key = {index}>
// 					<td key = 'date'>{transaction.transactionDate}</td>
// 					<td key = 'price'>{transaction.transactedPrice}</td>
// 					<td key = 'units'>{transaction.transactedUnits}</td>
// 					<td key = 'direction'>{transaction.transactionDirection}</td>
// 					<td key = 'id'>{transaction.id}</td>
// 					<td key = 'amend'><button>Modify</button><button>Delete</button></td>
// 				</tr>
// 			)})}
// 			</tbody>
// 		</table>
// 	)
// }

const TransactionsTable = forwardRef( ({userTransactions, assetId}, refs) => {
	const [visible, setVisible] = useState(true)

	const hideWhenVisible = { display: visible? 'none' : '' }
	const showWhenVisible = { display: visible? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return { toggleVisibility }
	})

	const assetHasTransactions = userTransactions[assetId] != null

	return (
		<div style={showWhenVisible}>
			{assetHasTransactions &&
			<div>
				<table>
					<thead>
						<tr>
							<th key = 'date'>Transaction Date</th>
							<th key = 'price'> Transacted Price (USD)</th>
							<th key = 'units'>Transacted Units</th>
							<th key = 'direction'>Transaction Direction</th>
							<th key = 'id'>Transaction id</th>
							{/* <th key = 'delete'>Delete Transaction</th> */}
						</tr>
					</thead>
					<tbody>
						{assetHasTransactions && userTransactions[assetId].map((transaction, index) => {return(
						<tr key = {index}>
							<td key = 'date'>{transaction.transactionDate}</td>
							<td key = 'price'>{transaction.transactedPrice}</td>
							<td key = 'units'>{transaction.transactedUnits}</td>
							<td key = 'direction'>{transaction.transactionDirection}</td>
							<td key = 'id'>{transaction.id}</td>
							<td key = 'amend'><button>Modify</button><button>Delete</button></td>
						</tr>
					)})}
					</tbody>
				</table>
			</div>
			}
		</div>
		
	)
})

export default TransactionsTable