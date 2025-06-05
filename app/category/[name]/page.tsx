"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchInput } from "@/components/search-input";
import { QuantityInput } from "@/components/quantity-input";
import { categoriesData, getItemPrice } from "@/lib/data";
import { useCart } from "@/contexts/cart-context";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CategoryPage() {
	const params = useParams();
	const categoryName = decodeURIComponent(params.name as string);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
	const [quantities, setQuantities] = useState<Record<string, number>>({});
	const [isSearchSticky, setIsSearchSticky] = useState(false);

	const { addItem, items, updateQuantity, removeItem } = useCart();

	const category = categoriesData.categories.find(
		(cat) => cat.name === categoryName,
	);

	const filteredItems = useMemo(() => {
		if (!category) return [];

		const items: Array<{
			name: string;
			subcategory: string;
			category: string;
		}> = [];

		for (const sub of category.subcategories) {
			if (selectedSubcategory === "all" || selectedSubcategory === sub.name) {
				for (const item of sub.items) {
					if (item.name.includes(searchQuery)) {
						items.push({
							name: item.name,
							subcategory: sub.name,
							category: category.name,
						});
					}
				}
			}
		}

		return items;
	}, [category, selectedSubcategory, searchQuery]);

	const getItemId = (item: {
		name: string;
		subcategory: string;
		category: string;
	}) => `${item.category}-${item.subcategory}-${item.name}`;

	const isItemInCart = (item: {
		name: string;
		subcategory: string;
		category: string;
	}) => {
		const itemId = getItemId(item);
		return items.some((cartItem) => cartItem.id === itemId);
	};

	const getCartItemQuantity = (item: {
		name: string;
		subcategory: string;
		category: string;
	}) => {
		const itemId = getItemId(item);
		const cartItem = items.find((cartItem) => cartItem.id === itemId);
		return cartItem?.quantity || 1;
	};

	const handleItemSelect = (
		item: { name: string; subcategory: string; category: string },
		checked: boolean,
	) => {
		const itemId = getItemId(item);

		if (checked) {
			const quantity = quantities[item.name] || 1;
			addItem({
				name: item.name,
				category: item.category,
				subcategory: item.subcategory,
				quantity: quantity,
				price: getItemPrice(item.name),
			});
		} else {
			removeItem(itemId);
		}
	};

	const handleQuantityChange = (
		item: { name: string; subcategory: string; category: string },
		quantity: number,
	) => {
		const itemId = getItemId(item);
		setQuantities((prev) => ({ ...prev, [item.name]: quantity }));

		if (isItemInCart(item)) {
			updateQuantity(itemId, quantity);
		}
	};

	// Handle scroll event to detect when search becomes sticky
	if (typeof window !== "undefined") {
		window.addEventListener("scroll", () => {
			const scrollPosition = window.scrollY;
			setIsSearchSticky(scrollPosition > 16); // Adjust this threshold as needed
		});
	}

	if (!category) {
		return (
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<p className="text-center text-gray-500">دسته‌بندی یافت نشد</p>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto relative pb-20">
			<div className="flex items-center p-4 sm:px-6 lg:px-8">
				<Link href="/">
					<Button variant="ghost" size="sm">
						<ArrowRight className="h-4 w-4 ml-2" />
						بازگشت
					</Button>
				</Link>
				<h1 className="text-xl font-bold text-gray-900 mr-4">{categoryName}</h1>
			</div>

			<div
				className={`sticky bg-white w-full top-16 z-40 ${isSearchSticky ? "pt-4" : ""}`}
			>
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
						<SearchInput
							value={searchQuery}
							onChange={setSearchQuery}
							placeholder={`جستجو در ${categoryName}...`}
							className="mb-3"
						/>

						<div className="flex space-x-2 space-x-reverse overflow-x-auto pt-1 pb-2">
							<Badge
								variant={selectedSubcategory === "all" ? "default" : "outline"}
								className="cursor-pointer whitespace-nowrap px-3.5 py-1.5"
								onClick={() => setSelectedSubcategory("all")}
							>
								همه
							</Badge>
							{category.subcategories.map((sub) => (
								<Badge
									key={sub.name}
									variant={
										selectedSubcategory === sub.name ? "default" : "outline"
									}
									className="cursor-pointer whitespace-nowrap"
									onClick={() => setSelectedSubcategory(sub.name)}
								>
									{sub.name}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6 px-4 sm:px-6 lg:px-8">
				{filteredItems.map((item) => {
					const isSelected = isItemInCart(item);
					const quantity = isSelected
						? getCartItemQuantity(item)
						: quantities[item.name] || 1;

					return (
						<Card
							key={`${item.subcategory}-${item.name}`}
							className={`transition-all ${isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
						>
							<CardContent className="p-3">
								<div className="flex items-center space-x-3 space-x-reverse">
									<Checkbox
										checked={isSelected}
										onCheckedChange={(checked) =>
											handleItemSelect(item, checked as boolean)
										}
									/>

									{/* <Image
                    src="/placeholder.svg"
                    alt={item.name}
                    width={60}
                    height={60}
                    className="w-15 h-15 object-cover rounded-md flex-shrink-0"
                  /> */}

									<div className="flex-1 min-w-0">
										<h3 className="font-medium text-gray-900 text-sm mb-1">
											{item.name}
										</h3>
										{/* <Badge variant="secondary" className="text-xs mb-1">
                      {item.subcategory}
                    </Badge> */}
										{/* <p className="text-sm font-semibold text-green-600">
                      {getItemPrice(item.name).toLocaleString("fa-IR")} تومان
                    </p> */}
									</div>

									<div className="flex-shrink-0">
										<QuantityInput
											value={quantity}
											onChange={(value) => handleQuantityChange(item, value)}
											min={1}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{filteredItems.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-500">هیچ محصولی یافت نشد</p>
				</div>
			)}
		</div>
	);
}
