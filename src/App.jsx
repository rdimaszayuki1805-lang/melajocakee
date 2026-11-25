import { useState } from 'react'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion'

import {
  ArrowRight,
  ArrowUpRight,
  Camera as Instagram,
  Gift,
  Heart,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

import VirtualHost from './VirtualHost.jsx'
import Kemojo3D from './Kemojo3D.jsx'

import logo from './images/logomelajo.png'
import kemojoImg from './images/kemojo 1.jpeg'
import talamImg from './images/talam 2.jpeg'
import pieImg from './images/pie 3.jpeg'
import brImg from './images/br 5.jpeg'
import bolgulImg from './images/bolgul 5.jpeg'

import './App.css'

// ======================================
// KONFIGURASI MELAJO CAKE
// ======================================

// Masukkan nomor WhatsApp asli Melajo Cake
const WHATSAPP_NUMBER = ''

const ADDRESS =
  'Jl. Akasia Ujung, Pangkalan Kerinci, Pelalawan, Riau, Indonesia'

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(ADDRESS)

const MAP_EMBED =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent(ADDRESS) +
  '&z=15&output=embed'

// ======================================
// DATA PRODUK
// ======================================

const products = [
  {
    id: 1,
    name: 'Bolu Kemojo',
    category: 'Signature',
    price: 45000,
    image: kemojoImg,
    description:
      'Kue khas Riau dengan aroma pandan dan tekstur lembut, cocok untuk oleh-oleh maupun sajian keluarga.',
  },
  {
    id: 2,
    name: 'Kue Talam',
    category: 'Traditional',
    price: 25000,
    image: talamImg,
    description:
      'Kue talam dengan tampilan cantik dan rasa manis gurih yang lembut di setiap lapisan.',
  },
  {
    id: 3,
    name: 'Pie',
    category: 'Sweet Collection',
    price: 30000,
    image: pieImg,
    description:
      'Pie manis dengan tampilan menarik dan rasa yang cocok untuk teman santai bersama keluarga.',
  },
  {
    id: 4,
    name: 'Bolu B',
    category: 'Cake Collection',
    price: 40000,
    image: brImg,
    description:
      'Pilihan bolu dengan tampilan elegan dan rasa lembut, cocok untuk berbagai acara spesial.',
  },
  {
    id: 5,
    name: 'Bolu Gulung',
    category: 'Favorite',
    price: 35000,
    image: bolgulImg,
    description:
      'Bolu gulung lembut dengan tampilan cantik dan cita rasa yang disukai banyak orang.',
  },
]

// ======================================
// NAVIGASI
// ======================================

const navigation = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Menu', href: '#menu' },
  { label: 'Pemesanan', href: '#pemesanan' },
  { label: 'Lokasi', href: '#lokasi' },
  { label: 'Kontak', href: '#kontak' },
]

// ======================================
// FORMAT RUPIAH
// ======================================

const rupiah = (number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number)

// ======================================
// SCROLL ANIMATION
// ======================================

function Reveal({
  children,
  className = '',
  delay = 0,
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={
        reducedMotion
          ? false
          : { opacity: 0, y: 25 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// ======================================
// SMOOTH 3D TILT
// ======================================

function TiltCard({
  children,
  className = '',
}) {
  const reducedMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(mouseY, {
    stiffness: 90,
    damping: 24,
    mass: 0.8,
  })

  const rotateY = useSpring(mouseX, {
    stiffness: 90,
    damping: 24,
    mass: 0.8,
  })

  function handleMove(event) {
    if (
      reducedMotion ||
      event.pointerType !== 'mouse'
    ) {
      return
    }

    const rect =
      event.currentTarget.getBoundingClientRect()

    const x =
      (event.clientX - rect.left) / rect.width

    const y =
      (event.clientY - rect.top) / rect.height

    mouseX.set((x - 0.5) * 10)
    mouseY.set((0.5 - y) * 10)
  }

  function resetMotion() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      className={`tilt-wrapper ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={resetMotion}
      onPointerCancel={resetMotion}
    >
      <motion.div
        className="tilt-inner"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ======================================
// MAIN APPLICATION
// ======================================

function App() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [method, setMethod] = useState('Ambil sendiri')

  const reducedMotion = useReducedMotion()

  const product =
    products.find(
      (item) => item.id === selectedProduct
    ) || products[0]

  const total = product.price * quantity

  const today = new Date()

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  // ======================================
  // PILIH PRODUK
  // ======================================

  function chooseProduct(id) {
    setSelectedProduct(id)
    setQuantity(1)

    document
      .getElementById('pemesanan')
      ?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
  }

  // ======================================
  // WHATSAPP
  // ======================================

  function openWhatsApp(message) {
    if (!/^[1-9]\d{7,14}$/.test(WHATSAPP_NUMBER)) {
      alert(
        'Nomor WhatsApp Melajo Cake belum dikonfigurasi.'
      )
      return
    }

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message)

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    )
  }

  // ======================================
  // SUBMIT PEMESANAN
  // ======================================

  function submitOrder(event) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    const phone = String(
      form.get('telepon') || ''
    ).trim()

    if (!/^\+?\d{9,15}$/.test(phone)) {
      alert(
        'Silakan masukkan nomor WhatsApp yang valid.'
      )
      return
    }

    const message = [
      '*PEMESANAN MELAJO CAKE*',
      '',
      'Halo Melajo Cake, saya ingin melakukan pemesanan.',
      '',
      '*DATA PELANGGAN*',
      `Nama: ${form.get('nama')}`,
      `WhatsApp: ${phone}`,
      '',
      '*DETAIL PESANAN*',
      `Produk: ${product.name}`,
      `Harga satuan: ${rupiah(product.price)}`,
      `Jumlah: ${quantity}`,
      `Estimasi total: ${rupiah(total)}`,
      `Tanggal: ${form.get('tanggal')}`,
      `Metode: ${method}`,
      `Alamat: ${form.get('alamat') || '-'}`,
      `Catatan: ${form.get('catatan') || '-'}`,
      '',
      'Mohon konfirmasi pesanan saya.',
      'Terima kasih.',
    ].join('\n')

    openWhatsApp(message)
  }

  return (
    <>

      {/* ==================================
          HEADER
      ================================== */}

      <header className="navbar">

        <div className="container nav-inner">

          <a href="#beranda" className="brand">

            <img
              src={logo}
              alt="Logo Melajo Cake"
            />

            <div className="brand-text">

              <span>Melajo Cake</span>

              <small>
                WARISAN RASA MELAYU
              </small>

            </div>

          </a>

          <nav
            className={
              mobileMenu
                ? 'nav-links open'
                : 'nav-links'
            }
          >

            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
              >
                {item.label}
              </a>
            ))}

          </nav>

          <a
            href="#pemesanan"
            className="btn btn-gold nav-order"
          >
            <ShoppingBag size={17} />
            Pesan
          </a>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Buka atau tutup navigasi"
            aria-expanded={mobileMenu}
          >

            {mobileMenu ? <X /> : <Menu />}

          </button>

        </div>

      </header>

      <main>

        {/* ==================================
            HERO
        ================================== */}

        <section
          id="beranda"
          className="hero-v2"
        >

          <div className="hero-blur hero-blur-one" />

          <div className="hero-blur hero-blur-two" />

          <div className="container hero-v2-grid">

            <Reveal className="hero-v2-content">

              <div className="hero-badge">

                <Sparkles size={14} />

                KHAS RIAU • PREMIUM TRADITIONAL CAKE

              </div>

              <h1>

                Kelezatan Tradisional,

                <span>
                  Dalam Sentuhan Modern.
                </span>

              </h1>

              <p>
                Melajo Cake menghadirkan Bolu Kemojo
                dan aneka kue pilihan dengan tampilan
                elegan, rasa khas, dan nuansa Melayu
                yang hangat.
              </p>

              <div className="hero-v2-actions">

                <a
                  href="#menu"
                  className="btn btn-gold"
                >
                  Lihat Menu
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href="#pemesanan"
                  className="btn btn-soft"
                >
                  Pesan Sekarang
                  <ArrowRight size={18} />
                </a>

              </div>

              <div className="hero-v2-meta">

                <div className="meta-item">

                  <Leaf size={18} />

                  <span>Khas Riau</span>

                </div>

                <div className="meta-item">

                  <Gift size={18} />

                  <span>
                    Cocok untuk oleh-oleh
                  </span>

                </div>

                <div className="meta-item">

                  <Heart size={18} />

                  <span>
                    Dibuat dengan cita rasa rumahan
                  </span>

                </div>

              </div>

            </Reveal>

            {/* HERO VISUAL */}

            <Reveal
              className="hero-v2-visual"
              delay={0.15}
            >

              <TiltCard className="hero-product-stage">

                <div className="hero-product-card">

                  <div className="hero-product-ring" />

                  <img
                    src={kemojoImg}
                    alt="Bolu Kemojo Melajo Cake"
                    draggable={false}
                  />

                </div>

              </TiltCard>

              <motion.div
                className="floating-chip chip-one"
                animate={
                  reducedMotion
                    ? { y: 0 }
                    : { y: [0, -8, 0] }
                }
                transition={{
                  duration: 5,
                  repeat: reducedMotion ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >

                <small>Signature</small>

                <strong>Bolu Kemojo</strong>

              </motion.div>

              <motion.div
                className="floating-chip chip-two"
                animate={
                  reducedMotion
                    ? { y: 0 }
                    : { y: [0, -10, 0] }
                }
                transition={{
                  duration: 5.5,
                  repeat: reducedMotion ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >

                <small>Best Choice</small>

                <strong>Oleh-oleh Riau</strong>

              </motion.div>

              <motion.div
                className="floating-chip chip-three"
                animate={
                  reducedMotion
                    ? { y: 0 }
                    : { y: [0, -7, 0] }
                }
                transition={{
                  duration: 4.8,
                  repeat: reducedMotion ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >

                <small>Traditional</small>

                <strong>Cita Rasa Melayu</strong>

              </motion.div>

            </Reveal>

          </div>

        </section>

        {/* ==================================
            TENTANG KAMI
        ================================== */}

        <section
          id="tentang"
          className="section about"
        >

          <div className="container about-grid">

            <Reveal className="about-image">

              <img
                src={kemojoImg}
                alt="Bolu Kemojo tradisional"
                loading="lazy"
              />

              <div className="about-stamp">

                <img
                  src={logo}
                  alt="Melajo Cake"
                />

              </div>

            </Reveal>

            <Reveal className="about-content">

              <span className="section-label">
                TENTANG KAMI
              </span>

              <h2>

                Cita rasa tradisional,

                <em> tampil lebih elegan.</em>

              </h2>

              <p>
                Melajo Cake hadir untuk membawa
                sajian khas Melayu menjadi lebih
                menarik, modern, dan tetap
                mempertahankan keaslian rasa.
              </p>

              <p>
                Bolu Kemojo merupakan salah satu
                kuliner tradisional khas Riau yang
                dikenal dengan bentuk menyerupai
                bunga kamboja, aroma pandan,
                serta cita rasa manis dan gurih.
              </p>

              <p>
                Kami menghadirkan Bolu Kemojo dan
                aneka kue pilihan dengan tampilan
                cantik, cocok untuk keluarga,
                acara spesial, maupun oleh-oleh
                khas Riau.
              </p>

            </Reveal>

          </div>

        </section>

        {/* ==================================
            MENU PRODUK
        ================================== */}

        <section
          id="menu"
          className="section products-section"
        >

          <div className="container">

            <Reveal className="section-heading">

              <span className="section-label">
                MENU PILIHAN
              </span>

              <h2>
                Koleksi Menu Melajo Cake
              </h2>

              <p>
                Temukan berbagai pilihan kue
                dengan cita rasa istimewa untuk
                menemani setiap momen kebersamaan.
              </p>

            </Reveal>

            <div className="product-grid">

              {products.map((item, index) => (

                <Reveal
                  key={item.id}
                  delay={index * 0.08}
                >

                  <TiltCard className="product-tilt">

                    <article className="product-card">

                      <div className="product-image">

                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                        />

                        {item.id === 1 && (

                          <span className="product-badge">
                            Signature
                          </span>

                        )}

                      </div>

                      <div className="product-info">

                        <small>
                          {item.category}
                        </small>

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          {item.description}
                        </p>

                        <div className="product-bottom">

                          <strong>
                            {rupiah(item.price)}
                          </strong>

                          <button
                            type="button"
                            className="product-order"
                            onClick={() =>
                              chooseProduct(item.id)
                            }
                            aria-label={`Pesan ${item.name}`}
                          >

                            <ArrowUpRight size={22} />

                          </button>

                        </div>

                      </div>

                    </article>

                  </TiltCard>

                </Reveal>

              ))}

            </div>

          </div>

        </section>

        {/* ==================================
            PEMESANAN
        ================================== */}

        <section
          id="pemesanan"
          className="section order-section"
        >

          <div className="container">

            <Reveal className="section-heading">

              <span className="section-label">
                PEMESANAN
              </span>

              <h2>
                Pesan Menu Favoritmu
              </h2>

              <p>
                Isi formulir berikut, lalu pesanan
                otomatis diarahkan ke WhatsApp.
              </p>

            </Reveal>

            <div className="order-layout">

              {/* RINGKASAN PESANAN */}

              <Reveal className="order-summary">

                <span className="section-label">
                  PILIHAN KAMU
                </span>

                <img
                  className="summary-image"
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <div className="summary-row">

                  <span>Harga satuan</span>

                  <strong>
                    {rupiah(product.price)}
                  </strong>

                </div>

                <div className="summary-row">

                  <span>Jumlah</span>

                  <strong>{quantity}</strong>

                </div>

                <div className="summary-total">

                  <span>Estimasi Total</span>

                  <strong>{rupiah(total)}</strong>

                </div>

                <small>
                  Belum termasuk ongkir bila
                  menggunakan pengantaran.
                </small>

              </Reveal>

              {/* FORM PEMESANAN */}

              <Reveal className="order-form-wrapper">

                <form
                  className="order-form"
                  onSubmit={submitOrder}
                >

                  <h3>Form Pemesanan</h3>

                  <div className="form-grid">

                    <label>

                      Nama lengkap

                      <input
                        name="nama"
                        type="text"
                        placeholder="Nama kamu"
                        required
                      />

                    </label>

                    <label>

                      Nomor WhatsApp

                      <input
                        name="telepon"
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        inputMode="tel"
                        required
                      />

                    </label>

                  </div>

                  <label>

                    Pilih produk

                    <select
                      value={selectedProduct}
                      onChange={(event) =>
                        setSelectedProduct(
                          Number(event.target.value)
                        )
                      }
                    >

                      {products.map((item) => (

                        <option
                          key={item.id}
                          value={item.id}
                        >

                          {item.name} — {rupiah(item.price)}

                        </option>

                      ))}

                    </select>

                  </label>

                  <div className="form-grid">

                    <div>

                      <label>
                        Jumlah pesanan
                      </label>

                      <div className="quantity-control">

                        <button
                          type="button"
                          disabled={quantity <= 1}
                          aria-label="Kurangi jumlah pesanan"
                          onClick={() =>
                            setQuantity((value) =>
                              Math.max(1, value - 1)
                            )
                          }
                        >

                          <Minus size={18} />

                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          disabled={quantity >= 100}
                          aria-label="Tambah jumlah pesanan"
                          onClick={() =>
                            setQuantity((value) =>
                              Math.min(100, value + 1)
                            )
                          }
                        >

                          <Plus size={18} />

                        </button>

                      </div>

                    </div>

                    <label>

                      Tanggal pesanan

                      <input
                        type="date"
                        name="tanggal"
                        min={minDate}
                        required
                      />

                    </label>

                  </div>

                  <label>

                    Metode pengambilan

                    <select
                      value={method}
                      onChange={(event) =>
                        setMethod(event.target.value)
                      }
                    >

                      <option>
                        Ambil sendiri
                      </option>

                      <option>
                        Pengantaran
                      </option>

                    </select>

                  </label>

                  {method === 'Ambil sendiri' && (

                    <div className="pickup-information">

                      <MapPin size={19} />

                      <div>

                        <strong>
                          Lokasi pengambilan
                        </strong>

                        <p>{ADDRESS}</p>

                        <a
                          href={MAPS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Lihat Google Maps
                          <ArrowUpRight size={14} />
                        </a>

                      </div>

                    </div>

                  )}

                  {method === 'Pengantaran' && (

                    <label>

                      Alamat pengantaran

                      <textarea
                        name="alamat"
                        rows={3}
                        placeholder="Masukkan alamat lengkap"
                        required
                      />

                    </label>

                  )}

                  <label>

                    Catatan tambahan

                    <textarea
                      name="catatan"
                      rows={3}
                      placeholder="Contoh: untuk acara keluarga"
                    />

                  </label>

                  <button
                    type="submit"
                    className="btn submit-button"
                  >

                    <MessageCircle size={20} />

                    Lanjutkan ke WhatsApp

                  </button>

                </form>

              </Reveal>

            </div>

          </div>

        </section>

        {/* ==================================
            LOKASI TOKO
        ================================== */}

        <section
          id="lokasi"
          className="section store-section"
        >

          <div className="container">

            <Reveal className="section-heading">

              <span className="section-label">
                VISIT OUR STORE
              </span>

              <h2>
                Temukan Kami Lebih Dekat.
              </h2>

              <p>
                Kunjungi Melajo Cake dan nikmati
                kelezatan kuliner khas Riau.
              </p>

            </Reveal>

            <div className="store-layout">

              <Reveal className="store-information">

                <div className="store-icon">

                  <MapPin size={30} />

                </div>

                <span className="store-label">
                  OUR LOCATION
                </span>

                <h3>Melajo Cake</h3>

                <p>{ADDRESS}</p>

                <div className="store-description">

                  <p>
                    Temukan berbagai pilihan kue
                    tradisional Melajo Cake di
                    Pangkalan Kerinci, Pelalawan.
                  </p>

                </div>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >

                  <MapPin size={18} />

                  Buka Google Maps

                  <ArrowUpRight size={18} />

                </a>

              </Reveal>

              <Reveal className="store-map">

                <iframe
                  title="Peta lokasi Melajo Cake"
                  src={MAP_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </Reveal>

            </div>

          </div>

        </section>

      </main>

      {/* ==================================
          FOOTER
      ================================== */}

      <footer
        id="kontak"
        className="footer"
      >

        <div className="container footer-grid">

          <div className="footer-brand">

            <img
              src={logo}
              alt="Melajo Cake"
            />

            <h3>Melajo Cake</h3>

            <p>
              Menyajikan kehangatan rasa
              tradisional Melayu dalam tampilan
              yang cantik dan modern.
            </p>

          </div>

          <div>

            <h4>Navigasi</h4>

            {navigation.map((item) => (

              <a
                key={item.href}
                href={item.href}
              >

                {item.label}

              </a>

            ))}

          </div>

          <div>

            <h4>Hubungi Kami</h4>

            <a
              className="footer-contact"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >

              <MapPin size={19} />

              <span>{ADDRESS}</span>

            </a>

            <button
              type="button"
              className="footer-button"
              onClick={() =>
                openWhatsApp(
                  'Halo Melajo Cake, saya ingin bertanya.'
                )
              }
            >

              <MessageCircle size={17} />

              WhatsApp

            </button>

            <span className="footer-contact">

              <Instagram size={17} />

              Melajo Cake

            </span>

          </div>

        </div>

        <div className="container footer-bottom">

          <span>

            © {new Date().getFullYear()} Melajo Cake.
            All rights reserved.

          </span>

          <span>
            Made with love from Riau.
          </span>

        </div>

      </footer>

      {/* ==================================
          FLOATING WHATSAPP
      ================================== */}

      <button
        type="button"
        className="floating-whatsapp"
        aria-label="Hubungi Melajo Cake melalui WhatsApp"
        onClick={() =>
          openWhatsApp(
            'Halo Melajo Cake, saya ingin bertanya.'
          )
        }
      >

        <MessageCircle size={27} />

      </button>

      {/* ==================================
          VIRTUAL HOST
      ================================== */}

      <VirtualHost />

    </>
  )
}

export default App