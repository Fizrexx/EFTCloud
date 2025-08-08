const { put } = require('@vercel/blob');
const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!req.body || !req.body.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Generate random ID
    const id = crypto.randomBytes(4).toString('hex');
    const fileName = `video-${id}.mp4`;

    // Upload to Vercel Blob
    const { url } = await put(fileName, req.body.file, {
      access: 'public',
      contentType: 'video/mp4'
    });

    res.status(200).json({ 
      success: true, 
      url: `/v/${id}`,
      directUrl: url
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};
