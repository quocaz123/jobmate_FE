import * as jwtDecodeModule from 'jwt-decode';

// Provide a robust decode function that works whether the package exposes a default export or named exports
const decodeFn = jwtDecodeModule && jwtDecodeModule.default ? jwtDecodeModule.default : jwtDecodeModule;

export default function decodeJwt(token) {
  return decodeFn(token);
}
