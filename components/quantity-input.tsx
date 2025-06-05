"use client";

import type React from "react";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuantityInputProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
}

export function QuantityInput({
	value,
	onChange,
	min = 0,
	max = 999,
}: QuantityInputProps) {
	const handleDecrease = () => {
		if (value > min) {
			onChange(value - 1);
		}
	};

	const handleIncrease = () => {
		if (value < max) {
			onChange(value + 1);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number.parseInt(e.target.value) || 0;
		if (newValue >= min && newValue <= max) {
			onChange(newValue);
		}
	};

	return (
		<div className="flex items-center space-x-1 space-x-reverse">
			<Button
				variant="outline"
				size="sm"
				onClick={handleDecrease}
				disabled={value <= min}
				className="h-8 w-8 p-0"
			>
				<Minus className="h-3 w-3" />
			</Button>
			<Input
				type="number"
				value={value}
				onChange={handleInputChange}
				className="w-16 h-8 text-center"
				min={min}
				max={max}
			/>
			<Button
				variant="outline"
				size="sm"
				onClick={handleIncrease}
				disabled={value >= max}
				className="h-8 w-8 p-0"
			>
				<Plus className="h-3 w-3" />
			</Button>
		</div>
	);
}
