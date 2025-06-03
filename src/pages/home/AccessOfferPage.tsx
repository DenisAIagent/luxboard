import React from 'react';
import { ArrowRight, Check, Star, Users, Shield, Clock } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function AccessOfferPage() {
  const steps: Step[] = [
    {
      number: 1,
      title: "Créez votre compte",
      description: "Inscrivez-vous gratuitement en quelques minutes"
    },
    {
      number: 2,
      title: "Choisissez votre formule",
      description: "Sélectionnez l'offre adaptée à vos besoins"
    },
    {
      number: 3,
      title: "Accédez aux privilèges",
      description: "Découvrez nos offres exclusives et partenariats"
    },
    {
      number: 4,
      title: "Gérez vos clients",
      description: "Simplifiez la gestion de votre clientèle VIP"
    }
  ];

  const benefits: Benefit[] = [
    {
      title: "Accès Premium",
      description: "Bénéficiez d'offres exclusives et de tarifs privilégiés",
      icon: Star
    },
    {
      title: "Support Dédié",
      description: "Une équipe à votre écoute 24/7 pour vous accompagner",
      icon: Users
    },
    {
      title: "Sécurité Garantie",
      description: "Vos données et transactions sont protégées",
      icon: Shield
    },
    {
      title: "Mise à jour en temps réel",
      description: "Restez informé des dernières offres et opportunités",
      icon: Clock
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sophie Martin",
      role: "Concierge VIP",
      content: "LuxBoard a transformé ma façon de travailler. Les offres exclusives et le support sont exceptionnels.",
      rating: 5
    },
    {
      name: "Thomas Dubois",
      role: "Directeur d'Agence",
      content: "Une plateforme indispensable pour gérer efficacement notre clientèle haut de gamme.",
      rating: 5
    },
    {
      name: "Marie Laurent",
      role: "Consultante en Luxe",
      content: "L'interface est intuitive et les offres sont vraiment uniques. Je recommande vivement !",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Votre Conciergerie de Luxe
            </h1>
            <p className="mt-6 text-xl text-yellow-100 max-w-3xl mx-auto">
              Accédez à un réseau exclusif de prestataires de luxe et offrez à vos clients 
              des expériences inoubliables.
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-yellow-600 bg-white hover:bg-yellow-50"
              >
                Commencer maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Comment ça marche ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              En quelques étapes simples, accédez à notre réseau exclusif
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mt-4">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Pourquoi choisir LuxBoard ?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Des avantages exclusifs pour votre business
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Ce qu'en disent nos membres
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez les retours d'expérience de nos utilisateurs
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Prêt à commencer ?</span>
            <span className="block text-yellow-200">
              Rejoignez LuxBoard dès aujourd'hui.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-yellow-600 bg-white hover:bg-yellow-50"
              >
                Créer un compte
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400"
              >
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                À propos
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Qui sommes-nous
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Carrières
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Légal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Réseaux sociaux
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              © 2024 LuxBoard. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 