const fs = require('fs');
const xml2js = require('xml2js');
const fetch = require('node-fetch');

async function validateSitemap() {
  const sitemap = fs.readFileSync('./public/sitemap.xml', 'utf8');
  
  try {
    // Parse XML
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(sitemap);
    
    // Validate URLs
    const urls = result.urlset.url;
    for (const url of urls) {
      const response = await fetch(url.loc[0]);
      if (response.status !== 200) {
        console.error(`Invalid URL in sitemap: ${url.loc[0]}`);
        process.exit(1);
      }
    }
  } catch (error) {
    console.error('Sitemap validation failed:', error);
    process.exit(1);
  }
}

validateSitemap();
