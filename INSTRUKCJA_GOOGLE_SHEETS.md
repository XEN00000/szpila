# Instrukcja integracji z Google Sheets

## Krok 1: Utwórz Google Sheets
1. Przejdź do [Google Sheets](https://sheets.google.com)
2. Utwórz nowy arkusz o nazwie "Zgłoszenia Szpilka"
3. Skopiuj ID arkusza z URL (część między `/d/` a `/edit`)
   - Przykład: `https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit`
   - ID to: `1ABC123DEF456`

## Krok 2: Utwórz Google Apps Script
1. Przejdź do [Google Apps Script](https://script.google.com)
2. Kliknij "Nowy projekt"
3. Usuń domyślny kod i wklej kod z pliku `google-apps-script.js`
4. Zamień `TWÓJ_SHEET_ID_TUTAJ` na rzeczywiste ID arkusza
5. Zapisz projekt (Ctrl+S) i nadaj mu nazwę "Szpilka Form Handler"

## Krok 3: Wdróż jako Web App
1. W Google Apps Script kliknij "Wdróż" → "Nowe wdrożenie"
2. Wybierz typ: "Aplikacja internetowa"
3. Opis: "Formularz zgłoszeń Szpilka"
4. Wykonaj jako: "Ja"
5. Kto ma dostęp: "Wszyscy"
6. Kliknij "Wdróż"
7. Skopiuj URL aplikacji internetowej

## Krok 4: Zaktualizuj kod strony
1. W pliku `script.js` znajdź linię:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
2. Zamień `YOUR_SCRIPT_ID` na rzeczywisty URL z kroku 3

## Krok 5: Testowanie
1. Wypełnij formularz na stronie
2. Sprawdź czy dane pojawiły się w Google Sheets
3. Jeśli nie działa, sprawdź logi w Google Apps Script

## Opcjonalne ulepszenia

### Automatyczne emaile z potwierdzeniem
Odkomentuj linię `sendConfirmationEmail(data);` w Google Apps Script, aby wysyłać automatyczne potwierdzenia.

### Formatowanie arkusza
Arkusz automatycznie otrzyma:
- Nagłówki kolumn
- Formatowanie (pogrubienie, kolory)
- Automatyczne dodawanie nowych wierszy

### Bezpieczeństwo
- Dane są wysyłane bezpiecznie przez HTTPS
- Google Apps Script automatycznie obsługuje autoryzację
- Arkusz jest dostępny tylko dla właściciela (chyba że udostępnisz)

## Rozwiązywanie problemów

### Błąd CORS
Używamy `mode: 'no-cors'` - to normalne, że nie otrzymujemy odpowiedzi.

### Dane nie pojawiają się w arkuszu
1. Sprawdź ID arkusza
2. Sprawdź URL Web App
3. Sprawdź logi w Google Apps Script (Wykonania)

### Błędy uprawnień
Upewnij się, że Web App jest wdrożona jako "Wszyscy" mają dostęp.