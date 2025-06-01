import { Product } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initial: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

export const CartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartItems: initial,
	},
	reducers: {
		addToCart: (state, action: PayloadAction<Product>) => {
			const cartItems = state.cartItems;
			if (!cartItems.find((item: Product) => item.id === action.payload.id)) {
				cartItems.push(action.payload);
				state.cartItems = cartItems;
				localStorage.setItem('cart', JSON.stringify(cartItems));
			}
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const cartItems = state.cartItems;
			const updatedCartItems = cartItems.filter((item: Product) => item.id !== action.payload);
			state.cartItems = updatedCartItems;
			localStorage.setItem('cart', JSON.stringify(updatedCartItems));
		},
	},
});

export const { addToCart, removeFromCart } = CartSlice.actions;

export default CartSlice.reducer;
