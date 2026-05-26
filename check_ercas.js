const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Buscar elemento de Ercas
  const hasErcas = await page.evaluate(() => {
    return document.body.innerText.includes('Ercas');
  });
  
  console.log('Ercas encontrado:', hasErcas);
  
  // Screenshot de la sección portfolio
  await page.screenshot({ path: 'ercas-check.png', fullPage: true });
  
  await browser.close();
})();
