import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  X,
  Volume2,
  VolumeX,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  ChevronRight,
} from 'lucide-react'

import './VirtualHost.css'

const ADDRESS =
  'Jl. Akasia Ujung, Pangkalan Kerinci, Pelalawan, Riau'

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(ADDRESS)

const questions = [
  {
    id: 1,
    question: 'Apa itu Bolu Kemojo?',
    answer:
      'Bolu Kemojo merupakan kue tradisional khas Riau yang memiliki bentuk menyerupai bunga kamboja. Kue ini dikenal dengan aroma pandan, tekstur lembut, serta cita rasa manis dan gurih.',
  },
  {
    id: 2,
    question: 'Apa keunikan Bolu Kemojo?',
    answer:
      'Keunikan Bolu Kemojo terletak pada bentuknya yang khas, aroma pandan, serta perpaduan rasa manis dan gurih dari bahan-bahan tradisional seperti santan.',
  },
  {
    id: 3,
    question: 'Apa saja menu Melajo Cake?',
    answer:
      'Melajo Cake menyediakan berbagai pilihan menu, yaitu Bolu Kemojo, Kue Talam, Pie, Bolu BR, dan Bolu Gulung. Yuk, lihat koleksi menu kami!',
    link: '#menu',
    button: 'Lihat Menu',
  },
  {
    id: 4,
    question: 'Di mana lokasi toko?',
    answer:
      'Melajo Cake berlokasi di Jalan Akasia Ujung, Pangkalan Kerinci, Kabupaten Pelalawan, Riau. Kamu dapat membuka Google Maps untuk mencari lokasi tersebut.',
    link: MAPS_URL,
    button: 'Buka Google Maps',
    external: true,
  },
  {
    id: 5,
    question: 'Bagaimana cara memesan?',
    answer:
      'Cara memesannya mudah! Pilih menu favoritmu, tentukan jumlah pesanan, kemudian isi formulir pembelian. Setelah itu, lanjutkan pemesanan melalui WhatsApp.',
    link: '#pemesanan',
    button: 'Pesan Sekarang',
  },
  {
    id: 6,
    question: 'Apakah cocok untuk oleh-oleh?',
    answer:
      'Tentu! Bolu Kemojo merupakan salah satu pilihan oleh-oleh khas Riau yang dapat dinikmati bersama keluarga, teman, maupun sebagai sajian pada acara istimewa.',
  },
]

// Karakter ilustrasi perempuan Melayu.
// SVG langsung dari kode, tidak membutuhkan gambar eksternal.

function MalayCharacter() {
  return (
    <svg
      viewBox="0 0 180 240"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dressGold" x2="1" y2="1">
          <stop stopColor="#F5DDA0" />
          <stop offset="1" stopColor="#B78B43" />
        </linearGradient>

        <linearGradient id="dressGreen" x2="1" y2="1">
          <stop stopColor="#347958" />
          <stop offset="1" stopColor="#082B1C" />
        </linearGradient>

        <radialGradient id="faceColor">
          <stop stopColor="#FFE0BF" />
          <stop offset="1" stopColor="#E5AB84" />
        </radialGradient>
      </defs>

      {/* Bayangan */}
      <ellipse
        cx="90"
        cy="226"
        rx="60"
        ry="10"
        fill="#082B1C"
        opacity=".2"
      />

      {/* Baju Melayu */}
      <path
        d="M60 117 Q36 126 30 164 L20 214
           Q90 232 160 214 L150 164
           Q144 126 120 117 Z"
        fill="url(#dressGreen)"
        stroke="#D4AF61"
        strokeWidth="2"
      />

      {/* Ornamen emas */}
      <path
        d="M70 132 L90 174 L110 132
           M40 205 Q90 220 140 205"
        fill="none"
        stroke="#D4AF61"
        strokeWidth="3"
      />

      {/* Hijab */}
      <path
        d="M90 12 Q28 12 28 79
           Q28 110 53 140
           Q90 157 127 140
           Q152 110 152 79
           Q152 12 90 12"
        fill="url(#dressGreen)"
        stroke="#D4AF61"
        strokeWidth="2"
      />

      {/* Wajah */}
      <ellipse
        cx="90"
        cy="77"
        rx="42"
        ry="49"
        fill="url(#faceColor)"
      />

      {/* Bagian atas hijab */}
      <path
        d="M48 57 Q55 17 90 21
           Q130 21 134 57
           Q92 34 48 57"
        fill="#123E2B"
      />

      {/* Alis */}
      <path
        d="M62 65 Q71 60 79 65
           M101 65 Q109 60 118 65"
        stroke="#594131"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Mata */}
      <ellipse cx="72" cy="76" rx="5" ry="7" fill="#302820" />
      <ellipse cx="108" cy="76" rx="5" ry="7" fill="#302820" />

      <circle cx="73" cy="74" r="2" fill="white" />
      <circle cx="109" cy="74" r="2" fill="white" />

      {/* Pipi */}
      <ellipse cx="60" cy="93" rx="9" ry="5" fill="#DC927F" opacity=".45" />
      <ellipse cx="120" cy="93" rx="9" ry="5" fill="#DC927F" opacity=".45" />

      {/* Senyum */}
      <path
        d="M77 100 Q90 114 103 100"
        stroke="#A75F50"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Lipatan hijab */}
      <path
        d="M49 93 Q57 134 90 142
           Q123 134 131 93"
        fill="none"
        stroke="#D4AF61"
        strokeWidth="2"
      />

      {/* Bros emas */}
      <circle
        cx="90"
        cy="145"
        r="8"
        fill="url(#dressGold)"
      />

      <circle cx="90" cy="145" r="3" fill="#F5DDA0" />

      {/* Tangan */}
      <ellipse
        cx="48"
        cy="188"
        rx="13"
        ry="17"
        fill="#E5AB84"
        transform="rotate(-25 48 188)"
      />

      <ellipse
        cx="132"
        cy="188"
        rx="13"
        ry="17"
        fill="#E5AB84"
        transform="rotate(25 132 188)"
      />

      {/* Piring Bolu Kemojo */}
      <ellipse
        cx="90"
        cy="200"
        rx="47"
        ry="12"
        fill="url(#dressGold)"
      />

      <path
        d="M54 177 Q48 163 65 158
           Q70 147 81 156
           Q90 144 99 156
           Q110 147 115 158
           Q132 163 126 177
           L120 193 Q90 205 60 193 Z"
        fill="#789443"
        stroke="#45612C"
        strokeWidth="2"
      />

      <path
        d="M67 159 L73 194
           M90 156 L90 199
           M113 159 L107 194"
        stroke="#A9BA75"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  )
}

export default function VirtualHost() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const welcomeMessage =
    'Assalamualaikum! Selamat datang di Melajo Cake. Saya Sahabat Melajo. Yuk, kenali kelezatan Bolu Kemojo khas Riau bersama saya!'

  const currentMessage =
    activeQuestion?.answer || welcomeMessage

  const voiceSupported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window

  useEffect(() => {
    return () => {
      if (voiceSupported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [voiceSupported])

  function stopSpeaking() {
    if (voiceSupported) {
      window.speechSynthesis.cancel()
    }

    setIsSpeaking(false)
  }

  function speak(text) {
    if (!voiceSupported) return

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)

    speech.lang = 'id-ID'
    speech.rate = 0.92
    speech.pitch = 1.05
    speech.volume = 1

    const voices = window.speechSynthesis.getVoices()

    const indonesiaVoice = voices.find(
      (voice) => voice.lang.startsWith('id')
    )

    if (indonesiaVoice) {
      speech.voice = indonesiaVoice
    }

    speech.onstart = () => setIsSpeaking(true)
    speech.onend = () => setIsSpeaking(false)
    speech.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(speech)
  }

  function selectQuestion(item) {
    stopSpeaking()
    setActiveQuestion(item)
  }

  function closeHost() {
    stopSpeaking()
    setIsOpen(false)
  }

  return (
    <aside className="virtual-host">

      <AnimatePresence>

        {isOpen && (

          <motion.div
            className="host-panel"
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 24,
            }}
          >

            {/* HEADER */}

            <div className="host-header">

              <div className="host-avatar">
                <MalayCharacter />
              </div>

              <div className="host-identity">
                <h3>Sahabat Melajo</h3>

                <span>
                  <i />
                  Virtual Host
                </span>
              </div>

              <button
                type="button"
                className="host-close"
                onClick={closeHost}
                aria-label="Tutup virtual host"
              >
                <X size={20} />
              </button>

            </div>

            {/* CHAT CONTENT */}

            <div className="host-body">

              <motion.div
                key={activeQuestion?.id || 'welcome'}
                className="host-message"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                aria-live="polite"
              >

                <p>{currentMessage}</p>

                {voiceSupported && (
                  <button
                    type="button"
                    className="host-voice"
                    onClick={() =>
                      isSpeaking
                        ? stopSpeaking()
                        : speak(currentMessage)
                    }
                  >
                    {isSpeaking
                      ? <VolumeX size={16} />
                      : <Volume2 size={16} />
                    }

                    {isSpeaking
                      ? 'Hentikan suara'
                      : 'Dengarkan informasi'
                    }
                  </button>
                )}

                {activeQuestion?.link && (

                  <a
                    className="host-action"
                    href={activeQuestion.link}
                    target={
                      activeQuestion.external
                        ? '_blank'
                        : undefined
                    }
                    rel={
                      activeQuestion.external
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    onClick={closeHost}
                  >
                    {activeQuestion.external
                      ? <MapPin size={16} />
                      : <ArrowUpRight size={16} />
                    }

                    {activeQuestion.button}

                  </a>

                )}

              </motion.div>

              <div className="host-question-title">
                Apa yang ingin kamu ketahui?
              </div>

              <div className="host-questions">

                {questions.map((item) => (

                  <button
                    key={item.id}
                    type="button"
                    className={
                      activeQuestion?.id === item.id
                        ? 'host-question active'
                        : 'host-question'
                    }
                    onClick={() => selectQuestion(item)}
                  >

                    <span>{item.question}</span>

                    <ChevronRight size={15} />

                  </button>

                ))}

              </div>

            </div>

            {/* FOOTER */}

            <div className="host-footer">
              Melajo Cake • Warisan Rasa Melayu
            </div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* FLOATING CHARACTER */}

      <motion.button
        type="button"
        className="host-trigger"
        onClick={() => {
          if (isOpen) {
            closeHost()
          } else {
            setIsOpen(true)
          }
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Buka Sahabat Melajo"
        aria-expanded={isOpen}
      >

        {!isOpen && (

          <div className="host-bubble">

            <MessageCircle size={14} />

            <span>Tanya Melajo, Yuk!</span>

          </div>

        )}

        <div className="host-character">
          <MalayCharacter />
        </div>

      </motion.button>

    </aside>
  )
}