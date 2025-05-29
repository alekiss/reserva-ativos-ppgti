import { Link } from "react-router-dom";
import logoIFPB from "../../assets/logo-ifpb.png";
import logoPPGTI from "../../assets/logo-ppgti.png";
import "./styles.scss";

const Login = () => {
  return (
    <div className="wrapper">
      <div className="logos">
        <img src={logoIFPB} alt="Logo do IFPB" className="logo-ifpb" />
        <img src={logoPPGTI} alt="Logo do PPGTI" className="logo-ppgti" />
      </div>
      <h1>Reserva de Ativos</h1>
      <p>Faça login com SUAP</p>
       <Link to="/reservar"> {/*Depois trocar para a /home */}
        <button>ENTRAR COM SUAP</button>
      </Link>
    </div>
  );
};

export default Login;
