import { useState, useEffect } from 'react'
import './App.css'
import type { ImageAnalysis } from './types/ImageAnalysis'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysis | null>(null)
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }

  useEffect(() => {
    if(!selectedFile){
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  console.log(!!preview);
  async function handleUpload() {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    const response = await fetch('https://localhost:7149/api/FileUpload/analyzeImage', {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      alert(`HTTP error! Status: ${response?.status}`)
      return;
    }
    const data = await response.json() as ImageAnalysis
    setAnalysisResult(data)
  }

  return (
    <>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {!!preview && <img alt="Selected file" height={200} src={preview} />}
      {analysisResult && (
        <>
          {analysisResult?.objects?.map((obj, idx) => (
            <div key={idx}>
              <p>Object: {obj.objectProperty}</p>
              <p>Confidence: {obj.confidence.toFixed(2)}</p>
            </div>
          ))}
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </>
      )}
    </>
  )
}

export default App
