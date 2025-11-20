"use client"

import { useCartStore } from "@/lib/stores/cart-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function CartButton() {
  const { itemCount, openCart } = useCartStore()

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative"
      onClick={openCart}
    >
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  )
}

export function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="left" className="w-full sm:max-w-md" dir="rtl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            سلة التسوق
          </SheetTitle>
          <SheetDescription>
            {items.length === 0 ? "سلة التسوق فارغة" : `${items.length} منتج في السلة`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  سلة التسوق فارغة
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  ابدأ بإضافة المنتجات إلى سلتك
                </p>
                <Button onClick={closeCart}>
                  تصفح المنتجات
                </Button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-lg border-2 border-gray-100 hover:border-primary/20 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-3xl flex-shrink-0">
                      {item.image || "📦"}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm mb-1 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{item.vendor.name}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 mr-auto"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-left flex flex-col items-end justify-between">
                      <p className="font-bold text-sm">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-500">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer with Subtotal and Actions */}
          {items.length > 0 && (
            <SheetFooter className="border-t pt-4 space-y-4">
              {/* Subtotal */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">المجموع الفرعي</span>
                  <span className="text-lg font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  الضرائب وتكاليف الشحن سيتم حسابها عند الدفع
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    إتمام الطلب
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearCart}
                  >
                    إفراغ السلة
                  </Button>
                </div>
              </div>
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
