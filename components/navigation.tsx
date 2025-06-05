"use client";

import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";

export function Navigation() {
	const { getTotalItems } = useCart();
	const totalItems = getTotalItems();

	return (
		<nav className="bg-white shadow-sm border-b sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link
						href="/"
						className="flex items-center space-x-2 space-x-reverse"
					>
						<Store className="h-6 w-6 text-blue-600" />
						<span className="text-lg font-bold text-gray-900">
							فروشگاه ابراهیم
						</span>
					</Link>

					<Link href="/order">
						<Button variant="outline" size="sm" className="relative">
							<ShoppingCart className="h-4 w-4 ml-2" />
							سبد خرید
							{totalItems > 0 && (
								<Badge
									variant="destructive"
									className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
								>
									{totalItems}
								</Badge>
							)}
						</Button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
