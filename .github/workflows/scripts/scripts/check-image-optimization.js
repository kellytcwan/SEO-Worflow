const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
const REQUIRED_FORMATS = ['webp', 'jpg']; // Required image formats

async function checkImage(imagePath) {
  const stats = fs.statSync(imagePath);
  const metadata = await sharp(imagePath).metadata();
  
  // Check file size
  if (stats.size > MAX_IMAGE_SIZE) {
    console.error(`Image ${imagePath} exceeds maximum size`);
    return false;
  }
  
  // Check image dimensions
  if (metadata.width > 2000 || metadata.height > 2000) {
    console.error(`Image ${imagePath} dimensions too large`);
    return false;
  }
  
  return true;
}

// Scan images directory and validate
const scanImages = async (directory) => {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const isValid = await checkImage(path.join(directory, file));
      if (!isValid) process.exit(1);
    }
  }
};

scanImages('./public/images');
