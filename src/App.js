import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFound from "./page/admin/notFound/NotFound";
import ErrServer from "./page/admin/notFound/errServer";
import Lock from "./page/admin/notFound/Lock";
import VoiceBioMeTricTotal from "../src/page/admin/VoiceBioMeTric/VoiceBioMeTric";
import FaceMatching from "../src/page/admin/FaceMatching/FaceMatching";
import VoiceMatching from "../src/page/admin/VoiceMatching/VoiceMatching";
import FaceMatchingHome from "../src/page/admin/FaceMatchingHome/FaceMatchingHome";
import FaceTakePhoto from "../src/page/admin/FaceTakePhoto/FaceTakePhoto";
import TakePhotoSecond from "../src/page/admin/TakePhotoSecond/TakePhotoSecond";
import FileFaceMatching from "../src/page/admin/FileFaceMatching/FileFaceMatching";
import ResultFaceMatching from "../src/page/admin/ResultFaceMatching/ResultFaceMatching";
import VoiceBiometric from "./page/admin/Dashboard/components/VoiceBiometric";
import FaceBiometric from "./page/admin/Face-Biometric/FaceBiometric";
import Test from "./page/admin/Face-Biometric/components/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="500" element={<ErrServer />} />
        <Route path="505" element={<Lock />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<VoiceBioMeTricTotal />} />
        <Route path="/face-biometric" element={<FaceBiometric />} />
        <Route path="/test1" element={<Test />} />
        <Route path="/facematching" element={<FaceMatching />}>
          <Route path="/facematching" element={<FaceMatchingHome />} />
          <Route path="/facematching/takephoto" element={<FaceTakePhoto />} />
          <Route
            path="/facematching/takephotosecond"
            element={<TakePhotoSecond />}
          />
          <Route
            path="/facematching/filephotomatching"
            element={<FileFaceMatching />}
          />
          <Route path="/facematching/result" element={<ResultFaceMatching />} />
        </Route>
        <Route path="voicematching" element={<VoiceMatching />} />
        <Route path="/voice" element={<VoiceBiometric />} />
      </Routes>
    </>
  );
}

export default App;
