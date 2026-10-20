//! Punto de entrada de Physia.
//!
//! Esta primera versión solo establece la identidad visual, la portada y el
//! catálogo. Los modelos científicos se incorporarán en crates independientes
//! cuando comience la migración del primer experimento.

use dioxus::prelude::*;

const CSS: &str = include_str!("../assets/style.css");

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    rsx! {
        style { "{CSS}" }
        div { class: "site-shell",
            header { class: "topbar",
                a { class: "brand", href: "#inicio",
                    span { class: "brand-mark", "φ" }
                    span { "Physia" }
                }
                nav { aria_label: "Navegación principal",
                    a { href: "#experimentos", "Experimentos" }
                    a { href: "#proyecto", "Proyecto" }
                }
            }

            main {
                section { id: "inicio", class: "hero",
                    div { class: "hero-copy",
                        p { class: "eyebrow", "Laboratorio virtual de física y química" }
                        h1 { "Experimenta, observa y comprende." }
                        p { class: "hero-text",
                            "Simulaciones interactivas para explorar fenómenos de ESO y Bachillerato con modelos claros, unidades explícitas y resultados reproducibles."
                        }
                        a { class: "primary-action", href: "#experimentos", "Ver experimentos" }
                    }
                    div { class: "hero-visual", aria_hidden: "true",
                        div { class: "orbit orbit-one" }
                        div { class: "orbit orbit-two" }
                        div { class: "particle particle-a" }
                        div { class: "particle particle-b" }
                        div { class: "particle particle-c" }
                    }
                }

                section { id: "experimentos", class: "section experiments",
                    div { class: "section-heading",
                        p { class: "eyebrow", "Catálogo" }
                        h2 { "Primeros experimentos" }
                        p { "El catálogo crecerá de forma gradual. Cada experimento tendrá un modelo comprobado y un propósito educativo definido." }
                    }
                    div { class: "experiment-grid",
                        article { class: "experiment-card",
                            div { class: "card-symbol electric", "E" }
                            div { class: "card-copy",
                                p { class: "card-kicker", "Electricidad · En preparación" }
                                h3 { "Explorador de campos eléctricos" }
                                p { "Visualización del campo producido por cargas puntuales, con arrastre, ejes, unidades y escala logarítmica de intensidad." }
                            }
                            span { class: "status", "Primer experimento" }
                        }
                        article { class: "experiment-card placeholder",
                            div { class: "card-symbol mechanics", "t" }
                            div { class: "card-copy",
                                p { class: "card-kicker", "Siguiente familia" }
                                h3 { "Simulación animada" }
                                p { "Servirá para validar tiempo físico, pausa, reinicio, parámetros y representación de datos." }
                            }
                            span { class: "status", "Por decidir" }
                        }
                    }
                }

                section { id: "proyecto", class: "section principles",
                    div {
                        p { class: "eyebrow", "Principios" }
                        h2 { "Una base científica que pueda crecer." }
                    }
                    ul {
                        li { strong { "Modelos separados" } span { "La física y la química se comprueban sin depender de la interfaz." } }
                        li { strong { "Unidades visibles" } span { "El Sistema Internacional es la referencia interna de los experimentos." } }
                        li { strong { "Web primero" } span { "La experiencia principal funciona en el navegador y mantiene abierta la salida de escritorio." } }
                    }
                }
            }

            footer {
                span { "Physia" }
                span { "Proyecto educativo en Rust y Dioxus" }
            }
        }
    }
}
