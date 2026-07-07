# Onboarding

Sitio web de Galletas Juanita. React + Vite en el frontend, consume la API de [Cookiexpend-API](https://github.com/Magi1610) como backend.

## Requisitos

- Node.js 20+ (probado con Node 24 / npm 11)
- El backend (Cookiexpend-API) corriendo localmente, o una URL de API accesible

## Configuración inicial

```bash
npm install
cp .env.example .env
```

Edita `.env` si tu backend no corre en `http://localhost:8000`.

### Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base de la API (Cookiexpend-API) que consume el frontend | `http://localhost:8000` |

`.env` está en `.gitignore` — nunca se commitea. Usa `.env.example` como plantilla.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo de Vite con HMR |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Sirve el build de `dist/` localmente |
| `npm run lint` | Corre ESLint sobre todo el proyecto |

Tests automatizados (Vitest + React Testing Library) están en proceso de configurarse — todavía no hay `npm run test`. Hasta entonces, la verificación manual se apoya en `verify-changes.mjs` (screenshots con Playwright de las secciones principales contra un servidor de dev corriendo).

## Estructura del proyecto

```
src/
  components/     Componentes de página y de sección (Home, ProductsCatalog, ProductDetail,
                   AboutPage, Contact, Gallery, Allies, Faq, Navbar, Footer, ...)
  hooks/          Hooks que encapsulan las llamadas a la API (useProducts, useDepartamentos, useGallery)
  services/api.js Wrapper único de fetch (apiFetch) usado por todos los hooks
  styles/         CSS por componente (un archivo .css por cada .jsx en components/)
  assets/         Imágenes estáticas
  App.jsx         Rutas (react-router-dom)
  main.jsx        Punto de entrada
```

### Cómo se consume la API

Toda llamada a la API pasa por `apiFetch` en [src/services/api.js](../src/services/api.js): antepone `VITE_API_URL`, parsea JSON, y lanza un `Error` con `.status`/`.data` si la respuesta no es `ok`. Los hooks en `src/hooks/` son la única capa que llama a `apiFetch` directamente — los componentes consumen los hooks, no `apiFetch` ni `fetch` directamente.

Al agregar un nuevo endpoint: crea o extiende un hook en `src/hooks/`, no llames a `apiFetch` desde un componente.

### Rutas

Definidas en [src/App.jsx](../src/App.jsx):

| Ruta | Componente |
|---|---|
| `/` | `Home` |
| `/nosotros` | `AboutPage` |
| `/productos` | `ProductsCatalog` |
| `/productos/:slug` | `ProductDetail` |

## Flujo de ramas y PRs

- `develop` es la rama base para desarrollo. Las ramas de trabajo (`feature/*`, `fix/*`) parten de `develop` y las PRs apuntan a `develop`.
- `main` refleja lo publicado/estable. Se promueve `develop → main` al hacer un release, no se commitea directo a `main`.
- Antes de abrir PR: correr `npm run lint` (y, cuando exista, la suite de tests) sin errores.

## Estado de calidad (en progreso)

Este proyecto está alineándose con el nivel de calidad del backend (Cookiexpend-API): tests con Vitest/RTL, Prettier + ESLint automatizados en pre-commit, y CI en GitHub Actions para PRs a `main`/`develop`. Si alguno de estos todavía no existe al leer esto, es trabajo pendiente, no un olvido de documentación.
