import { useState } from 'react'
import { openContractCall } from '@stacks/connect'
import { StacksTestnet } from '@stacks/network'
import { uintCV, principalCV } from '@stacks/transactions'

function TokenManager({ userData, userSession }) {
  const [mintAmount, setMintAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [balance, setBalance] = useState(null)

  const mintTokens = async (e) => {
    e.preventDefault()
    await openContractCall({
      network: new StacksTestnet(),
      contractAddress: 'YOUR_CONTRACT_ADDRESS',
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
      `https://api.testnet.hiro.so/v2/contracts/call-read/YOUR_CONTRACT_ADDRESS/car-token/get-balance`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userData.profile.stxAddress.testnet,
          arguments: [`0x${Buffer.from(userData.profile.stxAddress.testnet).toString('hex')}`],
        }),
      }
    )
    const data = await response.json()
    setBalance(data.result)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🪙 Token Manager (CDT)</h2>
      
      <form onSubmit={mintTokens} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
        >
          Mint Tokens
        </button>
      </form>

      <div className="flex gap-4 items-center">
        <button
          onClick={checkBalance}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Check Balance
        </button>
        {balance && (
          <span className="text-gray-700 font-semibold">Balance: {balance} CDT</span>
        )}
      </div>
    </div>
  )
}

export default TokenManager
