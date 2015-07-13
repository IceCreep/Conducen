angular.module('translate', ['ionic', 'pascalprecht.translate'])
    .config(function($stateProvider, $urlRouterProvider, $translateProvider) {
        $translateProvider.translations('en', {
            choose_language_label: "Choose your language",
            ampacity_label: "Ampacity",
            voltage_drop_label: "Voltage Drop",
            conduit_fill_label: "Conduit Fill",
            copyright_label: "© General Cable. All rights reserved",
            our_brands_image: "our-brands.png"
        });
        $translateProvider.translations('es', {
            choose_language_label: "Elige el lenguaje",
            ampacity_label: "Ampacidad",
            voltage_drop_label: "Caída de Voltaje",
            conduit_fill_label: "Conduit",
            copyright_label: "© General Cable. Derechos reservados",
            our_brands_label: "Nuestras Marcas",
            our_brands_image: "localized/our-brands-es.png"
        });
        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage("en");
    });