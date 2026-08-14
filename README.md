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
- **Hoja de ruta autocalculada:** desde la última medición la app deriva la masa
  magra, el peso al que llegas con tu % de grasa objetivo, y **genera el calendario
  mes a mes hasta la fecha de llegada**. El ritmo respeta un máximo seguro que baja
  conforme baja la grasa (0.90 kg/sem sobre 30% → 0.30 bajo 15%), escalado por el
  modo elegido (conservador/normal/agresivo). Se regenera en cada medición: si un
  mes se estanca, el calendario entero se corre solo.
  El plan asume masa magra constante; **cuando una medición real la desmiente, la
  app avisa que el supuesto se rompió** y recalcula hacia un destino peor
- **Metas por capas:** mes (de la hoja de ruta) · año · hoy
- **Carga semanal:** el marcador del entrenamiento — arranca en 1 ejercicio por
  semana y sube solo cuando se cumple la meta, hasta el objetivo elegido
- **Hábitos editables** (renombrar, agregar, eliminar; máscara L-V por hábito)
- **Medidas:** cintura y cuello semanales · hombros, brazo y muslo el día 1 del mes.
  Calcula % de grasa (Navy), masa magra y **RATIO V** (hombros ÷ cintura)
- **Veredicto de recomposición:** compara contra la medición de hace ~30 días.
  Cintura que baja con la masa magra intacta = `RECOMPONIENDO ✓`; si la magra cae
  más de 1 kg avisa `PERDIENDO MÚSCULO`. Es lo único que distingue adelgazar de
  recomponerse, y no se ve en la balanza
- **Las dos curvas que deben subir:** masa magra y ratio V en el tiempo, junto a
  la del peso que baja — las tres cuentan la historia que ninguna cuenta sola
- **Rutina por fases** ligada a la carga semanal: fase 0 pool libre → fase 3 con
  4 sesiones y 20 ejercicios. Sube de fase sola y lo celebra con un banner.
  Prioridad por tiers: si hay que recortar, se recorta de abajo
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
   borra todo el sitio. **ENVIAR ⤴** lo manda por WhatsApp/Drive/correo con la
   hoja de compartir del sistema — el respaldo que sale del teléfono; el botón
   solo aparece donde el navegador soporta compartir archivos. La app avisa si
   pasan 3+ días sin respaldar.

**Restauración por link:** `.../#d=<base64 del JSON exportado>` restaura todo
con un solo toque. Si el navegador ya tiene datos, pide confirmación antes de
reemplazar (y lo anterior queda en `forja_prev`).

## Desarrollo

`index.html` en la raíz del repo es la única fuente de verdad; GitHub Pages
sirve la rama `main` directamente — hacer push a `main` ES desplegar.
Satélites PWA: `manifest.webmanifest`, `sw.js`, `icon.svg` + PNGs.
