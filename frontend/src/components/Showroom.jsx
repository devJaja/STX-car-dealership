import { premiumCars } from '../data/premiumCars'

function Showroom() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Discover Our Collection of Premium Vehicles
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Exclusive luxury and performance cars from 2021-2026
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {premiumCars.map((car) => (
          <div
            key={car.id}
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {car.year}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                {car.make}
              </h3>
              <p className="text-lg text-purple-600 dark:text-purple-400 font-semibold mb-2">
                {car.model}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {car.description}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {(car.price / 1000000).toLocaleString()} STX
                  </p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition text-sm font-semibold">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Showroom
