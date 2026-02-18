import { useState } from 'react'
import { openContractCall } from '@stacks/connect'
import * as StacksNetwork from '@stacks/network'
import { uintCV, principalCV, stringAsciiCV } from '@stacks/transactions'

function NFTManager({ userData, userSession }) {
  const [formData, setFormData] = useState({
    recipient: '',
    make: '',
    model: '',
    year: '',
    vin: '',
    uri: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const mintNFT = async (e) => {
    e.preventDefault()
    await openContractCall({
      network: new StacksNetwork.StacksMainnet(),
      contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      contractName: 'car-nft',
      functionName: 'mint',
      functionArgs: [
        principalCV(formData.recipient),
        stringAsciiCV(formData.make),
        stringAsciiCV(formData.model),
        uintCV(formData.year),
        stringAsciiCV(formData.vin),
        stringAsciiCV(formData.uri)
      ],
      onFinish: (data) => {
        console.log('NFT Minted:', data)
        setFormData({ recipient: '', make: '', model: '', year: '', vin: '', uri: '' })
      },
      userSession,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🎨 NFT Manager</h2>
      
      <form onSubmit={mintNFT} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="recipient"
          placeholder="Recipient Address"
          value={formData.recipient}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          type="text"
          name="make"
          placeholder="Make"
          value={formData.make}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          type="text"
          name="vin"
          placeholder="VIN (17 characters)"
          value={formData.vin}
          onChange={handleChange}
          maxLength="17"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          type="text"
          name="uri"
          placeholder="Token URI (ipfs://...)"
          value={formData.uri}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <button
          type="submit"
          className="md:col-span-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
        >
          Mint Car NFT
        </button>
      </form>
    </div>
  )
}

export default NFTManager
