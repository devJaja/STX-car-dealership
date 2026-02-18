import { useState } from 'react'
import { openContractCall } from '@stacks/connect'
import * as StacksNetwork from '@stacks/network'
import { stringAsciiCV, uintCV } from '@stacks/transactions'

function AddCar({ userSession, onCarAdded }) {
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await openContractCall({
      network: StacksNetwork.createNetwork("mainnet"),
      contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      contractName: 'car-dealership',
      functionName: 'add-car',
      functionArgs: [
        stringAsciiCV(make),
        stringAsciiCV(model),
        uintCV(year),
        uintCV(price),
      ],
      onFinish: (data) => {
        console.log('Transaction:', data)
        setMake('')
        setModel('')
        setYear('')
        setPrice('')
        setTimeout(onCarAdded, 3000)
      },
      userSession,
    })
  }

  return (
    <div className="glass-panel p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-brand-100 rounded-lg text-brand-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Add New Vehicle</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">List a vehicle on the marketplace</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Make</label>
            <input
              type="text"
              placeholder="e.g. Tesla"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Model</label>
            <input
              type="text"
              placeholder="e.g. Model S"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-800 dark:bg-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              placeholder="e.g. 2023"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-4 pr-12 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">STX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Add to Inventory
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCar
