const fs = require('fs');
const path = require('path');

function checkMetaTags(htmlContent) {
  const requiredTags = [
    'title',
    'description',
    'viewport',
    'og:title',
    'og:description',
    'twitter:card'
  ];
  
  // Add your meta tag validation logic here
  // Return true if valid, false if invalid
}

// Scan HTML files and validate meta tags
const scanDirectory = (directory) => {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    if (file.endsWith('.html')) {
      const content = fs.readFileSync(path.join(directory, file), 'utf8');
      const isValid = checkMetaTags(content);
      
      if (!isValid) {
        console.error(`Meta tags validation failed for ${file}`);
        process.exit(1);
      }
    }
  });
};

scanDirectory('./public');
