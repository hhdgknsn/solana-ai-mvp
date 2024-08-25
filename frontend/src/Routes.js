import { Route, Routes } from 'react-router-dom';
import Edit from './pages/Edit.js';
import Design from './pages/Design.js';
import Deploy from './pages/Deploy.js';
import Test from './pages/Test.js';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Design />} />
    <Route path="/design" element={<Design />} />
    <Route path="/edit" element={<Edit />} />
    <Route path="/deploy" element={<Deploy />} />
    <Route path="/test" element={<Test />} />
  </Routes>
);

export default AppRoutes;
