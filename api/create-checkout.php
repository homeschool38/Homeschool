<?php

$config = require __DIR__ . '/../../Private/square-config.php';

if (
    empty($config['access_token']) ||
    $config['access_token'] === 'PASTE_TOKEN_IN_HOSTINGER_ONLY' ||
    $config['access_token'] === 'PASTE_YOUR_PRODUCTION_ACCESS_TOKEN_HERE'
) {
    http_response_code(500);
    echo 'Square config missing token';
    exit;
}

if (empty($config['location_id'])) {
    http_response_code(500);
    echo 'Square config missing location ID';
    exit;
}

/*
|--------------------------------------------------------------------------
| Server-side product catalog
|--------------------------------------------------------------------------
| Prices are stored in cents.
| This file is the final authority for checkout prices.
*/
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

    /*
    |--------------------------------------------------------------------------
    | 99 Names of Allah Discovery Journal
    |--------------------------------------------------------------------------
    */

    'ar-rahman-discovery-pack' => [
        'name' => 'Ar-Raḥmān Discovery Pack',
        'amount' => 1800,
        'variation_id' => 'DPIMRPRUITF6A22QSMBBQDH6',
    ],
    'ar-rahman-child-workbook' => [
        'name' => 'Ar-Raḥmān Child Workbook',
        'amount' => 1000,
        'variation_id' => '3SEUYXOIIIPKZL74GW2JZFGJ',
    ],
    'ar-rahman-parent-guide' => [
        'name' => 'Ar-Raḥmān Parent Guide',
        'amount' => 1000,
        'variation_id' => '4T326QR2O5DFRQFJWIBFAP4M',
    ],

    'ar-rahim-discovery-pack' => [
        'name' => 'Ar-Raḥīm Discovery Pack',
        'amount' => 1800,
        'variation_id' => 'NQJIK4ETADU4C37WTJHAYUF7',
    ],
    'ar-rahim-child-workbook' => [
        'name' => 'Ar-Raḥīm Child Workbook',
        'amount' => 1000,
        'variation_id' => 'AQZXYAUT6PAETXKVLL6DYG6F',
    ],
    'ar-rahim-parent-guide' => [
        'name' => 'Ar-Raḥīm Parent Guide',
        'amount' => 1000,
        'variation_id' => 'YPUBETDZ6D4IPYXAZSV36B2U',
    ],

    'as-salam-discovery-pack' => [
        'name' => 'As-Salām Discovery Pack',
        'amount' => 1800,
        'variation_id' => 'M5U4BYKSX6XQCF5BWKOPFTN7',
    ],
    'as-salam-child-workbook' => [
        'name' => 'As-Salām Child Workbook',
        'amount' => 1000,
        'variation_id' => 'SNXSI64GRBVZVALOOOIPN3Z6',
    ],
    'as-salam-parent-guide' => [
        'name' => 'As-Salām Parent Guide',
        'amount' => 1000,
        'variation_id' => 'AQS4PUDH4XZ6FW23J35I4ZDU',
    ],

    'al-halim-discovery-pack' => [
        'name' => 'Al-Ḥalīm Discovery Pack',
        'amount' => 1800,
        'variation_id' => 'Q53SIDVNB77NLZQWUCFT3MTR',
    ],
    'al-halim-child-workbook' => [
        'name' => 'Al-Ḥalīm Child Workbook',
        'amount' => 1000,
        'variation_id' => '6D7HFBDYHDZZTAMTVPSSDKNE',
    ],
    'al-halim-parent-guide' => [
        'name' => 'Al-Ḥalīm Parent Guide',
        'amount' => 1000,
        'variation_id' => 'DXGQPS5C37HCU7YWH7NBLXEB',
    ],

    'al-latif-discovery-pack' => [
        'name' => 'Al-Laṭīf Discovery Pack',
        'amount' => 1800,
        'variation_id' => 'BVQQMNPFF5YM3E7V7QUFXGSC',
    ],
    'al-latif-child-workbook' => [
        'name' => 'Al-Laṭīf Child Workbook',
        'amount' => 1000,
        'variation_id' => 'K5NE2C6JJCZW7A66I2BEFPGD',
    ],
    'al-latif-parent-guide' => [
        'name' => 'Al-Laṭīf Parent Guide',
        'amount' => 1000,
        'variation_id' => 'U7XPESGCGIZ4VLGIJMA6I46G',
    ],

    'al-mumin-discovery-pack' => [
        'name' => 'Al-Mu’min Discovery Pack',
        'amount' => 1800,
        'variation_id' => 'TRVXC7DJVRKHNLOPG6RLDBOB',
    ],
    'al-mumin-child-workbook' => [
        'name' => 'Al-Mu’min Child Workbook',
        'amount' => 1000,
        'variation_id' => 'RVYBRMA5GRHSUQ2CU3LKPEOR',
    ],
    'al-mumin-parent-guide' => [
        'name' => 'Al-Mu’min Parent Guide',
        'amount' => 1000,
        'variation_id' => 'XJ7ECZXYVTU2DLNXBFZMPWNG',
    ],

    /*
    |--------------------------------------------------------------------------
    | Halal, Haram & Sunnah Foods
    |--------------------------------------------------------------------------
    */

    'halal-haram-sunnah-foods-child-workbook' => [
        'name' => 'Halal, Haram & Sunnah Foods - Child Workbook',
        'amount' => 800,
        'variation_id' => 'RRLY4TNLG77AG7L37T2OAKWB',
    ],
    'halal-haram-sunnah-foods-parent-guide' => [
        'name' => 'Halal, Haram & Sunnah Foods - Parent Teaching Guide',
        'amount' => 800,
        'variation_id' => 'SIDUVOOK73ZEXHOCEACPADRE',
    ],
    'halal-haram-sunnah-foods-complete-bundle' => [
        'name' => 'Halal, Haram & Sunnah Foods - Complete Bundle',
        'amount' => 1400,
        'variation_id' => 'X27ZPO22JYCXVMI33JM2AFME',
    ],

    /*
    |--------------------------------------------------------------------------
    | Dollars, Deen & Decisions
    |--------------------------------------------------------------------------
    */

    'dollars-deen-decisions-child-workbook' => [
        'name' => 'Dollars, Deen & Decisions - Child Workbook',
        'amount' => 3000,
        'variation_id' => 'H6YUSMY4N44ZRRDDPHHV4VGP',
    ],
    'dollars-deen-decisions-parent-teaching-guide' => [
        'name' => 'Dollars, Deen & Decisions - Parent Teaching Guide',
        'amount' => 3000,
        'variation_id' => '3IYJNQ32525X3ACHQ7O5PRS2',
    ],
    'dollars-deen-decisions-money-budget-game-pack' => [
        'name' => 'Dollars, Deen & Decisions - Printable Money & Budget Game Pack',
        'amount' => 2000,
        'variation_id' => '1UXDRSQ457D5O7N67VVMKJT7',
    ],
    'dollars-deen-decisions-complete-curriculum-bundle' => [
        'name' => 'Dollars, Deen & Decisions - Complete Curriculum Bundle',
        'amount' => 7000,
        'variation_id' => '4DC57B53ZDSBUWWAZGTVDJGF',
    ],
];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Cart checkout must be submitted from the cart page.';
    exit;
}

$cartJson = $_POST['cart'] ?? '';

if ($cartJson === '') {
    http_response_code(400);
    echo 'Cart is empty.';
    exit;
}

$cart = json_decode($cartJson, true);

if (!is_array($cart) || count($cart) === 0) {
    http_response_code(400);
    echo 'Cart is empty or invalid.';
    exit;
}

$lineItems = [];
$seen = [];

foreach ($cart as $cartItem) {
    $id = isset($cartItem['id'])
        ? trim((string) $cartItem['id'])
        : '';

    if ($id === '' || !isset($catalog[$id])) {
        continue;
    }

    /*
     * All current products are digital downloads.
     * Prevent duplicate quantities and accidental double-charging.
     */
    if (isset($seen[$id])) {
        continue;
    }

    $seen[$id] = true;
    $product = $catalog[$id];

    $lineItems[] = [
        'name' => $product['name'],
        'quantity' => '1',
        'catalog_object_id' => $product['variation_id'],
        'base_price_money' => [
            'amount' => $product['amount'],
            'currency' => 'USD',
        ],
    ];
}

if (count($lineItems) === 0) {
    http_response_code(400);
    echo 'No valid products were found in the cart.';
    exit;
}

$payload = [
    'idempotency_key' => bin2hex(random_bytes(16)),
    'order' => [
        'location_id' => $config['location_id'],
        'line_items' => $lineItems,
    ],
    'checkout_options' => [
        'redirect_url' => 'https://mymuslimhomeschool.com/checkout-success.html',
        'ask_for_shipping_address' => false,
    ],
];

$ch = curl_init(
    'https://connect.squareup.com/v2/online-checkout/payment-links'
);

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Square-Version: 2026-05-20',
        'Authorization: Bearer ' . $config['access_token'],
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode(
        $payload,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    ),
    CURLOPT_CONNECTTIMEOUT => 15,
    CURLOPT_TIMEOUT => 30,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
    $curlError = curl_error($ch);
    curl_close($ch);

    http_response_code(500);
    echo 'Unable to connect to Square: ' .
        htmlspecialchars($curlError, ENT_QUOTES, 'UTF-8');
    exit;
}

curl_close($ch);

$data = json_decode($response, true);

if ($httpCode < 200 || $httpCode >= 300) {
    http_response_code($httpCode);

    echo '<h1>Square checkout error</h1>';
    echo '<p>Square did not create the checkout link.</p>';
    echo '<pre>';
    echo htmlspecialchars($response, ENT_QUOTES, 'UTF-8');
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
echo htmlspecialchars($response, ENT_QUOTES, 'UTF-8');
echo '</pre>';
