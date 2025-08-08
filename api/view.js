const { get } = require('@vercel/blob');

module.exports = async (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    return res.status(404).send('Video not found');
  }

  try {
    const blob = await get(`video-${id}.mp4`);
    
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>EFTCLOUD Video</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="/styles.css" rel="stylesheet">
      </head>
      <body class="video-page">
        <div class="container">
          <h1>EFTCLOUD</h1>
          <video controls autoplay playsinline>
            <source src="${blob.url}" type="video/mp4">
          </video>
          <div class="share-box">
            <input type="text" value="${req.headers.host}/v/${id}" readonly>
            <button onclick="copyLink()">Copy Link</button>
          </div>
        </div>
        <script>
          function copyLink() {
            const input = document.querySelector('input');
            input.select();
            document.execCommand('copy');
            alert('Link copied!');
          }
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(404).send('Video not found');
  }
};
