// src/components/VerifyCCCD.jsx
import React, { useRef, useState } from "react";
import { Camera, UploadCloud, Trash2, CheckCircle, XCircle, Info } from "lucide-react";

/*
  VerifyCCCD component
  - Bắt buộc upload/chụp mặt trước trước khi upload/chụp mặt sau
  - Hỗ trợ: upload file (jpg/png) hoặc chụp từ camera
  - Kiểm tra định dạng và kích thước (<= 5MB)
  - Preview, xóa, gửi (mô phỏng)
*/

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export default function VerifyCCCD({ onSubmit }) {
  // eslint-disable-next-line no-unused-vars
  const [step, setStep] = useState(1); // 1: front, 2: back, 3: review/sent
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Camera modal state
  const [cameraOpen, setCameraOpen] = useState(false);
  const [captureTarget, setCaptureTarget] = useState(null); // 'front' | 'back'
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Helpers
  const validateFile = (file) => {
    if (!file) return "Không có tệp.";
    if (!ACCEPTED_TYPES.includes(file.type)) return "Chỉ chấp nhận ảnh JPG/PNG.";
    if (file.size > MAX_SIZE_BYTES) return "Dung lượng tối đa 5MB.";
    return null;
  };

  const fileToPreview = (file, cb) => {
    const reader = new FileReader();
    reader.onload = (e) => cb(e.target.result);
    reader.readAsDataURL(file);
  };

  // File input handlers
  const handleFileInput = (e, target) => {
    setError("");
    const file = e.target.files?.[0];
    const fail = validateFile(file);
    if (fail) {
      setError(fail);
      return;
    }
    if (target === "front") {
      setFrontFile(file);
      fileToPreview(file, setFrontPreview);
      setStep(2); // unlock back after front selected
    } else {
      if (!frontFile) {
        setError("Bạn phải tải lên hoặc chụp mặt trước trước.");
        return;
      }
      setBackFile(file);
      fileToPreview(file, setBackPreview);
      setStep(3);
    }
  };

  // Clear helpers
  const clearFront = () => {
    setFrontFile(null);
    setFrontPreview(null);
    setBackFile(null);
    setBackPreview(null);
    setStep(1);
    setError("");
  };
  const clearBack = () => {
    setBackFile(null);
    setBackPreview(null);
    setStep(2);
    setError("");
  };

  // Camera functions
  const openCamera = async (target) => {
    setError("");
    setCaptureTarget(target);
    setCameraOpen(true);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = s;
      if (videoRef.current) videoRef.current.srcObject = s;
      if (videoRef.current) videoRef.current.play();
    } catch {
      setError("Không mở được camera. Hãy cho phép quyền camera hoặc dùng upload file.");
      setCameraOpen(false);
    }
  };

  const closeCamera = () => {
    setCameraOpen(false);
    if (videoRef.current) videoRef.current.pause();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    // giữ tỉ lệ video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      // convert blob to file-like object
      const file = new File([blob], `${captureTarget}-${Date.now()}.png`, { type: "image/png" });
      const fail = validateFile(file);
      if (fail) {
        setError(fail);
        return;
      }
      if (captureTarget === "front") {
        setFrontFile(file);
        fileToPreview(file, setFrontPreview);
        setStep(2);
      } else {
        if (!frontFile) {
          setError("Bạn phải chụp/tải lên mặt trước trước.");
          return;
        }
        setBackFile(file);
        fileToPreview(file, setBackPreview);
        setStep(3);
      }
      closeCamera();
    }, "image/png", 0.9);
  };

  // Submit (simulate)
  const handleSubmit = async () => {
    setError("");
    if (!frontFile || !backFile) {
      setError("Cần cả mặt trước và mặt sau để gửi xác minh.");
      return;
    }
    setSending(true);
    try {
      // simulate upload delay
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
      setStep(3);
      if (onSubmit) onSubmit({ frontFile, backFile });
    } catch {
      setError("Gửi thất bại. Thử lại.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Xác minh CCCD</h2>
      <p className="text-sm text-gray-500 mb-4">
        Vui lòng tải lên hoặc chụp <b>mặt trước</b> trước, sau đó mới tải lên/chụp <b>mặt sau</b>.
        Hệ thống chấp nhận ảnh JPG/PNG, tối đa 5MB.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Front card */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-gray-600" />
              <h3 className="font-medium">Mặt trước (Ảnh CMND/CCCD)</h3>
            </div>
            {frontFile && <span className="text-sm text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" />Đã có</span>}
          </div>

          {frontPreview ? (
            <div className="mb-3">
              <img src={frontPreview} alt="front-preview" className="w-full max-h-64 object-contain rounded-md border" />
            </div>
          ) : (
            <div className="mb-3 bg-gray-50 p-6 rounded-md text-center text-gray-400">Chưa có ảnh mặt trước</div>
          )}

          <div className="flex gap-2">
            <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-md cursor-pointer hover:bg-gray-50">
              <UploadCloud className="w-4 h-4" /> Tải lên
              <input type="file" accept="image/*" onChange={(e) => handleFileInput(e, "front")} className="hidden" />
            </label>

            <button
              onClick={() => openCamera("front")}
              className="px-3 py-2 bg-white border rounded-md hover:bg-gray-50 inline-flex items-center gap-2"
            >
              <Camera className="w-4 h-4" /> Chụp ảnh
            </button>

            {frontFile && (
              <button onClick={clearFront} className="ml-auto px-3 py-2 bg-red-50 text-red-600 border rounded-md inline-flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Xóa
              </button>
            )}
          </div>
        </div>

        {/* Back card */}
        <div className={`border rounded-lg p-4 ${!frontFile ? "opacity-60" : ""}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-gray-600" />
              <h3 className="font-medium">Mặt sau (Ảnh phản biện)</h3>
            </div>
            {backFile && <span className="text-sm text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" />Đã có</span>}
          </div>

          {backPreview ? (
            <div className="mb-3">
              <img src={backPreview} alt="back-preview" className="w-full max-h-64 object-contain rounded-md border" />
            </div>
          ) : (
            <div className="mb-3 bg-gray-50 p-6 rounded-md text-center text-gray-400">
              {frontFile ? "Chưa có ảnh mặt sau" : "Vui lòng tải lên mặt trước trước"}
            </div>
          )}

          <div className="flex gap-2">
            <label className={`inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-md cursor-pointer hover:bg-gray-50 ${!frontFile ? "pointer-events-none opacity-50" : ""}`}>
              <UploadCloud className="w-4 h-4" /> Tải lên
              <input type="file" accept="image/*" onChange={(e) => handleFileInput(e, "back")} className="hidden" disabled={!frontFile} />
            </label>

            <button
              onClick={() => (frontFile ? openCamera("back") : setError("Bạn cần mặt trước trước"))}
              className={`px-3 py-2 bg-white border rounded-md hover:bg-gray-50 inline-flex items-center gap-2 ${!frontFile ? "opacity-50 pointer-events-none" : ""}`}
            >
              <Camera className="w-4 h-4" /> Chụp ảnh
            </button>

            {backFile && (
              <button onClick={clearBack} className="ml-auto px-3 py-2 bg-red-50 text-red-600 border rounded-md inline-flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Xóa
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error / info */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded flex items-center gap-2">
          <XCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={sending || !frontFile || !backFile}
          className="px-5 py-2 rounded-md bg-teal-600 text-white disabled:opacity-60"
        >
          {sending ? "Đang gửi..." : "Gửi xác minh"}
        </button>

        <button onClick={clearFront} className="px-4 py-2 border rounded-md bg-white">
          Làm lại
        </button>

        <div className="ml-auto text-sm text-gray-500 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Hệ thống sẽ bảo mật dữ liệu — dùng ảnh thật, không che/đậy.
        </div>
      </div>

      {success && (
        <div className="mt-4 p-3 bg-green-50 text-green-800 rounded flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Gửi xác minh thành công.
        </div>
      )}

      {/* Camera modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Chụp ảnh {captureTarget === "front" ? "mặt trước" : "mặt sau"}</h4>
              <button onClick={closeCamera} className="px-2 py-1 rounded-md border bg-white">Đóng</button>
            </div>
            <div className="w-full aspect-video bg-black rounded-md overflow-hidden flex items-center justify-center">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-gray-500">Giữ thiết bị ổn định và khung ảnh rõ nét.</div>
              <div className="flex gap-2">
                <button onClick={capturePhoto} className="px-4 py-2 bg-teal-600 text-white rounded-md">Chụp</button>
                <button onClick={closeCamera} className="px-4 py-2 border rounded-md">Hủy</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
