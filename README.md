# ABCD — Espectador en tiempo real

Aplicación web en Vue 3 para enviar y mostrar señales visuales (letra + color) en tiempo real entre un **panel de control** y una **pantalla de espectador**, sincronizados con Firebase Realtime Database.

## Demo de uso

| Rol | URL |
|-----|-----|
| **Espectador** | `/` |
| **Panel de control** | `/?role=sender` |

Abre el panel de control en un dispositivo (teléfono, tablet o PC) y el espectador en otra pantalla. Al pulsar una letra en el dashboard, el espectador cambia al color y la letra correspondientes al instante.

## Cuadrantes

| Letra | Color |
|-------|-------|
| A | Rojo `#e53935` |
| B | Azul `#1e88e5` |
| C | Amarillo `#fdd835` |
| D | Verde `#43a047` |

## Características

### Espectador
- Pantalla completa con fondo del color activo y la letra centrada.
- Estado de espera cuando no hay señal activa.
- Tecla **F** para entrar en pantalla completa.

### Panel de control
- Dashboard con botones A, B, C y D.
- Indicador de la señal que se está enviando.
- Enlace del espectador con botón para copiar.
- Atajos de teclado: mantén pulsada **A**, **B**, **C** o **D** para enviar; suelta para limpiar.

## Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)

## Estructura del proyecto

```
src/
├── App.vue                    # Enruta entre espectador y control
├── config/quadrants.js        # Letras y colores
├── composables/useActiveKey.js # Sincronización con Firebase
├── firebase.js                # Configuración de Firebase
├── views/
│   ├── ViewerView.vue         # Vista del espectador
│   └── SenderView.vue         # Dashboard del transmisor
└── style.css
```

## Requisitos

- Node.js 18+
- Proyecto de Firebase con Realtime Database habilitada

## Instalación

```bash
git clone git@github.com:aspermaster23yeh/Test.git
cd Test
npm install
```

## Configuración de Firebase

Las credenciales **no van en el código**. Usa variables de entorno:

```bash
cp .env.example .env
```

Completa `.env` con los valores de Firebase Console → Configuración del proyecto → Tus apps:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

> **Nunca subas `.env` a Git.** El archivo ya está en `.gitignore`.

### Vercel

En el dashboard de Vercel → Settings → Environment Variables, añade las mismas variables `VITE_*` para Production, Preview y Development.

En Firebase Console, configura las reglas de Realtime Database según tu entorno. Para desarrollo puedes usar:

```json
{
  "rules": {
    "activeKey": {
      ".read": true,
      ".write": true
    }
  }
}
```

> En producción restringe lectura/escritura según tus necesidades de seguridad.

## Scripts

```bash
npm run dev      # Servidor de desarrollo (http://localhost:5173)
npm run build    # Build de producción en dist/
npm run preview  # Vista previa del build
```

## Despliegue

El proyecto incluye configuración para [Vercel](https://vercel.com/) en `vercel.json`:

- **Build command:** `npm run build`
- **Output directory:** `dist`

Tras desplegar, usa:
- `https://tu-dominio.vercel.app/` → Espectador
- `https://tu-dominio.vercel.app/?role=sender` → Panel de control

## Flujo de datos

```
Panel de control                    Firebase RTDB                 Espectador
     │                                    │                            │
     │  set(activeKey, "A")               │                            │
     ├───────────────────────────────────►│                            │
     │                                    │  onValue(activeKey)        │
     │                                    ├───────────────────────────►│
     │                                    │                            │ Muestra A + rojo
     │  set(activeKey, null)              │                            │
     ├───────────────────────────────────►│                            │
     │                                    ├───────────────────────────►│
     │                                    │                            │ Pantalla en espera
```

## Licencia

Proyecto privado.
