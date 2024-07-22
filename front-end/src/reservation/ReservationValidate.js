export function hasValidDateAndTime(reservation) {
  const date = reservation.reservation_date;
  const time = reservation.reservation_time;
  const errors = [];

  // No reservations on Tuesdays
  const day = new Date(date).getUTCDay();
  if (day === 2) {
    errors.push(new Error("Restaurant is closed on Tuesdays"));
  }
}