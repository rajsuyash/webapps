const { chromium } = require('playwright-core');
const path = require('path');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1180, height: 820 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));

  await page.goto('file://' + path.resolve(__dirname, 'index.html'));
  await page.waitForTimeout(2500); // welcome messages

  const launchers = await page.$$eval('.scn', els => els.map(e => e.dataset.key));
  console.log('Launchers found:', launchers.join(', '));

  // Run the discovery scenario end-to-end via quick replies (wait for chips like a real user)
  await page.click('.scn[data-key="discovery"]');
  for (let i = 0; i < 6; i++) {
    try { await page.waitForSelector('.wa-chips .chip', { timeout: 6000 }); }
    catch { break; }
    await page.click('.wa-chips .chip');
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(800);
  const cards = await page.$$eval('.pcard', els => els.length);
  const leads = await page.$$eval('.leadcard', els => els.length);
  const msgs = await page.$$eval('.bubble', els => els.length);
  console.log(`Discovery: bubbles=${msgs}, productCards=${cards}, leadCards=${leads}`);

  // Test free-text NLU
  await page.click('.scn[data-key="support"]');
  await page.waitForTimeout(1500);
  await page.fill('#msg', 'what is your buyback policy?');
  await page.click('#send');
  await page.waitForTimeout(2000);
  const cite = await page.$$eval('.cite', els => els.length);
  console.log('Free-text RAG answer cites:', cite);

  // screenshot the discovery result
  await page.click('.scn[data-key="bridal"]');
  await page.waitForTimeout(2000);
  await page.click('.wa-chips .chip'); // South Indian
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'assets/screenshot-bridal.png' });

  // RACE TEST: switch scenarios rapidly while one is still typing
  await page.click('.scn[data-key="bridal"]');
  await page.waitForTimeout(300);          // interrupt mid-typing
  await page.click('.scn[data-key="voice"]');
  await page.waitForTimeout(1500);
  await page.click('.wa-chips .chip');     // Tamil voice note
  await page.waitForTimeout(4000);
  // verify NO bridal content leaked into the voice thread
  const leaked = await page.$$eval('.bubble', els => els.some(e => /budget plan|10 lakh|complete bridal look|allocate ₹10/i.test(e.textContent)));
  console.log('Race test — bridal content leaked into voice thread:', leaked);
  const voiceBubbles = await page.$$eval('.voice', els => els.length);
  console.log('Voice bubbles rendered:', voiceBubbles);
  await page.screenshot({ path: 'assets/screenshot-voice.png' });

  console.log('CONSOLE ERRORS:', errors.length ? errors.join('\n') : 'none');
  await browser.close();
  console.log(errors.length ? 'SMOKE TEST: completed WITH errors' : 'SMOKE TEST: PASS');
})().catch(e => { console.error('TEST CRASHED', e); process.exit(1); });
