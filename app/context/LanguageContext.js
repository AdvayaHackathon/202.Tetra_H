'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const languages = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano'
};

const initialTranslations = {
    en: {
        home: 'Home',
        popularDestinations: 'Make a trip',
        aboutUs: 'About Us',
        searchPlaceholder: 'Search destinations...',
        search: 'Search',
        noResults: 'No destinations found matching your filters.',
        loading: 'Loading...',
        appName: 'App Name',
        tagline: 'Pack Your Bags, We\'ve Got The Plan !',
        startPlanning: 'Start Planning',
        // Tag translations
        summer: 'Summer',
        beach: 'Beach',
        cultural: 'Cultural',
        historical: 'Historical',
        adventurous: 'Adventurous',
        natural: 'Natural',
        architectural: 'Architectural',
        scenic: 'Scenic',
        romantic: 'Romantic',
        party: 'Party',
        relaxation: 'Relaxation',
        religious: 'Religious',
        urban: 'Urban',
        entertainment: 'Entertainment',
        mystery: 'Mystery',
        luxury: 'Luxury',
        wildlife: 'Wildlife',
        ancient: 'Ancient',
        archaeological: 'Archaeological',
        family: 'Family',
        educational: 'Educational',
        'fairy-tale': 'Fairy Tale',
        wine: 'Wine',
        winter: 'Winter',
        nature: 'Nature',
        spiritual: 'Spiritual',
        mountain: 'Mountain',
        'road trip': 'Road Trip',
        musical: 'Musical',
        movie: 'Movie',
        fantasy: 'Fantasy',
        International: 'International',
        National: 'National'
    },
    es: {
        home: 'Inicio',
        popularDestinations: 'Hacer un viaje',
        aboutUs: 'Sobre Nosotros',
        searchPlaceholder: 'Buscar destinos...',
        search: 'Buscar',
        noResults: 'No se encontraron destinos que coincidan con tus filtros.',
        loading: 'Cargando...',
        appName: 'Nombre de la App',
        tagline: '¡Haz las maletas, tenemos el plan!',
        startPlanning: 'Comenzar a Planificar',
        // Tag translations
        summer: 'Verano',
        beach: 'Playa',
        cultural: 'Cultural',
        historical: 'Histórico',
        adventurous: 'Aventurero',
        natural: 'Natural',
        architectural: 'Arquitectónico',
        scenic: 'Paisajístico',
        romantic: 'Romántico',
        party: 'Fiesta',
        relaxation: 'Relajación',
        religious: 'Religioso',
        urban: 'Urbano',
        entertainment: 'Entretenimiento',
        mystery: 'Misterio',
        luxury: 'Lujo',
        wildlife: 'Vida Silvestre',
        ancient: 'Antiguo',
        archaeological: 'Arqueológico',
        family: 'Familiar',
        educational: 'Educativo',
        'fairy-tale': 'Cuento de Hadas',
        wine: 'Vino',
        winter: 'Invierno',
        nature: 'Naturaleza',
        spiritual: 'Espiritual',
        mountain: 'Montaña',
        'road trip': 'Viaje por Carretera',
        musical: 'Musical',
        movie: 'Película',
        fantasy: 'Fantasía',
        International: 'Internacional',
        National: 'Nacional'
    },
    fr: {
        home: 'Accueil',
        popularDestinations: 'Faire un voyage',
        aboutUs: 'À Propos',
        searchPlaceholder: 'Rechercher des destinations...',
        search: 'Rechercher',
        noResults: 'Aucune destination trouvée correspondant à vos filtres.',
        loading: 'Chargement...',
        appName: 'Nom de l\'App',
        tagline: 'Faites vos valises, nous avons le plan !',
        startPlanning: 'Commencer à Planifier',
        // Tag translations
        summer: 'Été',
        beach: 'Plage',
        cultural: 'Culturel',
        historical: 'Historique',
        adventurous: 'Aventureux',
        natural: 'Naturel',
        architectural: 'Architectural',
        scenic: 'Pittoresque',
        romantic: 'Romantique',
        party: 'Fête',
        relaxation: 'Détente',
        religious: 'Religieux',
        urban: 'Urbain',
        entertainment: 'Divertissement',
        mystery: 'Mystère',
        luxury: 'Luxe',
        wildlife: 'Faune',
        ancient: 'Ancien',
        archaeological: 'Archéologique',
        family: 'Familial',
        educational: 'Éducatif',
        'fairy-tale': 'Conte de Fées',
        wine: 'Vin',
        winter: 'Hiver',
        nature: 'Nature',
        spiritual: 'Spirituel',
        mountain: 'Montagne',
        'road trip': 'Road Trip',
        musical: 'Musical',
        movie: 'Film',
        fantasy: 'Fantaisie'
    },
    de: {
        home: 'Startseite',
        popularDestinations: 'Eine Reise machen',
        aboutUs: 'Über Uns',
        searchPlaceholder: 'Ziele suchen...',
        search: 'Suchen',
        noResults: 'Keine Ziele gefunden, die Ihren Filtern entsprechen.',
        loading: 'Laden...',
        appName: 'App Name',
        tagline: 'Packen Sie Ihre Koffer, wir haben den Plan!',
        startPlanning: 'Planung Starten',
        // Tag translations
        summer: 'Sommer',
        beach: 'Strand',
        cultural: 'Kulturell',
        historical: 'Historisch',
        adventurous: 'Abenteuerlich',
        natural: 'Natürlich',
        architectural: 'Architektonisch',
        scenic: 'Landschaftlich',
        romantic: 'Romantisch',
        party: 'Party',
        relaxation: 'Entspannung',
        religious: 'Religiös',
        urban: 'Städtisch',
        entertainment: 'Unterhaltung',
        mystery: 'Geheimnisvoll',
        luxury: 'Luxus',
        wildlife: 'Wildtiere',
        ancient: 'Antik',
        archaeological: 'Archäologisch',
        family: 'Familie',
        educational: 'Bildung',
        'fairy-tale': 'Märchen',
        wine: 'Wein',
        winter: 'Winter',
        nature: 'Natur',
        spiritual: 'Spirituell',
        mountain: 'Berg',
        'road trip': 'Road Trip',
        musical: 'Musikalisch',
        movie: 'Film',
        fantasy: 'Fantasy',
        International: 'International',
        National: 'National'
    },
    it: {
        home: 'Home',
        popularDestinations: 'Fare un viaggio',
        aboutUs: 'Chi Siamo',
        searchPlaceholder: 'Cerca destinazioni...',
        search: 'Cerca',
        noResults: 'Nessuna destinazione trovata corrispondente ai tuoi filtri.',
        loading: 'Caricamento...',
        appName: 'Nome App',
        tagline: 'Fai le valigie, abbiamo il piano!',
        startPlanning: 'Inizia a Pianificare',
        // Tag translations
        summer: 'Estate',
        beach: 'Spiaggia',
        cultural: 'Culturale',
        historical: 'Storico',
        adventurous: 'Avventuroso',
        natural: 'Naturale',
        architectural: 'Architettonico',
        scenic: 'Panoramico',
        romantic: 'Romantico',
        party: 'Festa',
        relaxation: 'Rilassamento',
        religious: 'Religioso',
        urban: 'Urbano',
        entertainment: 'Intrattenimento',
        mystery: 'Mistero',
        luxury: 'Lusso',
        wildlife: 'Fauna Selvatica',
        ancient: 'Antico',
        archaeological: 'Archeologico',
        family: 'Famiglia',
        educational: 'Educativo',
        'fairy-tale': 'Fiaba',
        wine: 'Vino',
        winter: 'Inverno',
        nature: 'Natura',
        spiritual: 'Spirituale',
        mountain: 'Montagna',
        'road trip': 'Road Trip',
        musical: 'Musical',
        movie: 'Film',
        fantasy: 'Fantasia'
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');
    const [translations, setTranslations] = useState(initialTranslations.en);

    useEffect(() => {
        // Load saved language preference from localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && languages[savedLanguage]) {
            setLanguage(savedLanguage);
            setTranslations(initialTranslations[savedLanguage]);
        }
    }, []);

    const changeLanguage = (newLanguage) => {
        if (languages[newLanguage]) {
            setLanguage(newLanguage);
            setTranslations(initialTranslations[newLanguage]);
            localStorage.setItem('language', newLanguage);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
} 