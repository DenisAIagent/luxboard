import React, { useState } from 'react';
import { Search, Plus, Gift, Calendar, Star, MapPin, Phone, Mail, Crown, ChevronRight, Users, Clock, Award, Filter, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

interface PrivilegeOffer {
  title: string;
  restaurant: string;
  discount: string;
  location: string;
  rating: number;
  category: string;
  validUntil: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  action: string;
}

interface RecentActivity {
  type: 'reservation' | 'privilege' | 'event';
  text: string;
  time: string;
  client: string | null;
}

const LuxBoardDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    'Tous', 'Restaurants', 'Hôtels', 'Spa & Bien-être', 'Événements', 'Offres Privilèges', 'Paris', 'Lyon', 'Côte d\'Azur'
  ];

  const privilegeOffers: PrivilegeOffer[] = [
    {
      title: "Dîner Michelin Privilégié",
      restaurant: "Le Meurice Alain Ducasse",
      discount: "-30%",
      location: "Paris 1er",
      rating: 5,
      category: "Restaurant",
      validUntil: "31 Déc 2025"
    },
    {
      title: "Suite Upgrade Garanti",
      restaurant: "Hôtel Plaza Athénée",
      discount: "Gratuit",
      location: "Paris 8ème",
      rating: 5,
      category: "Hôtel",
      validUntil: "30 Juin 2025"
    },
    {
      title: "Spa Package VIP",
      restaurant: "Four Seasons George V",
      discount: "-40%",
      location: "Paris 8ème",
      rating: 5,
      category: "Spa",
      validUntil: "15 Mars 2025"
    },
    {
      title: "Table Privée Exclusive",
      restaurant: "L'Ambroisie",
      discount: "Réservé",
      location: "Paris 4ème",
      rating: 5,
      category: "Restaurant",
      validUntil: "Permanent"
    }
  ];

  const quickActions: QuickAction[] = [
    {
      title: "Ajouter un Prestataire",
      description: "Recommandez un nouveau prestataire de qualité à notre équipe éditoriale.",
      icon: Plus,
      color: "bg-blue-500",
      action: "recommend"
    },
    {
      title: "Offres Privilèges",
      description: "Consultez les dernières offres exclusives pour vos clients VIP.",
      icon: Gift,
      color: "bg-pink-500",
      action: "privileges"
    },
    {
      title: "Événements Exclusifs",
      description: "Découvrez les événements privés et expériences uniques.",
      icon: Calendar,
      color: "bg-blue-400",
      action: "events"
    }
  ];

  const recentActivity: RecentActivity[] = [
    {
      type: "reservation",
      text: "Nouvelle réservation chez Le Bristol confirmée",
      time: "Il y a 2h",
      client: "M. Dubois"
    },
    {
      type: "privilege",
      text: "Nouveau privilège disponible : Spa Shangri-La",
      time: "Il y a 4h",
      client: null
    },
    {
      type: "event",
      text: "Invitation gala privé Cartier ajoutée",
      time: "Hier",
      client: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://i.postimg.cc/FHNQXBwp/Chat-GPT-Image-1-juin-2025-15-02-02.png" 
                alt="LuxBoard Logo" 
                className="w-8 h-8 mr-3"
              />
              <span className="text-xl font-bold text-gray-900">LUXBOARD</span>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Prestataires
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Offres Privilèges
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Événements
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Dashboard
              </a>
            </nav>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-700">Marie Dubois</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">MD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Votre Conciergerie de Luxe
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les meilleurs prestataires, offres privilèges et événements 
            exclusifs pour vos clients les plus exigeants.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un prestataire, une offre ou un événement..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {action.description}
                    </p>
                    <button className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
                      En savoir plus →
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Privileges Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Offres Privilèges</h2>
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Voir toutes les offres
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {privilegeOffers.map((offer, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mb-2">
                            {offer.category}
                          </span>
                          <h3 className="font-bold text-gray-900 mb-1">{offer.title}</h3>
                          <p className="text-gray-600 text-sm">{offer.restaurant}</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-100 text-green-800 text-sm font-bold px-2 py-1 rounded">
                            {offer.discount}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {offer.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex text-yellow-400">
                          {[...Array(offer.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          Valide jusqu'au {offer.validUntil}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Crown className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Votre Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-yellow-100">Clients satisfaits</span>
                  <span className="text-2xl font-bold">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-100">Réservations ce mois</span>
                  <span className="text-2xl font-bold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-100">Privilèges utilisés</span>
                  <span className="text-2xl font-bold">23</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Activité Récente</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.text}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                          {activity.client && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{activity.client}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Support Premium</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-green-500" />
                    <span>Support 24/7 : 01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                    <span>concierge@luxboard.com</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>Membre Premium</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Contacter le Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LuxBoardDashboard; 