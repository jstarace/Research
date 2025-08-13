# Jason Starace - Research Portfolio

A modern, interactive research portfolio website built with Next.js 14, featuring liquid glass morphism effects and smooth animations.

## ✨ Features

- **Liquid Glass Interface**: Interactive navigation with glass morphism effects
- **Single Page Application**: Smooth transitions without page reloads
- **Random Backgrounds**: Dynamic background selection from personal image collection
- **Mobile-First Design**: Responsive across all devices
- **Expandable Navigation**: Click-to-expand menu system in the header
- **Custom SVG Icons**: Personalized navigation icons for each section

## 🎯 Sections

- **Profile**: Personal information and academic background
- **Publications**: Research papers and academic articles
- **Projects**: Current and past research projects
- **Connect**: Contact information and collaboration opportunities

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17.0 or later
- npm 9.0.0 or later

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd research-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your background images**
   - Place your images in `public/images/`
   - Update the `backgroundImages` array in `app/page.tsx`

4. **Customize navigation icons**
   - Replace SVG files in `public/`:
     - `profile.svg`
     - `publications.svg`
     - `projects.svg`
     - `connect.svg`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Components**: Custom liquid glass morphism components
- **Icons**: Custom SVG icons

## 📁 Project Structure

```
├── app/
│   ├── [...slug]/page.tsx    # Catch-all route (redirects to home)
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main homepage with navigation
├── components/
│   ├── custom-icon.tsx       # SVG icon wrapper
│   ├── liquid-button.tsx     # Interactive button component
│   └── liquid-glass.tsx      # Glass morphism effect component
├── public/
│   ├── images/               # Background images
│   ├── profile.svg           # Navigation icons
│   ├── publications.svg
│   ├── projects.svg
│   └── connect.svg
└── styles/
    └── globals.css           # Global styles and animations
```

## 🎨 Customization

### Background Images
Update the `backgroundImages` array in `app/page.tsx`:
```javascript
const backgroundImages = [
  '/images/your-image-1.jpg',
  '/images/your-image-2.jpg',
  // Add more images as needed
]
```

### Content Sections
Modify the `getPageContent()` function in `app/page.tsx` to customize:
- Section titles
- Descriptions
- Background gradients

### Colors & Styling
Button colors and themes can be customized in the `buttons` array in `app/page.tsx`.

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
The project works on any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Environment Requirements

- Node.js: >=18.17.0
- npm: >=9.0.0

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

## 📧 Contact

For questions or collaboration opportunities, visit the Connect section of the website.