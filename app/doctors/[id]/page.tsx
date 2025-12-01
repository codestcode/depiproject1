"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Phone, Mail, MapPin, Calendar, Star, Award, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { MOCK_DOCTORS } from "@/lib/mock-data"

export default function DoctorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const doctorId = params.id as string

  const doctor = MOCK_DOCTORS.find((d) => d.id === doctorId)

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Professional not found</h2>
            <Link href="/doctors">
              <Button className="bg-primary hover:bg-primary/90">Back to Directory</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="px-4 py-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/doctors"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors w-fit"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Directory
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {/* Image */}
          <div className="lg:col-span-1">
            <div className="rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 aspect-square">
              <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-sm font-semibold text-primary uppercase mb-2">{doctor.specialization}</p>
              <h1 className="text-4xl font-bold text-foreground mb-2">{doctor.name}</h1>
              <p className="text-lg text-muted-foreground">{doctor.qualification}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 border-border text-center">
                <p className="text-2xl font-bold text-primary">{doctor.experience}</p>
                <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
              </Card>
              <Card className="p-4 border-border text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold text-foreground">{doctor.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">({doctor.experience} reviews)</p>
              </Card>
              <Card className="p-4 border-border text-center">
                <p className="text-2xl font-bold text-secondary">{doctor.patientsServed}+</p>
                <p className="text-xs text-muted-foreground">Patients Served</p>
              </Card>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>{doctor.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{doctor.location}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{doctor.availability}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a href={`tel:${doctor.phone}`}>
                <Button className="bg-primary hover:bg-primary/90">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </a>
              <a href={`mailto:${doctor.email}`}>
                <Button variant="outline" className="border-border bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </a>
              <Button variant="outline" className="border-border bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {/* About */}
          <Card className="p-6 border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
          </Card>

          {/* Expertise */}
          <Card className="p-6 border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Areas of Expertise
            </h2>
            <ul className="space-y-2">
              {doctor.expertise.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Qualifications */}
          <Card className="p-6 border-border md:col-span-2">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Qualifications & Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {doctor.qualifications.map((qual, i) => (
                <div key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-secondary font-bold mt-0.5">✓</span>
                  <span>{qual}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Languages */}
          <Card className="p-6 border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {doctor.languages.map((lang, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </Card>

          {/* Availability */}
          <Card className="p-6 border-border">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Availability
            </h2>
            <p className="text-muted-foreground">{doctor.availability}</p>
            <p className="text-sm text-muted-foreground mt-3">Consultation Fee: ${doctor.consultationFee}</p>
          </Card>
        </div>

        {/* Reviews Section */}
        <Card className="p-6 border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Patient Reviews</h2>
          <div className="space-y-6">
            {doctor.reviews && doctor.reviews.length > 0 ? (
              doctor.reviews.map((review, i) => (
                <div key={i} className="pb-6 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{review.author}</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className="text-sm">
                          {j < review.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No reviews yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
