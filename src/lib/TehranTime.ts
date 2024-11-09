export function TehranTime(time: string | Date): string {
    // تبدیل ورودی به یک شیء تاریخ
    const date = new Date(time);
  
    // بررسی صحت تاریخ
    if (isNaN(date.getTime())) {
      return "تاریخ نامعتبر است";
    }
  
    // محاسبه زمان تهران
    const iranTime = new Date(date.getTime() + 3.5 * 60 * 60 * 1000);
  
    // استخراج اجزای تاریخ
    const persianDate = iranTime.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  
    // استخراج اجزای ساعت
    const formattedTime = iranTime.toLocaleTimeString("fa-IR", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  
    // ترکیب تاریخ و زمان و بازگرداندن به عنوان یک رشته
    return `${persianDate} - ${formattedTime}`;
  }
  