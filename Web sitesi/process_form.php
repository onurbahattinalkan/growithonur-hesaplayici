<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];

    // Verilerin bir dosyaya kaydedilmesi
    $file = fopen("messages.txt", "a");
    fwrite($file, "Ad: $first_name\nSoyad: $last_name\nEmail: $email\nYorum: $comment\n---\n");
    fclose($file);

    echo "Mesajınız başarıyla gönderildi.";
}
?>