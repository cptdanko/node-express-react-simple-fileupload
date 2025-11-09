import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [uploadStatus, setUploadStatus] = useState('')
  const [images, setImages] = useState([])

  // Fetch images when component mounts and after successful upload
  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images')
      const data = await response.json()
      const updatedArr = data.images.map(path => path.replace('/uploads/', 'http://localhost:3000/image/'));
      setImages(updatedArr || [])
    } catch (err) {
      console.error('Error fetching images:', err)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setFileName(file.name)
      setUploadStatus('')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('⚠️ Please select a file first.')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadStatus(`✅ Uploaded successfully: ${data.filePath}`)
      setSelectedFile(null)
      setFileName('')
      // Refresh the image list after successful upload
      fetchImages()
    } catch (err) {
      setUploadStatus(`❌ Error: ${err.message}`)
    }
  }

  return (
    <div className="app">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Image Upload with Vite + React</h1>

      <div className="card">
        <input
          type="text"
          value={fileName}
          placeholder="No file selected"
          readOnly
          style={{ width: '80%', marginBottom: '10px' }}
        />
        <div>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <button onClick={() => document.getElementById('fileInput').click()}>
            Choose File
          </button>
          <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
            Upload
          </button>
        </div>

        {uploadStatus && (
          <p style={{ marginTop: '15px', color: uploadStatus.startsWith('✅') ? 'green' : 'red' }}>
            {uploadStatus}
          </p>
        )}

        {/* Image Gallery */}
        <div className="image-gallery" style={{ marginTop: '2rem' }}>
          <h2>Uploaded Images</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            {images.map((imagePath, index) => (
              <div key={index} style={{ width: '100%', aspectRatio: '1' }}>
                <img
                  src={imagePath}
                  alt={`Uploaded ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
