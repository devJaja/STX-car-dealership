import NFTGallery from '../components/NFTGallery'

function GalleryPage({ userData, userSession }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          NFT Gallery
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          View and manage your car ownership NFTs
        </p>
      </div>
      {userData ? (
        <NFTGallery 
          userData={userData}
          userSession={userSession}
        />
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-300">
            Connect your wallet to view NFTs
          </p>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
