# Estado de Physia

Última actualización: 2026-11-07.

## Fase activa

Migración de Svelte a Vue, casi cerrada. En este repositorio nuevo ya están la base
de Vue, la portada y `Vector2` con sus pruebas. Falta la revisión completa de la
portada en el navegador (secciones inferiores, teclado y vista estrecha). Todavía no
hay estructura de carpetas definitiva ni enrutador. El primer experimento es la
composición de fuerzas (4.º ESO). Su alcance físico y de interacción está acordado
(ver «Primer experimento»); todavía no hay código del modelo.

## Decisiones confirmadas

- Stack (2026-11-07): TypeScript, Vue 3 con Composition API (`<script setup>`) y
  Vite, aplicación estática sin backend. Sustituye a Svelte y SvelteKit
  (decididos el 2026-11-02). Revisión el día 14 del registro del usuario, que
  vive fuera del repositorio.
- Alojamiento: GitHub Pages (2026-11-07), en `https://phanaur.github.io/physia/`
  (`base: '/physia/'` en Vite). El logo se enlaza con `import.meta.env.BASE_URL`.
- Paleta (2026-11-07): tema oscuro con base azul pizarra `#0f1724` y menta
  `#51d9b0` como acento, sin cambios en la menta. Texto pequeño de 13 px como
  mínimo y contraste de al menos 6:1 en los grises de apoyo. Los colores sólidos
  son variables CSS por función en `:root` de `src/app.css`; los translúcidos
  (`rgba`) siguen escritos a mano y hay que actualizarlos a la vez si cambian
  la base o la menta.
- Entorno (2026-11-07): Node 26.13.0 (LTS) y npm 11.20.0 con nvm, fijados en
  `.nvmrc`, `engines` y `packageManager`. No se usa el Node de `apt`: no ejecuta
  TypeScript directamente y `npm test` falla. Procedimiento en el README.
- Versiones exactas en `package.json`. TypeScript queda en 6.0.3 aunque existe la
  7.0.2, porque no está comprobado que `vue-tsc` funcione con ella.
- Web principal; PWA y escritorio son posibilidades finales y renunciables.
- Modelo independiente de Vue y del dibujo; `number` de doble precisión y SI.
- Código y comentarios en inglés; tutoría, documentación e interfaz en español.
- Sin cuaderno de sesiones (descartado el 2026-11-07).
- El usuario escribe las piezas científicas con tutoría. No completar por
  adelantado. Solo delegó la ampliación de las pruebas de `Vector2`; eso no
  autoriza futuras piezas.
- Primer experimento (2026-11-07): composición de fuerzas, de 4.º ESO. El campo
  eléctrico no está en 4.º ESO, así que el explorador de campos queda aparcado
  para un bloque posterior de Bachillerato (ver «Aparcado»).
- `Vector2`: el constructor exige componentes finitas y lanza `RangeError` ante
  valores no finitos. `multiply` y `divide` exigen escalares finitos y `divide`
  rechaza cero. `multiply` con factor 0 o -0 devuelve una nueva instancia con
  componentes +0, +0; eso no implica eliminar ceros negativos en otras operaciones.

## Primer experimento: composición de fuerzas (4.º ESO)

Tema y alcance acordados el 2026-11-07. Sin código del modelo todavía.

Confirmado por el usuario:

- Cuerpo: punto material rígido, sin momentos, dibujado como una caja de medidas
  fijas con las fuerzas aplicadas en el centro de masas (intersección de las
  diagonales). Escena inicial: caja sobre un plano horizontal con peso y normal.
- Sistema de referencia: x hacia la derecha, y hacia arriba, ángulos antihorarios
  desde +x, unidades SI. El signo pertenece a los datos del sistema de referencia y
  no a las ecuaciones: `g = Vector2(0, -9.81)` y la normal saliente de la superficie
  `n̂ = (0, 1)` son datos de la escena que se pasan al modelo. Sin clase de «sistema
  de referencia».
- Ecuaciones en forma vectorial: `P = m·g`, `R = ΣF`, `a = R/m`. Con S la suma de
  las demás fuerzas (peso y aplicadas), la normal es `N = max(0, -(S·n̂))` y la
  calcula el modelo. Si S·n̂ < 0 la normal compensa; si S·n̂ >= 0, N = 0, y con
  S·n̂ > 0 la caja se despegaría.
- La caja no tiene velocidad ni se moverá. La aceleración es un dato que se muestra
  (`a = R/m`), sin animación.
- Límites, como constantes con nombre en un único sitio y separadas por origen
  (experimento, interacción, dibujo): masa de 1 a 5 kg en saltos de 1 kg (peso
  máximo 49,05 N, siempre con 2 decimales), componentes de ±50 N, hasta 4 fuerzas
  añadidas.
- Fuerza añadida: aparece con longitud y orientación por defecto. Se modifica
  arrastrando la punta de la flecha, con cuantización de 0,5 N, o editando sus
  componentes en el panel, con hasta 2 decimales. Escala fija.
- Panel: sección de peso y normal de solo lectura; registro de las fuerzas añadidas
  con componentes, módulo y ángulo, con opción de quitar una concreta; sección de
  la resultante con componentes, módulo, ángulo y aceleraciones.
- Leyenda con tres casillas: peso y normal, fuerzas aplicadas (si están ocultas no
  se modifican) y resultante. La resultante tiene color propio y no es modificable.
- Equilibrio: «Equilibrio en el eje horizontal», «Equilibrio en el eje vertical» y
  «¡Equilibrio completo!».
- Sin construcción gráfica de la resultante (paralelogramo o punta con cola) en
  este experimento. Queda como idea para otro, no como compromiso.
- Rozamiento (más adelante, opcional): casilla que lo activa, con μₛ >= μ_d. Solo
  aparece si hay componente horizontal no nula y N > 0. Estático hasta μₛ·N y luego
  μ_d·N, opuesto a la componente horizontal de las demás fuerzas. Se dibuja en los
  extremos inferiores de la caja.

Propuesto, sin confirmar:

- Equilibrio con tolerancia: una componente de la resultante está en equilibrio si,
  redondeada a centésimas, vale 0,00.
- Anunciar los mensajes de equilibrio con una región de estado (`role="status"`),
  distinguir la resultante también por trazo y etiqueta (no solo por color) y no
  usar animación.

Pendiente de decidir:

- Valor y orientación por defecto de una fuerza nueva, evitando que las flechas se
  solapen.
- Si «¡Equilibrio completo!» se muestra también en la escena inicial.
- Estructura de carpetas del modelo. Provisional: `src/lib/physics/forces.ts` y
  `forces.test.ts`, junto a `src/lib/mathematics/`.

## Aparcado: explorador de campos (Bachillerato)

Decidido el 2026-11-07. Se retoma en un bloque posterior de Bachillerato. Su código
(`SphericalCharge` y `electricFieldAtPoint`) no se ha trasladado a este repositorio:
queda en el repositorio anterior. Las decisiones siguen vigentes:

- Esferas conductoras idealizadas con carga superficial uniforme en equilibrio
  electrostático. El usuario descarta la esfera aislante con densidad volumétrica
  uniforme para este alcance educativo. Contribución propia cero para r <= R y
  Coulomb para r > R.
- `SphericalCharge`: `charge`, `radius` y `position` son `readonly`. La carga es
  finita y puede ser cero, el radio es finito y positivo y la posición debe ser
  instancia de `Vector2`. El cálculo del campo va fuera de la clase.
- `electricFieldAtPoint(source, point)`: devuelve `Vector2 | null`. Usa el literal
  k = 8.987551787368176e9 en SI, cero para r <= R y Coulomb fuera. Devuelve `null`
  si `normalize` no obtiene dirección; las demás operaciones conservan sus
  excepciones. No es una política universal de errores.
- Al retomarlo: revisar el contrato `Vector2 | null` y acordar su cobertura
  permanente.

## Sin cerrar

- Teoría extensa: Quarto independiente según una decisión previa, sin crear. El
  usuario ha preguntado por alternativas, como Markdown dentro de la propia
  aplicación. Sin decidir.
- Enrutador y estructura de carpetas.
- Rutas profundas en GitHub Pages (enrutado con `#`, `404.html` o prerenderizado).
- ESLint con reglas de accesibilidad.
- Convivencia de las clases del modelo con la reactividad de Vue.

## Implementado

- Base de Vue con Vite y TypeScript estricto (`vue-tsc`), con scripts `dev`,
  `check`, `test`, `build` y `preview`.
- Portada en un único componente (`src/App.vue`) con el CSS global de `src/app.css`:
  diseño oscuro, logo SVG, átomo decorativo de litio y catálogo informativo. Las
  tarjetas no abren experimentos. La tarjeta del campo eléctrico sigue como
  «Primer experimento» y hay que cambiarla al elegir el tema de 4.º ESO.
- `Vector2` (`x` e `y` `readonly`; `add`, `subtract`, `multiply`, `divide`, `dot`,
  `lengthSquared`, `length` y `normalize`), con 27 pruebas con `node:test`. Es copia
  exacta de la base anterior.

## Última comprobación

2026-11-07, con Node 26.13.0 y npm 11.20.0, sobre el código final con la paleta
nueva: `npm run build` (incluye la comprobación de tipos) y `npm test` correctos,
con 27 de 27 pruebas. El usuario revisó la portada en el navegador y funciona como
se espera. Sin revisar: teclado y foco visible.

## Siguiente paso

1. Terminar la revisión de la portada en el navegador (secciones inferiores,
   teclado, foco visible, enlaces con `#` y vista estrecha).
2. Primera pieza del modelo, que escribe el usuario con tutoría: la resultante de
   una lista de fuerzas (`Vector2` en newtons; lista vacía da el vector cero), con
   pruebas de 3 N y 4 N perpendiculares (5 N), fuerzas iguales y opuestas (cero) y
   lista vacía. Después, una pieza por paso: peso, normal y aceleración.
3. Antes de la primera interfaz interactiva: decidir enrutador, estructura de
   carpetas y ESLint con accesibilidad.
4. Al tener el experimento, cambiar la tarjeta del catálogo de la portada.

No implementar el modelo del experimento ni la interfaz sin petición.
