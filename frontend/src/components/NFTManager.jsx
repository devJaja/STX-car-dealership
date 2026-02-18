import { useState } from 'react'
import { openContractCall } from '@stacks/connect'
import * as StacksNetwork from '@stacks/network'
import { uintCV, principalCV, stringAsciiCV } from '@stacks/transactions'

function NFTManager({ userSession }) {
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
      network: StacksNetwork.createNetwork("mainnet"),
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
    <div className="glass-panel p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">NFT Manager</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Mint new Car Ownership NFTs</p>
        </div>
      </div>

      <form onSubmit={mintNFT} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recipient Address</label>
            <input
              type="text"
              name="recipient"
              placeholder="SP..."
              value={formData.recipient}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-mono text-sm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Make</label>
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={formData.make}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Model</label>
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">VIN</label>
            <input
              type="text"
              name="vin"
              placeholder="17-character VIN"
              value={formData.vin}
              onChange={handleChange}
              maxLength="17"
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-mono uppercase"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Token URI</label>
            <input
              type="text"
              name="uri"
              placeholder="ipfs://..."
              value={formData.uri}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-mono text-sm"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="btn-primary w-full"
          >
            Mint Car NFT
          </button>
        </div>
      </form>
    </div>
  )
}

export default NFTManager
