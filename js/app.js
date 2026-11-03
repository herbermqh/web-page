// ==========================================================================
// HEBER MQ — Datos Nativos (Libros, Curso LaTeX 27 Módulos, Proyectos,
// Puntos de Venta en Bolivia y Pasarela Hotmart Integrada)
// ==========================================================================
const CURRENCY_RATES = {
  USD: { symbol: 'USD $', rate: 1, decimals: 2, label: 'Dólares (USD)' },
  BOB: { symbol: 'Bs ', rate: 6.96, decimals: 0, label: 'Bolivianos (BOB)' },
  PEN: { symbol: 'S/ ', rate: 3.75, decimals: 0, label: 'Soles (PEN)' },
  MXN: { symbol: 'MXN $', rate: 18.2, decimals: 0, label: 'Pesos (MXN)' },
  COP: { symbol: 'COP $', rate: 4100, decimals: 0, label: 'Pesos (COP)' },
  CLP: { symbol: 'CLP $', rate: 940, decimals: 0, label: 'Pesos (CLP)' },
  EUR: { symbol: '€', rate: 0.92, decimals: 2, label: 'Euros (EUR)' }
};
let currentCurrency = 'USD';
let activeSyllabusCategory = 'all';
let syllabusSearchQuery = '';
let activeProjectFilter = 'all';
let activeCityFilter = 'all';
let selectedPointId = 'pangea';
let activeCheckoutProduct = 'libro-latex';
let activePaymentMethod = 'hotmart-embed';
let appliedCoupon = '';
// 19 Capítulos reales del libro "El Arte de Editar en LaTeX" (639 páginas)
const BOOK_LATEX_CHAPTERS = [
  { num: 1, title: 'Introducción a LaTeX', pages: 'Págs. 1–19', topics: '¿Qué es LaTeX?, Editores de texto y expresiones matemáticas, Compilación, Preámbulo y cuerpo del documento, Paquetes esenciales.' },
  { num: 2, title: 'Macros LaTeX', pages: 'Págs. 20–31', topics: 'Nombres y tipos de comandos, Definir nuevos comandos (\\newcommand), Definir nuevos entornos (\\newenvironment), Redefinir comandos y manejo de longitudes.' },
  { num: 3, title: 'Estructura de un Documento', pages: 'Págs. 32–71', topics: 'Clases estándares (book, report, article), Secciones, Formato de chapter y section con fncychap y titlesec, Tabla de contenidos y referencias cruzadas.' },
  { num: 4, title: 'Herramientas de Formato', pages: 'Págs. 72–107', topics: 'Notas en el margen, Teoremas y demostraciones con el paquete amsthm, Texto tipo pantalla y entornos verbatim.' },
  { num: 5, title: 'Diseño de Página', pages: 'Págs. 108–137', topics: 'Geometría de página, Márgenes editoriales, Numeración de páginas, Marcadores PDF y estilos de cabecera/pie con fancyhdr.' },
  { num: 6, title: 'Tablas Científicas y Multipágina', pages: 'Págs. 138–161', topics: 'Entornos estándares, Referencia cruzada, Paquetes tabularx y tabulary, Tablas de varias páginas (longtable), Tablas a colores y celdas combinadas (multirow/multicolumn).' },
  { num: 7, title: 'Objetos Flotantes (Flotadores)', pages: 'Págs. 162–184', topics: 'Propiedades y posicionamiento de figuras y tablas, Subfiguras, Personalización de leyendas y paquete float.' },
  { num: 8, title: 'Fuentes y Tipografías', pages: 'Págs. 185–218', topics: 'Familias tipográficas en LaTeX, Codificación de fuentes, Fuentes matemáticas y compilación con XeLaTeX / LuaLaTeX.' },
  { num: 9, title: 'Modo Matemático Completo', pages: 'Págs. 219–278', topics: 'Ecuaciones en línea y numeradas, Matrices, Sistemas de ecuaciones, Operadores personalizados y paquete mathtools.' },
  { num: 10, title: 'Uso de Figuras e Introducción a TikZ', pages: 'Págs. 279–314', topics: 'Inserción con graphicx, Coordenadas, Nodos, Trazados geométricos y diagramas científicos con TikZ.' },
  { num: 11, title: 'Generación Avanzada de Figuras', pages: 'Págs. 315–354', topics: 'Gráficas de funciones 2D/3D con pgfplots, Curvas paramétricas y diagramas de física e ingeniería.' },
  { num: 12, title: 'Cajas Estilizadas con Tcolorbox', pages: 'Págs. 355–396', topics: 'Creación de cajas editoriales para teoremas, definiciones, ejemplos resueltos y advertencias con numeración automática.' },
  { num: 13, title: 'Gráficos Vectoriales con Asymptote', pages: 'Págs. 397–432', topics: 'Lenguaje Asymptote integrado en LaTeX para geometría espacial 3D y superficies matemáticas.' },
  { num: 14, title: 'Índice Analítico y Bibliografía', pages: 'Págs. 433–474', topics: 'Generación de índice alfabético (makeidx/imakeidx), Esquemas numéricos y autor-año con BibTeX y BibLaTeX.' },
  { num: 15, title: 'Paquetes y Clases (.sty y .cls)', pages: 'Págs. 475–516', topics: 'Arquitectura interna de un paquete, Paso de opciones con kvoptions y modularización de estilos.' },
  { num: 16, title: 'Construcción de Documentclass', pages: 'Págs. 517–554', topics: 'Diseño de una clase propia desde cero basada en book.cls con portadas y cabeceras personalizadas.' },
  { num: 17, title: 'Programación TeX de Bajo Nivel', pages: 'Págs. 555–588', topics: 'Primitivas de TeX (\\def, \\edef, \\expandafter, \\csname), Registros, Cajas y condicionales.' },
  { num: 18, title: 'LaTeX Avanzado y Automatización', pages: 'Págs. 589–614', topics: 'Gestión de proyectos de más de 1,000 páginas, Compilación selectiva y optimización de tiempos.' },
  { num: 19, title: 'Análisis de Clases Estándares', pages: 'Págs. 615–639', topics: 'Inspección línea por línea del código fuente de article.cls, report.cls y book.cls.' }
];
// 27 Módulos reales del Curso LaTeX Avanzado (extraídos del Google Sites oficial)
const COURSE_MODULES = [
  { id: 1, category: 'fundamentos', title: 'Distribuciones TeX', badge: 'Configuración', detail: 'Instalación y configuración profesional de TeX Live, MiKTeX, MacTeX y flujos de trabajo en la nube con Overleaf.' },
  { id: 2, category: 'fundamentos', title: 'Editores LaTeX de Alto Rendimiento', badge: 'Entorno', detail: 'Configuración de TeXstudio y Visual Studio Code con LaTeX Workshop, atajos de teclado y previsualización inversa SyncTeX.' },
  { id: 3, category: 'fundamentos', title: 'De LaTeX Básico hacia LaTeX Avanzado', badge: 'Base Sólida', detail: 'Comandos y entornos, estructura de documento, clases, paquetes, secciones, tabla de contenido, referencias cruzadas, formato de texto, notas al margen, listas y columnas.' },
  { id: 4, category: 'fundamentos', title: 'Macros LaTeX Profesionales', badge: 'Automatización', detail: 'Creación de nuevos comandos con argumentos opcionales, nuevos entornos, manejo de contadores automáticos y aritmética de longitudes.' },
  { id: 5, category: 'fundamentos', title: 'Gestión de Libros de +1,000 Páginas', badge: 'Proyectos Grandes', detail: 'Arquitectura modular con \\include, \\includeonly y \\input para compilar capítulos individuales en segundos sin perder referencias.' },
  { id: 6, category: 'fundamentos', title: 'Cómo Estructurar un Libro (Tips y Trucos)', badge: 'Editorial', detail: 'Organización de preliminares (frontmatter), cuerpo principal (mainmatter), apéndices y epílogo (backmatter) con estándar internacional.' },
  { id: 7, category: 'editorial', title: 'Uso Avanzado del Paquete TikZ', badge: 'Ilustración', detail: 'Dibujo vectorial nativo para esquemas de física, geometría, diagramas de flujo y portadas decorativas.' },
  { id: 8, category: 'editorial', title: 'Dominio del Paquete tcolorbox', badge: 'Diseño Visual', detail: 'Cajas multipágina rompibles (breakable), sombras, pieles (skins) y cabeceras superpuestas para libros modernos.' },
  { id: 9, category: 'editorial', title: 'Personalización de Estilo de Secciones (Chapter)', badge: 'Maquetación', detail: 'Rediseño completo de aperturas de capítulo (\\chapter), secciones y subsecciones con títulos gráficos y numeración estilizada.' },
  { id: 10, category: 'editorial', title: 'Personalización de la Tabla de Contenido', badge: 'Navegación', detail: 'Diseño de índices generales con mini-índices por capítulo (minitoc/titletoc), estilos de puntos y colores por nivel.' },
  { id: 11, category: 'editorial', title: 'Tipografías y Fuentes Científicas', badge: 'Tipografía', detail: 'Combinación de fuentes serif, sans-serif y monoespaciadas con fuentes matemáticas dedicadas en pdfLaTeX, XeLaTeX y LuaLaTeX.' },
  { id: 12, category: 'editorial', title: 'Diseño de Notas en el Margen', badge: 'Layout Académico', detail: 'Implementación de márgenes anchos estilo libros universitarios (sidenotes, marginnote) para apostillas, biografías y micro-gráficos.' },
  { id: 13, category: 'editorial', title: 'Diseño y Personalización de Listas', badge: 'Estructura', detail: 'Control total de espaciado, viñetas vectoriales y numeraciones personalizadas mediante enumitem.' },
  { id: 14, category: 'editorial', title: 'Cajas Estilizadas para Teoremas, Definiciones y Ejemplos', badge: 'Matemáticas', detail: 'Integración de amsthm + tcolorbox + thmtools para entornos matemáticos numerados por capítulo y listables al final del libro.' },
  { id: 15, category: 'editorial', title: 'Formato de Texto Tipo Pantalla para Libros de Informática', badge: 'Código Fuente', detail: 'Maquetación de bloques de código, terminales interactivas y resaltado de sintaxis con listings y minted.' },
  { id: 16, category: 'editorial', title: 'Diseño de Página y Estilos Propios', badge: 'Geometría', detail: 'Cálculo de caja tipográfica, sangrías, márgenes simétricos/asimétricos para imprenta y encabezados dinámicos.' },
  { id: 17, category: 'graficos', title: 'Tablas Avanzadas de Calidad Publicación', badge: 'Datos', detail: 'Diseño de tablas limpias con booktabs, tablas extensas multipágina, color por filas alternas y alineación decimal.' },
  { id: 18, category: 'graficos', title: 'Personalización de Flotadores (Tablas y Figuras)', badge: 'Composición', detail: 'Control fino de etiquetas, leyendas personalizadas con el paquete caption y envoltura de texto.' },
  { id: 19, category: 'graficos', title: 'Figuras y Tablas Situadas en el Margen', badge: 'Estilo Tufte/BYU', detail: 'Ubicación de ilustraciones y tablas auxiliares directamente en la columna marginal sin interrumpir la lectura.' },
  { id: 20, category: 'graficos', title: 'Expresiones Matemáticas Complejas', badge: 'Fórmulas', detail: 'Alineación multipaso, subecuaciones, tensores, delimitadores escalables y matrices particionadas.' },
  { id: 21, category: 'graficos', title: 'Generación de Gráficas con Paquetes y Programas Externos', badge: 'Visualización', detail: 'Trazado de datos reales y funciones analíticas con pgfplots, Asymptote y exportación vectorial desde GeoGebra/MATLAB.' },
  { id: 22, category: 'graficos', title: 'Índices Analíticos y Bibliografía Científica', badge: 'Referencias', detail: 'Gestión bibliográfica avanzada con BibLaTeX/Biber (APA 7, IEEE, Vancouver) e índices analíticos multinivel.' },
  { id: 23, category: 'clases', title: 'Introducción a la Creación de Clases (.cls) y Paquetes (.sty)', badge: 'Arquitectura TeX', detail: 'Estructura de archivos .sty y .cls, \\NeedsTeXFormat, \\ProvidesClass, \\DeclareOption y \\ProcessOptions.' },
  { id: 24, category: 'clases', title: 'Macros TeX de Bajo Nivel', badge: 'Núcleo TeX', detail: 'Programación con primitivas de Donald Knuth: expansión de tokens, registros de longitud/caja y condicionales.' },
  { id: 25, category: 'clases', title: 'Creación de Clases o Plantillas Personalizadas Propias', badge: 'Autoría', detail: 'Desarrollo paso a paso de tu propia plantilla institucional o editorial lista para distribuir.' },
  { id: 26, category: 'clases', title: 'Análisis de Clases Estándares (book, report, article)', badge: 'Ingeniería Inversa', detail: 'Lectura técnica del código interno de las clases base de LaTeX para saber exactamente qué comando redefinir.' },
  { id: 27, category: 'clases', title: 'Análisis de Maquetación de Libros Comerciales (McGraw-Hill, Pearson)', badge: 'Proyecto Final', detail: 'Deconstrucción y réplica en LaTeX del diseño real de editoriales internacionales (Cengage, Pearson, McGraw-Hill).' }
];
// Proyectos y Plantillas reales de Heber MQ (Google Sites proyectos-latex + GitHub)
const LATEX_PROJECTS = [
  {
    id: 'artbook',
    category: 'plantilla',
    title: 'Plantilla Editorial artbook',
    subtitle: 'Incluida como Bonus en el Libro y Curso LaTeX',
    tags: ['Libros +1000 págs', 'tcolorbox', 'TikZ', 'Lista para imprenta'],
    desc: 'Plantilla completa diseñada por Heber MQ para la redacción de libros de ciencias e ingeniería con aperturas de capítulo estilizadas, entornos de teoremas en cajas a color y diseño comercial.',
    repoUrl: 'https://pay.hotmart.com/L77490587I',
    actionLabel: 'Incluida con el Libro / Curso',
    isIncluded: true,
    codePreview: `\\documentclass[11pt,twoside]{artbook}\n\\usepackage[palette=ocean]{nexus}\n\\begin{document}\n\\chapter{Cinemática Vectorial}\n\\begin{teorema}[Conservación de Energía]\n  En todo sistema aislado, la energía mecánica total permanece constante:\n  \\[ E_m = K + U = \\frac{1}{2}mv^2 + mgh = \\text{cte.} \\]\n\\end{teorema}\n\\end{document}`
  },
  {
    id: 'artapa7',
    category: 'plantilla',
    title: 'Plantilla Académica artapa7 (Normas APA 7)',
    subtitle: 'Incluida como Bonus en el Libro y Curso LaTeX',
    tags: ['APA 7ma Edición', 'Tesis', 'Artículos', 'BibLaTeX'],
    desc: 'Clase estructurada rigurosamente bajo la 7ma edición de las normas APA para tesis de grado, posgrado y artículos de investigación con citas y referencias automatizadas.',
    repoUrl: 'https://pay.hotmart.com/L77490587I',
    actionLabel: 'Incluida con el Libro / Curso',
    isIncluded: true,
    codePreview: `\\documentclass[stu,apa7]{artapa7}\n\\addbibresource{referencias.bib}\n\\title{Modelado Matemático en Educación Superior}\n\\author{Heber Mamani Quispe}\n\\affiliation{Editorial Científica Heber MQ}\n\\begin{document}\n\\maketitle\nSegun \\textcite{lamport1994}, el sistema \\LaTeX{} separa contenido y diseño.\n\\printbibliography\n\\end{document}`
  },
  {
    id: 'nexustex',
    category: 'paquete',
    title: 'Paquete nexusTeX (nexus.sty)',
    subtitle: 'Repositorio Open Source en GitHub',
    tags: ['Paquete .sty', 'Colormaps', 'Pies de página geométricos'],
    desc: 'Archivo de estilo para LaTeX con paletas de color dinámicas configurables mediante argumentos opcionales (palette) y rectángulos estilizados en el pie de página (reclength).',
    repoUrl: 'https://github.com/herbermqh/nexusTeX',
    actionLabel: 'Ver en GitHub',
    isIncluded: false,
    codePreview: `\\usepackage[palette= sapphire, reclength=4cm]{nexus}\n% Activa encabezados cromáticos y pie de página geométrico\n\\nexusheader{Física Preuniversitaria}{Cap. 2 · Estática}`
  },
  {
    id: 'byutextbook',
    category: 'plantilla',
    title: 'Plantilla BYUTextbook (Notas al Margen)',
    subtitle: 'Repositorio en GitHub · 98.9% TeX',
    tags: ['Notas al margen', 'Figuras laterales', 'Texto Universitario'],
    desc: 'Plantilla de libro universitario con columna marginal dedicada a notas, figuras en el margen, tablas compactas y referencias cruzadas visuales.',
    repoUrl: 'https://github.com/herbermqh/BYUTextbook',
    actionLabel: 'Ver en GitHub',
    isIncluded: false,
    codePreview: `\\begin{marginfigure}\n  \\centering\\tikz\\draw[cyan,thick] (0,0) circle (1.1cm);\n  \\caption{Trayectoria circular en el margen.}\n\\end{marginfigure}`
  },
  {
    id: 'kmbeamer',
    category: 'beamer',
    title: 'Colección kmbeamer (Diapositivas Beamer)',
    subtitle: 'Temas DarkConsole, LightConsole, Blackboard y Notebook',
    tags: ['Beamer', 'Presentaciones', 'Fira Sans / Mono'],
    desc: 'Colección de temas profesionales para presentaciones académicas en LaTeX Beamer con variantes de consola oscura, pizarrón clásico y cuaderno.',
    repoUrl: 'https://github.com/herbermqh/kmbeamer',
    actionLabel: 'Ver en GitHub',
    isIncluded: false,
    codePreview: `\\documentclass{beamer}\n\\usetheme{DarkConsoleFiraRemix}\n\\begin{frame}{Curso LaTeX Avanzado}\n  \\begin{itemize}\n    \\item Maquetación profesional sin usar ratón.\n  \\end{itemize}\n\\end{frame}`
  },
  {
    id: 'trabajos-latex',
    category: 'servicio',
    title: 'Servicio de Maquetación "Trabajos LaTeX"',
    subtitle: 'Edición por encargo de Libros, Tesis, Exámenes y Revistas',
    tags: ['Servicio Profesional', 'Maquetación a medida', 'TikZ / Pgfplots'],
    desc: '¿Tienes un manuscrito en Word o PDF y deseas transformarlo en un libro o tesis de alta calidad tipográfica en LaTeX? Servicio directo de composición editorial por Heber MQ.',
    repoUrl: 'https://hotmart.com/es/marketplace/productos/trabajos-latex/V84324153X',
    actionLabel: 'Cotizar Proyecto',
    isIncluded: false,
    codePreview: `% Servicio de maquetación integral por Heber MQ:\n% ✓ Conversión de Word/Manuscrito a LaTeX profesional\n% ✓ Redibujo de gráficas en TikZ / Asymptote de alta resolución\n% ✓ Entrega de PDF listo para imprenta + código fuente .tex`
  }
];
// Puntos de venta reales extraídos de puntoventafisica.html
const SALES_POINTS_BOLIVIA = [
  {
    id: 'pangea',
    city: 'La Paz',
    name: 'Librería Pangea',
    priceBs: 67,
    address: 'Centro de La Paz (Zona Universitaria / Monoblock)',
    phone: '59170187001',
    phoneDisplay: '+591 70187001',
    lat: -16.4977618,
    lng: -68.1304588,
    mapUrl: 'https://www.google.com/maps?q=-16.4977618,-68.1304588',
    schedule: 'Lunes a Sábado · Atención directa y consulta de stock por WhatsApp'
  },
  {
    id: 'guarida',
    city: 'La Paz',
    name: 'Guarida del Estudiante',
    priceBs: 65,
    address: 'Frente al Mercado Yungas, La Paz',
    phone: '59160169727',
    phoneDisplay: '+591 60169727',
    lat: -16.4972358,
    lng: -68.1296376,
    mapUrl: 'https://www.google.com/maps?q=-16.4972358,-68.1296376',
    schedule: 'Lunes a Sábado · Frente al Mercado Yungas'
  },
  {
    id: 'puesto70',
    city: 'La Paz',
    name: 'Puesto 70 — Pasaje Núñez del Prado',
    priceBs: 60,
    address: 'Pasaje Núñez del Prado, Puesto 70 (La Paz)',
    phone: '59163152441',
    phoneDisplay: 'Consultar vía Autor (+591 63152441)',
    lat: -16.5003027,
    lng: -68.1326667,
    mapUrl: 'https://www.google.com/maps?q=-16.5003027,-68.1326667',
    schedule: 'Lunes a Sábado · Precio directo de feria editorial (60 Bs)'
  },
  {
    id: 'academiaz',
    city: 'Santa Cruz',
    name: 'Academia Z (Santa Cruz de la Sierra)',
    priceBs: 65,
    address: 'Santa Cruz de la Sierra — Sede Academia Z',
    phone: '59176047631',
    phoneDisplay: '+591 76047631',
    lat: -17.7744524,
    lng: -63.1995033,
    mapUrl: 'https://www.google.com/maps?q=-17.7744524,-63.1995033',
    schedule: 'Lunes a Sábado · Punto oficial en Santa Cruz de la Sierra'
  }
];
// Catálogo de productos para la Pasarela Integrada Hotmart
const CHECKOUT_PRODUCTS = {
  'libro-latex': {
    id: 'libro-latex',
    code: 'L77490587I',
    title: 'Libro "El Arte de Editar en LaTeX" (Edición Completa 639 págs.)',
    badge: 'Bestseller en Hotmart · 60% DTO',
    priceUSD: 32.00,
    oldPriceUSD: 80.00,
    hotmartUrl: 'https://pay.hotmart.com/L77490587I?checkoutMode=2',
    hotmartDirectUrl: 'https://pay.hotmart.com/L77490587I',
    marketplaceUrl: 'https://hotmart.com/es/marketplace/productos/latex/L77490587I',
    takenosUrl: 'https://app.takenos.com/pay/55e3f47c-19a4-4016-b2a4-cf371719ef6a',
    cover: 'https://raw.githubusercontent.com/herbermqh/web-page/main/recursos/portadalatex.png',
    includes: [
      'Libro completo en formato digital (639 páginas, 19 capítulos detallados)',
      'Bonus #1: Plantilla profesional "artbook" lista para crear libros',
      'Bonus #2: Plantilla académica "artapa7" bajo normas APA 7ma edición',
      'Consultas y soporte directo con el autor Heber MQ durante 3 meses',
      'Garantía incondicional de satisfacción de 7 días a través de Hotmart'
    ]
  },
  'curso-latex': {
    id: 'curso-latex',
    code: 'L77490587I',
    title: 'Curso LaTeX Avanzado (27 Módulos en Google Classroom + Plantillas)',
    badge: 'Formación Completa · 27 Módulos',
    priceUSD: 45.00,
    oldPriceUSD: 95.00,
    hotmartUrl: 'https://pay.hotmart.com/L77490587I?checkoutMode=2',
    hotmartDirectUrl: 'https://pay.hotmart.com/L77490587I',
    marketplaceUrl: 'https://hotmart.com/es/marketplace/productos/trabajos-latex/V84324153X',
    takenosUrl: 'https://app.takenos.com/pay/55e3f47c-19a4-4016-b2a4-cf371719ef6a',
    cover: 'https://raw.githubusercontent.com/herbermqh/web-page/main/recursos/portadalatex.png',
    includes: [
      'Acceso ilimitado a los 27 módulos grabados en Google Classroom',
      'Desde macros y libros de +1,000 páginas hasta creación de clases .cls y .sty',
      'Análisis de maquetación real de editoriales (McGraw-Hill, Pearson)',
      'Incluye las plantillas "artbook" y "artapa7" + archivos fuente .tex',
      'Foro continuo de preguntas y respuestas + sesiones de dudas en vivo'
    ]
  },
  'pack-editorial': {
    id: 'pack-editorial',
    code: 'L77490587I',
    title: 'Pack Integral: Libro El Arte de Editar en LaTeX + Curso Avanzado + Plantillas Pro',
    badge: 'Máximo Ahorro · Todo Incluido',
    priceUSD: 64.00,
    oldPriceUSD: 140.00,
    hotmartUrl: 'https://pay.hotmart.com/L77490587I?checkoutMode=2',
    hotmartDirectUrl: 'https://pay.hotmart.com/L77490587I',
    marketplaceUrl: 'https://hotmart.com/es/marketplace/productos/latex/L77490587I',
    takenosUrl: 'https://app.takenos.com/pay/55e3f47c-19a4-4016-b2a4-cf371719ef6a',
    cover: 'https://raw.githubusercontent.com/herbermqh/web-page/main/recursos/portadalatex.png',
    includes: [
      'Libro "El Arte de Editar en LaTeX" (639 páginas) + Código fuente de ejemplos',
      'Acceso completo al Curso LaTeX Avanzado (27 módulos en Google Classroom)',
      'Colección completa de plantillas: artbook, artapa7, nexusTeX y BYUTextbook',
      'Mentoría y revisión de estructura de tu propio libro o tesis por 3 meses'
    ]
  },
  'libro-fisica': {
    id: 'libro-fisica',
    code: 'FISICA-BO',
    title: 'Libro "Física Preuniversitaria" — Edición Impresa Bolivia / Digital',
    badge: '60 a 67 Bs en Bolivia',
    priceUSD: 9.50,
    oldPriceUSD: 15.00,
    hotmartUrl: 'https://wa.me/59163152441?text=Hola%20Heber%2C%20deseo%20adquirir%20el%20libro%20F%C3%ADsica%20Preuniversitaria',
    hotmartDirectUrl: 'https://wa.me/59163152441?text=Hola%20Heber%2C%20deseo%20adquirir%20el%20libro%20F%C3%ADsica%20Preuniversitaria',
    marketplaceUrl: 'https://drive.google.com/file/d/1kZQ_d68zK0Y2PDb7u4X05rgLbsiZqfQw/view?usp=drive_link',
    takenosUrl: 'https://wa.me/59163152441?text=Hola%20Heber%2C%20deseo%20adquirir%20el%20libro%20F%C3%ADsica%20Preuniversitaria',
    cover: 'https://raw.githubusercontent.com/herbermqh/web-page/main/recursos/portadafisica.png',
    includes: [
      'Teoría completa y problemas selectos resueltos paso a paso',
      'Gráficos vectoriales de alta precisión maquetados íntegramente en LaTeX / TikZ',
      'Disponible físicamente en La Paz (60–67 Bs) y Santa Cruz (65 Bs)',
      'Envíos a todos los departamentos de Bolivia vía contacto directo'
    ]
  }
};
// Ejemplos interactivos de LaTeX en el Hero
const HERO_LATEX_DEMOS = {
  tcolorbox: {
    title: 'Caja de Teorema con tcolorbox (Módulo 14)',
    code: `\\begin{tcolorbox}[\n  enhanced, colback=slate!8,\n  colframe=cyan!75!blue,\n  fonttitle=\\bfseries,\n  title={Teorema 4.2: Conservación del Momento Lineal}\n]\nSi la fuerza externa neta sobre un sistema de partículas es nula ($\\sum \\vec{F}_{\\text{ext}} = \\vec{0}$), entonces el momento lineal total $\\vec{P}$ permanece constante:\n\\[\n  \\frac{d\\vec{P}}{dt} = \\sum_{i=1}^{n} m_i \\frac{d\\vec{v}_i}{dt} = \\vec{0} \\implies \\vec{P}_{\\text{inicial}} = \\vec{P}_{\\text{final}}\n\\]\n\\end{tcolorbox}`,
    previewHtml: `
      <div class="rounded-xl border-2 border-sky-500/80 bg-slate-900/90 overflow-hidden shadow-lg">
        <div class="bg-gradient-to-r from-sky-600 to-blue-700 px-4 py-2 text-xs font-bold text-white flex items-center justify-between">
          <span>Teorema 4.2: Conservación del Momento Lineal</span>
          <span class="text-[11px] opacity-80 font-mono-code">tcolorbox · skin=enhanced</span>
        </div>
        <div class="p-4 font-latex-serif text-slate-100 text-base leading-relaxed">
          <p class="mb-3">Si la fuerza externa neta sobre un sistema de partículas es nula (<span>&Sigma; <em>F&#8407;</em><sub>ext</sub> = 0&#8407;</span>), entonces el momento lineal total <em>P&#8407;</em> permanece constante:</p>
          <div class="bg-slate-950/70 border border-slate-800 rounded-lg py-3 px-4 text-center text-sky-300 text-lg">
            <em>dP&#8407;</em> / <em>dt</em> = &Sigma;<sub>i=1</sub><sup>n</sup> <em>m<sub>i</sub></em> (<em>dv&#8407;<sub>i</sub></em> / <em>dt</em>) = 0&#8407; &nbsp;&rArr;&nbsp; <strong><em>P&#8407;</em><sub>inicial</sub> = <em>P&#8407;</em><sub>final</sub></strong>
          </div>
        </div>
      </div>`
  },
  tikz: {
    title: 'Diagrama de Cuerpo Libre en TikZ (Módulo 7)',
    code: `\\begin{tikzpicture}[scale=1.1, >=stealth]\n  % Plano inclinado de ángulo theta\n  \\draw[thick, fill=slate!15] (0,0) -- (4,0) -- (0,2.2) -- cycle;\n  % Bloque de masa m\n  \\node[draw, thick, fill=cyan!20, minimum size=0.9cm, rotate=-28.8]\n        (m) at (1.8, 1.55) {$m$};\n  % Vectores de fuerza\n  \\draw[->, very thick, red] (m.center) -- ++(0,-1.4) node[below] {$m\\vec{g}$};\n  \\draw[->, very thick, emerald] (m.center) -- ++(0.65,1.18) node[above] {$\\vec{N}$};\n\\end{tikzpicture}`,
    previewHtml: `
      <div class="rounded-xl border border-slate-700 bg-slate-950/90 p-4 flex flex-col items-center">
        <svg viewBox="0 0 280 155" class="w-full max-w-[280px] h-auto">
          <polygon points="25,130 235,130 25,35" fill="rgba(56,189,248,0.12)" stroke="#94a3b8" stroke-width="2"/>
          <path d="M 190 130 A 45 45 0 0 0 194 111" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
          <text x="172" y="124" fill="#f59e0b" font-size="12" font-family="serif">&theta;</text>
          <g transform="translate(115,62) rotate(24.3)">
            <rect x="-22" y="-22" width="44" height="44" rx="4" fill="rgba(14,165,233,0.28)" stroke="#38bdf8" stroke-width="2"/>
            <text x="-5" y="5" fill="#f8fafc" font-size="14" font-family="serif" font-style="italic">m</text>
            <line x1="0" y1="0" x2="0" y2="-52" stroke="#10b981" stroke-width="2.5"/>
            <polygon points="0,-57 -4,-49 4,-49" fill="#10b981"/>
            <text x="6" y="-46" fill="#10b981" font-size="12" font-weight="bold">N&#8407;</text>
          </g>
          <line x1="115" y1="62" x2="115" y2="122" stroke="#f43f5e" stroke-width="2.5"/>
          <polygon points="115,127 111,119 119,119" fill="#f43f5e"/>
          <text x="122" y="118" fill="#f43f5e" font-size="12" font-weight="bold">mg&#8407;</text>
        </svg>
        <span class="text-xs text-slate-400 mt-1 font-mono-code">Figura 2.4: Plano inclinado vectorial compilado con TikZ</span>
      </div>`
  },
  chapter: {
    title: 'Apertura de Capítulo Editorial artbook (Módulo 9)',
    code: `\\titleformat{\\chapter}[display]\n  {\\normalfont\\Huge\\bfseries\\color{navy}}\n  {\\hfill\\tikz\\node[fill=amber,text=white,rounded corners=6pt,\n    inner sep=10pt]{\\fontsize{28}{32}\\selectfont\\thechapter};}\n  {-1ex}\n  {\\titlerule[2pt]\\vspace{1ex}\\filright}`,
    previewHtml: `
      <div class="rounded-xl border border-slate-700 bg-slate-950/90 p-5 font-latex-serif">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs uppercase tracking-widest text-amber-400 font-sans font-bold">Capítulo Tres · Plantilla artbook</span>
          <span class="w-11 h-11 rounded-lg bg-amber-500 text-slate-950 font-sans font-extrabold text-xl flex items-center justify-center shadow">03</span>
        </div>
        <div class="h-0.5 w-full bg-gradient-to-r from-sky-400 via-amber-400 to-transparent mb-3"></div>
        <h4 class="text-2xl font-bold text-white mb-1">Estructura y Maquetación de Libros</h4>
        <p class="text-sm text-slate-300 leading-relaxed">Un documento <span class="latex-logo">L<sup>A</sup>T<sub>E</sub>X</span> profesional separa la jerarquía semántica de la presentación visual mediante clases personalizadas.</p>
      </div>`
  }
};
function formatPrice(usdAmount) {
  const curr = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.USD;
  const converted = usdAmount * curr.rate;
  if (curr.decimals === 0) {
    return curr.symbol + Math.round(converted).toLocaleString('es-BO');
  }
  return curr.symbol + converted.toFixed(curr.decimals);
}
function showToast(message) {
  const toast = document.getElementById('appToast');
  const toastMsg = document.getElementById('appToastMsg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');
  if (window._toastTimer) clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3400);
}
function updateAllPrices() {
  document.querySelectorAll('[data-usd]').forEach(el => {
    const usd = parseFloat(el.getAttribute('data-usd') || '0');
    el.textContent = formatPrice(usd);
  });
  renderCheckoutSummary();
}
function setCurrency(code) {
  if (!CURRENCY_RATES[code]) return;
  currentCurrency = code;
  const sel = document.getElementById('currencySelector');
  if (sel && sel.value !== code) sel.value = code;
  const modalSel = document.getElementById('modalCurrencySelector');
  if (modalSel && modalSel.value !== code) modalSel.value = code;
  updateAllPrices();
  showToast('Precios actualizados a ' + CURRENCY_RATES[code].label);
}
function toggleTheme() {
  const root = document.documentElement;
  const isLight = root.classList.toggle('light-mode');
  const label = document.getElementById('themeToggleLabel');
  if (label) label.textContent = isLight ? 'Modo Oscuro' : 'Modo Claro';
  try {
    localStorage.setItem('heber_theme', isLight ? 'light' : 'dark');
  } catch (e) {}
}
function switchHeroDemo(demoKey) {
  const demo = HERO_LATEX_DEMOS[demoKey];
  if (!demo) return;
  document.querySelectorAll('.hero-demo-tab').forEach(btn => {
    const active = btn.getAttribute('data-demo') === demoKey;
    btn.className = active
      ? 'hero-demo-tab px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500 text-slate-950 transition'
      : 'hero-demo-tab px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 text-slate-300 hover:bg-slate-700 transition';
  });
  const titleEl = document.getElementById('heroDemoTitle');
  const codeEl = document.getElementById('heroDemoCode');
  const prevEl = document.getElementById('heroDemoPreview');
  if (titleEl) titleEl.textContent = demo.title;
  if (codeEl) codeEl.textContent = demo.code;
  if (prevEl) prevEl.innerHTML = demo.previewHtml;
}
function copyLatexDemoCode() {
  const codeEl = document.getElementById('heroDemoCode');
  if (!codeEl) return;
  const text = codeEl.textContent || '';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Código LaTeX copiado al portapapeles');
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('Código copiado al portapapeles');
  } catch (e) {
    showToast('No se pudo copiar automáticamente');
  }
  document.body.removeChild(ta);
}
// Renderizar los 19 capítulos del libro de LaTeX
function renderBookChapters(filterText = '') {
  const container = document.getElementById('bookChaptersGrid');
  if (!container) return;
  const q = filterText.trim().toLowerCase();
  const filtered = BOOK_LATEX_CHAPTERS.filter(ch =>
    !q || ch.title.toLowerCase().includes(q) || ch.topics.toLowerCase().includes(q) || String(ch.num) === q
  );
  if (filtered.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-8 text-slate-400">No se encontraron capítulos que coincidan con "${filterText}".</div>`;
    return;
  }
  container.innerHTML = filtered.map(ch => `
    <div class="rounded-xl bg-slate-900/80 border border-slate-800 p-4 hover:border-sky-500/50 transition">
      <div class="flex items-center justify-between mb-1.5">
        <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400">
          <span class="w-6 h-6 rounded-md bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300">${ch.num}</span>
          Capítulo ${ch.num}
        </span>
        <span class="text-[11px] font-mono-code text-slate-400">${ch.pages}</span>
      </div>
      <h4 class="font-heading font-bold text-white text-sm mb-1">${ch.title}</h4>
      <p class="text-xs text-slate-300 leading-relaxed">${ch.topics}</p>
    </div>
  `).join('');
}
// Renderizar los 27 módulos del Curso LaTeX Avanzado (antes en Google Sites)
function renderCourseModules() {
  const container = document.getElementById('courseModulesContainer');
  const countEl = document.getElementById('courseModulesCount');
  if (!container) return;
  const q = syllabusSearchQuery.trim().toLowerCase();
  const filtered = COURSE_MODULES.filter(mod => {
    const matchCat = activeSyllabusCategory === 'all' || mod.category === activeSyllabusCategory;
    const matchQ = !q || mod.title.toLowerCase().includes(q) || mod.detail.toLowerCase().includes(q) || mod.badge.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
  if (countEl) {
    countEl.textContent = `Mostrando ${filtered.length} de ${COURSE_MODULES.length} módulos oficiales`;
  }
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <p class="text-slate-300 font-medium mb-2">No encontramos módulos con ese término de búsqueda.</p>
        <button type="button" onclick="resetCourseFilters()" class="px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-semibold text-xs">Mostrar los 27 módulos</button>
      </div>`;
    return;
  }
  container.innerHTML = filtered.map(mod => `
    <div class="rounded-xl bg-slate-900/85 border border-slate-800/90 p-4 hover:border-sky-500/50 transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-amber-400">
            <span class="w-6 h-6 rounded-md bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300">${String(mod.id).padStart(2, '0')}</span>
            Módulo ${mod.id}
          </span>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">${mod.badge}</span>
        </div>
        <h4 class="font-heading font-bold text-white text-base mb-1.5">${mod.title}</h4>
        <p class="text-xs text-slate-300 leading-relaxed">${mod.detail}</p>
      </div>
      <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span><i class="fa-solid fa-circle-play text-emerald-400 mr-1"></i> Google Classroom + Archivos .tex</span>
        <button type="button" onclick="openHotmartCheckout('curso-latex')" class="text-sky-400 hover:text-sky-300 font-semibold">Inscribirme &rarr;</button>
      </div>
    </div>
  `).join('');
}
function setCourseCategory(cat) {
  activeSyllabusCategory = cat;
  document.querySelectorAll('.course-cat-btn').forEach(btn => {
    const active = btn.getAttribute('data-cat') === cat;
    btn.className = active
      ? 'course-cat-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 shadow transition'
      : 'course-cat-btn px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/90 text-slate-300 hover:bg-slate-700 transition';
  });
  renderCourseModules();
}
function resetCourseFilters() {
  activeSyllabusCategory = 'all';
  syllabusSearchQuery = '';
  const input = document.getElementById('courseSearchInput');
  if (input) input.value = '';
  setCourseCategory('all');
}
// Renderizar Proyectos y Plantillas LaTeX (antes en Google Sites proyectos-latex)
function renderProjects() {
  const container = document.getElementById('latexProjectsGrid');
  if (!container) return;
  const filtered = LATEX_PROJECTS.filter(p => activeProjectFilter === 'all' || p.category === activeProjectFilter);
  container.innerHTML = filtered.map(p => `
    <div class="rounded-2xl glass-panel p-6 flex flex-col justify-between hover:border-sky-500/50 transition">
      <div>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${p.isIncluded ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'}">
            ${p.subtitle}
          </span>
        </div>
        <h3 class="font-heading text-xl font-bold text-white mb-2">${p.title}</h3>
        <p class="text-sm text-slate-300 leading-relaxed mb-4">${p.desc}</p>
        <div class="flex flex-wrap gap-1.5 mb-4">
          ${p.tags.map(t => `<span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono-code">${t}</span>`).join('')}
        </div>
        <div class="rounded-xl bg-slate-950/90 border border-slate-800 p-3 mb-4 overflow-x-auto">
          <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-mono-code">
            <span>ejemplo_${p.id}.tex</span>
            <span class="text-sky-400">LaTeX2e</span>
          </div>
          <pre class="text-xs font-mono-code text-sky-200 leading-relaxed m-0 whitespace-pre-wrap">${p.codePreview}</pre>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2 pt-2">
        ${p.isIncluded
          ? `<button type="button" onclick="openHotmartCheckout('libro-latex')" class="flex-1 py-2.5 px-4 rounded-xl btn-hotmart font-bold text-xs text-center">
               <i class="fa-solid fa-fire-flame-curved mr-1.5"></i> Obtener con el Libro / Curso en Hotmart
             </button>`
          : `<a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs text-center transition">
               <i class="fa-solid fa-arrow-up-right-from-square mr-1.5"></i> ${p.actionLabel}
             </a>`
        }
        <a href="https://wa.me/59163152441?text=${encodeURIComponent('Hola Heber, me interesa consultar sobre: ' + p.title)}" target="_blank" rel="noopener noreferrer" class="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold transition" title="Consultar por WhatsApp">
          <i class="fa-brands fa-whatsapp text-sm"></i>
        </a>
      </div>
    </div>
  `).join('');
}
function setProjectFilter(filter) {
  activeProjectFilter = filter;
  document.querySelectorAll('.project-filter-btn').forEach(btn => {
    const active = btn.getAttribute('data-filter') === filter;
    btn.className = active
      ? 'project-filter-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 transition'
      : 'project-filter-btn px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition';
  });
  renderProjects();
}
// Renderizar Puntos de Venta en Bolivia (antes en puntoventafisica.html)
function renderSalesPoints() {
  const container = document.getElementById('salesPointsList');
  if (!container) return;
  const filtered = SALES_POINTS_BOLIVIA.filter(pt => activeCityFilter === 'all' || pt.city === activeCityFilter);
  container.innerHTML = filtered.map(pt => {
    const isSelected = pt.id === selectedPointId;
    return `
      <div class="rounded-2xl p-5 border transition cursor-pointer ${isSelected ? 'bg-sky-950/50 border-sky-400 shadow-lg' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}" onclick="selectSalesPoint('${pt.id}')">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div>
            <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${pt.city === 'Santa Cruz' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'} mb-1">
              <i class="fa-solid fa-location-dot mr-1"></i> ${pt.city}
            </span>
            <h4 class="font-heading text-lg font-bold text-white">${pt.name}</h4>
          </div>
          <div class="text-right">
            <span class="block text-xl font-extrabold text-amber-400">${pt.priceBs} Bs</span>
            <span class="text-[11px] text-slate-400">Edición impresa</span>
          </div>
        </div>
        <p class="text-xs text-slate-300 mb-1"><i class="fa-solid fa-map-pin text-sky-400 mr-1.5"></i> ${pt.address}</p>
        <p class="text-xs text-slate-400 mb-3"><i class="fa-regular fa-clock text-slate-500 mr-1.5"></i> ${pt.schedule}</p>
        <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <a href="https://wa.me/${pt.phone}?text=${encodeURIComponent('Hola, deseo consultar disponibilidad del libro Física Preuniversitaria de Heber MQ en ' + pt.name)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center transition">
            <i class="fa-brands fa-whatsapp mr-1"></i> ${pt.phoneDisplay}
          </a>
          <a href="${pt.mapUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold transition">
            <i class="fa-solid fa-map-location-dot mr-1"></i> Abrir Google Maps
          </a>
        </div>
      </div>
    `;
  }).join('');
  updateMapCard();
}
function selectSalesPoint(pointId) {
  selectedPointId = pointId;
  renderSalesPoints();
}
function setCityFilter(city) {
  activeCityFilter = city;
  document.querySelectorAll('.city-filter-btn').forEach(btn => {
    const active = btn.getAttribute('data-city') === city;
    btn.className = active
      ? 'city-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 transition'
      : 'city-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition';
  });
  const firstMatch = SALES_POINTS_BOLIVIA.find(p => city === 'all' || p.city === city);
  if (firstMatch) selectedPointId = firstMatch.id;
  renderSalesPoints();
}
function updateMapCard() {
  const pt = SALES_POINTS_BOLIVIA.find(p => p.id === selectedPointId) || SALES_POINTS_BOLIVIA[0];
  if (!pt) return;
  const titleEl = document.getElementById('mapPointTitle');
  const addrEl = document.getElementById('mapPointAddress');
  const coordsEl = document.getElementById('mapPointCoords');
  const priceEl = document.getElementById('mapPointPrice');
  const linkEl = document.getElementById('mapPointExternalLink');
  const waEl = document.getElementById('mapPointWhatsappLink');
  const iframeEl = document.getElementById('mapPointIframe');
  if (titleEl) titleEl.textContent = `${pt.name} (${pt.city})`;
  if (addrEl) addrEl.textContent = pt.address;
  if (coordsEl) coordsEl.textContent = `Lat: ${pt.lat} · Lng: ${pt.lng}`;
  if (priceEl) priceEl.textContent = `${pt.priceBs} Bs`;
  if (linkEl) linkEl.href = pt.mapUrl;
  if (waEl) waEl.href = `https://wa.me/${pt.phone}?text=${encodeURIComponent('Hola, consulto por el libro Física Preuniversitaria de Heber MQ en ' + pt.name)}`;
  if (iframeEl) {
    const bbox = `${pt.lng - 0.005},${pt.lat - 0.003},${pt.lng + 0.005},${pt.lat + 0.003}`;
    iframeEl.src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${pt.lat}%2C${pt.lng}`;
  }
}
// ==========================================================================
// PASARELA DE PAGOS INTEGRADA CON HOTMART
// ==========================================================================
function openHotmartCheckout(productKey) {
  if (CHECKOUT_PRODUCTS[productKey]) {
    activeCheckoutProduct = productKey;
  }
  const modal = document.getElementById('hotmartCheckoutModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  renderCheckoutSummary();
}
function closeHotmartCheckout() {
  const modal = document.getElementById('hotmartCheckoutModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}
function selectCheckoutProduct(productKey) {
  if (!CHECKOUT_PRODUCTS[productKey]) return;
  activeCheckoutProduct = productKey;
  renderCheckoutSummary();
}
function selectPaymentMethod(method) {
  activePaymentMethod = method;
  document.querySelectorAll('.pay-method-tab').forEach(btn => {
    const active = btn.getAttribute('data-method') === method;
    btn.className = active
      ? 'pay-method-tab flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-orange-500 text-white shadow transition flex items-center justify-center gap-1.5'
      : 'pay-method-tab flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition flex items-center justify-center gap-1.5';
  });
  renderCheckoutSummary();
}
function applyCheckoutCoupon() {
  const input = document.getElementById('checkoutCouponInput');
  const code = (input ? input.value : '').trim().toUpperCase();
  if (!code) {
    showToast('Ingresa un código promocional');
    return;
  }
  if (code === 'HEBERMQ' || code === 'LATEX2026' || code === 'BOLIVIA') {
    appliedCoupon = code;
    showToast('¡Cupón ' + code + ' aplicado! 10% adicional de beneficio en el pack.');
  } else {
    appliedCoupon = code;
    showToast('Código ' + code + ' registrado para validar en el checkout de Hotmart.');
  }
  renderCheckoutSummary();
}
function renderCheckoutSummary() {
  const prod = CHECKOUT_PRODUCTS[activeCheckoutProduct] || CHECKOUT_PRODUCTS['libro-latex'];
  document.querySelectorAll('.checkout-prod-option').forEach(btn => {
    const active = btn.getAttribute('data-prod') === prod.id;
    btn.className = active
      ? 'checkout-prod-option w-full text-left p-3 rounded-xl border-2 border-orange-500 bg-orange-500/10 transition flex items-center justify-between gap-2'
      : 'checkout-prod-option w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 transition flex items-center justify-between gap-2';
  });
  const titleEl = document.getElementById('checkoutSelectedTitle');
  const badgeEl = document.getElementById('checkoutSelectedBadge');
  const codeEl = document.getElementById('checkoutSelectedCode');
  const priceEl = document.getElementById('checkoutSelectedPrice');
  const oldPriceEl = document.getElementById('checkoutSelectedOldPrice');
  const includesEl = document.getElementById('checkoutSelectedIncludes');
  const actionContainer = document.getElementById('checkoutPaymentActionArea');
  const finalUsd = (appliedCoupon === 'HEBERMQ' || appliedCoupon === 'LATEX2026')
    ? +(prod.priceUSD * 0.9).toFixed(2)
    : prod.priceUSD;
  if (titleEl) titleEl.textContent = prod.title;
  if (badgeEl) badgeEl.textContent = prod.badge;
  if (codeEl) codeEl.textContent = 'ID Hotmart: ' + prod.code;
  if (priceEl) priceEl.textContent = formatPrice(finalUsd);
  if (oldPriceEl) oldPriceEl.textContent = formatPrice(prod.oldPriceUSD);
  if (includesEl) {
    includesEl.innerHTML = prod.includes.map(item => `
      <li class="flex items-start gap-2 text-xs text-slate-200">
        <i class="fa-solid fa-circle-check text-emerald-400 mt-0.5"></i>
        <span>${item}</span>
      </li>
    `).join('');
  }
  if (!actionContainer) return;
  if (activePaymentMethod === 'hotmart-embed') {
    actionContainer.innerHTML = `
      <div class="rounded-2xl border border-orange-500/40 bg-slate-950/90 p-5">
        <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <i class="fa-solid fa-fire-flame-curved"></i>
            </span>
            <div>
              <h5 class="text-sm font-bold text-white">Pasarela Oficial Hotmart (${prod.code})</h5>
              <p class="text-[11px] text-slate-400">Tarjeta de crédito/débito, PayPal, PagoEfectivo, OXXO, Sencillito · Entrega inmediata al email</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <i class="fa-solid fa-shield-halved mr-1"></i> Garantía Hotmart 7 días
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <a onclick="return false;" href="${prod.hotmartUrl}" class="hotmart-fb hotmart__button-checkout py-3.5 px-5 rounded-xl btn-hotmart font-bold text-sm text-center flex items-center justify-center gap-2 shadow-lg">
            <i class="fa-solid fa-lock"></i> Abrir Checkout Hotmart aquí (${formatPrice(finalUsd)})
          </a>
          <a href="${prod.hotmartDirectUrl}" target="_blank" rel="noopener noreferrer" class="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition">
            <i class="fa-solid fa-arrow-up-right-from-square text-orange-400"></i> Ir a pay.hotmart.com/${prod.code}
          </a>
        </div>
        <div class="rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <span><i class="fa-solid fa-bolt text-amber-400 mr-1"></i> ¿Prefieres ver la página del producto en Hotmart Marketplace?</span>
          <a href="${prod.marketplaceUrl}" target="_blank" rel="noopener noreferrer" class="text-orange-400 hover:underline font-semibold">Ver en Hotmart Marketplace &rarr;</a>
        </div>
      </div>
    `;
  } else if (activePaymentMethod === 'takenos') {
    actionContainer.innerHTML = `
      <div class="rounded-2xl border border-sky-500/40 bg-slate-950/90 p-5">
        <h5 class="text-sm font-bold text-white mb-1"><i class="fa-solid fa-globe text-sky-400 mr-1.5"></i> Pago Internacional Alternativo vía Takenos</h5>
        <p class="text-xs text-slate-300 mb-4">Enlace oficial alternativo configurado en tu repositorio para pagos internacionales rápidos por <strong>$32.00 USD</strong>.</p>
        <a href="${prod.takenosUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-3.5 px-5 rounded-xl btn-cyan font-bold text-sm text-center flex items-center justify-center gap-2">
          <i class="fa-solid fa-credit-card"></i> Pagar ${formatPrice(finalUsd)} en Takenos Checkout
        </a>
      </div>
    `;
  } else {
    const bsAmount = Math.round(finalUsd * CURRENCY_RATES.BOB.rate);
    const waText = `Hola Heber, quiero adquirir "${prod.title}" (${formatPrice(finalUsd)} / aprox. ${bsAmount} Bs) mediante QR Simple / transferencia en Bolivia.`;
    actionContainer.innerHTML = `
      <div class="rounded-2xl border border-emerald-500/40 bg-slate-950/90 p-5">
        <div class="flex items-center justify-between mb-2">
          <h5 class="text-sm font-bold text-white"><i class="fa-solid fa-qrcode text-emerald-400 mr-1.5"></i> Pago Local en Bolivia (QR Simple / Transferencia en Bs)</h5>
          <span class="text-sm font-extrabold text-amber-400">${bsAmount} Bs</span>
        </div>
        <p class="text-xs text-slate-300 mb-4">Si te encuentras en Bolivia y prefieres pagar en Bolivianos por QR bancario sin comisiones de tarjeta internacional, solicita el QR directo al WhatsApp del autor y recibe el acceso de inmediato.</p>
        <a href="https://wa.me/59163152441?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener noreferrer" class="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition">
          <i class="fa-brands fa-whatsapp text-base"></i> Solicitar QR en Bolivianos por WhatsApp (+591 63152441)
        </a>
      </div>
    `;
  }
}
function reserveUpcomingBook(bookName) {
  const modal = document.getElementById('waitlistModal');
  const titleEl = document.getElementById('waitlistBookName');
  const waBtn = document.getElementById('waitlistWhatsappLink');
  if (titleEl) titleEl.textContent = bookName;
  if (waBtn) {
    waBtn.href = `https://wa.me/59163152441?text=${encodeURIComponent('Hola Heber, quiero registrarme en la lista prioritaria de lanzamiento para tu próximo libro de ' + bookName)}`;
  }
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}
function closeWaitlistModal() {
  const modal = document.getElementById('waitlistModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}
function submitWaitlistForm(e) {
  e.preventDefault();
  const nameInput = document.getElementById('waitlistUserName');
  const emailInput = document.getElementById('waitlistUserEmail');
  const bookName = (document.getElementById('waitlistBookName') || {}).textContent || 'Matemáticas';
  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  if (!name || !email) {
    showToast('Por favor completa tu nombre y correo');
    return;
  }
  closeWaitlistModal();
  showToast(`¡Gracias ${name}! Te avisaremos del lanzamiento de ${bookName}.`);
  if (nameInput) nameInput.value = '';
  if (emailInput) emailInput.value = '';
}
function toggleMobileMenu() {
  const menu = document.getElementById('mobileNavDrawer');
  if (!menu) return;
  menu.classList.toggle('hidden');
}
// Inicialización general al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  try {
    const savedTheme = localStorage.getItem('heber_theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      const label = document.getElementById('themeToggleLabel');
      if (label) label.textContent = 'Modo Oscuro';
    }
  } catch (e) {}
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  switchHeroDemo('tcolorbox');
  renderBookChapters('');
  renderCourseModules();
  renderProjects();
  renderSalesPoints();
  updateAllPrices();
  const chapterSearch = document.getElementById('chapterSearchInput');
  if (chapterSearch) {
    chapterSearch.addEventListener('input', (e) => {
      renderBookChapters(e.target.value);
    });
  }
  const courseSearch = document.getElementById('courseSearchInput');
  if (courseSearch) {
    courseSearch.addEventListener('input', (e) => {
      syllabusSearchQuery = e.target.value;
      renderCourseModules();
    });
  }
});
