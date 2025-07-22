'use client';

// Brand names that will be displayed as text logos
const brands = [
  'CARTIER',
  'CASIO',
  'CELLINI',
  'CITIZEN',
  'CREDENCE',
  'FIYTA',
  'MONTBLANC',
  'OBAKU',
  'ROMANSON',
  'ROSSINI',
  'SEIKO',
  'SONATA',
  'TIMEX',
  'TITAN',
];

const Brands = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-red-600 mb-4">
            OUR BRANDS
          </h2>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-6 md:grid-cols-11 gap-4 items-center">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-sm font-medium text-gray-700 text-center">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
