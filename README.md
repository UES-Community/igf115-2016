# IGF115-2016 — Ingeniería del Software UES

Plataforma web educativa e interactiva diseñada para la materia **Ingeniería del Software** de la Universidad de El Salvador (UES), focalizada en la enseñanza y práctica de Arquitecturas de Software, Desarrollo Web en Java, Patrones de Diseño, Servidores de Aplicaciones y Persistencia de Datos.

## Características

- 📘 **Unidades de Estudio**: Dashboard interactivo con las 8 unidades del programa de estudio de Ingeniería del Software (Fundamentos de IS, Arquitectura, Programación Web en Java, Servidor Tomcat, JSP, Motor de Persistencia Hibernate/JPA, Hibernate Avanzado y Framework Spring).
- 💻 **Editor Interactivo**: Área de código en el navegador con soporte para JavaScript (ejecución real en consola virtual), Python y C++ (plantillas de referencia).
- 📊 **Visualizaciones Animadas**: Simuladores dinámicos interactivos para arquitecturas, patrones de diseño y flujos de ejecución (Tomcat, MVC, Patrones GoF, Persistencia JDBC/Hibernate y Spring IoC).
- 🎨 **Diseño Moderno**: Interfaz premium oscura con glassmorphism, tipografía fluida y animaciones de entrada.

## Tecnologías Utilizadas

- **Core**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Coloreado Sintáctico**: [Highlight.js](https://highlightjs.org/)
- **Iconos**: [Lucide React](https://lucide.dev/)

## Instalación y Desarrollo Local

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y el gestor de paquetes [pnpm](https://pnpm.io/).

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/UES-Community/igf115-2016.git
   cd igf115-2016
   ```

2. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

3. **Correr servidor de desarrollo**:
   ```bash
   pnpm dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Compilar y Exportar Estáticamente**:
   ```bash
   pnpm build
   ```
   Los archivos estáticos listos para producción se exportarán en la carpeta `./out`.

## Despliegue

El proyecto se despliega automáticamente en **GitHub Pages** mediante GitHub Actions en cada push a la rama `main` a través del archivo de workflow en `.github/workflows/deploy.yml`.
El basepath se configura como `/igf115-2016` en producción para resolver correctamente las rutas estáticas.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
