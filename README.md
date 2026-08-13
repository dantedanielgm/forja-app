# Forja App

Tracker personal de peso, hábitos y entrenamiento. App de un solo archivo
(`index.html`): vanilla JS, sin dependencias, sin backend.

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
- **Exportar / importar** en JSON — el respaldo del usuario

## Uso

Abrir `index.html` en cualquier navegador. Para instalarla en el teléfono:
Compartir → Añadir a pantalla de inicio.

## Respaldo

Los datos son locales al navegador. Exportar periódicamente y guardar el texto
resultante es la única forma de recuperarlos si el navegador los limpia.
