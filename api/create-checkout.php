<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "Step 1: PHP is running<br>";

$config_path = __DIR__ . '/square-config.php';

echo "Step 2: Looking for config at: " . htmlspecialchars($config_path) . "<br>";

if (!file_exists($config_path)) {
  echo "ERROR: square-config.php was not found.";
  exit;
}

echo "Step 3: Config file exists<br>";

$config = require $config_path;

echo "Step 4: Config file loaded<br>";

if (!is_array($config)) {
  echo "ERROR: Config file did not return an array.";
  exit;
}

if (empty($config['access_token'])) {
  echo "ERROR: Access token is empty.";
  exit;
}

echo "Step 5: Token exists, length is " . strlen($config['access_token']) . " characters<br>";
echo "Step 6: Location ID is " . htmlspecialchars($config['location_id'] ?? 'missing') . "<br>";
echo "Square config loaded";
?>
