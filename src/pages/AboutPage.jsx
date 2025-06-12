import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award, Users, Leaf, Heart } from "lucide-react"
import "./AboutPage.css"
import chew from "@assets/chewAbout.jpg"
const AboutPage = () => {
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [valuesRef, valuesInView] = useInView({ threshold: 0.2, triggerOnce: true })

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality First",
      description:
        "We never compromise on quality. Every cashew is carefully selected and processed to meet our high standards.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Focused",
      description:
        "Our customers are at the heart of everything we do. We strive to exceed expectations with every order.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainable Practices",
      description: "We work with farmers who use sustainable farming practices to protect our environment.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Family Values",
      description: "As a family business, we treat every customer like family and every product with care.",
    },
  ]

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <motion.section
          className="about-hero"
          ref={aboutRef}
          initial={{ opacity: 0, y: 50 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <h1 className="hero-title">About Siva Cashew Nuts</h1>
            <p className="hero-subtitle">
              Your trusted source for premium quality cashews since our founding. We're passionate about bringing you
              the finest cashews with exceptional taste and nutrition.
            </p>
          </div>
        </motion.section>

        {/* Story Section */}
        <section className="story-section">
          <div className="story-content">
            <motion.div
              className="story-text"
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2>Our Story</h2>
              <p>
                Siva Cashew Nuts began as a small family business with a simple mission: to provide the highest quality
                cashews to our community. What started in a small processing unit has grown into a trusted brand known
                for excellence.
              </p>
              <p>
                We work directly with local farmers, ensuring fair prices for their crops while maintaining the quality
                standards our customers expect. Every cashew that reaches your table has been carefully selected,
                processed, and packaged with the utmost care.
              </p>
              <p>
                Today, we continue to honor our founding principles while embracing modern techniques to bring you the
                freshest, most delicious cashews available.
              </p>
            </motion.div>

            <motion.div
              className="story-image"
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <img src={chew} alt="Cashew processing facility" />
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section" ref={valuesRef}>
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </motion.div>

          <motion.div
            className="values-grid"
            initial={{ opacity: 0 }}
            animate={valuesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ y: 50, opacity: 0 }}
                animate={valuesInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <motion.div
            className="mission-content"
            initial={{ opacity: 0, y: 50 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2>Our Mission</h2>
            <p>
              To provide our customers with the highest quality cashews while supporting sustainable farming practices
              and fair trade. We believe that great taste and ethical business practices go hand in hand.
            </p>
            <p>
              We're committed to building lasting relationships with our customers, farmers, and community, creating
              value for everyone in our supply chain.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
