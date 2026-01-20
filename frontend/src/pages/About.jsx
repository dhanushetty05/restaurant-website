import { motion } from 'framer-motion';
import { Award, Heart, Users, Leaf } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for perfection in every dish we serve',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Cooking is our art, and we pour love into every creation',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building lasting relationships with our guests',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Committed to eco-friendly and ethical practices',
    },
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="about-page">
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/35420084/pexels-photo-35420084.jpeg)',
        }}
        data-testid="about-hero"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl">Crafting memorable dining experiences since 2010</p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background" data-testid="story-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-8 text-center">
            Welcome to Urban Plate
          </h2>
          <div className="space-y-6 text-lg text-foreground-muted leading-relaxed">
            <p>
              Founded in 2010, Urban Plate was born from a simple dream: to create a dining destination where exceptional food meets warm hospitality. What started as a small neighborhood bistro has grown into a beloved culinary landmark, while staying true to our core values of quality, authenticity, and community.
            </p>
            <p>
              Our journey began when Chef Marcus Thompson returned from training in Europe with a vision—to bring together the finest culinary techniques with locally-sourced, seasonal ingredients. His philosophy was simple: let the ingredients speak for themselves, enhanced by careful preparation and creative presentation.
            </p>
            <p>
              Today, Urban Plate continues to evolve while maintaining the essence that made us special. Our menu changes with the seasons, our relationships with local farmers deepen, and our commitment to creating memorable dining experiences grows stronger every day.
            </p>
            <p>
              We believe dining is about more than just food—it's about connection, celebration, and creating moments that last a lifetime. Whether you're joining us for a casual lunch, a romantic dinner, or a special celebration, we're honored to be part of your story.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background-alt" data-testid="values-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-3xl border border-border/50 text-center hover:border-primary/20 transition-all"
                data-testid={`value-${index}`}
              >
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-background" data-testid="team-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-foreground-muted">
              The talented people behind your dining experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="chef-1">
              <div className="w-48 h-48 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1761095596588-e85f6a028894"
                  alt="Chef Marcus Thompson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                Chef Marcus Thompson
              </h3>
              <p className="text-primary font-medium mb-2">Executive Chef</p>
              <p className="text-foreground-muted">
                Trained in Paris and Milan, bringing 20 years of culinary expertise
              </p>
            </div>
            <div className="text-center" data-testid="chef-2">
              <div className="w-48 h-48 mx-auto rounded-full bg-gray-200 mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                Sofia Martinez
              </h3>
              <p className="text-primary font-medium mb-2">Sous Chef</p>
              <p className="text-foreground-muted">
                Specializing in modern fusion cuisine with a creative twist
              </p>
            </div>
            <div className="text-center" data-testid="manager">
              <div className="w-48 h-48 mx-auto rounded-full bg-gray-200 mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                David Chen
              </h3>
              <p className="text-primary font-medium mb-2">Restaurant Manager</p>
              <p className="text-foreground-muted">
                Ensuring every guest has an exceptional dining experience
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-primary text-white text-center" data-testid="cta-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
            Experience the Urban Plate Difference
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join us for an unforgettable culinary journey
          </p>
          <button
            onClick={() => window.location.href = '/booking'}
            className="bg-white text-primary rounded-full px-8 py-3.5 font-medium text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            data-testid="book-now-btn"
          >
            Book Your Table Today
          </button>
        </div>
      </section>
    </div>
  );
}
