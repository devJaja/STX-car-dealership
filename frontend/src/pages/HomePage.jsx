import Showroom from '../components/Showroom'

function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to LuxeDrive
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Experience the future of luxury car ownership on the blockchain
        </p>
      </section>
      <Showroom />
    </div>
  )
}

export default HomePage
