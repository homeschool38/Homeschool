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

$catalog = [
  'bundle' => [
    'name' => 'The Complete Muslim Homeschool Bundle',
    'amount' => 3500,
    'variation_id' => 'HQZTBMUV5WIYRM7PER3KVZKW',
  ],
  'playbook' => [
    'name' => 'Morning Routine Playbook',
    'amount' => 700,
    'variation_id' => 'ZVBI2IVYG6NMFKGGTRNUX6VD',
  ],
  'workbook' => [
    'name' => 'Homeschool Reset Workbook',
    'amount' => 1500,
    'variation_id' => 'SALQCYZJDWRUC26OQQE2WYOQ',
  ],
  'scripts' => [
    'name' => 'Open & Teach: 15 Prophet Story Scripts',
    'amount' => 2000,
    'variation_id' => '77T3DEBFP77YDCU3RSJTA6AX',
  ],
  'screenfree' => [
    'name' => '100 Screen-Free Challenge Cards',
    'amount' => 999,
    'variation_id' => 'F5ZY4GB2GMO7WI6DTLUUIVEX',
  ],
];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo "Cart checkout must be submitted from the cart page.";
  exit;
}

$cart_json = $_POST['cart'] ?? '';

if (!$cart_json) {
  http_response_code(400);
  echo "Cart is empty.";
  exit;
}

$cart = json_decode($cart_json, true);

if (!is_array($cart) || count($cart) === 0) {
  http_response_code(400);
  echo "Cart is empty or invalid.";
  exit;
}

$line_items = [];
$seen = [];

foreach ($cart as $cart_item) {
  $id = isset($cart_item['id']) ? trim((string) $cart_item['id']) : '';

  if (!isset($catalog[$id])) {
    continue;
  }

  if (isset($seen[$id])) {
    continue;
  }

  $seen[$id] = true;

  $quantity = isset($cart_item['quantity']) ? (int) $cart_item['quantity'] : 1;

  if ($quantity < 1) {
    $quantity = 1;
  }

  if ($quantity > 9) {
    $quantity = 9;
  }

  $product = $catalog[$id];

  $line_items[] = [
    'name' => $product['name'],
    'quantity' => (string) $quantity,
    'catalog_object_id' => $product['variation_id'],
    'base_price_money' => [
      'amount' => $product['amount'],
      'currency' => 'USD',
    ],
  ];
}

if (count($line_items) === 0) {
  http_response_code(400);
  echo "No valid products were found in the cart.";
  exit;
}

$payload = [
  'idempotency_key' => uniqid('mmh_cart_', true),
  'order' => [
    'location_id' => $config['location_id'],
    'line_items' => $line_items,
  ],
  'checkout_options' => [
    'redirect_url' => 'https://mymuslimhomeschool.com/checkout-success.html',
    'ask_for_shipping_address' => false,
  ],
];

$ch = curl_init('https://connect.squareup.com/v2/online-checkout/payment-links');

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Square-Version: 2026-05-20',
  'Authorization: Bearer ' . $config['access_token'],
  'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
  http_response_code(500);
  echo 'cURL error: ' . htmlspecialchars(curl_error($ch));
  curl_close($ch);
  exit;
}

curl_close($ch);

$data = json_decode($response, true);

if ($http_code < 200 || $http_code >= 300) {
  http_response_code($http_code);
  echo '<h1>Square checkout error</h1>';
  echo '<p>Square did not create the checkout link.</p>';
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
