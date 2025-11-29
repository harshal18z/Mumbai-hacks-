// src/utils/response.js
function ok(res, payload = {}) {
  return res.status(200).json({ ok: true, ...payload });
}

function fail(res, message = 'Request failed', code = 400) {
  return res.status(code).json({ ok: false, message });
}

module.exports = { ok, fail };
