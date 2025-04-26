import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './components/Auth';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Insights from './components/Insights';
import Login from './components/Login';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="insights"
          element={
            <RequireAuth>
              <Insights />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;