import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import BlogPost from "@/pages/BlogPost";
import CategoryPage from "@/pages/CategoryPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin-page";
import PostEditor from "@/pages/post-editor";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/post/:slug" component={BlogPost} />
      <Route path="/category/:category" component={CategoryPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <ProtectedRoute path="/admin/posts/new" component={PostEditor} />
      <ProtectedRoute path="/admin/posts/edit/:id" component={PostEditor} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
