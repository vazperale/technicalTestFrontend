import { useContext } from 'react';
import CartContext from './cartContext';

// Hook personalizado para usar el contexto
const useCart = () => useContext(CartContext);

export default useCart;
