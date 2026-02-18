import { useState } from 'react'
import { openContractCall } from '@stacks/connect'
import * as StacksNetwork from '@stacks/network'
import { uintCV, principalCV, cvToHex } from '@stacks/transactions'

function TokenManager({ userData, userSession }) {
  const [mintAmount, setMintAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [balance, setBalance] = useState(null)

  const mintTokens = async (e) => {
    e.preventDefault()
    await openContractCall({
      network: StacksNetwork.createNetwork("mainnet"),
      contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      contractName: 'car-token',
      functionName: 'mint',
      functionArgs: [uintCV(mintAmount), principalCV(recipient)],
      onFinish: (data) => {
        console.log('Minted:', data)
        setMintAmount('')
        setRecipient('')
      },
      userSession,
    })
  }

  const checkBalance = async () => {
    const response = await fetch(
      `https://api.mainnet.hiro.so/v2/contracts/call-read/SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC/car-token/get-balance`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userData.profile.stxAddress.mainnet,
          arguments: [cvToHex(principalCV(userData.profile.stxAddress.mainnet))],
        }),
      }
    )
    const data = await response.json()
    setBalance(data.result)
  }

  return (
    <div className="glass-panel p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Token Manager (CDT)</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage Car Dealership Tokens</p>
        </div>
      </div>

      <form onSubmit={mintTokens} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
          <input
            type="number"
            placeholder="Amount"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            required
          />
        </div>
        <div className="md:col-span-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recipient Address</label>
          <input
            type="text"
            placeholder="SP..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-mono text-sm"
            required
          />
        </div>
        <div className="md:col-span-3 flex items-end">
          <button
            type="submit"
            className="w-full btn-primary h-[42px]"
          >
            Mint Tokens
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">Your Usage</span>
        <div className="flex gap-4 items-center">
          {balance !== null && (
            <span className="text-dark-900 dark:text-white font-bold bg-white dark:bg-gray-800 dark:bg-dark-800 px-3 py-1 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
              {balance} CDT
            </span>
          )}
          <button
            onClick={checkBalance}
            className="text-brand-600 text-sm font-medium hover:text-brand-700 transition-colors"
          >
            Refresh Balance
          </button>
        </div>
      </div>
    </div>
  )
}

export default TokenManager
