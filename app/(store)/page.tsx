import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="space-y-20">
      {/* Banner principal */}
      <section className="relative h-[400px] bg-gradient-to-r from-indigo-400 to-indigo-400 flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Bienvenido a Pet <span className="text-yellow-300">Ecommerce</span>
          </h1>
          <p className="text-lg md:text-xl font-medium">
            Todo para tus mascotas en un solo lugar
          </p>
        </div>
      </section>

      {/* Sección destacada */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <Image
          src="/banner-pet.jpg"
          alt="Mascotas felices"
          width={600}
          height={400}
          className="rounded-lg object-cover w-full"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Cuidado y cariño para tu mejor amigo
          </h2>
          <p className="text-gray-600 mb-6">
            Descubre los mejores productos para el bienestar de tus mascotas.
            Alimentación, juguetes, cuidado personal y mucho más.
          </p>
          <Link
            href="/1"
            className="bg-yellow-300 hover:bg-yellow-400 transition px-6 py-3 rounded-xl font-semibold text-gray-900 text-base shadow-lg uppercase tracking-wide"
          >
            Ver productos
          </Link>
        </div>
      </section>

      {/* Sección de categorías o destacados */}
      <section className="max-w-7xl mx-auto px-6">
        <h3 className="text-2xl font-bold mb-6">Categorías populares</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/cat-food.jpg"
              alt="Comida para gatos"
              width={400}
              height={300}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-bold mb-2">Gatos</h4>
              <p className="text-gray-600 text-sm">
                Comida, juguetes y más para gatos felices.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/dog-accessories.jpg"
              alt="Accesorios para perros"
              width={400}
              height={300}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-bold mb-2">Perros</h4>
              <p className="text-gray-600 text-sm">
                Todo lo que tu perro necesita para ser feliz.
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src="/small-pets.jpg"
              alt="Pequeñas mascotas"
              width={400}
              height={300}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-bold mb-2">Otros</h4>
              <p className="text-gray-600 text-sm">
                Accesorios para roedores, aves y más.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
