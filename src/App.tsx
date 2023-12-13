import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { ListPage } from './ListPage';
import { Dashboard } from './Dashboard';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="list" element={<ListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
