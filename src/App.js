import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Upload from './components/Upload.js';
import View from './components/View.js';

import Layout from './components/Layout.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Upload />} />
            <Route path="upload" element={<Upload />} />
            <Route path="view" element={<View />} />
            <Route path="view/:file_id" element={<View />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
