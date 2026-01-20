import { motion } from 'framer-motion';

export default function Gallery() {
  const images = [
    { url: 'https://images.pexels.com/photos/33474124/pexels-photo-33474124.jpeg', alt: 'Gourmet plating', span: 'col-span-2 row-span-2' },
    { url: 'https://images.unsplash.com/photo-1761062083136-dcfbd2a000f9', alt: 'Restaurant interior', span: 'col-span-1 row-span-1' },
    { url: 'https://images.unsplash.com/photo-1673993445820-bf5721697cfa', alt: 'Dining area', span: 'col-span-1 row-span-1' },
    { url: 'https://images.unsplash.com/photo-1744421461525-3ece303e8a37', alt: 'Chef preparing food', span: 'col-span-1 row-span-2' },
    { url: 'https://images.pexels.com/photos/32742933/pexels-photo-32742933.jpeg', alt: 'Main course', span: 'col-span-1 row-span-1' },
    { url: 'https://images.pexels.com/photos/9124697/pexels-photo-9124697.jpeg', alt: 'Friends dining', span: 'col-span-2 row-span-1' },
    { url: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f', alt: 'Bruschetta', span: 'col-span-1 row-span-1' },
    { url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288', alt: 'Salmon dish', span: 'col-span-1 row-span-1' },
    { url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', alt: 'Pasta', span: 'col-span-1 row-span-2' },
    { url: 'https://images.unsplash.com/photo-1558030006-450675393462', alt: 'Steak', span: 'col-span-2 row-span-1' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20" data-testid="gallery-page">
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-background-alt">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-4">
            Gallery
          </h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            A visual journey through our culinary creations and dining ambience
          </p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`${image.span} rounded-2xl overflow-hidden group cursor-pointer`}
                data-testid={`gallery-image-${index}`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
            Experience It Yourself
          </h2>
          <p className="text-xl mb-8 text-white/90">
            These photos only capture a fraction of the experience. Come dine with us!
          </p>
          <button
            onClick={() => window.location.href = '/booking'}
            className="bg-white text-primary rounded-full px-8 py-3.5 font-medium text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            data-testid="gallery-book-btn"
          >
            Reserve Your Table
          </button>
        </div>
      </section>
    </div>
  );
}
