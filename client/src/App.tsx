import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import BlogPost from "@/pages/BlogPost";
import CategoryPage from "@/pages/CategoryPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/post/:slug" component={BlogPost} />
          <Route path="/category/:category" component={CategoryPage} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
