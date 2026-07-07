import { chromium } from 'playwright'

const url = 'http://localhost:5181'
const browser = await chromium.launch()

async function shot(viewport, name, scrollSelector) {
  const page = await browser.newPage({ viewport })
  await page.goto(url, { waitUntil: 'networkidle' })
  if (scrollSelector) {
    await page.locator(scrollSelector).scrollIntoViewIfNeeded()
  }
  await page.waitForTimeout(500)
  await page.screenshot({ path: `screenshots/${name}.png` })
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  await page.close()
  return errors
}

await shot({ width: 1440, height: 900 }, 'desktop-hero')
await shot({ width: 1440, height: 900 }, 'desktop-about', '#nosotros')
await shot({ width: 1440, height: 900 }, 'desktop-contact', '#contacto')
await shot({ width: 768, height: 1000 }, 'tablet-contact', '#contacto')
await shot({ width: 390, height: 844 }, 'mobile-contact', '#contacto')

await browser.close()
console.log('done')
