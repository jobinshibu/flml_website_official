import ProductShowcase from "@/components/sections/ProductShowcase";

export const metadata = {
  title: "Products & Enterprise Apps | First Logic Meta Lab",
  description: "Explore enterprise mobile applications, healthcare ERP backbones, and high-scale software platforms engineered by First Logic Meta Lab."
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white pt-20">
      <ProductShowcase />
    </main>
  );
}
