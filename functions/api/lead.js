/**
 * Cloudflare Pages Function — POST /api/lead
 * Replace console.log with email, CRM, or Zapier hook when you go live.
 */
export async function onRequestPost({ request }) {
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('multipart/form-data')) {
      const form = await request.formData();
      const out = {};
      for (const [key, value] of form.entries()) {
        if (key === 'photo' && value && typeof value === 'object' && 'name' in value) {
          out[key] = { name: value.name, type: value.type, size: value.size };
        } else {
          out[key] = typeof value === 'string' ? value : '[binary]';
        }
      }
      // eslint-disable-next-line no-console
      console.log('[api/lead]', JSON.stringify(out, null, 2));
    } else {
      const text = await request.text();
      // eslint-disable-next-line no-console
      console.log('[api/lead] body', text);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[api/lead]', e);
  }
  return new Response(JSON.stringify({ ok: true, message: 'Received' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
