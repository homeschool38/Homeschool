<?php
$config = require __DIR__ . '/square-config.php';

if (
  empty($config['access_token']) ||
  $config['access_token'] === 'PASTE_TOKEN_IN_HOSTINGER_ONLY' ||
  $config['access_token'] === 'PASTE_YOUR_PRODUCTION_ACCESS_TOKEN_HERE'
) {
  http_response_code(500);
  echo "Square config missing token";
  exit;
}

echo "Square config loaded";
?>
