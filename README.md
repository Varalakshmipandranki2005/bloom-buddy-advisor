
# 🌱 Plant Care AI

**Advanced AI-Powered Plant Health Analysis & Care Recommendations**

A sophisticated React-based web application that leverages artificial intelligence to provide comprehensive plant identification, health assessment, and personalized care recommendations. Built with modern web technologies and supporting multiple Indian regional languages for broader accessibility.

## ✨ Key Features

### 🔍 **AI-Powered Plant Analysis**
- **Smart Plant Identification**: Upload plant photos for instant AI-powered species identification
- **Comprehensive Health Assessment**: Detailed analysis of plant condition, diseases, and nutrient deficiencies
- **Personalized Care Plans**: Custom medication and treatment recommendations based on plant-specific needs

### 🌍 **Multilingual Support**
- **10 Indian Regional Languages**: Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi
- **Intelligent Language Detection**: Automatic browser language detection with manual override
- **Localized Content**: Full UI translation for accessibility across diverse user bases

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Interface**: Clean, accessible design built with Tailwind CSS and shadcn/ui
- **Real-time Feedback**: Instant analysis results with visual progress indicators
- **Interactive Forms**: Guided plant information input with smart validation

## 🚀 Technology Stack

### **Frontend**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - High-quality, accessible component library

### **Internationalization**
- **React i18next** - Robust internationalization framework
- **Browser Language Detection** - Automatic locale detection and persistence
- **Dynamic Content Loading** - Optimized translation resource management

### **Backend & Infrastructure**
- **Supabase** - Backend-as-a-Service with Edge Functions
- **Supabase Edge Functions** - Serverless AI processing and analysis
- **PostgreSQL** - Robust database with full-text search capabilities
- **Vercel** - Production deployment and hosting

### **Development Tools**
- **ESLint** - Code linting and quality assurance
- **TypeScript Config** - Strict type checking and modern JS features
- **React Query** - Efficient data fetching and state management

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **Bun** (recommended) or npm package manager
- **Supabase Account** for backend services ([Sign up](https://supabase.com/))
- **Modern Web Browser** with JavaScript enabled

## 🛠️ Installation & Setup

### 1. **Clone the Repository**
```bash
git clone <repository-url>
cd plant-care-ai
```

### 2. **Install Dependencies**
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. **Environment Configuration**
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. **Start Development Server**
```bash
# Using Bun
bun dev

# Or using npm
npm run dev
```

### 5. **Access the Application**
Open [http://localhost:5173](http://localhost:5173) in your web browser.

## 🌐 Deployment

### **Vercel Deployment (Recommended)**

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment Variables**: Add your Supabase credentials in Vercel dashboard
3. **Deploy**: Automatic deployment on every push to main branch

The application includes optimized `vercel.json` configuration for production deployment.

### **Alternative Deployment Options**
- **Netlify**: Drag-and-drop deployment with automatic builds
- **GitHub Pages**: Free hosting for static sites
- **Self-hosted**: Deploy to your own server infrastructure

## 📖 Usage Guide

### **For End Users**

1. **Select Language**: Choose your preferred language from the dropdown
2. **Upload Plant Image**: Click to upload or drag-and-drop a clear plant photo
3. **Provide Plant Details**: Fill in location, symptoms, and environmental conditions
4. **Get Analysis**: Receive instant AI-powered plant identification and health assessment
5. **Follow Recommendations**: Apply suggested treatments and care instructions

### **For Developers**

```bash
# Run development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run type checking
bun run type-check

# Lint code
bun run lint
```

## 📁 Project Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui component library
│   ├── Header.tsx      # Application header with navigation
│   ├── HeroSection.tsx # Landing page hero section
│   └── LanguageSwitcher.tsx # Language selection component
├── pages/              # Page-level components
│   ├── Index.tsx       # Main application page
│   └── NotFound.tsx    # 404 error page
├── i18n/               # Internationalization setup
│   ├── config.ts       # i18next configuration
│   └── locales/        # Translation files for each language
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
└── types/              # TypeScript type definitions
```

## 🔧 Configuration

### **Language Support**
The application supports the following languages:
- English (en) - Default
- हिन्दी (hi) - Hindi
- বাংলা (bn) - Bengali
- தமிழ் (ta) - Tamil
- తెలుగు (te) - Telugu
- मराठी (mr) - Marathi
- ગુજરાતી (gu) - Gujarati
- ಕನ್ನಡ (kn) - Kannada
- മലയാളം (ml) - Malayalam
- ਪੰਜਾਬੀ (pa) - Punjabi

### **Environment Variables**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Code Standards**
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write comprehensive tests for new features
- Ensure responsive design compatibility
- Maintain accessibility standards (WCAG 2.1)

### **Translation Contributions**
To add support for additional languages:
1. Create a new JSON file in `src/i18n/locales/`
2. Add the language configuration to `src/i18n/config.ts`
3. Update the language options in `src/components/LanguageSwitcher.tsx`

## 🐛 Bug Reports & Feature Requests

### **Reporting Issues**
- Use the GitHub Issues template
- Provide detailed reproduction steps
- Include browser and device information
- Attach relevant screenshots or error logs

### **Feature Requests**
- Clearly describe the proposed functionality
- Explain the use case and benefits
- Provide mockups or examples if applicable

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the exceptional frontend framework
- **Supabase** for providing robust backend infrastructure
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first styling approach
- **The Open Source Community** for continuous inspiration and support

## 📞 Support & Contact

- **Documentation**: [Project Wiki](link-to-wiki)
- **Community**: [Discord Server](link-to-discord)
- **Email**: support@plantcare-ai.com
- **GitHub Issues**: [Report a Bug](link-to-issues)

---

**Made with 🌱 for plant lovers worldwide**

*Empowering everyone to become a better plant parent through AI-powered insights and multilingual accessibility.*
