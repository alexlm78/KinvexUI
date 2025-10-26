# Kinvex UI - Frontend

Interfaz de usuario del sistema de inventario Kinvex desarrollada con React y TypeScript.

## Tecnologías

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Material-UI (MUI)** - Componentes de UI
- **React Router** - Navegación
- **React Query** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Axios** - Cliente HTTP
- **Chart.js** - Gráficos y visualizaciones
- **Vitest** - Testing framework

## Características

- Interfaz moderna y responsive
- Gestión completa de inventario
- Dashboard con métricas y gráficos
- Formularios validados
- Autenticación JWT
- Notificaciones toast
- Tema Material Design
- PWA ready

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación y Ejecución

### Desarrollo Local

1. Clona el repositorio:
```bash
git clone <repository-url>
cd KinvexUI
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

### Producción

```bash
# Build para producción
npm run build

# Preview del build
npm run preview
```

### Docker

```bash
docker build -t kinvex-ui .
docker run -p 80:80 kinvex-ui
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting con ESLint
- `npm run test` - Ejecutar tests
- `npm run test:watch` - Tests en modo watch

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas/vistas principales
├── hooks/              # Custom hooks
├── services/           # Servicios API
├── types/              # Definiciones TypeScript
├── utils/              # Utilidades
├── contexts/           # React contexts
├── assets/             # Recursos estáticos
└── test/               # Configuración de tests
```

## Funcionalidades Principales

- **Dashboard**: Métricas y gráficos del inventario
- **Productos**: CRUD completo de productos
- **Categorías**: Gestión de categorías
- **Proveedores**: Administración de proveedores
- **Movimientos**: Registro de entradas y salidas
- **Reportes**: Generación y descarga de reportes
- **Usuarios**: Gestión de usuarios y permisos

## Testing

```bash
# Ejecutar tests una vez
npm run test

# Tests en modo watch
npm run test:watch
```

## Configuración

### Variables de Entorno

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Kinvex
```

### Nginx (Producción)

El proyecto incluye una configuración de Nginx optimizada para SPAs en `nginx.conf`.

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

**Desarrollado por [Kreaker.dev](https://kreaker.dev)**
