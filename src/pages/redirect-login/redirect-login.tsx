import logoIFPB from '../../assets/logo-ifpb.png'
import logoPPGTI from '../../assets/logo-ppgti.png'
import "./styles.scss"

const RedirectLogin = () => {
  return (
    <div className="wrapper">
      <div className="logos">
        <img
          src={logoIFPB}
          alt="Logo do IFPB"
          className="logo-ifpb"
        />
        <img
          src={logoPPGTI}
          alt="Logo do PPGTI"
          className="logo-ppgti"
        />
      </div>
      <h1>Reserva de Ativos</h1>
      <p>Faça login com SUAP</p>
      <button>ENTRAR COM SUAP</button>
    </div>
  )
}

export default RedirectLogin