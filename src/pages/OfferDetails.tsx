import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Crown, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  Calendar,
  Gift,
  AlertCircle,
  Download,
  Share2,
  Bookmark,
  ExternalLink
} from 'lucide-react';

export default function OfferDetails() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedContact, setSelectedContact] = useState('reservation');
  const location = useLocation();
  const navigate = useNavigate();
  const { offer } = location.state || {};

  if (!offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Offre non trouvée</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:text-blue-700"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  const offerDetails = {
    title: offer.title,
    restaurant: offer.restaurant,
    category: offer.category,
    location: `${offer.location} - 228 Rue de Rivoli`,
    rating: offer.rating,
    originalPrice: "280€",
    memberPrice: "196€",
    discount: offer.discount,
    promoCode: "LUXBOARD30",
    validUntil: offer.validUntil,
    description: "Expérience gastronomique d'exception dans le restaurant 3 étoiles Michelin d'Alain Ducasse. Menu dégustation 7 services avec accords mets et vins.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop"
  };

  const eligibilityRules = [
    "Client final uniquement (pas de revente)",
    "Réservation minimum 48h à l'avance", 
    "Maximum 8 personnes par réservation",
    "Dress code exigé (tenue de ville)",
    "Valable du mardi au samedi uniquement"
  ];

  const availabilitySlots = [
    { date: "15 Juin 2025", time: "19h30", status: "available", seats: 4 },
    { date: "18 Juin 2025", time: "20h00", status: "available", seats: 2 },
    { date: "22 Juin 2025", time: "19h30", status: "limited", seats: 8 },
    { date: "25 Juin 2025", time: "20h00", status: "waitlist", seats: 0 },
    { date: "29 Juin 2025", time: "19h30", status: "available", seats: 6 }
  ];

  const contactOptions = [
    {
      id: 'reservation',
      title: 'Réservation Directe',
      icon: Phone,
      contact: 'Mme Sophie Laurent',
      phone: '+33 1 44 58 10 55',
      email: 'reservations@lemeurice.com',
      note: 'Mentionner le code LUXBOARD30 et votre statut de concierge'
    },
    {
      id: 'concierge',
      title: 'Via Concierge Hôtel',
      icon: Crown,
      contact: 'Service Conciergerie Le Meurice',
      phone: '+33 1 44 58 10 10',
      email: 'concierge@lemeurice.com',
      note: 'Tarif privilégié automatiquement appliqué'
    },
    {
      id: 'online',
      title: 'Plateforme Dédiée',
      icon: ExternalLink,
      contact: 'Réservation en ligne',
      phone: null,
      email: 'booking@luxboard-privileges.com',
      note: 'Accès direct avec code membre'
    }
  ];

  const copyPromoCode = () => {
    navigator.clipboard.writeText(offerDetails.promoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleBackToOffers = () => {
    navigate('/dashboard');
  };

  const handleBookmark = () => {
    alert('Offre ajoutée aux favoris');
  };

  const handleShare = () => {
    alert('Partage de l\'offre...');
  };

  const handleDownloadPDF = () => {
    alert('Téléchargement du PDF...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={handleBackToOffers}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img 
                src="https://i.postimg.cc/FHNQXBwp/Chat-GPT-Image-1-juin-2025-15-02-02.png" 
                alt="LuxBoard Logo" 
                className="w-8 h-8 mr-3"
              />
              <span className="text-xl font-bold text-gray-900">LUXBOARD</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-gray-700">Marie Dubois</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">MD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>Offres Privilèges</span>
          <span className="mx-2">/</span>
          <span>Restaurants</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{offerDetails.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Offer Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={offerDetails.image} 
                  alt={offerDetails.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {offerDetails.discount}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    onClick={handleBookmark}
                    className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Bookmark className="w-5 h-5 text-gray-700" />
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mb-2">
                      {offerDetails.category}
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {offerDetails.title}
                    </h1>
                    <h2 className="text-lg text-gray-700 mb-2">
                      {offerDetails.restaurant}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {offerDetails.location}
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(offerDetails.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500 line-through">
                      {offerDetails.originalPrice}
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {offerDetails.memberPrice}
                    </div>
                    <div className="text-sm text-gray-600">par personne</div>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  {offerDetails.description}
                </p>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Code Privilège
                  </h3>
                  <p className="text-yellow-700 text-sm">
                    À mentionner lors de la réservation
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white px-4 py-2 rounded-lg border border-yellow-300">
                    <span className="font-mono font-bold text-lg text-gray-900">
                      {offerDetails.promoCode}
                    </span>
                  </div>
                  <button
                    onClick={copyPromoCode}
                    className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copier
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Eligibility Rules */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
                Conditions d'Éligibilité
              </h3>
              <ul className="space-y-3">
                {eligibilityRules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability Calendar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                Disponibilités
              </h3>
              <div className="space-y-3">
                {availabilitySlots.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="font-medium text-gray-900">{slot.date}</div>
                        <div className="text-sm text-gray-600">{slot.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-600">
                        <Users className="w-4 h-4 inline mr-1" />
                        {slot.seats > 0 ? `${slot.seats} places` : 'Complet'}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        slot.status === 'available' ? 'bg-green-100 text-green-800' :
                        slot.status === 'limited' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {slot.status === 'available' ? 'Disponible' :
                         slot.status === 'limited' ? 'Limitée' : 'Liste d\'attente'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions Rapides</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </button>
                <button 
                  onClick={handleShare}
                  className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager l'offre
                </button>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Comment Réserver</h3>
              
              <div className="space-y-4">
                {contactOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedContact === option.id
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedContact(option.id)}
                    >
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                          <Icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {option.title}
                          </h4>
                          <div className="text-sm text-gray-700 mb-1">
                            <strong>{option.contact}</strong>
                          </div>
                          {option.phone && (
                            <div className="text-sm text-blue-600 mb-1">
                              <Phone className="w-3 h-3 inline mr-1" />
                              {option.phone}
                            </div>
                          )}
                          <div className="text-sm text-blue-600 mb-2">
                            <Mail className="w-3 h-3 inline mr-1" />
                            {option.email}
                          </div>
                          {selectedContact === option.id && (
                            <div className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded">
                              💡 {option.note}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Validity Info */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
              <div className="text-center">
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-2">Validité de l'Offre</h3>
                <p className="text-gray-300 mb-4">
                  Cette offre est valable jusqu'au
                </p>
                <div className="text-2xl font-bold text-yellow-400 mb-4">
                  {offerDetails.validUntil}
                </div>
                <div className="text-sm text-gray-400">
                  Sous réserve de disponibilité
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 