# Product Design Document (PDD)
## TANDAS - Plataforma Educativa de Pretratamiento de Agua

**Versión:** 1.0  
**Fecha:** 2025-01-09  
**Autor:** Equipo TANDAS

---

## 1. Visión del Producto

### 1.1 Descripción General
TANDAS es una plataforma educativa digital diseñada para enseñar a las personas cómo realizar el pretratamiento de agua en casa. La plataforma ofrece cursos estructurados sobre técnicas de purificación de agua, permitiendo a los usuarios aprender de manera autodidacta y práctica.

### 1.2 Objetivo Principal
Proporcionar educación accesible y de calidad sobre métodos de pretratamiento de agua doméstico, empoderando a las personas para mejorar la calidad del agua que consumen en sus hogares.

### 1.3 Público Objetivo
- Personas interesadas en mejorar la calidad del agua en sus hogares
- Comunidades sin acceso a agua potable de calidad
- Estudiantes y educadores en temas de salud pública
- Profesionales que buscan conocimientos prácticos sobre tratamiento de agua

---

## 2. Alcance del Producto

### 2.1 Funcionalidades Principales

#### 2.1.1 Gestión de Cursos
- Visualización de catálogo de cursos disponibles
- Información detallada de cada curso (descripción, nivel, categoría)
- Sistema de inscripción a cursos
- Seguimiento de progreso por curso

#### 2.1.2 Contenido Educativo
- Módulos estructurados dentro de cada curso
- Contenido multimedia:
  - Texto educativo
  - Videos explicativos
  - Recursos descargables (PDF, DOC, PPT)
- Orden secuencial de módulos para aprendizaje progresivo

#### 2.1.3 Evaluación del Aprendizaje
- Quizzes cortos al final de cada módulo
- Preguntas de opción múltiple
- Retroalimentación inmediata con explicaciones
- Seguimiento de intentos y calificaciones

#### 2.1.4 Progreso del Usuario
- Dashboard de progreso personal
- Completación de módulos
- Progreso porcentual por curso
- Historial de intentos de quizzes

### 2.2 Cursos Disponibles

La plataforma incluye **5 cursos específicos** sobre pretratamiento de agua:

1. **Sedimentación**
   - Técnicas de sedimentación de partículas
   - Métodos caseros de decantación
   - Equipos y materiales necesarios

2. **Filtración**
   - Tipos de filtros caseros
   - Construcción de sistemas de filtración
   - Mantenimiento y limpieza de filtros

3. **Desinfección**
   - Métodos de desinfección química
   - Desinfección solar (SODIS)
   - Uso de cloro y otros desinfectantes

4. **Almacenamiento Seguro**
   - Contenedores apropiados para almacenamiento
   - Prácticas de higiene
   - Prevención de contaminación

5. **[Curso Adicional]**
   - Por definir según necesidades del proyecto

### 2.3 Funcionalidades Excluidas (v1.0)
- Sistema de certificaciones
- Foros de discusión
- Chat en vivo
- Integración con redes sociales
- Sistema de pagos
- Contenido generado por usuarios

---

## 3. Requisitos Funcionales

### 3.1 Autenticación y Autorización
- **RF-001**: Los usuarios deben poder registrarse con email y contraseña
- **RF-002**: Los usuarios deben poder iniciar sesión
- **RF-003**: Los usuarios deben poder cerrar sesión
- **RF-004**: Las sesiones deben persistir entre visitas
- **RF-005**: Solo usuarios autenticados pueden acceder a cursos

### 3.2 Gestión de Cursos
- **RF-006**: Los usuarios pueden ver el catálogo completo de cursos
- **RF-007**: Los usuarios pueden ver detalles de un curso específico
- **RF-008**: Los usuarios pueden inscribirse a un curso
- **RF-009**: Los usuarios pueden ver sus cursos inscritos
- **RF-010**: Los usuarios pueden ver su progreso en cada curso

### 3.3 Contenido Educativo
- **RF-011**: Los usuarios pueden acceder a módulos de cursos en los que están inscritos
- **RF-012**: Los módulos se presentan en orden secuencial
- **RF-013**: Los usuarios pueden ver contenido de texto, video y recursos
- **RF-014**: Los usuarios pueden descargar recursos asociados a módulos

### 3.4 Evaluación
- **RF-015**: Los usuarios pueden realizar quizzes al final de cada módulo
- **RF-016**: Los quizzes muestran preguntas de opción múltiple
- **RF-017**: Los usuarios reciben retroalimentación inmediata después de responder
- **RF-018**: Los usuarios pueden ver su historial de intentos de quizzes
- **RF-019**: Los usuarios pueden ver sus calificaciones por quiz

### 3.5 Progreso
- **RF-020**: Los usuarios pueden marcar módulos como completados
- **RF-021**: El sistema calcula automáticamente el progreso del curso
- **RF-022**: Los usuarios pueden ver su progreso general en el dashboard

---

## 4. Requisitos No Funcionales

### 4.1 Rendimiento
- **RNF-001**: El tiempo de respuesta de la API debe ser menor a 200ms para el 95% de las peticiones
- **RNF-002**: La plataforma debe soportar al menos 100 usuarios concurrentes
- **RNF-003**: Los videos deben cargarse de manera progresiva

### 4.2 Seguridad
- **RNF-004**: Todas las comunicaciones deben usar HTTPS
- **RNF-005**: Las contraseñas deben almacenarse de forma encriptada
- **RNF-006**: Los tokens de sesión deben tener expiración
- **RNF-007**: La API debe validar todos los inputs del usuario

### 4.3 Usabilidad
- **RNF-008**: La interfaz debe ser intuitiva y fácil de usar
- **RNF-009**: El contenido debe ser accesible desde dispositivos móviles
- **RNF-010**: Los mensajes de error deben ser claros y útiles

### 4.4 Escalabilidad
- **RNF-011**: La arquitectura debe permitir escalar horizontalmente
- **RNF-012**: La base de datos debe estar optimizada con índices apropiados
- **RNF-013**: El sistema debe soportar el crecimiento de contenido sin degradación

### 4.5 Mantenibilidad
- **RNF-014**: El código debe seguir estándares de calidad y documentación
- **RNF-015**: El sistema debe tener logging apropiado para debugging
- **RNF-016**: La arquitectura debe ser modular y fácil de extender

---

## 5. Casos de Uso Principales

### 5.1 UC-001: Registro de Usuario
**Actor:** Usuario nuevo  
**Precondición:** El usuario no tiene cuenta  
**Flujo Principal:**
1. El usuario accede a la página de registro
2. Ingresa email y contraseña
3. El sistema valida los datos
4. Se crea la cuenta
5. El usuario es redirigido al dashboard

### 5.2 UC-002: Inscripción a Curso
**Actor:** Usuario autenticado  
**Precondición:** El usuario ha iniciado sesión  
**Flujo Principal:**
1. El usuario navega al catálogo de cursos
2. Selecciona un curso de interés
3. Visualiza los detalles del curso
4. Hace clic en "Inscribirse"
5. El sistema registra la inscripción
6. El usuario es redirigido al curso

### 5.3 UC-003: Completar Módulo
**Actor:** Usuario inscrito en curso  
**Precondición:** El usuario está inscrito en un curso activo  
**Flujo Principal:**
1. El usuario accede al módulo siguiente del curso
2. Revisa el contenido (texto, video, recursos)
3. Completa el quiz del módulo
4. Recibe retroalimentación
5. Marca el módulo como completado
6. El sistema actualiza el progreso del curso

### 5.4 UC-004: Realizar Quiz
**Actor:** Usuario en módulo  
**Precondición:** El usuario está viendo un módulo con quiz  
**Flujo Principal:**
1. El usuario accede al quiz del módulo
2. Lee la pregunta
3. Selecciona una o más opciones
4. Envía sus respuestas
5. El sistema calcula la calificación
6. Muestra retroalimentación con explicaciones
7. Registra el intento en el historial

---

## 6. Modelo de Datos Conceptual

### 6.1 Entidades Principales

- **Usuario**: Información personal y credenciales
- **Curso**: Contenido educativo estructurado
- **Módulo**: Unidad de aprendizaje dentro de un curso
- **Quiz**: Evaluación asociada a un módulo
- **Opción de Quiz**: Respuestas posibles para preguntas
- **Recurso**: Archivos y enlaces asociados a módulos
- **Inscripción**: Relación usuario-curso
- **Completación de Módulo**: Progreso del usuario
- **Intento de Quiz**: Respuestas del usuario a quizzes

### 6.2 Relaciones

- Un Usuario puede tener múltiples Inscripciones
- Un Curso tiene múltiples Módulos
- Un Módulo tiene un Quiz
- Un Quiz tiene múltiples Opciones
- Un Módulo tiene múltiples Recursos
- Un Usuario puede completar múltiples Módulos
- Un Usuario puede realizar múltiples Intentos de Quiz

---

## 7. Interfaz de Usuario (Conceptual)

### 7.1 Páginas Principales
- **Login/Registro**: Autenticación de usuarios
- **Dashboard**: Vista general del progreso
- **Catálogo de Cursos**: Lista de todos los cursos disponibles
- **Detalle de Curso**: Información completa de un curso
- **Vista de Módulo**: Contenido educativo y quiz
- **Progreso**: Estadísticas de aprendizaje del usuario

### 7.2 Componentes Clave
- Navegación entre módulos
- Reproductor de video
- Visualizador de recursos
- Formulario de quiz interactivo
- Barra de progreso del curso
- Dashboard de estadísticas

---

## 8. Métricas de Éxito

### 8.1 Métricas de Adopción
- Número de usuarios registrados
- Tasa de inscripción a cursos
- Tasa de completación de cursos

### 8.2 Métricas de Engagement
- Tiempo promedio en la plataforma
- Número de módulos completados por usuario
- Promedio de intentos de quiz por módulo

### 8.3 Métricas de Calidad
- Calificaciones promedio en quizzes
- Tasa de aprobación de quizzes
- Satisfacción del usuario (por implementar)

---

## 9. Roadmap

### 9.1 Fase 1 - MVP (Versión Actual)
- ✅ Autenticación básica
- ✅ Esquema de base de datos
- ⏳ API de cursos y módulos
- ⏳ API de inscripciones
- ⏳ API de quizzes
- ⏳ API de progreso

### 9.2 Fase 2 - Mejoras
- Sistema de notificaciones
- Certificados de completación
- Búsqueda avanzada de contenido
- Recomendaciones personalizadas

### 9.3 Fase 3 - Expansión
- Foros de discusión
- Contenido generado por usuarios
- Integración con redes sociales
- Aplicación móvil nativa

---

## 10. Consideraciones Técnicas

### 10.1 Stack Tecnológico
- **Backend**: Express.js con TypeScript
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: Better Auth
- **Runtime**: Bun

### 10.2 Arquitectura
- Arquitectura MVC Layered
- Separación de responsabilidades por capas
- API RESTful

---

## 11. Glosario

- **Módulo**: Unidad básica de contenido educativo dentro de un curso
- **Quiz**: Evaluación corta al final de un módulo
- **Inscripción**: Relación entre un usuario y un curso
- **Progreso**: Porcentaje de completación de un curso
- **Recurso**: Archivo o enlace adicional asociado a un módulo
- **Pretratamiento**: Proceso inicial de purificación de agua antes del consumo

---

## 12. Referencias

- Documentación de Express.js
- Documentación de Prisma
- Documentación de Better Auth
- Estándares de API REST
- Mejores prácticas de seguridad web

---

**Última actualización:** 2025-01-09

