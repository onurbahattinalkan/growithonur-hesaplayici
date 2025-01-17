<?php
// Mail atılan mesajların gösterilmesi boşsa hata mesajının yazdırılaması
if (file_exists("messages.txt")) {
    $file = fopen("messages.txt", "r");
    if ($file) {
        while (($line = fgets($file)) !== false) {
            echo nl2br($line);
        }
        fclose($file);
    } else {
        echo "<p>Mesaj bulunamadı.</p>";
    }
}
?>