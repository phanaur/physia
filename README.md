# Physia

Laboratorio virtual de física y química para ESO y Bachillerato (primero
4.º ESO). Es un complemento didáctico que se construye experimento a experimento.
Aplicación web estática, sin backend: todo se ejecuta en el navegador.

## Tecnología

TypeScript, Vue 3 (Composition API) y Vite. Publicación en GitHub Pages.

## Estado

Consulta [ESTADO.md](ESTADO.md). Hoy hay una base de Vue con la portada y el
módulo matemático `Vector2` con pruebas. Todavía no hay experimentos navegables.

## Cómo arrancar

### Entorno fijado

El proyecto usa **Node 26.13.0 (LTS) y npm 11.20.0**, gestionados con
[nvm](https://github.com/nvm-sh/nvm). Las versiones están fijadas en `.nvmrc`,
`engines` y `packageManager` de `package.json`.

**No instales Node ni npm con `apt`.** El paquete de Ubuntu es más antiguo y no
puede ejecutar TypeScript directamente, así que `npm test` falla. Si ya está
instalado, no hace falta quitarlo: basta con que el proyecto no lo use.

### Instalación en un Ubuntu nuevo

1. Instalar las herramientas básicas:

   ```bash
   sudo apt update
   sudo apt install git curl
   ```

2. Instalar nvm (versión 0.41.0) y abrir una terminal nueva para que lo cargue:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.41.0/install.sh | bash
   ```

3. Clonar el repositorio e instalar la versión de Node que indica `.nvmrc`:

   ```bash
   git clone https://github.com/phanaur/physia.git
   cd physia
   nvm install
   nvm use
   ```

4. Instalar las dependencias exactas de `package-lock.json`:

   ```bash
   npm ci
   ```

5. Comprobar el entorno. `node --version` debe dar `v26.13.0` y
   `npm --version`, `11.20.0`.

### Uso diario

Antes de trabajar, entra en la carpeta y ejecuta `nvm use`.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en <http://127.0.0.1:5180/physia/> |
| `npm run check` | Comprobación de tipos |
| `npm test` | Pruebas con el ejecutor integrado de Node (`node --test`) |
| `npm run build` | Comprobación de tipos y construcción en `dist/` |
| `npm run preview` | Sirve `dist/` en <http://127.0.0.1:5182/physia/> |

### Editores

WebStorm, VSCode y Zed deben usar el Node de nvm, no el del sistema:

- **WebStorm:** en los ajustes de Node.js, fija el intérprete en
  `~/.nvm/versions/node/v26.13.0/bin/node`. La ruta lleva la versión, así que hay
  que actualizarla al subir de versión.
- **VSCode y Zed:** heredan el `PATH` de la terminal desde la que se abren. Ábrelos
  con `code .` o `zed .` después de `nvm use`.

### Subir de versión de Node

Se hace de forma deliberada, cambiando `.nvmrc` y `engines` a la vez, y se
comprueba que el npm incluido coincide con `packageManager`. Después, ejecutar
`npm run check`, `npm test` y `npm run build`.

## Documentación

1. [AGENTS.md](AGENTS.md): acuerdo de trabajo y tutoría.
2. [ESTADO.md](ESTADO.md): estado actual y siguiente paso.
3. [PLAN.md](PLAN.md): hoja de ruta, no autoriza a implementar por sí sola.

## Licencia

[MIT](LICENSE).
