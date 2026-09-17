'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';

export async function lookupOrder(orderNumber: string, phone: string) {
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .select('*, order_items(*)')
    .eq('order_number', orderNumber.trim())
    .eq('shipping_phone', phone.trim())
    .maybeSingle();

  if (error || !order) {
    return { error: 'No order found with that order number and phone number.' };
  }

  return { order };
}