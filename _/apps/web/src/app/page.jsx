import { useState } from "react";
import { ArrowRight, FileText, Users, BarChart3, MapPin, CheckCircle2, Shield } from "lucide-react";

export default function HomePage() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <FileText size={18} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">CivicFix</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </a>
            {user?.role === "admin" && (
              <a href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </a>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <a href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Log in
                </a>
                <a
                  href="/signup"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  Sign up
                </a>
              </>
            ) : (
              <button
                onClick={() => setUser(null)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Building better communities together
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Report Issues, <br className="hidden md:block" />
              <span className="text-primary">Drive Real Change</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
              Empowering citizens to report grievances, track resolutions, and collaborate with local authorities for a transparent and better tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Report an Issue
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/leaderboard"
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View Statistics
              </a>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 md:py-24 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">How it works</h2>
              <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                We've simplified the process of civic engagement to just a few steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Easy Reporting"
                description="Snap a photo, add a location, and describe the issue. Our intuitive interface makes reporting grievances taking less than a minute."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-10 w-10 text-primary" />}
                title="Real-time Tracking"
                description="Stay informed with live status updates. notifications, and visual progress bars as your report moves through the resolution process."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Community Impact"
                description="See the collective impact of your reports. View district-wise statistics and compete on the leaderboard for top contributor."
              />
            </div>
          </div>
        </section>

        {/* Stats / Trust Section */}
        <section className="py-20 bg-muted/50 border-y border-border">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <StatItem value="10k+" label="Issues Reported" />
              <StatItem value="85%" label="Resolution Rate" />
              <StatItem value="50+" label="Districts Covered" />
              <StatItem value="24h" label="Avg. Response Time" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-16 md:px-16 md:py-20 text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary-foreground mb-6">
                  Ready to transform your community?
                </h2>
                <p className="text-primary-foreground/80 text-lg max-w-[600px] mx-auto mb-10">
                  Join thousands of active citizens who are making a difference every single day.
                </p>
                <a
                  href="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-background px-8 text-sm font-bold text-primary shadow transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Get Started Now
                </a>
              </div>
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-border bg-background">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <FileText size={14} className="text-primary-foreground" />
            </div>
            <span className="text-base font-semibold">CivicFix</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CivicFix. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-extrabold tracking-tight text-primary mb-2">{value}</div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}
