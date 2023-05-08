import AssetHeader from "./AssetHeader"
import TransactionsTable from "./TransactionsTable"
import Togglable from "./Togglable"
import { useState, forwardRef, useImperativeHandle } from "react"

const DisplayAsset = forwardRef(({ userAssets, assetId, userTransactions, keyindex, handleShowTransactions }, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible? 'none' : '' }
	const showWhenVisible = { display: visible? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return { toggleVisibility }
	})
	
	return (
		<div>
			{userAssets.map(asset => asset.id === assetId 
						? <AssetHeader asset = {asset} assetKey = {assetId} userTransactions={userTransactions} key = {keyindex} handleShowTransactions={toggleVisibility}>
						</AssetHeader>
						: null)}
			<div style = {showWhenVisible}>
				<TransactionsTable userTransactions={userTransactions} assetId = {assetId}></TransactionsTable>
			</div>
		</div>
	)
}
)

export default DisplayAsset