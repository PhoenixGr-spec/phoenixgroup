<?php
// Твой секретный токен и ID (теперь они в безопасности на сервере)
$token = "8538881535:AAG-2Q2ONQ6ozFdfmSk-DbWvbFSIdnHc7qE";
$chat_id = "6765147268";

// Получаем данные из POST-запроса от сайта
$input = json_decode(file_get_contents('php://input'), true);

if ($input) {
    $name = htmlspecialchars($input['name']);
    $phone = htmlspecialchars($input['phone']);
    $message = htmlspecialchars($input['message']);

    $text = "🚀 Новая заявка!\n👤 Имя: $name\n📞 Тел: $phone\n💬 Сообщение: $message";

    $url = "https://api.telegram.org/bot$token/sendMessage";
    
    $data = [
        'chat_id' => $chat_id,
        'text' => $text
    ];

    // Отправляем запрос в Telegram через cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
}
?>