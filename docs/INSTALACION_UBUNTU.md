# Preparar Physia en Ubuntu 26.04

Esta guía prepara un equipo nuevo para desarrollar y ejecutar Physia en web y
escritorio. Los comandos están pensados para Ubuntu 26.04 de 64 bits.

No ejecutes `cargo`, `rustup` ni `trunk` con `sudo`. Rust se instala para tu
usuario y guarda sus herramientas en `~/.cargo/bin`.

## 1. Instalar herramientas y bibliotecas del sistema

Abre una terminal y ejecuta:

```sh
sudo apt update
sudo apt install git curl ca-certificates build-essential pkg-config file wget \
  libssl-dev lld libxdo-dev libglib2.0-dev libgtk-3-dev \
  libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev
```

Estas bibliotecas cubren la compilación nativa, GTK, la vista web utilizada por
Dioxus Desktop, los indicadores del sistema y las dependencias que detecta
`pkg-config`.

Puedes comprobar las dos bibliotecas principales con:

```sh
pkg-config --modversion glib-2.0
pkg-config --modversion webkit2gtk-4.1
```

Ambos comandos deben imprimir una versión.

## 2. Instalar Rust

Si `rustup --version` ya funciona, pasa al siguiente apartado. En un equipo sin
Rust, utiliza el instalador oficial:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Elige la instalación estándar cuando el instalador lo pregunte. Después, cierra
y abre la terminal o carga el entorno en la terminal actual:

```sh
source ~/.cargo/env
```

Instala y selecciona Rust estable, sus herramientas de comprobación y el destino
WebAssembly:

```sh
rustup update stable
rustup default stable
rustup component add rustfmt clippy
rustup target add wasm32-unknown-unknown
```

Comprueba la instalación:

```sh
rustc --version
cargo --version
rustup target list --installed
```

La última salida debe incluir `wasm32-unknown-unknown`.

## 3. Instalar Trunk para la versión web

```sh
cargo install --locked trunk
hash -r
trunk --version
```

Si la terminal todavía dice que no encuentra `trunk`, vuelve a cargar el entorno:

```sh
source ~/.cargo/env
hash -r
trunk --version
```

También puedes comprobar directamente el ejecutable con:

```sh
~/.cargo/bin/trunk --version
```

## 4. Descargar Physia

Crea la carpeta de proyectos si todavía no existe y clona el repositorio:

```sh
mkdir -p ~/github
cd ~/github
git clone https://github.com/phanaur/physia.git
cd physia
```

Si el repositorio ya existe en el equipo, actualízalo en su lugar:

```sh
cd ~/github/physia
git pull --ff-only
```

## 5. Descargar y comprobar las dependencias Rust

Desde la raíz de Physia:

```sh
cd ~/github/physia
cargo fetch --locked
cargo fmt --check
cargo check --workspace --locked
cargo test --workspace --locked
cargo clippy --workspace --all-targets --locked -- -D warnings
```

La primera ejecución tarda más porque Cargo descarga y compila las dependencias.

## 6. Ejecutar la versión web

```sh
cd ~/github/physia/apps/physia
trunk serve --open
```

Trunk muestra en la terminal la dirección local. Si el navegador no se abre
automáticamente, abre la URL que indique, normalmente
`http://127.0.0.1:8080/`. Mantén esa terminal abierta mientras uses la web y
detén el servidor con `Ctrl+C`.

Para comprobar una compilación optimizada sin iniciar el servidor:

```sh
cd ~/github/physia/apps/physia
trunk build --release
```

El resultado se genera en `apps/physia/dist/` y no se guarda en Git.

## 7. Comprobar y ejecutar la versión de escritorio

Primero comprueba que el destino nativo compila:

```sh
cd ~/github/physia
cargo check --package physia --locked --no-default-features --features desktop
```

Después abre la aplicación:

```sh
cargo run --package physia --locked --no-default-features --features desktop
```

La primera compilación de escritorio puede tardar bastante. Las siguientes
reutilizan los artefactos guardados en `target/`.

## 8. Comprobación rápida de una instalación terminada

Estos comandos deben funcionar:

```sh
git --version
rustc --version
cargo --version
trunk --version
pkg-config --modversion glib-2.0
pkg-config --modversion webkit2gtk-4.1
```

Después deben abrirse las dos variantes:

```sh
cd ~/github/physia/apps/physia
trunk serve --open
```

Detén Trunk con `Ctrl+C` antes de ejecutar:

```sh
cd ~/github/physia
cargo run --package physia --locked --no-default-features --features desktop
```

## Problemas habituales

### `trunk: orden no encontrada`

```sh
source ~/.cargo/env
hash -r
~/.cargo/bin/trunk --version
```

Si el último comando tampoco existe, repite `cargo install --locked trunk`.

### Falta `glib-2.0.pc`

```sh
sudo apt install pkg-config libglib2.0-dev
pkg-config --modversion glib-2.0
```

### Falta WebKitGTK

```sh
sudo apt install libwebkit2gtk-4.1-dev
pkg-config --modversion webkit2gtk-4.1
```

### Cargo no encuentra el destino WebAssembly

```sh
rustup target add wasm32-unknown-unknown
```

### El puerto web está ocupado

Elige otro puerto:

```sh
cd ~/github/physia/apps/physia
trunk serve --open --port 8081
```

## Referencias

- [Instalación oficial de Rust](https://www.rust-lang.org/tools/install)
- [Instalación oficial de Trunk](https://trunk-rs.github.io/trunk/guide/getting-started/installation.html)
- [Preparación de Dioxus 0.7](https://dioxuslabs.com/learn/0.7/getting_started/)
