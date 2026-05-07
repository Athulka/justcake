# How to Edit Your Website Content

This guide helps you make simple changes to your website without needing coding knowledge.

---

## 📝 Changing Prices

**Very Easy - Just edit the numbers!**

1. Open the file: `app/page.js`
2. Find the section you want to change (look for the product name)
3. Change the price number

**Example:**
```javascript
{ name: 'Golden Crown', price: 119 },  // Change 119 to your new price
```

**Sections to edit:**
- `SIGNATURE` - Signature cakes (lines ~138-150)
- `PASTRIES` - Pastries (lines ~152-166)
- `BENTO` - Bento cakes (lines ~168-188)
- `PREMIUM` - Premium cakes (lines ~190-200)
- `COOKIES` - Cookies (lines ~202-218)
- `FLOWERS` - Flowers (lines ~222-231)
- `GIFT_HAMPERS` - Gift hampers (lines ~233-253)

---

## ➕ Adding New Items

**Easy - Copy and paste an existing item**

1. Open `app/page.js`
2. Find the section where you want to add an item
3. Copy an existing item line
4. Paste it below
5. Change the name, price, and description

**Example for Premium Cakes:**
```javascript
{ name: 'Golden Crown',    sub: 'Lotus Biscoff',    img: IMG.goldenCrown,  desc: 'Soft cake with Biscoff spread and cream',   price: 119 },
{ name: 'YOUR NEW CAKE',   sub: 'Flavor Name',      img: IMG.goldenCrown,  desc: 'Your description here',                      price: 150 },
```

**Note:** For new items, you'll need to add the image file to the `public/pictures/` folder first.

---

## 🖼️ Adding New Images

1. Put your image in the `public/pictures/` folder
2. Open `app/page.js`
3. Find the `IMG` section at the top (lines ~14-134)
4. Add your image name:

```javascript
const IMG = {
  // ... existing images ...
  myNewCake: '/pictures/your-image.jpg',
}
```

5. Then use it in your product:
```javascript
{ name: 'My New Cake', img: IMG.myNewCake, ... }
```

---

## 📞 Changing Phone Numbers

**Very Easy - Find and replace**

1. Open `app/page.js`
2. Press `Ctrl + F` (or `Cmd + F` on Mac)
3. Search for: `+971 58 620 6281`
4. Replace with your new number
5. Make sure to replace ALL occurrences (there are several)

---

## ⚠️ Complex Changes Need Help

For these changes, it's better to contact your developer:

- Adding completely new sections (like a new category)
- Changing the layout or design
- Adding new features (like shopping cart)
- Changing animations or scroll behavior
- Technical issues or bugs

---

## 💡 Quick Tips

- **Always backup** before making changes (copy the file first)
- **Test after changes** - refresh your website to see if it works
- **If something breaks** - use `Ctrl + Z` to undo
- **Image formats** - use `.jpg`, `.jpeg`, or `.png` files
- **Image size** - keep images under 1MB for faster loading

---

## 🆘 Need Help?

If you're unsure about making changes, contact your developer with:
- What you want to change
- The section name (e.g., "Premium cakes")
- The new information (e.g., "Change price to 150")

Your developer can make the changes for you quickly!
