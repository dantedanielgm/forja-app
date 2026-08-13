# Forja App

Tracker personal de peso, hábitos y entrenamiento. App de un solo archivo
(`index.html`): vanilla JS, sin dependencias, sin backend.

**App viva:** https://dantedanielgm.github.io/forja-app/ — instalable como PWA
(Compartir → Añadir a pantalla de inicio). Funciona offline.

**Todos los datos viven en el `localStorage` del navegador de cada usuario.**
El código no contiene datos de nadie: al abrirla por primera vez pide el perfil
(sexo, estatura, peso de partida y meta) y desde ahí calcula todo.

## Qué hace

- **Peso diario** con proyección por regresión de 28 días hasta la meta
- **Metas por capas:** mes (con ritmo requerido) · año · hoy
- **Carga semanal:** el marcador del entrenamiento — arranca en 1 ejercicio por
  semana y sube solo cuando se cumple la meta, hasta el objetivo elegido
- **Hábitos editables** (renombrar, agregar, eliminar; máscara L-V por hábito)
- **Medidas** con % de grasa estimado (fórmula Navy, distinta por sexo)
- **Rutina del día** con enlace a video por ejercicio
- Hitos, rachas, mosaico de 12 semanas, cierre de mes

## Protección de datos (3 capas)

1. **Snapshot automático diario** (`forja_snap_<fecha>`, rotativo, últimos 7 días,
   sin la foto): se escribe en cada guardado. Si el registro principal desaparece
   o se corrompe, la app **se restaura sola** al abrir y lo avisa con un banner.
2. **Deshacer de importaciones** (`forja_prev`): antes de que un IMPORTAR o un
   link de restauración reemplace datos, lo que había queda guardado. Un import
   equivocado se revierte copiando `forja_prev` de vuelta a `forja_v1`.
   Un registro corrupto queda preservado en `forja_corrupto` como evidencia.
3. **EXPORTAR** descarga un archivo `forja-<fecha>.json` (y copia el JSON al
   portapapeles). Ese archivo es el único respaldo que sobrevive si el navegador
   borra todo el sitio — guardarlo fuera del teléfono. La app avisa si pasan
   3+ días sin exportar.

**Restauración por link:** `.../#d=<base64 del JSON exportado>` restaura todo
con un solo toque. Si el navegador ya tiene datos, pide confirmación antes de
reemplazar (y lo anterior queda en `forja_prev`).

## Desarrollo

`index.html` en la raíz del repo es la única fuente de verdad; GitHub Pages
sirve la rama `main` directamente — hacer push a `main` ES desplegar.
Satélites PWA: `manifest.webmanifest`, `sw.js`, `icon.svg` + PNGs.
