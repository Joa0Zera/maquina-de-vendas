"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FeaturedProduct {
  id: string;
  name: string;
  score: number;
  status: string;
  revenue: number;
  sales: number;
  averageTicket: number;
}

interface FeaturedProductsProps {
  products: FeaturedProduct[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return (
      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <CardTitle>Produtos em Destaque</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-center text-zinc-400 py-8">Nenhum produto encontrado</p>
        </CardContent>
      </Card>
    );
  }

  // Sort by revenue
  const sortedProducts = [...products].sort((a, b) => b.revenue - a.revenue);

  const statusColors: Record<string, string> = {
    published: "bg-green-500/10 text-green-400 border-green-500/30",
    draft: "bg-gray-500/10 text-gray-400 border-gray-500/30",
    building: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  };

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <CardTitle>Produtos em Destaque</CardTitle>
        </div>
        <p className="text-sm text-zinc-400">Ordenado por receita</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedProducts.slice(0, 10).map((product, index) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium hover:text-zinc-100 transition-colors"
                  >
                    {product.name}
                  </Link>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="default" className={statusColors[product.status] || statusColors.draft}>
                      {product.status}
                    </Badge>
                    <span className="text-sm text-zinc-400">Score: {product.score}/100</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-right">
                <div>
                  <p className="text-sm text-zinc-400">Receita</p>
                  <p className="font-semibold text-green-400">R$ {(product.revenue / 100).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Vendas</p>
                  <p className="font-semibold text-blue-400">{product.sales}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Ticket Médio</p>
                  <p className="font-semibold text-purple-400">R$ {(product.averageTicket / 100).toFixed(2)}</p>
                </div>
                <Link href={`/products/${product.id}`}>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
