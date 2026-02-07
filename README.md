# GN News Frontend

Complete production-ready React frontend for a modern news portal.

## Features

### Public Website
- **Responsive Design**: Mobile-first approach
- **Breaking News Hero Section**: Featured breaking news
- **News Grid**: Latest news articles with cards
- **Category System**: Browse news by categories
- **News Details**: Full article view with HTML content
- **Dark/Light Mode**: Theme toggle
- **Contact Form**: Submit inquiries
- **SEO Friendly**: Optimized for search engines

### Admin Dashboard
- **Authentication**: JWT-based login
- **Dashboard**: Statistics and quick actions
- **News Management**: CRUD operations with rich text editor
- **Category Management**: Create/edit/delete categories
- **Image Upload**: Upload thumbnails and article images
- **Settings**: Change password
- **Responsive Layout**: Works on all devices

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **TipTap** - Rich text editor
- **Lucide Icons** - Icon library

## Getting Started

### Prerequisites
- Node.js 16+
- Backend API running at `http://localhost:5000/api`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3001`

## Project Structure

```
src/
├── api/                 # API integration
│   ├── axios.js        # Axios instance with interceptors
│   └── index.js        # API methods
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer
│   ├── NewsCard.jsx    # News card component
│   ├── Loading.jsx     # Loading spinners
│   ├── Alert.jsx       # Alert messages
│   └── AdminNavbar.jsx # Admin navigation
├── context/            # Context API
│   ├── AuthContext.jsx # Authentication
│   └── ThemeContext.jsx # Theme management
├── hooks/              # Custom hooks
│   ├── useAuth.js      # Auth hook
│   └── useTheme.js     # Theme hook
├── layouts/            # Layout components
│   ├── MainLayout.jsx  # Public layout
│   └── AdminLayout.jsx # Admin layout
├── pages/              # Page components
│   ├── HomePage.jsx    # Home page
│   ├── NewsDetailPage.jsx    # Article page
│   ├── CategoryPage.jsx      # Category page
│   ├── AboutPage.jsx         # About page
│   ├── ContactPage.jsx       # Contact page
│   └── admin/          # Admin pages
│       ├── AdminLoginPage.jsx
│       ├── AdminDashboard.jsx
│       ├── AdminNews.jsx
│       ├── AdminNewsEditor.jsx
│       ├── AdminCategories.jsx
│       └── AdminSettings.jsx
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Environment Variables

Create a `.env.local` file:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Integration

The frontend connects to these backend endpoints:

### Auth
- `POST /auth/login`
- `PUT /auth/change-password`

### News
- `GET /news/latest`
- `GET /news/breaking`
- `GET /news/:slug`
- `GET /news/category/:slug`
- `POST /news` (admin)
- `GET /news` (admin)
- `PUT /news/:id` (admin)
- `PATCH /news/:id/status` (admin)
- `DELETE /news/:id` (admin)
- `GET /news/admin/stats` (admin)

### Categories
- `GET /categories`
- `POST /categories` (admin)
- `PUT /categories/:id` (admin)
- `DELETE /categories/:id` (admin)

### Other
- `POST /upload`
- `POST /contact`
- `GET /health`

## Key Features

### Authentication
- JWT token stored in localStorage
- Automatic token refresh via interceptors
- Protected admin routes
- Logout functionality

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints
- Mobile menu navigation
- Touch-friendly buttons

### Dark Mode
- Automatic theme detection
- Manual toggle option
- Persisted theme preference
- Smooth transitions

### Rich Text Editor
- TipTap editor integration
- Bold, italic, headings
- Lists and formatting
- Image insertion support

### Error Handling
- Global error alerts
- API error messages
- Loading states
- Form validation

## Production Build

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Proprietary - All rights reserved

## Support

For issues or questions, please contact: support@gnnews.com
