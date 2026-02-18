import { useState, useEffect, useCallback } from 'react'
import { uintCV, principalCV } from '@stacks/transactions'
import * as StacksNetwork from '@stacks/network'
import { openContractCall } from '@stacks/connect'

function NFTGallery({ userData, userSession }) {
  const [nfts, setNfts] = useState([])

  const loadNFT = useCallback(async (tokenId) => {
    try {
      const network = StacksNetwork.createNetwork("mainnet")
      const metadata = await network.callReadOnlyFunction({
        contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
        contractName: 'car-nft',
        functionName: 'get-metadata',
        functionArgs: [uintCV(tokenId)],
        senderAddress: userData?.profile?.stxAddress?.mainnet || 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      })

      const owner = await network.callReadOnlyFunction({
        contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
        contractName: 'car-nft',
        functionName: 'get-owner',
        functionArgs: [uintCV(tokenId)],
        senderAddress: userData?.profile?.stxAddress?.mainnet || 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
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
  }, [userData])

  const loadNFTs = useCallback(async () => {
    try {
      const network = StacksNetwork.createNetwork("mainnet")
      const result = await network.callReadOnlyFunction({
        contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
        contractName: 'car-nft',
        functionName: 'get-last-token-id',
        functionArgs: [],
        senderAddress: userData?.profile?.stxAddress?.mainnet || 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      })

      const total = parseInt(result.value)

      const nftPromises = []
      for (let i = 0; i < total; i++) {
        nftPromises.push(loadNFT(i))
      }
      const loadedNFTs = await Promise.all(nftPromises)
      setNfts(loadedNFTs.filter(nft => nft !== null))
    } catch (error) {
      console.error('Error loading NFTs:', error)
    }
  }, [userData, loadNFT])

  useEffect(() => {
    if (userData) {
      loadNFTs()
    }
  }, [userData, loadNFTs])

  const transferNFT = async (tokenId) => {
    const recipient = prompt('Enter recipient address:')
    if (!recipient) return

    await openContractCall({
      network: StacksNetwork.createNetwork("mainnet"),
      contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      contractName: 'car-nft',
      functionName: 'transfer',
      functionArgs: [
        uintCV(tokenId),
        principalCV(userData.profile.stxAddress.mainnet),
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
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🎨 NFT Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">
            <p>No digital assets found in your connected wallet.</p>
          </div>
        ) : (
          nfts.map((nft) => (
            <div key={nft.id} className="bg-dark-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl flex flex-col group">
              <div className="p-4 bg-gradient-to-r from-dark-800 to-dark-900 border-b border-gray-800 flex justify-between items-center">
                <span className="text-gray-400 font-mono text-xs">#{nft.id}</span>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>

              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-white mb-1">
                  {nft.make} {nft.model}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{nft.year}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">VIN</span>
                    <span className="text-gray-300 font-mono">{nft.vin}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Owner</span>
                    <span className="text-gray-300 font-mono" title={nft.owner}>{nft.owner?.slice(0, 6)}...{nft.owner?.slice(-4)}</span>
                  </div>
                </div>

                {userData && nft.owner === userData.profile.stxAddress.mainnet && (
                  <button
                    onClick={() => transferNFT(nft.id)}
                    className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors border border-gray-700"
                  >
                    Transfer Asset
                  </button>
                )}
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-brand-600 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NFTGallery
