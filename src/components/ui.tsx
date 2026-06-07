import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Button({ className, variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) {
  return (
    <button
      className={cn(
        "w-full rounded-xl py-4 px-6 text-sm font-medium transition-all duration-300 ease-in-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        variant === 'primary' && "bg-olive-500 text-white hover:bg-olive-600 shadow-md",
        variant === 'secondary' && "bg-beige-100 text-olive-800 hover:bg-beige-200",
        variant === 'outline' && "border-2 border-olive-500 text-olive-600 hover:bg-olive-50",
        className
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-olive-100 overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full bg-beige-50 border border-olive-200 rounded-xl px-4 py-3 text-olive-900 placeholder:text-olive-300 focus:outline-none focus:ring-2 focus:ring-olive-500/20 focus:border-olive-500 transition-all",
        className
      )}
      {...props}
    />
  );
}

export function TextArea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full bg-beige-50 border border-olive-200 rounded-xl px-4 py-3 text-olive-900 placeholder:text-olive-300 focus:outline-none focus:ring-2 focus:ring-olive-500/20 focus:border-olive-500 transition-all resize-none",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block text-sm font-medium text-olive-700 mb-1.5", className)}
      {...props}
    />
  );
}
