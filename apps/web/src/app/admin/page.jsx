import { useState, useEffect } from "react";
import {
  FileText,
  Filter,
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Users,
  TrendingUp,
  ChevronDown,
  Loader2,
  Eye,
  X,
  LayoutDashboard,
  BarChart3
} from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [allIssues, setAllIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    district: "",
    status: "",
  });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Tamil Nadu districts
  const districts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
    "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris",
    "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
    "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
    "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
    "Viluppuram", "Virudhunagar"
  ];

  const statuses = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  // Mock all issues data
  const mockAllIssues = [
    {
      id: "1",
      title: "Broken streetlight on Main St",
      description:
        "The streetlight near the pharmacy has been out for 3 days causing safety concerns for pedestrians",
      status: "pending",
      created_at: "2024-01-15T10:30:00Z",
      resolved_at: null,
      photo_url:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      latitude: 40.7128,
      longitude: -74.006,
      user: { name: "John Smith", district: "Chennai" },
    },
    {
      id: "2",
      title: "Pothole on Oak Avenue",
      description:
        "Large pothole causing damage to vehicles and creating traffic hazards",
      status: "in_progress",
      created_at: "2024-01-12T14:20:00Z",
      resolved_at: null,
      photo_url:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      latitude: 40.7589,
      longitude: -73.9851,
      user: { name: "Sarah Johnson", district: "Coimbatore" },
    },
    {
      id: "3",
      title: "Graffiti on park bench",
      description:
        "Vandalism in Central Park needs cleanup to maintain community aesthetics",
      status: "resolved",
      created_at: "2024-01-10T09:15:00Z",
      resolved_at: "2024-01-14T16:45:00Z",
      photo_url:
        "https://images.unsplash.com/photo-1578450671530-5eef82c64e3d?w=300&h=200&fit=crop",
      latitude: 40.7812,
      longitude: -73.9665,
      user: { name: "Mike Davis", district: "Madurai" },
    },
  ];

  useEffect(() => {
    // Check if user is admin
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== "admin") {
        window.location.href = "/dashboard";
        return;
      }
      setUser(userData);
    } else {
      window.location.href = "/login";
      return;
    }

    // Load all issues
    setTimeout(() => {
      setAllIssues(mockAllIssues);
      setFilteredIssues(mockAllIssues);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = allIssues;

    if (filters.search) {
      filtered = filtered.filter(
        (issue) =>
          issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          issue.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          issue.user.name.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.district) {
      filtered = filtered.filter(
        (issue) => issue.user.district === filters.district,
      );
    }

    if (filters.status) {
      filtered = filtered.filter((issue) => issue.status === filters.status);
    }

    setFilteredIssues(filtered);
  }, [filters, allIssues]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
      case "in_progress":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "resolved":
        return "bg-green-500/10 text-green-600 border-green-200";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={14} />;
      case "in_progress":
        return <AlertCircle size={14} />;
      case "resolved":
        return <CheckCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };


  const handleStatusUpdate = async (issueId, newStatus) => {
    setUpdating(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update issue status
      const updatedIssues = allIssues.map((issue) => {
        if (issue.id === issueId) {
          return {
            ...issue,
            status: newStatus,
            resolved_at:
              newStatus === "resolved" ? new Date().toISOString() : null,
          };
        }
        return issue;
      });

      setAllIssues(updatedIssues);
      setSelectedIssue(null);
    } catch (error) {
      alert("Error updating status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const getStats = () => {
    const totalIssues = allIssues.length;
    const resolvedIssues = allIssues.filter(
      (issue) => issue.status === "resolved",
    ).length;
    const pendingIssues = allIssues.filter(
      (issue) => issue.status === "pending",
    ).length;
    const inProgressIssues = allIssues.filter(
      (issue) => issue.status === "in_progress",
    ).length;

    return { totalIssues, resolvedIssues, pendingIssues, inProgressIssues };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={32} className="animate-spin text-primary" />
          <span className="text-muted-foreground font-medium animate-pulse">
            Loading admin portal...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <FileText size={18} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">CivicFix <span className="text-muted-foreground font-normal ml-1">Admin</span></span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a
              href="/admin"
              className="text-primary font-semibold flex items-center gap-2"
            >
              <LayoutDashboard size={18} />
              Overview
            </a>
            <a
              href="/leaderboard"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <BarChart3 size={18} />
              Leaderboard
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <LogOut size={14} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <span className="text-sm font-medium text-muted-foreground">Total Issues</span>
              <FileText size={16} className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{stats.totalIssues}</div>
          </div>
          <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 p-6 shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <span className="text-sm font-medium text-yellow-700">Pending Review</span>
              <Clock size={16} className="text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-700">{stats.pendingIssues}</div>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <span className="text-sm font-medium text-blue-700">In Progress</span>
              <AlertCircle size={16} className="text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-700">{stats.inProgressIssues}</div>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50/50 p-6 shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <span className="text-sm font-medium text-green-700">Resolved</span>
              <CheckCircle size={16} className="text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-700">{stats.resolvedIssues}</div>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="rounded-xl border border-border bg-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search by title, description, or user..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="w-full md:w-[200px]">
              <select
                value={filters.district}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, district: e.target.value }))
                }
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-[200px]">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="font-semibold text-xl tracking-tight">Recent Issues</h2>
            <span className="text-sm text-muted-foreground">{filteredIssues.length} found</span>
          </div>

          <div className="divide-y divide-border">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="p-6 transition-colors hover:bg-muted/30"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{issue.title}</h3>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusColor(issue.status)}`}
                      >
                        {getStatusIcon(issue.status)}
                        <span className="capitalize ml-1">{issue.status.replace("_", " ")}</span>
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2">{issue.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                      <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                        <Users size={12} />
                        <span className="font-medium">{issue.user.name}</span>
                        <span className="text-muted-foreground/50">|</span>
                        <span>{issue.user.district}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(issue.created_at).toLocaleDateString()}
                      </div>
                      {issue.latitude && issue.longitude && (
                        <div className="flex items-center gap-1 text-blue-600/80">
                          <MapPin size={12} />
                          Geo-tagged
                        </div>
                      )}
                    </div>
                  </div>

                  {issue.photo_url && (
                    <div className="shrink-0">
                      <img
                        src={issue.photo_url}
                        alt="Evidence"
                        className="h-24 w-24 rounded-lg object-cover border border-border bg-muted"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 justify-center lg:w-48">
                    <button
                      onClick={() => setSelectedIssue(issue)}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-3"
                    >
                      <Eye size={14} className="mr-2" />
                      Review Details
                    </button>
                    {issue.status !== "resolved" && (
                      <select
                        value={issue.status}
                        onChange={(e) =>
                          handleStatusUpdate(issue.id, e.target.value)
                        }
                        disabled={updating}
                        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="" disabled>Update Status</option>
                        {statuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredIssues.length === 0 && (
            <div className="p-16 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Search size={24} className="text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg">No issues found</h3>
              <p className="text-muted-foreground">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight pr-8">{selectedIssue.title}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${getStatusColor(selectedIssue.status)}`}>
                    {getStatusIcon(selectedIssue.status)}
                    <span className="ml-1 capitalize">{selectedIssue.status.replace('_', ' ')}</span>
                  </span>
                  <span className="text-sm text-muted-foreground">ID: {selectedIssue.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedIssue(null)}
                className="absolute right-4 top-4 rounded-full p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-muted"
              >
                <X size={18} />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="grid gap-6">
              {selectedIssue.photo_url && (
                <div className="aspect-video w-full overflow-hidden rounded-md border border-border bg-muted">
                  <img
                    src={selectedIssue.photo_url}
                    alt="Issue"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="grid gap-1">
                  <h4 className="font-medium text-sm leading-none">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-md border border-border/50">
                    {selectedIssue.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm leading-none">Reported By</h4>
                    <p className="text-sm text-muted-foreground">{selectedIssue.user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm leading-none">District</h4>
                    <p className="text-sm text-muted-foreground">{selectedIssue.user.district}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm leading-none">Submitted</h4>
                    <p className="text-sm text-muted-foreground">{new Date(selectedIssue.created_at).toLocaleString()}</p>
                  </div>
                  {selectedIssue.resolved_at && (
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm leading-none text-green-600">Resolved On</h4>
                      <p className="text-sm text-muted-foreground">{new Date(selectedIssue.resolved_at).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedIssue.status !== "resolved" && (
                <div className="border-t border-border pt-6 mt-2">
                  <label className="text-sm font-medium mb-2 block">Quick Action</label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <button
                        key={status.value}
                        onClick={() => handleStatusUpdate(selectedIssue.id, status.value)}
                        disabled={updating || selectedIssue.status === status.value}
                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 ${selectedIssue.status === status.value ? 'bg-muted text-muted-foreground cursor-default' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                      >
                        {updating && selectedIssue.status !== status.value ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                        Mark as {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
