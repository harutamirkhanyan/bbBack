export default function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.stack || err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
}
