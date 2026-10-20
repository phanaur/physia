# Estado del laboratorio virtual

Última actualización: 2026-10-20

## Fase activa

**Fase 1 — Esqueleto ejecutable.**

Physia ya contiene un workspace de Cargo y una aplicación Dioxus mínima con
portada, catálogo provisional y diseño adaptable. La versión web compila y se
ha comprobado visualmente en navegador. Los prototipos existentes continúan
separados y no se han modificado.

## Objetivo actual

Publicar la base de Physia y preparar la incorporación controlada del explorador
de campos eléctricos, manteniendo el destino web como prioridad y evitando
abstracciones para experimentos inexistentes.

## Decisiones confirmadas

- **Proyecto:** Physia, en `https://github.com/phanaur/physia`.
- **Licencia:** MIT.
- **Lenguaje:** Rust estable.
- **Framework:** Dioxus.
- **Plataforma prioritaria:** web.
- **Plataforma secundaria:** se conservará la posibilidad de escritorio cuando
  resulte razonable.
- **Primer experimento:** explorador de campos eléctricos, trasladado desde el
  prototipo Dioxus después de crear el esqueleto de la aplicación.
- **Separación:** matemática, modelo científico, proyección, interacción y
  representación deben poder evolucionar por separado.
- **Cálculo:** síncrono por defecto; se medirá antes de añadir concurrencia.
- **Unidades internas:** Sistema Internacional.
- **Teoría:** se mantendrá desacoplada de la simulación interactiva y deberá poder
  publicarse en web y descargarse, pero la herramienta editorial aún no está
  decidida.
- **Forma de trabajo:** tutoría adaptada a un nivel de programación medio-bajo,
  con implementación por parte de la IA solo cuando se pida explícitamente.

## Propuestas aún no confirmadas

- Creación futura de crates compartidas cuando dos experimentos demuestren una
  necesidad común real.
- Péndulo simple como segundo experimento para validar animación.
- Quarto como primera opción para teoría HTML/PDF y Typst para documentos que
  requieran una maquetación impresa más cuidada.
- Rutas `/laboratorio/`, `/teoria/` y `/descargas/` en una publicación futura.

Estas propuestas pueden discutirse o simplificarse. No deben tratarse como
tareas autorizadas por aparecer en el plan.

## Evidencia disponible

- Existe un explorador original en Rust y Macroquad.
- Existen prototipos comparables en C#, Go y varias alternativas Rust.
- La versión Dioxus conserva el modelo del explorador y funciona en navegador.
- Las pruebas comparativas anteriores no detectaron una diferencia de fluidez
  que desaconseje Dioxus para esta escena.
- La representación SVG agrupada es suficiente para el explorador actual.
- Dioxus ofrece la combinación elegida de web y posible escritorio dentro del
  mismo ecosistema Rust.
- El workspace usa Rust 2024 y Dioxus 0.7.10.
- `cargo check`, `cargo test` y Clippy sin avisos pasan para el destino web.
- La compilación WebAssembly y `trunk build --release` terminan correctamente.
- La portada se comprobó en navegador en formato de escritorio y a 390 × 844
  píxeles; el acceso interno al catálogo funciona.

Esta evidencia procede de los proyectos experimentales; se volverá a verificar
lo necesario al integrarlo en el laboratorio.

## Límites y riesgos conocidos

- Todavía no hay un segundo experimento que valide las abstracciones comunes.
- No se ha elegido ni probado el flujo editorial de teoría y PDF.
- No se ha probado entrada táctil en un dispositivo físico.
- No existe aún una simulación animada continua representativa del laboratorio.
- La comprobación de escritorio llega a las dependencias nativas, pero este
  equipo no tiene disponible `glib-2.0.pc`. Antes de compilar la aplicación de
  escritorio habrá que instalar los paquetes de desarrollo de GLib/GTK y
  WebKitGTK adecuados para su distribución Linux.

## Siguiente paso

Preparar la migración del explorador de campos eléctricos: inventariar su modelo,
pruebas y comportamiento observable antes de trasladar el núcleo científico a
Physia.

## Criterio para cerrar la fase 0

- [x] `AGENTS.md` adaptado al laboratorio.
- [x] `PLAN.md` separado del contrato.
- [x] `ESTADO.md` definido como fuente de verdad.
- [x] `README.md` inicial.
- [x] Guía de desarrollo con los 22 puntos y diagramas de funcionamiento.
- [x] Documentación revisada y aceptada por el usuario.

## Registro de sesiones

- **2026-10-20:** se decidió utilizar Dioxus para el laboratorio, con prioridad
  web y posibilidad de escritorio. Se separó el contrato estable de la hoja de
  ruta y del estado operativo. Se preparó la documentación inicial sin crear el
  workspace ni modificar los prototipos.
- **2026-10-20 (guía):** se añadió `docs/GUIA_DE_DESARROLLO.md` como documento
  de consulta con los 22 aspectos arquitectónicos, el flujo general entre teoría,
  laboratorio y plataformas, y la separación interna de un experimento. Se
  enlazó desde el contrato y el README sin convertirlo en una lista de tareas
  autorizadas.
- **2026-10-20 (inicio de Physia):** se confirmó el nombre Physia y la licencia
  MIT. Se creó el workspace mínimo con una sola aplicación Dioxus, una portada
  adaptable y el catálogo provisional. Se verificaron formato, compilación,
  pruebas, Clippy, WebAssembly, empaquetado de producción y navegación visual.
  La variante de escritorio queda condicionada a instalar GLib/GTK y WebKitGTK
  en el sistema de desarrollo.
- **2026-10-20 (entorno local):** se documentó la instalación de Trunk y de las
  dependencias de escritorio para Ubuntu 26.04, incluida la recarga del entorno
  de Cargo cuando una terminal aún no encuentra `trunk`.
- **2026-10-20 (guía de instalación):** se añadió
  `docs/INSTALACION_UBUNTU.md` con la preparación completa de un equipo nuevo,
  ejecución web y escritorio, verificaciones y resolución de fallos habituales.
- **2026-10-20 (herramienta de desarrollo):** se adoptó `dx` como interfaz
  principal para servir las variantes web y escritorio. Trunk queda documentado
  como alternativa específica para la web.
