export function formatDate(date: number): string {
    const currentDate = new Date(date);
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
    const year = currentDate.getFullYear();

    return `${day}.${month}.${year}`;
}

export function formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);

    // Форматируем день, месяц и год
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
    const year = date.getFullYear();

    // Форматируем часы и минуты
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Пример использования
const formattedDateTime = formatDateTime('2024-11-17T15:56:16.164832Z');
console.log(formattedDateTime); // "17.11.2024 15:56"