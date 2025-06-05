"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface CartItem {
	id: string;
	name: string;
	category: string;
	subcategory: string;
	quantity: number;
	price: number;
}

interface CartContextType {
	items: CartItem[];
	addItem: (item: Omit<CartItem, "id">) => void;
	updateQuantity: (id: string, quantity: number) => void;
	removeItem: (id: string) => void;
	clearCart: () => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);

	const addItem = (newItem: Omit<CartItem, "id">) => {
		const id = `${newItem.category}-${newItem.subcategory}-${newItem.name}`;
		setItems((prev) => {
			const existingItem = prev.find((item) => item.id === id);
			if (existingItem) {
				return prev.map((item) =>
					item.id === id
						? { ...item, quantity: item.quantity + newItem.quantity }
						: item,
				);
			}
			return [...prev, { ...newItem, id }];
		});
	};

	const updateQuantity = (id: string, quantity: number) => {
		if (quantity <= 0) {
			removeItem(id);
			return;
		}
		setItems((prev) =>
			prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
		);
	};

	const removeItem = (id: string) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setItems([]);
	};

	const getTotalItems = () => {
		return items.reduce((total, item) => total + item.quantity, 0);
	};

	const getTotalPrice = () => {
		return items.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				items,
				addItem,
				updateQuantity,
				removeItem,
				clearCart,
				getTotalItems,
				getTotalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
