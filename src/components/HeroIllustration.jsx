export default function HeroIllustration({ className = '' }) {
  return (
    <img
      src="/IconoInicioWeb.png"
      alt=""
      draggable={false}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}
