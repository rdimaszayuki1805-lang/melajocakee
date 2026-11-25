import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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

import logo from './images/logomelajo.png'
import kemojoImg from './images/kemojo 1.jpeg'
import talamImg from './images/talam 2.jpeg'
import pieImg from './images/pie 3.jpeg'
import brImg from './images/br 5.jpeg'
import bolgulImg from './images/bolgul 5.jpeg'

import './App.css'

const WHATSAPP_NUMBER = '' // isi nomor WA nanti. contoh: 6281234567890

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

const navigation = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Menu', href: '#menu' },
  { label: 'Pemesanan', href: '#pemesanan' },
  { label: 'Kontak', href: '#kontak' },
]

const rupiah = (number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number)

function Reveal({ children, className = '', delay = 0 }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  )
}

function TiltCard({ children, className = '' }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  function handleMove(event) {
    if (reducedMotion || event.pointerType !== 'mouse') return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    setRotation({
      x: (0.5 - y) * 8,
      y: (x - 0.5) * 8,
    })
  }

  return (
    <div
      className={`tilt-wrapper ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={() => setRotation({ x: 0, y: 0 })}
    >
      <motion.div
        className="tilt-inner"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 140,
          damping: 18,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function App() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [method, setMethod] = useState('Ambil sendiri')

  const product =
    products.find((item) => item.id === selectedProduct) || products[0]

  const total = product.price * quantity

  const today = new Date()
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  function chooseProduct(id) {
    setSelectedProduct(id)
    setQuantity(1)

    document
      .getElementById('pemesanan')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  function openWhatsApp(message) {
    if (!/^[1-9]\d{7,14}$/.test(WHATSAPP_NUMBER)) {
      alert(
        'Nomor WhatsApp belum diisi. Silakan isi const WHATSAPP_NUMBER di App.jsx.'
      )
      return
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  function submitOrder(event) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    const message = [
      '*PEMESANAN MELAJO CAKE*',
      '',
      'Halo Melajo Cake, saya ingin melakukan pemesanan.',
      '',
      '*DATA PELANGGAN*',
      `Nama: ${form.get('nama')}`,
      `WhatsApp: ${form.get('telepon')}`,
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
      'Mohon konfirmasi pesanan saya. Terima kasih.',
    ].join('\n')

    openWhatsApp(message)
  }

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <a href="#beranda" className="brand">
            <img src={logo} alt="Logo Melajo Cake" />
            <div className="brand-text">
              <span>Melajo Cake</span>
              <small>WARISAN RASA MELAYU</small>
            </div>
          </a>

          <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
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

          <a href="#pemesanan" className="btn btn-gold nav-order">
            <ShoppingBag size={17} />
            Pesan
          </a>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Buka atau tutup navigasi"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="beranda" className="hero-v2">
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
                <span>Dalam Sentuhan Modern.</span>
              </h1>

              <p>
                Melajo Cake menghadirkan Bolu Kemojo dan aneka kue pilihan
                dengan tampilan elegan, rasa khas, dan nuansa Melayu yang
                hangat.
              </p>

              <div className="hero-v2-actions">
                <a href="#menu" className="btn btn-gold">
                  Lihat Menu
                  <ArrowUpRight size={18} />
                </a>

                <a href="#pemesanan" className="btn btn-soft">
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
                  <span>Cocok untuk oleh-oleh</span>
                </div>

                <div className="meta-item">
                  <Heart size={18} />
                  <span>Dibuat dengan cita rasa rumahan</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="hero-v2-visual" delay={0.15}>
              <TiltCard className="hero-product-stage">
                <div className="hero-product-card">
                  <div className="hero-product-ring" />
                  <img src={kemojoImg} alt="Bolu Kemojo Melajo Cake" />
                </div>
              </TiltCard>

              <motion.div
                className="floating-chip chip-one"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <small>Signature</small>
                <strong>Bolu Kemojo</strong>
              </motion.div>

              <motion.div
                className="floating-chip chip-two"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.5, repeat: Infinity }}
              >
                <small>Best Choice</small>
                <strong>Oleh-oleh Riau</strong>
              </motion.div>

              <motion.div
                className="floating-chip chip-three"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity }}
              >
                <small>Fresh</small>
                <strong>Setiap Hari</strong>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ABOUT */}
        <section id="tentang" className="section about">
          <div className="container about-grid">
            <Reveal className="about-image">
              <img src={kemojoImg} alt="Bolu Kemojo tradisional" />
              <div className="about-stamp">
                <img src={logo} alt="Melajo Cake" />
              </div>
            </Reveal>

            <Reveal className="about-content">
              <span className="section-label">TENTANG KAMI</span>

              <h2>
                Cita rasa tradisional,
                <em> tampil lebih elegan.</em>
              </h2>

              <p>
                Melajo Cake hadir untuk membawa sajian khas Melayu menjadi lebih
                menarik, modern, dan tetap mempertahankan keaslian rasa.
              </p>

              <p>
                Kami menghadirkan Bolu Kemojo dan aneka kue pilihan dengan
                tampilan cantik, cocok untuk keluarga, acara spesial, maupun
                oleh-oleh khas Riau.
              </p>
            </Reveal>
          </div>
        </section>

        {/* MENU */}
        <section id="menu" className="section products-section">
          <div className="container">
            <Reveal className="section-heading">
              <span className="section-label">MENU PILIHAN</span>
              <h2>Koleksi Menu Melajo Cake</h2>
              <p>
                Menu di bawah ini sudah memakai gambar asli yang ada di folder
                <strong> src/images</strong>.
              </p>
            </Reveal>

            <div className="product-grid">
              {products.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.08}>
                  <TiltCard className="product-tilt">
                    <article className="product-card">
                      <div className="product-image">
                        <img src={item.image} alt={item.name} />
                        {item.id === 1 && (
                          <span className="product-badge">Signature</span>
                        )}
                      </div>

                      <div className="product-info">
                        <small>{item.category}</small>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>

                        <div className="product-bottom">
                          <strong>{rupiah(item.price)}</strong>

                          <button
                            type="button"
                            className="product-order"
                            onClick={() => chooseProduct(item.id)}
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

        {/* ORDER */}
        <section id="pemesanan" className="section order-section">
          <div className="container">
            <Reveal className="section-heading">
              <span className="section-label">PEMESANAN</span>
              <h2>Pesan Menu Favoritmu</h2>
              <p>
                Isi formulir berikut, lalu pesanan otomatis diarahkan ke
                WhatsApp.
              </p>
            </Reveal>

            <div className="order-layout">
              <Reveal className="order-summary">
                <span className="section-label">PILIHAN KAMU</span>

                <img
                  className="summary-image"
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <div className="summary-row">
                  <span>Harga satuan</span>
                  <strong>{rupiah(product.price)}</strong>
                </div>

                <div className="summary-row">
                  <span>Jumlah</span>
                  <strong>{quantity}</strong>
                </div>

                <div className="summary-total">
                  <span>Estimasi Total</span>
                  <strong>{rupiah(total)}</strong>
                </div>

                <small>Belum termasuk ongkir bila pengantaran.</small>
              </Reveal>

              <Reveal className="order-form-wrapper">
                <form className="order-form" onSubmit={submitOrder}>
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
                        required
                      />
                    </label>
                  </div>

                  <label>
                    Pilih produk
                    <select
                      value={selectedProduct}
                      onChange={(event) =>
                        setSelectedProduct(Number(event.target.value))
                      }
                    >
                      {products.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} — {rupiah(item.price)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="form-grid">
                    <div>
                      <label>Jumlah pesanan</label>
                      <div className="quantity-control">
                        <button
                          type="button"
                          disabled={quantity <= 1}
                          onClick={() =>
                            setQuantity((value) => Math.max(1, value - 1))
                          }
                        >
                          <Minus size={18} />
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((value) => Math.min(100, value + 1))
                          }
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    <label>
                      Tanggal pesanan
                      <input type="date" name="tanggal" min={minDate} required />
                    </label>
                  </div>

                  <label>
                    Metode pengambilan
                    <select
                      value={method}
                      onChange={(event) => setMethod(event.target.value)}
                    >
                      <option>Ambil sendiri</option>
                      <option>Pengantaran</option>
                    </select>
                  </label>

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

                  <button type="submit" className="btn submit-button">
                    <MessageCircle size={20} />
                    Lanjutkan ke WhatsApp
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer id="kontak" className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="Melajo Cake" />
            <h3>Melajo Cake</h3>
            <p>
              Menyajikan kehangatan rasa tradisional Melayu dalam tampilan yang
              cantik dan modern.
            </p>
          </div>

          <div>
            <h4>Navigasi</h4>
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div>
            <h4>Hubungi Kami</h4>
            <span className="footer-contact">
              <MapPin size={17} />
              Riau, Indonesia
            </span>

            <button
              type="button"
              className="footer-button"
              onClick={() =>
                openWhatsApp('Halo Melajo Cake, saya ingin bertanya.')
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
          <span>© {new Date().getFullYear()} Melajo Cake. All rights reserved.</span>
          <span>Made with love from Riau.</span>
        </div>
      </footer>

      <button
        type="button"
        className="floating-whatsapp"
        onClick={() =>
          openWhatsApp('Halo Melajo Cake, saya ingin bertanya.')
        }
      >
        <MessageCircle size={27} />
      </button>
    </>
  )
}

export default App