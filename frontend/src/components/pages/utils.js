// src/components/pages/utils.js

// Función para capitalizar la primera letra de una cadena
export const capitalize = (string) => {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  