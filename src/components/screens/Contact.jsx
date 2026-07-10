import { useState } from 'react'
import Ransom from '../Ransom'
import { contactEmail } from '../../data/model'
import { asset } from '../../utils/asset'

const CHIPS = [
  { href: `mailto:${contactEmail}`, label: 'Email ✉' },
  { href: 'https://www.linkedin.com/in/ianrio/', label: 'LinkedIn ↗' },
  { href: 'https://github.com/ianrio', label: 'GitHub ↗' },
  { href: asset('assets/cv/ian-cv.pdf'), label: 'CV ⬇', download: 'ian-cv.pdf' },
]

export default function Contact({ active, onBack, onSuccessSound }) {
  const [values, setValues] = useState({ name: '', email: '', message: '', _honey: '' })
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values._honey) return
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus('Rellena los tres campos primero.')
      return
    }
    setSending(true)
    setStatus('Enviando…')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          _subject: `Mensaje del portfolio de ${values.name}`,
        }),
      })
      if (!res.ok) throw new Error(res.status)
      setStatus('¡Enviado! Te responderé pronto.')
      setValues({ name: '', email: '', message: '', _honey: '' })
      onSuccessSound?.()
    } catch {
      setStatus('No pude alcanzar el relay, abriendo tu cliente de correo…')
      const subject = encodeURIComponent(`Mensaje del portfolio de ${values.name}`)
      const body = encodeURIComponent(`${values.message}\n\nResponder a: ${values.email}`)
      location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      className={`screen sub align-right${active ? ' active' : ''}`}
      id="screen-contact"
      aria-label="Contact"
    >
      <div className="screen-head"><Ransom text="CONTACTO" /></div>
      <button className="back-hint" onClick={onBack}>ESC · Volver</button>

      <div className="paper" style={{ maxWidth: 620 }}>
        <p>
          Estoy abierto a <strong>ofertas de trabajo</strong>.
          Escríbeme por el formulario o por cualquiera de estas redes:
        </p>
      </div>

      <div className="contact-list">
        {CHIPS.map((c) => (
          <a
            key={c.label}
            className="contact-chip"
            href={c.href}
            {...(c.download ? { download: c.download } : { target: '_blank', rel: 'noopener' })}
          >
            <span>{c.label}</span>
          </a>
        ))}
      </div>

      <form
        id="contact-form"
        className="paper"
        style={{ maxWidth: 620 }}
        noValidate
        onSubmit={onSubmit}
      >
        <div className="form-head">Envíame un mensaje</div>
        <label className="field">
          <span>Nombre</span>
          <input
            type="text"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            value={values.name}
            onChange={onChange}
          />
        </label>
        <label className="field">
          <span>Tu email</span>
          <input
            type="email"
            name="email"
            required
            maxLength={150}
            autoComplete="email"
            value={values.email}
            onChange={onChange}
          />
        </label>
        <label className="field">
          <span>Mensaje</span>
          <textarea
            name="message"
            required
            rows={5}
            maxLength={3000}
            value={values.message}
            onChange={onChange}
          />
        </label>
        {/* honeypot: los bots lo rellenan, los humanos no lo ven */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          value={values._honey}
          onChange={onChange}
          style={{ position: 'absolute', left: -5000 }}
          aria-hidden="true"
        />
        <div className="form-foot">
          <button type="submit" className="cv-btn form-send" disabled={sending}>
            <span>Enviar ➤</span>
          </button>
          <div id="form-status" role="status">{status}</div>
        </div>
      </form>
    </section>
  )
}
