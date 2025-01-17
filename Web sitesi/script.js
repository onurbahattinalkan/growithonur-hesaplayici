document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // İdeal Kilo Hesaplayıcı
    const idealKiloForm = document.getElementById('ideal-kilo-form');
    if (idealKiloForm) {
        idealKiloForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Formun varsayılan gönderimini engelleme kısmı

            const boy = document.getElementById('boy').value;
            const kilo = document.getElementById('kilo').value;
            const cinsiyet = document.getElementById('cinsiyet').value;

            if (!boy || !kilo || !cinsiyet) {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }

            if (boy < 100 || boy > 230) {
                alert('Boy 100 cm ile 230 cm arasında olmalıdır.');
                return;
            }

            if (kilo < 10 || kilo > 300) {
                alert('Kilo 10 kg ile 300 kg arasında olmalıdır.');
                return;
            }

            // İdeal kilo hesaplama 
            let idealKilo;
            if (cinsiyet === 'erkek') {
                idealKilo = 50 + 0.91 * (boy - 152.4);
            } else {
                idealKilo = 45.5 + 0.91 * (boy - 152.4);
            }

            // Sonucu göster
            const resultDiv = document.getElementById('ideal-kilo-result');
            resultDiv.textContent = `İdeal Kilonuz: ${idealKilo.toFixed(2)} kg`;
        });
    }

    // Yağ Oranı Hesaplayıcı
    const yagOraniForm = document.getElementById('yag-orani-form');
    const cinsiyetSelect = document.getElementById('cinsiyet');
    const kalcaCevresiContainer = document.getElementById('kalca-cevresi-container');

    if (cinsiyetSelect) { // cinsiyet seçimi kadın ise kalça çevresini de istesin
        cinsiyetSelect.addEventListener('change', () => {
            if (cinsiyetSelect.value === 'kadin') {
                kalcaCevresiContainer.style.display = 'block';
            } else {
                kalcaCevresiContainer.style.display = 'none';
            }
        });
    }

    if (yagOraniForm) {
        yagOraniForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Formun varsayılan gönderimini engelle

            const cinsiyet = document.getElementById('cinsiyet').value;
            const boy = document.getElementById('boy').value / 2.54; // cm yi inçe çevirme
            const boyunCevresi = document.getElementById('boyun-cevresi').value / 2.54; // cm yi inçe çevirme
            const belCevresi = document.getElementById('bel-cevresi').value / 2.54; // cm yi inçe çevirme

            if (!cinsiyet || !boy || !boyunCevresi || !belCevresi) {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }

            if (boy < 100 / 2.54 || boy > 230 / 2.54) {
                alert('Boy 100 cm ile 230 cm arasında olmalıdır.');
                return;
            }

            if (boyunCevresi < 15 / 2.54 || boyunCevresi > 70 / 2.54) {
                alert('Boyun çevresi 15 cm ile 70 cm arasında olmalıdır.');
                return;
            }

            if (belCevresi < 30 / 2.54 || belCevresi > 250 / 2.54) {
                alert('Bel çevresi 30 cm ile 250 cm arasında olmalıdır.');
                return;
            }

            // Yağ oranı hesaplama (Navy BF Calculator formülünü kullandım)
            let yagOrani;
            if (cinsiyet === 'erkek') {
                yagOrani = 86.010 * Math.log10(belCevresi - boyunCevresi) - 70.041 * Math.log10(boy) + 36.76;
            } else {
                const kalcaCevresi = document.getElementById('kalca-cevresi').value / 2.54; // cm yi inçe çevirme
                if (!kalcaCevresi) {
                    alert('Lütfen kalça çevresini de doldurun.');
                    return;
                }

                if (kalcaCevresi < 30 / 2.54 || kalcaCevresi > 250 / 2.54) {
                    alert('Kalça çevresi 30 cm ile 250 cm arasında olmalıdır.');
                    return;
                }

                yagOrani = 163.205 * Math.log10(belCevresi + kalcaCevresi - boyunCevresi) - 97.684 * Math.log10(boy) - 78.387;
            }

            // Sonucu göster
            const resultDiv = document.getElementById('yag-orani-result');
            resultDiv.textContent = `Yağ Oranınız: ${Math.round(yagOrani)}%`;
        });
    }

    // Günlük Kalori Hesaplayıcı
    const gunlukKaloriForm = document.getElementById('gunluk-kalori-form');
    if (gunlukKaloriForm) {
        gunlukKaloriForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Formun varsayılan gönderimini engelle

            const kilo = document.getElementById('kg').value;
            const yagOrani = document.getElementById('yag-orani').value;
            const aktiviteSeviyesi = document.getElementById('aktivite-seviyesi').value;

            if (!kilo || !yagOrani || !aktiviteSeviyesi) {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }

            if (kilo < 10 || kilo > 300) {
                alert('Kilo 10 kg ile 300 kg arasında olmalıdır.');
                return;
            }

            // Yağsız vücut kütlesi hesaplama
            const yagOraniYuzde = yagOrani / 100;
            const yagSizVucutKutlesi = kilo * (1 - yagOraniYuzde);

            // BMR hesaplama (Katch-McArdle formülünü kullandım)
            const bmr = 370 + (21.6 * yagSizVucutKutlesi);

            // TDEE hesaplama
            let gunlukKalori;
            if (aktiviteSeviyesi === 'hareketsiz') {
                gunlukKalori = bmr * 1.2;
            } else if (aktiviteSeviyesi === 'hafif-aktif') {
                gunlukKalori = bmr * 1.375;
            } else if (aktiviteSeviyesi === 'orta-aktif') {
                gunlukKalori = bmr * 1.55;
            } else if (aktiviteSeviyesi === 'cok-aktif') {
                gunlukKalori = bmr * 1.725;
            } else if (aktiviteSeviyesi === 'asiri-aktif') {
                gunlukKalori = bmr * 1.9;
            }

            // Yağ yakımı ve kilo alma başlangıç kalorileri
            const yagYakimiKalori = gunlukKalori - 500;
            const kiloAlmaKalori = gunlukKalori + 500;

            // Sonucu göster
            const resultDiv = document.getElementById('gunluk-kalori-result');
            resultDiv.innerHTML = `
                <p>BMR: ${Math.round(bmr)} kalori</p>
                <p>Günlük Kalori İhtiyacınız: ${Math.round(gunlukKalori)} kalori</p>
                <p>Yağ Yakımı Başlangıç Kalorisi: ${Math.round(yagYakimiKalori)} kalori</p>
                <p>Kilo Alma Başlangıç Kalorisi: ${Math.round(kiloAlmaKalori)} kalori</p>
            `;
        });
    }
});