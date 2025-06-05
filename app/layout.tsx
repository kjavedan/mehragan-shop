import type React from "react";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { Navigation } from "@/components/navigation";

const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

export const metadata: Metadata = {
	title: "فروشگاه آنلاین",
	description: "سفارش آنلاین کالاهای ساختمانی",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fa" dir="rtl">
			<body className={vazirmatn.className}>
				<CartProvider>
					<Navigation />
					<main className="min-h-screen bg-gray-50">{children}</main>
				</CartProvider>
			</body>
		</html>
	);
}
