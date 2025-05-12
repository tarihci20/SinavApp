import type { Question } from '@/lib/types';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Türkiye\'nin başkenti neresidir?',
    options: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'],
    correctAnswer: 'Ankara',
    points: 5,
  },
  {
    id: 2,
    text: 'Dünyanın en yüksek dağı hangisidir?',
    options: ['K2', 'Kangchenjunga', 'Everest', 'Lhotse'],
    correctAnswer: 'Everest',
    points: 5,
  },
  {
    id: 3,
    text: 'Hangi gezegen "Kızıl Gezegen" olarak bilinir?',
    options: ['Venüs', 'Mars', 'Jüpiter', 'Satürn'],
    correctAnswer: 'Mars',
    points: 5,
  },
  {
    id: 4,
    text: 'Suyun kimyasal formülü nedir?',
    options: ['CO2', 'O2', 'H2O', 'NaCl'],
    correctAnswer: 'H2O',
    points: 5,
  },
  {
    id: 5,
    text: '"Mona Lisa" tablosunu kim yapmıştır?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    correctAnswer: 'Leonardo da Vinci',
    points: 5,
  },
  {
    id: 6,
    text: 'Kaç tane kıta vardır?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
    points: 5,
  },
  {
    id: 7,
    text: 'Türkiye\'nin en kalabalık şehri hangisidir?',
    options: ['Ankara', 'İzmir', 'Bursa', 'İstanbul'],
    correctAnswer: 'İstanbul',
    points: 5,
  },
  {
    id: 8,
    text: 'Hangi hayvan "Ormanlar Kralı" olarak bilinir?',
    options: ['Kaplan', 'Aslan', 'Ayı', 'Kurt'],
    correctAnswer: 'Aslan',
    points: 5,
  },
  {
    id: 9,
    text: 'Bir yılda kaç gün vardır (artık yıl hariç)?',
    options: ['360', '365', '356', '370'],
    correctAnswer: '365',
    points: 5,
  },
  {
    id: 10,
    text: 'Fotosentez için bitkilerin ihtiyaç duyduğu gaz hangisidir?',
    options: ['Oksijen', 'Nitrojen', 'Karbondioksit', 'Hidrojen'],
    correctAnswer: 'Karbondioksit',
    points: 5,
  },
  {
    id: 11,
    text: 'Japonya\'nın başkenti neresidir?',
    options: ['Kyoto', 'Osaka', 'Tokyo', 'Hiroşima'],
    correctAnswer: 'Tokyo',
    points: 5,
  },
  {
    id: 12,
    text: 'İnsan vücudundaki en büyük organ hangisidir?',
    options: ['Kalp', 'Beyin', 'Karaciğer', 'Deri'],
    correctAnswer: 'Deri',
    points: 5,
  },
  {
    id: 13,
    text: 'Hangi renkler bir araya geldiğinde yeşil oluşur?',
    options: ['Kırmızı ve Mavi', 'Sarı ve Mavi', 'Kırmızı ve Sarı', 'Mavi ve Beyaz'],
    correctAnswer: 'Sarı ve Mavi',
    points: 5,
  },
  {
    id: 14,
    text: 'Ay\'a ilk ayak basan insan kimdir?',
    options: ['Yuri Gagarin', 'Buzz Aldrin', 'Neil Armstrong', 'Michael Collins'],
    correctAnswer: 'Neil Armstrong',
    points: 5,
  },
  {
    id: 15,
    text: 'Olimpiyat Oyunları kaç yılda bir düzenlenir?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    points: 5,
  },
  {
    id: 16,
    text: 'En küçük gezegen hangisidir?',
    options: ['Merkür', 'Venüs', 'Mars', 'Dünya'],
    correctAnswer: 'Merkür',
    points: 5,
  },
  {
    id: 17,
    text: 'Fransız İhtilali hangi yılda başlamıştır?',
    options: ['1776', '1789', '1804', '1815'],
    correctAnswer: '1789',
    points: 5,
  },
  {
    id: 18,
    text: 'Bir üçgenin iç açılarının toplamı kaç derecedir?',
    options: ['90', '180', '270', '360'],
    correctAnswer: '180',
    points: 5,
  },
  {
    id: 19,
    text: 'Avustralya\'nın başkenti neresidir?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    correctAnswer: 'Canberra',
    points: 5,
  },
  {
    id: 20,
    text: 'Türkiye Büyük Millet Meclisi hangi yıl açılmıştır?',
    options: ['1919', '1920', '1922', '1923'],
    correctAnswer: '1920',
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
  if (score >= 80) return prizes.find(p => p.id === 'gofret');
  if (score >= 60 && score < 80) return prizes.find(p => p.id === 'etipuf');
  if (score < 60) return prizes.find(p => p.id === 'seker');
  return undefined; // Should not happen if score is valid
};
