<script setup lang="ts">
// BASE_URL is '/physia/' on GitHub Pages; files in public/ are served from it.
const logoUrl = `${import.meta.env.BASE_URL}logo.svg`;
</script>

<template>
    <div class="site-shell">
        <header class="topbar">
            <a class="brand" href="#inicio">
                <img class="brand-mark" :src="logoUrl" alt="" width="44" height="44" />
                <span>Physia</span>
            </a>
            <nav aria-label="Navegación principal">
                <a href="#experimentos">Experimentos</a>
                <a href="#proyecto">Proyecto</a>
            </nav>
        </header>

        <main>
            <section id="inicio" class="hero">
                <div class="hero-copy">
                    <p class="eyebrow">Laboratorio virtual de física y química</p>
                    <h1>Experimenta, observa y comprende.</h1>
                    <p class="hero-text">Simulaciones interactivas para explorar fenómenos de ESO y Bachillerato con modelos claros, unidades explícitas y resultados reproducibles.</p>
                    <a class="primary-action" href="#experimentos">Ver experimentos</a>
                </div>
                <div class="hero-visual" aria-hidden="true">
                    <svg class="atom-illustration" viewBox="0 0 480 480" focusable="false">
                        <defs>
                            <radialGradient id="atom-proton-shading" cx="30%" cy="25%" r="75%">
                                <stop offset="0" stop-color="#ffd8d0" />
                                <stop offset="0.4" stop-color="#fa6e67" />
                                <stop offset="1" stop-color="#843e49" />
                            </radialGradient>
                            <radialGradient id="atom-neutron-shading" cx="30%" cy="25%" r="75%">
                                <stop offset="0" stop-color="#d4e9ff" />
                                <stop offset="0.4" stop-color="#79aaff" />
                                <stop offset="1" stop-color="#304c7a" />
                            </radialGradient>
                            <radialGradient id="atom-nucleus-glow">
                                <stop offset="0" stop-color="#51d9b0" stop-opacity="0.16" />
                                <stop offset="1" stop-color="#51d9b0" stop-opacity="0" />
                            </radialGradient>
                        </defs>
                        <!-- Equal ellipses, rotated 60 degrees apart, form the six-pointed silhouette. -->
                        <!-- Each electron shares its orbit's coordinates and rotation. -->
                        <g class="orbital-system">
                            <ellipse class="orbit" cx="240" cy="240" rx="184" ry="64" />
                            <circle class="particle particle-white" cx="56" cy="240" r="6" />
                        </g>
                        <g class="orbital-system orbital-system-blue" transform="rotate(-60 240 240)">
                            <ellipse class="orbit" cx="240" cy="240" rx="184" ry="64" />
                            <circle class="particle" cx="424" cy="240" r="6" />
                        </g>
                        <g class="orbital-system orbital-system-red" transform="rotate(60 240 240)">
                            <ellipse class="orbit" cx="240" cy="240" rx="184" ry="64" />
                            <circle class="particle" cx="424" cy="240" r="6" />
                        </g>
                        <g class="atom-nucleus">
                            <circle cx="240" cy="240" r="48" fill="url(#atom-nucleus-glow)" />
                            <circle class="nucleon" cx="239" cy="220" r="12" fill="url(#atom-neutron-shading)" />
                            <circle class="nucleon" cx="222" cy="231" r="12" fill="url(#atom-neutron-shading)" />
                            <circle class="nucleon" cx="259" cy="232" r="12" fill="url(#atom-neutron-shading)" />
                            <circle class="nucleon" cx="240" cy="257" r="12" fill="url(#atom-neutron-shading)" />
                            <circle class="nucleon" cx="226" cy="246" r="12" fill="url(#atom-proton-shading)" />
                            <circle class="nucleon" cx="254" cy="246" r="12" fill="url(#atom-proton-shading)" />
                            <circle class="nucleon" cx="240" cy="235" r="12" fill="url(#atom-proton-shading)" />
                        </g>
                    </svg>
                </div>
            </section>

            <section id="experimentos" class="section experiments">
                <div class="section-heading">
                    <p class="eyebrow">Catálogo</p>
                    <h2>Primeros experimentos</h2>
                    <p>El catálogo crecerá de forma gradual. Cada experimento tendrá un modelo comprobado y un propósito educativo definido.</p>
                </div>
                <div class="experiment-grid">
                    <article class="experiment-card">
                        <div class="card-symbol electric">E</div>
                        <div class="card-copy">
                            <p class="card-kicker">Electricidad · En preparación</p>
                            <h3>Explorador de campos eléctricos</h3>
                            <p>Visualización del campo producido por cargas puntuales, con arrastre, ejes, unidades y escala logarítmica de intensidad.</p>
                        </div>
                        <span class="status">Primer experimento</span>
                    </article>
                    <article class="experiment-card placeholder">
                        <div class="card-symbol mechanics">t</div>
                        <div class="card-copy">
                            <p class="card-kicker">Siguiente familia</p>
                            <h3>Simulación animada</h3>
                            <p>Servirá para validar tiempo físico, pausa, reinicio, parámetros y representación de datos.</p>
                        </div>
                        <span class="status">Por decidir</span>
                    </article>
                </div>
            </section>

            <section id="proyecto" class="section principles">
                <div>
                    <p class="eyebrow">Principios</p>
                    <h2>Una base científica que pueda crecer.</h2>
                </div>
                <ul>
                    <li>
                        <strong>Modelos separados</strong>
                        <span>La física y la química se comprueban sin depender de la interfaz.</span>
                    </li>
                    <li>
                        <strong>Unidades visibles</strong>
                        <span>El Sistema Internacional es la referencia interna de los experimentos.</span>
                    </li>
                    <li>
                        <strong>Web primero</strong>
                        <span>La experiencia principal funciona en el navegador y mantiene abierta la salida de escritorio.</span>
                    </li>
                </ul>
            </section>
        </main>

        <footer>
            <span>Physia</span>
            <span>Laboratorio virtual de física y química</span>
        </footer>
    </div>
</template>
