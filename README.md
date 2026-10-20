# Physia

Laboratorio virtual de física y química para ESO y Bachillerato, desarrollado
con Rust y Dioxus. La web es la plataforma principal y el proyecto conserva la
posibilidad de una distribución de escritorio.

Physia se encuentra en su primera fase. La aplicación contiene una portada y un
catálogo provisional; el explorador de campos eléctricos será el primer
experimento integrado.

## Documentación del proyecto

Antes de trabajar, lee:

1. [AGENTS.md](AGENTS.md): contrato de tutoría, permisos y criterios técnicos.
2. [ESTADO.md](ESTADO.md): fuente de verdad sobre la fase activa y el siguiente
   paso.
3. [PLAN.md](PLAN.md): hoja de ruta revisable.
4. [Guía de desarrollo](docs/GUIA_DE_DESARROLLO.md): arquitectura, migración,
   experimentos, teoría, pruebas y diagramas.

El plan y la guía no autorizan automáticamente sus siguientes tareas.

## Estructura actual

```text
physia/
├── apps/
│   └── physia/          aplicación Dioxus
├── docs/                documentación extensa
├── AGENTS.md
├── ESTADO.md
├── PLAN.md
├── Cargo.toml           workspace
└── LICENSE              MIT
```

Las crates compartidas se crearán cuando aparezca una necesidad real durante la
integración de experimentos.

## Ejecutar en la web

Requiere Rust, el objetivo WebAssembly y Trunk:

```sh
rustup target add wasm32-unknown-unknown
cargo install trunk --locked
cd apps/physia
trunk serve --open
```

También puede compilarse desde `apps/physia` con:

```sh
trunk build --release --locked
```

## Comprobar

Desde la raíz:

```sh
cargo fmt --check
cargo check --workspace --locked
cargo test --workspace --locked
cargo clippy --workspace --all-targets --locked -- -D warnings
```

Para comprobar específicamente la salida web:

```sh
cargo check --package physia --locked --target wasm32-unknown-unknown
```

La salida de escritorio se activa sin las características predeterminadas:

```sh
cargo check --package physia --locked --no-default-features --features desktop
```

Puede requerir paquetes de desarrollo de WebKitGTK y otras bibliotecas del
sistema en Linux. En el equipo usado para crear el repositorio, la comprobación
se detiene porque `pkg-config` no encuentra `glib-2.0.pc`; la versión web no se
ve afectada.

## Licencia

Physia se distribuye bajo la [licencia MIT](LICENSE).

## Prototipos de referencia

Las implementaciones anteriores del explorador de campos se mantienen en
repositorios separados. No son dependencias de Physia; el código validado se
trasladará de forma controlada y se comprobará su equivalencia.
