"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Phone, Mail, MapPin, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { MOCK_DOCTORS, SPECIALIZATIONS } from "@/lib/mock-data"

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.bio.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpec = !selectedSpecialization || doctor.specialization === selectedSpecialization

      return matchesSearch && matchesSpec
    })
  }, [searchQuery, selectedSpecialization])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Find a Doctor or Pharmacist</h1>
          <p className="text-muted-foreground">
            Connect with verified healthcare professionals for consultations and advice
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <div className="sticky top-20 space-y-6">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              <Card className="p-6 border-border space-y-6">
                {/* Search */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search doctors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-card border-border"
                    />
                  </div>
                </div>

                {/* Specialization Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Specialization</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedSpecialization("")}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !selectedSpecialization
                          ? "bg-primary/20 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      All Specializations
                    </button>
                    {SPECIALIZATIONS.map((spec) => (
                      <button
                        key={spec}
                        onClick={() => setSelectedSpecialization(spec)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedSpecialization === spec
                            ? "bg-primary/20 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Toggle and Results Info */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found <span className="font-semibold text-foreground">{filteredDoctors.length}</span> professionals
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            {filteredDoctors.length === 0 ? (
              <Card className="p-12 text-center border-border">
                <p className="text-muted-foreground mb-4">No professionals found matching your criteria.</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedSpecialization("")
                  }}
                  variant="outline"
                  className="border-border"
                >
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DoctorCard({ doctor }: { doctor: (typeof MOCK_DOCTORS)[0] }) {
  return (
    <Card className="overflow-hidden border-border hover:shadow-lg transition-all">
      <div className="p-6 flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 flex-shrink-0">
          <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-bold text-foreground">{doctor.name}</h3>
            <p className="text-sm text-primary font-semibold">{doctor.specialization}</p>
            <p className="text-sm text-muted-foreground mt-1">{doctor.qualification}</p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{doctor.bio}</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm">
                  {i < Math.floor(doctor.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({doctor.experience} reviews)</span>
            <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary">
              {doctor.experience} years exp.
            </span>
          </div>

          {/* Experience & Availability */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {doctor.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {doctor.availability}
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="flex flex-col gap-2 sm:w-auto justify-between">
          <a href={`tel:${doctor.phone}`}>
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
          </a>
          <a href={`mailto:${doctor.email}`}>
            <Button variant="outline" className="w-full sm:w-auto border-border bg-transparent" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </a>
          <Button variant="outline" className="w-full sm:w-auto border-border bg-transparent" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Book
          </Button>
        </div>
      </div>
    </Card>
  )
}
