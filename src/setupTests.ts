import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills for testing environment
// @ts-ignore
global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// Configuration globale pour les tests

// Mock des variables d'environnement
process.env.SNCF_API_KEY = 'test-sncf-key';
process.env.SNCF_API_URL = 'https://api.sncf.com';
process.env.AMADEUS_CLIENT_ID = 'test-amadeus-id';
process.env.AMADEUS_CLIENT_SECRET = 'test-amadeus-secret';
process.env.AMADEUS_API_URL = 'https://api.amadeus.com';
process.env.FLIXBUS_API_KEY = 'test-flixbus-key';
process.env.FLIXBUS_API_URL = 'https://api.flixbus.com';

// Étendre les matchers de Jest
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null;
    if (pass) {
      return {
        message: () => `expected ${received} not to be in the document`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be in the document`,
        pass: false,
      };
    }
  },
}); 