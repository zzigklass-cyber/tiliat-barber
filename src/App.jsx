import { useState } from 'react'
import {
  House, Scissors, CalendarDays, UserRound,
  ArrowUpRight, ArrowRight, MapPin, Star,
  Clock, ChevronRight, Check
} from 'lucide-react'
import './App.css'

const masters = [
  { name: 'Александр', role: 'Top Barber', rating: '5.0', initials: 'А' },
  { name: 'Максим', role: 'Senior Barber', rating: '4.9', initials: 'М' },
  { name: 'Дмитрий', role: 'Barber', rating: '4.9', initials: 'Д' },
]

const services = [
  { name: 'Мужская стрижка', price: 1500, time: '45 мин' },
  { name: 'Стрижка бороды', price: 900, time: '30 мин' },
  { name: 'Стрижка + борода', price: 2200, time: '60 мин' },
  { name: 'Камуфляж седины', price: 1200, time: '30 мин' },
  { name: 'Детская стрижка', price: 1000, time: '40 мин' },
]

const navigation = [
  { id: 'home', label: 'Главная', icon: House },
  { id: 'services', label: 'Услуги', icon: Scissors },
  { id: 'booking', label: 'Запись', icon: CalendarDays },
  { id: 'profile', label: 'Профиль', icon: UserRound },
]

const times = [
  '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00'
]

export default function App() {
  const [page, setPage] = useState('home')
  const [master, setMaster] = useState(null)
  const [service, setService] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [bookings, setBookings] = useState([])

  const telegram = window.Telegram?.WebApp
  const username = telegram?.initDataUnsafe?.user?.first_name || 'Гость'

  function navigate(id) {
    setPage(id)
    window.scrollTo(0, 0)
    telegram?.HapticFeedback?.selectionChanged()
  }

  function book() {
    if (!master || !service || !date || !time) return

    setBookings(prev => [
      ...prev,
      { master, service, date, time, id: Date.now() }
    ])

    setMaster(null)
    setService(null)
    setDate('')
    setTime('')
    navigate('profile')
  }

  return (
    <div className="app">

      <header className="header">
        <div className="brand">
          <div className="brand-icon"><Scissors size={23} /></div>
          <div>
            <strong>TILIAT</strong>
            <span>BARBER CLUB</span>
          </div>
        </div>

        <button className="icon-button" onClick={() => navigate('profile')}>
          <UserRound size={21} />
        </button>
      </header>

      <main className="content" key={page}>

        {page === 'home' && (
          <>
            <div className="greeting">
              <span>ТВОЙ СТИЛЬ. ТВОИ ПРАВИЛА.</span>
              <h1>Привет, {username}!</h1>
            </div>

            <section className="hero">
              <div className="hero-tag">
                PREMIUM BARBER CLUB
              </div>

              <h2>СТИЛЬ —<br />ЭТО ХАРАКТЕР.</h2>
              <p>Больше, чем просто стрижка.</p>

              <button className="primary-button"
                onClick={() => navigate('booking')}>
                Записаться <ArrowUpRight size={22} />
              </button>
            </section>

            <div className="info-card">
              <MapPin size={23} />
              <div>
                <strong>TILIAT BARBER</strong>
                <p>Ежедневно с 10:00 до 21:00</p>
              </div>
              <ChevronRight size={20} />
            </div>

            <div className="section-heading">
              <h2>Наши мастера</h2>
              <button onClick={() => navigate('booking')}>
                Все <ArrowRight size={16} />
              </button>
            </div>

            <div className="masters-grid">
              {masters.map(item => (
                <button className="master-card"
                  key={item.name}
                  onClick={() => {
                    setMaster(item.name)
                    navigate('booking')
                  }}>
                  <div className="master-photo">
                    {item.initials}
                    <span className="rating">
                      <Star size={12} fill="currentColor" />
                      {item.rating}
                    </span>
                  </div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </button>
              ))}
            </div>

            <section className="promo-card">
              <span>WELCOME BONUS</span>
              <h2>−15% на первый визит</h2>
              <p>Начни знакомство с TILIAT BARBER.</p>
              <button onClick={() => navigate('booking')}>
                Записаться <ArrowRight size={18} />
              </button>
            </section>
          </>
        )}

        {page === 'services' && (
          <>
            <div className="page-heading">
              <span>PRICE LIST</span>
              <h1>Услуги</h1>
              <p>Выбери то, что подходит именно тебе.</p>
            </div>

            <div className="service-list">
              {services.map(item => (
                <button className="service-card"
                  key={item.name}
                  onClick={() => {
                    setService(item)
                    navigate('booking')
                  }}>
                  <div className="service-icon">
                    <Scissors size={22} />
                  </div>
                  <div className="service-info">
                    <strong>{item.name}</strong>
                    <span><Clock size={13} /> {item.time}</span>
                  </div>
                  <div className="service-price">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </div>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </>
        )}

        {page === 'booking' && (
          <>
            <div className="page-heading">
              <span>ONLINE BOOKING</span>
              <h1>Онлайн-запись</h1>
              <p>Твой новый образ в несколько касаний.</p>
            </div>

            <section className="booking-section">
              <h2>01. Выбери услугу</h2>
              {services.map(item => (
                <button key={item.name}
                  className={`select-card ${service?.name === item.name ? 'selected' : ''}`}
                  onClick={() => setService(item)}>
                  <span>{item.name}</span>
                  <strong>{item.price} ₽</strong>
                </button>
              ))}
            </section>

            <section className="booking-section">
              <h2>02. Выбери мастера</h2>
              {masters.map(item => (
                <button key={item.name}
                  className={`select-card ${master === item.name ? 'selected' : ''}`}
                  onClick={() => setMaster(item.name)}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.role}</p>
                  </div>
                  {master === item.name
                    ? <Check size={20} />
                    : <ChevronRight size={20} />}
                </button>
              ))}
            </section>

            <section className="booking-section">
              <h2>03. Выбери дату</h2>
              <input
                className="date-input"
                type="date"
                min={new Date().toLocaleDateString('en-CA')}
                value={date}
                onChange={e => {
                  setDate(e.target.value)
                  setTime('')
                }}
              />
            </section>

            <section className="booking-section">
              <h2>04. Выбери время</h2>
              <div className="time-grid">
                {times.map(item => (
                  <button key={item}
                    className={`time-button ${time === item ? 'selected' : ''}`}
                    onClick={() => setTime(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <button className="primary-button full"
              disabled={!master || !service || !date || !time}
              onClick={book}>
              Подтвердить запись <ArrowRight size={20} />
            </button>
          </>
        )}

        {page === 'profile' && (
          <>
            <div className="page-heading">
              <span>PERSONAL ACCOUNT</span>
              <h1>Профиль</h1>
            </div>

            <section className="profile-card">
              <div className="avatar">
                <UserRound size={34} />
              </div>
              <h2>{username}</h2>
              <span>BARBER CLUB MEMBER</span>
            </section>

            <div className="section-heading">
              <h2>Мои записи</h2>
              <CalendarDays size={20} />
            </div>

            {bookings.length === 0 ? (
              <div className="empty-card">
                <CalendarDays size={36} />
                <h3>Пока нет записей</h3>
                <p>Самое время обновить свой стиль.</p>
                <button className="primary-button"
                  onClick={() => navigate('booking')}>
                  Записаться
                </button>
              </div>
            ) : (
              bookings.map(item => (
                <div className="appointment-card" key={item.id}>
                  <span className="status">ДЕМО-ЗАПИСЬ</span>
                  <h3>{item.service.name}</h3>
                  <p>Мастер: {item.master}</p>
                  <p>{item.date} · {item.time}</p>
                  <strong>{item.service.price} ₽</strong>
                  <button className="cancel-button"
                    onClick={() => setBookings(prev =>
                      prev.filter(b => b.id !== item.id))}>
                    Отменить запись
                  </button>
                </div>
              ))
            )}

            <div className="footer-brand">
              <Scissors size={22} />
              <strong>TILIAT BARBER</strong>
              <span>STYLE IS EVERYTHING.</span>
            </div>
          </>
        )}

      </main>

      <nav className="bottom-nav">
        {navigation.map(item => {
          const Icon = item.icon
          return (
            <button key={item.id}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              onClick={() => navigate(item.id)}>
              <div className="nav-icon">
                <Icon size={23} strokeWidth={1.8} />
              </div>
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

    </div>
  )
}