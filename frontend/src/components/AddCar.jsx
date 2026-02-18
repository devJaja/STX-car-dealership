import { useState } from 'react'
import { openContractCall } from '@stacks/connect'
import * as StacksNetwork from '@stacks/network'
import { stringAsciiCV, uintCV } from '@stacks/transactions'

function AddCar({ userData, userSession, onCarAdded }) {
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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Car (Owner Only)</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <input
          type="number"
          placeholder="Price (microSTX)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
        >
          Add Car
        </button>
      </form>
    </div>
  )
}

export default AddCar
