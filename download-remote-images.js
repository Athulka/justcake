const fs = require('fs')
const path = require('path')
const https = require('https')

const outDir = path.join(__dirname, 'public', 'products')
fs.mkdirSync(outDir, { recursive: true })

const files = [
  ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.1.0&q=85&w=1200&fm=jpg&crop=entropy&cs=srgb', 'hero-baker.jpg'],
  ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb', 'chocolate.jpg'],
  ['https://images.unsplash.com/photo-1536599524557-5f784dd53282?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb', 'vanilla.jpg'],
  ['https://images.unsplash.com/photo-1559553156-2e97137af16f?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb', 'strawberry.jpg'],
  ['https://images.pexels.com/photos/4161223/pexels-photo-4161223.jpeg?cs=srgb&fm=jpg', 'biscoff.jpg'],
  ['https://images.pexels.com/photos/19910617/pexels-photo-19910617.jpeg?cs=srgb&fm=jpg', 'fresh-fruit.jpg'],
  ['https://images.pexels.com/photos/6133313/pexels-photo-6133313.jpeg?cs=srgb&fm=jpg', 'red-velvet.jpg'],
  ['https://images.unsplash.com/photo-1580495153927-cae0d9741ca0?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb', 'heart-cake.jpg'],
  ['https://images.pexels.com/photos/8802102/pexels-photo-8802102.jpeg?cs=srgb&fm=jpg', 'black-forest.jpg'],
  ['https://images.unsplash.com/photo-1547414368-ac947d00b91d?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb', 'butterscotch.jpg'],
  ['https://images.unsplash.com/photo-1630710979324-43f131046559?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb', 'choc-truffle.jpg'],
  ['https://images.unsplash.com/photo-1640839954789-ca0049648b18?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb', 'ferrero.jpg'],
  ['https://pplx-res.cloudinary.com/image/upload/pplx_search_images/e92f3d1da3f6fadaa57d563127651ee268832138.jpg', 'chip-stack.jpg'],
  ['https://pplx-res.cloudinary.com/image/upload/pplx_search_images/51bae5a92e7d2a21839da7ba894549754c865075.jpg', 'nutella.jpg'],
  ['https://pplx-res.cloudinary.com/image/upload/pplx_search_images/a8adf336399cc0a435e1ab9815e99a62c0b4beb9.jpg', 'almond.jpg'],
  ['https://pplx-res.cloudinary.com/image/upload/pplx_search_images/c9e6d541493da52e623ae4b7df71c5b1d1de92bd.jpg', 'red-velvet-cookie.jpg'],
  ['https://pplx-res.cloudinary.com/image/upload/pplx_search_images/d2267e8d2208fc40dc895fbf22e5f9e96e953106.jpg', 'almond-single.jpg'],
  ['https://pplx-res.cloudinary.com/image/upload/pplx_search_images/880ae3e27a9fcf86e1c219ceab8831482bfe274f.jpg', 'nutella-2.jpg'],
  ['https://pplx-res.cloudinary.com/image/upload/pplx_search_images/95c2e4e51795b7f1651b5c52b28dfa708bb5207c.jpg', 'cheesecake.jpg'],
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close()
        fs.unlink(dest, () => {
          download(res.headers.location, dest).then(resolve).catch(reject)
        })
        return
      }
      if (res.statusCode !== 200) {
        file.close()
        fs.unlink(dest, () => reject(new Error(`Failed ${url}: ${res.statusCode}`)))
        return
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', (err) => {
      file.close()
      fs.unlink(dest, () => reject(err))
    })
  })
}

async function main() {
  for (const [url, name] of files) {
    const dest = path.join(outDir, name)
    process.stdout.write(`Downloading ${name}...\n`)
    await download(url, dest)
  }
  console.log(`Downloaded ${files.length} files to ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
