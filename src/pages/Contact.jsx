// src/pages/ContactPage.jsx
import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Send,
  MessageCircle,
  Building2,
  Users,
  Shield,
  CheckCircle,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card } from "../components/ui/card"

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      })
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">

      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Hero */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-24 h-24 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl ring-8 ring-primary/20"
            >
              <MessageCircle className="w-12 h-12 text-primary-foreground" />
            </motion.div>

            <h2 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Need help with an order? Have a medical question? We're here 24/7 to support you.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-black text-primary">24/7</div>
                <div className="text-muted-foreground">Support Available</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-black text-primary">&lt; 15min</div>
                <div className="text-muted-foreground">Average Response</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-black text-primary">4.9 stars</div>
                <div className="text-muted-foreground">Customer Rating</div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-10"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-bold mb-8 text-foreground">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "Our Location",
                      lines: ["123 El-Geish Street", "Tanta, Gharbia Governorate", "Egypt"],
                      color: "bg-primary/10 text-primary",
                    },
                    {
                      icon: Phone,
                      title: "Call Us",
                      lines: ["+20 41 234 896", "Emergency: +20 122 333 4455"],
                      color: "bg-green-500/10 text-green-600",
                    },
                    {
                      icon: Mail,
                      title: "Email Us",
                      lines: ["support@pharmtish.com", "pharmacy@pharmtish.com"],
                      color: "bg-blue-500/10 text-blue-600",
                    },
                    {
                      icon: Clock,
                      title: "Working Hours",
                      lines: ["Mon–Sat: 8:00 AM – 11:00 PM", "Sunday: 10:00 AM – 8:00 PM"],
                      color: "bg-orange-500/10 text-orange-600",
                    },
                  ].map((info, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 12, scale: 1.02 }}
                      className="flex items-start gap-5 group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        className={`${info.color} p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all`}
                      >
                        <info.icon className="w-7 h-7" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-xl mb-2 text-foreground">{info.title}</h4>
                        {info.lines.map((line, j) => (
                          <p key={j} className="text-foreground/80 leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Book Appointment Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-primary to-primary/80 p-8 rounded-3xl shadow-2xl cursor-pointer"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mr-5">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">Need Consultation?</h3>
                    <p className="text-primary-foreground/90">Talk to a pharmacist or doctor</p>
                  </div>
                </div>
                <p className="text-primary-foreground mb-8 text-lg">
                  Get free consultation with every order over 500 EGP
                </p>
                <motion.a
                  href="/doctors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
                >
                  <Calendar className="mr-3 h-6 w-6" />
                  Book Now
                </motion.a>
              </motion.div>

              {/* Extra Trust Cards */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                <Card className="p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground">100% Genuine</h4>
                  <p className="text-sm text-muted-foreground mt-2">Licensed pharmacy partners only</p>
                </Card>
                <Card className="p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-foreground">Expert Team</h4>
                  <p className="text-sm text-muted-foreground mt-2">200+ verified pharmacists</p>
                </Card>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-border/50"
            >
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary/70 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Send className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-black text-foreground mb-3">Send us a Message</h3>
                <p className="text-lg text-muted-foreground">We typically reply in under 15 minutes</p>
              </div>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center gap-4"
                >
                  <CheckCircle className="h-10 w-10 text-green-600" />
                  <div>
                    <p className="font-bold text-xl text-green-600">Message Sent!</p>
                    <p className="text-muted-foreground">We'll get back to you very soon</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid md:grid-cols-2 gap-7">
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-bold mb-2">First Name</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Ahmed"
                      required
                      className="h-14 text-lg"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="block text-sm font-bold mb-2">Last Name</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Mohamed"
                      required
                      className="h-14 text-lg"
                    />
                  </motion.div>
                </div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-bold mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ahmed@example.com"
                    required
                    className="h-14 text-lg"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-bold mb-2">Phone (Optional)</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+20 1XX XXX XXXX"
                    className="h-14 text-lg"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-bold mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full h-14 px-5 rounded-2xl border border-border bg-card text-foreground focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Order Help</option>
                    <option>Prescription Upload</option>
                    <option>Pharmacy Partnership</option>
                    <option>Technical Issue</option>
                  </select>
                </motion.div>

                <motion.div whileFocus={{ scale: 1.01 }}>
                  <label className="block text-sm font-bold mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we assist you today? Please provide as much detail as possible..."
                    rows={6}
                    required
                    className="text-lg resize-none"
                  />
                </motion.div>

                <motion.div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full py-8 text-xl font-bold bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-primary/30"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Send className="mr-3 h-6 w-6" />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}