document.getElementById('uploadBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('videoInput');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please select a video file');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const base64Data = e.target.result.split(',')[1];
      document.getElementById('progress').textContent = 'Uploading...';
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64Data })
      });
      
      const data = await response.json();
      
      if (data.success) {
        document.getElementById('result').innerHTML = `
          <p>Upload complete!</p>
          <a href="${data.url}" target="_blank">View Video</a>
          <p>Share link: ${data.url}</p>
        `;
      } else {
        document.getElementById('result').textContent = 'Upload failed';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('result').textContent = 'Error uploading';
    }
  };
  reader.readAsDataURL(file);
});
