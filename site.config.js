/* Edytuj ten plik, aby zmienić treść strony. Instrukcja: ../README.md */
window.SITE_CONFIG = {
  profile: {
    name: "", // Uzupełnij imię i nazwisko lub pseudonim.
    role: "Software Developer",
    email: "kamil.qvr@gmail.com",
    location: "", // np. „Warszawa, Polska”
    collaboration: "B2B / UoP",
    availability: "Porozmawiajmy o współpracy",
    headline: ["Od embedded.", "Po automatyzację."],
    introduction: "Łączę świat embedded z podejściem DevOps. C, C++ i RTOS po jednej stronie. Python, CI/CD i automatyzacja po drugiej.",
    about: "Interesuje mnie to, co dzieje się między kodem a działającym rozwiązaniem. Od oprogramowania blisko sprzętu, przez narzędzia w Pythonie, po automatyzację procesu dostarczania. Szukam przestrzeni do tworzenia, rozwiązywania problemów i dobrej współpracy.",
    contactTitle: "Zbudujmy coś dobrego.",
    contactText: "Projekt embedded? Automatyzacja procesów? A może miejsce w Twoim zespole? Napisz — porozmawiajmy o szczegółach."
  },
  // Puste linki są widoczne jako „wkrótce”, bez przekierowania do cudzych profili.
  socials: [
    { label: "GitHub", icon: "github", url: "" },
    { label: "LinkedIn", icon: "linkedin", url: "" }
  ],
  // Wklej np. "assets/cv.pdf", aby pokazać przycisk „Pobierz CV”.
  cvUrl: "",
  expertise: [
    { number: "01", icon: "chip", title: "Embedded", subtitle: "Blisko sprzętu. Blisko problemu.", description: "Oprogramowanie w C i C++ oraz systemy czasu rzeczywistego. Obszar, w którym kod spotyka się ze sprzętem.", technologies: ["C", "C++", "RTOS"] },
    { number: "02", icon: "workflow", title: "DevOps & automatyzacja", subtitle: "Mniej ręcznej pracy. Więcej możliwości.", description: "Python, procesy CI/CD i automatyzacja powtarzalnych zadań. Narzędzia, które usprawniają codzienną pracę i dostarczanie oprogramowania.", technologies: ["Python", "CI/CD", "Automatyzacja"] }
  ],
  sections: { about: true, expertise: true, projects: true, contact: true },
  projects: [
    { title: "Projekt embedded", category: "EMBEDDED", visual: "embedded", description: "Miejsce na realizację z obszaru embedded — opis problemu, Twojej roli i zastosowanego rozwiązania.", technologies: ["C / C++", "RTOS"], image: "", url: "", repository: "", placeholder: true },
    { title: "Pipeline CI/CD", category: "DEVOPS", visual: "pipeline", description: "Miejsce na projekt związany z budowaniem, testowaniem i dostarczaniem oprogramowania.", technologies: ["CI/CD", "Python"], image: "", url: "", repository: "", placeholder: true },
    { title: "Automatyzacja w Pythonie", category: "AUTOMATYZACJA", visual: "python", description: "Miejsce na narzędzie lub skrypt, który usprawnia proces i ogranicza powtarzalną pracę.", technologies: ["Python", "Automatyzacja"], image: "", url: "", repository: "", placeholder: true }
  ]
};
