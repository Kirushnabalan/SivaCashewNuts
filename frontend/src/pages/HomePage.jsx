import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import { ArrowRight, Star, Truck, Shield, Clock } from "lucide-react"

import ProductCard from "@components/product/ProductCard"
import Button from "@components/ui/Button"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import { ROUTES, FEATURED_PRODUCTS } from "@constants"
import "./HomePage.css"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [featuredRef, featuredInView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [whyUsRef, whyUsInView] = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Using featured products from constants
        setFeaturedProducts(FEATURED_PRODUCTS)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const features = [
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Hand-picked cashews from the finest farms, ensuring superior taste and nutritional value.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Quick and reliable delivery service to get your favorite cashews to your doorstep.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee. If you're not happy, we'll make it right.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our customer service team is always ready to help you with any questions.",
    },
  ]

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      const scrollText = document.querySelector('.scroll-text');
      const currentScrollY = window.scrollY;
      
      if (scrollIndicator && scrollText) {
        // Update text based on scroll direction
        if (currentScrollY > lastScrollY) {
          scrollText.textContent = 'Scroll Down';
        } else {
          scrollText.textContent = 'Scroll Up';
        }

        // Show the indicator while scrolling
        scrollIndicator.classList.add('visible');
        
        // Hide indicator after 1.5 seconds of no scrolling
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          scrollIndicator.classList.remove('visible');
        }, 1500);
        
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              initial={{ y: 50, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Premium Quality Cashew Nuts
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience the finest taste and nutrition in every bite. Hand-picked from the best farms and delivered
              fresh to your doorstep.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ y: 30, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button as={Link} to={ROUTES.SHOP} size="lg">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button as={Link} to={ROUTES.ABOUT} variant="secondary" size="lg">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-text">Scroll Down</span>
          <div className="scroll-icon">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <section className="featured-section" ref={featuredRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ y: 30, opacity: 0 }}
            animate={featuredInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Discover our most popular cashew varieties</p>
          </motion.div>

          {loading ? (
            <LoadingSpinner size="lg" />
          ) : (
            <motion.div
              className="products-grid"
              initial={{ opacity: 0 }}
              animate={featuredInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={featuredInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="section-footer"
            initial={{ y: 30, opacity: 0 }}
            animate={featuredInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button as={Link} to={ROUTES.SHOP} size="lg">
              View All Products <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us-section" ref={whyUsRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ y: 30, opacity: 0 }}
            animate={whyUsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">We're committed to delivering the best cashew experience</p>
          </motion.div>

          <motion.div
            className="features-grid"
            initial={{ opacity: 0 }}
            animate={whyUsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ y: 50, opacity: 0 }}
                animate={whyUsInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
