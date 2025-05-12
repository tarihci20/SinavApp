import type { Question, Prize } from '@/lib/types';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Öğrencilerin ders sırasında tuvalet izni konusunda okul politikası nedir?',
    options: [
      'Her isteyene hemen izin verilmelidir',
      'Sadece teneffüslerde izin verilmelidir',
      'Ciddi bir durum yoksa hemen izin verilmemelidir',
      'Sadece günde bir kez izin verilmelidir',
    ],
    correctAnswer: 'Ciddi bir durum yoksa hemen izin verilmemelidir',
    points: 5,
  },
  {
    id: 2,
    text: '"Hamburger tekniği" aşağıdaki hangi alanda kullanılan bir yöntemdir?',
    options: [
      'Öğrenci disiplin sorunlarını çözme',
      'Veli iletişimi ve geri bildirim verme',
      'Sınav hazırlama metodolojisi',
      'Okul etkinliklerini planlama',
    ],
    correctAnswer: 'Veli iletişimi ve geri bildirim verme',
    points: 5,
  },
  {
    id: 3,
    text: 'Okul yönetimi, sorun çıkaran öğrencilere karşı öncelikli olarak hangi yaklaşımı önermektedir?',
    options: [
      'Hemen sınıftan çıkarılmalı',
      'Rehberlik servisine yönlendirilmeli',
      'Veli ile acilen görüşülmeli',
      'Yazılı uyarı verilmeli',
    ],
    correctAnswer: 'Rehberlik servisine yönlendirilmeli',
    points: 5,
  },
  {
    id: 4,
    text: 'Öğretmenlerin veli görüşmelerinde dikkat etmesi gereken husus nedir?',
    options: [
      'Detaylı akademik bilgi paylaşımı yapmaları',
      'Öğrencinin tüm sorunlarını listemeleri',
      'Toplantı tarihi dışında detaya girmemeleri',
      'Diğer öğrencilerle karşılaştırma yapmaları',
    ],
    correctAnswer: 'Toplantı tarihi dışında detaya girmemeleri',
    points: 5,
  },
  {
    id: 5,
    text: 'Metinde adı geçen "K12 Net" sistemi hangi amaçla kullanılmaktadır?',
    options: [
      'Öğrenci yoklama sistemi olarak',
      'Okul güvenlik sistemi olarak',
      'Not girilen online sistem olarak',
      'Öğretmen performans değerlendirme sistemi olarak',
    ],
    correctAnswer: 'Not girilen online sistem olarak',
    points: 5,
  },
  {
    id: 6,
    text: 'Sınavlarla ilgili öğretmenlerden beklenen ön hazırlık nedir?',
    options: [
      'Sınav kağıtlarını renkli bastırmaları',
      'Sınavdan önce çalışma kağıdı hazırlamaları',
      'Sınavları sadece kitaptan hazırlamaları',
      'Her sınav için en az 50 soru hazırlamaları',
    ],
    correctAnswer: 'Sınavdan önce çalışma kağıdı hazırlamaları',
    points: 5,
  },
  {
    id: 7,
    text: 'Havalar ısındığında öğretmenlerin dikkat etmesi gereken nokta nedir?',
    options: [
      'Öğrencilerin su içme ihtiyaçlarını karşılamaları',
      'Sınıf pencerelerini sürekli açık tutmaları',
      'Artan öğrenci hareketliliğine karşı daha dikkatli olmaları',
      'Ders süresini kısaltmaları',
    ],
    correctAnswer: 'Artan öğrenci hareketliliğine karşı daha dikkatli olmaları',
    points: 5,
  },
  {
    id: 8,
    text: 'Öğretmenlerin dış görünüşüyle ilgili beklenti nedir?',
    options: [
      'İstedikleri renkte kıyafet giyebilirler',
      'Önlük giymeli ve yaka kartı takmalılar',
      'Yalnızca resmi törenlerde formal giyinmeliler',
      'Sadece okul logolu kıyafetler giymeliler',
    ],
    correctAnswer: 'Önlük giymeli ve yaka kartı takmalılar',
    points: 5,
  },
  {
    id: 9,
    text: 'Okul toplantı tutanaklarına göre, sınav tarihlerinin e-okula girilmesi ne zaman yapılmalıdır?',
    options: [
      'Sınavdan bir gün önce',
      'Sınavdan hemen sonra',
      'Dönem sonunda toplu olarak',
      'Zamanında (belirtilen süre içinde)',
    ],
    correctAnswer: 'Zamanında (belirtilen süre içinde)',
    points: 5,
  },
  {
    id: 10,
    text: 'Öğrencilerin koridorda top oynaması konusunda okul politikası nedir?',
    options: [
      'Teneffüslerde izin verilir',
      'Sadece beden eğitimi öğretmeni gözetiminde izin verilir',
      'İzin verilmez',
      'Küçük sınıflar için izin verilir',
    ],
    correctAnswer: 'İzin verilmez',
    points: 5,
  },
  {
    id: 11,
    text: 'Toplantı tutanaklarında sıkça bahsedilen etkinliklerden hangisi ilkbahar döneminde gerçekleştirilmektedir?',
    options: [
      'İftar programları',
      'Bilim Şenliği',
      'Kahoot yarışmaları',
      'Hepsi',
    ],
    correctAnswer: 'Hepsi',
    points: 5,
  },
  {
    id: 12,
    text: 'Öğrencilerin argo kullanımı durumunda öğretmenlerden ne beklenmektedir?',
    options: [
      'Görmezden gelmeleri',
      'Müdahale etmeleri',
      'Sadece not düşürme yoluyla cezalandırmaları',
      'Yazılı uyarı vermeleri',
    ],
    correctAnswer: 'Müdahale etmeleri',
    points: 5,
  },
  {
    id: 13,
    text: 'Sınav güvenliğiyle ilgili olarak toplantı tutanaklarında hangi konuya değinilmiştir?',
    options: [
      'Kopya çekme ve şifreleme yöntemleri',
      'Sınav gözetmenlerinin sayısının artırılması',
      'Elektronik cihaz kullanım yasağı',
      'Sınav kağıtlarının korunması',
    ],
    correctAnswer: 'Kopya çekme ve şifreleme yöntemleri',
    points: 5,
  },
  {
    id: 14,
    text: 'Okul nöbetlerinde öğretmenlerden özellikle dikkat etmeleri istenen konu nedir?',
    options: [
      'Öğrencilerin kıyafet kontrolü',
      'Kapıların açık kalmaması',
      'Bahçe temizliği',
      'Yemekhane düzeni',
    ],
    correctAnswer: 'Kapıların açık kalmaması',
    points: 5,
  },
  {
    id: 15,
    text: 'Öğretmenlerin öğrencilere karşı yaklaşımında vurgulanan temel değer nedir?',
    options: [
      'Otoriter olma',
      'Profesyonellik',
      'Mesafeli olma',
      'Arkadaşça davranma',
    ],
    correctAnswer: 'Profesyonellik',
    points: 5,
  },
  {
    id: 16,
    text: 'Toplantı tutanaklarına göre, hangi sınıf özellikle disiplin konusunda dikkat çekmiştir?',
    options: ['5A', '6A', '7B', '8C'],
    correctAnswer: '6A',
    points: 5,
  },
  {
    id: 17,
    text: 'Öğretmenlerin mesleki gelişimleri için hangi kaynakları takip etmeleri beklenmektedir?',
    options: [
      'Sadece okul kütüphanesindeki kaynakları',
      'Sosyal medya platformlarını',
      'MEB kaynaklarını',
      'Yalnızca akademik makaleleri',
    ],
    correctAnswer: 'MEB kaynaklarını',
    points: 5,
  },
  {
    id: 18,
    text: 'Metinde geçen "NO4 çalışmaları" neyi ifade etmektedir?',
    options: [
      'Okulun kendi iç projesi veya çalışma sistemi',
      'Ulusal bir sınav hazırlık programı',
      'Öğretmen performans ölçüm sistemi',
      'Metinde açıklanmamıştır',
    ],
    correctAnswer: 'Okulun kendi iç projesi veya çalışma sistemi',
    points: 5,
  },
  {
    id: 19,
    text: 'Öğretmenlerin tüm görev ve sorumluluklarını etkin şekilde yerine getirmesi için ihtiyaç duydukları en temel beceri nedir?',
    options: [
      'Teknolojiyi kullanma becerisi',
      'İkna kabiliyeti',
      'Zaman yönetimi',
      'Yaratıcı düşünme',
    ],
    correctAnswer: 'Zaman yönetimi',
    points: 5,
  },
  {
    id: 20,
    text: 'Toplantı tutanaklarına göre, öğretmenlik mesleğinin aşağıdaki hangi yönü en çok vurgulanmaktadır?',
    options: [
      'Yalnızca ders anlatma rolü',
      'Çok yönlü ve talepkar bir rol',
      'Akademik gelişime odaklanma',
      'Bireysel çalışma becerisi',
    ],
    correctAnswer: 'Çok yönlü ve talepkar bir rol',
    points: 5,
  },
];

export const prizes: Prize[] = [
  {
    id: 'gofret',
    name: 'Ülker Çikolatalı Gofret',
    imageSrc: 'https://picsum.photos/300/200?random=1',
    imageHint: 'chocolate wafer',
    condition: '80+ Puan',
    minScore: 80,
  },
  {
    id: 'etipuf',
    name: 'Eti Puf',
    imageSrc: 'https://picsum.photos/300/200?random=2',
    imageHint: 'marshmallow biscuit',
    condition: '60-79 Puan',
    minScore: 60,
    maxScore: 79,
  },
  {
    id: 'seker',
    name: 'Küçük Şeker',
    imageSrc: 'https://picsum.photos/300/200?random=3',
    imageHint: 'small candy',
    condition: '< 60 Puan',
    minScore: 0, // Assuming 0 is the lowest possible score
    maxScore: 59,
  },
];

export const getPrizeForScore = (score: number): Prize | undefined => {
  // Max score is 20 questions * 5 points = 100
  if (score >= 80 && score <= 100) return prizes.find(p => p.id === 'gofret');
  if (score >= 60 && score <= 79) return prizes.find(p => p.id === 'etipuf');
  if (score >= 0 && score <= 59) return prizes.find(p => p.id === 'seker');
  return prizes.find(p => p.id === 'seker'); // Default to smallest prize if score is out of expected bounds, or no prize.
};
