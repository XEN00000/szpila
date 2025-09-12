// Google Apps Script kod do wklejenia w script.google.com
// Ten plik służy tylko jako instrukcja - skopiuj zawartość do Google Apps Script

function doPost(e) {
  try {
    // Pobierz dane z żądania POST
    const data = JSON.parse(e.postData.contents);
    
    // ID arkusza Google Sheets (znajdziesz w URL arkusza)
    const SHEET_ID = 'TWÓJ_SHEET_ID_TUTAJ';
    
    // Otwórz arkusz
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Jeśli to pierwszy wpis, dodaj nagłówki
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 12).setValues([[
        'Data zgłoszenia',
        'Imię',
        'Nazwisko',
        'Email',
        'Telefon',
        'Wydział',
        'Kierunek',
        'Rok studiów',
        'Diety/Alergie',
        'Pełnoletność',
        'Regulamin',
        'RODO'
      ]]);
      
      // Sformatuj nagłówki
      const headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#7cb342');
      headerRange.setFontColor('white');
    }
    
    // Dodaj nowy wiersz z danymi
    sheet.appendRow([
      data.timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.faculty,
      data.major,
      data.year,
      data.dietary,
      data.age,
      data.terms,
      data.rodo
    ]);
    
    // Opcjonalnie: wyślij email z potwierdzeniem
    // sendConfirmationEmail(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Błąd:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Opcjonalna funkcja wysyłania emaili z potwierdzeniem
function sendConfirmationEmail(data) {
  const subject = 'Potwierdzenie zgłoszenia - Wycieczka Szpilka na Mazury';
  const body = `
Cześć ${data.firstName} ${data.lastName}!

Dziękujemy za zgłoszenie na wycieczkę "Szpilka - Mazurska Przygoda".

Twoje dane:
- Imię: ${data.firstName}
- Nazwisko: ${data.lastName}
- Email: ${data.email}
- Telefon: ${data.phone}
- Wydział: ${data.faculty}
- Kierunek: ${data.major}
- Rok studiów: ${data.year}
- Diety/Alergie: ${data.dietary}

WAŻNE: Pamiętaj o wpłaceniu kwoty 449 zł na konto:
12 3456 7890 1234 5678 9012 3456
Tytuł: Szpilka - ${data.firstName} ${data.lastName}
Termin wpłaty: do 24 września 2025

Termin wycieczki: 9-12 października 2025
Lokalizacja: Mazury, OW Ostrów Pieckowski

Pozdrawiamy,
Wydziałowa Rada Samorządu WOiZ Politechniki Łódzkiej
  `;
  
  MailApp.sendEmail(data.email, subject, body);
}

// Funkcja do testowania (opcjonalna)
function testFunction() {
  const testData = {
    timestamp: new Date().toLocaleString('pl-PL'),
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan@example.com',
    phone: '123456789',
    faculty: 'WOiZ',
    major: 'Zarządzanie',
    year: '2',
    room: '2-osobowy',
    dietary: 'Brak',
    age: 'Tak',
    terms: 'Tak',
    rodo: 'Tak'
  };
  
  console.log('Test data:', testData);
}