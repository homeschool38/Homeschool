<?php
$config = require __DIR__ . '/../../Private/square-config.php';

if (
  empty($config['access_token']) ||
  $config['access_token'] === 'PASTE_TOKEN_IN_HOSTINGER_ONLY' ||
  $config['access_token'] === 'PASTE_YOUR_PRODUCTION_ACCESS_TOKEN_HERE'
) {
  http_response_code(500);
  echo "Square config missing token";
  exit;
}

$payload = [
  'idempotency_key' => uniqid('mmh_test_', true),
  'quick_pay' => [
    'name' => 'My Muslim Homeschool $1 Checkout Test',
    'price_money' => [
      'amount' => 100,
      'currency' => 'USD'
    ],
    'location_id' => $config['location_id']
  ],
  'checkout_options' => [
    'redirect_url' => 'https://mymuslimhomeschool.com/checkout-success.html'
  ]
];

$ch = curl_init('https://connect.squareup.com/v2/online-checkout/payment-links');

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Square-Version: 2026-05-20',
  'Authorization: Bearer ' . $config['access_token'],
  'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
  http_response_code(500);
  echo 'cURL error: ' . curl_error($ch);
  curl_close($ch);
  exit;
}

curl_close($ch);

$data = json_decode($response, true);

if ($http_code < 200 || $http_code >= 300) {
  http_response_code($http_code);
  echo '<pre>';
  echo htmlspecialchars($response);
  echo '</pre>';
  exit;
}

if (!empty($data['payment_link']['url'])) {
  header('Location: ' . $data['payment_link']['url']);
  exit;
}

http_response_code(500);
echo 'Payment link was created, but no URL was returned.';
echo '<pre>';
echo htmlspecialchars($response);
echo '</pre>';
?>
