import { CharacterId, CharacterExpression } from '../types/game';

export interface CharacterProfile {
  id: CharacterId;
  name: string;
  fullName: string;
  role: string;
  tagline: string;
  badge: string;
  accentColor: string;
  themeGradient: string;
  description: string;
  birthday: string;
  favoriteFood: string;
  personality: string[];
}

export const CHARACTERS: Record<CharacterId, CharacterProfile> = {
  rian: {
    id: 'rian',
    name: 'Rian',
    fullName: 'Rian Baskara',
    role: 'Kapten Basket & Bintang Olahraga SMA',
    tagline: 'Mungkin aku payah di rumus Fisika, tapi di lapangan, aku nggak pernah nyerah!',
    badge: 'Atlet Populer',
    accentColor: '#F97316', // Orange sporty
    themeGradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    description: 'Kapten tim basket SMA Nusantara yang atletis, ramah, dan punya senyum menawan. Di balik popularitasnya, ia sering pusing menghadapi nilai akademik dan butuh teman belajar yang sabar.',
    birthday: '14 Juli',
    favoriteFood: 'Es Teh Manis Jumbo & Nasi Goreng Kantin',
    personality: ['Enerjik', 'Hangat', 'Sedikit Ceroboh', 'Penuh Semangat'],
  },
  alya: {
    id: 'alya',
    name: 'Alya',
    fullName: 'Alya Safira',
    role: 'Anggota Klub Perpustakaan & Juara Kelas',
    tagline: 'Buku selalu punya cerita rahasia... sama seperti hatiku saat melihatmu.',
    badge: 'Gadis Cerdas & Pendiam',
    accentColor: '#38BDF8', // Soft sky blue
    themeGradient: 'from-sky-500/20 via-indigo-500/10 to-transparent',
    description: 'Gadis berkacamata yang anggun dan berprestasi di bidang akademik. Terlihat pendiam di luar, tapi diam-diam ia suka menulis naskah novel romantis indie dan sering menyendiri di sudut perpustakaan.',
    birthday: '28 Oktober',
    favoriteFood: 'Roti Bakar Cokelat Keju & Susu Hangat',
    personality: ['Pintar', 'Teliti', 'Pemalu', 'Puitis'],
  },
  reza: {
    id: 'reza',
    name: 'Reza',
    fullName: 'Reza Pratama',
    role: 'Sahabat Masa Kecil & Pentolan Kelas',
    tagline: 'Dari dulu kita selalu bareng... jangan sampai kamu pura-pura nggak sadar perasaanku, ya!',
    badge: 'Sahabat Sejati',
    accentColor: '#EC4899', // Playful pink
    themeGradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    description: 'Teman satu bangku sejak SMP. Orangnya humoris, suka menjahili orang lain, dan selalu ada saat kamu butuh tebengan motor atau teman jajan cilok. Diam-diam menyembunyikan perasaan cintanya bertahun-tahun.',
    birthday: '03 April',
    favoriteFood: 'Cilok Bumbu Kacang & Keripik Pedas',
    personality: ['Humoris', 'Protektif', 'Sarkas Manis', 'Setia Kawan'],
  },
};

export const ARCHETYPES = [
  {
    id: 'murid_baru',
    name: 'Murid Pindahan Baru',
    subtitle: 'Misterius & Cepat Beradaptasi',
    bonusText: 'Bonus: +25% Penguatan Hati (Affinity Gain)',
    description: 'Kamu baru saja pindah ke SMA Nusantara di awal semester baru. Kehadiranmu menarik perhatian banyak murid dan membuka pesona segar.',
    iconColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  },
  {
    id: 'ketua_osis',
    name: 'Ketua OSIS Berwibawa',
    subtitle: 'Disiplin, Populer & Bertanggung Jawab',
    bonusText: 'Bonus: Nilai Akademik Awal Tinggi (+20 Poin)',
    description: 'Memiliki reputasi teladan di sekolah dan dihormati para guru. Membuka opsi percakapan diplomatis dan ketegasan memimpin.',
    iconColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
  },
  {
    id: 'klub_seni',
    name: 'Anggota Klub Seni & Musik',
    subtitle: 'Ekspresif, Puitis & Kreatif',
    bonusText: 'Bonus: Membuka Dialog Rahasia Khusus Seni',
    description: 'Jiwa kreatif yang pandai memainkan melodi gitar dan mengabadikan momen sekolah. Membuka topik pembicaraan mendalam dan intim.',
    iconColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  },
] as const;
