# Kinvex UI - Frontend

User interface for the Kinvex inventory system developed with React and TypeScript.

## Technologies

- **React 18** - UI Framework
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - UI Components
- **React Router** - Navigation
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Chart.js** - Charts and visualizations
- **Vitest** - Testing framework

## Features

- Modern and responsive interface
- Complete inventory management
- Dashboard with metrics and charts
- Validated forms
- JWT authentication
- Toast notifications
- Material Design theme
- PWA ready

## Requirements

- Node.js 18+
- npm or yarn

## Installation and Execution

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd KinvexUI
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Production

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

### Docker

```bash
docker build -t kinvex-ui .
docker run -p 80:80 kinvex-ui
```

## Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Build preview
- `npm run lint` - ESLint linting
- `npm run test` - Run tests
- `npm run test:watch` - Tests in watch mode

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Main pages/views
├── hooks/              # Custom hooks
├── services/           # API services
├── types/              # TypeScript definitions
├── utils/              # Utilities
├── contexts/           # React contexts
├── assets/             # Static resources
└── test/               # Test configuration
```

## Main Features

- **Dashboard**: Inventory metrics and charts
- **Products**: Complete product CRUD
- **Categories**: Category management
- **Suppliers**: Supplier administration
- **Movements**: Entry and exit logging
- **Reports**: Report generation and download
- **Users**: User and permission management

## Testing

```bash
# Run tests once
npm run test

# Tests in watch mode
npm run test:watch
```

## Configuration

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Kinvex
```

### Nginx (Production)

The project includes an optimized Nginx configuration for SPAs in `nginx.conf`.

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

**Developed by [Kreaker.dev](https://kreaker.dev)**
