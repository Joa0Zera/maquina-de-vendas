import { notFound } from "next/navigation";
import { PublicLanding } from "@/components/landing/public-landing";
import { getPublishedProductBySlug } from "@/lib/products";

type PageProps = { params: Promise<{ slug: string }> };

export default async function PublicProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <PublicLanding product={product} />;
}
