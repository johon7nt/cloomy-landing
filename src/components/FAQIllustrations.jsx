const base = '/faq/'

const Img = ({ name, className }) => (
  <img
    src={`${base}${name}.png`}
    alt=""
    draggable={false}
    className={className}
    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
  />
)

export const SaberProgramar  = ({ className = '' }) => <Img name="SaberProgramar"  className={className} />
export const ComisionNo      = ({ className = '' }) => <Img name="ComisionNo"      className={className} />
export const UsarMiDominio   = ({ className = '' }) => <Img name="UsarMiDominio"   className={className} />
export const CambiarDeFormato= ({ className = '' }) => <Img name="CambiarDeFormato" className={className} />
export const ComoPagan       = ({ className = '' }) => <Img name="ComoPagan"       className={className} />
export const Cancelar        = ({ className = '' }) => <Img name="Cancelar"        className={className} />
export const IconoFAQ        = ({ className = '' }) => <Img name="IconoFAQ"        className={className} />
