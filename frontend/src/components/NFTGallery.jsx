import { useState, useEffect } from 'react'
import { callReadOnlyFunction, uintCV, principalCV } from '@stacks/transactions'
import * as StacksNetwork from '@stacks/network'
import { openContractCall } from '@stacks/connect'

function NFTGallery({ userData, userSession }) {
  const [nfts, setNfts] = useState([])
  const [totalNFTs, setTotalNFTs] = useState(0)

  useEffect(() => {
    if (userData) {
      loadNFTs()
    }
  }, [userData])

  const loadNFTs = async () => {
    try {
      const network = new StacksNetwork.StacksTestnet()
      const result = await callReadOnlyFunction({
        network,
        contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
        contractName: 'car-nft',
        functionName: 'get-last-token-id',
        functionArgs: [],
        senderAddress: userData?.profile?.stxAddress?.testnet || 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      })

      const total = parseInt(result.value)
      setTotalNFTs(total)

      const nftPromises = []
      for (let i = 0; i < total; i++) {
        nftPromises.push(loadNFT(i))
      }
      const loadedNFTs = await Promise.all(nftPromises)
      setNfts(loadedNFTs.filter(nft => nft !== null))
    } catch (error) {
      console.error('Error loading NFTs:', error)
    }
  }

  const loadNFT = async (tokenId) => {
    try {
      const network = new StacksNetwork.StacksTestnet()
      const metadata = await callReadOnlyFunction({
        network,
        contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
        contractName: 'car-nft',
        functionName: 'get-metadata',
        functionArgs: [uintCV(tokenId)],
        senderAddress: userData?.profile?.stxAddress?.testnet || 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      })

      const owner = await callReadOnlyFunction({
        network,
        contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
        contractName: 'car-nft',
        functionName: 'get-owner',
        functionArgs: [uintCV(tokenId)],
        senderAddress: userData?.profile?.stxAddress?.testnet || 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      })

      if (metadata.type === 'ok' && metadata.value.type === 'some') {
        const data = metadata.value.value.data
        const ownerAddress = owner.value.type === 'some' ? owner.value.value.address : null

        return {
          id: tokenId,
          make: data.make.data,
          model: data.model.data,
          year: parseInt(data.year.value),
          vin: data.vin.data,
          uri: data.uri.data,
          owner: ownerAddress,
        }
      }
      return null
    } catch (error) {
      console.error(`Error loading NFT ${tokenId}:`, error)
      return null
    }
  }

  const transferNFT = async (tokenId) => {
    const recipient = prompt('Enter recipient address:')
    if (!recipient) return

    await openContractCall({
      network: new StacksNetwork.StacksTestnet(),
      contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      contractName: 'car-nft',
      functionName: 'transfer',
      functionArgs: [
        uintCV(tokenId),
        principalCV(userData.profile.stxAddress.testnet),
        principalCV(recipient)
      ],
      onFinish: (data) => {
        console.log('Transfer:', data)
        setTimeout(loadNFTs, 3000)
      },
      userSession,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🎨 NFT Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-8">No NFTs minted yet</p>
        ) : (
          nfts.map((nft) => (
            <div key={nft.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-indigo-50">
              <div className="bg-white rounded-lg p-4 mb-3">
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  {nft.make} {nft.model}
                </h3>
                <p className="text-gray-600">Year: {nft.year}</p>
                <p className="text-gray-600 text-sm">VIN: {nft.vin}</p>
                <p className="text-xs text-gray-500 mt-2 break-all">Token ID: #{nft.id}</p>
              </div>
              
              <p className="text-xs text-gray-500 mb-3">
                Owner: {nft.owner?.slice(0, 8)}...
              </p>

              {userData && nft.owner === userData.profile.stxAddress.testnet && (
                <button
                  onClick={() => transferNFT(nft.id)}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Transfer NFT
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NFTGallery
