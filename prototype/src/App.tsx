import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import DataCustomizer from './pages/DataCustomizer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-6xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/customize" element={<DataCustomizer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 