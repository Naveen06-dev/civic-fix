import { useState, useEffect } from "react";
import {
  FileText,
  Trophy,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  LogOut,
  Loader2,
  Award,
  Medal
} from "lucide-react";

export default function LeaderboardPage() {
  const [user, setUser] = useState(null);
  const [districtStats, setDistrictStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock district statistics
  const mockDistrictStats = [
    {
      district: "Central District",
      totalIssues: 45,
      resolvedIssues: 38,
      pendingIssues: 5,
      inProgressIssues: 2,
      resolutionRate: 84.4,
      rank: 1,
    },
    {
      district: "Downtown",
      totalIssues: 52,
      resolvedIssues: 41,
      pendingIssues: 8,
      inProgressIssues: 3,
      resolutionRate: 78.8,
      rank: 2,
    },
    {
      district: "Riverside",
      totalIssues: 38,
      resolvedIssues: 29,
      pendingIssues: 6,
      inProgressIssues: 3,
      resolutionRate: 76.3,
      rank: 3,
    },
    {
      district: "Westfield",
      totalIssues: 33,
      resolvedIssues: 24,
      pendingIssues: 7,
      inProgressIssues: 2,
      resolutionRate: 72.7,
      rank: 4,
    },
    {
      district: "Eastside",
      totalIssues: 41,
      resolvedIssues: 28,
      pendingIssues: 9,
      inProgressIssues: 4,
      resolutionRate: 68.3,
      rank: 5,
    },
    {
      district: "Northpark",
      totalIssues: 29,
      resolvedIssues: 18,
      pendingIssues: 8,
      inProgressIssues: 3,
      resolutionRate: 62.1,
      rank: 6,
    },
    {
      district: "Southgate",
      totalIssues: 36,
      resolvedIssues: 21,
      pendingIssues: 11,
      inProgressIssues: 4,
      resolutionRate: 58.3,
      rank: 7,
    },
    {
      district: "Industrial Area",
      totalIssues: 25,
      resolvedIssues: 13,
      pendingIssues: 9,
      inProgressIssues: 3,
      resolutionRate: 52.0,
      rank: 8,
    },
  ];

  useEffect(() => {
    // Get user from localStorage (optional for this page)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load district statistics
    setTimeout(() => {
      setDistrictStats(mockDistrictStats);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy size={20} className="text-yellow-500 fill-yellow-500" />;
      case 2:
        return <Medal size={20} className="text-slate-400 fill-slate-400" />;
      case 3:
        return <Medal size={20} className="text-amber-700 fill-amber-700" />;
      default:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground border border-border">
            {rank}
          </span>
        );
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/5 to-transparent border-l-4 border-l-yellow-500";
      case 2:
        return "bg-gradient-to-r from-slate-400/5 to-transparent border-l-4 border-l-slate-400";
      case 3:
        return "bg-gradient-to-r from-amber-700/5 to-transparent border-l-4 border-l-amber-700";
      default:
        return "hover:bg-muted/30 border-l-4 border-l-transparent";
    }
  };

  const getProgressBarColor = (rate) => {
    if (rate >= 80) return "bg-green-500";
    if (rate >= 70) return "bg-blue-500";
    if (rate >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={32} className="animate-spin text-primary" />
          <span className="text-muted-foreground font-medium animate-pulse">
            Loading leaderboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <FileText size={18} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">CivicFix</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {user && (
              <a
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {user.role === "admin" ? "Admin Dashboard" : "Dashboard"}
              </a>
            )}
            <a
              href="/leaderboard"
              className="text-primary font-semibold"
            >
              Leaderboard
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  <LogOut size={14} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                >
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm shadow-sm">
            <Trophy size={14} className="mr-2 text-yellow-500" />
            Celebrating Excellence in Governance
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">
            District Leaderboard
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            Tracking performance and transparency across districts. See how your community compares.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-blue-500/10 mb-4">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div className="text-3xl font-bold tracking-tight">
              {districtStats.reduce((sum, d) => sum + d.totalIssues, 0)}
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide mt-1">
              Total Issues Reported
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-green-500/10 mb-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-green-600">
              {districtStats.reduce((sum, d) => sum + d.resolvedIssues, 0)}
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide mt-1">
              Issues Resolved
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <TrendingUp size={24} className="text-primary" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-primary">
              {Math.round(
                (districtStats.reduce(
                  (sum, d) => sum + d.resolvedIssues,
                  0,
                ) /
                  districtStats.reduce(
                    (sum, d) => sum + d.totalIssues,
                    1,
                  )) *
                100,
              )}%
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide mt-1">
              Resolution Rate
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-xl tracking-tight">Ranking by Resolution Efficiency</h3>
            <p className="text-sm text-muted-foreground">Districts are ranked based on the percentage of resolved issues versus total reported.</p>
          </div>

          <div className="divide-y divide-border">
            {districtStats.map((district) => (
              <div
                key={district.district}
                className={`p-4 md:p-6 transition-colors ${getRankStyle(district.rank)}`}
              >
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  {/* Rank & Name */}
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="flex-shrink-0 w-8 flex justify-center">
                      {getRankIcon(district.rank)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{district.district}</h4>
                      <p className="text-xs text-muted-foreground md:hidden">Rank #{district.rank}</p>
                    </div>
                  </div>

                  {/* Desktop Stats */}
                  <div className="grid grid-cols-3 gap-8 w-full md:w-auto text-center md:text-left">
                    <div className="flex flex-col md:items-center">
                      <span className="text-lg font-bold">{district.totalIssues}</span>
                      <span className="text-xs text-muted-foreground uppercase">Total</span>
                    </div>
                    <div className="flex flex-col md:items-center">
                      <span className="text-lg font-bold text-green-600">{district.resolvedIssues}</span>
                      <span className="text-xs text-muted-foreground uppercase">Fixed</span>
                    </div>
                    <div className="flex flex-col md:items-center">
                      <span className="text-lg font-bold text-yellow-600">{district.pendingIssues + district.inProgressIssues}</span>
                      <span className="text-xs text-muted-foreground uppercase">Active</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full md:w-48 flex flex-col items-end gap-1">
                    <span className="font-bold text-lg">{district.resolutionRate.toFixed(1)}%</span>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ease-out ${getProgressBarColor(district.resolutionRate)}`}
                        style={{ width: `${district.resolutionRate}%` }}
                      ></div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/50 rounded-2xl p-8 md:p-12 border border-primary/10">
            <h3 className="text-2xl font-bold mb-4">Help Your District Climb the Ranks</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Active citizen participation is key to a better community. Report issues, track their progress, and improve your district's score.
            </p>
            {user ? (
              <a
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <FileText size={18} className="mr-2" />
                {user.role === "admin"
                  ? "Go to Admin Dashboard"
                  : "Report an Issue Now"}
              </a>
            ) : (
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <Users size={18} className="mr-2" />
                Join the Community
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
