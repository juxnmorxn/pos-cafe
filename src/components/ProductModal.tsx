"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "@/data/menu";

interface ProductModalProps {
  readonly product: Product | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: Readonly<ProductModalProps>) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal - Fullscreen en mobile, centrado en desktop */}
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div
              initial={{ opacity: 0, y: 100, borderRadius: "0px" }}
              animate={{ opacity: 1, y: 0, borderRadius: "24px" }}
              exit={{ opacity: 0, y: 100, borderRadius: "0px" }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full md:max-w-lg md:w-full overflow-hidden max-h-[90vh] md:max-h-none md:rounded-3xl flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            >
              {/* Imagen - Ratio diferente en mobile */}
              <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Botón cerrar - Más grande en mobile */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="absolute top-3 right-3 md:top-4 md:right-4 p-2.5 md:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                >
                  <X size={24} className="text-[#3B2A28] md:w-5 md:h-5" />
                </motion.button>
              </div>

              {/* Contenido - Scrolleable en mobile */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#2A2A2A] mb-2 md:mb-3 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-base md:text-lg text-[#6B6B6B] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Precio - Fijo abajo en mobile */}
                <div className="flex items-baseline justify-between pt-4 md:pt-6 border-t border-[#EFEDEB]">
                  <div>
                    <p className="text-sm text-[#6B6B6B] mb-1">Precio</p>
                    <span className="text-3xl md:text-4xl font-bold text-[#D96C4E]">
                      ${product.price}
                    </span>
                  </div>
                  <span className="text-sm text-[#A3A3A3]">MXN</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
