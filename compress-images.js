const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'public', 'products')

async function main() {
  const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  for (const file of files) {
    const src = path.join(dir, file)
    const stat = fs.statSync(src)
    const sizeMB = stat.size / (1024 * 1024)

    // Only compress files > 300KB
    if (stat.size < 300 * 1024) {
      console.log(`SKIP ${file} (${(sizeMB).toFixed(2)} MB - already small)`)
      continue
    }

    const tmp = src + '.tmp.jpg'
    await sharp(src)
      .resize({ width: 800, height: 800, fit: 'cover', withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(tmp)

    const newStat = fs.statSync(tmp)
    const newSizeMB = newStat.size / (1024 * 1024)

    // Replace original
    fs.unlinkSync(src)
    fs.renameSync(tmp, src)
    console.log(`DONE ${file}: ${sizeMB.toFixed(2)} MB → ${newSizeMB.toFixed(2)} MB (${Math.round((1 - newStat.size / stat.size) * 100)}% smaller)`)
  }

  console.log('\nAll images optimized!')
}

main().catch(err => { console.error(err); process.exit(1) })
