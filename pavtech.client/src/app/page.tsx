import React, { useState, useCallback, useEffect } from "react";
import {
    ArrowRight,
    Check,
    MapPin,
    BarChart3,
    Upload,
    Zap,
    ArrowUpRight,
    Mail,
    Phone,
    MapPinIcon,
    Clock,
    Clock3,
    Database,
    LineChart,
    Users,
    FileText,
    CheckCircle2,
    Building2,
    Landmark,
    Shield,
    FileBarChart2,
} from "lucide-react";

// Definiciones de componentes UI básicos (versiones simplificadas de shadcn/ui)
const Button = ({ children, className, asChild, size, variant }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    const sizeClasses = size === "lg" ? "h-11 px-8 py-2" : "h-10 py-2 px-4";
    const variantClasses = variant === "outline"
        ? "border border-input hover:bg-accent hover:text-accent-foreground"
        : "bg-primary text-primary-foreground hover:bg-primary/90";

    return (
        <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className || ""}`}>
            {children}
        </button>
    );
};

const Badge = ({ children, className }) => (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className || ""}`}>
        {children}
    </span>
);

const Card = ({ children, className }) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ""}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className || ""}`}>
        {children}
    </div>
);

const CardTitle = ({ children, className }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ""}`}>
        {children}
    </h3>
);

const CardDescription = ({ children, className }) => (
    <p className={`text-sm text-muted-foreground ${className || ""}`}>
        {children}
    </p>
);

const CardContent = ({ children, className }) => (
    <div className={`p-6 pt-0 ${className || ""}`}>
        {children}
    </div>
);

const CardFooter = ({ children, className }) => (
    <div className={`flex items-center p-6 pt-0 ${className || ""}`}>
        {children}
    </div>
);

const Input = ({ id, placeholder, type = "text", className }) => (
    <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    />
);

const Textarea = ({ id, placeholder, className }) => (
    <textarea
        id={id}
        placeholder={placeholder}
        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
    />
);

const Tabs = ({ children, defaultValue, className }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    return (
        <div className={`w-full ${className || ""}`} data-active-tab={activeTab}>
            {React.Children.map(children, child =>
                React.cloneElement(child, { activeTab, setActiveTab })
            )}
        </div>
    );
};

const TabsList = ({ children, className, activeTab, setActiveTab }) => (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className || ""}`}>
        {React.Children.map(children, child =>
            React.cloneElement(child, { activeTab, setActiveTab })
        )}
    </div>
);

const TabsTrigger = ({ children, value, activeTab, setActiveTab, className }) => (
    <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${activeTab === value ? 'bg-background text-foreground shadow-sm' : ''} ${className || ""}`}
        onClick={() => setActiveTab(value)}
    >
        {children}
    </button>
);

const TabsContent = ({ children, value, activeTab, className }) => (
    <div className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${activeTab === value ? 'block' : 'hidden'} ${className || ""}`}>
        {children}
    </div>
);

// Implementación simplificada para CountrySelector
const CountrySelector = ({ onCountryChange }) => (
    <div className="relative">
        <button className="flex items-center justify-between gap-1 rounded-md border px-3 py-2 text-sm">
            🇨🇱 Chile
        </button>
    </div>
);

// Datos de país simplificados
const countryData = {
    language: "es",
    basicPrice: "$99/mes",
    proPrice: "$299/mes",
    enterprisePrice: "Contactar",
    address: "Av. Providencia 1208, Santiago, Chile",
    phone: "+56 2 2345 6789",
    testimonials: [
        {
            quote: "La plataforma ha transformado nuestra forma de trabajar. Ahorramos tiempo y recursos.",
            author: "Juan Pérez",
            role: "Director de Proyectos, Constructora ABC"
        },
        {
            quote: "La precisión de los análisis es impresionante. Recomiendo PavTech a todos mis colegas.",
            author: "María González",
            role: "Ingeniera Vial, Ministerio de Obras Públicas"
        },
        {
            quote: "Excelente servicio y soporte técnico. Han sido un gran aliado en nuestros proyectos.",
            author: "Carlos López",
            role: "Gerente de Operaciones, Consultora XYZ"
        }
    ]
};

// Textos en inglés
const englishTexts = {
    features: "Features",
    benefits: "Benefits",
    solutions: "Solutions",
    pricing: "Plans",
    contact: "Contact",
    liveMap: "Live Map",
    login: "Login",
    heroTitle: "Automated Road Analysis. Millimetric Precision.",
    heroSubtitle: "GoPro video processing + IRI + Defectometry + Friction + Deflectometry in a single platform",
    requestDemo: "Request Demo",
    howItWorks: "See How It Works",
    companiesTrust: "companies trust us",
    competitiveAdvantage: "Competitive Advantage",
    transformTitle: "Transform Your Road Surveys into Competitive Advantage",
    transformSubtitle: "Your survey is just the beginning. The platform turns it into knowledge.",
    provenResults: "Proven Results",
    provenROI: "Proven ROI",
    tangibleBenefits: "Tangible benefits that transform your operation",
    metric: "Metric",
    before: "Before",
    with: "With PavTech",
    savings: "Savings",
    analysisTime: "Analysis time",
    days: "14 days",
    hours: "2 hours",
    inspectionCost: "Inspection cost",
    manualErrors: "Manual errors",
    reportDelivery: "Report delivery",
    days5: "5 days",
    instant: "Instant",
    powerfulComplete: "Powerful & Complete",
    mainFeatures: "Main Features",
    everythingYouNeed: "Everything you need for professional road analysis and management",
    specificSolutions: "Specific Solutions",
    transparentCompliance: "Transparent Compliance: When Information is Power",
    tailoredSolutions: "Solutions tailored to the specific needs of each sector",
    forConsultants: "For Road Consultants",
    forPublicAgencies: "For Public Agencies",
    simpleEfficient: "Simple & Efficient",
    howItWorksTitle: "How It Works",
    threeSimpleSteps: "Three simple steps to transform your videos into professional analysis",
    uploadVideo: "1. Upload GoPro video",
    uploadVideoDesc: "Upload your GoPro videos directly to our secure platform",
    autoProcessing: "2. Automatic processing",
    autoProcessingDesc: "Our algorithms process the video and extract all relevant data",
    analysisReports: "3. Analysis and reports",
    analysisReportsDesc: "Access detailed reports, interactive maps, and professional analysis",
    testimonials: "Testimonials",
    successCases: "Success Cases",
    leadingCompanies: "Leading companies trust PavTech for their projects",
    accuracy: "Accuracy",
    timeSavings: "Time savings",
    projects: "Projects",
    kmAnalyzed: "km analyzed",
    flexiblePlans: "Flexible Plans",
    plansTitle: "Plans",
    choosePlan: "Choose the plan that best suits your needs",
    basicPlan: "Basic Plan",
    proPlan: "Professional Plan",
    enterprisePlan: "Enterprise Plan",
    mostPopular: "Most Popular",
    startNow: "Start Today",
    readyToRevolutionize: "Ready to revolutionize your road analysis?",
    requestPersonalDemo: "Request a personalized demo and discover how PavTech can transform your projects",
    callNow: "Call now",
    requestDemoForm: "Request Demo",
    completeForm: "Complete the form and we will contact you shortly",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    company: "Company",
    message: "Message",
    sendRequest: "Send Request",
    aboutUs: "About Us",
    team: "Team",
    clients: "Clients",
    successStories: "Success Stories",
    productsServices: "Products & Services",
    roadSurvey: "Road Survey",
    videoProcessing: "Video Processing",
    dataAnalysis: "Data Analysis",
    legal: "Legal",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",
    gdprCompliance: "GDPR Compliance",
    subscribeNewsletter: "Subscribe to Newsletter",
    receiveUpdates: "Receive the latest news and offers.",
    subscribe: "Subscribe",
    certifications: "Certifications & Awards",
    internationalPresence: "International Presence",
    allRightsReserved: "All rights reserved.",
    siteMap: "Site Map",
    accessibility: "Accessibility",
    cookiePreferences: "Cookie Preferences",
    developedBy: "Developed by",
    // Características específicas
    autoVideoProcessing: "Automatic Video Processing",
    autoVideoProcessingDesc: "Convert GoPro videos into actionable data in minutes",
    iriMeasurement: "IRI Measurement Meter by Meter",
    iriMeasurementDesc: "Millimetric precision in each analyzed section",
    preciseGeolocation: "Precise GPS Geolocation",
    preciseGeolocationDesc: "Accurately locate each point of interest",
    autoReports: "Automatic Reports",
    autoReportsDesc: "Generate detailed reports with a single click",
    multiCompanyManagement: "Multi-company Management",
    multiCompanyManagementDesc: "Manage multiple projects and clients",
    realTimeDashboard: "Real-time Dashboard",
    realTimeDashboardDesc: "Visualize instantly updated data",
    // Beneficios
    operationalEfficiency: "Operational Efficiency",
    operationalEfficiencyDesc:
        "Reduces analysis time by 80%. Parallel processing of multiple videos and elimination of manual transcription errors.",
    operationalEfficiencyHighlight: "Reduces analysis time by 80%",
    totalInfoControl: "Total Information Control",
    totalInfoControlDesc:
        "Instant access from any device. Complete history by project and road with automatic historical comparisons.",
    totalInfoControlHighlight: "Intelligent centralization",
    advancedVisualization: "Advanced Visualization",
    advancedVisualizationDesc:
        "Navigate from map to frame in one click. Interactive real-time dashboards and automatic trend graphs.",
    advancedVisualizationHighlight: "Precise geolocation",
    professionalDeliverables: "Professional Deliverables",
    professionalDeliverablesDesc:
        "Export to multiple formats (Excel, KML, DWG). Compliance with international standards and certified documentation.",
    professionalDeliverablesHighlight: "Automatic PDFs",
    // Soluciones para consultoras
    digitalDelivery: "Instant Digital Delivery",
    digitalDeliveryDesc:
        "Exclusive portal for each client available 24/7 with automatic delivery confirmation and access to historical data.",
    standardizedReports: "Standardized Reports",
    standardizedReportsDesc:
        "Automatic generation of reports that comply with all contractual regulations and industry standards.",
    efficientCollaboration: "Efficient Collaboration",
    efficientCollaborationDesc:
        "Granular access by roles and projects, collaborative comments and automatic notification system.",
    totalTransparency: "Total Transparency",
    totalTransparencyDesc:
        "Complete traceability of all measurements and modifications that builds trust with your clients.",
    // Soluciones para organismos públicos
    regulatoryCompliance: "Regulatory Compliance",
    regulatoryComplianceDesc:
        "Guarantee of compliance with regulations and complete documentation for tenders and audits.",
    efficientOversight: "Efficient Oversight",
    efficientOversightDesc:
        "Direct access to data without intermediaries and automatic alerts of tolerance exceedances with photographic evidence.",
    accountability: "Accountability",
    accountabilityDesc:
        "Automatic exports for comptroller and pre-loaded KPI indicators with historical contractual compliance.",
    citizenPortal: "Citizen Portal",
    citizenPortalDesc:
        "Option of public portal for citizens that increases transparency and improves the perception of public management.",
};

// Textos en español
const spanishTexts = {
    features: "Características",
    benefits: "Beneficios",
    solutions: "Soluciones",
    pricing: "Planes",
    contact: "Contacto",
    liveMap: "Mapa en Vivo",
    login: "Iniciar Sesión",
    heroTitle: "Análisis Automático de Caminos. Precisión Milimétrica.",
    heroSubtitle: "Procesamiento de video GoPro + IRI + Defectometría + Fricción + Deflectometría en una sola plataforma",
    requestDemo: "Solicitar Demostración",
    howItWorks: "Ver Cómo Funciona",
    companiesTrust: "empresas confían en nosotros",
    competitiveAdvantage: "Ventaja Competitiva",
    transformTitle: "Transforma tus Auscultaciones en Ventaja Competitiva",
    transformSubtitle: "Tu auscultación es solo el inicio. La plataforma la convierte en conocimiento.",
    provenResults: "Resultados Comprobados",
    provenROI: "ROI Comprobado",
    tangibleBenefits: "Beneficios tangibles que transforman tu operación",
    metric: "Métrica",
    before: "Antes",
    with: "Con PavTech",
    savings: "Ahorro",
    analysisTime: "Tiempo análisis",
    days: "14 días",
    hours: "2 horas",
    inspectionCost: "Costo inspección",
    manualErrors: "Errores manuales",
    reportDelivery: "Entrega informes",
    days5: "5 días",
    instant: "Instantáneo",
    powerfulComplete: "Potente y Completo",
    mainFeatures: "Características Principales",
    everythingYouNeed: "Todo lo que necesitas para el análisis y gestión vial profesional",
    specificSolutions: "Soluciones Específicas",
    transparentCompliance: "Cumplimiento Transparente: Cuando la Información es Poder",
    tailoredSolutions: "Soluciones adaptadas a las necesidades específicas de cada sector",
    forConsultants: "Para Consultoras Viales",
    forPublicAgencies: "Para Organismos Públicos",
    simpleEfficient: "Simple y Eficiente",
    howItWorksTitle: "Cómo Funciona",
    threeSimpleSteps: "Tres simples pasos para transformar tus videos en análisis profesionales",
    uploadVideo: "1. Subir video GoPro",
    uploadVideoDesc: "Sube tus videos de GoPro directamente a nuestra plataforma segura",
    autoProcessing: "2. Procesamiento automático",
    autoProcessingDesc: "Nuestros algoritmos procesan el video y extraen todos los datos relevantes",
    analysisReports: "3. Análisis y reportes",
    analysisReportsDesc: "Accede a informes detallados, mapas interactivos y análisis profesionales",
    testimonials: "Testimonios",
    successCases: "Casos de Éxito",
    leadingCompanies: "Empresas líderes confían en PavTech para sus proyectos",
    accuracy: "Precisión",
    timeSavings: "Ahorro de tiempo",
    projects: "Proyectos",
    kmAnalyzed: "Km analizados",
    flexiblePlans: "Planes Flexibles",
    plansTitle: "Planes",
    choosePlan: "Elige el plan que mejor se adapte a tus necesidades",
    basicPlan: "Plan Básico",
    proPlan: "Plan Profesional",
    enterprisePlan: "Plan Enterprise",
    mostPopular: "Más Popular",
    startNow: "Comienza Hoy",
    readyToRevolutionize: "¿Listo para revolucionar tu análisis vial?",
    requestPersonalDemo:
        "Solicita una demostración personalizada y descubre cómo PavTech puede transformar tus proyectos",
    callNow: "Llamar ahora",
    requestDemoForm: "Solicitar Demostración",
    completeForm: "Completa el formulario y nos pondremos en contacto contigo a la brevedad",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Email",
    company: "Empresa",
    message: "Mensaje",
    sendRequest: "Enviar Solicitud",
    aboutUs: "Sobre Nosotros",
    team: "Equipo",
    clients: "Clientes",
    successStories: "Casos de Éxito",
    productsServices: "Productos y Servicios",
    roadSurvey: "Auscultación Vial",
    videoProcessing: "Procesamiento de Video",
    dataAnalysis: "Análisis de Datos",
    legal: "Legal",
    termsOfService: "Términos de Servicio",
    privacyPolicy: "Política de Privacidad",
    cookiePolicy: "Política de Cookies",
    gdprCompliance: "Cumplimiento GDPR",
    subscribeNewsletter: "Suscríbete al Newsletter",
    receiveUpdates: "Recibe las últimas novedades y ofertas.",
    subscribe: "Suscribir",
    certifications: "Certificaciones y Reconocimientos",
    internationalPresence: "Presencia Internacional",
    allRightsReserved: "Todos los derechos reservados.",
    siteMap: "Mapa del Sitio",
    accessibility: "Accesibilidad",
    cookiePreferences: "Preferencias de Cookies",
    developedBy: "Desarrollado por",
    // Características específicas
    autoVideoProcessing: "Procesamiento Automático de Videos",
    autoVideoProcessingDesc: "Convierte videos de GoPro en datos procesables en minutos",
    iriMeasurement: "Medición IRI Metro a Metro",
    iriMeasurementDesc: "Precisión milimétrica en cada tramo analizado",
    preciseGeolocation: "Geolocalización GPS Precisa",
    preciseGeolocationDesc: "Ubica con exactitud cada punto de interés",
    autoReports: "Informes Automáticos",
    autoReportsDesc: "Genera reportes detallados con un solo clic",
    multiCompanyManagement: "Gestión Multi-empresa",
    multiCompanyManagementDesc: "Administra múltiples proyectos y clientes",
    realTimeDashboard: "Dashboard en Tiempo Real",
    realTimeDashboardDesc: "Visualiza datos actualizados instantáneamente",
    // Beneficios
    operationalEfficiency: "Eficiencia Operacional",
    operationalEfficiencyDesc:
        "Reduce tiempo de análisis en 80%. Procesamiento paralelo de múltiples videos y eliminación de errores de transcripción manual.",
    operationalEfficiencyHighlight: "Reduce tiempo de análisis en 80%",
    totalInfoControl: "Control Total de Información",
    totalInfoControlDesc:
        "Acceso instantáneo desde cualquier dispositivo. Historial completo por proyecto y camino con comparativas históricas automáticas.",
    totalInfoControlHighlight: "Centralización inteligente",
    advancedVisualization: "Visualización Avanzada",
    advancedVisualizationDesc:
        "Navegación del mapa al frame en un click. Dashboards interactivos en tiempo real y gráficos de tendencias automáticos.",
    advancedVisualizationHighlight: "Geolocalización precisa",
    professionalDeliverables: "Entregables Profesionales",
    professionalDeliverablesDesc:
        "Exportación a múltiples formatos (Excel, KML, DWG). Cumplimiento de estándares internacionales y documentación certificada.",
    professionalDeliverablesHighlight: "PDFs automáticos",
    // Soluciones para consultoras
    digitalDelivery: "Entrega Digital Instantánea",
    digitalDeliveryDesc:
        "Portal exclusivo para cada cliente disponible 24/7 con confirmación automática de entrega y acceso a históricos.",
    standardizedReports: "Informes Normalizados",
    standardizedReportsDesc:
        "Generación automática de informes que cumplen con todas las normativas contractuales y estándares de la industria.",
    efficientCollaboration: "Colaboración Eficiente",
    efficientCollaborationDesc:
        "Acceso granular por roles y proyectos, comentarios colaborativos y sistema de notificaciones automáticas.",
    totalTransparency: "Transparencia Total",
    totalTransparencyDesc:
        "Trazabilidad completa de todas las mediciones y modificaciones que genera confianza en sus clientes.",
    // Soluciones para organismos públicos
    regulatoryCompliance: "Cumplimiento Normativo",
    regulatoryComplianceDesc:
        "Garantía de cumplimiento con normativas y documentación completa para licitaciones y auditorías.",
    efficientOversight: "Fiscalización Eficiente",
    efficientOversightDesc:
        "Acceso directo a datos sin intermediarios y alertas automáticas de exceso de tolerancias con evidencia fotográfica.",
    accountability: "Rendición de Cuentas",
    accountabilityDesc:
        "Exportaciones automáticas para contraloría e indicadores KPI precargados con históricos de cumplimiento contractual.",
    citizenPortal: "Portal Ciudadano",
    citizenPortalDesc:
        "Opción de portal público para ciudadanos que aumenta la transparencia y mejora la percepción de la gestión pública.",
};

// Componente de contexto simplificado
const useCountry = () => {
    return {
        country: "chile",
        data: countryData
    };
};

export default function LandingPage() {
    const { country, data } = useCountry();
    const [countryInfo, setCountryInfo] = useState(data);
    const [texts, setTexts] = useState(data.language === "en" ? englishTexts : spanishTexts);

    // Actualizar los textos cuando cambia el país
    useEffect(() => {
        setCountryInfo(data);
        setTexts(data.language === "en" ? englishTexts : spanishTexts);
    }, [data]);

    // Callback para manejar el cambio de país
    const handleCountryChange = useCallback((country, data) => {
        setCountryInfo(data);
        setTexts(data.language === "en" ? englishTexts : spanishTexts);
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header con logo más grande */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-24 items-center justify-between">
                    <div className="flex items-center">
                        <div className="relative h-28 w-80">
                            <img src="/logo-pavtech.png" alt="Pavtech Solutions" className="h-28 w-auto" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex gap-6">
                            <a href="#features" className="text-sm font-medium hover:text-primary">
                                {texts.features}
                            </a>
                            <a href="#benefits" className="text-sm font-medium hover:text-primary">
                                {texts.benefits}
                            </a>
                            <a href="#solutions" className="text-sm font-medium hover:text-primary">
                                {texts.solutions}
                            </a>
                            <a href="#pricing" className="text-sm font-medium hover:text-primary">
                                {texts.pricing}
                            </a>
                            <a href="#contact" className="text-sm font-medium hover:text-primary">
                                {texts.contact}
                            </a>
                        </nav>

                        {/* Selector de país */}
                        <CountrySelector onCountryChange={handleCountryChange} />

                        <Button className="bg-green-600 hover:bg-green-700 text-white mr-2">
                            <a href="/mapa-publico">{texts.liveMap}</a>
                        </Button>

                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                            <a href="/login">{texts.login}</a>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-12 md:py-16 lg:py-20 xl:py-32 border-b">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <Badge className="inline-flex mb-2">{texts.competitiveAdvantage}</Badge>
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                        {texts.heroTitle}
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">{texts.heroSubtitle}</p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button size="lg" className="gap-2 bg-yellow-500 hover:bg-yellow-600 text-black">
                                        {texts.requestDemo}
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="gap-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
                                    >
                                        {texts.howItWorks}
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="inline-block h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                                            >
                                                <img
                                                    src={`/generic-avatar-icon.png?key=avatar${i}`}
                                                    alt={`Avatar ${i}`}
                                                    width={32}
                                                    height={32}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        <span className="font-medium">+500</span> {texts.companiesTrust}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-primary/40 blur-xl"></div>
                                    <img
                                        src="/images/dashboard-iri-map.png"
                                        alt="IRI Road Analysis Dashboard"
                                        width={600}
                                        height={400}
                                        className="relative rounded-lg object-cover shadow-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Beneficios Clave Section */}
                <section id="benefits" className="w-full py-6 md:py-10 lg:py-16">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <Badge className="mb-2">{texts.competitiveAdvantage}</Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{texts.transformTitle}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {texts.transformSubtitle}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-4">
                            <BenefitCard
                                icon={<Clock3 className="h-10 w-10" />}
                                title={texts.operationalEfficiency}
                                description={texts.operationalEfficiencyDesc}
                                highlight={texts.operationalEfficiencyHighlight}
                            />
                            <BenefitCard
                                icon={<Database className="h-10 w-10" />}
                                title={texts.totalInfoControl}
                                description={texts.totalInfoControlDesc}
                                highlight={texts.totalInfoControlHighlight}
                            />
                            <BenefitCard
                                icon={<LineChart className="h-10 w-10" />}
                                title={texts.advancedVisualization}
                                description={texts.advancedVisualizationDesc}
                                highlight={texts.advancedVisualizationHighlight}
                            />
                            <BenefitCard
                                icon={<FileText className="h-10 w-10" />}
                                title={texts.professionalDeliverables}
                                description={texts.professionalDeliverablesDesc}
                                highlight={texts.professionalDeliverablesHighlight}
                            />
                        </div>
                    </div>
                </section>

                {/* ROI Comprobado Section */}
                <section className="w-full py-6 md:py-10 lg:py-16 bg-muted/30">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <Badge className="mb-2">{texts.provenResults}</Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{texts.provenROI}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {texts.tangibleBenefits}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto max-w-4xl mt-8">
                            <div className="overflow-hidden rounded-lg border bg-background shadow">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-muted/50">
                                            <th className="px-4 py-3 text-left text-sm font-medium">{texts.metric}</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium">{texts.before}</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium">{texts.with}</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium">{texts.savings}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="px-4 py-3 text-sm font-medium">{texts.analysisTime}</td>
                                            <td className="px-4 py-3 text-sm">{texts.days}</td>
                                            <td className="px-4 py-3 text-sm text-primary font-medium">{texts.hours}</td>
                                            <td className="px-4 py-3 text-sm font-bold">99%</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-4 py-3 text-sm font-medium">{texts.inspectionCost}</td>
                                            <td className="px-4 py-3 text-sm">$15,000</td>
                                            <td className="px-4 py-3 text-sm text-primary font-medium">$2,000</td>
                                            <td className="px-4 py-3 text-sm font-bold">87%</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-4 py-3 text-sm font-medium">{texts.manualErrors}</td>
                                            <td className="px-4 py-3 text-sm">15%</td>
                                            <td className="px-4 py-3 text-sm text-primary font-medium">0%</td>
                                            <td className="px-4 py-3 text-sm font-bold">100%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-sm font-medium">{texts.reportDelivery}</td>
                                            <td className="px-4 py-3 text-sm">{texts.days5}</td>
                                            <td className="px-4 py-3 text-sm text-primary font-medium">{texts.instant}</td>
                                            <td className="px-4 py-3 text-sm font-bold">-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full py-6 md:py-10 lg:py-16">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <Badge className="mb-2">{texts.powerfulComplete}</Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{texts.mainFeatures}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {texts.everythingYouNeed}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-3">
                            <FeatureCard
                                title={texts.autoVideoProcessing}
                                description={texts.autoVideoProcessingDesc}
                                icon={<Zap className="h-10 w-10" />}
                            />
                            <FeatureCard
                                title={texts.iriMeasurement}
                                description={texts.iriMeasurementDesc}
                                icon={<BarChart3 className="h-10 w-10" />}
                            />
                            <FeatureCard
                                title={texts.preciseGeolocation}
                                description={texts.preciseGeolocationDesc}
                                icon={<MapPin className="h-10 w-10" />}
                            />
                            <FeatureCard
                                title={texts.autoReports}
                                description={texts.autoReportsDesc}
                                icon={<BarChart3 className="h-10 w-10" />}
                            />
                            <FeatureCard
                                title={texts.multiCompanyManagement}
                                description={texts.multiCompanyManagementDesc}
                                icon={<Zap className="h-10 w-10" />}
                            />
                            <FeatureCard
                                title={texts.realTimeDashboard}
                                description={texts.realTimeDashboardDesc}
                                icon={<BarChart3 className="h-10 w-10" />}
                            />
                        </div>
                    </div>
                </section>

                {/* Soluciones por Sector Section */}
                <section id="solutions" className="w-full py-6 md:py-10 lg:py-16 bg-muted/30">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <Badge className="mb-2">{texts.specificSolutions}</Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    {texts.transparentCompliance}
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {texts.tailoredSolutions}
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto max-w-5xl mt-12">
                            <Tabs defaultValue="consultoras" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-8">
                                    <TabsTrigger value="consultoras">{texts.forConsultants}</TabsTrigger>
                                    <TabsTrigger value="organismos">{texts.forPublicAgencies}</TabsTrigger>
                                </TabsList>
                                <TabsContent value="consultoras" className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Building2 className="h-5 w-5 text-primary" />
                                                    {texts.digitalDelivery}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{texts.digitalDeliveryDesc}</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                                    {texts.standardizedReports}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{texts.standardizedReportsDesc}</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Users className="h-5 w-5 text-primary" />
                                                    {texts.efficientCollaboration}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{texts.efficientCollaborationDesc}</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <FileText className="h-5 w-5 text-primary" />
                                                    {texts.totalTransparency}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{texts.totalTransparencyDesc}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                                <TabsContent value="organismos" className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Landmark className="h-5 w-5 text-primary" />
                                                    {texts.regulatoryCompliance}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{texts.regulatoryComplianceDesc}</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Shield className="h-5 w-5 text-primary" />
                                                    {texts.efficientOversight}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{texts.efficientOversightDesc}</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <FileBarChart2 className="h-5 w-5 text-primary" />
                                                    {texts.accountability}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{texts.accountabilityDesc}</p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Users className="h-5 w-5 text-primary" />
                                                    {texts.citizenPortal}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>{texts.citizenPortalDesc}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </section>

                {/* How it Works Section */}
                <section id="how-it-works" className="w-full py-6 md:py-10 lg:py-16">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <Badge className="mb-2">{texts.simpleEfficient}</Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{texts.howItWorksTitle}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {texts.threeSimpleSteps}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-8 md:grid-cols-3">
                            <div className="relative flex flex-col items-center space-y-4 text-center">
                                <div className="absolute -z-10 top-10 left-1/2 h-0.5 w-full bg-border hidden md:block"></div>
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-background">
                                    <Upload className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">{texts.uploadVideo}</h3>
                                <p className="text-muted-foreground">{texts.uploadVideoDesc}</p>
                            </div>
                            <div className="relative flex flex-col items-center space-y-4 text-center">
                                <div className="absolute -z-10 top-10 left-1/2 h-0.5 w-full bg-border hidden md:block"></div>
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-background">
                                    <Zap className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">{texts.autoProcessing}</h3>
                                <p className="text-muted-foreground">{texts.autoProcessingDesc}</p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-background">
                                    <BarChart3 className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">{texts.analysisReports}</h3>
                                <p className="text-muted-foreground">{texts.analysisReportsDesc}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="w-full py-8 md:py-12 lg:py-16 border-y">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <Badge className="mb-2">{texts.testimonials}</Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{texts.successCases}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {texts.leadingCompanies}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 md:grid-cols-3">
                            {countryInfo.testimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={index}
                                    quote={testimonial.quote}
                                    author={testimonial.author}
                                    role={testimonial.role}
                                />
                            ))}
                        </div>
                        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                            <StatCard value="98%" label={texts.accuracy} />
                            <StatCard value="75%" label={texts.timeSavings} />
                            <StatCard value="500+" label={texts.projects} />
                            <StatCard value="10,000+" label={texts.kmAnalyzed} />
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="w-full py-8 md:py-12 lg:py-16">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <Badge className="mb-2">{texts.flexiblePlans}</Badge>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{texts.plansTitle}</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    {texts.choosePlan}
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 md:grid-cols-3">
                            <PricingCard
                                title={texts.basicPlan}
                                price={countryInfo.basicPrice}
                                features={[
                                    "Procesamiento de 100 km/mes",
                                    "Medición IRI",
                                    "Geolocalización GPS",
                                    "Informes básicos",
                                    "1 usuario",
                                ]}
                                variant="outline"
                            />
                            <PricingCard
                                title={texts.proPlan}
                                price={countryInfo.proPrice}
                                features={[
                                    "Procesamiento de 500 km/mes",
                                    "Medición IRI avanzada",
                                    "Análisis de Defectometría",
                                    "Dashboard personalizado",
                                    "5 usuarios",
                                    "Soporte prioritario",
                                ]}
                                variant="primary"
                                popular={true}
                                popularText={texts.mostPopular}
                            />
                            <PricingCard
                                title={texts.enterprisePlan}
                                price={countryInfo.enterprisePrice}
                                features={[
                                    "Procesamiento ilimitado",
                                    "Suite completa de análisis",
                                    "API integración",
                                    "Usuarios ilimitados",
                                    "Soporte 24/7",
                                    "Implementación personalizada",
                                ]}
                                variant="secondary"
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="contact" className="w-full py-8 md:py-12 lg:py-16 bg-muted/50">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <Badge className="mb-2">{texts.startNow}</Badge>
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                        {texts.readyToRevolutionize}
                                    </h2>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        {texts.requestPersonalDemo}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="gap-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                        {texts.callNow}
                                    </Button>
                                </div>
                            </div>
                            <Card className="overflow-hidden">
                                <CardHeader className="pb-0">
                                    <CardTitle>{texts.requestDemoForm}</CardTitle>
                                    <CardDescription>{texts.completeForm}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Input id="first-name" placeholder={texts.firstName} />
                                        </div>
                                        <div className="space-y-2">
                                            <Input id="last-name" placeholder={texts.lastName} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Input id="email" type="email" placeholder={texts.email} />
                                    </div>
                                    <div className="space-y-2">
                                        <Input id="company" placeholder={texts.company} />
                                    </div>
                                    <div className="space-y-2">
                                        <Textarea id="message" placeholder={texts.message} />
                                    </div>
                                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">{texts.sendRequest}</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer - Versión mejorada con más información */}
            <footer className="w-full border-t bg-background">
                <div className="container px-4 py-8 md:py-12 md:px-6">
                    {/* Sección superior del footer */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                        {/* Columna 1: Información de la empresa */}
                        <div className="space-y-4 xl:col-span-2">
                            <div className="flex items-center">
                                <div className="relative h-16 w-48">
                                    <img
                                        src="/logo-pavtech.png"
                                        alt="Pavtech Solutions"
                                        width={240}
                                        height={80}
                                        className="h-20 w-auto"
                                    />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {data.language === "en"
                                    ? "Advanced solutions for professional road survey and analysis. We offer cutting-edge technology for the evaluation, maintenance, and management of road infrastructure throughout the Americas."
                                    : "Soluciones avanzadas para la auscultación y análisis vial profesional. Ofrecemos tecnología de punta para la evaluación, mantenimiento y gestión de infraestructura vial en toda Latinoamérica."}
                            </p>

                            {/* Información de contacto */}
                            <div className="space-y-2 pt-2">
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPinIcon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <span>{countryInfo.address}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span>{countryInfo.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span>contacto@pavtech.com</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span>
                                        {data.language === "en" ? "Monday to Friday: 9:00 AM - 6:00 PM" : "Lunes a Viernes: 9:00 - 18:00"}
                                    </span>
                                </div>
                            </div>

                            {/* Redes sociales */}
                            <div className="flex gap-4 pt-2">
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                    <span className="sr-only">Facebook</span>
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2m0-2c-2.8 0-5 1.5-5 5.8 0 5 7 5.8 7 5.8s7 .9 7-5.8c0-5-5.2-5.8-5-5.8"></path>
                                    </svg>
                                    <span className="sr-only">Twitter</span>
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                    </svg>
                                    <span className="sr-only">Instagram</span>
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect width="4" height="12" x="2" y="9"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                    </svg>
                                    <span className="sr-only">YouTube</span>
                                </a>
                            </div>
                        </div>

                        {/* Columnas de enlaces - Visibles en tablet/desktop, colapsables en móvil */}
                        <div className="space-y-4 sm:space-y-0">
                            <h3 className="text-sm font-medium">{texts.aboutUs}</h3>
                            <nav className="flex flex-col space-y-2">
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.aboutUs}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.team}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.clients}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.testimonials}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.successCases}
                                </a>
                            </nav>
                        </div>

                        <div className="space-y-4 sm:space-y-0">
                            <h3 className="text-sm font-medium">{texts.productsServices}</h3>
                            <nav className="flex flex-col space-y-2">
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.features}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.plansTitle}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.roadSurvey}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.videoProcessing}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.dataAnalysis}
                                </a>
                            </nav>
                        </div>

                        <div className="space-y-4 sm:space-y-0">
                            <h3 className="text-sm font-medium">{texts.legal}</h3>
                            <nav className="flex flex-col space-y-2">
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.termsOfService}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.privacyPolicy}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.cookiePolicy}
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    {texts.gdprCompliance}
                                </a>
                            </nav>

                            {/* Newsletter */}
                            <div className="mt-6 space-y-4">
                                <h3 className="text-sm font-medium">{texts.subscribeNewsletter}</h3>
                                <p className="text-xs text-muted-foreground">{texts.receiveUpdates}</p>
                                <div className="flex gap-2">
                                    <Input placeholder={texts.email} className="h-9" />
                                    <Button size="sm" className="h-9 bg-yellow-500 hover:bg-yellow-600 text-black">
                                        {texts.subscribe}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certificaciones y Reconocimientos - Responsive */}
                    <div className="mt-8 border-t border-border pt-6">
                        <h3 className="text-sm font-medium mb-4">{texts.certifications}</h3>
                        <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-muted/30 rounded-md flex items-center justify-center">
                                    <img
                                        src="/placeholder.svg?key=cert1"
                                        alt="ISO 9001"
                                        width={40}
                                        height={40}
                                        className="h-6 w-auto sm:h-8"
                                    />
                                </div>
                                <span className="text-xs">ISO 9001</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-muted/30 rounded-md flex items-center justify-center">
                                    <img
                                        src="/placeholder.svg?key=cert2"
                                        alt="ISO 27001"
                                        width={40}
                                        height={40}
                                        className="h-6 w-auto sm:h-8"
                                    />
                                </div>
                                <span className="text-xs">ISO 27001</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-muted/30 rounded-md flex items-center justify-center">
                                    <img
                                        src="/placeholder.svg?key=cert3"
                                        alt={data.language === "en" ? "Innovation Award" : "Premio Innovación"}
                                        width={40}
                                        height={40}
                                        className="h-6 w-auto sm:h-8"
                                    />
                                </div>
                                <span className="text-xs">
                                    {data.language === "en" ? "Innovation Award 2024" : "Premio Innovación 2024"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Sección de países - Responsive */}
                    <div className="mt-6 border-t border-border pt-6">
                        <h3 className="text-sm font-medium mb-4">{texts.internationalPresence}</h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                            <a
                                href="#"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                                onClick={() => handleCountryChange("usa", countryData.usa)}
                            >
                                <div className="w-8 h-6 overflow-hidden rounded shadow-sm flex-shrink-0">
                                    <img
                                        src="/images/flag-usa.png"
                                        alt="Flag of USA"
                                        width={32}
                                        height={24}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <span>USA</span>
                            </a>
                            <a
                                href="#"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                                onClick={() => handleCountryChange("chile", countryData.chile)}
                            >
                                <div className="w-8 h-6 overflow-hidden rounded shadow-sm flex-shrink-0">
                                    <img
                                        src="/images/flag-chile.png"
                                        alt="Bandera de Chile"
                                        width={32}
                                        height={24}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <span>Chile</span>
                            </a>
                            <a
                                href="#"
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                                onClick={() => handleCountryChange("peru", countryData.peru)}
                            >
                                <div className="w-8 h-6 overflow-hidden rounded shadow-sm flex-shrink-0">
                                    <img
                                        src="/images/flag-peru.png"
                                        alt="Bandera de Perú"
                                        width={32}
                                        height={24}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <span>Perú</span>
                            </a>
                        </div>
                    </div>

                    {/* Copyright y enlaces finales - Responsive */}
                    <div className="mt-6 border-t pt-6">
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
                                <p className="text-center text-sm text-muted-foreground sm:text-left">
                                    © 2025 PavTech. {texts.allRightsReserved}
                                </p>
                                <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
                                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                        {texts.siteMap}
                                    </a>
                                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                        {texts.accessibility}
                                    </a>
                                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                        {texts.cookiePreferences}
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-2 text-center">
                                <span className="text-xs text-muted-foreground">{texts.developedBy}</span>
                                <div className="flex items-center gap-2">
                                    <div className="relative h-6 w-20">
                                        <img
                                            src="/tuidea-logo.png"
                                            alt="Tu Idea Ingeniería"
                                            width={80}
                                            height={24}
                                            className="h-full w-auto object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ title, description, icon }) {
    return (
        <Card className="flex flex-col items-center text-center h-full">
            <CardHeader>
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <div className="text-primary">{icon}</div>
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}

function BenefitCard({ title, description, icon, highlight }) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <div className="text-primary">{icon}</div>
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground mb-2">{description}</p>
                <div className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {highlight}
                </div>
            </CardContent>
        </Card>
    );
}

function TestimonialCard({ quote, author, role }) {
    return (
        <Card className="h-full">
            <CardContent className="p-6">
                <div className="flex flex-col justify-between h-full space-y-4">
                    <div className="space-y-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary"
                        >
                            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                        </svg>
                        <p className="text-muted-foreground">"{quote}"</p>
                    </div>
                    <div>
                        <p className="font-medium">{author}</p>
                        <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function StatCard({ value, label }) {
    return (
        <Card className="text-center">
            <CardContent className="p-6">
                <div className="text-3xl font-bold">{value}</div>
                <p className="text-sm text-muted-foreground">{label}</p>
            </CardContent>
        </Card>
    );
}

function PricingCard({ title, price, features, variant = "outline", popular = false, popularText = "Most Popular" }) {
    return (
        <Card className={`flex flex-col h-full ${popular ? "relative border-primary shadow-lg" : ""}`}>
            {popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-max rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {popularText}
                </div>
            )}
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-xl font-bold">{price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-2">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-primary" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                    {title === "Plan Básico" || title === "Basic Plan" ? "Start" : "Contact Us"}
                </Button>
            </CardFooter>
        </Card>
    );
}