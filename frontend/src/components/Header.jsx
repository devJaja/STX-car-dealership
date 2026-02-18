import useDarkMode from '../hooks/useDarkMode'
import { Link, useLocation } from 'react-router-dom'

function Header({ userData, onConnect, onDisconnect }) {
  const [isDark, setIsDark] = useDarkMode()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/marketplace', label: 'Marketplace' },
    { path: '/manage', label: 'Manage' },
    { path: '/gallery', label: 'Gallery' },
  ]

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-glass border-b border-white/20 dark:border-gray-800 transition-colors duration-300"></div>
      <div className="container mx-auto px-6 relative">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 dark:from-brand-400 dark:to-brand-200 bg-clip-text text-transparent tracking-tight">
                LuxeDrive
              </h1>
            </Link>

            <nav className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707M12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>

            {userData ? (
              <div className="flex items-center gap-4 bg-white/50 dark:bg-dark-800/50 rounded-full pl-4 pr-1 py-1 border border-brand-100 dark:border-dark-700 shadow-sm transition-colors">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-brand-900 dark:text-brand-300 uppercase tracking-wider">Connected</span>
                  <span className="text-sm text-brand-600 dark:text-brand-400 font-mono">
                    {userData.profile.stxAddress.mainnet.slice(0, 6)}...{userData.profile.stxAddress.mainnet.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={onDisconnect}
                  className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-400 dark:text-red-300 p-2 rounded-full transition-colors"
                  title="Disconnect"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="btn-primary shadow-lg shadow-brand-500/20"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
