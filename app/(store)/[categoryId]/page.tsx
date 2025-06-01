import { CategoryWithProductsResponseSchema } from "@/src/schemas";
import ProductCard from "@/components/products/ProductCard";
import { redirect } from "next/navigation";

type Params = Promise<{ categoryId: string }>;

const getProducts = async (categoryId: string) => {
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;
  const request = await fetch(url, {
    next: { tags: ["products-by-category"] },
  });
  const json = await request.json();
  if (!request.ok) {
    redirect("/1");
  }
  const products = CategoryWithProductsResponseSchema.parse(json);
  return products;
};

const StorePage = async ({ params }: { params: Params }) => {
  const { categoryId } = await params;
  const category = await getProducts(categoryId);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {category.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default StorePage;
