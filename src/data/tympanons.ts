import t1 from '../assets/images/timpanoni/1.png'
import t2 from '../assets/images/timpanoni/2.png'
import t3 from '../assets/images/timpanoni/3.png'
import t4 from '../assets/images/timpanoni/4.png'
import t5 from '../assets/images/timpanoni/5.png'
import t6 from '../assets/images/timpanoni/6.png'
import t7 from '../assets/images/timpanoni/7.png'
import h1 from '../assets/images/timpanoni/tympanon1.JPG'
import h2 from '../assets/images/timpanoni/tympanon2.JPG'
import h3 from '../assets/images/timpanoni/tympanon3.JPG'
import h4 from '../assets/images/timpanoni/tympanon4.JPG'
import h5 from '../assets/images/timpanoni/tympanon5.JPG'
import h6 from '../assets/images/timpanoni/tympanon6.JPG'
import h7 from '../assets/images/timpanoni/tympanon7.JPG'

export type TympanonStatus = 'locked' | 'unlocked'

export interface Tympanon {
  id: string
  name: string
  lat: number
  lng: number
  status: TympanonStatus
  subtitle: string
  storyTitle: string
  story: string
  image: string
  headerImage: string
}

export const tympanons: Tympanon[] = [
  {
    id: '1',
    name: 'Тимпанон 1',
    lat: 41.366310196011774,
    lng: 21.248645177911477,
    status: 'unlocked',
    subtitle: 'Крушево · изграден 1870 г.',
    storyTitle: 'Историска приказна',
    story:
      'Старата пазарска чаршија била срцето на трговскиот живот во Крушево уште од втората половина на 19 век. Калдрмисаните улици и каменните дуќани со тимпанони над влезовите сведочат за времето кога градот бил важно занаетчиско и трговско средиште на Балканот.',
    image: t1,
    headerImage: h1,
  },
  {
    id: '2',
    name: 'Тимпанон 2',
    lat: 41.36619646340963,
    lng: 21.249147993157855,
    status: 'unlocked',
    subtitle: 'Крушево · отворен 1974 г.',
    storyTitle: 'Историска приказна',
    story:
      'Споменикот Македониум е изграден во 1974 година во чест на Илинденското востание и Крушевската Република од 1903 година. Неговата купола, во форма на стилизирано сонце, симболизира борбата за слобода и претставува едно од најпрепознатливите обележја на Крушево.',
    image: t2,
    headerImage: h2,
  },
  {
    id: '3',
    name: 'Тимпанон 3',
    lat: 41.36613557259697,
    lng: 21.24867434215447,
    status: 'unlocked',
    subtitle: 'Крушево · изграден 1962 г.',
    storyTitle: 'Историска приказна',
    story:
      'Музејот е посветен на Илинденското востание и десетдневната Крушевска Република од 1903 година. Поставките чуваат оригинални документи, фотографии и предмети од востаниците, а зградата стои на местото каде што бил прогласен манифестот на републиката.',
    image: t3,
    headerImage: h3,
  },
  {
    id: '4',
    name: 'Тимпанон 4',
    lat: 41.366136511600956,
    lng: 21.248672035104356,
    status: 'locked',
    subtitle: 'Крушево · изградена 1894 г.',
    storyTitle: 'Историска приказна',
    story:
      'Родната куќа на војводата Питу Гули е типичен пример на крушевската градежна традиција, со резбани дрвени тавани и тимпанони над прозорците. Денес во неа е уредена меморијална поставка посветена на животот и делото на легендарниот војвода.',
    image: t4,
    headerImage: h4,
  },
  {
    id: '5',
    name: 'Тимпанон 5',
    lat: 41.36726082819428,
    lng: 21.24964018506185,
    status: 'locked',
    subtitle: 'Крушево · изградена 1851 г.',
    storyTitle: 'Историска приказна',
    story:
      'Црквата Св. Никола е една од најстарите богослужбени згради во Крушево, позната по својот резбан иконостас изработен од домашни мајстори-резбари. Камбанаријата на црквата со децении служела и како ориентир за патниците кои доаѓале од долината.',
    image: t5,
    headerImage: h5,
  },
  {
    id: '6',
    name: 'Тимпанон 6',
    lat: 41.367389269313804,
    lng: 21.24757617008181,
    status: 'locked',
    subtitle: 'Крушево · спомен-обележје од 1903 г.',
    storyTitle: 'Историска приказна',
    story:
      'Мечкин Камен е местото каде во август 1903 година се одиграла последната одбрана на востаниците предводени од Питу Гули против турската армија. Денес тука стои спомен-чешма и плоча во чест на загинатите бранители на Крушевската Република.',
    image: t6,
    headerImage: h6,
  },
  {
    id: '7',
    name: 'Тимпанон 7',
    lat: 41.36738651734568,
    lng: 21.247581415514617,
    status: 'locked',
    subtitle: 'Крушево · изградена 1830 г.',
    storyTitle: 'Историска приказна',
    story:
      'Часовниковата кула отчукува часови над Крушево уште од 1830 година и претставува еден од симболите на градот. Изградена од дотесан камен, кулата некогаш им помагала на жителите да го следат времето за работа, пазарните дни и црковните служби.',
    image: t7,
    headerImage: h7,
  },
]
