# Plan de desarrollo de Physia

Última revisión: 2026-11-07.

Ruta revisable, sin fecha de entrega. No autoriza tareas por sí sola: el alcance
activo está en ESTADO.md y en la petición actual del usuario.

## 1. Base de Vue y portada

En curso. Hecho: aplicación con TypeScript estricto y salida estática, portada
portada a Vue conservando identidad visual, texto y átomo decorativo, y `Vector2`
con sus pruebas trasladado. Pendiente: revisión completa de la portada en el
navegador, publicación en GitHub Pages y acordar la estructura de carpetas, el
enrutado y ESLint con accesibilidad (antes de la primera interfaz interactiva).

Cierre: tipos y construcción correctos, portada revisada en navegador, enlaces y
vista estrecha comprobados.

## 2. Matemática con tutoría

En curso. `Vector2` y sus pruebas están escritos. El usuario escribe cada pieza; la
IA revisa sin completar por adelantado. Añadir operaciones y pruebas con casos
concretos cuando se acuerde cada paso.

Cierre: operaciones acordadas comprendidas y comprobadas, sin dependencia de la
interfaz.

## 3. Modelo del primer experimento (4.º ESO)

En curso. Tema: composición de fuerzas de un punto material sobre un plano
horizontal. El alcance físico y de interacción está acordado en ESTADO.md. Falta
implementar el modelo con pruebas de casos conocidos y límites, empezando por la
resultante de una lista de fuerzas. Las decisiones científicas corresponden al
usuario.

## 4. Primera interacción

Conectar una escena acordada con coordenadas de pantalla, controles y dibujo.
Explicar props, eventos, `ref` y `computed` al necesitarlos. Elegir SVG o Canvas por
el problema concreto, sin un renderizador universal.

Cierre: ruta directa, arrastre y controles acordados, reinicio, teclado, vista
estrecha y salida y regreso sin recursos duplicados. No añadir dinámica todavía.

## 5. Primera unidad de teoría

Decidir antes el formato (Quarto independiente o Markdown dentro de la aplicación).
Crear una muestra breve cuando se autorice y comprobar atractivo visual, comodidad
de autoría y enlaces con el laboratorio. PDF con diseño propio si se necesita.

## 6. Completar el primer experimento

Completar únicamente el alcance educativo acordado. Validar cálculo e interacción.
Añadir gráficas si ayudan al aprendizaje, eligiendo biblioteca por necesidad. D3
es candidato, no obligación. No añadir partículas ni trayectorias por rutina.

## 7. Segundo experimento

Elegir necesidades distintas: animación, controles temporales o gráficas. Definir
paso físico, pausa, reinicio y política al ocultar la pestaña. Extraer componentes
compartidos solo cuando existan usos reales. Ampliar después química y materiales.

## 8. Consolidación

Medir accesibilidad, transferencia, inicio y respuesta con escenas representativas.
Evaluar automatización al necesitarla. PWA, modo sin conexión y escritorio son
opciones finales y renunciables.

## Aparcado

Explorador de campos eléctricos (Bachillerato). Ya están escritos la carga esférica
y el campo de una esfera en un punto. Se retoma en un bloque posterior de
Bachillerato.

## Principios transversales

- Modelo científico independiente de Vue y del dibujo; `number` y SI.
- Un experimento y un concepto de programación cada vez.
- Nombres y comentarios en inglés; interfaz y tutoría en español.
- Sin backend, servicios globales, workers o dependencias sin necesidad concreta.
