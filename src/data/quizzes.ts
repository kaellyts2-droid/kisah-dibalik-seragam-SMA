export interface QuizQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  crushReaction: {
    rian: string;
    alya: string;
    reza: string;
  };
}

export const STUDY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    subject: 'Bahasa Indonesia (Gaya Bahasa / Majas)',
    question: 'Kalimat: "Suara denting bel sekolah itu memanggil-manggil seluruh murid untuk segera kembali ke ruang kelas" menggunakan majas...',
    options: [
      'Personifikasi (menganggap benda mati berprilaku seperti manusia)',
      'Metafora (perbandingan langsung tanpa kata pembanding)',
      'Hiperbola (pernyataan berlebihan)',
      'Litotes (merendahkan diri sendiri)'
    ],
    correctIndex: 0,
    explanation: 'Personifikasi adalah gaya bahasa yang melekatkan sifat-sifat insani atau perilaku manusia kepada benda mati atau ide abstrak.',
    crushReaction: {
      rian: 'Wah bener! Aku tadinya mikir hiperbola karena belnya kenceng banget kayak toa masjid komplek haha!',
      alya: 'Tepat sekali! Bel sekolah yang "memanggil" adalah contoh klasik personifikasi. Pemahaman sastramu bagus banget!',
      reza: 'Cieee pinter amat calon ranking satu! Buat hadiahnya, nanti pulang sekolah aku traktir seblak deh!',
    },
  },
  {
    id: 2,
    subject: 'Sejarah Nasional Indonesia',
    question: 'Kongres Pemuda II yang melahirkan ikrar sakral Sumpah Pemuda diselenggarakan pada tanggal dan tahun berapa?',
    options: [
      '20 Mei 1908',
      '28 Oktober 1928',
      '17 Agustus 1945',
      '10 November 1945'
    ],
    correctIndex: 1,
    explanation: 'Sumpah Pemuda diikrarkan pada 28 Oktober 1928 di Jakarta oleh para pemuda dari Jong Java, Jong Sumatranen Bond, Jong Celebes, dsb.',
    crushReaction: {
      rian: 'Mantap! Untung kemarin aku sempat ngafal tanggal ini pas disuruh Bu Guru nulis rangkuman!',
      alya: 'Benar! Tanggal yang mengubah arah persatuan bangsa kita. Bangga deh bisa belajar bareng kamu.',
      reza: 'Ingat terus ya tanggalnya! Jangan kayak kamu yang sering lupa hari ulang tahunku!',
    },
  },
  {
    id: 3,
    subject: 'Matematika & Logika Analitik',
    question: 'Jika pola bilangan adalah 3, 7, 15, 31, 63, ..., berapakah angka berikutnya pada deret tersebut?',
    options: [
      '127 (Setiap suku dikali 2 lalu ditambah 1)',
      '95 (Ditambah kelipatan 16)',
      '126 (Kelipatan bilangan genap)',
      '131 (Deret bilangan prima acak)'
    ],
    correctIndex: 0,
    explanation: 'Polanya adalah Un = (Un-1 * 2) + 1. Suku terakhir: 63 * 2 + 1 = 127.',
    crushReaction: {
      rian: 'Gila cepet banget ngitungnya! Ajari aku rumus kilatnya dong, biar gak remedial lagi...',
      alya: 'Jawaban yang sangat tepat! Logika matematikamu tajam sekali, kita pasti bisa tembus kampus impian bareng.',
      reza: 'Fix, waktu ujian nasional nanti kursi kita harus deketan pokoknya, jangan pelit-pelit ya sob haha!',
    },
  },
];
