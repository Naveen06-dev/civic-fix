import { useState, useEffect } from "react";
import {
  Plus,
  Upload,
  MapPin,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Camera,
  Loader2,
  LogOut,
  X
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photo: null,
    location: null,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // Mock issues data
  const mockIssues = [
    {
      id: "1",
      title: "Broken streetlight on Main St",
      description: "The streetlight near the pharmacy has been out for 3 days",
      status: "pending",
      created_at: "2024-01-15T10:30:00Z",
      photo_url:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      id: "2",
      title: "Pothole on Oak Avenue",
      description: "Large pothole causing damage to vehicles",
      status: "in_progress",
      created_at: "2024-01-12T14:20:00Z",
      photo_url:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      latitude: 40.7589,
      longitude: -73.9851,
    },
    {
      id: "3",
      title: "Graffiti on park bench",
      description: "Vandalism in Central Park needs cleanup",
      status: "resolved",
      created_at: "2024-01-10T09:15:00Z",
      photo_url:
        "https://images.unsplash.com/photo-1578450671530-5eef82c64e3d?w=300&h=200&fit=crop",
      latitude: 40.7812,
      longitude: -73.9665,
    },
  ];

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/login";
      return;
    }

    // Load user's issues
    setTimeout(() => {
      setIssues(mockIssues);
      setLoading(false);
    }, 1000);
  }, []);

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
        return <Clock size={14} className="mr-1" />;
      case "in_progress":
        return <AlertCircle size={14} className="mr-1" />;
      case "resolved":
        return <CheckCircle size={14} className="mr-1" />;
      default:
        return <Clock size={14} className="mr-1" />;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationLoading(false);
          alert("Unable to get location. Please enable location services.");
        },
      );
    } else {
      setLocationLoading(false);
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      // Validate form
      if (!formData.title || !formData.description) {
        alert("Please fill in all required fields");
        return;
      }

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Add new issue to list
      const newIssue = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        status: "pending",
        created_at: new Date().toISOString(),
        photo_url: formData.photo ? URL.createObjectURL(formData.photo) : null,
        latitude: formData.location?.latitude,
        longitude: formData.location?.longitude,
      };

      setIssues((prev) => [newIssue, ...prev]);

      // Reset form
      setFormData({
        title: "",
        description: "",
        photo: null,
        location: null,
      });
      setShowForm(false);

      alert("Issue reported successfully!");
    } catch (error) {
      alert("Error reporting issue. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={32} className="animate-spin text-primary" />
          <span className="text-muted-foreground font-medium animate-pulse">Loading dashboard...</span>
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
            <a
              href="/dashboard"
              className="text-primary font-semibold"
            >
              Dashboard
            </a>
            <a
              href="/leaderboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
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
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Report Form Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
                <h2 className="font-semibold text-xl tracking-tight">Report New Issue</h2>
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
                  >
                    <Plus size={16} className="mr-1" />
                    New
                  </button>
                )}
              </div>

              {showForm ? (
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Issue Title <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Brief description"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Description <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                        placeholder="Detailed information about the issue..."
                      />
                    </div>

                    {/* Photo Upload */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Photo (optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label
                          htmlFor="photo-upload"
                          className="flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-input rounded-md cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                        >
                          <Camera size={20} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {formData.photo
                              ? formData.photo.name
                              : "Click to upload a photo"}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Location
                      </label>
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={locationLoading}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-full"
                      >
                        {locationLoading ? (
                          <Loader2 size={16} className="animate-spin mr-2" />
                        ) : (
                          <MapPin size={16} className="mr-2" />
                        )}
                        {formData.location
                          ? `Lat: ${formData.location.latitude.toFixed(4)}, Lng: ${formData.location.longitude.toFixed(4)}`
                          : "Get current location"}
                      </button>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-4 border-t border-border mt-6">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                      >
                        {formLoading ? (
                          <Loader2 size={16} className="animate-spin mr-2" />
                        ) : (
                          <Upload size={16} className="mr-2" />
                        )}
                        Submit Report
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText size={32} className="text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">Report an Issue</h3>
                    <p className="text-muted-foreground text-sm max-w-[250px]">
                      Found something wrong in your neighborhood? Let us know.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
                  >
                    Start New Report
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Issues List Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">My Reports</h2>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {issues.length} total
              </span>
            </div>

            {issues.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-12 text-center">
                <FileText size={48} className="text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-medium text-lg text-foreground">No reports yet</h3>
                <p className="text-muted-foreground">Any issues you report will appear here.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="group relative rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                            {issue.title}
                          </h3>
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusColor(issue.status)}`}
                          >
                            {getStatusIcon(issue.status)}
                            <span className="capitalize">{issue.status.replace("_", " ")}</span>
                          </span>
                        </div>

                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {issue.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(issue.created_at).toLocaleDateString()}
                          </div>
                          {issue.latitude && issue.longitude && (
                            <div className="flex items-center gap-1">
                              <MapPin size={12} />
                              <span>Location attached</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {issue.photo_url && (
                        <div className="shrink-0 md:w-32">
                          <div className="aspect-video w-full rounded-md overflow-hidden bg-muted border border-border">
                            <img
                              src={issue.photo_url}
                              alt="Issue"
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
