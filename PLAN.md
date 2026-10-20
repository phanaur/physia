# Plan de desarrollo del laboratorio virtual

Última revisión: 2026-10-20

Este documento es una hoja de ruta revisable. No autoriza por sí solo a ejecutar
la siguiente fase. `ESTADO.md` indica la fase activa y prevalece cuando el plan
y la situación real difieren.

## Principios del plan

1. Proyecto nuevo para el laboratorio; los prototipos continúan como referencia.
2. Web como destino principal y escritorio como salida secundaria posible.
3. Rust y Dioxus para la aplicación interactiva.
4. Núcleos científicos independientes del framework y comprobables sin interfaz.
5. Un experimento terminado y verificable cada vez.
6. Abstracciones compartidas después de observar al menos dos necesidades reales.
7. Teoría extensa y generación de PDF desacopladas de la simulación.
8. Cálculo síncrono de partida; optimización guiada por perfiles.
9. Accesibilidad, unidades y reproducibilidad forman parte de la funcionalidad.

## Estructura inicial propuesta

Esta estructura se validará al crear el workspace; puede simplificarse si añade
fricción sin beneficio.

```text
physia/
├── Cargo.toml
├── Cargo.lock
├── AGENTS.md
├── README.md
├── ESTADO.md
├── PLAN.md
├── apps/
│   └── laboratorio/
├── crates/
│   ├── lab-core/
│   ├── lab-ui/
│   └── experimento-campos/
├── contenido/
├── docs/
└── tools/
```

No se crearán todos los directorios hasta que la fase correspondiente los
necesite. Tampoco se diseñará un sistema de plugins. El catálogo puede comenzar
como una lista estática y una selección explícita de componentes.

## Fase 0 — Contrato y preparación

### Objetivo

Crear la documentación mínima que permita trabajar con continuidad y distinguir
decisiones, plan y estado real.

### Trabajo

- Crear `AGENTS.md` adaptado al laboratorio y al nivel del usuario.
- Crear este plan revisable.
- Crear `ESTADO.md` como fuente de verdad.
- Crear un README inicial.
- Mantener intactos los prototipos existentes.

### Criterio de salida

- Los cuatro documentos existen y se enlazan entre sí.
- El estado señala un único siguiente paso.
- No se ha creado arquitectura de código antes de discutirla.

## Fase 1 — Workspace y aplicación mínima

### Objetivo

Obtener una aplicación Dioxus mínima que compile para web y permita comprobar la
viabilidad de escritorio sin contener todavía la simulación completa.

### Trabajo previsto

- Crear el workspace de Cargo.
- Crear `apps/laboratorio`.
- Añadir una portada mínima y una ruta de catálogo.
- Definir estilos globales pequeños.
- Configurar las características `web` y `desktop` con las mínimas diferencias.
- Documentar cómo ejecutar ambas salidas.

### Contenidos de aprendizaje

- Workspace y paquetes de Cargo.
- Diferencia entre crate de biblioteca y binario.
- Características de Cargo.
- Componente y estado básico en Dioxus.
- Ruta y composición de página.

### Criterio de salida

- `cargo test` pasa en los crates existentes.
- La compilación web termina y la portada se inspecciona en navegador.
- La salida de escritorio al menos compila; si se inspecciona una ventana, se
  registra por separado.
- El catálogo puede mostrar una ficha provisional para campos eléctricos.

## Fase 2 — Integrar el explorador de campos

### Objetivo

Convertir el prototipo Dioxus en el primer experimento del laboratorio sin cambiar
su modelo científico ni perder sus pruebas.

### Orden de migración

1. Trasladar matemática, física, proyección y geometría de visualización.
2. Ejecutar las pruebas originales.
3. Crear un estado de experimento independiente de Dioxus.
4. Separar la política de arrastre de los eventos de plataforma.
5. Convertir la interfaz en un componente montable.
6. Integrarlo en una ruta estable del laboratorio.
7. Comparar resultados con el prototipo.

### Funcionalidad mínima conservada

- dos cargas iniciales de signos opuestos;
- unidades SI;
- campo eléctrico total;
- radio y tratamiento interior del modelo original;
- cuadrícula y segmentos orientados;
- color logarítmico relativo;
- ejes y etiquetas;
- arrastre;
- diseño adaptable.

### Criterio de salida

- Las pruebas trasladadas pasan.
- Una comprobación de equivalencia cubre las escenas de referencia.
- Dibujo y arrastre se verifican en navegador.
- La ruta funciona sin convertir el experimento en el punto de entrada global.
- El prototipo original permanece intacto y se marca solo como referencia, no se
  elimina.

## Fase 3 — Marco común mínimo

### Objetivo

Extraer exclusivamente lo que el primer experimento y el esqueleto de la
aplicación ya demuestren que es compartido.

### Posibles piezas

- metadatos de catálogo;
- marco de página de experimento;
- botón de reinicio;
- panel y controles básicos;
- preferencias realmente globales;
- tratamiento común de errores;
- rutas estables hacia teoría y actividades.

### Límites

- Sin trait universal de simulación si no hay un segundo uso.
- Sin renderizador común.
- Sin carga dinámica de plugins.
- Sin sistema general de unidades hasta observar la necesidad.

### Criterio de salida

- Las piezas extraídas eliminan duplicación real.
- El experimento de campos continúa funcionando y sus pruebas pasan.
- Cada abstracción tiene al menos un uso actual y uno próximo claramente definido.

## Fase 4 — Segundo experimento: animación

### Objetivo

Validar la arquitectura con una simulación distinta. La propuesta inicial es un
péndulo simple, pero su elección debe confirmarse en `ESTADO.md`.

### Capacidades que debe probar

- tiempo de simulación separado del dibujo;
- integración con paso estable;
- iniciar, pausar, reanudar, avanzar y reiniciar;
- parámetros editables y validados;
- velocidad de simulación;
- gráfica de una magnitud frente al tiempo;
- escena reproducible.

### Criterio de salida

- Las propiedades físicas acordadas tienen pruebas.
- La simulación no depende de la frecuencia de refresco para su resultado.
- La interacción se verifica en web.
- Se revisa qué componentes son realmente compartidos con campos eléctricos.
- Se mide el coste antes de considerar workers o Canvas.

## Fase 5 — Primer recorrido vertical de teoría

### Objetivo

Publicar una unidad pequeña que conecte teoría, experimento, actividad y PDF.

### Decisiones pendientes

- herramienta editorial: Quarto, Typst u otra;
- fuente de fórmulas y metadatos compartidos;
- estructura de rutas;
- tema visual común;
- proceso local y de publicación.

### Trabajo previsto

- Crear una unidad breve, no todo el temario.
- Generar HTML y PDF.
- Enlazar una escena concreta del laboratorio.
- Añadir desde el experimento enlaces de vuelta a teoría y actividad.
- Comprobar legibilidad en pantalla y documento descargado.

### Criterio de salida

- El alumno puede recorrer teoría → actividad → experimento → teoría.
- El PDF se genera de forma reproducible.
- No se duplica manualmente contenido crítico sin una razón documentada.

## Fase 6 — Primer experimento de química

### Objetivo

Comprobar que la arquitectura no está sesgada exclusivamente hacia mecánica y
campos. La elección concreta debe definirse por su valor educativo.

### Capacidades a validar

- formularios y validación;
- unidades y conversiones;
- tablas o gráficas;
- estados discretos o equilibrio;
- explicación de límites del modelo;
- exportación solo si el experimento la necesita.

### Criterio de salida

- El experimento funciona sin forzarlo a abstracciones diseñadas para campos.
- Las piezas compartidas se revisan a partir de tres casos reales.
- Se documentan necesidades nuevas y deudas técnicas observadas.

## Fase 7 — Consolidación y publicación

Esta fase no debe adelantarse a los recorridos anteriores.

Posibles tareas:

- navegación y diseño definitivos;
- accesibilidad sistemática;
- pruebas entre navegadores y dispositivos reales;
- distribución de escritorio;
- automatización de compilación y despliegue;
- presupuesto de descarga y rendimiento;
- formato versionado para compartir escenas;
- política de compatibilidad y migraciones.

## Proceso para cambiar el plan

Cuando una fase cambie:

1. explica qué evidencia nueva lo aconseja;
2. conserva lo que siga siendo válido;
3. actualiza esta hoja de ruta;
4. registra en `ESTADO.md` la decisión vigente y el siguiente paso;
5. no reescribas el historial para fingir que la decisión siempre fue esa.

## Ideas aparcadas

No forman parte de la fase inicial:

- plugins dinámicos;
- cuentas o datos de alumnos;
- colaboración en tiempo real;
- aplicación móvil nativa;
- ECS;
- cálculo general en GPU;
- editor universal de experimentos;
- base de datos;
- exportación común a hojas de cálculo;
- catálogo completo de ESO y Bachillerato.
