"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { QuantityInput } from "@/components/quantity-input";
import { useCart } from "@/contexts/cart-context";
import { ArrowRight, Trash2, MessageCircle, Table, Grid } from "lucide-react";
import {
	Table as TableComponent,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function OrderPage() {
	const { items, updateQuantity, removeItem, clearCart, getTotalPrice } =
		useCart();
	const [viewMode, setViewMode] = useState<"card" | "table">("card");

	// Group items by category
	const groupedItems = items.reduce(
		(acc, item) => {
			if (!acc[item.category]) {
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		},
		{} as Record<string, typeof items>,
	);

	const handleSendToWhatsApp = () => {
		if (items.length === 0) return;

		let message = "سفارش جدید:\n\n";

		for (const [category, categoryItems] of Object.entries(groupedItems)) {
			message += `📦 ${category}:\n`;
			for (const item of categoryItems) {
				message += `• ${item.name} - ${item.quantity} عدد - ${(item.price * item.quantity).toLocaleString("fa-IR")} تومان\n`;
			}
			message += "\n";
		}

		message += `💰 مجموع کل: ${getTotalPrice().toLocaleString("fa-IR")} تومان`;

		// In a real app, this would open WhatsApp
		const whatsappUrl = `https://wa.me/971502597949?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank");
	};

	if (items.length === 0) {
		return (
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
				<div className="flex items-center mb-6">
					<Link href="/">
						<Button variant="ghost" size="sm">
							<ArrowRight className="h-4 w-4 ml-2" />
							بازگشت
						</Button>
					</Link>
					<h1 className="text-xl font-bold text-gray-900 mr-4">سبد خرید</h1>
				</div>

				<div className="text-center py-12">
					<p className="text-gray-500 mb-4">سبد خرید شما خالی است</p>
					<Link href="/">
						<Button>شروع خرید</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<Link href="/">
						<Button variant="ghost" size="sm">
							<ArrowRight className="h-4 w-4 ml-2" />
							بازگشت
						</Button>
					</Link>
					<h1 className="text-xl font-bold text-gray-900 mr-4">سبد خرید</h1>
				</div>

				<div className="flex items-center space-x-2 space-x-reverse">
					<Button variant="outline" size="sm" onClick={clearCart}>
						پاک کردن همه
					</Button>
				</div>
			</div>

			<div className="border rounded-md flex w-fit">
				<Button
					variant={viewMode === "card" ? "default" : "ghost"}
					size="sm"
					onClick={() => setViewMode("card")}
					className="rounded-l-none"
				>
					<Grid className="h-4 w-4 ml-1" />
					کارت
				</Button>
				<Button
					variant={viewMode === "table" ? "default" : "ghost"}
					size="sm"
					onClick={() => setViewMode("table")}
					className="rounded-r-none"
				>
					<Table className="h-4 w-4 ml-1" />
					جدول
				</Button>
			</div>

			{viewMode === "card" ? (
				<div className="space-y-4 mt-4">
					{Object.entries(groupedItems).map(([category, categoryItems]) => (
						<Card key={category}>
							<CardHeader className="pb-3">
								<CardTitle className="flex items-center text-lg">
									<span className="w-3 h-3 bg-blue-500 rounded-full ml-2" />
									{category}
									<Badge variant="secondary" className="mr-2 text-xs">
										{categoryItems.length} محصول
									</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="space-y-4">
									{categoryItems.map((item) => (
										<div
											key={item.id}
											className="border rounded-lg bg-gray-50 p-3"
										>
											<div className="flex items-center space-x-3 space-x-reverse mb-2">
												{/* <Image
													src="/placeholder.svg"
													alt={item.name}
													width={50}
													height={50}
													className="w-12 h-12 object-cover rounded-md flex-shrink-0"
												/> */}

												<div className="flex-1 min-w-0">
													<h3 className="font-medium text-gray-900 text-sm truncate">
														{item.name}
													</h3>
													{/* <Badge variant="outline" className="text-xs mt-1">
														{item.subcategory}
													</Badge> */}
												</div>

												<Button
													variant="outline"
													size="sm"
													onClick={() => removeItem(item.id)}
													className="text-red-600 hover:text-red-700 h-8 w-8 p-0 flex-shrink-0"
												>
													<Trash2 className="h-3 w-3" />
												</Button>
											</div>

											<div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
												{/* <div className="flex items-center space-x-2 space-x-reverse">
													<p className="text-sm text-gray-600">قیمت واحد:</p>
													<p className="text-sm font-semibold text-green-600">
														{item.price.toLocaleString("fa-IR")} تومان
													</p>
												</div> */}

												<QuantityInput
													value={item.quantity}
													onChange={(quantity) =>
														updateQuantity(item.id, quantity)
													}
													min={1}
												/>
											</div>

											{/* <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
												<span className="text-sm text-gray-600">مجموع:</span>
												<span className="font-bold text-green-600">
													{(item.price * item.quantity).toLocaleString("fa-IR")}{" "}
													تومان
												</span>
											</div> */}
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<Card className="mt-4">
					<CardHeader>
						<CardTitle>لیست سفارش</CardTitle>
					</CardHeader>
					<CardContent>
						<TableComponent>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50px]">ردیف</TableHead>
									<TableHead className="text-start">نام محصول</TableHead>
									{/* <TableHead>دسته‌بندی</TableHead> */}
									<TableHead className="text-center">تعداد</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{items.map((item, index) => (
									<TableRow key={item.id}>
										<TableCell className="font-medium">{index + 1}</TableCell>
										<TableCell>{item.name}</TableCell>
										{/* <TableCell>{item.subcategory}</TableCell> */}
										<TableCell className="text-center">
											{item.quantity}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</TableComponent>
					</CardContent>
				</Card>
			)}

			<Card className="mt-6">
				<CardContent className="p-4">
					<div className="space-y-3">
						<div className="flex justify-between items-center">
							<span className="font-medium">تعداد کل اقلام:</span>
							<span>
								{items.reduce((total, item) => total + item.quantity, 0)} عدد
							</span>
						</div>

						{/* <Separator /> */}

						{/* <div className="flex justify-between items-center text-lg font-bold">
							<span>مجموع کل:</span>
							<span className="text-green-600">
								{getTotalPrice().toLocaleString("fa-IR")} تومان
							</span>
						</div> */}

						<Button onClick={handleSendToWhatsApp} className="w-full mt-4">
							<MessageCircle className="h-4 w-4 ml-2" />
							ارسال سفارش از طریق واتساپ
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
