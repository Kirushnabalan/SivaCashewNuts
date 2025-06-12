import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { generateWhatsAppURL } from "@utils/helpers"
import { CONTACT_INFO } from "@constants"
import Button from "@components/ui/Button"
import Input from "@components/ui/Input"
import Card from "@components/ui/Card"
import "./ContactPage.css"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    const message = `Hello! I'm ${formData.name} from ${formData.country}.\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
    const whatsappUrl = `https://wa.me/94778042144?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/email/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: "kirushnabalan1803@gmail.com",
          from: formData.email,
          subject: `Contact Form Message from ${formData.name}`,
          message: `
Name: ${formData.name}
Email: ${formData.email}
Country: ${formData.country}
Message: ${formData.message}
          `
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      alert("Message sent successfully!")
      setFormData({ name: "", email: "", country: "", message: "" })
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: CONTACT_INFO.phone,
      description: "Call us directly",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: CONTACT_INFO.email,
      description: "Send us an email",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      value: CONTACT_INFO.whatsapp,
      description: "Chat with us on WhatsApp",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Your Location Here",
      description: "Visit our store",
    },
  ]

  return (
    <div className="contact-page">
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Get in Touch</h2>
            <p>
              We highly recommend contacting us via WhatsApp for a faster response. Our average response time is
              approximately 3 hours.
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="contact-method"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-info">
                    <h3>{method.title}</h3>
                    <p>{method.value}</p>
                    <small>{method.description}</small>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <Card.Header>
                <h3>Send us a Message</h3>
                <p>Fill out the form below and we'll get back to you soon.</p>
              </Card.Header>

              <Card.Body>
                <form onSubmit={handleWhatsAppSubmit}>
                  <Input label="Your Name" name="name" value={formData.name} onChange={handleInputChange} required />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      className="form-input"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <Button type="submit" size="lg" className="whatsapp-btn">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Send via WhatsApp
                    </Button>

                    <Button type="button" variant="secondary" size="lg" onClick={handleEmailSubmit} loading={loading}>
                      <Mail className="w-5 h-5 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
