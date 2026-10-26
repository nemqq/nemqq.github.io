# Portfolio developera

Ciemna, responsywna wizytówka z fioletowym akcentem: embedded (C, C++, RTOS), DevOps, Python, CI/CD i automatyzacja. Czysty HTML, CSS i JavaScript — bez instalowania zależności i bez procesu budowania.

## Podgląd lokalny

Po zainstalowaniu Node.js uruchom w tym katalogu:

```sh
npm run dev
```

Otwórz `http://127.0.0.1:4173`. Zmiany zobaczysz po odświeżeniu. Można też otworzyć bezpośrednio `dist/index.html`; kopiowanie do schowka zależy wtedy od uprawnień przeglądarki.

## Gdzie zmieniać treść

Edytuj **`dist/site.config.js`**. Strona sama generuje specjalizacje, karty projektów i sociale. Plik zawiera komentarze i przykładowe wartości.

| Pole | Zastosowanie |
| --- | --- |
| `profile.name` | Imię i nazwisko / pseudonim. Puste pole wyświetla „Software Developer”. |
| `profile.email` | Adres przy kontakcie, mailto i kopiowaniu. |
| `profile.headline` | Linie głównego nagłówka. |
| `profile.introduction`, `profile.about` | Opis w nagłówku i sekcji „O mnie”. |
| `profile.location` | Lokalizacja. Pusta nie jest pokazywana. |
| `profile.collaboration`, `profile.availability` | Formy i komunikat współpracy. |
| `socials` | Linki do GitHuba, LinkedIna lub kolejnych profili. Puste URL-e mają oznaczenie „wkrótce”. |
| `cvUrl` | Ścieżka do CV, np. `assets/cv.pdf`. Pusta ukrywa przycisk. |
| `expertise` | Dowolna liczba specjalizacji i ich technologie. |
| `sections` | `false` ukrywa daną sekcję i prowadzące do niej linki. |
| `projects` | Dowolna liczba projektów. |

Wstawiaj adresy sociali i projektów w postaci `https://...`. Dla obrazów oraz CV można używać również ścieżek względnych. Dane konfiguracji są publiczne — nie wpisuj tam kluczy ani haseł.

## Dodanie projektu

Skopiuj obiekt w tablicy `projects` i uzupełnij:

```js
{
  title: "Nazwa Twojego projektu",
  category: "EMBEDDED",
  visual: "embedded", // embedded, pipeline lub python — schemat zamiast zdjęcia
  description: "Problem, Twoja rola, rozwiązanie i rezultat.",
  technologies: ["C++", "RTOS"],
  image: "assets/moj-projekt.webp", // lub "", aby zachować schemat CSS
  imageAlt: "Opis widoku projektu",
  url: "https://example.com",
  repository: "https://github.com/twoj-profil/twoj-projekt",
  placeholder: false,
  visible: true
}
```

Umieść obraz w `dist/assets/` (utwórz ten katalog). Linki do strony i repozytorium pojawiają się po uzupełnieniu URL-a. Brak obrazka pozostawia schemat CSS. `placeholder: true` oznacza kartę jako miejsce na przyszły projekt; `visible: false` ukrywa ją. Obecne trzy karty są wyłącznie szablonami, nie gotowymi realizacjami.

## Wygląd i rozbudowa

- `dist/styles.css`: kolory w `:root`, typografia, responsywność i schematy CSS.
- `dist/index.html`: układ sekcji, podstawowe metadane SEO i treść zastępcza bez JavaScript.
- `dist/app.js`: renderowanie konfiguracji, projekty, menu mobilne i kopiowanie maila.
- `dist/favicon.svg`: ikona przeglądarki.

Fonty DM Sans i Space Grotesk są pobierane z Google Fonts; bez połączenia strona korzysta z fontów systemowych. Nie ma analityki, formularza zbierającego dane ani backendu. E-mail otwiera program pocztowy odwiedzającego.

Po zmianie nazwiska lub specjalizacji zaktualizuj też opis SEO i metadane w `index.html`. Nową sekcję dodaje się w HTML i CSS; najczęściej zmieniane listy i treści są w konfiguracji.

## Weryfikacja i publikacja

```sh
npm run check
```

Do dowolnego hostingu statycznego wystarczy zawartość `dist/`. Manifest Sites znajduje się w `.openai/hosting.json`. Edycja plików lokalnych nie aktualizuje automatycznie opublikowanej wersji — po zmianach opublikuj ją ponownie.
