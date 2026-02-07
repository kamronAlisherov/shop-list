 // Telegram fullscreen
    if (window.Telegram?.WebApp) {
      Telegram.WebApp.ready();
      Telegram.WebApp.expand();
    }

  
/**************** TELEGRAM SOZLAMALARI ****************/

const TG_TOKEN = "8137282183:AAEldZgm7SGWp4fGDDejZBJZ_hFidtmueVo";
const TG_CHAT_ID = "7050310480";



// ====== Global o'zgaruvchilar ======
let favorites = [];
let cart = [];
let orders = [];
let currentUser = JSON.parse(localStorage.getItem('m_user')) || null;

// ====== Til lug'ati ======
const translations = {
    uz: {
        logo: "Maktab Market",
        welcome: "Xush kelibsiz!",
        register_form: "Davom etish uchun ismingiz va raqamingizni kiriting",
        enter: "Kirish",
        toCart: "Savatga qo'shish",
        cartTitle: "Savat",
        total: "Jami",
        order: "Buyurtma berish",
        favorites: "Sevimlilar",
        orders: "Buyurtmalar",
        no_orders: "Buyurtmalar yo'q",
        katalog: "Katalog",
        search_placeholder: "Qidirish...",
        feedback_title: "Fikringizni qoldiring",
        feedback_placeholder: "Xabaringizni bu yerga yozing...",
        send: "Yuborish",
        login_label: "Kirish",
        // Kategoriya tugmalari
        all: "Hammasi",
        clothes: "Kiyimlar",
        sumka: "Sumkalar",
        books: "Kitoblar",
        notebooks: "Daftarlar",
        pens: "Ruchkalar",
        electronics: "Elektronika"
    },
    ru: {
        logo: "Школьный Маркет",
        welcome: "Добро пожаловать!",
        register_form: "Введите имя и номер, чтобы продолжить",
        enter: "Войти",
        toCart: "Добавить в корзину",
        cartTitle: "Корзина",
        total: "Итого",
        order: "Оформить заказ",
        favorites: "Избранное",
        orders: "Заказы",
        no_orders: "Нет заказов",
        katalog: "Каталог",
        search_placeholder: "Поиск...",
        feedback_title: "Оставьте отзыв",
        feedback_placeholder: "Напишите сообщение здесь...",
        send: "Отправить",
        login_label: "Войти",
        // Kategoriya tugmalari
        all: "Все",
        clothes: "Одежда",
        sumka: "Сумки",
        books: "Книги",
        notebooks: "Блокноты",
        pens: "Ручки",
        electronics: "Электроника"
    }
};


// ====== Mahsulotlar arrayi (100 ta mahsulot) ======
const products = [
  //sumka
  { name: "Сумка барсетка LACOSTE", img: "https://avatars.mds.yandex.net/get-mpic/16567947/2a00000198a035af72b048eea8cd4d25a4a6/optimize", category: "", price: 104000, description: "" },
  { name: "Ryukzak noutbuk uchun, sayohat, maktab, ish uchun, USB portli va suv o'tkazmaydigan, sport uchun", img: "https://avatars.mds.yandex.net/get-mpic/15431543/2a0000019b40737f23e3b76f9f9b98a588f6/optimize", category: "sumka", price: 171000, description: "" },
  { name: "Jordan 23 sport ryukzagi, qora, maktab va mashg‘ulotlar uchun", img: "https://avatars.mds.yandex.net/get-mpic/15431543/2a0000019b404871130e2b60cfc753df2975/900x1200", category: "sumka", price: 155000, description: "" },
  { name: "Sport sayohat sumkasi katta va fitness ryukzaki", img: "	https://avatars.mds.yandex.net/get-mpic/13480750/2a00000195b1f9d0b02a13c2f690c31c6253/optimize", category: "sumka", price: 114000, description: "" },
  { name: "Sayohat sumkasi, mato, katta o'lchamli, ko'p qirrali, transformator sumkasi", img: "https://avatars.mds.yandex.net/get-mpic/16464876/2a0000019ba4434cd959dbe930a8933a7544/120x160", category: "sumka", price: 113000, description: "" },
  { name: "EKO-kojadan zamonaviy sumka", img: "https://avatars.mds.yandex.net/get-mpic/16582226/2a0000019b241b95ef96b20d413c1709ef0d/optimize", category: "sumka", price:132000, description: "" },
  { name: "Sumka messenger erkaklar uchun, yelka orqali, kundalik, telefon uchun, shahar, zamonaviy uslubda", img: "https://avatars.mds.yandex.net/get-mpic/11465226/2a0000019ae840b5319f1bd1b9529ebee98d/optimize", category: "sumka", price: 85000, description: "" },
  { name: "Ayollar sumkasi, kichik elkama-sumka, telefon sumkasi, kross body, klath", img: "https://avatars.mds.yandex.net/get-mpic/15462703/2a000001973fd67563b4a27e27ddc3e3bed0/optimize", category: "sumka", price: 85000, description: "" },
  { name: "Qulay yelkaga tashlanadigan sumkalar — rukzakdek qulay, stilga ega !", img: "https://avatars.mds.yandex.net/get-mpic/16699368/2a0000019a266f7be15898e3815ac659b5d6/optimize", category: "sumka", price: 50000, description: "" },
  { name: "Qizlar uchun sumkalar, yelka orqali", img: "https://avatars.mds.yandex.net/get-mpic/16488168/2a000001993f60a5a6ee08ef2ac9f04d67ac/optimize", category: "sumka", price: 65000, description: "" },
 
 //kitoblar
  { name: "Stiv Jobs, Uolter Ayzekson, Asaxiy books nashriyoti tomonidan chiqarilgan kitob", img: "https://avatars.mds.yandex.net/get-mpic/5239537/2a00000197dfdf030e9a7db89b51d5cc0c73/optimize", category: "Kitoblar", price: 135800, description: "." },
  { name: "Men – Fatih Duman Vaziyatlarga qarshi borgan insonning hikoyasi", img: "https://avatars.mds.yandex.net/get-mpic/16289161/2a00000199c9ed095a76c7533dbbb4a8bd06/optimize", category: "Kitoblar", price: 35000, description: "" },
  { name: "Kitob, Odam bo‘lish qiyin", img: "https://avatars.mds.yandex.net/get-mpic/12369201/2a0000019a067d54591b2f8a9c2f9f5e00c4/optimize", category: "Kitoblar", price: 25000, description: "" },
  { name: "Sohangizda 1-raqam(li) bo‘lishni istaysizmi, Igor Mann", img: "https://avatars.mds.yandex.net/get-mpic/16289161/2a0000019b5f3f56551cdca8e018a200e2c9/optimize", category: "Kitoblar", price: 60000, description: "" },
  { name: "Vi ne znayete JS. Asinxronnaya obrabotka i optimizatsiya. Kayl Simpson", img: "https://avatars.mds.yandex.net/get-mpic/12217350/2a00000199c4db4b572e982451cd0fdffa83/optimize", category: "Kitoblar", price: 90000, description: "" },
  { name: "ELS English Language Studies: English Through Reading", img: "https://avatars.mds.yandex.net/get-mpic/14331402/2a0000019948c1fab33de2876f4ade99ba64/optimize", category: "Kitoblar", price: 24000, description: "" },
  { name: "48 Zakonov vlasti", img: "https://avatars.mds.yandex.net/get-mpic/10231887/2a000001969af07ba32fbf8654f5887180ab/optimize", category: "Kitoblar", price: 40000, description: "" },
  { name: "Kitob Pul psixologiyasi Morgan Xauzel", img: "https://avatars.mds.yandex.net/get-mpic/15462703/2a0000019754e42a55b236b3335e3a1e3f60/optimize", category: "Kitoblar", price: 72900, description: "" },
  { name: "Takiye raznyye miry", img: "https://avatars.mds.yandex.net/get-mpic/6065438/2a00000195c6e37b2354d6815990f4fecdc7/optimize", category: "Kitoblar", price: 26900, description: "" },   
  { name: "4000 essential english words 1, Uzbek translations", img: "https://avatars.mds.yandex.net/get-mpic/4076910/2a0000019b5a865aeda272aa7e90eba60475/optimize", category: "Kitoblar", price: 17000, description: "." },   
  { name: "Kitob Muqaddima Ibn Xaldun, tarix va sotsiologiyaga kirish.", img: "https://avatars.mds.yandex.net/get-mpic/13964805/2a00000198182f28929f572ed4eeb4bb9160/optimize", category: "Kitoblar", price: 60000, description: "" },   
  { name: "4000 essential english words 3, Uzbek translations", img: "https://avatars.mds.yandex.net/get-mpic/17657724/2a0000019b5a96ee7048ddc1e8b39dcdcfa7/optimize", category: "Kitoblar", price: 17000, description: "." },   
  { name: "4000 essential english words 3, Uzbek translations", img: "https://avatars.mds.yandex.net/get-mpic/16164715/2a0000019b210d32cc88a93a964ad857eeb9/optimize", category: "Kitoblar", price: 17900, description: "" },   
  { name: "Tarix milliy sertifikat A+", img: "https://avatars.mds.yandex.net/get-mpic/17873630/2a00000199e7707ea66d0d4fba28eef155b8/optimize", category: "Kitoblar", price: 50000, description: "" },   
  { name: "Essential Grammar in Use , Raymond Murphy, A4 format, 262 bet , yumshoq muqova", img: "https://avatars.mds.yandex.net/get-mpic/15284069/2a0000019a0fcf0b0feb68bad5a1f0702ce3/optimize", category: "Kitoblar", price: 30500, description: "" },   
  { name: "Agata Kristi - Ubiystvo v Vostochnom Ekspresse", img: "https://avatars.mds.yandex.net/get-mpic/16289161/2a0000019773f5cc78e4cb1e4e401fd8ea65/optimize", category: "Kitoblar", price: 32900, description: "" },   
  { name: "Duo taqdirni o‘zgartiradi-hayotni o‘zgartiruvchi va qalbga osoyishtalik bag‘ishlovchi duo kuchi haqida kitob.", img: "https://avatars.mds.yandex.net/get-mpic/15199813/2a0000019a6db9e488fcbd99dbe00356aa9e/optimize", category: "Kitoblar", price: 41500, description: "" },   
 //DAFTARLAR
  { name: "“Kosmik So‘ya” bloknoti — zamonaviy A6 formatdagi qora varaqali ijodiy daftar", img: "https://avatars.mds.yandex.net/get-mpic/12456181/2a0000019a3a90c1b18709d2c371af70415e/optimize", category: "Daftarlar", price: 19000, description: "" },
  { name: "Muslim bloknotlar, yangi va jozibali ko`rinish, muslima qizlar uchun ajoyib yangilik. Yalong", img: "https://avatars.mds.yandex.net/get-mpic/10327572/2a00000198135b8eb951ac790ba61890c94e/optimize", category: "Daftarlar", price: 27000, description: "" },
 { name: "“A Cat Named Sunny” bloknoti • ixcham A6 format • kundalik yozuvlar, o‘qish va ijod uchun 80 varaq katakli", img: "https://avatars.mds.yandex.net/get-mpic/1923922/2a0000019a9e24beb8961bd70d55f15968da/optimize", category: "Daftarlar", price: 24000, description: "" },
  { name: "Daftar 36 varaqli, A5 formatda, 5 dona maktab va uyda foydalanish uchun qulay, sifatli qog‘oz va mustahkam muqovaga ega.", img: "https://avatars.mds.yandex.net/get-mpic/18207042/2a0000019b6e11b65efc42ccb05d44aed73e/optimize", category: "Daftarlar", price: 26000, description: "" },
  { name: "Tabiatni hush ko`radiganlar uchun. Yo`l - yo`l varoqli 4 bo`limga bo`lingan.", img: "https://avatars.mds.yandex.net/get-mpic/4114383/2a0000019b67bb64f78c9d513b8c30d571af/optimize", category: "Daftarlar", price: 28000, description: " " },
 { name: "Xijob bloknotlar, yangi va jozibali ko`rinish, muslima qizlar uchun ajoyib yangilik. 52 varoq", img: "https://avatars.mds.yandex.net/get-mpic/18149576/2a0000019bccc6af15ebebbe039183e319d8/optimize", category: "Daftarlar", price: 24000, description: "" },
  //ruchkalar
  { name: "Ruchka, do'stlar va yaqinlar uchun hazil uchun", img: "https://avatars.mds.yandex.net/get-mpic/4343092/2a0000019a967b4b43b9faef6d9f119a84b2/optimize", category: "Ruchkalar", price: 20000, description: "" },
  { name: "Gelli ruchka. Pos 0,5 mm 3 dona qora rang", img: "https://avatars.mds.yandex.net/get-mpic/13714821/2a000001983d95b364762a8d6c7a54f149c5/optimize", category: "Ruchkalar", price: 15000, description: "" },
  { name: "Maktab uchun sharikli ruchkalar to‘plami – 12 dona", img: "https://avatars.mds.yandex.net/get-mpic/6374009/2a0000019985844c965025305ddb22779d7c/optimize", category: "Ruchkalar", price:23000, description: "" },
  { name: "Gelli ruchkalar Ya Ting G-905, siyohrang, qalinligi 0,5 mm, 6 dona", img: "https://avatars.mds.yandex.net/get-mpic/17016301/2a0000019a6a2947c13aa83d3d432d83971c/optimize", category: "Ruchkalar", price: 20000, description: "" },
  { name: "Ruchka-lazer, taqdimotlar uchun ko'rsatgich, chiroq, magnit", img: "https://avatars.mds.yandex.net/get-mpic/14886053/2a0000019bdcd3eb2e734c6bc053d3993f3a/optimize", category: "Ruchkalar", price: 340000, description: "" },
  { name: "Ruchka Siyah 777 NEON 1.0 mm, 50 dona", img: "https://avatars.mds.yandex.net/get-mpic/15174538/2a00000198fe2c93226ba4ddbc7797259403/optimize", category: "Ruchkalar", price: 45000, description: "" },      
   { name: "Gelli ruchka. Pos 0,5 mm 12 dona ko'k rang", img: "https://avatars.mds.yandex.net/get-mpic/15265136/2a000001985757198d0a9722fad4b3643432/optimize", category: "Ruchkalar", price: 38900, description: "" },
  { name: "Rangli geleviy ruchkalar 4 dona", img: "https://avatars.mds.yandex.net/get-mpic/15246975/2a00000198acec93ba106c019102d40dbb40/optimize", category: "Ruchkalar", price: 20000, description: " " },
  
  //kiyimla
   { name: "Maktab yoshdagı bolalar uchun sport kostyumi DNZ, molnyali ", img: "https://avatars.mds.yandex.net/get-mpic/13526260/2a00000198b1e2f3f2fdedf25ccefc8e4f1e/optimize", category: "Kiyimlar", price: 185000, description: "tepa va past 122 dan 164 gacha bor" },
  { name: "Maktab yoshdagı bolalar uchun chiziqli sport kostyumi ZERO-LIMITED", img: "https://avatars.mds.yandex.net/get-mpic/16857451/2a00000198e6ea11e2210b65f328a5d36481/optimize", category: "kiyimlar", price: 192000, description: "" },
   { name: "Bolalar futbolkasi Status kids qora rangli, o‘g‘il va qiz bollar uchun 10-11 yoshga.", img: "https://avatars.mds.yandex.net/get-mpic/15332119/2a00000196e76fbba49aa7042017842b29b5/optimize", category: "Kiyimlar", price: 53000, description: "10-11  140-146 13-13 152-158" },
  { name: "Kundalik va maktab ko'rinishi uchun bluzka va galstuk, yon bo'yinli qora sarafan ko'ylak", img: "https://avatars.mds.yandex.net/get-mpic/14360956/2a0000019a7e1ad46df9f9316a62ac9a4950/optimize", category: "kiyimlar", price: 230000, description: "44-46 170-176" },
   { name: "Kostyum (dvoyka) qizlar uchun", img: "https://avatars.mds.yandex.net/get-mpic/14635071/2a0000019658c95968a3630713a7b9deb4e8/optimize", category: "Kiyimlar", price: 91000, description: "6 yoshdan 9 yoshgacha botr" },
  { name: "Real Madrid futbol formasi 25-26, mavsum uchun haqiqiy sport sevuvchilar formasi", img: "https://avatars.mds.yandex.net/get-mpic/15380440/2a00000199443585bde729a0b216e6178578/optimize", category: "kiyimlar", price: 144000, description: "oq va qora ranglarda bor" },
   { name: "spartifka erkaklar uchun, dvoyka erkaklar. Erkaklar kiyimlari, Nasem, to‘q ko‘k rang, o‘lchami 54", img: "https://avatars.mds.yandex.net/get-mpic/6236983/2a0000019b222e5741a7e939de1262ca11f0/optimize", category: "Kiyimlar", price: 104000, description: "" },
  { name: "spartifka erkaklar uchun, dvoyka erkaklar. Erkaklar kiyimlari, Nasem, kulrang, o‘lchami 56", img: "https://avatars.mds.yandex.net/get-mpic/15258748/2a000001990ed59ed22c569e17d31cae9a0d/optimize", category: "kiyimlar", price: 194000, description: "" },
   { name: "Erkaklar kiyimi to‘plami, erkaklar kiyimi, ikki kishilik kostyum, polo va shim, mavsumiy, bej rangi, XXXL Nasem o‘lchami", img: "https://avatars.mds.yandex.net/get-mpic/16166361/2a0000019b26da6f4de98bc9b995ab1d0aec/optimize", category: "Kiyimlar", price: 114000, description: "" },
  { name: "Futbolka baza, 100% paxtadan unisex, 3 hil eng keraklai rangalar", img: "https://avatars.mds.yandex.net/get-mpic/17846399/2a00000199aef3facdf2b1c00580c66dde5a/optimize", category: "kiyimlar", price: 43462, description: "3 xil rangda mavjun qora oq va to'q ko'k razmerlar bor" },
   { name: "Ayollar uchun to'rli krossovkalar, bahor-yoz uchun", img: "https://avatars.mds.yandex.net/get-mpic/12639434/2a000001961afdfbd30a30b39291918050f1/optimize", category: "Kiyimlar", price: 174000, description: "35 dan 39 razmergacha bor " },
  { name: "Qishgi sharf - erkaklar va ayollar uchun trenddagi qalin, yumshoq va issiq", img: "https://avatars.mds.yandex.net/get-mpic/5103899/2a0000019ad36bf8c5e847560cd821e2700b/optimize", category: "kiyimlar", price: 54000, description: "kengligi 30 uzunligi 180 kengligi 66 uzunligi 90" },
   { name: "Retro va Yangi uslubdagi Futbol formasi Klassik ruh, zamonaviy qulaylik bilan", img: "https://avatars.mds.yandex.net/get-mpic/15492377/2a0000019730278f7c71f06a7cf9f31a4f42/optimize", category: "Kiyimlar", price: 114900, description: "ikki xil rangda mavjud razmerlari ham bor " },
  { name: "Retro va Yangi uslubdagi Futbol formasi Klassik ruh, zamonaviy qulaylik bilan", img: "https://avatars.mds.yandex.net/get-mpic/14373055/2a000001972fe76df8cfc411fc7d1a3fe962/optimize", category: "kiyimlar", price: 1149000, description: "1 hil rang va razmerlari mavjud" },
  { name: "Erkaklar kiyimlari, dvoyka erkaklar, joggerlar va xudi, spartifka erkaklar uchun, BMW bosma naqshi tushirilgan, rangi qora, M o‘lchamli", img: "https://avatars.mds.yandex.net/get-mpic/5186016/2a0000019ae40ea85862d3f8b76b55f3b5a4/optimize", category: "Kiyimlar", price: 175000, description: "2 hil rang va razmerlari mavjud" },
  {  name: "Erkaklar kiyimlari, dvoyka erkaklar, joggerlar va xudi, spartifka erkaklar uchun, BMW bosma naqshi tushirilgan, rangi qora, M o‘lchamli",  img: "https://avatars.mds.yandex.net/get-mpic/15050963/2a0000019ae40494a793ea349eed7599caa0/optimize", category: "Kiyimlar", price: 175000, description: "1 hil rang va razmerlari mavjud" },
  { name: "Erkaklar kiyimi to‘plami, erkaklar kiyimi, ikkilik kostyum, polo va shim, mavsumiy, to‘q ko‘k rang, XXXL Nasem o‘lchami", img: "https://avatars.mds.yandex.net/get-mpic/16412103/2a0000019b0ccc2b863373ff1b8a32c595a4/optimize", category: "Kiyimlar", price: 114000, description: "2 hil rang va razmerlari mavjud emas" },
  { name: "Erkaklar kiyimi to‘plami, erkaklar kiyimi, ikkilik kostyum, polo va shim, mavsumiy, jigarrang, XXXL Nasem o‘lchami", img: "https://avatars.mds.yandex.net/get-mpic/12394941/2a000001995d040cc99adf43e0a9dd81df41/optimize", category: "Kiyimlar", price: 114000, description: "2 hil rang va razmerlari mavjud emas" },
  { name: "Erkaklar kiyimlari, vetrovka erkaklar uchuni, dvoykalar, kuzgi kiyimlar, Nasem, yarim mavsum, kulrang, XXXL o‘lcham", img: "https://avatars.mds.yandex.net/get-mpic/5233339/2a0000019b208c870d745c7078bd645ddbb0/optimize", category: "Kiyimlar", price: 115000, description: "1 hil rang va razmerlari mavjud" },
  { name: "Erkaklar kiyimi to‘plami, erkaklar kiyimi, ikkilik kostyum, polo va shim, mavsumiy, jigarrang, XXXL Nasem o‘lchami", img: "https://avatars.mds.yandex.net/get-mpic/5219690/2a0000019b2c303f0cf77ddac7b967c5f3e5/optimize", category: "Kiyimlar", price: 115000, description: "1 hil rang va razmerlari mavjud" },
  { name: "Erkaklar oversize sport komplekti, qora xudi va shim, paxta, qulay va zamonaviy", img: "https://avatars.mds.yandex.net/get-mpic/18475675/2a0000019bc7adbde479f0833c5850c212d0/optimize", category: "Kiyimlar", price: 20000, description: "1 hil rang va razmerlari mavjud 50 52" },
  { name: "Ikkilik kostyum, erkaklar to‘plami, erkaklar kiyimlari, joggerlar va xudilar, qora rang, XL o‘lcham", img: "https://avatars.mds.yandex.net/get-mpic/18709130/2a0000019b6921b945a01a47d90087e3e851/optimize", category: "Kiyimlar", price: 315000, description: "1 hil rang va razmerlari mavjud" },
 
  { name: "Erkaklar krossovkalari, sport uchun, nafas oladigan to'r", img: "https://avatars.mds.yandex.net/get-mpic/15257343/2a00000196254c08177182e64638af721926/optimize", category: "Kiyimlar", price: 140000, description: "razmerlar mavjud" },
  { name: "Universal krossovkalar, yozgi, mato, olib tashlanadigan taglik, ip bilan bog'lash, uniseks", img: "https://avatars.mds.yandex.net/get-mpic/13714821/2a000001961b9e1e92f60ff50c702addbd36/optimize", category: "Kiyimlar", price: 80000, description: "razmerlar 37 38" },
  { name: "Retro uslubidagi krossovkalar, erkaklar va ayollar uchun, klassik dizayn modeli, qulay va engil taglik", img: "https://avatars.mds.yandex.net/get-mpic/18252787/2a0000019a4a15de32dd2f170f0f72a6a25c/optimize", category: "Kiyimlar", price: 80000, description: "razmer faqat 36 mavjud" },
  { name: "Ayollar uchun to'rli krossovkalar, bahor-yoz uchun", img: "https://avatars.mds.yandex.net/get-mpic/12639434/2a000001961afdfbd30a30b39291918050f1/optimize", category: "Kiyimlar", price: 175000, description: "razmerlar 35 dan 29 gacha mavjud" },
  { name: "Ayollar balet kvartiralari, dumaloq burunli patentli poyabzal", img: "https://avatars.mds.yandex.net/get-mpic/12800328/2a000001971c6514c44784b6f68f03369c6b/optimize", category: "Kiyimlar", price: 125000, description: "razmerlar 36 dan 41 gacha mavjud" },
  { name: "Yozgi nafas olishga mo'ljallangan tarmoq krossovkalari erkaklar va ayollar uchun , engil va qulay model", img: "https://avatars.mds.yandex.net/get-mpic/12525950/2a0000019617085a6183dd70b674a6da7f1f/optimize", category: "Kiyimlar", price: 79000, description: "razmer 38" },
  { name: "Erkaklar krossovkalari, mavsumiy bo‘lmagan, kundalik poyabzallari, qulayligi va sifati, 41 o'lchami, oq", img: "https://avatars.mds.yandex.net/get-mpic/16413949/2a0000019b2c4b92146c01cf106ec55b27cf/optimize", category: "Kiyimlar", price: 113000, description: "razmer 38 dan 40 gacha mavjud " },
  { name: "Erkaklar uchun eko-charm krossovkalar, koreys uslubi", img: "https://avatars.mds.yandex.net/get-mpic/5332815/2a00000195b7dd892c6bc409e30c9908f18b/optimize", category: "Kiyimlar", price: 155000, description: "razmerlar41 dan 43 gacha mavjud" },
  { name: "Erkaklar kiyimlari, dvoyka erkaklar, joggerlar va xudi, spartifka erkaklar uchun, BMW bosma naqshi tushirilgan, rangi qora, M o‘lchamli", img: "https://avatars.mds.yandex.net/get-mpic/16111726/2a0000019b172a483765fa311d1f82d938f8/optimize", category: "Kiyimlar", price:115000, description: "razmerlar 38 dan 42 gacha mavjud" },
  { name: "Erkaklar uchun krossovkalar, shnursiz, nafas oluvchi, trikotaj matoli, yozgi.", img: "https://avatars.mds.yandex.net/get-mpic/11401175/2a00000196243e6201ac8f3053677f5da701/optimize", category: "Kiyimlar", price: 79000, description: "razmerlar 39 40 mavjud " },
  { name: "Erkaklar uchun premium darajadagi mokasinlar", img: "https://avatars.mds.yandex.net/get-mpic/11395611/2a000001979d0d5e04652d24e22c27cd6b90/optimize", category: "Kiyimlar", price:154000, description: "razmerlar 39 dan 44 gacha mavjud" },
  { name: "Erkaklar va ayollar uchun poyafzal, erkaklar uchun krossovkalar bahor-yoz, uniseks,", img: "https://avatars.mds.yandex.net/get-mpic/15285180/2a00000198e825bbcc5c39d720c2e954ab10/optimize", category: "Kiyimlar", price: 84000, description: "razmer 36 va 38 mavjud " },
  { name: "Yozgi krossovkalar tarmoq matosidan, yengil va yumshoq — har kuni uchun qulaylik va stil.", img: "https://avatars.mds.yandex.net/get-mpic/13736117/2a000001961ba2b114cf240be5a82c1f35d0/optimize", category: "Kiyimlar", price: 84000, description: "razmer 36 mavjud faqat " },
  { name: "Qora Nike krossovkalari | Yengil, zamonaviy, uniseks | O'lchamlar 40–45", img: "https://avatars.mds.yandex.net/get-mpic/4887838/2a000001960158b53de5ecdaae597d18da2e/optimize", category: "Kiyimlar", price: 204000, description: "razmer 40mavjud" },
  { name: "Krossovkalar erkaklar uchun, keda, zamish va teri", img: "https://avatars.mds.yandex.net/get-mpic/5236119/2a00000199b7d5d654055cb0f118e1158c7a/optimize", category: "Kiyimlar", price: 153000, description: "razmerlar 40 42 dna 44 gacha mavjud" },
  { name: "Erkaklar krossovkalari, sport va kundalik poyabzal, 43 o'lcham, qora", img: "https://avatars.mds.yandex.net/get-mpic/15585232/2a0000019b206f2f2ea7081e5ac7e8e3e59d/optimize", category: "Kiyimlar", price: 115000, description: "razmer 38 dan 42 gacha mavjud " },
  { name: "Erkaklar to'rli krossovkalar, nafas oladigan yoz", img: "https://avatars.mds.yandex.net/get-mpic/12500095/2a00000197abcb408f82d6e0dcf4604ec064/optimize", category: "Kiyimlar", price: 130000, description: "razmerlar 40 dan 43 gacha mavjud" },
  { name: "Erkaklar uchun Jordan kuzgi krossovkalari, sport va sayr uchun, Malomerka", img: "https://avatars.mds.yandex.net/get-mpic/12621455/2a0000019b788a237971147c998716aadfd2/optimize", category: "Kiyimlar", price: 144000, description: "razmerlar 39 dan 43 gacha mavjud" },
  { name: "Ayollar poyafzallari, ayollar va qizlar uchun LIDER slip-ons, krossovkalar, Skechers, krossovkalar 37", img: "https://avatars.mds.yandex.net/get-mpic/14635071/2a000001973063b80d9de94eb67868696fbf/optimize", category: "Kiyimlar", price: 94000, description: "razmerlar 36 dan 40 gacha mavjud" },
  { name: "Erkaklar va ayollar uchun uniseks krossovkalar, yoz-bahor-kuz-qish uchun, 35-37 o'lchamda", img: "https://avatars.mds.yandex.net/get-mpic/11442293/2a0000019971690240714ce52d9d4c677f26/optimize", category: "Kiyimlar", price: 94000, description: "razmerlar 35 dan 37 gacha mavjud " },
 


];

// ====== Gridga mahsulotlarni render qilish ======
function renderProducts(filteredProducts) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    if(filteredProducts.length === 0) {
        grid.innerHTML = '<p class="text-center text-gray-300 py-4">Hech narsa topilmadi</p>';
        return;
    }

    filteredProducts.forEach((p, index) => {
        const id = 101 + products.indexOf(p);
        const html = `
          <div class="product flex flex-col bg-gray-800/50 border border-white/5 p-2 rounded-2xl relative" data-category="${p.category}">
            <button onclick="toggleFav(${id})" class="absolute top-4 right-4 z-10 p-1.5 bg-black/40 backdrop-blur-md rounded-full">
              <svg id="fav-icon-${id}" class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>

            <img class="w-full h-32 rounded-xl object-cover" src="${p.img}">
            <p class="mt-2 px-1 text-[13px] font-medium truncate">${p.name}</p>
            <p class="px-1 text-yellow-500 font-bold text-sm">${p.price.toLocaleString()} so'm</p>
            <div class="mt-3 space-y-1.5">
              <button onclick="addToCart(${id})" class="w-full bg-white text-black py-2 rounded-lg text-[11px] font-bold active-scale">Savatga</button>
              <button onclick="showDetails(${id})" class="w-full bg-gray-700 text-white py-2 rounded-lg text-[11px] font-bold active-scale">Batafsil</button>
            </div>
          </div>`;
        grid.insertAdjacentHTML('beforeend', html);
    });
}

// ====== Qidiruv + Kategoriya filtri ======
function filterAndSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();

    const filtered = products.filter(p => {
        const matchCategory = selectedCategory === "all" || p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchSearch = p.name.toLowerCase().includes(query) || (p.description && p.description.toLowerCase().includes(query));
        return matchCategory && matchSearch;
    });

    renderProducts(filtered);
}

  // ====== Kategoriya bo'yicha filtr ======
function filterCategory(cat) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    
    const filtered = cat === 'all' ? products : products.filter(p => p.category.toLowerCase() === cat.toLowerCase());
    
    filtered.forEach((p, index) => {
        const id = 101 + products.indexOf(p); // to'g'ri id
        const html = `
          <div class="product flex flex-col bg-gray-800/50 border border-white/5 p-2 rounded-2xl relative" data-category="${p.category}">
            <button onclick="toggleFav(${id})" class="absolute top-4 right-4 z-10 p-1.5 bg-black/40 backdrop-blur-md rounded-full">
              <svg id="fav-icon-${id}" class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
            <img class="w-full h-32 rounded-xl object-cover" src="${p.img}">
            <p class="mt-2 px-1 text-[13px] font-medium truncate">${p.name}</p>
            <p class="px-1 text-yellow-500 font-bold text-sm">${p.price.toLocaleString()} so'm</p>
            <div class="mt-3 space-y-1.5">
              <button onclick="addToCart(${id})" class="w-full bg-white text-black py-2 rounded-lg text-[11px] font-bold active-scale">Savatga</button>
              <button onclick="showDetails(${id})" class="w-full bg-gray-700 text-white py-2 rounded-lg text-[11px] font-bold active-scale">Batafsil</button>
            </div>
          </div>`;
        grid.insertAdjacentHTML('beforeend', html);
    });
}
p.category.toLowerCase() === cat.toLowerCase()

// ====== Mahsulot batafsilini ko'rsatish ======
function showDetails(id) {
      // Modalni ochish
  openModal("detailModal", "detailContent");
 // 👈 MANA SHU QAVS YO‘Q EDI
    const product = products[id - 101];
    if (!product) return;

    // Modal ichidagi elementlar
    document.getElementById("detailImg").src = product.img;
    document.getElementById("detailName").innerText = product.name;
    document.getElementById("detailPrice").innerText = product.price.toLocaleString() + " so'm";
    document.getElementById("detailDesc").innerText = product.description;

    document.getElementById("detailAddToCart").onclick = function () {
        addToCart(id);
        closeModal("detailModal", "detailContent");
    };

    openModal("detailModal", "detailContent");
}

  // Savatga qo‘shish tugmasi
  document.getElementById("detailAddToCart").onclick = function () {
    addToCart(id);
    closeModal("detailModal", "detailContent");
  };


// Mahsulotni ro'yxatdan o'chirish funksiyasi
function removeProduct(id) {
  const index = products.findIndex((p, i) => 101 + i === id);
  if (index !== -1) {
    products.splice(index, 1);
    generateProducts(); // Gridni qayta chizish
  }
}



// ====== Asosiy Funksiyalar ======

function setLanguage(lang) {
    const t = translations[lang];
    
    // UI ranglarini yangilash
    if (lang === 'uz') {
        document.getElementById('langBtnUz').className = "px-3 py-1 bg-yellow-500 text-black rounded-lg text-[12px] font-bold";
        document.getElementById('langBtnRu').className = "px-3 py-1 bg-white/10 text-white rounded-lg text-[12px] font-bold";
    } else {
        document.getElementById('langBtnRu').className = "px-3 py-1 bg-yellow-500 text-black rounded-lg text-[12px] font-bold";
        document.getElementById('langBtnUz').className = "px-3 py-1 bg-white/10 text-white rounded-lg text-[12px] font-bold";
    }

    // Matnlarni almashtirish
    document.getElementById('mainLogo').innerText = t.logo;
    document.querySelector('.lang-welcome').innerText = t.welcome;
    document.querySelector('.lang-register_form').innerText = t.register_form;
    document.querySelector('.lang-enter').innerText = t.enter;
    document.getElementById('detailAddToCart').innerText = t.toCart;
    document.getElementById('cartActionButton').innerText = t.order;
    document.getElementById('noOrdersMsg').innerText = t.no_orders;
    document.getElementById('searchInput').placeholder = t.search_placeholder;
    document.getElementById('userFeedback').placeholder = t.feedback_placeholder;
    
    document.querySelectorAll('.lang-cartTitle').forEach(el => el.innerText = t.cartTitle);
    document.querySelectorAll('.lang-orders').forEach(el => el.innerText = t.orders);
    document.querySelectorAll('.lang-favorites').forEach(el => el.innerText = t.favorites);
    document.querySelectorAll('.lang-katalog').forEach(el => el.innerText = t.katalog);
    document.querySelectorAll('.lang-send').forEach(el => el.innerText = t.send);
    document.querySelectorAll('.lang-total').forEach(el => el.innerText = t.total);

    if (!currentUser) document.getElementById('navUserLabel').innerText = t.login_label;

    const cats = document.querySelectorAll('.category');
    if(cats.length > 0) {
        cats[0].innerText = t.all;
        cats[1].innerText = t.clothes;
        cats[2].innerText = t.electronics;
    }

    localStorage.setItem('selectedLang', lang);
}

function generateProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  products.forEach((p, index) => {
    const id = 101 + index;
    const html = `
      <div class="product flex flex-col bg-gray-800/50 border border-white/5 p-2 rounded-2xl relative" data-category="${p.category}">
        <button onclick="toggleFav(${id})" class="absolute top-4 right-4 z-10 p-1.5 bg-black/40 backdrop-blur-md rounded-full">
          <svg id="fav-icon-${id}" class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <img class="w-full h-32 rounded-xl object-cover" src="${p.img}">
        <p class="mt-2 px-1 text-[13px] font-medium truncate">${p.name}</p>
        <p class="px-1 text-yellow-500 font-bold text-sm">${p.price.toLocaleString()} so'm</p>
        <div class="mt-3 space-y-1.5">
          <button onclick="addToCart(${id})" class="w-full bg-white text-black py-2 rounded-lg text-[11px] font-bold active-scale">Savatga</button>
          <button onclick="showDetails(${id})" class="w-full bg-gray-700 text-white py-2 rounded-lg text-[11px] font-bold active-scale">Batafsil</button>
        </div>
      </div>`;
    grid.insertAdjacentHTML('beforeend', html);
  });
}

function addToCart(id) {
  const p = products[id - 101];
  cart.push({ id, name: p.name, price: p.price, img: p.img });
  updateUI();
  renderCart();
}

function updateUI() {
  const cCount = document.getElementById('cartCount');
  const fCount = document.getElementById('favCount');
  cCount.innerText = cart.length;
  fCount.innerText = favorites.length;
  cart.length > 0 ? cCount.classList.remove('hidden') : cCount.classList.add('hidden');
  favorites.length > 0 ? fCount.classList.remove('hidden') : fCount.classList.add('hidden');
}

function renderCart() {
  const list = document.getElementById('cartList');
  const totalEl = document.getElementById('totalPrice');
  list.innerHTML = cart.length === 0 ? '<p class="text-center py-4">Savat bo\'sh</p>' : '';
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    list.insertAdjacentHTML('beforeend', `
      <div class="flex justify-between items-center bg-gray-800 p-3 rounded-xl mb-2">
        <div class="flex items-center gap-2">
          <img src="${item.img}" class="w-10 h-10 rounded-lg">
          <p class="text-xs truncate w-32">${item.name}</p>
        </div>
        <p class="text-yellow-500 font-bold text-xs">${item.price.toLocaleString()} so'm</p>
      </div>`);
  });
  totalEl.innerText = total.toLocaleString();
}

function handleCartAction() {
  if (cart.length === 0) return alert("Savat bo'sh!");
  if (!currentUser) return alert("Iltimos, avval login qiling!");

  // Telegramga yuborish uchun media array
  const media = cart.map(item => ({
    type: "photo",
    media: item.img,
    caption: `<b>${item.name}</b>\nNarxi: ${item.price.toLocaleString()} so'm`,
    parse_mode: "HTML"
  }));

  // Jami summani hisoblash
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  // 1️⃣ Barcha rasmlarni yuborish
  fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMediaGroup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TG_CHAT_ID,
      media: media
    })
  })
  .then(() => {
    // 2️⃣ Ism, telefon va jami summa alohida xabar sifatida
    let summaryMsg = `<b>🛒 YANGI BUYURTMA</b>\n\n`;
    summaryMsg += `👤 ${currentUser.name}\n📞 ${currentUser.phone} \n\n`;
    summaryMsg += `<b>Jami: ${total.toLocaleString()} so'm</b>`;
    sendToTelegram(summaryMsg);

    // Savatni bo'shatish va UI yangilash
    orders.push(...cart);
    cart = [];
    updateUI();
    renderCart();
    renderOrders();

   
  })
  .catch(err => {
    console.error(err);
    alert("❌ Buyurtmani yuborishda xatolik yuz berdi!");
  });
 
}

  // =================== FEEDBACK FUNCTION ===================
function sendFeedback() {
    const feedback = document.getElementById('userFeedback').value.trim();
    if (!feedback) return alert("Iltimos, avval xabar yozing!");

    if (!currentUser) return alert("Iltimos, avval login qiling!");

    const msg = `<b>📝 FIKR QOLDIRILDI</b>\n\n👤 ${currentUser.name}\n📞 ${currentUser.phone}\n\n💬 ${feedback}`;
    
    sendToTelegram(msg);

    document.getElementById('userFeedback').value = '';
    }
 // ====== LOGIN / LOGOUT SYSTEM ======

// Login tugmasi bosilganda
function handleAuthClick() {
  if (currentUser) {
    openModal("loginModal"); // profil oynasi
  } else {
    document.getElementById("loginModal").classList.remove("hidden");
  }
}

// Saqlash (sizda bor, lekin yaxshilangan)


// Chiqish
function logout() {
  if (!confirm("Haqiqatan chiqmoqchimisiz?")) return;

  currentUser = null;
  localStorage.removeItem("m_user");

  document.getElementById("navUserLabel").innerText = "Kirish";
  document.getElementById("loginModal").classList.add("hidden");

  alert("🚪 Chiqildi!");
}

// Sahifa ochilganda tekshirish
function checkLogin() {
  const saved = localStorage.getItem("m_user");

  if (saved) {
    currentUser = JSON.parse(saved);
    document.getElementById("navUserLabel").innerText = currentUser.name;
  } else {
    // Login bo'lmasa majburiy ochiladi
    document.getElementById("loginModal").classList.remove("hidden");
  }
}

 
function renderOrders() {
  const list = document.getElementById('ordersList');
  list.innerHTML = '';
  orders.length > 0 ? document.getElementById('noOrdersMsg').classList.add('hidden') : document.getElementById('noOrdersMsg').classList.remove('hidden');
  orders.forEach(o => {
    list.insertAdjacentHTML('beforeend', `<div class="bg-gray-800 p-3 rounded-xl mb-2 flex justify-between"><p class="text-xs">${o.name}</p><p class="text-yellow-500 text-xs">${o.price.toLocaleString()}</p></div>`);
  });
}

function openModal(mId, cId) {
  document.getElementById(mId).classList.remove('hidden');
  setTimeout(() => document.getElementById(cId).classList.add('modal-show'), 50);
}

function closeModal(mId, cId) {
  document.getElementById(cId).classList.remove('modal-show');
  setTimeout(() => document.getElementById(mId).classList.add('hidden'), 300);
}

function saveUser() {
  const n = document.getElementById('userName').value;
  const p = document.getElementById('userPhone').value;
  if(n && p) {
    currentUser = { name: n, phone: p };
    localStorage.setItem('m_user', JSON.stringify(currentUser));
    document.getElementById('navUserLabel').innerText = n;
    document.getElementById('loginModal').classList.add('hidden');
  }
}

// ====== Sahifa yuklanishi ======
window.onload = () => {
  generateProducts();

  const savedLang = localStorage.getItem("selectedLang") || "uz";
  setLanguage(savedLang);

  checkLogin(); // 👈 LOGIN TEKSHIRISH
  
};
  