import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly TIRADAS_KEY = 'tarot_tiradas_count';
  private readonly PAID_KEY = 'tarot_paid_session';
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * Obtiene el número de tiradas realizadas
   */
  getTiradasCount(): number {
    const count = localStorage.getItem(this.TIRADAS_KEY);
    const result = count ? parseInt(count, 10) : 0;
    console.log('[PaymentService] getTiradasCount:', result, '| raw:', count);
    return result;
  }

  /**
   * Incrementa el contador de tiradas
   */
  incrementTiradas(): void {
    const currentCount = this.getTiradasCount();
    const newCount = currentCount + 1;
    localStorage.setItem(this.TIRADAS_KEY, String(newCount));
    console.log('[PaymentService] incrementTiradas: de', currentCount, 'a', newCount);
  }

  /**
   * Verifica si es la primera tirada (gratis)
   */
  isFirstTirada(): boolean {
    const result = this.getTiradasCount() === 0;
    console.log('[PaymentService] isFirstTirada:', result);
    return result;
  }

  /**
   * Verifica si necesita pagar (segunda tirada en adelante)
   */
  needsPayment(): boolean {
    const isFirst = this.isFirstTirada();
    const hasPaid = this.hasPaidCurrentSession();
    const result = !isFirst && !hasPaid;
    console.log('[PaymentService] needsPayment:', result, '| isFirst:', isFirst, '| hasPaid:', hasPaid);
    return result;
  }

  /**
   * Marca la sesión actual como pagada
   */
  markAsPaid(): void {
    localStorage.setItem(this.PAID_KEY, 'true');
  }

  /**
   * Verifica si ya pagó en la sesión actual
   */
  hasPaidCurrentSession(): boolean {
    return localStorage.getItem(this.PAID_KEY) === 'true';
  }

  /**
   * Limpia el estado de pago para una nueva tirada
   */
  clearPaidSession(): void {
    localStorage.removeItem(this.PAID_KEY);
  }

  /**
   * Crea una orden de pago en Mercado Pago
   */
  createPaymentOrder(): Observable<any> {
    return this.http.post(`${this.apiUrl}create-order`, {});
  }

  /**
   * Resetea todo (para testing)
   */
  resetAll(): void {
    localStorage.removeItem(this.TIRADAS_KEY);
    localStorage.removeItem(this.PAID_KEY);
  }
}
