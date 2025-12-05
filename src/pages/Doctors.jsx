// src/pages/DoctorsPage.jsx
import { useState, useMemo } from "react"
import { Search, Filter, Phone, Mail, MapPin, Calendar, X, Star } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { MOCK_DOCTORS, SPECIALIZATIONS } from "../../lib/mock-data"

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSpec = !selectedSpecialization || doctor.specialization === selectedSpecialization

      return matchesSearch && matchesSpec
    })
  }, [searchQuery, selectedSpecialization])

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-foreground mb-6">
            Consult Trusted Doctors & Pharmacists
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Book appointments, get expert advice, and medication guidance — all in one place
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-2xl font-bold">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <Card className="p-6 border-border shadow-lg rounded-2xl">
                <div className="mb-8">
                  <label className="block text-sm font-bold text-foreground mb-3">Search Doctor</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Name, specialty, location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 bg-card"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-4">Specialization</h3>
                  <div className="space-y-2">
                    <FilterButton active={!selectedSpecialization} onClick={() => setSelectedSpecialization("")}>
                      All Specializations
                    </FilterButton>
                    {SPECIALIZATIONS.map((spec) => (
                      <FilterButton
                        key={spec}
                        active={selectedSpecialization === spec}
                        onClick={() => setSelectedSpecialization(spec)}
                      >
                        {spec}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </aside>

          {/* Doctors Grid */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-lg text-muted-foreground">
                Found <strong className="text-2xl text-primary">{filteredDoctors.length}</strong> professionals
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-3 px-5 py-3 rounded-xl border border-border hover:bg-muted"
              >
                <Filter className="h-5 w-5" />
                Filters
              </button>
            </div>

            {filteredDoctors.length === 0 ? (
              <Card className="p-20 text-center">
                <p className="text-xl text-muted-foreground mb-6">No doctors found</p>
                <Button size="lg" onClick={() => { setSearchQuery(""); setSelectedSpecialization("") }}>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid gap-8">
                {/* FIXED: Pass the doctor object correctly */}
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

// Reusable Filter Button
function FilterButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-3.5 rounded-xl font-medium transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-md"
          : "hover:bg-muted text-foreground/80"
      }`}
    >
      {children}
    </button>
  )
}

// Doctor Card – Now safely receives `doctor` prop
function DoctorCard({ doctor }) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-border bg-card hover:shadow-2xl transition-all">
      <div className="p-8 flex flex-col md:flex-row gap-8">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-primary/10 bg-gradient-to-br from-primary/10 to-secondary/10">
            <img
              src={doctor.image || "/placeholder-doctor.jpg"}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-5">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{doctor.name}</h3>
            <p className="text-lg font-semibold text-primary mt-1">{doctor.specialization}</p>
            <p className="text-sm text-muted-foreground">{doctor.qualification}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(doctor.rating) ? "fill-current" : ""}`}
                  />
                ))}
              </div>
              <span className="font-bold text-foreground">{doctor.rating}</span>
              <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
            </div>
            <Badge variant="secondary" className="px-4 py-1">
              {doctor.experience}+ years exp.
            </Badge>
          </div>

          <div className="flex flex-wrap gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{doctor.availability}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row md:flex-col gap-3">
          <a href={`tel:${doctor.phone}`}>
            <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 shadow-lg">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
          </a>
          <a href={`mailto:${doctor.email}`}>
            <Button size="lg" variant="outline" className="w-full md:w-auto">
              <Mail className="mr-2 h-5 w-5" />
              Message
            </Button>
          </a>
          <Button size="lg" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">
            <Calendar className="mr-2 h-5 w-5" />
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  )
}