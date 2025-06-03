import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search, Bell, User, Train, Plane, Bus, Home, Calendar, Settings, LogOut } from 'lucide-react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-luxboard-gris-clair">
      {/* Header */}
      <header className="bg-luxboard-noir text-luxboard-blanc">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-luxboard-gris rounded-lg"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="font-playfair text-2xl font-bold">LuxBoard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-luxboard-gris rounded-lg">
                <Search size={24} />
              </button>
              <button className="p-2 hover:bg-luxboard-gris rounded-lg">
                <Bell size={24} />
              </button>
              <button className="p-2 hover:bg-luxboard-gris rounded-lg">
                <User size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-luxboard-noir text-luxboard-blanc transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block p-2 hover:bg-luxboard-gris rounded-lg">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/prestataires" className="block p-2 hover:bg-luxboard-gris rounded-lg">
                  Prestataires
                </Link>
              </li>
              <li>
                <Link to="/offres" className="block p-2 hover:bg-luxboard-gris rounded-lg">
                  Offres Privilèges
                </Link>
              </li>
              <li>
                <Link to="/evenements" className="block p-2 hover:bg-luxboard-gris rounded-lg">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/transport" className="flex items-center p-2 hover:bg-luxboard-gris rounded-lg">
                  <Train className="w-5 h-5 mr-2" />
                  <span>Transport</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 